"use client";

import { useState } from "react";
import { MessageSquareWarning, X, Star, Camera, Send, CheckCircle } from "lucide-react";

export function FeedbackButton() {
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState<"form" | "success">("form");
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [formData, setFormData] = useState({
    issue: "",
    location: "",
    screenshot: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleOpen = () => {
    setIsOpen(true);
    setStep("form");
    setFormData({
      issue: "",
      location: window.location.pathname,
      screenshot: "",
    });
  };

  const handleClose = () => {
    setIsOpen(false);
    setRating(0);
    setHoverRating(0);
  };

  const takeScreenshot = async () => {
    try {
      // Dynamic import html2canvas
      const html2canvas = (await import('html2canvas')).default;
      const canvas = await html2canvas(document.body, {
        allowTaint: true,
        useCORS: true,
        scale: 0.5,
        width: window.innerWidth,
        height: window.innerHeight,
      });
      const screenshot = canvas.toDataURL('image/jpeg', 0.7);
      setFormData(prev => ({ ...prev, screenshot }));
    } catch (error) {
      console.error('Screenshot error:', error);
      setFormData(prev => ({ ...prev, screenshot: "error" }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Aynı feedback tekrarını engelle
    const feedbackKey = `${formData.location}-${formData.issue.substring(0, 50)}`;
    const lastFeedback = localStorage.getItem('lastFeedback');
    const lastFeedbackTime = localStorage.getItem('lastFeedbackTime');
    
    if (lastFeedback === feedbackKey && lastFeedbackTime) {
      const timeDiff = Date.now() - parseInt(lastFeedbackTime);
      if (timeDiff < 5 * 60 * 1000) { // 5 dakika
        alert('Bu konuda yakın zamanda geri bildirim gönderdiniz. Lütfen bekleyin.');
        return;
      }
    }
    
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          rating,
          url: window.location.href,
          userAgent: navigator.userAgent,
          timestamp: new Date().toISOString(),
        }),
      });

      if (response.ok) {
        localStorage.setItem('lastFeedback', feedbackKey);
        localStorage.setItem('lastFeedbackTime', Date.now().toString());
        setStep("success");
        setTimeout(() => {
          handleClose();
        }, 3000);
      }
    } catch (error) {
      console.error("Feedback error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      {/* Floating Button - Dikey */}
      <button
        onClick={handleOpen}
        className="fixed left-0 top-1/2 z-50 -translate-y-1/2 rounded-r-lg bg-[#e3000f] px-2 py-6 text-white shadow-lg transition-all hover:px-3 hover:shadow-xl"
        aria-label="Hata Bildir"
        style={{ writingMode: 'vertical-rl' }}
      >
        <span className="flex items-center gap-2 text-xs font-medium tracking-wider">
          <MessageSquareWarning className="h-4 w-4" />
          HATA BİLDİR
        </span>
      </button>

      {/* Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 p-4">
          <div className="relative w-full max-w-md rounded-2xl bg-white shadow-2xl">
            {/* Close Button */}
            <button
              onClick={handleClose}
              className="absolute right-4 top-4 rounded-full p-1 transition hover:bg-gray-100"
              aria-label="Kapat"
            >
              <X className="h-5 w-5" />
            </button>

            {step === "form" ? (
              <form onSubmit={handleSubmit} className="p-6">
                <div className="mb-6 text-center">
                  <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-[#fef2f2] text-[#e3000f]">
                    <MessageSquareWarning className="h-7 w-7" />
                  </div>
                  <h2 className="text-2xl font-bold text-[#122032]">Geri Bildiriminiz</h2>
                  <p className="mt-2 text-sm text-gray-600">
                    Deneyiminizi iyileştirmemize yardımcı olun
                  </p>
                </div>

                {/* Rating */}
                <div className="mb-6">
                  <label className="mb-2 block text-center text-sm font-medium text-gray-700">
                    Sitemizi beğendiniz mi?
                  </label>
                  <div className="flex justify-center gap-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setRating(star)}
                        onMouseEnter={() => setHoverRating(star)}
                        onMouseLeave={() => setHoverRating(0)}
                        className="transition-transform hover:scale-110"
                      >
                        <Star
                          className={`h-8 w-8 ${
                            star <= (hoverRating || rating)
                              ? "fill-yellow-400 text-yellow-400"
                              : "text-gray-300"
                          }`}
                        />
                      </button>
                    ))}
                  </div>
                </div>

                {/* Issue */}
                <div className="mb-4">
                  <label htmlFor="issue" className="mb-2 block text-sm font-medium text-gray-700">
                    Hata veya öneri nedir?
                  </label>
                  <textarea
                    id="issue"
                    value={formData.issue}
                    onChange={(e) => setFormData(prev => ({ ...prev, issue: e.target.value }))}
                    className="w-full rounded-lg border border-gray-300 p-3 text-sm focus:border-[#e3000f] focus:outline-none focus:ring-2 focus:ring-[#e3000f]/20"
                    rows={4}
                    placeholder="Lütfen karşılaştığınız sorunu veya önerinizi detaylı açıklayın..."
                    required
                  />
                </div>

                {/* Location */}
                <div className="mb-4">
                  <label htmlFor="location" className="mb-2 block text-sm font-medium text-gray-700">
                    Hata nerede oluştu?
                  </label>
                  <input
                    type="text"
                    id="location"
                    value={formData.location}
                    onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
                    className="w-full rounded-lg border border-gray-300 p-3 text-sm focus:border-[#e3000f] focus:outline-none focus:ring-2 focus:ring-[#e3000f]/20"
                    placeholder="Örn: Ana sayfa, İletişim formu..."
                    required
                  />
                </div>

                {/* Screenshot */}
                <div className="mb-6">
                  <button
                    type="button"
                    onClick={takeScreenshot}
                    className="flex w-full items-center justify-center gap-2 rounded-lg border-2 border-dashed border-gray-300 p-3 text-sm font-medium text-gray-600 transition hover:border-[#e3000f] hover:text-[#e3000f]"
                  >
                    <Camera className="h-4 w-4" />
                    {formData.screenshot ? "Ekran Görüntüsü Alındı ✓" : "Ekran Görüntüsü Al"}
                  </button>
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex w-full items-center justify-center gap-2 rounded-lg bg-[#e3000f] px-6 py-3 font-semibold text-white transition hover:bg-[#c5000d] disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <>
                      <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                      Gönderiliyor...
                    </>
                  ) : (
                    <>
                      <Send className="h-4 w-4" />
                      Gönder
                    </>
                  )}
                </button>
              </form>
            ) : (
              <div className="p-8 text-center">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
                  <CheckCircle className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="mb-2 text-xl font-bold text-[#122032]">Teşekkür Ederiz!</h3>
                <p className="text-gray-600">
                  Muhteşem bir deneyim yaşamanız için sürekli ve durmadan geliştiriyoruz.
                  İlginiz için teşekkür ederiz.
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
