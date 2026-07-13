export function PageHero({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <section className="contenedor py-xl pb-lg text-center">
      <h1 className="text-[2.25rem] md:text-[3.25rem]">{title}</h1>
      <p className="mx-auto max-w-[60ch] text-[1.05rem]">{subtitle}</p>
    </section>
  );
}
