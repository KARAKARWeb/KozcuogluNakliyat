import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { CustomCodeHead, CustomCodeBodyStart, CustomCodeFooter } from "@/components/site/custom-code";
import { ToastProvider } from "@/components/site/toast-notification";
import { readData } from "@/lib/db";
import type { Settings } from "@/types";
import "./globals.css";

const inter = Inter({
  subsets: ["latin", "latin-ext"],
  display: "swap",
  variable: "--font-inter",
  weight: ["400", "500", "600", "700"],
  preload: true,
  fallback: ["system-ui", "-apple-system", "Segoe UI", "sans-serif"],
  adjustFontFallback: true,
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://kozcuoglunakliyat.com.tr";

export async function generateMetadata(): Promise<Metadata> {
  const settings = await readData<Settings>("settings.json");
  const site = settings.site;
  const faviconUrl = site.favicon || "/uploads/general/favicon.ico";
  const ogImg = site.ogImage || "/images/og-image.png";

  return {
    title: {
      default: "Kozcuoğlu Nakliyat | İstanbul Evden Eve Nakliyat",
      template: "%s | Kozcuoğlu Nakliyat",
    },
    description:
      "İstanbul evden eve nakliyat, ofis taşıma, eşya depolama hizmetleri. Sigortalı taşımacılık, profesyonel ekip. 7/24 hizmet. ☎ 444 7 436",
    metadataBase: new URL(siteUrl),
    icons: {
      icon: faviconUrl,
      shortcut: faviconUrl,
      apple: "/icons/icon-192x192.png",
    },
    alternates: {
      canonical: "/",
      languages: {
        "tr": siteUrl,
        "x-default": siteUrl,
      },
    },
    openGraph: {
      type: "website",
      locale: "tr_TR",
      url: siteUrl,
      siteName: "Kozcuoğlu Nakliyat",
      title: "Kozcuoğlu Nakliyat | İstanbul Evden Eve Nakliyat",
      description: "İstanbul evden eve nakliyat, ofis taşıma, eşya depolama. Sigortalı, profesyonel, 7/24 hizmet. ☎ 444 7 436",
      images: [
        {
          url: ogImg,
          width: 1200,
          height: 630,
          alt: "Kozcuoğlu Nakliyat",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: "Kozcuoğlu Nakliyat | İstanbul Evden Eve Nakliyat",
      description: "İstanbul evden eve nakliyat, ofis taşıma, eşya depolama. Sigortalı, profesyonel, 7/24 hizmet.",
      images: [ogImg],
    },
    authors: [{ name: "Kozcuoğlu Nakliyat", url: "https://kozcuoglunakliyat.com.tr" }],
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    verification: {
      google: process.env.GOOGLE_SITE_VERIFICATION || "",
    },
  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr">
      <head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#122032" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content="Kozcuoğlu" />
        <link rel="apple-touch-icon" href="/icons/icon-192x192.png" />
        <link rel="apple-touch-icon" sizes="152x152" href="/icons/icon-152x152.png" />
        <link rel="apple-touch-icon" sizes="384x384" href="/icons/icon-384x384.png" />
        <CustomCodeHead />
      </head>
      <body
        className={`${inter.variable} antialiased`}
      >
        <ToastProvider>
          <CustomCodeBodyStart />
          {children}
          <CustomCodeFooter />
        </ToastProvider>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              if('serviceWorker' in navigator){
                var r=function(){navigator.serviceWorker.register('/sw.js')};
                if('requestIdleCallback' in window) requestIdleCallback(r);
                else window.addEventListener('load',r);
              }
            `,
          }}
        />
      </body>
    </html>
  );
}
