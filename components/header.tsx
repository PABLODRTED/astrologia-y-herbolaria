"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { buildWhatsappLink } from "@/lib/site-config";

const NAV_LINKS = [
  { href: "/", label: "Inicio" },
  { href: "/servicios", label: "Servicios" },
  { href: "/sobre-mi", label: "Sobre mí" },
  { href: "/blog", label: "Blog" },
] as const;

function NavLinks({ pathname, onNavigate }: { pathname: string; onNavigate?: () => void }) {
  return (
    <>
      {NAV_LINKS.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          onClick={onNavigate}
          className={cn(
            "inline-block py-[0.6rem] text-[0.95rem] tracking-[0.02em] no-underline",
            pathname === link.href && "border-b border-oro",
          )}
        >
          {link.label}
        </Link>
      ))}
      <a
        href={buildWhatsappLink("Hola, me gustaría agendar una hora.")}
        target="_blank"
        rel="noopener noreferrer"
        onClick={onNavigate}
        className="inline-block rounded-borde border border-transparent bg-ciruela px-[1.6rem] py-[0.85rem] font-cuerpo text-[0.95rem] font-semibold text-champan no-underline transition-colors hover:border-oro focus-visible:border-oro"
      >
        Agendar hora
      </a>
    </>
  );
}

export function Header() {
  const [abierto, setAbierto] = useState(false);
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-10 border-b border-borde-ciruela-medio bg-champan">
      <div className="contenedor flex items-center justify-between py-sm">
        <Link
          href="/"
          className="font-titulos text-[1.3rem] font-medium leading-[1.1] text-ciruela no-underline"
        >
          Astrología y Herbolaria
          <span className="block font-cuerpo text-[0.65rem] tracking-[0.12em] text-ciruela-suave uppercase">
            por Francisca Giner Mellado
          </span>
        </Link>

        <button
          type="button"
          className="block rounded-borde border border-ciruela px-[0.8rem] py-[0.65rem] font-cuerpo text-[0.9rem] text-ciruela md:hidden"
          aria-expanded={abierto}
          aria-controls="navegacion-principal"
          onClick={() => setAbierto((valor) => !valor)}
        >
          Menú
        </button>

        <nav aria-label="Navegación principal" className="hidden gap-md md:flex">
          <NavLinks pathname={pathname} />
        </nav>
      </div>

      <AnimatePresence initial={false}>
        {abierto && (
          <motion.nav
            id="navegacion-principal"
            aria-label="Navegación principal móvil"
            key="nav-movil"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="absolute inset-x-0 top-full flex flex-col gap-sm border-b border-borde-ciruela-medio bg-champan px-sm pb-md pt-sm md:hidden"
          >
            <NavLinks pathname={pathname} onNavigate={() => setAbierto(false)} />
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
