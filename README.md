# Astrología y Herbolaria · por Francisca Giner Mellado

Sitio web de la marca **Astrología y Herbolaria**, construido con **Next.js + React + Tailwind**.
El newsletter "El cielo del mes" es funcional de verdad: envía los datos a MailerLite a través de
una función serverless.

---

## 1. ¿Cómo está organizado el sitio?

```
astrologia-y-herbolaria/
├── app/                       → páginas (Next.js App Router)
│   ├── page.tsx                 → Inicio
│   ├── servicios/page.tsx        → Servicios
│   ├── sobre-mi/page.tsx          → Sobre mí
│   ├── blog/page.tsx               → listado de artículos
│   ├── blog/<slug>/page.tsx         → cada artículo del blog
│   ├── privacidad/page.tsx           → política de privacidad
│   └── layout.tsx                     → shell compartido (Header, Footer, fuentes)
├── components/                → Header, Footer, Newsletter, tarjetas, botones, etc. (React)
├── lib/                        → site-config.ts, utils.ts, mailerlite.js, ephemeris.js
├── api/subscribe.js             → función serverless: alta de suscriptoras en MailerLite
├── data/ciudades-chile.json      → ciudades para el selector "lugar de nacimiento" del newsletter
└── public/img/                    → imágenes (hoy hay placeholders, ver sección 4)
```

**Regla simple:** el texto de cada página vive directamente en su archivo `page.tsx` dentro de
`app/`, o en los componentes que usa (`components/*.tsx`).

---

## 2. Cómo ver el sitio en tu computador

```bash
npm install
npm run dev
```

Abre `http://localhost:3000`. Next.js recarga en caliente al guardar cambios.

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
Abre `lib/site-config.ts` y reemplaza los valores de WhatsApp, Instagram y correo — se actualizan
automáticamente en todo el sitio (header, footer y botones de "agendar hora").

### b) Fotografías reales
Hoy hay imágenes de referencia (dibujos lineales simples) en `public/img/`:
- `placeholder-retrato.svg` → foto tuya en Sobre mí
- `placeholder-blog-*.svg` → imágenes de cada artículo del blog

Para reemplazarlas: agrega tu foto a esa carpeta (ej. `public/img/francisca-retrato.jpg`) y cambia
el atributo `src` en `app/sobre-mi/page.tsx` (y lo mismo para las imágenes de blog en
`app/blog/page.tsx`). No olvides escribir una descripción breve en el atributo `alt`.

### c) Newsletter — MailerLite
El formulario de "El cielo del mes" (home y footer) ya está conectado a MailerLite: pide correo,
fecha/hora de nacimiento y ciudad, calcula signo solar/lunar/ascendente, y da de alta a la
suscriptora vía `api/subscribe.js`. Solo falta configurar las variables de entorno de la sección 3.

### d) Dominio
Aún no tienes uno — puedes publicar el sitio en la URL gratuita de Vercel
(`tu-sitio.vercel.app`) mientras decides y compras un dominio propio (ver sección 3).

---

## 5. Si necesitas ayuda para editar textos más adelante

Puedes pedirle a Claude Code (o a cualquier persona con conocimientos básicos de React) que edite
directamente el archivo `page.tsx` de la página correspondiente dentro de `app/`, o el componente
que quieras cambiar dentro de `components/`.
