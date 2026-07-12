/* ============================================================
   CONFIGURACIÓN GENERAL DEL SITIO
   ============================================================
   Edita SOLO los valores de aquí abajo para actualizar el número
   de WhatsApp, Instagram o correo en TODO el sitio a la vez
   (aparecen en el header, footer y botones de "agendar hora").

   No necesitas tocar ningún otro archivo para estos 3 datos.
   ============================================================ */

window.SITE_CONFIG = {
  // Formato internacional, SIN "+" y SIN espacios.
  // Ejemplo: si tu número es +56 9 1234 5678, escribe "56912345678"
  whatsapp: "56976229115",

  instagram: "https://www.instagram.com/astrologiayherbolaria",

  email: "franciscaginer@gmail.com",
};

// Aviso en consola si alguno de los 3 datos de arriba vuelve a quedar
// como placeholder (por ejemplo, tras copiar este archivo a un sitio
// nuevo): evita que un CTA de "Agendar hora" apunte a la nada en silencio.
(function avisarSiHayPlaceholders() {
  const config = window.SITE_CONFIG;
  const advertencias = [];
  if (!config.whatsapp || config.whatsapp === "56900000000") {
    advertencias.push("whatsapp");
  }
  if (!config.instagram || config.instagram.includes("tu_usuario")) {
    advertencias.push("instagram");
  }
  if (!config.email || config.email.includes("tudominio.cl")) {
    advertencias.push("email");
  }
  if (advertencias.length > 0) {
    console.warn(
      `⚠️ js/config.js: falta configurar ${advertencias.join(", ")}. ` +
      "Los botones de contacto no funcionarán hasta reemplazar estos valores."
    );
  }
})();
