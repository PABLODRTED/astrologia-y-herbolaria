/* ============================================================
   NEWSLETTER.JS — formularios de suscripción a "El cielo del mes"
   ============================================================
   Llena el dropdown de ciudades chilenas, maneja el campo "otra
   ciudad" y envía los datos de nacimiento a /api/subscribe.

   Se llama desde js/site.js después de cargar los partials (los
   formularios viven dentro de partials/newsletter.html y
   partials/footer.html, que se inyectan por fetch).
   ============================================================ */

let ciudadesCache = null;

async function obtenerCiudades() {
  if (ciudadesCache) return ciudadesCache;
  const respuesta = await fetch('/data/ciudades-chile.json');
  const datos = await respuesta.json();
  ciudadesCache = datos.ciudades;
  return ciudadesCache;
}

async function llenarSelectCiudades(select) {
  const ciudades = await obtenerCiudades();
  const otraOpcion = select.querySelector('option[value="__otra__"]');
  ciudades.forEach((ciudad) => {
    const opcion = document.createElement('option');
    opcion.value = ciudad.nombre;
    opcion.textContent = ciudad.nombre;
    select.insertBefore(opcion, otraOpcion);
  });
}

function manejarCambioCiudad(form) {
  const select = form.querySelector('select[name="lugar_nacimiento"]');
  const campoOtra = form.querySelector('[data-campo-otra-ciudad]');
  if (!select || !campoOtra) return;

  select.addEventListener('change', () => {
    const esOtra = select.value === '__otra__';
    campoOtra.hidden = !esOtra;
    campoOtra.querySelector('input').required = esOtra;
  });
}

function mostrarMensaje(form, texto, estado) {
  const mensaje = form.querySelector('[data-mensaje-newsletter]');
  if (!mensaje) return;
  mensaje.textContent = texto;
  mensaje.setAttribute('data-estado', estado);
}

async function manejarEnvio(form, evento) {
  evento.preventDefault();
  const boton = form.querySelector('button[type="submit"]');
  const datos = Object.fromEntries(new FormData(form).entries());

  boton.disabled = true;
  mostrarMensaje(form, 'Enviando…', 'info');

  try {
    const respuesta = await fetch('/api/subscribe', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(datos),
    });
    const resultado = await respuesta.json().catch(() => ({}));

    if (!respuesta.ok) {
      throw new Error(resultado.error || 'No se pudo completar la suscripción.');
    }

    mostrarMensaje(form, '¡Gracias! Revisa tu correo para confirmar la suscripción.', 'ok');
    form.reset();
  } catch (error) {
    mostrarMensaje(form, error.message || 'Algo falló. Intenta de nuevo en unos minutos.', 'error');
  } finally {
    boton.disabled = false;
  }
}

window.inicializarFormulariosNewsletter = function inicializarFormulariosNewsletter() {
  document.querySelectorAll('[data-form-newsletter]').forEach((form) => {
    if (form.dataset.newsletterListo) return;
    form.dataset.newsletterListo = 'true';

    const select = form.querySelector('select[name="lugar_nacimiento"]');
    if (select) {
      llenarSelectCiudades(select);
      manejarCambioCiudad(form);
    }

    form.addEventListener('submit', (evento) => manejarEnvio(form, evento));
  });
};
