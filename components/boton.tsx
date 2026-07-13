import Link from "next/link";
import { cn } from "@/lib/utils";

const VARIANTES = {
  primario:
    "border-transparent bg-ciruela text-champan hover:border-oro focus-visible:border-oro",
  secundario:
    "border-ciruela bg-transparent text-ciruela hover:border-oro hover:text-oro focus-visible:border-oro focus-visible:text-oro",
  whatsapp:
    "inline-flex items-center gap-2 border-transparent bg-ciruela text-champan hover:border-oro focus-visible:border-oro",
} as const;

type BotonProps = {
  href: string;
  variant?: keyof typeof VARIANTES;
  className?: string;
  children: React.ReactNode;
};

export function Boton({ href, variant = "secundario", className, children }: BotonProps) {
  const clases = cn(
    "inline-block rounded-borde border px-[1.6rem] py-[0.85rem] font-cuerpo text-[0.95rem] font-semibold no-underline transition-colors",
    VARIANTES[variant],
    className,
  );

  const esExterno = href.startsWith("http") || href.startsWith("https://wa.me");

  if (esExterno) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={clases}>
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={clases}>
      {children}
    </Link>
  );
}
