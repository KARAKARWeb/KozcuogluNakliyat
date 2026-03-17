"use client";

import { useState } from "react";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight, ZoomIn, ZoomOut } from "lucide-react";
import { Button } from "@/components/ui/button";

interface LightboxImage {
  src: string;
  alt: string;
  title?: string;
}

interface LightboxImageViewerProps {
  images: LightboxImage[];
  initialIndex?: number;
  onClose: () => void;
}

export function LightboxImageViewer({ images, initialIndex = 0, onClose }: LightboxImageViewerProps) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [zoom, setZoom] = useState(1);

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
    setZoom(1);
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
    setZoom(1);
  };

  const handleZoomIn = () => setZoom((prev) => Math.min(prev + 0.5, 3));
  const handleZoomOut = () => setZoom((prev) => Math.max(prev - 0.5, 0.5));

  const current = images[currentIndex];

  return (
    <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center">
      <Button
        variant="ghost"
        size="icon"
        className="absolute top-4 right-4 text-white hover:bg-white/20"
        onClick={onClose}
      >
        <X className="h-6 w-6" />
      </Button>

      <div className="absolute top-4 left-4 flex gap-2">
        <Button
          variant="ghost"
          size="icon"
          className="text-white hover:bg-white/20"
          onClick={handleZoomOut}
          disabled={zoom <= 0.5}
        >
          <ZoomOut className="h-5 w-5" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="text-white hover:bg-white/20"
          onClick={handleZoomIn}
          disabled={zoom >= 3}
        >
          <ZoomIn className="h-5 w-5" />
        </Button>
      </div>

      {images.length > 1 && (
        <>
          <Button
            variant="ghost"
            size="icon"
            className="absolute left-4 text-white hover:bg-white/20"
            onClick={goToPrevious}
          >
            <ChevronLeft className="h-8 w-8" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-4 text-white hover:bg-white/20"
            onClick={goToNext}
          >
            <ChevronRight className="h-8 w-8" />
          </Button>
        </>
      )}

      <div className="relative max-w-7xl max-h-[90vh] overflow-auto">
        <div style={{ transform: `scale(${zoom})`, transition: 'transform 0.2s' }}>
          <Image
            src={current.src}
            alt={current.alt}
            width={1200}
            height={800}
            className="object-contain"
          />
        </div>
      </div>

      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white text-center">
        {current.title && <p className="font-semibold mb-1">{current.title}</p>}
        <p className="text-sm">
          {currentIndex + 1} / {images.length}
        </p>
      </div>
    </div>
  );
}
