import { buildWhatsappLink, siteConfig } from "@/lib/site-config";

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
                Una nota breve al mes sobre ciclos, imágenes y correspondencias. Sin spam, puedes darte de baja
                cuando quieras.
              </p>
              <form aria-label="Suscribirse a El cielo del mes" className="ml-0 mt-sm flex max-w-[420px] flex-col gap-xs min-[480px]:flex-row">
                <label className="solo-lector" htmlFor="correo-newsletter-pie">
                  Tu correo electrónico
                </label>
                <input
                  type="email"
                  id="correo-newsletter-pie"
                  placeholder="tu@correo.com"
                  required
                  className="flex-1 rounded-borde border border-ciruela bg-blanco px-[1rem] py-[0.75rem] font-cuerpo text-base text-ciruela"
                />
                <button
                  type="submit"
                  className="inline-block rounded-borde border border-champan bg-transparent px-[1.6rem] py-[0.85rem] font-cuerpo text-[0.95rem] font-semibold text-champan transition-colors hover:border-oro hover:text-oro focus-visible:border-oro focus-visible:text-oro"
                >
                  Suscribirme
                </button>
              </form>
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
