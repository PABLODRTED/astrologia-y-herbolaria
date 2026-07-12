import { buildWhatsappLink, siteConfig } from "@/lib/site-config";
import { NewsletterForm } from "@/components/newsletter-form";

export function Footer() {
  const anioActual = new Date().getFullYear();

  return (
    <footer className="mt-xl bg-ciruela py-lg pb-md text-champan [&_a]:text-champan [&_a]:decoration-oro [&_a:hover]:text-oro [&_a:focus-visible]:text-oro">
      <div className="contenedor">
        <div className="mb-md grid grid-cols-1 gap-md sm:grid-cols-3">
          <div>
            <h3 className="text-champan text-[1.1rem]">Astrología y Herbolaria</h3>
            <p>por Francisca Giner Mellado</p>
            <p>
              Acompañamiento simbólico y práctica ritual.
              <br />
              Santiago, Chile — atención presencial y online.
            </p>
          </div>

          <div>
            <h3 className="text-champan text-[1.1rem]">Contacto</h3>
            <p>
              <a href={buildWhatsappLink("Hola, me gustaría agendar una hora.")} target="_blank" rel="noopener noreferrer">
                WhatsApp
              </a>
            </p>
            <p>
              <a href={siteConfig.instagram} target="_blank" rel="noopener noreferrer">
                Instagram
              </a>
            </p>
            <p>
              <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>
            </p>
          </div>

          <div>
            <h3 className="text-champan text-[1.1rem]">El cielo del mes</h3>
            <div className="mt-sm text-left">
              <p>
                Una lectura personal al mes, cruzando tu carta natal con el cielo. Sin spam, puedes darte de baja
                cuando quieras.
              </p>
              <NewsletterForm variant="footer" />
            </div>
          </div>
        </div>

        <p className="max-w-[70ch] border-t border-borde-champan-sutil pt-sm text-[0.8rem] opacity-75">
          Los contenidos de este sitio son de carácter simbólico y educativo. La astrología y el tarot se presentan
          como lenguajes de autoconocimiento, no como sistemas predictivos ni como sustituto de atención médica,
          psicológica o psiquiátrica. Si estás atravesando una crisis, busca apoyo profesional. © {anioActual}{" "}
          Francisca Giner Mellado. Todos los derechos reservados.
        </p>
      </div>
    </footer>
  );
}
