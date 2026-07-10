/* ============================================================
   POST /api/subscribe
   Recibe el formulario de "El cielo del mes", calcula el ascendente
   y la luna natal (cuando hay datos suficientes) y crea o actualiza
   la suscriptora en MailerLite guardando todo como custom fields.
   ============================================================ */

const { calcularCartaNatal } = require('../lib/ephemeris.js');
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

  const [year, month, date] = fecha_nacimiento.split('-').map(Number);
  const horaConocida = Boolean(hora_nacimiento);
  const [hour, minute] = horaConocida ? hora_nacimiento.split(':').map(Number) : [12, 0];

  const esOtraCiudad = lugar_nacimiento === '__otra__';
  const ciudad = esOtraCiudad ? null : buscarCiudad(lugar_nacimiento);
  if (!esOtraCiudad && !ciudad) {
    res.status(400).json({ error: 'Ciudad de nacimiento no reconocida.' });
    return;
  }

  // Sin coordenadas conocidas ("otra ciudad") no se puede calcular ascendente
  // ni luna natal de forma confiable — se guardan los datos crudos igual,
  // para que Francisca pueda completarlos a mano si corresponde.
  let cartaNatal = { solSigno: null, lunaSigno: null, ascendenteSigno: null };
  if (ciudad) {
    try {
      cartaNatal = calcularCartaNatal(
        { year, month: month - 1, date, hour, minute, lat: ciudad.lat, lon: ciudad.lon },
        horaConocida
      );
    } catch (error) {
      console.error('Error calculando carta natal:', error);
    }
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
    res.status(200).json({ ok: true });
  } catch (error) {
    console.error('Error creando suscriptora en MailerLite:', error);
    res.status(502).json({ error: 'No pudimos completar la suscripción. Intenta de nuevo en unos minutos.' });
  }
};
