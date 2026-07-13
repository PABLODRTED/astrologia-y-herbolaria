import type { Metadata } from "next";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Privacidad",
  description:
    "Qué datos se recolectan al suscribirse a El cielo del mes, para qué se usan y cómo darse de baja.",
};

export default function Privacidad() {
  return (
    <>
      <section className="contenedor py-xl pb-lg text-center">
        <h1 className="text-[2.25rem] md:text-[3.25rem]">Privacidad</h1>
        <p className="mx-auto max-w-[60ch] text-[1.05rem]">
          Qué datos se recolectan al suscribirse a El cielo del mes, para qué se usan y cómo darse de baja.
        </p>
      </section>

      <section className="bg-rosa-palido py-lg">
        <div className="contenedor mx-auto max-w-[68ch]">
          <h2>Qué se recolecta</h2>
          <p>
            Al suscribirte a El cielo del mes pides tu correo electrónico y tu fecha, hora (opcional) y ciudad de
            nacimiento. Estos datos se usan únicamente para calcular tu ascendente y tu luna natal, y así escribir
            un párrafo personalizado cada mes — no se usan con ningún otro fin.
          </p>

          <h2>Dónde se guardan</h2>
          <p>
            Tus datos se almacenan en MailerLite, la plataforma que usamos para enviar el correo mensual.
            MailerLite actúa como procesador de estos datos; puedes revisar su propia política de privacidad en
            su sitio.
          </p>

          <h2>Cómo darte de baja</h2>
          <p>
            Cada correo incluye un link para darte de baja. Al hacerlo, tus datos se eliminan de la lista de
            suscriptoras.
          </p>

          <h2>Contacto</h2>
          <p>
            Si tienes preguntas sobre tus datos, escribe a <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>.
          </p>
        </div>
      </section>
    </>
  );
}
