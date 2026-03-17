import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Galeri | Kozcuoğlu Nakliyat",
  description: "Kozcuoğlu Nakliyat galeri. Taşıma süreçlerimizden fotoğraflar ve videolar.",
  alternates: { canonical: "/galeri" },
  openGraph: {
    title: "Galeri | Kozcuoğlu Nakliyat",
    description: "Kozcuoğlu Nakliyat galeri. Taşıma süreçlerimizden fotoğraflar ve videolar.",
    url: "/galeri",
    type: "website",
  },
};

export default function GaleriLayout({ children }: { children: React.ReactNode }) {
  return children;
}
