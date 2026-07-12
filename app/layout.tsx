import type { Metadata } from "next";
import { Cormorant_Garamond, Mulish, Geist } from "next/font/google";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import "./globals.css";
import { cn } from "@/lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["500"],
});

const mulish = Mulish({
  variable: "--font-mulish",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  title: {
    default: "Astrología y Herbolaria · Francisca Giner Mellado",
    template: "%s · Astrología y Herbolaria",
  },
  description:
    "Acompañamiento simbólico y práctica ritual en Santiago, Chile. Astrología, tarot y saberes de herbolaria heredados, abordados con rigor histórico y calidez.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={cn(cormorant.variable, mulish.variable, "font-sans", geist.variable)}>
      <body>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
