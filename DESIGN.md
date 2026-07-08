---
name: Astrología y Herbolaria
description: Acompañamiento simbólico y práctica ritual — astrología, tarot y herbolaria con rigor histórico y calidez.
colors:
  ciruela: "#3E2D5C"
  ciruela-suave: "#5A4478"
  oro: "#B8924A"
  champan: "#F2E6D6"
  rosa-palido: "#F6E9E4"
  blanco: "#FFFFFF"
typography:
  display:
    fontFamily: "Cormorant Garamond, Georgia, serif"
    fontSize: "clamp(2.25rem, 5vw, 3.25rem)"
    fontWeight: 500
    lineHeight: 1.3
    letterSpacing: "normal"
  body:
    fontFamily: "Mulish, -apple-system, sans-serif"
    fontSize: "clamp(1.0625rem, 1vw, 1.125rem)"
    fontWeight: 400
    lineHeight: 1.65
    letterSpacing: "normal"
  label:
    fontFamily: "Mulish, -apple-system, sans-serif"
    fontSize: "0.65rem"
    fontWeight: 500
    lineHeight: 1.1
    letterSpacing: "0.12em"
rounded:
  sm: "4px"
spacing:
  xs: "0.5rem"
  sm: "1rem"
  md: "2rem"
  lg: "3.5rem"
  xl: "5.5rem"
components:
  button-primary:
    backgroundColor: "{colors.ciruela}"
    textColor: "{colors.champan}"
    rounded: "{rounded.sm}"
    padding: "0.85rem 1.6rem"
  button-primary-hover:
    backgroundColor: "{colors.ciruela}"
    textColor: "{colors.champan}"
  button-secondary:
    backgroundColor: "transparent"
    textColor: "{colors.ciruela}"
    rounded: "{rounded.sm}"
    padding: "0.85rem 1.6rem"
  button-secondary-hover:
    textColor: "{colors.oro}"
  card-service:
    backgroundColor: "{colors.blanco}"
    textColor: "{colors.ciruela}"
    rounded: "{rounded.sm}"
    padding: "{spacing.md}"
---

# Design System: Astrología y Herbolaria

## 1. Overview

**Creative North Star: "El Umbral"**

El sistema toma su nombre del propio tagline del sitio: el umbral es el cruce entre lo cotidiano y lo ritual, la puerta simbólica que se atraviesa con calma, no con espectáculo. Cada decisión visual sirve esa idea de tránsito contenido — nunca dramática, nunca genérica.

Es un sistema **plano por capas de color**: dos fondos cálidos que alternan (champán y rosa pálido) crean la sensación de moverse entre habitaciones de una misma casa, con la ciruela como estructura (texto, líneas, navegación) y el oro reservado casi por completo para el instante del hover — el destello que marca que algo se activó. Los componentes son **táctiles y ceremoniales**: cada botón, cada tarjeta, responde con un gesto claro (borde que se dora, texto que cambia de color) que se siente como un pequeño rito, no como una animación decorativa.

El sistema rechaza explícitamente la estética *new-age* genérica — sin marcos dorados decorativos, sin degradados celestes, sin copy vacío de plantilla. La iconografía celeste (luna, estrellas, motivos de tarot) entra solo como acento puntual y lineal, nunca como fondo ni como marco.

**Key Characteristics:**
- Paleta cálida y restringida: dos fondos, un color estructural, un acento escaso
- Serif elegante para títulos (Cormorant Garamond) + sans cálida para cuerpo (Mulish)
- Sin sombras — la profundidad viene de la alternancia de fondo, no de la elevación
- El oro es exclusivamente un gesto de interacción (hover/foco/detalle), nunca un color de superficie

## 2. Colors

Paleta cálida y contenida: dos neutros cálidos que se alternan como fondo, un color estructural profundo, y un acento escaso reservado casi por completo para el hover.

### Primary
- **Ciruela Profunda** (#3E2D5C): color estructural — texto de cuerpo, navegación, líneas, iconografía. Ocupa ~25% de cualquier superficie.
- **Ciruela Suave** (#5A4478): variante para texto secundario (subtítulos de hero, metadatos, texto de apoyo) donde el ciruela profundo sería demasiado peso.

### Secondary
- **Oro Ceremonial** (#B8924A): acento escaso, ≤5% de cualquier superficie. Aparece solo en hover/foco de botones y enlaces, y como trazo del ícono simbólico lineal. Nunca como fondo, nunca como marco decorativo.

### Neutral
- **Champán Cálido** (#F2E6D6): fondo dominante — la superficie de "descanso" del sitio.
- **Rosa Pálido Ritual** (#F6E9E4): segundo fondo, alterna con el champán sección a sección para marcar tránsito sin romper la paleta.
- **Blanco** (#FFFFFF): reservado para tarjetas de servicio, donde necesitan destacar sobre el fondo champán/rosa.

### Named Rules
**La Regla del Oro Escaso.** El oro nunca es un color de superficie ni de fondo — solo aparece en el instante de interacción (hover, foco) o como trazo de un ícono lineal puntual. Si el oro ocupa más del 5% de una vista, algo se rompió.

**La Regla de la Casa de Dos Cuartos.** El sitio nunca usa más de dos fondos en la misma vista (champán y rosa pálido). Un tercer fondo cálido (dorado, celeste) diluye el tránsito que la alternancia champán/rosa está diseñada para transmitir.

## 3. Typography

**Display Font:** Cormorant Garamond (con Georgia, serif como fallback)
**Body Font:** Mulish (con -apple-system, sans-serif como fallback)
**Label Font:** Mulish, en mayúsculas con tracking amplio

**Character:** El contraste serif/sans es la voz tipográfica del sistema — Cormorant Garamond aporta el peso simbólico y ceremonial en los títulos, Mulish aporta la claridad legible y contemporánea en el cuerpo. Ninguno de los dos se usa fuera de su rol.

### Hierarchy
- **Display / H1** (weight 500, clamp(2.25rem, 5vw, 3.25rem), line-height 1.3): título de hero y encabezados de página.
- **Headline / H2** (weight 500, 1.75rem → 2.25rem en desktop, line-height 1.3): encabezados de sección.
- **Title / H3** (weight 500, 1.35rem → 1.6rem en desktop, line-height 1.3): subsecciones, nombres de servicio.
- **Body** (weight 400, 1.0625rem → 1.125rem en desktop, line-height 1.65, max 68ch en artículos de blog): texto de cuerpo general.
- **Label** (weight 500, 0.65rem, letter-spacing 0.12em, uppercase): subtítulo del logo en el header, texto de apoyo puntual.

### Named Rules
**La Regla del Rol Único.** Cormorant Garamond solo aparece en títulos (h1–h3) y en el tagline del hero. Mulish cubre todo lo demás. Nunca se mezclan dentro del mismo elemento.

## 4. Elevation

El sistema es **plano por capas de color**: no hay sombras en ningún componente. La profundidad y la jerarquía se transmiten alternando fondo champán/rosa pálido entre secciones, y con bordes finos (`rgba(62, 45, 92, 0.12–0.15)`) para separar tarjetas del fondo cuando hace falta contraste extra (tarjetas de servicio en blanco).

### Named Rules
**La Regla Sin Sombra.** Ningún componente usa `box-shadow`. Si un elemento necesita destacar, se resuelve con cambio de fondo (blanco sobre champán/rosa) o con borde fino — nunca con sombra.

## 5. Components

### Buttons
- **Shape:** esquinas suavemente redondeadas (4px).
- **Primary:** fondo ciruela profundo, texto champán, padding 0.85rem 1.6rem, peso 600.
- **Secondary:** transparente, borde ciruela 1px, texto ciruela.
- **Hover / Focus (ambos):** el borde (o el borde que aparece) se dora — `border-color: var(--color-oro)`. El primario mantiene su fondo ciruela; el secundario cambia el texto a oro. Transición suave de 0.2s en borde/color/fondo — el gesto ceremonial del sistema.
- **WhatsApp (variante):** igual que primario, con ícono inline y `gap` entre ícono y texto.

### Cards / Containers
- **Corner Style:** 4px, igual que los botones — una sola escala de radio en todo el sistema.
- **Background:** blanco para tarjetas de servicio (destacan sobre el fondo cálido); rosa pálido como placeholder de imagen en tarjetas de blog mientras no hay foto real.
- **Shadow Strategy:** ninguna — ver Elevation.
- **Border:** 1px `rgba(62, 45, 92, 0.12)` en tarjetas de servicio.
- **Internal Padding:** `--espacio-md` (2rem).

### Inputs / Fields
- **Style:** borde ciruela 1px, fondo blanco, radio 4px, misma tipografía de cuerpo.
- **Focus:** anillo de foco visible en oro (`outline: 2px solid var(--color-oro)`), nunca se suprime.

### Navigation
- **Style:** header sticky, fondo champán, borde inferior sutil ciruela al 15% de opacidad. Logo en Cormorant Garamond con un label uppercase-tracked en Mulish debajo. Enlaces activos se marcan con un borde inferior dorado de 1px, no con cambio de color de fondo. En móvil, colapsa a un botón hamburguesa con borde ciruela.

### CTA Destacado (signature component)
Bloque de fondo ciruela sólido con texto champán — la única superficie del sitio donde el fondo estructural (ciruela) se vuelve fondo de sección en vez de color de texto. Se reserva para el llamado a agendar hora, el momento de mayor intención de conversión de la página.

### Nota de Cuidado (signature component)
Bloque de fondo rosa pálido a tamaño de cuerpo completo (sin borde lateral), usado para límites/protocolo de crisis — el momento de mayor peso emocional del sitio, con la presencia visual que corresponde a sus implicancias. Corregido en la auditoría `/impeccable critique` del 2026-07-08: usaba un borde izquierdo de 3px en oro, la única violación de la Regla del Oro Escaso/borde-lateral en todo el sistema; ahora resuelto con el mismo tratamiento de fondo pleno que el resto de los callouts.

## 6. Do's and Don'ts

### Do:
- **Do** alternar solo entre champán (#F2E6D6) y rosa pálido (#F6E9E4) como fondos de sección — nunca un tercer fondo cálido.
- **Do** reservar el oro (#B8924A) exclusivamente para hover/foco y el ícono lineal simbólico — nunca como color de superficie.
- **Do** mantener Cormorant Garamond solo en títulos y Mulish en todo lo demás.
- **Do** usar la iconografía celeste (luna, estrellas, tarot) como acento lineal puntual, en el mismo trazo fino y dorado que ya existe en `.icono-simbolico` — nunca como ilustración dominante o fondo.
- **Do** anclar el tono "ritual wellness" en algo concreto de la práctica (herbolaria, historia, técnica), nunca en vaguedad mística sola.

### Don't:
- **Don't** usar marcos dorados decorativos, degradados celestes, ni copy Lorem-ipsum de plantilla — la referencia "Mystical Universe / gold frames" es explícitamente lo que este sistema NO es.
- **Don't** introducir sombras (`box-shadow`) en ningún componente — la profundidad es por capas de color, no por elevación.
- **Don't** dejar que el tono "ritual wellness" se vuelva genérico *new-age* — el copy del sitio insiste en rigor histórico; el lenguaje ceremonial siempre va acompañado de contexto concreto.
- **Don't** usar `border-left`/`border-right` mayor a 1px como acento decorativo en tarjetas o callouts — cero excepciones en el sistema desde la corrección de `.nota-cuidado`.
- **Don't** mezclar Cormorant Garamond y Mulish dentro del mismo elemento de texto.
