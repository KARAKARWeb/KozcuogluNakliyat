"use client";

import dynamic from "next/dynamic";

const WhatsAppButton = dynamic(() => import("@/components/site/whatsapp-button"), { ssr: false });
const PhoneButton = dynamic(() => import("@/components/site/phone-button"), { ssr: false });
const BackToTop = dynamic(() => import("@/components/site/back-to-top"), { ssr: false });
const StickyCTABar = dynamic(() => import("@/components/site/sticky-cta-bar"), { ssr: false });
const CookieBanner = dynamic(() => import("@/components/site/cookie-banner"), { ssr: false });
const AdminTopbar = dynamic(() => import("@/components/site/admin-topbar"), { ssr: false });
const Toaster = dynamic(() => import("@/components/ui/sonner").then((m) => m.Toaster), { ssr: false });

export default function FloatingWidgets() {
  return (
    <>
      <AdminTopbar />
      <WhatsAppButton />
      <PhoneButton />
      <BackToTop />
      <StickyCTABar />
      <CookieBanner />
      <Toaster />
    </>
  );
}
