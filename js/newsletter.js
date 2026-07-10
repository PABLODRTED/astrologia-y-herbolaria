/* ============================================================
   NEWSLETTER.JS — formularios de suscripción a "El cielo del mes"
   ============================================================
   Llena el dropdown de ciudades chilenas, maneja el campo "otra
   ciudad" y envía los datos de nacimiento a /api/subscribe.

   Se llama desde js/site.js después de cargar los partials (los
   formularios viven dentro de partials/newsletter.html y
   partials/footer.html, que se inyectan por fetch).
   ============================================================ */

let ciudadesPromesa = null;

function obtenerCiudades() {
  if (!ciudadesPromesa) {
    ciudadesPromesa = fetch('/data/ciudades-chile.json')
      .then((respuesta) => {
        if (!respuesta.ok) throw new Error(`No se pudo cargar la lista de ciudades (${respuesta.status})`);
        return respuesta.json();
      })
      .then((datos) => datos.ciudades);
  }
  return ciudadesPromesa;
}

async function llenarSelectCiudades(select, form) {
  try {
    const ciudades = await obtenerCiudades();
    const otraOpcion = select.querySelector('option[value="__otra__"]');
    ciudades.forEach((ciudad) => {
      const opcion = document.createElement('option');
      opcion.value = ciudad.nombre;
      opcion.textContent = ciudad.nombre;
      select.insertBefore(opcion, otraOpcion);
    });
  } catch (error) {
    console.error('Error cargando ciudades:', error);
    // Si la lista no cargó, dejamos "Otra ciudad" como única opción usable
    // en vez de un select roto sin explicación.
    select.value = '__otra__';
    select.dispatchEvent(new Event('change'));
    mostrarMensaje(form, 'No pudimos cargar la lista de ciudades — escribe tu ciudad de nacimiento a mano.', 'error');
  }
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

    const mensaje = resultado.cartaNatalFallo
      ? '¡Gracias! Quedaste suscrita — tuvimos un problema calculando tu carta natal, lo revisamos antes del próximo envío.'
      : '¡Gracias! Revisa tu correo para confirmar la suscripción.';
    mostrarMensaje(form, mensaje, 'ok');
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
      llenarSelectCiudades(select, form);
      manejarCambioCiudad(form);
    }

    form.addEventListener('submit', (evento) => manejarEnvio(form, evento));
  });
};
