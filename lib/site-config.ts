export const siteConfig = {
  whatsapp: "56976229115",
  instagram: "https://www.instagram.com/astrologiayherbolaria",
  email: "franciscaginer@gmail.com",
} as const;

export function buildWhatsappLink(message: string) {
  return `https://wa.me/${siteConfig.whatsapp}?text=${encodeURIComponent(message)}`;
}
