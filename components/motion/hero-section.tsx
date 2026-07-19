"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { buildWhatsappLink } from "@/lib/site-config";
import { MagneticWrap } from "@/components/motion/magnetic-wrap";

export function HeroSection() {
  return (
    <motion.section
      className="contenedor py-xl pb-lg text-center"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      <svg
        className="mx-auto mb-sm block h-8 w-8 stroke-oro stroke-1"
        viewBox="0 0 32 32"
        fill="none"
        aria-hidden="true"
      >
        <path d="M16 4a12 12 0 1 0 0 24 9 9 0 0 1 0-24z" />
      </svg>
      <p className="mb-sm font-titulos text-[1.4rem] text-ciruela-suave">El umbral</p>
      <h1 className="text-[2.25rem] md:text-[3.25rem]">Astrología y Herbolaria</h1>
      <p className="mx-auto mb-md max-w-[60ch] text-[1.05rem]">
        Un espacio de acompañamiento simbólico en Santiago, Chile: astrología, tarot y saberes heredados de
        herbolaria, para habitar el cruce entre lo cotidiano y lo ritual con rigor y calidez.
      </p>
      <div className="flex flex-col items-center gap-sm min-[480px]:flex-row min-[480px]:justify-center">
        <MagneticWrap>
          <a
            href={buildWhatsappLink("Hola, me gustaría agendar una hora.")}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block rounded-borde border border-transparent bg-ciruela px-[1.6rem] py-[0.85rem] font-cuerpo text-[0.95rem] font-semibold text-champan no-underline transition-colors hover:border-oro focus-visible:border-oro"
          >
            Agendar hora
          </a>
        </MagneticWrap>
        <MagneticWrap>
          <Link
            href="/servicios"
            className="inline-block rounded-borde border border-ciruela px-[1.6rem] py-[0.85rem] font-cuerpo text-[0.95rem] font-semibold text-ciruela no-underline transition-colors hover:border-oro hover:text-oro focus-visible:border-oro focus-visible:text-oro"
          >
            Ver servicios
          </Link>
        </MagneticWrap>
      </div>
    </motion.section>
  );
}
