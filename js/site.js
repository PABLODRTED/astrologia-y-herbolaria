/* ============================================================
   SITE.JS — lógica compartida por todas las páginas
   ============================================================
   1. Carga los partials (header, footer) por fetch.
   2. Marca el link de navegación activo.
   3. Arma los links de WhatsApp usando SITE_CONFIG (config.js).
   4. Controla el menú móvil.

   No necesitas editar este archivo para cambiar textos: los
   textos viven en /partials/*.html y en cada página .html.
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {
  // data-base indica la ruta a la raíz del sitio desde la página actual:
  // "." si el archivo está en la raíz, ".." si está dentro de /blog/.
  const base = document.documentElement.getAttribute('data-base') || '.';

  cargarPartials(base).then(() => {
    marcarNavActivo();
    activarWhatsapp();
    activarRedesYCorreo();
    activarMenuMovil();
    completarAnioActual();
  });
});

// Carga cada contenedor <div data-partial="nombre"></div> con el HTML
// correspondiente en /partials/nombre.html
async function cargarPartials(base) {
  const mounts = Array.from(document.querySelectorAll('[data-partial]'));
  await Promise.all(mounts.map(async (el) => {
    const nombre = el.getAttribute('data-partial');
    try {
      const respuesta = await fetch(`${base}/partials/${nombre}.html`);
      if (!respuesta.ok) throw new Error(`No se pudo cargar el partial "${nombre}"`);
      let html = await respuesta.text();
      // {{BASE}} permite que los links dentro del partial funcionen igual
      // desde la raíz que desde /blog/.
      html = html.replaceAll('{{BASE}}', base);
      el.innerHTML = html;
    } catch (error) {
      console.error(error);
    }
  }));
}

// Subraya en la navegación el link de la página en la que estás
function marcarNavActivo() {
  const paginaActual = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav a').forEach((link) => {
    const destino = link.getAttribute('href').split('/').pop();
    if (destino === paginaActual) {
      link.classList.add('activo');
    }
  });
}

// Convierte cualquier elemento con [data-wa-msg] en un link de WhatsApp
// funcional, usando el número definido en js/config.js
function activarWhatsapp() {
  const numero = window.SITE_CONFIG?.whatsapp || '';
  document.querySelectorAll('[data-wa-msg]').forEach((el) => {
    const mensaje = el.getAttribute('data-wa-msg');
    el.setAttribute('href', `https://wa.me/${numero}?text=${encodeURIComponent(mensaje)}`);
    el.setAttribute('target', '_blank');
    el.setAttribute('rel', 'noopener noreferrer');
  });
}

// Completa los links de Instagram y correo desde SITE_CONFIG
function activarRedesYCorreo() {
  document.querySelectorAll('[data-config="instagram"]').forEach((el) => {
    el.setAttribute('href', window.SITE_CONFIG?.instagram || '#');
  });
  document.querySelectorAll('[data-config="email"]').forEach((el) => {
    const correo = window.SITE_CONFIG?.email || '';
    el.setAttribute('href', `mailto:${correo}`);
    if (el.hasAttribute('data-config-text')) {
      el.textContent = correo;
    }
  });
}

// Completa el año actual en la nota legal del footer, para que nunca
// quede desactualizado.
function completarAnioActual() {
  document.querySelectorAll('[data-anio-actual]').forEach((el) => {
    el.textContent = new Date().getFullYear();
  });
}

// Menú móvil: botón hamburguesa simple con aria-expanded
function activarMenuMovil() {
  const boton = document.querySelector('.nav-toggle');
  const nav = document.querySelector('.nav');
  if (!boton || !nav) return;

  boton.addEventListener('click', () => {
    const abierto = nav.classList.toggle('abierto');
    boton.setAttribute('aria-expanded', String(abierto));
    boton.setAttribute('aria-label', abierto ? 'Cerrar menú de navegación' : 'Abrir menú de navegación');
  });
}
