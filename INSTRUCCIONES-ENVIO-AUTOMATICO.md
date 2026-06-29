# Envío automático de documentos

He añadido documentos de ejemplo en:

```txt
assets/docs/
```

También he añadido una función de Netlify en:

```txt
netlify/functions/send-resource.js
```

La web ahora funciona así:

1. La persona pulsa **Descargar**, **Lo quiero**, **Recurso descargable** o **Solicitar información**.
2. Se abre el modal.
3. Escribe su correo.
4. La web llama a `/.netlify/functions/send-resource`.
5. La función envía un email con el enlace al documento solicitado.

## Importante

Esto funciona cuando la web está desplegada en **Netlify**. En GitHub Pages puro no funcionaría porque GitHub Pages solo sirve HTML/CSS/JS estático y no ejecuta funciones de servidor.

## Variable que tienes que configurar en Netlify

Entra en Netlify:

```txt
Project configuration > Environment variables
```

Añade:

```txt
RESEND_API_KEY = tu_clave_de_resend
```

Opcionalmente, cuando tengas un email o dominio verificado en Resend, añade:

```txt
SENDER_EMAIL = Raíces y Alas Educación <hola@tudominio.es>
```

Si no configuras `RESEND_API_KEY`, el formulario mostrará un error diciendo que falta configurar la clave.
