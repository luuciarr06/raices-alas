/* =========================================================
   JavaScript principal.
   Módulos, componentes, carrusel, filtros, modal y animaciones.
   ========================================================= */

import {
  TEAM,
  RESOURCE_CATEGORIES,
  RESOURCE_DATA,
  EMOTIONS_DATA,
  SERVICES,
  TESTIMONIALS,
  BLOG_POSTS,
  CALENDAR_SLOTS
} from "./data.js";

import {
  createResourceCard,
  createCarouselItem,
  createTeamCard,
  createEmotionCard,
  createServiceCard,
  createBlogCard
} from "../components/ui-components.js";

const $ = (selector, scope = document) => scope.querySelector(selector);
const $$ = (selector, scope = document) => [...scope.querySelectorAll(selector)];

const state = {
  activeCategory: "Todos",
  carouselIndex: 0,
  testimonialIndex: 0,
  selectedSlot: null
};

function init() {
  renderStaticComponents();
  setupNavigation();
  setupResourceFilters();
  setupCarousel();
  setupTestimonials();
  setupCalendar();
  setupDownloadModal();
  setupContactForm();
  setupScrollReveal();
  setupActiveLinks();
  $("[data-year]").textContent = new Date().getFullYear();
}

function renderStaticComponents() {
  $("[data-team-grid]").innerHTML = TEAM.map(createTeamCard).join("");
  $("[data-resource-grid]").innerHTML = RESOURCE_DATA.map(createResourceCard).join("");
  $("[data-emotion-grid]").innerHTML = EMOTIONS_DATA.map(createEmotionCard).join("");
  $("[data-services-grid]").innerHTML = SERVICES.map(createServiceCard).join("");
  $("[data-blog-grid]").innerHTML = BLOG_POSTS.map(createBlogCard).join("");
  $("[data-carousel-track]").innerHTML = RESOURCE_DATA.slice(0, 5).map(createCarouselItem).join("");

  $("[data-filters]").innerHTML = RESOURCE_CATEGORIES.map((category) => `
    <button class="chip ${category === "Todos" ? "is-active" : ""}" type="button" data-filter="${category}">
      ${category}
    </button>
  `).join("");

  $("[data-calendar-slots]").innerHTML = CALENDAR_SLOTS.map((slot) => `
    <button class="calendar__slot" type="button" data-slot="${slot}">${slot}</button>
  `).join("");
}

function setupNavigation() {
  const toggle = $("[data-nav-toggle]");
  const menu = $("[data-nav-menu]");

  toggle.addEventListener("click", () => {
    const isOpen = toggle.classList.toggle("is-open");
    menu.classList.toggle("is-open", isOpen);
    document.body.classList.toggle("menu-open", isOpen);
    toggle.setAttribute("aria-expanded", String(isOpen));
    toggle.setAttribute("aria-label", isOpen ? "Cerrar menú" : "Abrir menú");
  });

  $$("a", menu).forEach((link) => {
    link.addEventListener("click", () => {
      toggle.classList.remove("is-open");
      menu.classList.remove("is-open");
      document.body.classList.remove("menu-open");
      toggle.setAttribute("aria-expanded", "false");
      toggle.setAttribute("aria-label", "Abrir menú");
    });
  });
}

function setupResourceFilters() {
  const filters = $("[data-filters]");
  const grid = $("[data-resource-grid]");

  filters.addEventListener("click", (event) => {
    const button = event.target.closest("[data-filter]");
    if (!button) return;

    state.activeCategory = button.dataset.filter;
    $$("[data-filter]", filters).forEach((item) => item.classList.toggle("is-active", item === button));

    const filteredResources = state.activeCategory === "Todos"
      ? RESOURCE_DATA
      : RESOURCE_DATA.filter((resource) => resource.category === state.activeCategory);

    grid.innerHTML = filteredResources.map(createResourceCard).join("");
    setupScrollReveal();
  });
}

function setupCarousel() {
  const carousel = $("[data-carousel]");
  const track = $("[data-carousel-track]", carousel);
  const prev = $("[data-carousel-prev]", carousel);
  const next = $("[data-carousel-next]", carousel);

  const update = () => {
    const item = $(".carousel__item", track);
    if (!item) return;
    const itemWidth = item.getBoundingClientRect().width + 16;
    track.style.transform = `translateX(-${state.carouselIndex * itemWidth}px)`;
  };

  const maxIndex = () => {
    const visibleItems = window.innerWidth <= 640 ? 1 : window.innerWidth <= 980 ? 2 : 3;
    return Math.max(0, RESOURCE_DATA.slice(0, 5).length - visibleItems);
  };

  next.addEventListener("click", () => {
    state.carouselIndex = state.carouselIndex >= maxIndex() ? 0 : state.carouselIndex + 1;
    update();
  });

  prev.addEventListener("click", () => {
    state.carouselIndex = state.carouselIndex <= 0 ? maxIndex() : state.carouselIndex - 1;
    update();
  });

  window.addEventListener("resize", () => {
    state.carouselIndex = Math.min(state.carouselIndex, maxIndex());
    update();
  });
}

function setupTestimonials() {
  const card = $("[data-testimonial-card]");

  const render = () => {
    const testimonial = TESTIMONIALS[state.testimonialIndex];
    card.innerHTML = `
      <blockquote>“${testimonial.quote}”</blockquote>
      <cite>${testimonial.author}</cite>
    `;
    card.animate(
      [{ opacity: 0, transform: "translateY(12px)" }, { opacity: 1, transform: "translateY(0)" }],
      { duration: 450, easing: "ease", fill: "both" }
    );
  };

  render();
  window.setInterval(() => {
    state.testimonialIndex = (state.testimonialIndex + 1) % TESTIMONIALS.length;
    render();
  }, 5200);
}

function setupCalendar() {
  const slotsContainer = $("[data-calendar-slots]");
  const selectedText = $("[data-calendar-selected]");

  slotsContainer.addEventListener("click", (event) => {
    const button = event.target.closest("[data-slot]");
    if (!button) return;

    state.selectedSlot = button.dataset.slot;
    $$("[data-slot]", slotsContainer).forEach((slot) => slot.classList.toggle("is-selected", slot === button));
    selectedText.textContent = `Has seleccionado: ${state.selectedSlot}. Escríbenos en el formulario para confirmar la cita.`;
  });
}

function setupDownloadModal() {
  const modal = $("[data-download-modal]");
  const closeButton = $("[data-close-download]");
  const downloadText = $("[data-download-text]");
  const form = $("[data-download-form]");
  const status = $("[data-download-status]");
  const emailInput = $("#download-email");
  const submitButton = $("button[type='submit']", form);

  let selectedResourceId = "mini-guia-emociones";
  let selectedResourceTitle = "Mini guía de emociones";

  document.addEventListener("click", (event) => {
    const button = event.target.closest("[data-open-download]");
    if (!button) return;

    selectedResourceId = button.dataset.resourceId || "mini-guia-emociones";
    selectedResourceTitle = button.dataset.resourceTitle || "Recurso gratuito";

    downloadText.textContent = `Déjanos tu correo y te enviaremos: ${selectedResourceTitle}.`;
    status.textContent = "";
    status.classList.remove("is-success");
    form.reset();
    modal.showModal();
  });

  closeButton.addEventListener("click", () => modal.close());

  modal.addEventListener("click", (event) => {
    const dialogBox = $(".modal__content", modal).getBoundingClientRect();
    const clickedOutside =
      event.clientX < dialogBox.left ||
      event.clientX > dialogBox.right ||
      event.clientY < dialogBox.top ||
      event.clientY > dialogBox.bottom;

    if (clickedOutside) modal.close();
  });

  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    const email = emailInput.value.trim();

    if (!isValidEmail(email)) {
      status.classList.remove("is-success");
      status.textContent = "Introduce un correo válido.";
      return;
    }

    status.classList.remove("is-success");
    status.textContent = "Enviando recurso...";
    submitButton.disabled = true;
    submitButton.textContent = "Enviando...";

    try {
      const response = await fetch("/.netlify/functions/send-resource", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          email,
          resourceId: selectedResourceId,
          resourceTitle: selectedResourceTitle
        })
      });

      const result = await response.json().catch(() => ({
        message: "No se ha podido conectar con el envío automático. Comprueba que la web esté desplegada en Netlify."
      }));

      if (!response.ok) {
        throw new Error(result.message || "No se ha podido enviar el recurso.");
      }

      status.classList.add("is-success");
      status.textContent = "Recurso enviado correctamente. Revisa tu correo.";
      form.reset();
    } catch (error) {
      status.classList.remove("is-success");
      status.textContent = error.message;
    } finally {
      submitButton.disabled = false;
      submitButton.textContent = "Enviar recurso";
    }
  });
}

function setupContactForm() {
  const form = $("[data-contact-form]");
  const status = $("[data-form-status]");

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    clearFormErrors(form);

    const formData = new FormData(form);
    const values = Object.fromEntries(formData.entries());
    const errors = validateContactForm(values);

    if (Object.keys(errors).length > 0) {
      Object.entries(errors).forEach(([field, message]) => {
        const error = $(`[data-error-for="${field}"]`, form);
        if (error) error.textContent = message;
      });
      status.classList.remove("is-success");
      status.textContent = "Revisa los campos marcados.";
      return;
    }

    status.classList.add("is-success");
    status.textContent = "Mensaje preparado. En GitHub Pages necesitas conectar un servicio externo para enviarlo realmente.";
    form.reset();
  });
}

function validateContactForm(values) {
  const errors = {};

  if (!values.nombre?.trim()) errors.nombre = "Escribe tu nombre.";
  if (!isValidEmail(values.email || "")) errors.email = "Escribe un correo válido.";
  if (!values.interes?.trim()) errors.interes = "Selecciona una opción.";
  if (!values.mensaje?.trim() || values.mensaje.trim().length < 10) {
    errors.mensaje = "Escribe un mensaje de al menos 10 caracteres.";
  }

  return errors;
}

function clearFormErrors(form) {
  $$(".form-error", form).forEach((error) => (error.textContent = ""));
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function setupScrollReveal() {
  const items = $$(".reveal:not(.is-observed)");

  if (!("IntersectionObserver" in window)) {
    items.forEach((item) => item.classList.add("is-visible"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.14 }
  );

  items.forEach((item) => {
    item.classList.add("is-observed");
    observer.observe(item);
  });
}

function setupActiveLinks() {
  const links = $$('[data-nav-menu] a[href^="#"]');
  const sections = links
    .map((link) => $(link.getAttribute("href")))
    .filter(Boolean);

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        links.forEach((link) => {
          link.classList.toggle("is-active", link.getAttribute("href") === `#${entry.target.id}`);
        });
      });
    },
    { rootMargin: "-45% 0px -50% 0px" }
  );

  sections.forEach((section) => observer.observe(section));
}

document.addEventListener("DOMContentLoaded", init);
