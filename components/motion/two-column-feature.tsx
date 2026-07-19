"use client";

import { ScrollReveal } from "@/components/motion/scroll-reveal";
import { cn } from "@/lib/utils";

const BACKGROUND_CLASSES = {
  champan: "bg-champan",
  "rosa-palido": "bg-rosa-palido",
} as const;

type TwoColumnFeatureProps = {
  background: keyof typeof BACKGROUND_CLASSES;
  imageSide?: "left" | "right";
  image: {
    src: string;
    alt: string;
  };
  children: React.ReactNode;
  className?: string;
};

export function TwoColumnFeature({
  background,
  imageSide = "right",
  image,
  children,
  className,
}: TwoColumnFeatureProps) {
  return (
    <section className={cn(BACKGROUND_CLASSES[background], "py-lg")}>
      <div className={cn("contenedor grid grid-cols-1 items-center gap-md md:grid-cols-2", className)}>
        <ScrollReveal className={cn(imageSide === "left" ? "md:order-2" : "md:order-1")}>
          {children}
        </ScrollReveal>
        <ScrollReveal delay={0.1} className={cn(imageSide === "left" ? "md:order-1" : "md:order-2")}>
          <img
            src={image.src}
            alt={image.alt}
            loading="lazy"
            className="w-full rounded-borde object-cover"
          />
        </ScrollReveal>
      </div>
    </section>
  );
}
