"use client";

import { useState } from "react";
import { Star, Loader2, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import type { Review } from "@/types";
import { toast } from "sonner";

interface ReviewSectionProps {
  reviews: Review[];
  serviceSlug?: string;
}

export default function ReviewSection({ reviews, serviceSlug }: ReviewSectionProps) {
  const [showForm, setShowForm] = useState(false);
  const [name, setName] = useState("");
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [comment, setComment] = useState("");
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (rating === 0) { setError("Lütfen bir puan seçin"); return; }
    setSending(true);
    setError("");
    try {
      const res = await fetch("/api/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, rating, comment, serviceSlug: serviceSlug || "" }),
      });
      const json = await res.json();
      if (json.success) {
        setSent(true);
        setName(""); setRating(0); setComment("");
        toast.success("Yorumunuz başarıyla gönderildi!");
      } else {
        setError(json.error || "Bir hata oluştu");
        toast.error(json.error || "Bir hata oluştu");
      }
    } catch {
      setError("Bağlantı hatası");
      toast.error("Bağlantı hatası");
    }
    setSending(false);
  }

  return (
    <div>
      {/* Yorum Listesi */}
      {reviews.length > 0 && (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {reviews.map((r) => (
            <div key={r.id} className="rounded-xl border bg-white p-5 shadow-sm">
              <div className="flex gap-0.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={`h-4 w-4 ${i < r.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-200"}`}
                  />
                ))}
              </div>
              <div 
                className="mt-3 text-sm leading-relaxed text-muted-foreground prose prose-sm max-w-none prose-strong:text-[#122032] prose-strong:font-bold prose-em:italic prose-u:underline"
                dangerouslySetInnerHTML={{ __html: r.comment }}
              />
              <div className="mt-4 border-t pt-3">
                <p className="text-sm font-semibold text-[#122032]">{r.name}</p>
                <p className="text-xs text-muted-foreground">
                  {new Date(r.createdAt).toLocaleDateString("tr-TR")}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Yorum Formu */}
      <div className="mt-8">
        {!showForm && !sent && (
          <Button onClick={() => setShowForm(true)} className="bg-[#e3000f] hover:bg-[#c5000d]">
            Yorum Yaz
          </Button>
        )}

        {sent && (
          <div className="flex items-center gap-3 rounded-xl border bg-green-50 p-5">
            <CheckCircle className="h-6 w-6 text-green-500" />
            <div>
              <p className="font-semibold text-green-700">Yorumunuz alındı!</p>
              <p className="text-sm text-green-600">Onaylandıktan sonra yayınlanacaktır.</p>
            </div>
          </div>
        )}

        {showForm && !sent && (
          <form onSubmit={handleSubmit} className="space-y-6 rounded-2xl border-2 border-gray-200 bg-gradient-to-br from-white to-gray-50 p-8 shadow-lg">
            <div className="border-b pb-4">
              <h3 className="text-2xl font-bold text-[#122032]">Yorum Yazın</h3>
              <p className="mt-1 text-sm text-muted-foreground">Deneyiminizi bizimle paylaşın</p>
            </div>

            <div className="space-y-3">
              <Label className="text-base font-semibold">Puanınız *</Label>
              <div className="flex gap-2">
                {Array.from({ length: 5 }).map((_, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => setRating(i + 1)}
                    onMouseEnter={() => setHoverRating(i + 1)}
                    onMouseLeave={() => setHoverRating(0)}
                    className="rounded-lg p-1 transition-all hover:scale-110 hover:bg-yellow-50"
                  >
                    <Star
                      className={`h-10 w-10 transition-all ${
                        i < (hoverRating || rating)
                          ? "fill-yellow-400 text-yellow-400 drop-shadow-md"
                          : "text-gray-300"
                      }`}
                    />
                  </button>
                ))}
              </div>
              {rating > 0 && (
                <p className="text-sm text-muted-foreground">
                  {rating === 5 ? "Mükemmel!" : rating === 4 ? "Çok İyi!" : rating === 3 ? "İyi" : rating === 2 ? "Orta" : "Kötü"}
                </p>
              )}
            </div>

            <div className="space-y-3">
              <Label className="text-base font-semibold">Adınız *</Label>
              <Input 
                required 
                value={name} 
                onChange={(e) => setName(e.target.value)}
                className="h-11 text-base"
                placeholder="Adınız Soyadınız"
              />
            </div>

            <div className="space-y-3">
              <Label className="text-base font-semibold">Yorumunuz *</Label>
              <Textarea 
                required 
                value={comment} 
                onChange={(e) => setComment(e.target.value)} 
                rows={5}
                className="text-base resize-none"
                placeholder="Hizmetimiz hakkındaki düşüncelerinizi yazın..."
              />
            </div>

            {error && (
              <div className="rounded-lg bg-red-50 border border-red-200 p-4">
                <p className="text-sm text-red-600" role="alert">{error}</p>
              </div>
            )}

            <div className="flex gap-3 pt-4">
              <Button 
                type="submit" 
                disabled={sending} 
                className="flex-1 h-12 text-base font-semibold bg-gradient-to-r from-[#e3000f] to-[#c5000d] hover:from-[#c5000d] hover:to-[#a00009] shadow-lg"
              >
                {sending ? <Loader2 className="mr-2 h-5 w-5 animate-spin" /> : null}
                Yorumu Gönder
              </Button>
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => setShowForm(false)}
                className="h-12 px-8 text-base"
              >
                İptal
              </Button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
