/* =========================================================
   Componentes reutilizables de interfaz.
   Cada función devuelve HTML para pintar tarjetas y bloques.
   ========================================================= */

function toResourceId(prefix, value) {
  return `${prefix}-${String(value)
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")}`;
}

export function createResourceCard(resource) {
  return `
    <article class="card reveal" data-category="${resource.category}">
      <div class="card__icon" aria-hidden="true">${resource.icon}</div>
      <p class="card__meta">${resource.category}</p>
      <h3>${resource.title}</h3>
      <p>${resource.description}</p>
      <details class="resource-detail">
        <summary>Ver detalle del recurso</summary>
        <ul>
          ${resource.details.map((detail) => `<li>${detail}</li>`).join("")}
        </ul>
      </details>
      <div class="card__actions">
        <button class="button button--primary" type="button" data-open-download data-resource-id="${resource.id}" data-resource-title="${resource.title}">
          Descargar
        </button>
      </div>
    </article>
  `;
}

export function createCarouselItem(resource) {
  return `
    <article class="carousel__item">
      <div class="card">
        <div class="card__icon" aria-hidden="true">${resource.icon}</div>
        <p class="card__meta">${resource.category}</p>
        <h3>${resource.title}</h3>
        <p>${resource.description}</p>
        <div class="card__actions">
          <button class="button button--ghost" type="button" data-open-download data-resource-id="${resource.id}" data-resource-title="${resource.title}">
            Lo quiero
          </button>
        </div>
      </div>
    </article>
  `;
}

export function createTeamCard(member) {
  return `
    <article class="team-card reveal">
      <div class="team-card__avatar">
        <img src="${member.avatar}" alt="Avatar ilustrado de ${member.name}" />
      </div>
      <div>
        <h3>${member.name}</h3>
        <p class="card__meta">${member.role}</p>
        <p>${member.bio}</p>
        <ul>
          ${member.specialties.map((item) => `<li>${item}</li>`).join("")}
        </ul>
      </div>
    </article>
  `;
}

export function createEmotionCard(emotion) {
  return `
    <article class="emotion-card reveal">
      <img src="${emotion.svg}" alt="Ilustración de la emoción ${emotion.name}" />
      <h3>${emotion.name}</h3>
      <p>${emotion.description}</p>
      <ul>
        ${emotion.activities.map((activity) => `<li>${activity}</li>`).join("")}
      </ul>
      <div class="card__actions">
        <button class="button button--ghost" type="button" data-open-download data-resource-id="${toResourceId("emocion", emotion.name)}" data-resource-title="Recurso de ${emotion.name}">
          Recurso descargable
        </button>
      </div>
    </article>
  `;
}

export function createServiceCard(service) {
  return `
    <article class="service-card reveal">
      <div class="card__icon" aria-hidden="true">${service.icon}</div>
      <h3>${service.title}</h3>
      <p>${service.description}</p>
      <p class="service-card__price">${service.price}</p>
      <div class="card__actions">
        <button class="button button--ghost" type="button" data-open-download data-resource-id="${service.id}" data-resource-title="Información sobre ${service.title}">
          Solicitar información
        </button>
      </div>
    </article>
  `;
}

export function createBlogCard(post) {
  const formattedDate = new Intl.DateTimeFormat("es-ES", {
    day: "2-digit",
    month: "long",
    year: "numeric"
  }).format(new Date(post.date));

  return `
    <article class="blog-card reveal">
      <div class="blog-card__top" aria-hidden="true">${post.icon}</div>
      <div class="blog-card__body">
        <time datetime="${post.date}">${formattedDate}</time>
        <h3>${post.title}</h3>
        <p>${post.excerpt}</p>
        <a class="text-link" href="#contacto">Leer reflexión</a>
      </div>
    </article>
  `;
}
