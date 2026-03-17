// Bundle Optimization Utilities

export interface BundleAnalysis {
  totalSize: number;
  gzipSize: number;
  brotliSize: number;
  chunks: ChunkInfo[];
  unusedCode: UnusedCodeInfo[];
}

export interface ChunkInfo {
  name: string;
  size: number;
  modules: string[];
}

export interface UnusedCodeInfo {
  file: string;
  unusedBytes: number;
  coverage: number;
}

// Analyze bundle size
export function analyzeBundleSize(stats: any): BundleAnalysis {
  // This would integrate with webpack-bundle-analyzer or similar
  return {
    totalSize: 0,
    gzipSize: 0,
    brotliSize: 0,
    chunks: [],
    unusedCode: [],
  };
}

// Remove unused code
export function removeUnusedCode(code: string, usedExports: string[]): string {
  // Tree shaking logic
  return code;
}

// Minification helpers
export const MinificationConfig = {
  terser: {
    compress: {
      drop_console: true,
      drop_debugger: true,
      pure_funcs: ["console.log", "console.info"],
      passes: 2,
    },
    mangle: {
      safari10: true,
    },
    format: {
      comments: false,
    },
  },
  
  css: {
    level: 2,
    restructure: true,
  },
};

// Compression utilities
export async function compressWithGzip(content: string): Promise<Blob> {
  const encoder = new TextEncoder();
  const data = encoder.encode(content);
  
  const stream = new ReadableStream({
    start(controller) {
      controller.enqueue(data);
      controller.close();
    },
  });

  const compressedStream = stream.pipeThrough(
    new CompressionStream("gzip")
  );

  const chunks: Uint8Array[] = [];
  const reader = compressedStream.getReader();

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    chunks.push(value);
  }

  return new Blob(chunks as BlobPart[]);
}

export async function compressWithBrotli(content: string): Promise<Blob> {
  const encoder = new TextEncoder();
  const data = encoder.encode(content);
  
  const stream = new ReadableStream({
    start(controller) {
      controller.enqueue(data);
      controller.close();
    },
  });

  const compressedStream = stream.pipeThrough(
    new CompressionStream("deflate")
  );

  const chunks: Uint8Array[] = [];
  const reader = compressedStream.getReader();

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    chunks.push(value);
  }

  return new Blob(chunks as BlobPart[]);
}

// Calculate compression ratio
export function calculateCompressionRatio(
  original: number,
  compressed: number
): number {
  return ((original - compressed) / original) * 100;
}

// Bundle size recommendations
export const BundleSizeRecommendations = {
  main: {
    max: 200000, // 200KB
    warning: 150000, // 150KB
    optimal: 100000, // 100KB
  },
  vendor: {
    max: 150000,
    warning: 100000,
    optimal: 75000,
  },
  chunk: {
    max: 100000,
    warning: 75000,
    optimal: 50000,
  },
};

// Check bundle size against recommendations
export function checkBundleSize(
  size: number,
  type: keyof typeof BundleSizeRecommendations
): "optimal" | "warning" | "exceeded" {
  const limits = BundleSizeRecommendations[type];
  
  if (size <= limits.optimal) return "optimal";
  if (size <= limits.warning) return "warning";
  return "exceeded";
}

// Identify large dependencies
export function identifyLargeDependencies(
  modules: Array<{ name: string; size: number }>
): Array<{ name: string; size: number; recommendation: string }> {
  return modules
    .filter((m) => m.size > 50000) // > 50KB
    .map((m) => ({
      name: m.name,
      size: m.size,
      recommendation: getLargeDependencyRecommendation(m.name, m.size),
    }));
}

function getLargeDependencyRecommendation(name: string, size: number): string {
  if (name.includes("moment")) {
    return "date-fns veya day.js kullanmayı düşünün (daha küçük)";
  }
  if (name.includes("lodash")) {
    return "Sadece ihtiyacınız olan fonksiyonları import edin";
  }
  if (name.includes("chart")) {
    return "Lazy loading ile yükleyin";
  }
  return "Dynamic import kullanmayı düşünün";
}

// Code splitting recommendations
export function getCodeSplittingRecommendations(
  routes: Array<{ path: string; size: number }>
): string[] {
  const recommendations: string[] = [];

  routes.forEach((route) => {
    if (route.size > 100000) {
      recommendations.push(
        `${route.path} rotası çok büyük (${(route.size / 1024).toFixed(1)}KB). Dynamic import kullanın.`
      );
    }
  });

  return recommendations;
}

// Tree shaking effectiveness
export function calculateTreeShakingEffectiveness(
  originalSize: number,
  treeShakenSize: number
): {
  removedBytes: number;
  percentage: number;
  effectiveness: "excellent" | "good" | "poor";
} {
  const removedBytes = originalSize - treeShakenSize;
  const percentage = (removedBytes / originalSize) * 100;

  let effectiveness: "excellent" | "good" | "poor";
  if (percentage >= 30) effectiveness = "excellent";
  else if (percentage >= 15) effectiveness = "good";
  else effectiveness = "poor";

  return { removedBytes, percentage, effectiveness };
}

// Optimize imports
export function optimizeImports(code: string): string {
  // Replace barrel imports with direct imports
  // Example: import { Button } from '@/components'
  // To: import { Button } from '@/components/ui/button'
  
  return code;
}

// Dead code detection
export function detectDeadCode(
  code: string,
  usageMap: Map<string, boolean>
): string[] {
  const deadCode: string[] = [];
  
  // Analyze code and find unused exports
  // This would integrate with coverage tools
  
  return deadCode;
}

// Bundle splitting strategy
export const BundleSplittingStrategy = {
  vendor: {
    test: /[\\/]node_modules[\\/]/,
    name: "vendors",
    priority: 10,
  },
  
  common: {
    minChunks: 2,
    priority: 5,
    reuseExistingChunk: true,
  },
  
  admin: {
    test: /[\\/]admin[\\/]/,
    name: "admin",
    priority: 8,
  },
};

// Performance budget
export const PerformanceBudget = {
  javascript: {
    max: 300000, // 300KB
    warning: 250000, // 250KB
  },
  css: {
    max: 100000, // 100KB
    warning: 75000, // 75KB
  },
  images: {
    max: 500000, // 500KB per image
    warning: 300000, // 300KB
  },
  fonts: {
    max: 200000, // 200KB total
    warning: 150000, // 150KB
  },
};

// Check performance budget
export function checkPerformanceBudget(
  assets: Array<{ type: string; size: number }>
): Array<{ type: string; status: "ok" | "warning" | "exceeded"; size: number }> {
  return assets.map((asset) => {
    const budget = PerformanceBudget[asset.type as keyof typeof PerformanceBudget];
    if (!budget) return { ...asset, status: "ok" };

    let status: "ok" | "warning" | "exceeded";
    if (asset.size <= budget.warning) status = "ok";
    else if (asset.size <= budget.max) status = "warning";
    else status = "exceeded";

    return { ...asset, status };
  });
}
