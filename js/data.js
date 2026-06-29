/* =========================================================
   Datos del proyecto.
   Separar datos del HTML facilita reutilizar componentes.
   ========================================================= */

export const TEAM = [
  {
    name: "Patricia",
    role: "Maestra de Educación Infantil y especialista en Atención Temprana",
    avatar: "./assets/svg/avatar-patricia.svg",
    bio: "Acompaña procesos de aprendizaje y desarrollo desde una mirada sensible, respetuosa y centrada en las necesidades reales de cada niño o niña.",
    specialties: ["Atención temprana", "Educación emocional", "Comunicación visual"]
  },
  {
    name: "Irene",
    role: "Maestra de Educación Infantil y máster en Atención Temprana",
    avatar: "./assets/svg/avatar-irene.svg",
    bio: "Diseña recursos educativos cercanos para familias y docentes, uniendo creatividad, calma y herramientas prácticas para el día a día.",
    specialties: ["Recursos educativos", "Aula infantil", "Acompañamiento familiar"]
  }
];

export const RESOURCE_CATEGORIES = ["Todos", "Emociones", "Pictogramas", "Rutinas", "Familias", "Docentes"];

export const RESOURCE_DATA = [
  {
    id: "pictogramas-comunicacion",
    title: "Pictogramas para la comunicación",
    category: "Pictogramas",
    icon: "🧩",
    description: "Láminas visuales para favorecer la comprensión, la anticipación y la expresión de necesidades.",
    details: ["Uso en casa y aula", "Apoyo para rutinas", "Material visual claro"],
    downloadable: true
  },
  {
    id: "coleccion-emociones",
    title: "Colección básica de emociones",
    category: "Emociones",
    icon: "🌈",
    description: "Tarjetas para nombrar alegría, miedo, tristeza, enfado, desagrado y sorpresa.",
    details: ["Preguntas para dialogar", "Actividades de expresión", "Ilustraciones cercanas"],
    downloadable: true
  },
  {
    id: "rutinas-visuales",
    title: "Rutinas visuales diarias",
    category: "Rutinas",
    icon: "🗓️",
    description: "Secuencias sencillas para organizar el día y reducir incertidumbre en los peques.",
    details: ["Mañana y noche", "Autonomía progresiva", "Anticipación calmada"],
    downloadable: true
  },
  {
    id: "guia-rabietas",
    title: "Guía para acompañar rabietas",
    category: "Familias",
    icon: "🤍",
    description: "Ideas para sostener momentos intensos sin castigos, gritos ni prisas.",
    details: ["Validación emocional", "Límites con respeto", "Frases útiles"],
    downloadable: true
  },
  {
    id: "aula-emocional",
    title: "Rincón emocional para el aula",
    category: "Docentes",
    icon: "🍎",
    description: "Propuesta para crear un espacio de calma, identificación emocional y reparación.",
    details: ["Asamblea emocional", "Tarjetas de calma", "Dinámicas de grupo"],
    downloadable: true
  },
  {
    id: "cuentos-preguntas",
    title: "Cuentos con preguntas que acompañan",
    category: "Familias",
    icon: "📚",
    description: "Preguntas abiertas para conversar después de la lectura y conectar con lo vivido.",
    details: ["Lenguaje emocional", "Escucha activa", "Vínculo familiar"],
    downloadable: true
  }
];

export const EMOTIONS_DATA = [
  {
    name: "Alegría",
    svg: "./assets/svg/emocion-alegria.svg",
    description: "La alegría nos ayuda a compartir, celebrar y reconocer aquello que nos hace sentir bien.",
    activities: ["Dibujar algo que nos hace sonreír", "Crear un bote de momentos felices", "Compartir una buena noticia"]
  },
  {
    name: "Miedo",
    svg: "./assets/svg/emocion-miedo.svg",
    description: "El miedo nos avisa de que necesitamos seguridad, apoyo o más información.",
    activities: ["Nombrar qué nos asusta", "Elegir una persona refugio", "Respirar con una pluma imaginaria"]
  },
  {
    name: "Tristeza",
    svg: "./assets/svg/emocion-tristeza.svg",
    description: "La tristeza pide pausa, consuelo y permiso para echar de menos o soltar.",
    activities: ["Hacer una caja de calma", "Pedir un abrazo o espacio", "Pintar la tristeza con colores"]
  },
  {
    name: "Enfado",
    svg: "./assets/svg/emocion-enfado.svg",
    description: "El enfado aparece cuando algo nos importa, nos molesta o sentimos una injusticia.",
    activities: ["Apretar y soltar las manos", "Decir: necesito parar", "Buscar una solución después de calmarse"]
  },
  {
    name: "Desagrado",
    svg: "./assets/svg/emocion-desagrado.svg",
    description: "El desagrado nos ayuda a reconocer límites, preferencias y sensaciones incómodas.",
    activities: ["Clasificar me gusta / no me gusta", "Explorar olores suaves", "Explicar una preferencia sin juzgar"]
  },
  {
    name: "Sorpresa",
    svg: "./assets/svg/emocion-sorpresa.svg",
    description: "La sorpresa abre la curiosidad y nos prepara para mirar algo nuevo.",
    activities: ["Caja misteriosa", "Adivinar sonidos", "Inventar finales inesperados"]
  }
];

export const SERVICES = [
  {
    id: "info-talleres",
    title: "Talleres",
    icon: "🎨",
    description: "Talleres prácticos sobre emociones, rutinas visuales, cuentos y comunicación respetuosa.",
    price: "Para centros, familias y grupos"
  },
  {
    id: "info-acompanamiento-familiar",
    title: "Acompañamiento familiar",
    icon: "🏡",
    description: "Sesiones para entender necesidades, rabietas, límites, autonomía y vínculo familiar.",
    price: "Online o presencial según disponibilidad"
  },
  {
    id: "info-formacion-docente",
    title: "Formación docente",
    icon: "🍎",
    description: "Formaciones para crear aulas más calmadas, inclusivas y emocionalmente seguras.",
    price: "Adaptada al centro educativo"
  },
  {
    id: "info-sesiones-personalizadas",
    title: "Sesiones personalizadas",
    icon: "🌷",
    description: "Orientación individual para diseñar recursos visuales y estrategias ajustadas a cada caso.",
    price: "Primera toma de contacto"
  }
];

export const TESTIMONIALS = [
  {
    quote: "Los recursos nos ayudaron a hablar de emociones en casa sin forzar, desde el juego y la calma.",
    author: "Familia de infantil"
  },
  {
    quote: "El material visual es claro, bonito y muy fácil de llevar al aula desde el primer día.",
    author: "Docente de Educación Infantil"
  },
  {
    quote: "Transmiten sensibilidad y profesionalidad. Se nota el cariño detrás de cada propuesta.",
    author: "Orientadora educativa"
  }
];

export const BLOG_POSTS = [
  {
    title: "No siempre necesitan una solución inmediata",
    date: "2026-06-12",
    icon: "💗",
    excerpt: "A veces, acompañar significa quedarse cerca, validar y ofrecer seguridad antes de resolver."
  },
  {
    title: "Tres formas sencillas de trabajar las emociones",
    date: "2026-06-06",
    icon: "🌈",
    excerpt: "Ideas pequeñas para casa y aula que ayudan a nombrar, expresar y regular lo que sentimos."
  },
  {
    title: "Detrás de cada recurso hay mucho cariño",
    date: "2026-05-28",
    icon: "🌱",
    excerpt: "Diseñar materiales para la infancia implica pensar en accesibilidad, belleza y sentido pedagógico."
  }
];

export const CALENDAR_SLOTS = [
  "Lunes · 17:00",
  "Martes · 18:30",
  "Miércoles · 16:30",
  "Jueves · 19:00",
  "Viernes · 12:00"
];
