const RESOURCE_MAP = {
  "mini-guia-emociones": {
    title: "Mini guía de emociones",
    path: "/assets/docs/mini-guia-emociones.pdf"
  },
  "pictogramas-comunicacion": {
    title: "Pictogramas para la comunicación",
    path: "/assets/docs/pictogramas-comunicacion.pdf"
  },
  "coleccion-emociones": {
    title: "Colección básica de emociones",
    path: "/assets/docs/coleccion-emociones.pdf"
  },
  "rutinas-visuales": {
    title: "Rutinas visuales diarias",
    path: "/assets/docs/rutinas-visuales.pdf"
  },
  "guia-rabietas": {
    title: "Guía para acompañar rabietas",
    path: "/assets/docs/guia-rabietas.pdf"
  },
  "aula-emocional": {
    title: "Rincón emocional para el aula",
    path: "/assets/docs/aula-emocional.pdf"
  },
  "cuentos-preguntas": {
    title: "Cuentos con preguntas que acompañan",
    path: "/assets/docs/cuentos-preguntas.pdf"
  },
  "emocion-alegria": {
    title: "Recurso de Alegría",
    path: "/assets/docs/emocion-alegria.pdf"
  },
  "emocion-miedo": {
    title: "Recurso de Miedo",
    path: "/assets/docs/emocion-miedo.pdf"
  },
  "emocion-tristeza": {
    title: "Recurso de Tristeza",
    path: "/assets/docs/emocion-tristeza.pdf"
  },
  "emocion-enfado": {
    title: "Recurso de Enfado",
    path: "/assets/docs/emocion-enfado.pdf"
  },
  "emocion-desagrado": {
    title: "Recurso de Desagrado",
    path: "/assets/docs/emocion-desagrado.pdf"
  },
  "emocion-sorpresa": {
    title: "Recurso de Sorpresa",
    path: "/assets/docs/emocion-sorpresa.pdf"
  },
  "info-talleres": {
    title: "Información sobre talleres",
    path: "/assets/docs/info-talleres.pdf"
  },
  "info-acompanamiento-familiar": {
    title: "Información sobre acompañamiento familiar",
    path: "/assets/docs/info-acompanamiento-familiar.pdf"
  },
  "info-formacion-docente": {
    title: "Información sobre formación docente",
    path: "/assets/docs/info-formacion-docente.pdf"
  },
  "info-sesiones-personalizadas": {
    title: "Información sobre sesiones personalizadas",
    path: "/assets/docs/info-sesiones-personalizadas.pdf"
  }
};

function jsonResponse(statusCode, body) {
  return {
    statusCode,
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(body)
  };
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

exports.handler = async function (event) {
  if (event.httpMethod !== "POST") {
    return jsonResponse(405, { message: "Método no permitido." });
  }

  let body;

  try {
    body = JSON.parse(event.body || "{}");
  } catch (error) {
    return jsonResponse(400, { message: "Los datos enviados no son válidos." });
  }

  const email = String(body.email || "").trim();
  const resourceId = String(body.resourceId || "mini-guia-emociones").trim();
  const requestedTitle = String(body.resourceTitle || "").trim();

  if (!isValidEmail(email)) {
    return jsonResponse(400, { message: "Introduce un correo válido." });
  }

  const selectedResource = RESOURCE_MAP[resourceId] || RESOURCE_MAP["mini-guia-emociones"];
  const resourceTitle = selectedResource.title || requestedTitle || "Recurso solicitado";

  const resendApiKey = process.env.RESEND_API_KEY;
  const senderEmail = process.env.SENDER_EMAIL || "Raíces y Alas Educación <onboarding@resend.dev>";
  const siteUrl = process.env.URL || process.env.DEPLOY_PRIME_URL || "https://raices-y-alass.netlify.app";
  const documentUrl = new URL(selectedResource.path, siteUrl).href;

  if (!resendApiKey) {
    return jsonResponse(500, {
      message: "Falta configurar RESEND_API_KEY en Netlify para poder enviar correos."
    });
  }

  const emailResponse = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${resendApiKey}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      from: senderEmail,
      to: [email],
      subject: `Aquí tienes tu recurso: ${resourceTitle}`,
      html: `
        <div style="font-family: Arial, sans-serif; color: #4d4238; line-height: 1.6; max-width: 620px; margin: 0 auto;">
          <h1 style="color: #4d4238;">Raíces y Alas Educación</h1>
          <p>Hola,</p>
          <p>Gracias por solicitar un recurso en <strong>Raíces y Alas Educación</strong>.</p>
          <p>Este es el documento que has pedido:</p>
          <p style="margin: 24px 0;">
            <a href="${documentUrl}" style="display: inline-block; background: #d8f0df; color: #4d4238; padding: 12px 18px; border-radius: 999px; text-decoration: none; font-weight: bold;">
              Descargar ${resourceTitle}
            </a>
          </p>
          <p>Si el botón no funciona, copia y pega este enlace en tu navegador:</p>
          <p><a href="${documentUrl}">${documentUrl}</a></p>
          <p style="margin-top: 28px;">Con cariño,<br /><strong>Raíces y Alas Educación</strong></p>
        </div>
      `
    })
  });

  const result = await emailResponse.json().catch(() => ({}));

  if (!emailResponse.ok) {
    return jsonResponse(500, {
      message: "No se ha podido enviar el recurso. Revisa la configuración de Resend en Netlify.",
      error: result
    });
  }

  return jsonResponse(200, {
    message: "Recurso enviado correctamente.",
    resource: resourceTitle
  });
};
