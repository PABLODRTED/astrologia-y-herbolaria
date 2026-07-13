import type { Metadata } from "next";
import { PageHero } from "@/components/page-hero";
import { BlogCard } from "@/components/blog-card";

export const metadata: Metadata = {
  title: "Blog",
  description: "Notas sobre astrología psicológica, herbolaria ancestral y tarot como lenguaje simbólico.",
};

export default function Blog() {
  return (
    <>
      <PageHero
        title="Blog"
        subtitle="Notas breves para pensar en voz alta: astrología, herbolaria y tarot leídos como lenguajes simbólicos."
      />

      <section className="bg-rosa-palido py-lg">
        <div className="contenedor">
          <h2>Artículos recientes</h2>
          <div className="grid grid-cols-1 gap-md min-[900px]:grid-cols-3">
            <BlogCard
              href="/blog/astrologia-psicologica"
              imagen="/img/placeholder-blog-astrologia.svg"
              imagenAlt="Ilustración lineal de una constelación, con puntos unidos por trazos finos"
              fecha="3 de julio de 2026"
              titulo="La carta natal como mapa, no como pronóstico"
              extracto="Por qué leer una carta natal se parece más a interpretar un texto que a predecir un futuro."
            />
            <BlogCard
              href="/blog/herbolaria-ancestral"
              imagen="/img/placeholder-blog-herbolaria.svg"
              imagenAlt="Ilustración lineal de una rama con hojas, trazo delgado"
              fecha="20 de junio de 2026"
              titulo="Herbolaria como saber heredado"
              extracto="Sobre la diferencia entre estudiar una tradición y prometer un efecto: cómo abordamos la herbolaria en esta práctica."
            />
            <BlogCard
              href="/blog/tarot-como-umbral"
              imagen="/img/placeholder-blog-tarot.svg"
              imagenAlt="Ilustración lineal de una carta de tarot estilizada, trazo fino"
              fecha="5 de junio de 2026"
              titulo="El tarot como umbral, no como respuesta"
              extracto="Qué significa usar el tarot como imagen para pensar, en vez de usarlo para obtener una respuesta cerrada."
            />
          </div>
        </div>
      </section>
    </>
  );
}
