import Link from "next/link";
import { readData } from "@/lib/db";
import type { Service, Solution, Region, Settings } from "@/types";
import { MessageCircle, Calculator, ChevronRight, Phone, MapPin, Wrench, Truck, BadgeTurkishLira } from "lucide-react";

export default async function ContentSidebar({ tocSlot }: { tocSlot?: React.ReactNode }) {
  const [services, solutions, regions, settings] = await Promise.all([
    readData<Service[]>("services.json"),
    readData<Solution[]>("solutions.json"),
    readData<Region[]>("regions.json"),
    readData<Settings>("settings.json"),
  ]);

  const activeServices = services.filter((s) => s.isActive).sort((a, b) => a.order - b.order).slice(0, 8);
  const activeSolutions = solutions.filter((s) => s.isActive).sort((a, b) => a.order - b.order);
  const activeRegions = regions.filter((r) => r.isActive).sort((a, b) => (a.order || 0) - (b.order || 0)).slice(0, 8);

  return (
    <aside className="hidden lg:block">
      <div className="sticky top-24 space-y-4">
        {tocSlot}
        
        {/* Fiyat Hesaplama CTA */}
        <div className="rounded-xl bg-gradient-to-br from-[#e3000f] to-[#c5000d] p-6 text-white shadow-lg">
          <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-white/20">
            <Calculator className="h-5 w-5" />
          </div>
          <h3 className="text-lg font-bold">Fiyat Hesapla</h3>
          <p className="mt-1 text-sm text-white/80">Online tahmini fiyatınızı hemen öğrenin</p>
          <Link
            href="/nakliyat-fiyat-hesaplama"
            className="mt-4 flex items-center justify-center gap-2 rounded-lg bg-white py-2.5 text-sm font-bold text-[#e3000f] transition hover:bg-white/90"
          >
            <Calculator className="h-4 w-4" /> Hemen Hesapla
          </Link>
          <a href="tel:4447436" className="mt-2 flex items-center justify-center gap-1.5 text-sm font-medium text-white/90 transition hover:text-white">
            <Phone className="h-3.5 w-3.5" /> 444 7 436
          </a>
        </div>

        {/* Çözümlerimiz */}
        {activeSolutions.length > 0 && (
          <div className="rounded-xl border bg-white p-5 shadow-sm">
            <div className="mb-3 flex items-center gap-2">
              <Wrench className="h-4 w-4 text-[#e3000f]" />
              <h3 className="text-sm font-bold text-[#122032]">Çözümlerimiz</h3>
            </div>
            <div className="space-y-1">
              {activeSolutions.map((s) => (
                <Link
                  key={s.slug}
                  href={`/${s.slug}`}
                  className="flex items-center gap-2 rounded-lg px-2 py-1.5 text-[13px] text-muted-foreground transition hover:bg-gray-50 hover:text-[#e3000f]"
                >
                  <ChevronRight className="h-3 w-3 shrink-0" />
                  {s.title}
                </Link>
              ))}
            </div>
            <Link href="/cozumlerimiz" className="mt-3 flex items-center justify-center gap-1 rounded-lg border border-[#e3000f] bg-white py-2 text-xs font-medium text-[#e3000f] transition hover:bg-[#e3000f] hover:text-white">
              Tümünü Gör →
            </Link>
          </div>
        )}

        {/* Hizmetlerimiz */}
        {activeServices.length > 0 && (
          <div className="rounded-xl border bg-white p-5 shadow-sm">
            <div className="mb-3 flex items-center gap-2">
              <Truck className="h-4 w-4 text-[#e3000f]" />
              <h3 className="text-sm font-bold text-[#122032]">Hizmetlerimiz</h3>
            </div>
            <div className="space-y-1">
              {activeServices.map((s) => (
                <Link
                  key={s.slug}
                  href={`/${s.slug}`}
                  className="flex items-center gap-2 rounded-lg px-2 py-1.5 text-[13px] text-muted-foreground transition hover:bg-gray-50 hover:text-[#e3000f]"
                >
                  <ChevronRight className="h-3 w-3 shrink-0" />
                  {s.title}
                </Link>
              ))}
            </div>
            <Link href="/hizmetlerimiz" className="mt-3 flex items-center justify-center gap-1 rounded-lg border border-[#e3000f] bg-white py-2 text-xs font-medium text-[#e3000f] transition hover:bg-[#e3000f] hover:text-white">
              Tümünü Gör →
            </Link>
          </div>
        )}

        {/* Fiyatlarımız */}
        <div className="rounded-xl border bg-white p-5 shadow-sm">
          <div className="mb-3 flex items-center gap-2">
            <BadgeTurkishLira className="h-4 w-4 text-[#e3000f]" />
            <h3 className="text-sm font-bold text-[#122032]">Fiyatlarımız</h3>
          </div>
          <div className="space-y-1">
            <Link href="/nakliyat-fiyat-hesaplama" className="flex items-center gap-2 rounded-lg px-2 py-1.5 text-[13px] text-muted-foreground transition hover:bg-gray-50 hover:text-[#e3000f]">
              <ChevronRight className="h-3 w-3 shrink-0" /> Fiyat Hesapla
            </Link>
            <Link href="/evden-eve-nakliyat-fiyatlari" className="flex items-center gap-2 rounded-lg px-2 py-1.5 text-[13px] text-muted-foreground transition hover:bg-gray-50 hover:text-[#e3000f]">
              <ChevronRight className="h-3 w-3 shrink-0" /> Evden Eve Nakliyat Fiyatları
            </Link>
            <Link href="/fiyatlarimiz" className="flex items-center gap-2 rounded-lg px-2 py-1.5 text-[13px] text-muted-foreground transition hover:bg-gray-50 hover:text-[#e3000f]">
              <ChevronRight className="h-3 w-3 shrink-0" /> Tüm Fiyatlar
            </Link>
          </div>
        </div>

        {/* Hizmet Bölgeleri */}
        {activeRegions.length > 0 && (
          <div className="rounded-xl border bg-white p-5 shadow-sm">
            <div className="mb-3 flex items-center gap-2">
              <MapPin className="h-4 w-4 text-[#e3000f]" />
              <h3 className="text-sm font-bold text-[#122032]">Hizmet Bölgeleri</h3>
            </div>
            <div className="space-y-1">
              {activeRegions.map((r) => (
                <Link
                  key={r.slug}
                  href={`/${r.slug}.html`}
                  className="flex items-center gap-2 rounded-lg px-2 py-1.5 text-[13px] text-muted-foreground transition hover:bg-gray-50 hover:text-[#e3000f]"
                >
                  <ChevronRight className="h-3 w-3 shrink-0" />
                  {r.title}
                </Link>
              ))}
            </div>
            <Link href="/hizmet-bolgeleri" className="mt-3 flex items-center justify-center gap-1 rounded-lg border border-[#e3000f] bg-white py-2 text-xs font-medium text-[#e3000f] transition hover:bg-[#e3000f] hover:text-white">
              Tümünü Gör →
            </Link>
          </div>
        )}

        {/* Keşif CTA */}
        <div className="rounded-xl bg-[#122032] p-5 text-white">
          <h3 className="font-bold">Ücretsiz Keşif Talep Et</h3>
          <p className="mt-1 text-sm text-white/70">Profesyonel ekibimiz adresinize gelsin</p>
          <Link href="/teklif-al" className="mt-3 block rounded-lg bg-[#e3000f] py-2.5 text-center text-sm font-medium transition hover:bg-[#c5000d]">
            Teklif Al
          </Link>
        </div>

        {/* WhatsApp */}
        <a
          href={settings.nap.whatsapp}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 rounded-xl bg-[#25D366] p-4 text-sm font-medium text-white transition hover:bg-[#20bd5a]"
        >
          <MessageCircle className="h-4 w-4" /> WhatsApp ile Yazın
        </a>
      </div>
    </aside>
  );
}
