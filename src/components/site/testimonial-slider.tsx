"use client";

import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Star, Quote } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Testimonial {
  id: string;
  name: string;
  rating: number;
  comment: string;
  date?: string;
  image?: string;
}

interface TestimonialSliderProps {
  testimonials: Testimonial[];
  autoPlay?: boolean;
  interval?: number;
}

export function TestimonialSlider({ testimonials, autoPlay = true, interval = 5000 }: TestimonialSliderProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (!autoPlay) return;
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, interval);
    return () => clearInterval(timer);
  }, [autoPlay, interval, testimonials.length]);

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const current = testimonials[currentIndex];

  return (
    <div className="relative rounded-lg border bg-card p-8">
      <Quote className="absolute top-4 right-4 h-12 w-12 text-primary/10" />
      
      <div className="relative z-10">
        <div className="flex gap-1 mb-4">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              className={`h-5 w-5 ${
                i < current.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'
              }`}
            />
          ))}
        </div>

        <p className="text-lg mb-6 italic">"{current.comment}"</p>

        <div className="flex items-center justify-between">
          <div>
            <p className="font-semibold">{current.name}</p>
            {current.date && (
              <p className="text-sm text-muted-foreground">
                {new Date(current.date).toLocaleDateString('tr-TR')}
              </p>
            )}
          </div>

          <div className="flex items-center gap-2">
            <Button variant="outline" size="icon" onClick={goToPrevious}>
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <div className="flex gap-1">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  className={`h-2 w-2 rounded-full transition-colors ${
                    index === currentIndex ? 'bg-primary' : 'bg-gray-300'
                  }`}
                  onClick={() => setCurrentIndex(index)}
                />
              ))}
            </div>
            <Button variant="outline" size="icon" onClick={goToNext}>
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
