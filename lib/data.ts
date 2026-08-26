export const PRODUCT_NAME = "Flowlytics";
export const PRODUCT_TAGLINE = "Analítica de producto en tiempo real";

export type Plan = {
  name: string;
  description: string;
  monthly: number;
  annual: number;
  features: string[];
  highlighted?: boolean;
};

export const PLANS: Plan[] = [
  {
    name: "Básico",
    description: "Para validar tus primeras métricas sin complicarte.",
    monthly: 9,
    annual: 90,
    features: [
      "Hasta 10.000 eventos/mes",
      "1 proyecto",
      "Dashboards básicos",
      "Retención de datos: 30 días",
      "Soporte por email",
    ],
  },
  {
    name: "Pro",
    description: "Para equipos que deciden con datos cada semana.",
    monthly: 29,
    annual: 290,
    highlighted: true,
    features: [
      "Hasta 250.000 eventos/mes",
      "5 proyectos",
      "Embudos y cohortes ilimitados",
      "Alertas inteligentes",
      "Retención de datos: 12 meses",
      "Soporte prioritario",
    ],
  },
  {
    name: "Empresa",
    description: "Para organizaciones con escala y seguridad exigentes.",
    monthly: 79,
    annual: 790,
    features: [
      "Eventos ilimitados",
      "Proyectos ilimitados",
      "SSO y roles avanzados",
      "SLA 99,9% garantizado",
      "Onboarding dedicado",
      "Soporte 24/7",
    ],
  },
];

export type Feature = {
  tag: string;
  title: string;
  body: string;
};

export const FEATURES: Feature[] = [
  {
    tag: "Tiempo real",
    title: "Ve qué pasa en tu producto mientras pasa",
    body: "Los dashboards se actualizan solos, segundo a segundo. Nada de refrescar la página ni esperar al informe del lunes.",
  },
  {
    tag: "Sin código",
    title: "Encuentra dónde se caen tus usuarios",
    body: "Construye embudos y cohortes arrastrando eventos. Sin escribir una sola línea de SQL ni pedírselo a datos.",
  },
  {
    tag: "Alertas",
    title: "Entérate antes de que sea un problema",
    body: "Flowlytics avisa por Slack o email en cuanto una métrica se sale de rango. Reacciona en minutos, no en el informe trimestral.",
  },
  {
    tag: "Integraciones",
    title: "Conecta tu stack en minutos",
    body: "SDKs para Web, iOS y Android, más integraciones nativas con Segment, Stripe y HubSpot. Sin ingeniería de por medio.",
  },
];

export type Faq = { q: string; a: string };

export const FAQS: Faq[] = [
  {
    q: "¿Necesito saber programar para usar Flowlytics?",
    a: "No. El editor de eventos es visual y el SDK se instala con una línea de código. El resto — funnels, cohortes, alertas — se configura sin escribir consultas.",
  },
  {
    q: "¿Qué pasa con mis datos si cancelo?",
    a: "Puedes exportarlo todo en CSV o JSON cuando quieras. Tras la cancelación conservamos tus datos 30 días antes de eliminarlos de forma definitiva.",
  },
  {
    q: "¿Flowlytics cumple con RGPD?",
    a: "Sí. Todos los planes incluyen anonimización de IP, control de retención y un acuerdo de tratamiento de datos (DPA) firmable desde el propio panel.",
  },
  {
    q: "¿Puedo cambiar de plan más tarde?",
    a: "Sí, en cualquier momento desde el panel de facturación. El cambio se prorratea automáticamente, sin hablar con ventas.",
  },
  {
    q: "¿Ofrecéis prueba gratuita?",
    a: "Sí, 14 días con todas las funciones del plan Pro y sin necesidad de tarjeta de crédito.",
  },
];

export const LOGOS = ["Northview", "Orbital", "Kairo", "Velux", "Strata", "Pulsar"];

export type Stat = {
  value: number;
  decimals?: number;
  suffix?: string;
  label: string;
};

export const STATS: Stat[] = [
  { value: 2400, suffix: "+", label: "equipos de producto activos" },
  { value: 14, suffix: "M", label: "eventos procesados cada día" },
  { value: 99.98, decimals: 2, suffix: "%", label: "de uptime histórico" },
];

export const FORMSPREE_ENDPOINT = "https://formspree.io/f/tu_id_de_formulario";
