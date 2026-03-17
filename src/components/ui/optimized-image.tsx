"use client";

import { useState, useEffect, useRef } from "react";
import Image, { ImageProps } from "next/image";

interface OptimizedImageProps extends Omit<ImageProps, "src"> {
  src: string;
  alt: string;
  lazy?: boolean;
  webp?: boolean;
  quality?: number;
  placeholder?: "blur" | "empty";
  blurDataURL?: string;
}

export function OptimizedImage({
  src,
  alt,
  lazy = true,
  webp = true,
  quality = 85,
  placeholder = "empty",
  blurDataURL,
  className,
  ...props
}: OptimizedImageProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(!lazy);
  const imgRef = useRef<HTMLDivElement>(null);

  // Lazy loading with Intersection Observer
  useEffect(() => {
    if (!lazy || isInView) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsInView(true);
            observer.disconnect();
          }
        });
      },
      {
        rootMargin: "50px",
      }
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => observer.disconnect();
  }, [lazy, isInView]);

  // Convert to WebP if supported
  const getOptimizedSrc = (originalSrc: string) => {
    if (!webp) return originalSrc;
    
    // If already WebP, return as is
    if (originalSrc.endsWith(".webp")) return originalSrc;
    
    // For external URLs, return as is
    if (originalSrc.startsWith("http")) return originalSrc;
    
    // For local images, suggest WebP version
    return originalSrc.replace(/\.(jpg|jpeg|png)$/i, ".webp");
  };

  const optimizedSrc = getOptimizedSrc(src);

  return (
    <div ref={imgRef} className={`relative overflow-hidden ${className || ""}`}>
      {isInView ? (
        <Image
          src={optimizedSrc}
          alt={alt}
          quality={quality}
          placeholder={placeholder}
          blurDataURL={blurDataURL}
          onLoad={() => setIsLoaded(true)}
          className={`transition-opacity duration-300 ${
            isLoaded ? "opacity-100" : "opacity-0"
          }`}
          {...props}
        />
      ) : (
        <div
          className="absolute inset-0 bg-gray-200 animate-pulse"
          style={{ aspectRatio: props.width && props.height ? `${props.width}/${props.height}` : undefined }}
        />
      )}
    </div>
  );
}

// Responsive Image Component
interface ResponsiveImageProps extends Omit<ImageProps, "src"> {
  src: string;
  alt: string;
  sizes?: string;
  quality?: number;
}

export function ResponsiveImage({
  src,
  alt,
  sizes = "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw",
  quality = 85,
  ...props
}: ResponsiveImageProps) {
  return (
    <Image
      src={src}
      alt={alt}
      sizes={sizes}
      quality={quality}
      {...props}
    />
  );
}

// Background Image with Lazy Loading
export function LazyBackgroundImage({
  src,
  alt,
  className,
  children,
}: {
  src: string;
  alt: string;
  className?: string;
  children?: React.ReactNode;
}) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const divRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsInView(true);
            observer.disconnect();
          }
        });
      },
      { rootMargin: "50px" }
    );

    if (divRef.current) {
      observer.observe(divRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isInView) return;

    const img = new window.Image();
    img.src = src;
    img.onload = () => setIsLoaded(true);
  }, [isInView, src]);

  return (
    <div
      ref={divRef}
      className={`relative ${className || ""}`}
      style={{
        backgroundImage: isLoaded ? `url(${src})` : undefined,
        backgroundColor: isLoaded ? undefined : "#e5e7eb",
      }}
      role="img"
      aria-label={alt}
    >
      {!isLoaded && isInView && (
        <div className="absolute inset-0 bg-gray-200 animate-pulse" />
      )}
      {children}
    </div>
  );
}

// Image with Blur Placeholder
export function BlurImage({
  src,
  alt,
  width,
  height,
  className,
}: {
  src: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
}) {
  // Generate low-quality placeholder
  const blurDataURL = `data:image/svg+xml;base64,${Buffer.from(
    `<svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
      <rect width="${width}" height="${height}" fill="#e5e7eb"/>
    </svg>`
  ).toString("base64")}`;

  return (
    <Image
      src={src}
      alt={alt}
      width={width}
      height={height}
      placeholder="blur"
      blurDataURL={blurDataURL}
      className={className}
    />
  );
}
