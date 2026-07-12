export function Newsletter() {
  return (
    <section className="rounded-borde bg-rosa-palido px-md py-lg text-center">
      <svg
        className="mx-auto mb-sm block h-8 w-8 stroke-oro stroke-1"
        viewBox="0 0 32 32"
        fill="none"
        aria-hidden="true"
      >
        <path d="M16 4a12 12 0 1 0 0 24 9 9 0 0 1 0-24z" />
      </svg>
      <h2>El cielo del mes</h2>
      <p className="mx-auto max-w-[65ch]">
        Una nota breve, una vez al mes: un gesto de lectura sobre los ciclos que estamos habitando, sin promesas
        ni pronósticos. Para quien quiera sostener la práctica entre una sesión y otra.
      </p>

      <form
        aria-label="Suscribirse a El cielo del mes"
        className="mx-auto mt-sm flex max-w-[420px] flex-col gap-xs min-[480px]:flex-row"
      >
        <label className="solo-lector" htmlFor="correo-newsletter-home">
          Tu correo electrónico
        </label>
        <input
          type="email"
          id="correo-newsletter-home"
          placeholder="tu@correo.com"
          required
          className="flex-1 rounded-borde border border-ciruela bg-blanco px-[1rem] py-[0.75rem] font-cuerpo text-base text-ciruela"
        />
        <button
          type="submit"
          className="inline-block rounded-borde border border-ciruela bg-transparent px-[1.6rem] py-[0.85rem] font-cuerpo text-[0.95rem] font-semibold text-ciruela transition-colors hover:border-oro hover:text-oro focus-visible:border-oro focus-visible:text-oro"
        >
          Suscribirme
        </button>
      </form>
    </section>
  );
}
