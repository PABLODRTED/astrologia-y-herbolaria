/* ============================================================
   EPHEMERIS — cálculo de carta natal (ascendente, sol, luna) y
   signo de la luna llena de un mes dado.

   Usa circular-natal-horoscope-js (validado contra cartas natales
   publicadas — ver notas de la Fase 0 del plan). No requiere
   binarios nativos, corre en funciones serverless de Vercel.
   ============================================================ */

const pkg = require('circular-natal-horoscope-js');
const { Origin, Horoscope } = pkg;

// La librería localiza correctamente CelestialBodies.*.Sign.label (sol, luna)
// con `language: 'es'`, pero Angles.ascendant.Sign.label siempre devuelve el
// nombre en inglés — inconsistencia interna de la librería (probada en
// circular-natal-horoscope-js ^1.1.0, ver package.json). Se traduce acá en
// vez de depender de su i18n para ese único dato; si se actualiza la
// dependencia, vale la pena revisar si esto se puede eliminar.
const SIGNOS_EN_ES = {
  Aries: 'Aries',
  Taurus: 'Tauro',
  Gemini: 'Géminis',
  Cancer: 'Cáncer',
  Leo: 'Leo',
  Virgo: 'Virgo',
  Libra: 'Libra',
  Scorpio: 'Escorpio',
  Sagittarius: 'Sagitario',
  Capricorn: 'Capricornio',
  Aquarius: 'Acuario',
  Pisces: 'Piscis',
};

function traducirSigno(nombreIngles) {
  return SIGNOS_EN_ES[nombreIngles] || nombreIngles;
}

// Lat/lon de referencia para calcular sol y luna cuando no se conoce la
// ubicación real de nacimiento — su signo zodiacal no depende de la
// ubicación del observador, así que cualquier coordenada fija sirve.
const REFERENCIA_SANTIAGO = { lat: -33.4489, lon: -70.6693 };

function construirHoroscopo({ year, month, date, hour, minute, lat, lon }) {
  const origin = new Origin({
    year,
    month, // 0 = enero ... 11 = diciembre
    date,
    hour,
    minute,
    latitude: lat,
    longitude: lon,
  });

  return new Horoscope({
    origin,
    houseSystem: 'placidus',
    zodiac: 'tropical',
    aspectPoints: ['bodies', 'points', 'angles'],
    aspectWithPoints: ['bodies', 'points', 'angles'],
    aspectTypes: ['major'],
    customOrbs: {},
    language: 'es',
  });
}

/**
 * Calcula sol, luna y ascendente natal a partir de fecha, hora y
 * ubicación de nacimiento.
 *
 * @param {{year:number, month:number, date:number, hour:number, minute:number, lat:number, lon:number}} datos
 *   month es 0-indexado (0 = enero). Si no se conoce la hora exacta,
 *   pasar hour:12, minute:0 como aproximación — pero el ascendente
 *   calculado en ese caso NO es confiable (cambia cada ~2 horas) y
 *   no debe usarse; solo sol y luna siguen siendo válidos.
 * @param {boolean} horaConocida — si es false, el resultado no incluye ascendente.
 */
function calcularCartaNatal(datos, horaConocida = true) {
  const horoscope = construirHoroscopo(datos);
  const resultado = {
    solSigno: horoscope.CelestialBodies.sun.Sign.label,
    lunaSigno: horoscope.CelestialBodies.moon.Sign.label,
    ascendenteSigno: null,
  };
  if (horaConocida) {
    resultado.ascendenteSigno = traducirSigno(horoscope.Angles.ascendant.Sign.label);
  }
  return resultado;
}

function longitudEclipticaSolYLuna({ year, month, date, hour, minute }) {
  // Lat/lon de referencia: la posición eclíptica del sol y la luna
  // (a diferencia del ascendente) no depende de la ubicación del
  // observador para efectos de qué signo zodiacal ocupan — se usa
  // Santiago como referencia fija, sin impacto en el resultado.
  const horoscope = construirHoroscopo({ year, month, date, hour, minute, ...REFERENCIA_SANTIAGO });
  return {
    sol: horoscope.CelestialBodies.sun.ChartPosition.Ecliptic.DecimalDegrees,
    luna: horoscope.CelestialBodies.moon.ChartPosition.Ecliptic.DecimalDegrees,
  };
}

/**
 * Encuentra la luna llena de un mes/año dado (oposición sol-luna,
 * ~180° de diferencia eclíptica) escaneando el mes cada 3 horas, y
 * devuelve el signo zodiacal que ocupa la luna en ese instante.
 *
 * @param {number} year
 * @param {number} month — 0-indexado (0 = enero)
 */
function calcularSignoLunaLlena(year, month) {
  const diasEnMes = new Date(year, month + 1, 0).getDate();
  let mejorDiferencia = Infinity;
  let mejorInstante = null;

  for (let dia = 1; dia <= diasEnMes; dia++) {
    for (let hora = 0; hora < 24; hora += 3) {
      const { sol, luna } = longitudEclipticaSolYLuna({ year, month, date: dia, hour: hora, minute: 0 });
      // Diferencia respecto a la oposición exacta (180°) entre luna y sol.
      const anguloLunaSol = (luna - sol + 360) % 360;
      const distanciaAOposicion = Math.abs(anguloLunaSol - 180);
      if (distanciaAOposicion < mejorDiferencia) {
        mejorDiferencia = distanciaAOposicion;
        mejorInstante = { year, month, date: dia, hour: hora, minute: 0 };
      }
    }
  }

  const horoscope = construirHoroscopo({ ...mejorInstante, ...REFERENCIA_SANTIAGO });
  return {
    fecha: mejorInstante,
    signo: horoscope.CelestialBodies.moon.Sign.label,
  };
}

module.exports = { calcularCartaNatal, calcularSignoLunaLlena, REFERENCIA_SANTIAGO };
