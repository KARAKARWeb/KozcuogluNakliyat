import Link from "next/link";
import { Home, ArrowRight, Package, Building2, MapPin, FileText } from "lucide-react";
import Log404 from "@/components/site/log-404";
import { SearchBar } from "@/components/site/search-bar";

export default function NotFound() {
  const popularPages = [
    { title: "Ev Taşıma", href: "/ev-tasima", icon: Home, desc: "Profesyonel ev taşıma hizmeti" },
    { title: "Ofis Taşıma", href: "/ofis-tasimaciligi", icon: Building2, desc: "Kurumsal taşıma çözümleri" },
    { title: "Hizmet Bölgeleri", href: "/hizmet-bolgeleri", icon: MapPin, desc: "Hizmet verdiğimiz bölgeler" },
    { title: "Blog", href: "/blog", icon: FileText, desc: "Nakliyat rehberi ve ipuçları" },
  ];

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-gray-50 via-white to-gray-100 px-4 py-16">
      <Log404 />
      <div className="container mx-auto max-w-5xl">
        {/* 404 Header */}
        <div className="text-center mb-16">
          <div className="relative mb-12">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="h-80 w-80 rounded-full bg-gradient-to-r from-[#e3000f] to-[#c5000d] opacity-10 blur-3xl animate-pulse"></div>
            </div>
            <div className="relative">
              <div className="mb-8 inline-block rounded-full bg-gradient-to-br from-[#e3000f]/10 to-[#c5000d]/10 p-8">
                <Package className="h-24 w-24 text-[#e3000f] animate-bounce" strokeWidth={1.5} />
              </div>
              <h1 className="text-[10rem] md:text-[12rem] font-black bg-gradient-to-r from-[#e3000f] to-[#c5000d] bg-clip-text text-transparent leading-none mb-6">404</h1>
            </div>
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-[#122032] mb-6 tracking-tight">
            Sayfa Bulunamadı
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Aradığınız sayfa taşınmış, kaldırılmış veya hiç var olmamış olabilir.
          </p>
        </div>

        {/* Search Section */}
        <div className="mb-16">
          <div className="mx-auto max-w-2xl">
            <h3 className="text-center text-2xl font-bold text-[#122032] mb-8">
              Aradığınızı Bulun
            </h3>
            <div className="rounded-2xl border-2 border-gray-200 bg-white p-3 shadow-xl hover:shadow-2xl transition-shadow">
              <SearchBar />
            </div>
          </div>
        </div>

        {/* Popular Pages */}
        <div className="mb-16">
          <h3 className="text-center text-3xl font-black text-[#122032] mb-10">
            Popüler Sayfalar
          </h3>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {popularPages.map((page) => {
              const Icon = page.icon;
              return (
                <Link
                  key={page.href}
                  href={page.href}
                  className="group relative overflow-hidden rounded-2xl border-2 border-gray-200 bg-gradient-to-br from-white to-gray-50 p-8 transition-all hover:border-[#e3000f] hover:shadow-2xl hover:-translate-y-1"
                >
                  <div className="absolute right-0 top-0 h-32 w-32 translate-x-16 -translate-y-16 rounded-full bg-gradient-to-br from-[#e3000f] to-[#c5000d] opacity-0 transition-all group-hover:opacity-10"></div>
                  <div className="relative">
                    <div className="mb-4 inline-block rounded-xl bg-[#e3000f]/10 p-3">
                      <Icon className="h-8 w-8 text-[#e3000f] transition-transform group-hover:scale-110" strokeWidth={1.5} />
                    </div>
                    <h4 className="mb-2 text-lg font-bold text-[#122032] group-hover:text-[#e3000f] transition-colors">
                      {page.title}
                    </h4>
                    <p className="text-sm text-muted-foreground leading-relaxed">{page.desc}</p>
                    <ArrowRight className="mt-4 h-5 w-5 text-[#e3000f] opacity-0 transition-all group-hover:translate-x-2 group-hover:opacity-100" />
                  </div>
                </Link>
              );
            })}
          </div>
        </div>

        {/* Quick Links */}
        <div className="mb-16">
          <div className="rounded-3xl border-2 border-gray-200 bg-gradient-to-br from-white to-gray-50 p-10 shadow-xl">
            <h3 className="text-center text-2xl font-black text-[#122032] mb-8">
              Hızlı Erişim
            </h3>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/hizmetler" className="rounded-full border-2 border-gray-200 bg-white px-8 py-3 text-base font-semibold text-[#122032] shadow-sm transition-all hover:border-[#e3000f] hover:bg-gradient-to-r hover:from-[#e3000f] hover:to-[#c5000d] hover:text-white hover:shadow-lg hover:scale-105">
                Hizmetlerimiz
              </Link>
              <Link href="/hakkimizda" className="rounded-full border-2 border-gray-200 bg-white px-8 py-3 text-base font-semibold text-[#122032] shadow-sm transition-all hover:border-[#e3000f] hover:bg-gradient-to-r hover:from-[#e3000f] hover:to-[#c5000d] hover:text-white hover:shadow-lg hover:scale-105">
                Hakkımızda
              </Link>
              <Link href="/iletisim" className="rounded-full border-2 border-gray-200 bg-white px-8 py-3 text-base font-semibold text-[#122032] shadow-sm transition-all hover:border-[#e3000f] hover:bg-gradient-to-r hover:from-[#e3000f] hover:to-[#c5000d] hover:text-white hover:shadow-lg hover:scale-105">
                İletişim
              </Link>
              <Link href="/teklif-al" className="rounded-full border-2 border-gray-200 bg-white px-8 py-3 text-base font-semibold text-[#122032] shadow-sm transition-all hover:border-[#e3000f] hover:bg-gradient-to-r hover:from-[#e3000f] hover:to-[#c5000d] hover:text-white hover:shadow-lg hover:scale-105">
                Fiyat Teklifi
              </Link>
              <Link href="/tasima-takip" className="rounded-full border-2 border-gray-200 bg-white px-8 py-3 text-base font-semibold text-[#122032] shadow-sm transition-all hover:border-[#e3000f] hover:bg-gradient-to-r hover:from-[#e3000f] hover:to-[#c5000d] hover:text-white hover:shadow-lg hover:scale-105">
                Taşıma Takip
              </Link>
            </div>
          </div>
        </div>

        {/* Action Button */}
        <div className="text-center">
          <Link
            href="/"
            className="inline-flex items-center gap-4 rounded-full bg-gradient-to-r from-[#e3000f] via-[#c5000d] to-[#e3000f] bg-size-200 bg-pos-0 px-12 py-5 text-xl font-bold text-white shadow-2xl transition-all hover:bg-pos-100 hover:scale-110 hover:shadow-[#e3000f]/50 animate-gradient"
          >
            <Home className="h-7 w-7" />
            Ana Sayfaya Dön
          </Link>
        </div>
      </div>
    </div>
  );
}
