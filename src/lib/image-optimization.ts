// Image Optimization Utilities

export interface ImageOptimizationConfig {
  quality: number;
  format: "webp" | "jpeg" | "png";
  width?: number;
  height?: number;
  fit?: "cover" | "contain" | "fill" | "inside" | "outside";
}

// CDN Configuration
const CDN_BASE_URL = process.env.NEXT_PUBLIC_CDN_URL || "";

export function getCDNUrl(imagePath: string, config?: ImageOptimizationConfig): string {
  // If no CDN configured, return original path
  if (!CDN_BASE_URL) {
    return imagePath;
  }

  // Build CDN URL with optimization parameters
  const params = new URLSearchParams();
  
  if (config?.quality) {
    params.append("q", config.quality.toString());
  }
  
  if (config?.format) {
    params.append("f", config.format);
  }
  
  if (config?.width) {
    params.append("w", config.width.toString());
  }
  
  if (config?.height) {
    params.append("h", config.height.toString());
  }
  
  if (config?.fit) {
    params.append("fit", config.fit);
  }

  const queryString = params.toString();
  const separator = imagePath.includes("?") ? "&" : "?";
  
  return `${CDN_BASE_URL}${imagePath}${queryString ? separator + queryString : ""}`;
}

// Generate responsive image srcset
export function generateSrcSet(
  imagePath: string,
  widths: number[] = [640, 750, 828, 1080, 1200, 1920, 2048, 3840]
): string {
  return widths
    .map((width) => {
      const url = getCDNUrl(imagePath, { quality: 85, format: "webp", width });
      return `${url} ${width}w`;
    })
    .join(", ");
}

// Generate sizes attribute
export function generateSizes(breakpoints?: Record<string, string>): string {
  const defaultBreakpoints = {
    "(max-width: 640px)": "100vw",
    "(max-width: 768px)": "100vw",
    "(max-width: 1024px)": "50vw",
    "(max-width: 1280px)": "33vw",
  };

  const sizes = breakpoints || defaultBreakpoints;
  
  return Object.entries(sizes)
    .map(([query, size]) => `${query} ${size}`)
    .join(", ");
}

// Check if browser supports WebP
export function supportsWebP(): Promise<boolean> {
  if (typeof window === "undefined") return Promise.resolve(false);

  return new Promise((resolve) => {
    const webP = new Image();
    webP.onload = webP.onerror = () => {
      resolve(webP.height === 2);
    };
    webP.src =
      "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";
  });
}

// Preload critical images
export function preloadImage(src: string, as: "image" = "image") {
  if (typeof window === "undefined") return;

  const link = document.createElement("link");
  link.rel = "preload";
  link.as = as;
  link.href = src;
  document.head.appendChild(link);
}

// Lazy load images with Intersection Observer
export function lazyLoadImages(selector: string = "img[data-src]") {
  if (typeof window === "undefined") return;

  const images = document.querySelectorAll(selector);

  const imageObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const img = entry.target as HTMLImageElement;
          const src = img.getAttribute("data-src");
          const srcset = img.getAttribute("data-srcset");

          if (src) {
            img.src = src;
            img.removeAttribute("data-src");
          }

          if (srcset) {
            img.srcset = srcset;
            img.removeAttribute("data-srcset");
          }

          img.classList.add("loaded");
          observer.unobserve(img);
        }
      });
    },
    {
      rootMargin: "50px 0px",
      threshold: 0.01,
    }
  );

  images.forEach((img) => imageObserver.observe(img));
}

// Image compression quality recommendations
export const QUALITY_PRESETS = {
  thumbnail: 60,
  low: 70,
  medium: 85,
  high: 90,
  max: 95,
} as const;

// Responsive breakpoints
export const RESPONSIVE_BREAKPOINTS = {
  mobile: 640,
  tablet: 768,
  laptop: 1024,
  desktop: 1280,
  wide: 1536,
  ultrawide: 1920,
} as const;

// Image format recommendations
export function getRecommendedFormat(
  originalFormat: string,
  hasTransparency: boolean = false
): "webp" | "jpeg" | "png" {
  if (hasTransparency) {
    return "webp"; // WebP supports transparency
  }

  if (originalFormat === "png" && !hasTransparency) {
    return "webp"; // Convert PNG to WebP if no transparency
  }

  return "webp"; // Default to WebP for best compression
}

// Calculate optimal image dimensions
export function calculateOptimalDimensions(
  originalWidth: number,
  originalHeight: number,
  maxWidth: number,
  maxHeight?: number
): { width: number; height: number } {
  const aspectRatio = originalWidth / originalHeight;

  let width = Math.min(originalWidth, maxWidth);
  let height = Math.round(width / aspectRatio);

  if (maxHeight && height > maxHeight) {
    height = maxHeight;
    width = Math.round(height * aspectRatio);
  }

  return { width, height };
}

// Generate blur placeholder data URL
export function generateBlurDataURL(
  width: number,
  height: number,
  color: string = "#e5e7eb"
): string {
  const svg = `
    <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
      <rect width="${width}" height="${height}" fill="${color}"/>
    </svg>
  `;

  return `data:image/svg+xml;base64,${Buffer.from(svg).toString("base64")}`;
}

// Image loading priority
export type ImagePriority = "high" | "low" | "auto";

export function getImagePriority(
  isAboveFold: boolean,
  isCritical: boolean = false
): ImagePriority {
  if (isCritical || isAboveFold) {
    return "high";
  }
  return "low";
}

// Batch image preloader
export async function preloadImages(urls: string[]): Promise<void> {
  const promises = urls.map((url) => {
    return new Promise<void>((resolve, reject) => {
      const img = new Image();
      img.onload = () => resolve();
      img.onerror = () => reject(new Error(`Failed to load image: ${url}`));
      img.src = url;
    });
  });

  await Promise.all(promises);
}
