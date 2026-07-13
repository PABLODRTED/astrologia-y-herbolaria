/* ============================================================
   POST /api/subscribe
   Recibe el formulario de "El cielo del mes", calcula el ascendente
   y la luna natal (cuando hay datos suficientes) y crea o actualiza
   la suscriptora en MailerLite guardando todo como custom fields.
   ============================================================ */

const { calcularCartaNatal, REFERENCIA_SANTIAGO } = require('../lib/ephemeris.js');
const { crearOActualizarSuscriptora } = require('../lib/mailerlite.js');
const ciudadesChile = require('../data/ciudades-chile.json');

function buscarCiudad(nombre) {
  return ciudadesChile.ciudades.find((c) => c.nombre === nombre) || null;
}

function validarEmail(email) {
  return typeof email === 'string' && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

module.exports = async function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Método no permitido.' });
    return;
  }

  const { email, fecha_nacimiento, hora_nacimiento, lugar_nacimiento, otra_ciudad, consentimiento } = req.body || {};

  if (!validarEmail(email)) {
    res.status(400).json({ error: 'Ingresa un correo electrónico válido.' });
    return;
  }
  if (!fecha_nacimiento || !/^\d{4}-\d{2}-\d{2}$/.test(fecha_nacimiento)) {
    res.status(400).json({ error: 'Ingresa tu fecha de nacimiento.' });
    return;
  }
  if (!lugar_nacimiento) {
    res.status(400).json({ error: 'Selecciona tu ciudad de nacimiento.' });
    return;
  }
  if (!consentimiento) {
    res.status(400).json({ error: 'Necesitamos tu consentimiento para calcular tu carta natal.' });
    return;
  }

  if (hora_nacimiento && !/^([01]\d|2[0-3]):([0-5]\d)$/.test(hora_nacimiento)) {
    res.status(400).json({ error: 'La hora de nacimiento debe tener el formato HH:MM.' });
    return;
  }

  const [year, month, date] = fecha_nacimiento.split('-').map(Number);
  const horaConocida = Boolean(hora_nacimiento);
  const [hour, minute] = horaConocida ? hora_nacimiento.split(':').map(Number) : [12, 0];

  const esOtraCiudad = lugar_nacimiento === '__otra__';
  const ciudad = esOtraCiudad ? null : buscarCiudad(lugar_nacimiento);
  if (!esOtraCiudad && !ciudad) {
    res.status(400).json({ error: 'Ciudad de nacimiento no reconocida.' });
    return;
  }

  // El signo solar y lunar no dependen de la ubicación del observador, así
  // que se pueden calcular aunque la ciudad no esté en la tabla ("otra
  // ciudad") usando una coordenada de referencia. El ascendente sí depende
  // de la ubicación real y de la hora exacta — solo se calcula cuando se
  // conocen ambas.
  let cartaNatal = { solSigno: null, lunaSigno: null, ascendenteSigno: null };
  let cartaNatalFallo = false;
  try {
    cartaNatal = calcularCartaNatal(
      {
        year,
        month: month - 1,
        date,
        hour,
        minute,
        lat: ciudad ? ciudad.lat : REFERENCIA_SANTIAGO.lat,
        lon: ciudad ? ciudad.lon : REFERENCIA_SANTIAGO.lon,
      },
      Boolean(ciudad) && horaConocida
    );
  } catch (error) {
    console.error('Error calculando carta natal:', error);
    cartaNatalFallo = true;
  }

  const nombreCiudad = esOtraCiudad ? (otra_ciudad || 'No especificada') : ciudad.nombre;

  try {
    await crearOActualizarSuscriptora(
      email,
      {
        fecha_nacimiento,
        hora_nacimiento: hora_nacimiento || '',
        lugar_nacimiento: nombreCiudad,
        ascendente: cartaNatal.ascendenteSigno || '',
        luna_natal: cartaNatal.lunaSigno || '',
      },
      process.env.MAILERLITE_GROUP_ID ? [process.env.MAILERLITE_GROUP_ID] : []
    );
    res.status(200).json({ ok: true, cartaNatalFallo });
  } catch (error) {
    console.error('Error creando suscriptora en MailerLite:', error);
    res.status(502).json({ error: 'No pudimos completar la suscripción. Intenta de nuevo en unos minutos.' });
  }
};
