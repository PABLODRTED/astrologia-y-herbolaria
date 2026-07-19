import Link from "next/link";
import { Newsletter } from "@/components/newsletter";
import { CtaWhatsapp } from "@/components/cta-whatsapp";
import { ScrollReveal } from "@/components/motion/scroll-reveal";
import { MagneticWrap } from "@/components/motion/magnetic-wrap";
import { StaggerGrid, StaggerItem } from "@/components/motion/stagger-grid";
import { HeroSection } from "@/components/motion/hero-section";

export default function Home() {
  return (
    <>
      {/* ============ HERO ============ */}
      <HeroSection />

      {/* ============ QUÉ ES ============ */}
      <ScrollReveal>
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
            <MagneticWrap>
              <Link
                href="/sobre-mi"
                className="inline-block rounded-borde border border-ciruela px-[1.6rem] py-[0.85rem] font-cuerpo text-[0.95rem] font-semibold text-ciruela no-underline transition-colors hover:border-oro hover:text-oro focus-visible:border-oro focus-visible:text-oro"
              >
                Conocer más sobre esta práctica
              </Link>
            </MagneticWrap>
          </div>
        </section>
      </ScrollReveal>

      {/* ============ LAS DOS LÍNEAS ============ */}
      <ScrollReveal>
        <section className="bg-champan py-lg">
          <div className="contenedor">
            <h2>Dos líneas de trabajo</h2>
            <StaggerGrid className="grid grid-cols-1 gap-md sm:grid-cols-2">
              <StaggerItem className="flex flex-col gap-xs rounded-borde border border-borde-ciruela-sutil bg-blanco p-md">
                <h3>Línea A · Acompañamiento simbólico</h3>
                <p>
                  Carta natal, sesiones de astrología y tarot, revolución solar y acompañamiento mensual: espacios
                  de conversación e interpretación para pensar un proceso, una pregunta o una etapa.
                </p>
                <div className="mt-auto pt-sm">
                  <MagneticWrap>
                    <Link
                      href="/servicios#linea-a"
                      className="inline-block rounded-borde border border-ciruela px-[1.6rem] py-[0.85rem] font-cuerpo text-[0.95rem] font-semibold text-ciruela no-underline transition-colors hover:border-oro hover:text-oro focus-visible:border-oro focus-visible:text-oro"
                    >
                      Ver sesiones
                    </Link>
                  </MagneticWrap>
                </div>
              </StaggerItem>
              <StaggerItem className="flex flex-col gap-xs rounded-borde border border-borde-ciruela-sutil bg-blanco p-md">
                <h3>Línea B · Práctica ritual</h3>
                <p>
                  Diagnóstico, limpiezas, amuletos, rituales y preparaciones artesanales, entendidos como saber
                  heredado — no como sustituto de atención clínica ni como práctica de riesgo.
                </p>
                <div className="mt-auto pt-sm">
                  <MagneticWrap>
                    <Link
                      href="/servicios#linea-b"
                      className="inline-block rounded-borde border border-ciruela px-[1.6rem] py-[0.85rem] font-cuerpo text-[0.95rem] font-semibold text-ciruela no-underline transition-colors hover:border-oro hover:text-oro focus-visible:border-oro focus-visible:text-oro"
                    >
                      Ver práctica ritual
                    </Link>
                  </MagneticWrap>
                </div>
              </StaggerItem>
            </StaggerGrid>
          </div>
        </section>
      </ScrollReveal>

      {/* ============ PARA QUIÉN ES ============ */}
      <ScrollReveal>
        <section className="bg-rosa-palido py-lg">
          <div className="contenedor">
            <h2>Para quién es este espacio</h2>
            <p className="max-w-[65ch]">
              Este acompañamiento suele resonar en mujeres entre 25 y 45 años que atraviesan una búsqueda de
              sentido: curiosidad por lo espiritual sin querer entregarle certezas absolutas, procesos de
              desarrollo personal, o momentos donde conviene mirar de cerca una relación de pareja. No es
              necesario tener experiencia previa con la astrología o el tarot para comenzar.
            </p>
          </div>
        </section>
      </ScrollReveal>

      {/* ============ NEWSLETTER ============ */}
      <ScrollReveal>
        <section className="bg-champan py-lg">
          <div className="contenedor">
            <Newsletter />
          </div>
        </section>
      </ScrollReveal>

      {/* ============ CTA FINAL ============ */}
      <ScrollReveal>
        <section className="bg-rosa-palido py-lg">
          <div className="contenedor">
            <CtaWhatsapp />
          </div>
        </section>
      </ScrollReveal>
    </>
  );
}
