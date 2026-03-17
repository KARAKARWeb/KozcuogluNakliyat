"use client";

import { useState } from "react";
import { Star, TrendingUp, BarChart3 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

interface RatingSystemProps {
  itemId: string;
  itemType: "blog" | "service" | "solution";
  currentRating?: number;
  totalRatings?: number;
  onRate?: (rating: number) => Promise<void>;
  readonly?: boolean;
}

export function RatingSystem({
  itemId,
  itemType,
  currentRating = 0,
  totalRatings = 0,
  onRate,
  readonly = false,
}: RatingSystemProps) {
  const [hoveredRating, setHoveredRating] = useState(0);
  const [userRating, setUserRating] = useState(0);
  const [submitting, setSubmitting] = useState(false);

  const handleRate = async (rating: number) => {
    if (readonly || !onRate) return;

    setSubmitting(true);
    try {
      await onRate(rating);
      setUserRating(rating);
    } catch (error) {
      console.error("Rating error:", error);
    } finally {
      setSubmitting(false);
    }
  };

  const displayRating = hoveredRating || userRating || currentRating;

  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            onClick={() => handleRate(star)}
            onMouseEnter={() => !readonly && setHoveredRating(star)}
            onMouseLeave={() => !readonly && setHoveredRating(0)}
            disabled={readonly || submitting}
            className={`transition-all ${
              readonly ? "cursor-default" : "cursor-pointer hover:scale-110"
            }`}
          >
            <Star
              className={`h-6 w-6 ${
                star <= displayRating
                  ? "fill-yellow-400 text-yellow-400"
                  : "text-gray-300"
              }`}
            />
          </button>
        ))}
      </div>
      
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <span className="font-semibold text-foreground">
          {currentRating.toFixed(1)}
        </span>
        <span>({totalRatings} değerlendirme)</span>
      </div>

      {userRating > 0 && (
        <p className="text-xs text-green-600">
          Değerlendirmeniz için teşekkürler!
        </p>
      )}
    </div>
  );
}

export function RatingDisplay({
  rating,
  totalRatings,
  size = "default",
}: {
  rating: number;
  totalRatings?: number;
  size?: "sm" | "default" | "lg";
}) {
  const sizeClasses = {
    sm: "h-3 w-3",
    default: "h-4 w-4",
    lg: "h-5 w-5",
  };

  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          className={`${sizeClasses[size]} ${
            star <= rating
              ? "fill-yellow-400 text-yellow-400"
              : "text-gray-300"
          }`}
        />
      ))}
      {totalRatings !== undefined && (
        <span className="ml-1 text-sm text-muted-foreground">
          ({totalRatings})
        </span>
      )}
    </div>
  );
}

export function RatingBreakdown({
  ratings,
}: {
  ratings: { star: number; count: number }[];
}) {
  const totalRatings = ratings.reduce((sum, r) => sum + r.count, 0);
  const averageRating =
    ratings.reduce((sum, r) => sum + r.star * r.count, 0) / totalRatings || 0;

  return (
    <div className="space-y-4 rounded-lg border bg-white p-6">
      <div className="flex items-center gap-4">
        <div className="text-center">
          <div className="text-4xl font-bold">{averageRating.toFixed(1)}</div>
          <RatingDisplay rating={Math.round(averageRating)} size="sm" />
          <div className="text-sm text-muted-foreground mt-1">
            {totalRatings} değerlendirme
          </div>
        </div>

        <div className="flex-1 space-y-2">
          {[5, 4, 3, 2, 1].map((star) => {
            const ratingData = ratings.find((r) => r.star === star);
            const count = ratingData?.count || 0;
            const percentage = totalRatings > 0 ? (count / totalRatings) * 100 : 0;

            return (
              <div key={star} className="flex items-center gap-2">
                <span className="text-sm w-12">{star} yıldız</span>
                <Progress value={percentage} className="flex-1" />
                <span className="text-sm text-muted-foreground w-12 text-right">
                  {count}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export function RatingAnalytics({
  data,
}: {
  data: {
    totalRatings: number;
    averageRating: number;
    trend: number;
    distribution: { star: number; count: number }[];
  };
}) {
  return (
    <div className="grid gap-4 md:grid-cols-3">
      <div className="rounded-lg border bg-white p-4">
        <div className="flex items-center gap-2 mb-2">
          <Star className="h-4 w-4 text-yellow-400" />
          <span className="text-sm font-medium">Ortalama Puan</span>
        </div>
        <div className="text-2xl font-bold">{data.averageRating.toFixed(1)}</div>
        <p className="text-xs text-muted-foreground">5 üzerinden</p>
      </div>

      <div className="rounded-lg border bg-white p-4">
        <div className="flex items-center gap-2 mb-2">
          <BarChart3 className="h-4 w-4 text-blue-500" />
          <span className="text-sm font-medium">Toplam Değerlendirme</span>
        </div>
        <div className="text-2xl font-bold">{data.totalRatings}</div>
        <p className="text-xs text-muted-foreground">Kullanıcı değerlendirmesi</p>
      </div>

      <div className="rounded-lg border bg-white p-4">
        <div className="flex items-center gap-2 mb-2">
          <TrendingUp className="h-4 w-4 text-green-500" />
          <span className="text-sm font-medium">Trend</span>
        </div>
        <div className="text-2xl font-bold">
          {data.trend > 0 ? "+" : ""}
          {data.trend.toFixed(1)}%
        </div>
        <p className="text-xs text-muted-foreground">Son 30 gün</p>
      </div>
    </div>
  );
}

export function QuickRating({
  itemId,
  onRate,
}: {
  itemId: string;
  onRate: (rating: number) => Promise<void>;
}) {
  const [rating, setRating] = useState(0);

  const handleQuickRate = async (value: number) => {
    setRating(value);
    await onRate(value);
  };

  return (
    <div className="inline-flex items-center gap-2 rounded-lg border bg-white p-2">
      <span className="text-sm font-medium">Bu içerik yararlı mı?</span>
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          onClick={() => handleQuickRate(star)}
          className="transition-transform hover:scale-110"
        >
          <Star
            className={`h-5 w-5 ${
              star <= rating
                ? "fill-yellow-400 text-yellow-400"
                : "text-gray-300"
            }`}
          />
        </button>
      ))}
    </div>
  );
}
