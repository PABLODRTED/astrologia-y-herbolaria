import { buildWhatsappLink } from "@/lib/site-config";

export function CtaWhatsapp() {
  return (
    <section className="rounded-borde bg-ciruela px-md py-lg text-center text-champan">
      <h2 className="text-champan">Iniciar un proceso</h2>
      <p className="mx-auto max-w-[65ch]">
        Si sientes que es momento de habitar una pregunta con más detención, escríbeme y coordinamos una hora.
      </p>
      <a
        href={buildWhatsappLink("Hola, me gustaría agendar una hora.")}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-block rounded-borde border border-champan px-[1.6rem] py-[0.85rem] font-cuerpo text-[0.95rem] font-semibold text-champan no-underline transition-colors hover:border-oro hover:text-oro focus-visible:border-oro focus-visible:text-oro"
      >
        Agendar hora por WhatsApp
      </a>
      <p className="mt-sm text-[0.9rem] opacity-90">
        Atención presencial en Santiago y modalidad online, según lo que te resulte más cómodo.
      </p>
    </section>
  );
}
