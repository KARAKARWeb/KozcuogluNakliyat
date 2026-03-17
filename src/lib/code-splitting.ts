import dynamic from "next/dynamic";
import { ComponentType } from "react";

// Dynamic import with loading state
export function dynamicImport<T extends ComponentType<any>>(
  importFn: () => Promise<{ default: T }>,
  options?: {
    loading?: ComponentType;
    ssr?: boolean;
  }
) {
  return dynamic(importFn, {
    loading: options?.loading as any,
    ssr: options?.ssr ?? true,
  });
}

// Lazy load component with retry logic
export function lazyWithRetry<T extends ComponentType<any>>(
  importFn: () => Promise<{ default: T }>,
  retries: number = 3
): ReturnType<typeof dynamic> {
  return dynamic(
    () =>
      new Promise<{ default: T }>((resolve, reject) => {
        const attemptImport = (retriesLeft: number) => {
          importFn()
            .then(resolve)
            .catch((error) => {
              if (retriesLeft === 0) {
                reject(error);
                return;
              }
              
              setTimeout(() => {
                console.log(`Retrying import... (${retries - retriesLeft + 1}/${retries})`);
                attemptImport(retriesLeft - 1);
              }, 1000);
            });
        };

        attemptImport(retries);
      }),
    {
      ssr: false,
    }
  );
}

// Preload component
export function preloadComponent(importFn: () => Promise<any>) {
  importFn();
}

// Route-based code splitting helpers
export const DynamicComponents = {
  // Admin Components
  AdminDashboard: dynamic(() => import("@/components/admin/analytics-dashboard").then(mod => ({ default: mod.AnalyticsDashboard }))),
  AdminHeatmap: dynamic(() => import("@/components/admin/heatmap-analytics").then(mod => ({ default: mod.HeatmapAnalytics }))),
  AdminABTest: dynamic(() => import("@/components/admin/ab-test-dashboard").then(mod => ({ default: mod.ABTestDashboard }))),
  AdminSEOTools: dynamic(() => import("@/components/admin/seo-tools").then(mod => ({ default: mod.SEOContentEditor }))),
  AdminImageOptimizer: dynamic(() => import("@/components/admin/image-optimizer").then(mod => ({ default: mod.ImageOptimizer }))),
  
  // Site Components
  CommentsSystem: dynamic(() => import("@/components/site/comments-system").then(mod => ({ default: mod.CommentsSystem }))),
  RatingSystem: dynamic(() => import("@/components/site/rating-system").then(mod => ({ default: mod.RatingSystem }))),
  SocialProof: dynamic(() => import("@/components/site/social-proof").then(mod => ({ default: mod.TestimonialsSection }))),
  MarketingAutomation: dynamic(() => import("@/components/site/marketing-automation").then(mod => ({ default: mod.ExitIntentPopup }))),
  
  // Heavy Components (load on demand)
  RichTextEditor: dynamic(() => import("@/components/admin/rich-text-editor"), { ssr: false }),
};

// Bundle analysis helper
export function logBundleSize(componentName: string) {
  if (process.env.NODE_ENV === "development") {
    console.log(`[Bundle] Loading: ${componentName}`);
  }
}

// Intersection Observer based lazy loading
export function createIntersectionLoader<T extends ComponentType<any>>(
  importFn: () => Promise<{ default: T }>,
  options?: IntersectionObserverInit
) {
  return dynamic(
    () =>
      new Promise<{ default: T }>((resolve) => {
        const observer = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              if (entry.isIntersecting) {
                importFn().then(resolve);
                observer.disconnect();
              }
            });
          },
          options || { rootMargin: "100px" }
        );

        // Observe a placeholder element
        const placeholder = document.createElement("div");
        observer.observe(placeholder);
      }),
    { ssr: false }
  );
}

// Prefetch routes
export function prefetchRoute(href: string) {
  if (typeof window !== "undefined") {
    const link = document.createElement("link");
    link.rel = "prefetch";
    link.href = href;
    document.head.appendChild(link);
  }
}

// Critical CSS extraction helper
export function extractCriticalCSS(html: string): string {
  // This would be implemented with a CSS extraction tool
  // For now, returning empty string as placeholder
  return "";
}

// Tree shaking helper - mark unused exports
export function markUnused(moduleName: string, exportName: string) {
  if (process.env.NODE_ENV === "development") {
    console.warn(`[Tree Shaking] Unused export: ${moduleName}.${exportName}`);
  }
}
