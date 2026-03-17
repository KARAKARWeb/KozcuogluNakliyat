"use client";

import { Star, Quote, ThumbsUp, Calendar, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

interface Review {
  id: string;
  name: string;
  rating: number;
  comment: string;
  createdAt: string;
  helpful?: number;
}

interface ReviewsPremiumProps {
  reviews: Review[];
  averageRating: number;
  totalReviews: number;
  onWriteReview?: () => void;
}

export default function ReviewsPremium({ reviews, averageRating, totalReviews, onWriteReview }: ReviewsPremiumProps) {
  return (
    <div className="mt-16">
      {/* Header Section */}
      <div className="mb-8 text-center">
        <h2 className="text-3xl font-bold text-[#122032] sm:text-4xl">Müşteri Yorumları</h2>
        <p className="mt-2 text-muted-foreground">Müşterilerimizin deneyimleri</p>
      </div>

      {/* Rating Summary */}
      <Card className="mb-8 overflow-hidden border-none bg-gradient-to-br from-[#122032] to-[#1a3050] p-8 text-white shadow-xl">
        <div className="grid gap-6 md:grid-cols-2">
          <div className="flex flex-col items-center justify-center border-r border-white/10 md:items-start">
            <div className="mb-2 text-6xl font-bold">{averageRating.toFixed(1)}</div>
            <div className="mb-3 flex gap-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className={`h-6 w-6 ${i < Math.floor(averageRating) ? "fill-yellow-400 text-yellow-400" : "text-white/30"}`}
                />
              ))}
            </div>
            <p className="text-sm text-white/70">{totalReviews} değerlendirme</p>
          </div>
          
          <div className="flex flex-col justify-center space-y-2">
            {[5, 4, 3, 2, 1].map((star) => {
              const count = reviews.filter(r => r.rating === star).length;
              const percentage = totalReviews > 0 ? (count / totalReviews) * 100 : 0;
              return (
                <div key={star} className="flex items-center gap-3">
                  <span className="w-12 text-sm">{star} yıldız</span>
                  <div className="h-2 flex-1 overflow-hidden rounded-full bg-white/20">
                    <div className="h-full bg-yellow-400 transition-all" style={{ width: `${percentage}%` }} />
                  </div>
                  <span className="w-8 text-right text-sm text-white/70">{count}</span>
                </div>
              );
            })}
          </div>
        </div>
      </Card>

      {/* Reviews Grid */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {reviews.slice(0, 6).map((review) => (
          <Card key={review.id} className="group relative overflow-hidden border-none bg-white p-6 shadow-lg transition-all hover:-translate-y-1 hover:shadow-xl">
            {/* Quote Icon */}
            <div className="absolute -right-4 -top-4 opacity-5 transition-opacity group-hover:opacity-10">
              <Quote className="h-24 w-24 text-[#e3000f]" />
            </div>

            {/* Rating */}
            <div className="mb-4 flex gap-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className={`h-4 w-4 ${i < review.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
                />
              ))}
            </div>

            {/* Comment */}
            <div 
              className="relative z-10 mb-4 text-sm leading-relaxed text-muted-foreground line-clamp-4 prose prose-sm max-w-none prose-strong:text-[#122032] prose-strong:font-bold prose-em:italic prose-u:underline"
              dangerouslySetInnerHTML={{ __html: `"${review.comment}"` }}
            />

            {/* Footer */}
            <div className="border-t pt-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#fef2f2] text-[#e3000f]">
                  <User className="h-5 w-5" />
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-[#122032]">{review.name}</p>
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Calendar className="h-3 w-3" />
                    {new Date(review.createdAt).toLocaleDateString("tr-TR")}
                  </div>
                </div>
              </div>

              {review.helpful && review.helpful > 0 && (
                <div className="mt-3 flex items-center gap-1 text-xs text-muted-foreground">
                  <ThumbsUp className="h-3 w-3" />
                  <span>{review.helpful} kişi faydalı buldu</span>
                </div>
              )}
            </div>
          </Card>
        ))}
      </div>

      {/* CTA Button */}
      <div className="mt-8 text-center">
        <Button
          onClick={onWriteReview}
          size="lg"
          className="bg-[#e3000f] px-8 py-6 text-base font-semibold hover:bg-[#c5000d]"
        >
          Yorum Yaz
        </Button>
      </div>
    </div>
  );
}
