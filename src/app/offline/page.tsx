import { WifiOff, Phone, MessageCircle, RefreshCw } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Çevrimdışı",
  description: "İnternet bağlantısı yok. Lütfen bağlantınızı kontrol edin.",
  alternates: { canonical: "/offline" },
  robots: {
    index: false,
    follow: false,
    googleBot: { index: false, follow: false },
  },
};

export default function OfflinePage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[#f8f9fa] px-4 text-center">
      <div className="mx-auto max-w-md">
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-[#122032]/10">
          <WifiOff className="h-10 w-10 text-[#122032]" />
        </div>

        <h1 className="mt-6 text-2xl font-bold text-[#122032]">İnternet Bağlantısı Yok</h1>
        <p className="mt-3 text-muted-foreground">
          Şu anda çevrimdışısınız. Lütfen internet bağlantınızı kontrol edin ve tekrar deneyin.
        </p>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <a
            href="/"
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#e3000f] px-6 py-3 text-sm font-medium text-white transition hover:bg-[#c5000d]"
          >
            <RefreshCw className="h-4 w-4" />
            Tekrar Dene
          </a>
          <a
            href="tel:4447436"
            className="inline-flex items-center justify-center gap-2 rounded-lg border border-[#122032] px-6 py-3 text-sm font-medium text-[#122032] transition hover:bg-[#122032] hover:text-white"
          >
            <Phone className="h-4 w-4" />
            444 7 436
          </a>
        </div>

        <div className="mt-6">
          <a
            href="https://wa.me/905321384979?text=Merhaba"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm text-[#25D366] hover:underline"
          >
            <MessageCircle className="h-4 w-4" />
            WhatsApp ile ulaşın
          </a>
        </div>

        <div className="mt-10 border-t pt-6">
          <p className="text-xs text-muted-foreground">Kozcuoğlu Nakliyat</p>
          <p className="mt-1 text-xs text-muted-foreground">Kaynarca Mah. Bahattin Veled Cad. No:37, Pendik, İstanbul</p>
        </div>
      </div>
    </div>
  );
}
