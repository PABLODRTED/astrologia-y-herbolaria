/* ============================================================
   MAILERLITE — helper mínimo sobre la API REST de MailerLite.
   Requiere la variable de entorno MAILERLITE_API_KEY (nunca en el
   repo — se configura como variable de entorno en Vercel).
   ============================================================ */

const BASE_URL = 'https://connect.mailerlite.com/api';

function apiKey() {
  const key = process.env.MAILERLITE_API_KEY;
  if (!key) throw new Error('Falta MAILERLITE_API_KEY en las variables de entorno.');
  return key;
}

async function llamarApi(ruta, opciones = {}) {
  const respuesta = await fetch(`${BASE_URL}${ruta}`, {
    ...opciones,
    headers: {
      Authorization: `Bearer ${apiKey()}`,
      'Content-Type': 'application/json',
      Accept: 'application/json',
      ...opciones.headers,
    },
  });

  const cuerpo = await respuesta.json().catch(() => ({}));
  if (!respuesta.ok) {
    const mensaje = cuerpo?.message || `Error de MailerLite (${respuesta.status})`;
    throw new Error(mensaje);
  }
  return cuerpo;
}

/**
 * Crea o actualiza una suscriptora por correo, con sus custom fields.
 * @param {string} email
 * @param {Record<string, string>} campos — custom fields ya creados en MailerLite
 * @param {string[]} [grupos] — IDs de grupo a los que agregarla
 */
async function crearOActualizarSuscriptora(email, campos = {}, grupos = []) {
  return llamarApi('/subscribers', {
    method: 'POST',
    body: JSON.stringify({
      email,
      fields: campos,
      groups: grupos,
    }),
  });
}

async function obtenerSuscriptora(email) {
  return llamarApi(`/subscribers/${encodeURIComponent(email)}`);
}

async function listarSuscriptorasDeGrupo(grupoId) {
  const resultados = [];
  let url = `/subscribers?filter[group]=${encodeURIComponent(grupoId)}&limit=100`;
  while (url) {
    const pagina = await llamarApi(url);
    resultados.push(...(pagina.data || []));
    url = pagina.links?.next ? pagina.links.next.replace(BASE_URL, '') : null;
  }
  return resultados;
}

async function crearCampania({ nombre, asunto, remitenteNombre, remitenteEmail, html, grupoId }) {
  return llamarApi('/campaigns', {
    method: 'POST',
    body: JSON.stringify({
      name: nombre,
      type: 'regular',
      emails: [
        {
          subject: asunto,
          from_name: remitenteNombre,
          from: remitenteEmail,
          content: html,
        },
      ],
      groups: [grupoId],
    }),
  });
}

async function enviarCampania(campaniaId) {
  return llamarApi(`/campaigns/${campaniaId}/schedule`, {
    method: 'POST',
    body: JSON.stringify({ delivery: 'instant' }),
  });
}

module.exports = {
  crearOActualizarSuscriptora,
  obtenerSuscriptora,
  listarSuscriptorasDeGrupo,
  crearCampania,
  enviarCampania,
};
