# Especificación — Proyecto 4: Landing de Alta Conversión

> Documento listo para pegar en Claude Code. Cuarto proyecto del portfolio: demuestra micro-interacciones y pricing dinámico.

---

## 1. Objetivo

Landing page de un producto/servicio SaaS ficticio diseñada 100% para vender, que demuestre:
- Micro-interacciones cuidadas (hover, scroll reveal, contadores animados).
- Pricing dinámico (toggle mensual/anual con descuento calculado en vivo).
- Estructura de conversión probada: hero fuerte → prueba social → features → precio → objeciones (FAQ) → CTA final.

Es el proyecto más "creativo" de los 4 — aquí es donde más se puede lucir Framer Motion.

---

## 2. Stack tecnológico

| Capa | Elección | Por qué |
|---|---|---|
| Framework | **Next.js 14 (App Router) + TypeScript** | Consistencia con el resto del portfolio |
| Estilos | **Tailwind CSS** | Rapidez y consistencia visual |
| Animaciones | **Framer Motion** | Scroll reveal, hover states, transición del toggle de precio |
| Contadores | **react-countup** (o animación manual con Framer Motion) | Números que suben animados en el hero/social proof |
| Formulario | **Formspree** (igual que el portfolio) | Waitlist/CTA funcional sin backend propio |
| Hosting | **Vercel** | Igual que el resto |

---

## 3. Estructura de páginas/secciones

Página única (`app/page.tsx`):

1. **Hero** — titular orientado a beneficio (no a feature), subtítulo, CTA principal grande, mockup/captura del producto ficticio
2. **Social proof** — logos de "clientes" ficticios + 1-2 números animados (ej. "+2.400 usuarios activos")
3. **Features** — 3-4 bloques con scroll reveal, alternando imagen/texto izquierda-derecha
4. **Pricing** — 3 planes (Básico/Pro/Empresa), toggle mensual/anual que recalcula el precio y muestra el % de descuento anual en vivo, plan "Pro" destacado visualmente ("Más popular")
5. **FAQ** — acordeón con 4-5 preguntas típicas que resuelven objeciones de compra
6. **CTA final** — repetición del CTA principal antes del footer, con más urgencia
7. **Footer** — simple, enlaces legales ficticios + redes

---

## 4. Requisitos técnicos no negociables

- El toggle mensual/anual debe **recalcular el precio con una animación numérica** (no solo cambiar el texto de golpe)
- Scroll reveal con `whileInView` de Framer Motion en cada sección (una sola vez, no se repite al volver a hacer scroll)
- El plan destacado ("Más popular") debe distinguirse visualmente sin depender solo de un badge — usar escala, sombra o borde de acento
- El acordeón de FAQ debe animar apertura/cierre con altura automática, no con `display: none` brusco
- Todo el CTA (hero + final) debe apuntar al mismo formulario o ancla, sin fricción de navegación
- Mobile-first: los precios en 3 columnas deben apilarse limpio en 1 columna en mobile, sin recortes

---

## 5. Datos a rellenar (placeholders)

```
antes de empezar a ello me daras unas 3 opciones sobre el nombre ficticio los planes y las faq las haras dependiendo del producto que haya elegido 
NOMBRE_PRODUCTO = "[Nombre del SaaS ficticio]"
PLANES = [
  { nombre: "Básico", precioMensual: 9, precioAnual: 90 },
  { nombre: "Pro", precioMensual: 29, precioAnual: 290 },
  { nombre: "Empresa", precioMensual: 79, precioAnual: 790 },
]
FAQ = ["Pregunta 1", "Pregunta 2", "Pregunta 3", "Pregunta 4"]
```

---

## 6. Prompt para pegar en Claude Code

```
Crea una landing page de alta conversión en Next.js 14 (App Router) + TypeScript + Tailwind CSS
+ Framer Motion, siguiendo la especificación completa de spec-proyecto-landing-conversion.md.

Pasos:
1. Scaffoldea el proyecto e instala framer-motion y react-countup (o similar).
2. Crea las secciones de la sección 3: Hero, Social proof, Features, Pricing, FAQ, CTA final, Footer.
3. Implementa el toggle mensual/anual del pricing con animación numérica del precio y
   cálculo en vivo del % de descuento (sección 4).
4. Implementa scroll reveal en cada sección con whileInView (una sola vez por sección).
5. Implementa el acordeón de FAQ con animación de altura automática.
6. Asegura que el pricing se apila limpio en mobile.
7. Al terminar, dime cómo probar el toggle de precios y el formulario de CTA.
```

---

## 7. Siguiente paso

1. Elige el nombre del producto ficticio, los 3 planes de precio y las preguntas del FAQ.
2. Pega este archivo + el prompt de la sección 6 en una sesión nueva de Claude Code.
