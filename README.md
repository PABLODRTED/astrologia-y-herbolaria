# Astrología y Herbolaria · por Francisca Giner Mellado

Sitio web estático (HTML + CSS + JS, sin frameworks) para la marca **Astrología y Herbolaria**.
Este documento explica cómo verlo en tu computador, cómo publicarlo gratis en internet, y qué
puedes editar tú misma sin ayuda técnica.

---

## 1. ¿Cómo está organizado el sitio?

```
astrologia-y-herbolaria/
├── index.html          → página de Inicio
├── servicios.html       → catálogo de servicios
├── sobre-mi.html         → página Sobre mí
├── blog/
│   ├── index.html        → listado de artículos
│   └── *.html             → cada artículo del blog
├── partials/              → header, footer, newsletter y CTA (se repiten en todas las páginas)
├── css/                   → estilos (colores, tipografía, componentes)
├── js/
│   ├── config.js          → AQUÍ editas tu WhatsApp, Instagram y correo
│   └── site.js             → lógica del sitio (no es necesario tocarlo)
└── img/                   → imágenes (hoy hay placeholders, ver sección 4)
```

**Regla simple:** el texto que ves en el sitio vive dentro de los archivos `.html`. Puedes abrir
cualquiera de ellos con un editor de texto (o pedirle a Claude Code que lo edite por ti) y cambiar
las palabras entre las etiquetas, sin tocar nada que tenga símbolos como `<` `>` o `class="..."`.

---

## 2. Cómo ver el sitio en tu computador (antes de publicarlo)

Como el sitio carga el header y el footer con JavaScript, **no puedes simplemente hacer doble clic**
en `index.html` — necesitas un pequeño servidor local. Dos formas simples, elige una:

### Opción A — Extensión "Live Server" de VS Code (más fácil si usas VS Code)
1. Instala la extensión **Live Server** desde el panel de extensiones de VS Code.
2. Abre la carpeta `astrologia-y-herbolaria` en VS Code.
3. Clic derecho sobre `index.html` → **"Open with Live Server"**.
4. Se abrirá el sitio en tu navegador y se actualiza solo cuando guardas cambios.

### Opción B — Terminal (si tienes Node.js instalado)
```bash
cd astrologia-y-herbolaria
npx serve
```
Luego abre en tu navegador la dirección que aparezca en la terminal (algo como `http://localhost:3000`).

---

## 3. Cómo publicarlo gratis (dominio y hosting)

Recomiendo **Vercel** por ser la opción más simple para alguien sin experiencia técnica: no requiere
configuración de build, es gratis, y conecta directo con GitHub.

### Paso a paso

1. **Crea una cuenta gratuita en GitHub** (github.com) si no tienes una.
2. **Sube esta carpeta a un repositorio de GitHub.** La forma más simple:
   - Entra a github.com → "New repository" → dale un nombre (ej. `astrologia-y-herbolaria`) → Create.
   - En la página del repositorio recién creado, usa la opción "uploading an existing file" y arrastra
     todos los archivos y carpetas de este proyecto.
   - (Si usas Claude Code, también puedes pedirle que haga esto por ti con comandos de `git`.)
3. **Crea una cuenta gratuita en Vercel** (vercel.com), lo más simple es iniciar sesión con tu
   cuenta de GitHub.
4. En el panel de Vercel, ve a **Add New → Project → Import Git Repository**.
5. Elige el repositorio que subiste. En la configuración del proyecto:
   - Framework Preset: **Other** (o "No Framework")
   - Build Command: (déjalo vacío)
   - Output Directory: `./` (la raíz)
6. Clic en **Deploy**. En 1-2 minutos tendrás una URL gratuita tipo
   `astrologia-y-herbolaria.vercel.app` funcionando.

### Conectar tu propio dominio (cuando lo tengas)

Una vez que compres un dominio (ej. en NIC Chile para `.cl`, o en cualquier registrador para `.com`):
1. En el mismo proyecto de Vercel, ve a **Settings → Domains → Add**.
2. Sigue las instrucciones para apuntar tu dominio (Vercel te guía paso a paso, incluso si el
   dominio lo compraste en otro proveedor).

**Alternativa:** GitHub Pages también es gratuita y funciona bien para este sitio (Settings → Pages →
elegir la rama `main` como fuente), pero Vercel ofrece mejor rendimiento y una configuración de
dominio propio más simple para alguien sin experiencia técnica.

---

## 4. Qué te falta definir (y cómo hacerlo tú misma)

### a) Número de WhatsApp, Instagram y correo
Abre `js/config.js` y reemplaza los 3 valores marcados con `⚠️ PLACEHOLDER`. Se actualizan
automáticamente en todo el sitio (header, footer y botones de "agendar hora").

### b) Fotografías reales
Hoy hay imágenes de referencia (dibujos lineales simples) en la carpeta `img/`:
- `placeholder-retrato.svg` → foto tuya en Sobre mí
- `placeholder-blog-*.svg` → imágenes de cada artículo del blog

Para reemplazarlas: agrega tu foto a la carpeta `img/` (ej. `img/francisca-retrato.jpg`) y cambia el
atributo `src="img/placeholder-retrato.svg"` por `src="img/francisca-retrato.jpg"` en `sobre-mi.html`
(y lo mismo para las imágenes de blog). No olvides escribir una descripción breve en el atributo `alt`.

### c) Proveedor de newsletter definitivo
Los formularios de "El cielo del mes" (en `partials/newsletter.html` y `partials/footer.html`) son
un placeholder visual: hoy no envían datos a ningún lado. Cuando definas tu proveedor (por ejemplo
MailerLite), su plataforma te entregará un código de "embed" (HTML) para pegar en reemplazo del
`<form>...</form>` de esos dos archivos. No necesitas tocar nada más del sitio para esto.

### d) Dominio
Aún no tienes uno — puedes publicar el sitio en la URL gratuita de Vercel
(`tu-sitio.vercel.app`) mientras decides y compras un dominio propio (ver sección 3).

---

## 5. Si necesitas ayuda para editar textos más adelante

Puedes pedirle a Claude Code (o a cualquier persona con conocimientos básicos de HTML) que edite
directamente el archivo `.html` de la página correspondiente. Como el texto está separado del diseño
(que vive en `css/`), es muy difícil "romper" el sitio solo editando palabras.
