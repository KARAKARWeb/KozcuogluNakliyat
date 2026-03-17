import Link from "next/link";
import { readData } from "@/lib/db";
import type { Service, Solution, Region, Settings } from "@/types";
import { Phone, Mail, MapPin, Clock } from "lucide-react";
import DeveloperBadge from "./developer-badge";
import FooterRegions from "./footer-regions";

interface FooterData {
  ctaBar: { title: string; description: string; button1Text: string; button1Link: string; button2Text: string; button2Link: string };
  company: { name: string; description: string };
  copyright: string;
  legalLinks: { label: string; href: string }[];
  regionsTitle: string;
}

interface PricingPage {
  id: string;
  slug: string;
  title: string;
  isActive: boolean;
}

async function getFooterData() {
  const [services, solutions, regions, settings, footerCfg, pricingPages] = await Promise.all([
    readData<Service[]>("services.json"),
    readData<Solution[]>("solutions.json"),
    readData<Region[]>("regions.json"),
    readData<Settings>("settings.json"),
    readData<FooterData>("footer.json").catch(() => null),
    readData<PricingPage[]>("pricing-pages.json").catch(() => []),
  ]);
  return {
    services: services.filter((s) => s.isActive).sort((a, b) => a.order - b.order),
    solutions: solutions.filter((s) => s.isActive).sort((a, b) => a.order - b.order),
    regions: regions.filter((r) => r.isActive),
    pricingPages: pricingPages.filter((p) => p.isActive),
    settings,
    footerCfg,
  };
}

export default async function SiteFooter() {
  const { services, solutions, regions, settings, footerCfg, pricingPages } = await getFooterData();

  return (
    <footer aria-label="Site alt bilgi" itemScope={true} itemType="https://schema.org/MovingCompany" className="pb-0">
      {/* 1. CTA Bar */}
      <div className="bg-[#e3000f] py-8 text-white">
        <div className="mx-auto flex max-w-[1440px] flex-col items-center gap-4 px-4 text-center md:flex-row md:justify-between md:px-6 md:text-left lg:px-8">
          <div>
            <p className="text-xl font-bold">{footerCfg?.ctaBar?.title || "Nakliyat Fiyatınızı Hesaplayın"}</p>
            <p className="mt-1 text-sm text-white/90">{footerCfg?.ctaBar?.description || "Online fiyat hesaplama ile anında tahmini fiyat öğrenin"}</p>
          </div>
          <div className="flex gap-3">
            <Link href={footerCfg?.ctaBar?.button1Link || "/nakliyat-fiyat-hesaplama"} className="rounded-lg bg-white px-5 py-2.5 text-sm font-medium text-[#e3000f] transition hover:bg-white/90">
              {footerCfg?.ctaBar?.button1Text || "Fiyat Hesapla"}
            </Link>
            <a href={footerCfg?.ctaBar?.button2Link || "tel:4447436"} className="rounded-lg border border-white px-5 py-2.5 text-sm font-medium text-white transition hover:bg-white/10">
              {footerCfg?.ctaBar?.button2Text || "444 7 436"}
            </a>
          </div>
        </div>
      </div>

      {/* 2. Ana Footer — 6 Kolon */}
      <div className="bg-[#122032] py-16 text-white">
        <div className="mx-auto grid max-w-[1440px] gap-8 px-4 md:grid-cols-2 md:px-6 lg:grid-cols-7 lg:px-8">
          {/* 1. Firma */}
          <div className="lg:col-span-2">
            <h3 className="text-lg font-bold" itemProp="name">{footerCfg?.company?.name || "Kozcuoğlu Nakliyat"}</h3>
            <meta itemProp="telephone" content="+90-444-7-436" />
            <meta itemProp="url" content="https://kozcuoglunakliyat.com.tr" />
            <div itemProp="address" itemScope itemType="https://schema.org/PostalAddress" className="hidden">
              <meta itemProp="streetAddress" content="Kaynarca Mah. Bahattin Veled Cad. No:37" />
              <meta itemProp="addressLocality" content="Pendik" />
              <meta itemProp="addressRegion" content="İstanbul" />
              <meta itemProp="postalCode" content="34890" />
              <meta itemProp="addressCountry" content="TR" />
            </div>
            <p className="mt-3 text-sm leading-relaxed text-gray-400">
              Kozcuoğlu Nakliyat, İstanbul ve Türkiye genelinde şehirler arası olarak güvenli, planlı ve hızlı evden eve nakliyat hizmeti sunan en çok tercih edilen profesyonel ev taşıma firmasıdır.
            </p>
            {settings.sameAs.length > 0 && (
              <div className="mt-4 flex gap-3">
                {settings.sameAs.slice(0, 6).map((url) => {
                  let label = "Web";
                  let icon = <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/></svg>;
                  if (url.includes("facebook")) { label = "Facebook"; icon = <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>; }
                  else if (url.includes("instagram")) { label = "Instagram"; icon = <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>; }
                  return (
                    <a key={url} href={url} target="_blank" rel="noopener noreferrer" className="text-gray-400 transition hover:text-white" aria-label={label}>
                      {icon}
                    </a>
                  );
                })}
              </div>
            )}
          </div>

          {/* 2. Çözümlerimiz */}
          <div>
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white">Çözümlerimiz</h4>
            <ul className="space-y-2">
              {solutions.slice(0, 5).map((s) => (
                <li key={s.id}>
                  <Link href={`/${s.slug}`} className="text-sm text-gray-400 transition hover:text-white">{s.title}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* 3. Hizmetlerimiz */}
          <div>
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white">Hizmetlerimiz</h4>
            <ul className="space-y-2">
              <li><Link href="/ev-tasima" className="text-sm text-gray-400 transition hover:text-white">Ev Taşımacılığı</Link></li>
              <li><Link href="/villa-tasimaciligi" className="text-sm text-gray-400 transition hover:text-white">Villa Taşımacılığı</Link></li>
              <li><Link href="/ofis-tasima" className="text-sm text-gray-400 transition hover:text-white">Ofis Taşımacılığı</Link></li>
              <li><Link href="/parca-esya-tasimaciligi" className="text-sm text-gray-400 transition hover:text-white">Parça Eşya Taşımacılığı</Link></li>
              <li><Link href="/sehir-ici-evden-eve-nakliyat" className="text-sm text-gray-400 transition hover:text-white">Şehir İçi Evden Eve Nakliyat</Link></li>
              <li><Link href="/sehirler-arasi-evden-eve-nakliyat" className="text-sm text-gray-400 transition hover:text-white">Şehirler Arası Evden Eve Nakliyat</Link></li>
            </ul>
          </div>

          {/* 4. Depolama */}
          <div>
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white">Depolama</h4>
            <ul className="space-y-2">
              <li><Link href="/esya-depolama?tip=1+1" className="text-sm text-gray-400 transition hover:text-white">1+1 Ev Eşyası Depolama</Link></li>
              <li><Link href="/esya-depolama?tip=2+1" className="text-sm text-gray-400 transition hover:text-white">2+1 Ev Eşyası Depolama</Link></li>
              <li><Link href="/esya-depolama?tip=3+1" className="text-sm text-gray-400 transition hover:text-white">3+1 Ev Eşyası Depolama</Link></li>
              <li><Link href="/esya-depolama?tip=4+1" className="text-sm text-gray-400 transition hover:text-white">4+1 Ev Eşyası Depolama</Link></li>
              <li><Link href="/esya-depolama?tip=ozel" className="text-sm text-gray-400 transition hover:text-white">Özel Eşya Depolama</Link></li>
            </ul>
          </div>

          {/* 5. Fiyatlarımız */}
          <div>
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white">Fiyatlarımız</h4>
            <ul className="space-y-2">
              <li><Link href="/nakliyat-fiyat-hesaplama" className="text-sm text-gray-400 transition hover:text-white">Fiyat Hesapla</Link></li>
              <li><Link href="/evden-eve-nakliyat-fiyatlari" className="text-sm text-gray-400 transition hover:text-white">Ev Taşıma Fiyatları</Link></li>
              <li><Link href="/ofis-tasima-fiyatlari" className="text-sm text-gray-400 transition hover:text-white">Ofis Taşımacılığı Fiyatları</Link></li>
              <li><Link href="/sigortali-nakliyat-fiyatlari" className="text-sm text-gray-400 transition hover:text-white">Sigortalı Ev Taşıma Fiyatları</Link></li>
              <li><Link href="/asansorlu-nakliyat-fiyatlari" className="text-sm text-gray-400 transition hover:text-white">Asansörlü Ev Taşıma Fiyatları</Link></li>
            </ul>
          </div>

          {/* 6. İletişim Bilgileri */}
          <div>
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white">İletişim Bilgileri</h4>
            <address className="not-italic space-y-3 text-sm text-gray-400">
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 shrink-0 text-white" />
                <a href="tel:4447436" className="transition hover:text-white">444 7 436</a>
              </div>
              <div className="flex items-center gap-2">
                <svg className="h-4 w-4 shrink-0 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                </svg>
                <a href="https://wa.me/905321384979" className="transition hover:text-white">0532 138 49 79</a>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 shrink-0 text-white" />
                <a href="tel:02164945337" className="transition hover:text-white">0216 494 53 37</a>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 shrink-0 text-white" />
                <a href="mailto:info@kozcuoglunakliyat.com.tr" className="transition hover:text-white">info@kozcuoglunakliyat.com.tr</a>
              </div>
              <div className="flex items-start gap-2">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-white" />
                <span>Kaynarca Mah. Bahattin Veled Cad. No:37 34890 Pendik / İstanbul</span>
              </div>
            </address>
          </div>
        </div>
      </div>

      {/* 3. Bolge Tam Liste */}
      <div className="bg-[#0d1825] py-8 text-gray-400">
        <div className="mx-auto max-w-[1440px] px-4 md:px-6 lg:px-8">
          <FooterRegions regions={[
            { id: "pendik", slug: "pendik-evden-eve-nakliyat", title: "Pendik Evden Eve Nakliyat" },
            { id: "kartal", slug: "kartal-evden-eve-nakliyat", title: "Kartal Evden Eve Nakliyat" },
            { id: "tuzla", slug: "tuzla-evden-eve-nakliyat", title: "Tuzla Evden Eve Nakliyat" },
            { id: "beylikduzu", slug: "beylikduzu-evden-eve-nakliyat", title: "Beylikdüzü Evden Eve Nakliyat" },
            { id: "maltepe", slug: "maltepe-evden-eve-nakliyat", title: "Maltepe Evden Eve Nakliyat" },
            { id: "silivri", slug: "silivri-evden-eve-nakliyat", title: "Silivri Evden Eve Nakliyat" },
            { id: "atalar", slug: "atalar-evden-eve-nakliyat", title: "Atalar Evden Eve Nakliyat" },
            { id: "kadikoy", slug: "kadikoy-evden-eve-nakliyat", title: "Kadıköy Evden Eve Nakliyat" },
            { id: "atasehir", slug: "atasehir-evden-eve-nakliyat", title: "Ataşehir Evden Eve Nakliyat" },
            { id: "esenyurt", slug: "esenyurt-evden-eve-nakliyat", title: "Esenyurt Evden Eve Nakliyat" },
            { id: "sultangazi", slug: "sultangazi-evden-eve-nakliyat", title: "Sultangazi Evden Eve Nakliyat" },
            { id: "erenkoy", slug: "erenkoy-evden-eve-nakliyat", title: "Erenköy Evden Eve Nakliyat" },
            { id: "basaksehir", slug: "basaksehir-evden-eve-nakliyat", title: "Başakşehir Evden Eve Nakliyat" },
            { id: "cekmekoy", slug: "cekmekoy-evden-eve-nakliyat", title: "Çekmeköy Evden Eve Nakliyat" },
            { id: "uskudar", slug: "uskudar-evden-eve-nakliyat", title: "Üsküdar Evden Eve Nakliyat" },
            { id: "kurtkoy", slug: "kurtkoy-evden-eve-nakliyat", title: "Kurtköy Evden Eve Nakliyat" },
            { id: "umraniye", slug: "umraniye-evden-eve-nakliyat", title: "Ümraniye Evden Eve Nakliyat" },
            { id: "bayrampasa", slug: "bayrampasa-evden-eve-nakliyat", title: "Bayrampaşa Evden Eve Nakliyat" },
            { id: "bagcilar", slug: "bagcilar-evden-eve-nakliyat", title: "Bağcılar Evden Eve Nakliyat" },
            { id: "gaziosmanpasa", slug: "gaziosmanpasa-evden-eve-nakliyat", title: "Gaziosmanpaşa Evden Eve Nakliyat" },
            { id: "sancaktepe", slug: "sancaktepe-evden-eve-nakliyat", title: "Sancaktepe Evden Eve Nakliyat" },
            { id: "sultanbeyli", slug: "sultanbeyli-evden-eve-nakliyat", title: "Sultanbeyli Evden Eve Nakliyat" },
            { id: "avcilar", slug: "avcilar-evden-eve-nakliyat", title: "Avcılar Evden Eve Nakliyat" },
            { id: "besiktas", slug: "besiktas-evden-eve-nakliyat", title: "Beşiktaş Evden Eve Nakliyat" },
            { id: "esenler", slug: "esenler-evden-eve-nakliyat", title: "Esenler Evden Eve Nakliyat" },
            { id: "sariyer", slug: "sariyer-evden-eve-nakliyat", title: "Sarıyer Evden Eve Nakliyat" },
            { id: "bahcelievler", slug: "bahcelievler-evden-eve-nakliyat", title: "Bahçelievler Evden Eve Nakliyat" },
            { id: "cevizli", slug: "cevizli-evden-eve-nakliyat", title: "Cevizli Evden Eve Nakliyat" },
            { id: "arnavutkoy", slug: "arnavutkoy-evden-eve-nakliyat", title: "Arnavutköy Evden Eve Nakliyat" },
            { id: "bostanci", slug: "bostanci-evden-eve-nakliyat", title: "Bostancı Evden Eve Nakliyat" },
            { id: "kucukcekmece", slug: "kucukcekmece-evden-eve-nakliyat", title: "Küçükçekmece Evden Eve Nakliyat" },
            { id: "catalca", slug: "catalca-evden-eve-nakliyat", title: "Çatalca Evden Eve Nakliyat" },
            { id: "sisli", slug: "sisli-evden-eve-nakliyat", title: "Şişli Evden Eve Nakliyat" },
            { id: "acibadem", slug: "acibadem-evden-eve-nakliyat", title: "Acıbadem Evden Eve Nakliyat" },
            { id: "bakirkoy", slug: "bakirkoy-evden-eve-nakliyat", title: "Bakırköy Evden Eve Nakliyat" },
            { id: "beykoz", slug: "beykoz-evden-eve-nakliyat", title: "Beykoz Evden Eve Nakliyat" },
            { id: "gokturk", slug: "gokturk-evden-eve-nakliyat", title: "Göktürk Evden Eve Nakliyat" },
            { id: "kavacik", slug: "kavacik-evden-eve-nakliyat", title: "Kavacık Evden Eve Nakliyat" },
            { id: "zeytinburnu", slug: "zeytinburnu-evden-eve-nakliyat", title: "Zeytinburnu Evden Eve Nakliyat" },
            { id: "buyukcekmece", slug: "buyukcekmece-evden-eve-nakliyat", title: "Büyükçekmece Evden Eve Nakliyat" },
            { id: "goztepe", slug: "goztepe-evden-eve-nakliyat", title: "Göztepe Evden Eve Nakliyat" },
            { id: "kaynarca", slug: "kaynarca-evden-eve-nakliyat", title: "Kaynarca Evden Eve Nakliyat" },
            { id: "yakacik", slug: "yakacik-evden-eve-nakliyat", title: "Yakacık Evden Eve Nakliyat" },
            { id: "fatih", slug: "fatih-evden-eve-nakliyat", title: "Fatih Evden Eve Nakliyat" },
            { id: "kucukyali", slug: "kucukyali-evden-eve-nakliyat", title: "Küçükyalı Evden Eve Nakliyat" },
            { id: "burhaniye", slug: "burhaniye-evden-eve-nakliyat", title: "Burhaniye Evden Eve Nakliyat" },
            { id: "suadiye", slug: "suadiye-evden-eve-nakliyat", title: "Suadiye Evden Eve Nakliyat" },
            { id: "sile", slug: "sile-evden-eve-nakliyat", title: "Şile Evden Eve Nakliyat" },
            { id: "acarkent", slug: "acarkent-evden-eve-nakliyat", title: "Acarkent Evden Eve Nakliyat" },
            { id: "acarlar", slug: "acarlar-evden-eve-nakliyat", title: "Acarlar Evden Eve Nakliyat" },
            { id: "fikirtepe", slug: "fikirtepe-evden-eve-nakliyat", title: "Fikirtepe Evden Eve Nakliyat" },
            { id: "soganlik", slug: "soganlik-evden-eve-nakliyat", title: "Soğanlık Evden Eve Nakliyat" },
            { id: "ugurmumcu", slug: "ugurmumcu-evden-eve-nakliyat", title: "Uğurmumcu Evden Eve Nakliyat" },
            { id: "adalar", slug: "adalar-evden-eve-nakliyat", title: "Adalar Evden Eve Nakliyat" },
            { id: "istanbul-izmir", slug: "istanbul-izmir-evden-eve-nakliyat", title: "İstanbul İzmir Evden Eve Nakliyat" },
            { id: "istanbul-aydin", slug: "istanbul-aydin-evden-eve-nakliyat", title: "İstanbul Aydın Evden Eve Nakliyat" },
            { id: "istanbul-bodrum", slug: "istanbul-bodrum-evden-eve-nakliyat", title: "İstanbul Bodrum Evden Eve Nakliyat" },
            { id: "istanbul-ankara", slug: "istanbul-ankara-evden-eve-nakliyat", title: "İstanbul Ankara Evden Eve Nakliyat" },
            { id: "istanbul-antalya", slug: "istanbul-antalya-evden-eve-nakliyat", title: "İstanbul Antalya Evden Eve Nakliyat" },
            { id: "istanbul-balikesir", slug: "istanbul-balikesir-evden-eve-nakliyat", title: "İstanbul Balıkesir Evden Eve Nakliyat" },
            { id: "istanbul-marmaris", slug: "istanbul-marmaris-evden-eve-nakliyat", title: "İstanbul Marmaris Evden Eve Nakliyat" },
            { id: "istanbul-bursa", slug: "istanbul-bursa-evden-eve-nakliyat", title: "İstanbul Bursa Evden Eve Nakliyat" },
            { id: "istanbul-mugla", slug: "istanbul-mugla-evden-eve-nakliyat", title: "İstanbul Muğla Evden Eve Nakliyat" },
            { id: "istanbul-fethiye", slug: "istanbul-fethiye-evden-eve-nakliyat", title: "İstanbul Fethiye Evden Eve Nakliyat" },
            { id: "istanbul-adana", slug: "istanbul-adana-evden-eve-nakliyat", title: "İstanbul Adana Evden Eve Nakliyat" },
            { id: "istanbul-denizli", slug: "istanbul-denizli-evden-eve-nakliyat", title: "İstanbul Denizli Evden Eve Nakliyat" }
          ]} />
        </div>
      </div>

      {/* 4. Alt Bar — Hukuki & Gelistirici */}
      <div className="bg-[#0a1420] py-4 pb-28 text-gray-400 lg:pb-4">
        <div className="mx-auto flex max-w-[1440px] flex-col items-center gap-3 px-4 text-center md:flex-row md:justify-between md:px-6 md:text-left lg:px-8">
          <p className="text-xs" suppressHydrationWarning>Copyright &copy; {new Date().getFullYear()} {footerCfg?.copyright || "Tüm hakları saklıdır."}</p>
          <div className="flex flex-wrap justify-center gap-3 text-xs">
            {(footerCfg?.legalLinks || [
              { label: "Gizlilik Politikası", href: "/gizlilik-politikasi" },
              { label: "Çerez Politikası", href: "/cerez-politikasi" },
              { label: "KVKK", href: "/kvkk-aydinlatma-metni" },
              { label: "Kullanım Koşulları", href: "/kullanim-kosullari" },
            ]).map((link) => (
              <Link key={link.href} href={link.href} className="block py-2 transition hover:text-white">{link.label}</Link>
            ))}
          </div>
          <DeveloperBadge />
        </div>
      </div>
    </footer>
  );
}
