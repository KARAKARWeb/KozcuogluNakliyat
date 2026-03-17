"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { Menu, X, Phone, ChevronDown, ChevronRight, Calculator, Eye } from "lucide-react";

interface PricingPage {
  id: string;
  slug: string;
  title: string;
  isActive: boolean;
}

interface NavChild {
  label: string;
  href: string;
}

interface NavGroup {
  groupLabel: string;
  items: NavChild[];
}

interface NavItem {
  label: string;
  href: string;
  mega?: boolean;
  children?: NavChild[];
  groups?: NavGroup[];
}

interface SiteHeaderProps {
  logo?: string;
  logoDark?: string;
  siteName?: string;
}

const BASE_NAV_ITEMS: NavItem[] = [
  {
    label: "Kurumsal",
    href: "/kurumsal",
    mega: true,
    children: [
      { label: "Hakkımızda", href: "/hakkimizda" },
      { label: "Ekibimiz", href: "/ekibimiz" },
      { label: "Araçlarımız", href: "/araclarimiz" },
      { label: "Galeri", href: "/galeri" },
      { label: "Video Galeri", href: "/video-galeri" },
      { label: "İnsan Kaynakları", href: "/insan-kaynaklari" },
      { label: "Blog", href: "/blog" },
      { label: "Sözleşmelerimiz", href: "/sozlesmeler" },
      { label: "Politikalarımız", href: "/politikalarimiz" },
      { label: "Site Haritası", href: "/site-haritasi" },
    ],
  },
  {
    label: "Çözümlerimiz",
    href: "/cozumlerimiz",
    mega: true,
    children: [
      { label: "Ücretsiz Ekspertiz", href: "/ekspertiz" },
      { label: "Sigortalı Evden Eve Nakliyat", href: "/sigortali-evden-eve-nakliyat" },
      { label: "Sözleşmeli Evden Eve Nakliyat", href: "/sozlesmeli-evden-eve-nakliyat" },
      { label: "Asansörlü Evden Eve Nakliyat", href: "/asansorlu-evden-eve-nakliyat" },
      { label: "Ambalaj ve Paketleme", href: "/ambalaj-ve-paketleme" },
    ],
  },
  {
    label: "Hizmetlerimiz",
    href: "/hizmetlerimiz",
    mega: true,
    groups: [
      {
        groupLabel: "Bireysel Hizmetler",
        items: [
          { label: "Ev Taşıma", href: "/ev-tasima" },
          { label: "Villa Taşımacılığı", href: "/villa-tasimaciligi" },
          { label: "Yalı Taşımacılığı", href: "/yali-tasimaciligi" },
          { label: "Parça Eşya Taşımacılığı", href: "/parca-esya-tasimaciligi" },
          { label: "Şehir İçi Evden Eve Nakliyat", href: "/sehir-ici-evden-eve-nakliyat" },
          { label: "Şehirler Arası Evden Eve Nakliyat", href: "/sehirler-arasi-evden-eve-nakliyat" },
        ],
      },
      {
        groupLabel: "Kurumsal Hizmetler",
        items: [
          { label: "Ofis Taşımacılığı", href: "/ofis-tasimaciligi" },
          { label: "Kurum Taşımacılığı", href: "/kurum-tasimaciligi" },
          { label: "Şirket Taşımacılığı", href: "/sirket-tasimaciligi" },
          { label: "Firma Taşımacılığı", href: "/firma-tasimaciligi" },
          { label: "Fabrika Taşımacılığı", href: "/fabrika-tasimaciligi" },
          { label: "Plaza Taşımacılığı", href: "/plaza-tasimaciligi" },
        ],
      },
      {
        groupLabel: "Diğer Hizmetler",
        items: [
          { label: "Piyano Taşımacılığı", href: "/piyano-tasimaciligi" },
          { label: "Özel Eşya Taşımacılığı", href: "/ozel-esya-tasimaciligi" },
          { label: "Antika Eşya Taşımacılığı", href: "/antika-esya-tasimaciligi" },
          { label: "Çelik Kasa Taşımacılığı", href: "/celik-kasa-tasimaciligi" },
          { label: "Sanat Eseri Taşımacılığı", href: "/sanat-eseri-tasimaciligi" },
          { label: "Mağaza Taşımacılığı", href: "/magaza-tasimaciligi" },
        ],
      },
    ],
  },
  { label: "Depolama", href: "/esya-depolama" },
  {
    label: "Fiyatlar",
    href: "/fiyatlarimiz",
    mega: true,
    children: [
      { label: "Fiyat Hesapla", href: "/nakliyat-fiyat-hesaplama" },
      { label: "Evden Eve Nakliyat Fiyatları", href: "/evden-eve-nakliyat-fiyatlari" },
    ],
  },
  {
    label: "Referanslar",
    href: "/referanslarimiz",
    mega: true,
    children: [
      { label: "Bireysel Referanslar", href: "/bireysel-referanslar" },
      { label: "Kurumsal Referanslar", href: "/kurumsal-referanslar" },
    ],
  },
  { label: "Hizmet Bölgeleri", href: "/hizmet-bolgeleri" },
  { label: "İletişim", href: "/iletisim" },
];

export default function SiteHeader({ logo, logoDark, siteName }: SiteHeaderProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openMega, setOpenMega] = useState<string | null>(null);
  const [navItems, setNavItems] = useState<NavItem[]>(BASE_NAV_ITEMS);
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);
  const [scrollDirection, setScrollDirection] = useState<'up' | 'down'>('up');
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    setMounted(true);
    fetch("/api/pricing-pages")
      .then(res => res.json())
      .then(json => {
        if (json.success && json.data) {
          const pricingPages = json.data.filter((p: PricingPage) => p.isActive);
          const pricingChildren: NavChild[] = [
            { label: "Fiyat Hesapla", href: "/nakliyat-fiyat-hesaplama" },
            ...pricingPages.map((p: PricingPage) => ({
              label: p.title,
              href: `/${p.slug}`
            }))
          ];
          
          const updatedNav = BASE_NAV_ITEMS.map(item => 
            item.label === "Fiyatlar" 
              ? { ...item, children: pricingChildren }
              : item
          );
          setNavItems(updatedNav);
        }
      })
      .catch(() => {
        setNavItems(BASE_NAV_ITEMS);
      });
  }, []);

  useEffect(() => {
    let ticking = false;
    const threshold = 10;
    
    const updateScrollDirection = () => {
      const scrollY = window.scrollY;
      
      if (Math.abs(scrollY - lastScrollY) < threshold) {
        ticking = false;
        return;
      }
      
      setScrollDirection(scrollY > lastScrollY ? 'down' : 'up');
      setLastScrollY(scrollY);
      ticking = false;
    };
    
    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(updateScrollDirection);
        ticking = true;
      }
    };
    
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [lastScrollY]);

  return (
    <header className={`sticky top-0 z-50 border-b bg-white will-change-transform transition-transform duration-300 lg:bg-white/95 lg:backdrop-blur ${scrollDirection === 'down' && lastScrollY > 100 ? '-translate-y-full lg:translate-y-0' : 'translate-y-0'}`}>
      <div className="mx-auto flex h-20 max-w-[1440px] items-center justify-between px-4 md:px-6 lg:px-8">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5">
          {(logo || logoDark) ? (
            <Image src={logo || logoDark || ""} alt={siteName || "Kozcuoğlu Nakliyat"} width={180} height={50} className="h-10 w-auto object-contain" priority />
          ) : (
            <div className="flex flex-col">
              <span className="text-lg font-bold leading-tight text-[#122032]">{siteName || "Kozcuoğlu"}</span>
              <span className="hidden text-[10px] font-medium tracking-wider text-muted-foreground sm:block">NAKLİYAT</span>
            </div>
          )}
        </Link>

        {/* Desktop Menü */}
        <nav aria-label="Ana menü" className="hidden items-center gap-0.5 xl:flex" suppressHydrationWarning>
          {navItems.map((item) => (
            <div
              key={item.href + item.label}
              className="relative"
              onMouseEnter={() => (item.mega || item.groups) ? setOpenMega(item.label) : setOpenMega(null)}
              onMouseLeave={() => setOpenMega(null)}
            >
              <Link
                href={item.href}
                className={`flex items-center gap-1 rounded-lg px-2.5 py-2.5 text-[13px] font-medium transition-colors ${
                  pathname === item.href || pathname.startsWith(item.href + "/") ? "text-[#e3000f]" : "text-[#122032] hover:text-[#e3000f]"
                }`}
              >
                {item.label}
                {(item.mega || item.groups) && <ChevronDown className="h-3 w-3" />}
              </Link>

              {/* Mega Menu — Groups (Hizmetlerimiz) */}
              {item.groups && openMega === item.label && (
                <div className="absolute left-1/2 top-full w-[720px] -translate-x-1/2 rounded-b-xl border bg-white p-5 shadow-xl">
                  <div className="grid grid-cols-3 gap-6">
                    {item.groups.map((group) => (
                      <div key={group.groupLabel}>
                        <p className="mb-1 text-xs font-semibold uppercase tracking-wider text-[#e3000f]">{group.groupLabel}</p>
                        <div className="mb-2 h-px bg-[#e3000f]/20" />
                        {group.items.map((child) => (
                          <Link key={child.href} href={child.href} className={`block py-1.5 text-sm transition-colors hover:text-[#e3000f] ${pathname === child.href ? "text-[#e3000f] font-medium" : "text-[#122032]"}`}>
                            {child.label}
                          </Link>
                        ))}
                      </div>
                    ))}
                  </div>
                  <div className="mt-4 border-t pt-3">
                    <Link href={item.href} className="text-xs font-medium text-[#e3000f] hover:underline">
                      Tüm Hizmetleri Gör &rarr;
                    </Link>
                  </div>
                </div>
              )}

              {/* Mega Menu — Simple children */}
              {item.mega && !item.groups && openMega === item.label && item.children && (
                <div className="absolute left-0 top-full w-64 rounded-b-xl border bg-white py-2 shadow-xl">
                  {item.children.map((child) => (
                    <Link
                      key={child.href}
                      href={child.href}
                      className={`block px-4 py-2 text-sm transition-colors hover:bg-[#f5f5f5] hover:text-[#e3000f] ${pathname === child.href ? "text-[#e3000f] font-medium bg-[#fef2f2]" : "text-[#122032]"}`}
                    >
                      {child.label}
                    </Link>
                  ))}
                  <div className="border-t px-4 py-2">
                    <Link href={item.href} className="block text-xs font-medium text-[#e3000f] hover:underline">
                      Tümünü Gör &rarr;
                    </Link>
                  </div>
                </div>
              )}
            </div>
          ))}
        </nav>

        {/* Desktop CTA */}
        <div className="hidden items-center gap-3 xl:flex">
          <a
            href="tel:4447436"
            className="flex items-center gap-1.5 rounded-lg border-2 border-[#122032] bg-[#122032] px-4 py-2 text-sm font-bold text-white transition-colors hover:bg-[#1a3050] hover:border-[#1a3050]"
          >
            <Phone className="h-4 w-4" />
            444 7 436
          </a>
          <Link
            href="/teklif-al"
            className="rounded-lg bg-[#e3000f] px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-[#c5000d]"
          >
            Teklif Al
          </Link>
        </div>

        {/* Mobile CTA + Toggle */}
        <div className="flex items-center gap-2 xl:hidden">
          <Link
            href="/nakliyat-fiyat-hesaplama"
            className="flex items-center justify-center rounded-lg bg-[#e3000f] p-2 text-xs font-medium text-white transition hover:bg-[#c5000d]"
            aria-label="Fiyat Hesapla"
          >
            <Calculator className="h-4 w-4" />
          </Link>
          <Link
            href="/kesif-talep"
            aria-label="Ücretsiz keşif talebi oluştur"
            className="flex items-center gap-1.5 rounded-lg border-2 border-[#e3000f] bg-white px-4 py-2 text-sm font-medium text-[#e3000f] transition hover:bg-[#fef2f2]"
          >
            <Eye className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">Keşif</span>
          </Link>
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="flex h-10 w-10 items-center justify-center rounded-lg text-[#122032]"
            aria-label="Menü"
          >
            {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="max-h-[calc(100vh-5rem)] overflow-y-auto border-t bg-white xl:hidden">
          <nav className="mx-auto max-w-[1440px] px-4 py-4">
              {navItems.map((item) => {
              const hasChildren = item.children || item.groups;
              const isExpanded = mobileExpanded === item.label;
              return (
                <div key={item.href + item.label}>
                  <div className="flex items-center">
                    <Link
                      href={item.href}
                      onClick={() => setMobileOpen(false)}
                      className={`flex-1 rounded-lg px-3 py-2.5 text-sm font-medium ${
                        pathname === item.href ? "text-[#e3000f]" : "text-[#122032]"
                      }`}
                    >
                      {item.label}
                    </Link>
                    {hasChildren && (
                      <button
                        onClick={() => setMobileExpanded(isExpanded ? null : item.label)}
                        className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground"
                        aria-label="Alt menü"
                      >
                        <ChevronRight className={`h-4 w-4 transition-transform ${isExpanded ? "rotate-90" : ""}`} />
                      </button>
                    )}
                  </div>
                  {hasChildren && isExpanded && (
                    <div className="ml-4 border-l pl-3 pb-2">
                      {item.groups?.map((group) => (
                        <div key={group.groupLabel} className="mt-2">
                          <p className="px-2 text-xs font-semibold uppercase tracking-wider text-[#e3000f]">{group.groupLabel}</p>
                          <div className="mx-2 mb-1 h-px bg-[#e3000f]/20" />
                          {group.items.map((child) => (
                            <Link key={child.href} href={child.href} onClick={() => setMobileOpen(false)} className="block py-1.5 px-2 text-sm text-muted-foreground hover:text-[#e3000f]">
                              {child.label}
                            </Link>
                          ))}
                        </div>
                      ))}
                      {item.children?.map((child) => (
                        <Link key={child.href} href={child.href} onClick={() => setMobileOpen(false)} className="block py-1.5 px-2 text-sm text-muted-foreground hover:text-[#e3000f]">
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
            <div className="mt-4 flex gap-2 border-t pt-4">
              <a href="tel:4447436" className="flex flex-1 items-center justify-center gap-2 rounded-lg border py-2.5 text-sm font-medium">
                <Phone className="h-4 w-4" /> 444 7 436
              </a>
              <Link href="/teklif-al" onClick={() => setMobileOpen(false)} className="flex flex-1 items-center justify-center rounded-lg bg-[#e3000f] py-2.5 text-sm font-medium text-white">
                Teklif Al
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
