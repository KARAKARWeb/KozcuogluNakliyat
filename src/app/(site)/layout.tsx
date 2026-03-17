import SiteHeader from "@/components/site/site-header";
import SiteFooter from "@/components/site/site-footer";
import FloatingWidgets from "@/components/site/floating-widgets";
import Analytics from "@/components/site/analytics";
import AnalyticsConsentGuard from "@/components/site/analytics-consent-guard";
import { readData } from "@/lib/db";
import type { Settings } from "@/types";

export default async function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const settings = await readData<Settings>("settings.json");
  return (
    <>
      <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-lg focus:bg-[#e3000f] focus:px-4 focus:py-2 focus:text-white">
        İçeriğe Geç
      </a>
      <SiteHeader logo={settings.site.logo} logoDark={settings.site.logoDark} siteName={settings.site.name} />
      <noscript>
        <div style={{ background: "#122032", color: "white", padding: "12px 16px", textAlign: "center", fontSize: "14px" }}>
          Bu site JavaScript gerektirir. Alternatif olarak bizi arayın: <a href="tel:4447436" style={{ color: "#e3000f", fontWeight: "bold" }}>444 7 436</a> veya <a href="https://wa.me/905321384979" style={{ color: "#25D366" }}>WhatsApp</a>
        </div>
      </noscript>
      <main id="main-content">{children}</main>
      <SiteFooter />
      <FloatingWidgets />
      <AnalyticsConsentGuard>
        <Analytics />
      </AnalyticsConsentGuard>
    </>
  );
}
