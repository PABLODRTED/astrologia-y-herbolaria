import Link from "next/link";

export function ArticleHeader({ fecha, titulo }: { fecha: string; titulo: string }) {
  return (
    <>
      <p className="mb-md text-[0.9rem] text-ciruela-suave">
        <Link href="/blog">← Volver al blog</Link> · {fecha}
      </p>
      <h1>{titulo}</h1>
    </>
  );
}
