"use client";

import { useState, useEffect, useCallback } from "react";
import { Download, X, Share, Plus } from "lucide-react";

interface BeforeInstallPromptEvent extends Event {
  prompt(): Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
}

function isIOS() {
  if (typeof navigator === "undefined") return false;
  return /iPad|iPhone|iPod/.test(navigator.userAgent);
}

function isMobile() {
  if (typeof window === "undefined") return false;
  return window.innerWidth < 1024;
}

export default function PWAInstallBanner() {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [showBanner, setShowBanner] = useState(false);
  const [showGuide, setShowGuide] = useState(false);

  useEffect(() => {
    if (!isMobile()) return;
    const dismissed = sessionStorage.getItem("pwa-install-dismissed");
    if (dismissed) return;

    let promptRef: BeforeInstallPromptEvent | null = null;

    const handler = (e: Event) => {
      e.preventDefault();
      promptRef = e as BeforeInstallPromptEvent;
      setDeferredPrompt(promptRef);
    };

    window.addEventListener("beforeinstallprompt", handler);

    const timer = setTimeout(() => {
      if (promptRef || isIOS()) {
        setShowBanner(true);
      }
    }, 30000);

    return () => {
      window.removeEventListener("beforeinstallprompt", handler);
      clearTimeout(timer);
    };
  }, []);

  const handleInstall = useCallback(async () => {
    if (deferredPrompt) {
      await deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === "accepted") setShowBanner(false);
      setDeferredPrompt(null);
    } else if (isIOS()) {
      setShowGuide(true);
    }
  }, [deferredPrompt]);

  function handleDismiss() {
    setShowBanner(false);
    setShowGuide(false);
    sessionStorage.setItem("pwa-install-dismissed", "1");
  }

  if (!showBanner) return null;

  return (
    <div className="fixed bottom-16 left-3 right-3 z-50 mx-auto max-w-sm animate-in slide-in-from-bottom-4 duration-300 lg:hidden">
      <div className="rounded-2xl border bg-white p-4 shadow-2xl">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#122032]">
            <span className="text-lg font-bold text-[#e3000f]">K</span>
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-sm font-semibold text-[#122032]">Kozcuoğlu Nakliyat</p>
            <p className="text-[11px] text-muted-foreground">Hızlı erişim için ana ekranınıza ekleyin</p>
          </div>
          <button
            onClick={handleDismiss}
            className="shrink-0 rounded-lg p-1.5 text-muted-foreground transition hover:bg-gray-100"
            aria-label="Kapat"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {showGuide ? (
          <div className="mt-3 space-y-2 rounded-lg bg-gray-50 p-3">
            <p className="text-xs font-semibold text-[#122032]">Nasıl Yüklenir?</p>
            <div className="flex items-start gap-2 text-xs text-muted-foreground">
              <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#e3000f] text-[10px] font-bold text-white">1</span>
              <span>Alttaki <Share className="inline h-3.5 w-3.5 text-blue-500" /> paylaş butonuna dokunun</span>
            </div>
            <div className="flex items-start gap-2 text-xs text-muted-foreground">
              <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#e3000f] text-[10px] font-bold text-white">2</span>
              <span>&quot;Ana Ekrana Ekle&quot; <Plus className="inline h-3.5 w-3.5" /> seçeneğine dokunun</span>
            </div>
            <div className="flex items-start gap-2 text-xs text-muted-foreground">
              <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#e3000f] text-[10px] font-bold text-white">3</span>
              <span>&quot;Ekle&quot; butonuna dokunarak onaylayın</span>
            </div>
          </div>
        ) : (
          <button
            onClick={handleInstall}
            className="mt-3 flex w-full items-center justify-center gap-2 rounded-lg bg-[#e3000f] py-2.5 text-sm font-medium text-white transition hover:bg-[#c5000d]"
          >
            <Download className="h-4 w-4" />
            {isIOS() ? "Nasıl Yüklenir?" : "Ana Ekrana Ekle"}
          </button>
        )}
      </div>
    </div>
  );
}
