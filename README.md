# Astrología y Herbolaria · por Francisca Giner Mellado

Sitio web de la marca **Astrología y Herbolaria**. La home (`/`) está construida con
**Next.js + React + Tailwind**; el resto de páginas (Servicios, Sobre mí, Blog) todavía viven
como HTML/CSS/JS estático en `public/legacy/` mientras se migran en una próxima etapa. El
newsletter "El cielo del mes" es funcional de verdad: envía los datos a MailerLite a través de
una función serverless.

---

## 1. ¿Cómo está organizado el sitio?

```
astrologia-y-herbolaria/
├── app/                    → Home (Next.js App Router): page.tsx, layout.tsx, globals.css
├── components/              → Header, Footer, Newsletter, CtaWhatsapp (React)
├── lib/                      → site-config.ts, utils.ts, mailerlite.js, ephemeris.js
├── api/subscribe.js           → función serverless: alta de suscriptoras en MailerLite
├── data/ciudades-chile.json    → ciudades para el selector "lugar de nacimiento" del newsletter
├── public/legacy/                → sitio estático original, todavía en producción:
│   ├── servicios.html              → catálogo de servicios
│   ├── sobre-mi.html                → página Sobre mí
│   ├── blog/                         → listado de artículos + cada post
│   ├── partials/                      → header, footer, newsletter y CTA (HTML compartido)
│   ├── css/                            → estilos del sitio legacy
│   └── js/                              → config.js (WhatsApp/Instagram/correo) y lógica del sitio legacy
└── privacidad.html                        → política de privacidad
```

**Regla simple:** el texto de la home vive en `app/page.tsx` y `components/*.tsx`; el texto del
resto de páginas (aún no migradas) vive en los archivos `.html` dentro de `public/legacy/`.

---

## 2. Cómo ver el sitio en tu computador

```bash
npm install
npm run dev
```

Abre `http://localhost:3000`. La home usa Next.js con recarga en caliente. Las páginas del sitio
legacy (Servicios, Sobre mí, Blog) se sirven automáticamente desde `/legacy/...` — por ejemplo
`http://localhost:3000/legacy/servicios.html`.

Si además quieres previsualizar el sitio legacy de forma aislada (sin Next.js), puedes correr:
```bash
npm run legacy
```

---

## 3. Cómo publicarlo

El proyecto se despliega en **Vercel**: detecta automáticamente que es un proyecto Next.js
(`npm run build` genera un export estático en `out/`, más la función serverless `api/subscribe.js`
para el newsletter). Basta con importar el repositorio en Vercel — no hace falta configurar nada
manualmente.

### Variables de entorno necesarias

El newsletter requiere configurar en Vercel (Settings → Environment Variables):
- `MAILERLITE_API_KEY` — tu clave de API de MailerLite ([dashboard.mailerlite.com/integrations/api](https://dashboard.mailerlite.com/integrations/api))
- `MAILERLITE_GROUP_ID` — (opcional) el grupo de MailerLite al que agregar las nuevas suscriptoras

Para desarrollo local, copia `.env.local.example` a `.env.local` y completa esos valores.

### Conectar tu propio dominio

En el proyecto de Vercel: **Settings → Domains → Add**, y sigue las instrucciones (Vercel te guía
paso a paso, incluso si el dominio lo compraste en otro proveedor).

---

## 4. Qué te falta definir (y cómo hacerlo tú misma)

### a) Número de WhatsApp, Instagram y correo
Abre `lib/site-config.ts` (para la home) y `public/legacy/js/config.js` (para el resto del sitio) y
reemplaza los valores de WhatsApp, Instagram y correo.

### b) Fotografías reales
Hoy hay imágenes de referencia (dibujos lineales simples) en `public/legacy/img/`:
- `placeholder-retrato.svg` → foto tuya en Sobre mí
- `placeholder-blog-*.svg` → imágenes de cada artículo del blog

Para reemplazarlas: agrega tu foto a esa carpeta (ej. `public/legacy/img/francisca-retrato.jpg`) y
cambia el atributo `src` en `public/legacy/sobre-mi.html` (y lo mismo para las imágenes de blog). No
olvides escribir una descripción breve en el atributo `alt`.

### c) Newsletter — MailerLite
El formulario de "El cielo del mes" (home y footer) ya está conectado a MailerLite: pide correo,
fecha/hora de nacimiento y ciudad, calcula signo solar/lunar/ascendente, y da de alta a la
suscriptora vía `api/subscribe.js`. Solo falta configurar las variables de entorno de la sección 3.

### d) Dominio
Aún no tienes uno — puedes publicar el sitio en la URL gratuita de Vercel
(`tu-sitio.vercel.app`) mientras decides y compras un dominio propio (ver sección 3).

---

## 5. Si necesitas ayuda para editar textos más adelante

Puedes pedirle a Claude Code (o a cualquier persona con conocimientos básicos de React/HTML) que
edite directamente el archivo correspondiente: `app/page.tsx`/`components/*.tsx` para la home, o el
archivo `.html` correspondiente dentro de `public/legacy/` para el resto de páginas.
