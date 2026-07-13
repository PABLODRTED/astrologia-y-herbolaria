import { Boton } from "@/components/boton";
import { buildWhatsappLink } from "@/lib/site-config";

type ServiceCardProps = {
  etiqueta?: string;
  titulo: string;
  descripcion: string;
  paraQuien: string;
  precio: string;
  ctaLabel: string;
  ctaMensaje: string;
};

export function ServiceCard({ etiqueta, titulo, descripcion, paraQuien, precio, ctaLabel, ctaMensaje }: ServiceCardProps) {
  return (
    <article className="flex flex-col gap-xs rounded-borde border border-borde-ciruela-sutil bg-blanco p-md">
      {etiqueta && (
        <p className="mb-[-0.25rem] font-cuerpo text-[0.65rem] font-medium tracking-[0.12em] text-ciruela uppercase">
          {etiqueta}
        </p>
      )}
      <h3>{titulo}</h3>
      <p>{descripcion}</p>
      <p className="text-[0.9rem] text-ciruela-suave italic">{paraQuien}</p>
      <p className="mt-xs font-titulos text-[1.4rem] text-ciruela">{precio}</p>
      <div className="mt-auto pt-sm">
        <Boton href={buildWhatsappLink(ctaMensaje)} variant="whatsapp">
          {ctaLabel}
        </Boton>
      </div>
    </article>
  );
}
