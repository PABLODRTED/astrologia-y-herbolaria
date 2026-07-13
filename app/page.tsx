import Link from "next/link";
import { Newsletter } from "@/components/newsletter";
import { CtaWhatsapp } from "@/components/cta-whatsapp";
import { buildWhatsappLink } from "@/lib/site-config";

export default function Home() {
  return (
    <>
      {/* ============ HERO ============ */}
      <section className="contenedor py-xl pb-lg text-center">
        <video
          className="mx-auto mb-sm block w-full max-w-[280px] rounded-borde"
          autoPlay
          muted
          loop
          playsInline
        >
          <source src="/img/logo-luna-rosa.mp4" type="video/mp4" />
        </video>
        <p className="mb-sm font-titulos text-[1.4rem] text-ciruela-suave">El umbral</p>
        <h1 className="text-[2.25rem] md:text-[3.25rem]">Astrología y Herbolaria</h1>
        <p className="mx-auto mb-md max-w-[60ch] text-[1.05rem]">
          Un espacio de acompañamiento simbólico en Santiago, Chile: astrología, tarot y saberes heredados de
          herbolaria, para habitar el cruce entre lo cotidiano y lo ritual con rigor y calidez.
        </p>
        <div className="flex flex-col items-center gap-sm min-[480px]:flex-row min-[480px]:justify-center">
          <a
            href={buildWhatsappLink("Hola, me gustaría agendar una hora.")}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block rounded-borde border border-transparent bg-ciruela px-[1.6rem] py-[0.85rem] font-cuerpo text-[0.95rem] font-semibold text-champan no-underline transition-colors hover:border-oro focus-visible:border-oro"
          >
            Agendar hora
          </a>
          <Link
            href="/servicios"
            className="inline-block rounded-borde border border-ciruela px-[1.6rem] py-[0.85rem] font-cuerpo text-[0.95rem] font-semibold text-ciruela no-underline transition-colors hover:border-oro hover:text-oro focus-visible:border-oro focus-visible:text-oro"
          >
            Ver servicios
          </Link>
        </div>
      </section>

      {/* ============ QUÉ ES ============ */}
      <section className="bg-rosa-palido py-lg">
        <div className="contenedor">
          <h2>¿Qué es Astrología y Herbolaria?</h2>
          <p className="max-w-[65ch]">
            Es un espacio donde la astrología y el tarot se trabajan como lenguajes simbólicos —mapas de imágenes
            y arquetipos para el autoconocimiento— y donde la herbolaria y el trabajo ritual se abordan como
            saberes heredados, con el mismo cuidado con que se estudia una tradición histórica. No son sistemas
            para anticipar el futuro: son gestos para pensar el propio proceso, con la agencia y la decisión
            siempre en quien consulta.
          </p>
          <Link
            href="/sobre-mi"
            className="inline-block rounded-borde border border-ciruela px-[1.6rem] py-[0.85rem] font-cuerpo text-[0.95rem] font-semibold text-ciruela no-underline transition-colors hover:border-oro hover:text-oro focus-visible:border-oro focus-visible:text-oro"
          >
            Conocer más sobre esta práctica
          </Link>
        </div>
      </section>

      {/* ============ LAS DOS LÍNEAS ============ */}
      <section className="bg-champan py-lg">
        <div className="contenedor">
          <h2>Dos líneas de trabajo</h2>
          <div className="grid grid-cols-1 gap-md sm:grid-cols-2">
            <div className="flex flex-col gap-xs rounded-borde border border-borde-ciruela-sutil bg-blanco p-md">
              <h3>Línea A · Acompañamiento simbólico</h3>
              <p>
                Carta natal, sesiones de astrología y tarot, revolución solar y acompañamiento mensual: espacios de
                conversación e interpretación para pensar un proceso, una pregunta o una etapa.
              </p>
              <div className="mt-auto pt-sm">
                <Link
                  href="/servicios#linea-a"
                  className="inline-block rounded-borde border border-ciruela px-[1.6rem] py-[0.85rem] font-cuerpo text-[0.95rem] font-semibold text-ciruela no-underline transition-colors hover:border-oro hover:text-oro focus-visible:border-oro focus-visible:text-oro"
                >
                  Ver sesiones
                </Link>
              </div>
            </div>
            <div className="flex flex-col gap-xs rounded-borde border border-borde-ciruela-sutil bg-blanco p-md">
              <h3>Línea B · Práctica ritual</h3>
              <p>
                Diagnóstico, limpiezas, amuletos, rituales y preparaciones artesanales, entendidos como saber
                heredado — no como sustituto de atención clínica ni como práctica de riesgo.
              </p>
              <div className="mt-auto pt-sm">
                <Link
                  href="/servicios#linea-b"
                  className="inline-block rounded-borde border border-ciruela px-[1.6rem] py-[0.85rem] font-cuerpo text-[0.95rem] font-semibold text-ciruela no-underline transition-colors hover:border-oro hover:text-oro focus-visible:border-oro focus-visible:text-oro"
                >
                  Ver práctica ritual
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============ PARA QUIÉN ES ============ */}
      <section className="bg-rosa-palido py-lg">
        <div className="contenedor">
          <h2>Para quién es este espacio</h2>
          <p className="max-w-[65ch]">
            Este acompañamiento suele resonar en mujeres entre 25 y 45 años que atraviesan una búsqueda de sentido:
            curiosidad por lo espiritual sin querer entregarle certezas absolutas, procesos de desarrollo personal,
            o momentos donde conviene mirar de cerca una relación de pareja. No es necesario tener experiencia
            previa con la astrología o el tarot para comenzar.
          </p>
        </div>
      </section>

      {/* ============ NEWSLETTER ============ */}
      <section className="bg-champan py-lg">
        <div className="contenedor">
          <Newsletter />
        </div>
      </section>

      {/* ============ CTA FINAL ============ */}
      <section className="bg-rosa-palido py-lg">
        <div className="contenedor">
          <CtaWhatsapp />
        </div>
      </section>
    </>
  );
}
