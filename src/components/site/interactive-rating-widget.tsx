"use client";

import { useState } from "react";
import { Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/site/toast-notification";

interface InteractiveRatingWidgetProps {
  pageSlug: string;
  currentRating?: number;
  totalRatings?: number;
  onRatingSubmitted?: () => void;
}

export function InteractiveRatingWidget({
  pageSlug,
  currentRating = 0,
  totalRatings = 0,
  onRatingSubmitted,
}: InteractiveRatingWidgetProps) {
  const { showToast } = useToast();
  const [hoveredRating, setHoveredRating] = useState(0);
  const [selectedRating, setSelectedRating] = useState(0);
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [alreadyRated, setAlreadyRated] = useState(false);

  // Sayfa yüklendiğinde daha önce oy verilmiş mi kontrol et
  useState(() => {
    if (typeof window !== 'undefined') {
      const ratedPages = localStorage.getItem('rated_pages');
      if (ratedPages) {
        const pages = JSON.parse(ratedPages);
        if (pages.includes(pageSlug)) {
          setAlreadyRated(true);
        }
      }
    }
  });

  const handleSubmit = async () => {
    if (selectedRating === 0) {
      showToast('warning', 'Lütfen bir puan seçin');
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(`/api/ratings/${pageSlug}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ rating: selectedRating, comment }),
      });

      if (res.ok) {
        setSubmitted(true);
        
        // localStorage'a kaydet - bu sayfaya oy verildi
        if (typeof window !== 'undefined') {
          const ratedPages = localStorage.getItem('rated_pages');
          const pages = ratedPages ? JSON.parse(ratedPages) : [];
          if (!pages.includes(pageSlug)) {
            pages.push(pageSlug);
            localStorage.setItem('rated_pages', JSON.stringify(pages));
          }
        }
        
        showToast('success', 'Değerlendirmeniz için teşekkürler!');
        onRatingSubmitted?.();
      } else {
        showToast('error', 'Değerlendirme gönderilemedi. Lütfen tekrar deneyin.');
      }
    } catch (error) {
      showToast('error', 'Bir hata oluştu. Lütfen tekrar deneyin.');
    } finally {
      setLoading(false);
    }
  };

  if (submitted || alreadyRated) {
    return (
      <div className="rounded-lg border bg-card p-6 text-center">
        <p className="text-green-600 font-semibold">
          {submitted ? 'Değerlendirmeniz için teşekkürler!' : 'Bu sayfayı zaten değerlendirdiniz.'}
        </p>
        {totalRatings > 0 && (
          <div className="flex items-center justify-center gap-2 mt-4">
            <div className="flex gap-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className={`h-5 w-5 ${
                    i < Math.round(currentRating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'
                  }`}
                />
              ))}
            </div>
            <span className="text-sm text-muted-foreground">
              {currentRating.toFixed(1)} ({totalRatings} değerlendirme)
            </span>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="rounded-lg border bg-card p-6 space-y-4">
      <div className="text-center">
        <h3 className="text-lg font-semibold mb-2">Bu Sayfayı Değerlendirin</h3>
        {totalRatings > 0 && (
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="flex gap-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className={`h-5 w-5 ${
                    i < Math.round(currentRating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'
                  }`}
                />
              ))}
            </div>
            <span className="text-sm text-muted-foreground">
              {currentRating.toFixed(1)} ({totalRatings} değerlendirme)
            </span>
          </div>
        )}
      </div>

      <div className="flex justify-center gap-2">
        {Array.from({ length: 5 }).map((_, i) => {
          const rating = i + 1;
          const isActive = rating <= (hoveredRating || selectedRating);
          return (
            <button
              key={i}
              onMouseEnter={() => setHoveredRating(rating)}
              onMouseLeave={() => setHoveredRating(0)}
              onClick={() => setSelectedRating(rating)}
              className="transition-transform hover:scale-110"
            >
              <Star
                className={`h-8 w-8 ${
                  isActive ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'
                }`}
              />
            </button>
          );
        })}
      </div>

      {selectedRating > 0 && (
        <div className="space-y-2">
          <Textarea
            placeholder="Yorumunuz (opsiyonel)"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            rows={3}
          />
          <Button onClick={handleSubmit} disabled={loading} className="w-full">
            {loading ? 'Gönderiliyor...' : 'Değerlendirmeyi Gönder'}
          </Button>
        </div>
      )}
    </div>
  );
}
