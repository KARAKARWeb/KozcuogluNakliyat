"use client";

import { useState, useEffect } from "react";
import { X, Mail, Gift, Download, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";

// Newsletter Signup Component
export function NewsletterSignup({ inline = false }: { inline?: boolean }) {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        setSuccess(true);
        setEmail("");
        setTimeout(() => setSuccess(false), 5000);
      }
    } catch (error) {
      console.error("Newsletter signup error:", error);
    } finally {
      setLoading(false);
    }
  };

  if (inline) {
    return (
      <form onSubmit={handleSubmit} className="flex gap-2">
        <Input
          type="email"
          placeholder="E-posta adresiniz"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="flex-1"
        />
        <Button type="submit" disabled={loading}>
          {loading ? "Kaydediliyor..." : "Abone Ol"}
        </Button>
      </form>
    );
  }

  return (
    <Card className="bg-gradient-to-r from-primary to-primary/80 text-white">
      <CardContent className="p-6">
        <div className="flex items-center gap-3 mb-4">
          <Mail className="h-8 w-8" />
          <div>
            <h3 className="text-xl font-bold">Bültenimize Abone Olun</h3>
            <p className="text-sm opacity-90">
              Nakliyat ipuçları ve özel fırsatlardan haberdar olun
            </p>
          </div>
        </div>

        {success ? (
          <div className="bg-white/20 rounded-lg p-4 text-center">
            <p className="font-semibold">✓ Başarıyla abone oldunuz!</p>
            <p className="text-sm opacity-90 mt-1">
              Onay e-postasını kontrol edin.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex gap-2">
            <Input
              type="email"
              placeholder="E-posta adresiniz"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="flex-1 bg-white text-gray-900"
            />
            <Button
              type="submit"
              disabled={loading}
              variant="secondary"
              className="bg-white text-primary hover:bg-white/90"
            >
              {loading ? "Kaydediliyor..." : "Abone Ol"}
            </Button>
          </form>
        )}
      </CardContent>
    </Card>
  );
}

// Lead Magnet Component
export function LeadMagnet({
  title,
  description,
  downloadUrl,
  imageUrl,
}: {
  title: string;
  description: string;
  downloadUrl: string;
  imageUrl?: string;
}) {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [downloaded, setDownloaded] = useState(false);

  const handleDownload = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Save email to newsletter
      await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, source: "lead_magnet" }),
      });

      // Track download
      if (typeof window !== "undefined" && window.gtag) {
        window.gtag("event", "lead_magnet_download", {
          event_category: "marketing",
          magnet_title: title,
        });
      }

      // Trigger download
      window.open(downloadUrl, "_blank");
      setDownloaded(true);
    } catch (error) {
      console.error("Lead magnet error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="overflow-hidden">
      {imageUrl && (
        <div className="aspect-video bg-gradient-to-br from-primary/10 to-primary/5 flex items-center justify-center">
          <Gift className="h-16 w-16 text-primary" />
        </div>
      )}
      <CardContent className="p-6">
        <h3 className="text-xl font-bold mb-2">{title}</h3>
        <p className="text-sm text-muted-foreground mb-4">{description}</p>

        {downloaded ? (
          <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-center">
            <p className="text-green-800 font-semibold">
              ✓ İndirme başladı!
            </p>
            <p className="text-sm text-green-700 mt-1">
              E-postanızı kontrol edin.
            </p>
          </div>
        ) : (
          <form onSubmit={handleDownload} className="space-y-3">
            <Input
              type="email"
              placeholder="E-posta adresiniz"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <Button type="submit" disabled={loading} className="w-full">
              <Download className="mr-2 h-4 w-4" />
              {loading ? "İndiriliyor..." : "Ücretsiz İndir"}
            </Button>
          </form>
        )}
      </CardContent>
    </Card>
  );
}

// Exit Intent Popup
export function ExitIntentPopup() {
  const [isVisible, setIsVisible] = useState(false);
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    // Check if already shown
    const shown = localStorage.getItem("exit_popup_shown");
    if (shown) return;

    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 0) {
        setIsVisible(true);
        localStorage.setItem("exit_popup_shown", "true");
      }
    };

    document.addEventListener("mouseleave", handleMouseLeave);
    return () => document.removeEventListener("mouseleave", handleMouseLeave);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, source: "exit_intent" }),
      });

      setSubmitted(true);
      setTimeout(() => setIsVisible(false), 3000);
    } catch (error) {
      console.error("Exit popup error:", error);
    }
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-md relative">
        <button
          onClick={() => setIsVisible(false)}
          className="absolute right-4 top-4 text-gray-400 hover:text-gray-600"
        >
          <X className="h-5 w-5" />
        </button>

        <CardContent className="p-8 text-center">
          {submitted ? (
            <>
              <div className="mb-4">
                <div className="h-16 w-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Mail className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="text-2xl font-bold mb-2">Teşekkürler!</h3>
                <p className="text-muted-foreground">
                  %20 indirim kodunuz e-posta adresinize gönderildi.
                </p>
              </div>
            </>
          ) : (
            <>
              <div className="mb-6">
                <h3 className="text-2xl font-bold mb-2">Bekleyin! 🎁</h3>
                <p className="text-lg text-muted-foreground mb-4">
                  Gitmeden önce <strong>%20 indirim</strong> kazanın!
                </p>
                <p className="text-sm text-muted-foreground">
                  E-posta adresinizi bırakın, özel indirim kodunuzu hemen gönderelim.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-3">
                <Input
                  type="email"
                  placeholder="E-posta adresiniz"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="text-center"
                />
                <Button type="submit" className="w-full" size="lg">
                  İndirim Kodumu Gönder
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </form>

              <p className="text-xs text-muted-foreground mt-4">
                Spam göndermiyoruz. İstediğiniz zaman abonelikten çıkabilirsiniz.
              </p>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

// Sticky CTA Bar
export function StickyCtaBar() {
  const [isVisible, setIsVisible] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);

  useEffect(() => {
    const dismissed = localStorage.getItem("cta_bar_dismissed");
    if (dismissed) {
      setIsDismissed(true);
      return;
    }

    const handleScroll = () => {
      if (window.scrollY > 500) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleDismiss = () => {
    setIsDismissed(true);
    localStorage.setItem("cta_bar_dismissed", "true");
  };

  if (isDismissed || !isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-primary text-white shadow-lg z-40 animate-slide-up">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between gap-4">
          <div className="flex-1">
            <p className="font-semibold">
              Ücretsiz Fiyat Teklifi Alın! 🚚
            </p>
            <p className="text-sm opacity-90">
              2 dakikada taşınma maliyetinizi öğrenin
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Button
              variant="secondary"
              size="sm"
              className="bg-white text-primary hover:bg-white/90"
              asChild
            >
              <a href="/teklif-al">
                Teklif Al
                <ArrowRight className="ml-2 h-4 w-4" />
              </a>
            </Button>
            <button
              onClick={handleDismiss}
              className="text-white/80 hover:text-white"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// Floating WhatsApp Button
export function FloatingWhatsApp({ phone, message }: { phone: string; message?: string }) {
  const whatsappUrl = `https://wa.me/${phone.replace(/\D/g, "")}${
    message ? `?text=${encodeURIComponent(message)}` : ""
  }`;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg hover:bg-[#20BA5A] transition-all hover:scale-110"
      aria-label="WhatsApp ile iletişime geç"
    >
      <svg
        className="h-8 w-8"
        fill="currentColor"
        viewBox="0 0 24 24"
      >
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
      </svg>
    </a>
  );
}
