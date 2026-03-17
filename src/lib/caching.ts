// Caching Strategies

// API Response Cache
class APICache {
  private cache: Map<string, { data: any; timestamp: number; ttl: number }>;

  constructor() {
    this.cache = new Map();
  }

  set(key: string, data: any, ttl: number = 300000) {
    this.cache.set(key, {
      data,
      timestamp: Date.now(),
      ttl,
    });
  }

  get(key: string): any | null {
    const cached = this.cache.get(key);
    if (!cached) return null;

    const isExpired = Date.now() - cached.timestamp > cached.ttl;
    if (isExpired) {
      this.cache.delete(key);
      return null;
    }

    return cached.data;
  }

  clear(key?: string) {
    if (key) {
      this.cache.delete(key);
    } else {
      this.cache.clear();
    }
  }

  has(key: string): boolean {
    const cached = this.cache.get(key);
    if (!cached) return false;

    const isExpired = Date.now() - cached.timestamp > cached.ttl;
    if (isExpired) {
      this.cache.delete(key);
      return false;
    }

    return true;
  }
}

export const apiCache = new APICache();

// Fetch with cache
export async function fetchWithCache(
  url: string,
  options?: RequestInit,
  ttl: number = 300000
): Promise<any> {
  const cacheKey = `${url}_${JSON.stringify(options)}`;

  // Check cache first
  const cached = apiCache.get(cacheKey);
  if (cached) {
    return cached;
  }

  // Fetch and cache
  const response = await fetch(url, options);
  const data = await response.json();

  apiCache.set(cacheKey, data, ttl);

  return data;
}

// Browser Storage Cache
export const storageCache = {
  set(key: string, value: any, ttl?: number) {
    const item = {
      value,
      timestamp: Date.now(),
      ttl: ttl || null,
    };
    localStorage.setItem(key, JSON.stringify(item));
  },

  get(key: string): any | null {
    const item = localStorage.getItem(key);
    if (!item) return null;

    try {
      const parsed = JSON.parse(item);
      
      if (parsed.ttl) {
        const isExpired = Date.now() - parsed.timestamp > parsed.ttl;
        if (isExpired) {
          localStorage.removeItem(key);
          return null;
        }
      }

      return parsed.value;
    } catch {
      return null;
    }
  },

  remove(key: string) {
    localStorage.removeItem(key);
  },

  clear() {
    localStorage.clear();
  },
};

// Service Worker Cache
export const swCache = {
  async add(url: string) {
    if ("serviceWorker" in navigator && "caches" in window) {
      const cache = await caches.open("app-cache-v1");
      await cache.add(url);
    }
  },

  async addAll(urls: string[]) {
    if ("serviceWorker" in navigator && "caches" in window) {
      const cache = await caches.open("app-cache-v1");
      await cache.addAll(urls);
    }
  },

  async get(url: string): Promise<Response | undefined> {
    if ("caches" in window) {
      const cache = await caches.open("app-cache-v1");
      return await cache.match(url);
    }
    return undefined;
  },

  async delete(url: string) {
    if ("caches" in window) {
      const cache = await caches.open("app-cache-v1");
      await cache.delete(url);
    }
  },

  async clear() {
    if ("caches" in window) {
      const cacheNames = await caches.keys();
      await Promise.all(cacheNames.map((name) => caches.delete(name)));
    }
  },
};

// Cache strategies
export const CacheStrategy = {
  // Cache First (SW cache -> Network)
  cacheFirst: async (url: string): Promise<Response> => {
    const cached = await swCache.get(url);
    if (cached) return cached;

    const response = await fetch(url);
    await swCache.add(url);
    return response;
  },

  // Network First (Network -> SW cache)
  networkFirst: async (url: string): Promise<Response> => {
    try {
      const response = await fetch(url);
      await swCache.add(url);
      return response;
    } catch {
      const cached = await swCache.get(url);
      if (cached) return cached;
      throw new Error("Network and cache failed");
    }
  },

  // Stale While Revalidate
  staleWhileRevalidate: async (url: string): Promise<Response> => {
    const cached = await swCache.get(url);
    
    // Return cached immediately if available
    const fetchPromise = fetch(url).then(async (response) => {
      await swCache.add(url);
      return response;
    });

    return cached || fetchPromise;
  },
};

// CDN Cache Headers
export const CDNHeaders = {
  static: {
    "Cache-Control": "public, max-age=31536000, immutable",
  },
  
  dynamic: {
    "Cache-Control": "public, max-age=3600, stale-while-revalidate=86400",
  },
  
  api: {
    "Cache-Control": "public, max-age=300, stale-while-revalidate=600",
  },
  
  noCache: {
    "Cache-Control": "no-cache, no-store, must-revalidate",
    "Pragma": "no-cache",
    "Expires": "0",
  },
};

// Preload critical resources
export function preloadCriticalResources() {
  const criticalResources = [
    "/fonts/inter-var.woff2",
    "/images/logo.svg",
  ];

  criticalResources.forEach((url) => {
    const link = document.createElement("link");
    link.rel = "preload";
    link.href = url;
    link.as = url.endsWith(".woff2") ? "font" : "image";
    if (url.endsWith(".woff2")) {
      link.crossOrigin = "anonymous";
    }
    document.head.appendChild(link);
  });
}

// Cache warming
export async function warmCache(urls: string[]) {
  await Promise.all(
    urls.map(async (url) => {
      try {
        await fetch(url);
        await swCache.add(url);
      } catch (error) {
        console.error(`Failed to warm cache for ${url}:`, error);
      }
    })
  );
}

// Cache invalidation
export function invalidateCache(pattern?: string) {
  if (pattern) {
    // Clear specific cache entries
    const keys = Array.from(apiCache["cache"].keys());
    keys.forEach((key) => {
      if (key.includes(pattern)) {
        apiCache.clear(key);
      }
    });
  } else {
    // Clear all caches
    apiCache.clear();
    storageCache.clear();
    swCache.clear();
  }
}

// Cache size management
export function getCacheSize(): Promise<number> {
  if ("storage" in navigator && "estimate" in navigator.storage) {
    return navigator.storage.estimate().then((estimate) => {
      return estimate.usage || 0;
    });
  }
  return Promise.resolve(0);
}

// Cache quota check
export async function checkCacheQuota(): Promise<{
  usage: number;
  quota: number;
  percentage: number;
}> {
  if ("storage" in navigator && "estimate" in navigator.storage) {
    const estimate = await navigator.storage.estimate();
    const usage = estimate.usage || 0;
    const quota = estimate.quota || 0;
    const percentage = quota > 0 ? (usage / quota) * 100 : 0;

    return { usage, quota, percentage };
  }

  return { usage: 0, quota: 0, percentage: 0 };
}
