"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { buildWhatsappLink } from "@/lib/site-config";

const NAV_LINKS = [
  { href: "/", label: "Inicio" },
  { href: "/legacy/servicios.html", label: "Servicios" },
  { href: "/legacy/sobre-mi.html", label: "Sobre mí" },
  { href: "/legacy/blog/index.html", label: "Blog" },
] as const;

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

        <nav
          id="navegacion-principal"
          aria-label="Navegación principal"
          className={cn(
            "gap-sm md:static md:flex md:gap-md md:border-none md:bg-transparent md:p-0",
            abierto
              ? "absolute inset-x-0 top-full flex flex-col border-b border-borde-ciruela-medio bg-champan px-sm pb-md pt-sm"
              : "hidden",
          )}
        >
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
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
            className="inline-block rounded-borde border border-transparent bg-ciruela px-[1.6rem] py-[0.85rem] font-cuerpo text-[0.95rem] font-semibold text-champan no-underline transition-colors hover:border-oro focus-visible:border-oro"
          >
            Agendar hora
          </a>
        </nav>
      </div>
    </header>
  );
}
