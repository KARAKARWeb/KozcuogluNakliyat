"use client";

import { useState } from "react";
import { Play } from "lucide-react";
import Image from "next/image";

interface LazyYouTubeProps {
  videoId: string;
  title: string;
  className?: string;
}

export function LazyYouTube({ videoId, title, className = "" }: LazyYouTubeProps) {
  const [isLoaded, setIsLoaded] = useState(false);

  const thumbnailUrl = `https://i.ytimg.com/vi/${videoId}/maxresdefault.jpg`;

  const handleClick = () => {
    setIsLoaded(true);
  };

  if (isLoaded) {
    return (
      <div className={`relative aspect-video overflow-hidden rounded-xl ${className}`}>
        <iframe
          src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="h-full w-full"
        />
      </div>
    );
  }

  return (
    <div 
      className={`group relative aspect-video cursor-pointer overflow-hidden rounded-xl ${className}`}
      onClick={handleClick}
    >
      <Image
        src={thumbnailUrl}
        alt={title}
        fill
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        className="object-cover transition-transform duration-300 group-hover:scale-105"
      />
      
      <div className="absolute inset-0 flex items-center justify-center bg-black/30 transition-colors group-hover:bg-black/40">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#e3000f] shadow-lg transition-transform group-hover:scale-110 md:h-20 md:w-20">
          <Play className="h-8 w-8 fill-white text-white md:h-10 md:w-10" />
        </div>
      </div>
      
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
        <p className="text-sm font-medium text-white md:text-base">{title}</p>
      </div>
    </div>
  );
}
