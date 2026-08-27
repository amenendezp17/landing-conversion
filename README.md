# Flowlytics — Landing de alta conversión

Landing de un SaaS ficticio de analítica de producto (Proyecto 4 del portfolio). Construida con
Next.js 14+ (App Router) + TypeScript + Tailwind CSS + Framer Motion

## Stack

- Next.js (App Router) + TypeScript
- Tailwind CSS v4
- Framer Motion — scroll reveal, toggle de precio, acordeón de FAQ
- react-countup — contadores animados de prueba social
- Formspree — formulario de captación sin backend propio

## Desarrollo

```bash
npm install
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000).

## Estructura

- `app/page.tsx` — ensambla las secciones de la landing
- `components/` — Header, Hero, SocialProof, Features, Pricing, FAQ, CTAFinal, Footer
- `lib/data.ts` — nombre de producto, planes, features, FAQ, stats (edítalo para cambiar contenido)

## Tests

Suite e2e con Playwright, cubriendo smoke path, casos positivos/negativos, WCAG 2.1 A/AA
(axe-core) y SEO. Lighthouse en un proyecto aparte.

```bash
npx playwright install chromium   # una vez
npm run test:e2e                  # smoke + pricing + faq + cta-form + accessibility + seo + responsive
npm run test:lighthouse           # performance/accessibility/best-practices/seo
npm run test:report               # abre el último informe HTML
```

- `e2e/smoke.spec.ts` — carga sin error, ruta crítica hero → formulario → éxito, sin errores de consola.
- `e2e/pricing.spec.ts` — toggle mensual/anual: precio y % descuento recalculados en vivo (positivo),
  toggles repetidos y enlaces del CTA (negativo/edge).
- `e2e/faq.spec.ts` — acordeón abre/cierra, solo uno abierto a la vez, operable por teclado.
- `e2e/cta-form.spec.ts` — envío válido (positivo); email vacío/inválido, fallo de servidor y
  request abortada (negativo), con Formspree mockeado vía `page.route`.
- `e2e/accessibility.spec.ts` — auditoría axe-core (WCAG 2.1 A/AA) en estados estático y dinámico
  (pricing anual, FAQ abierto, error de formulario) + jerarquía de headings, skip link, `lang`.
- `e2e/seo.spec.ts` — title/description, canonical, Open Graph/Twitter, JSON-LD, robots.txt,
  sitemap.xml, enlaces internos sin ancla rota.
- `e2e/responsive.spec.ts` — pricing 3→1 columna en mobile sin solape ni recorte, sin overflow
  horizontal en 320–1440px.
- `e2e/lighthouse.spec.ts` — umbrales: accessibility ≥95, seo ≥95, best-practices ≥90,
  performance ≥60 (laxo a propósito: máquina compartida, no representativa de producción).

El `webServer` de `playwright.config.ts` compila y sirve la app en el puerto 3100 (no 3000, para
no chocar con otro proyecto local) antes de cada corrida.

## Antes de desplegar

El formulario de CTA apunta a un endpoint de Formspree de ejemplo. Sustitúyelo por el tuyo en
`lib/data.ts` (`FORMSPREE_ENDPOINT`) — crea un formulario gratis en [formspree.io](https://formspree.io)
y copia su URL (`https://formspree.io/f/xxxxxxxx`).

## Cómo probar

- **Toggle de precios**: en la sección "Precios", cambia entre Mensual/Anual — el número anima
  con conteo, no salta de golpe, y aparece "Ahorra X%" en cada plan al pasar a anual.
- **CTA / formulario**: el botón del hero, los de cada plan y el CTA final apuntan todos al mismo
  formulario (`#cta`). Con un `FORMSPREE_ENDPOINT` real configurado, al enviar el email verás el
  mensaje de éxito sin recargar la página.
- **FAQ**: cada pregunta abre/cierra con animación de altura automática (una sola a la vez).
- **Scroll reveal**: cada sección aparece al hacer scroll, una única vez.
- **Mobile**: reduce el ancho del navegador — el pricing pasa de 3 a 1 columna sin recortes.

## Deploy

Pensada para Vercel: conecta el repo e importa el proyecto sin configuración adicional.
