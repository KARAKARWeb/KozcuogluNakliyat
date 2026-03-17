"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

export default function CookieBanner() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("cookie-consent");
    if (!consent) {
      const timer = setTimeout(() => setShow(true), 1500);
      return () => clearTimeout(timer);
    }
    const parsed = JSON.parse(consent);
    if (Date.now() - parsed.timestamp > 30 * 24 * 60 * 60 * 1000) {
      localStorage.removeItem("cookie-consent");
      setShow(true);
    }
  }, []);

  function accept() {
    const consent = { analytics: true, marketing: true, timestamp: Date.now() };
    localStorage.setItem("cookie-consent", JSON.stringify(consent));
    window.dispatchEvent(new CustomEvent("cookie-consent-update", { detail: consent }));
    setShow(false);
  }

  function reject() {
    const consent = { analytics: false, marketing: false, timestamp: Date.now() };
    localStorage.setItem("cookie-consent", JSON.stringify(consent));
    window.dispatchEvent(new CustomEvent("cookie-consent-update", { detail: consent }));
    setShow(false);
  }

  if (!show) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 border-t bg-white p-4 shadow-2xl sm:bottom-4 sm:left-auto sm:right-4 sm:max-w-md sm:rounded-2xl sm:border">
      <div className="flex items-start justify-between gap-2">
        <div>
          <p className="text-sm font-semibold text-[#122032]">Çerez Tercihleriniz</p>
          <p className="mt-1 text-xs text-muted-foreground">
            Deneyiminizi iyileştirmek için çerezler kullanıyoruz.{" "}
            <a href="/cerez-politikasi" className="text-[#e3000f] underline">Çerez Politikası</a>
          </p>
        </div>
        <button onClick={reject} className="shrink-0 text-muted-foreground hover:text-[#122032]" aria-label="Kapat">
          <X className="h-4 w-4" />
        </button>
      </div>
      <div className="mt-3 flex gap-2">
        <Button onClick={accept} size="sm" className="flex-1 bg-[#e3000f] hover:bg-[#c5000d]">Kabul Et</Button>
        <Button onClick={reject} size="sm" variant="outline" className="flex-1">Reddet</Button>
      </div>
    </div>
  );
}
