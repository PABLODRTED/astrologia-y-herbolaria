import Link from "next/link";

type BlogCardProps = {
  href: string;
  imagen: string;
  imagenAlt: string;
  fecha: string;
  titulo: string;
  extracto: string;
};

export function BlogCard({ href, imagen, imagenAlt, fecha, titulo, extracto }: BlogCardProps) {
  return (
    <Link href={href} className="block text-ciruela no-underline">
      <img
        src={imagen}
        alt={imagenAlt}
        loading="lazy"
        className="mb-xs aspect-[4/3] w-full rounded-borde bg-rosa-palido object-cover"
      />
      <p className="text-[0.9rem] text-ciruela-suave">{fecha}</p>
      <h3>{titulo}</h3>
      <p>{extracto}</p>
    </Link>
  );
}
