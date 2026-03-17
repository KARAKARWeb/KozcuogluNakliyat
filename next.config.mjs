import fs from 'fs';
import path from 'path';

function loadRedirects() {
  try {
    const filePath = path.join(process.cwd(), 'src', 'data', 'redirects.json');
    const raw = fs.readFileSync(filePath, 'utf-8');
    const items = JSON.parse(raw);
    return items
      .filter((r) => r.isActive && r.source && r.destination)
      .map((r) => ({
        source: r.source.startsWith('/') ? r.source : `/${r.source}`,
        destination: r.destination.startsWith('/') ? r.destination : r.destination.startsWith('http') ? r.destination : `/${r.destination}`,
        permanent: r.type === 'permanent',
      }));
  } catch {
    return [];
  }
}

const cspHeader = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline' 'unsafe-eval' *.googletagmanager.com *.google-analytics.com *.clarity.ms *.tawk.to",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob: *.google.com *.googleapis.com *.gstatic.com *.clarity.ms *.tawk.to https://karakar.web.tr *.kozcuoglunakliyat.com.tr",
  "font-src 'self' data: fonts.gstatic.com",
  "frame-src 'self' *.google.com maps.google.com *.youtube.com *.vimeo.com *.tawk.to",
  "connect-src 'self' *.google-analytics.com *.analytics.google.com *.googletagmanager.com *.clarity.ms *.tawk.to wss://*.tawk.to",
  "media-src 'self'",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'self'",
].join('; ');

const cspHeaderEmbed = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline' 'unsafe-eval'",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob: https://karakar.web.tr *.kozcuoglunakliyat.com.tr",
  "font-src 'self' data: fonts.gstatic.com",
  "connect-src 'self'",
  "media-src 'self'",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors *", // Tüm domainlere embed izni
].join('; ');

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactCompiler: true,
  poweredByHeader: false,
  compress: true,
  
  // Modern tarayıcı hedefleme - polyfill'leri azalt
  transpilePackages: [],
  
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 768, 1024, 1280, 1440],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 31536000,
  },

  experimental: {
    optimizeCss: true,
    optimizePackageImports: ['lucide-react', 'sonner', '@tiptap/react'],
  },

  compiler: {
    removeConsole: process.env.NODE_ENV === 'production' ? {
      exclude: ['error', 'warn'],
    } : false,
  },

  productionBrowserSourceMaps: false,

  turbopack: {
    root: process.cwd(),
  },

  async redirects() {
    return loadRedirects();
  },

  async headers() {
    return [
      {
        source: '/embed/:path*',
        headers: [
          { key: 'Access-Control-Allow-Origin', value: '*' },
          { key: 'Access-Control-Allow-Methods', value: 'GET, POST, OPTIONS' },
          { key: 'Access-Control-Allow-Headers', value: 'Content-Type' },
          { key: 'X-Frame-Options', value: 'ALLOWALL' },
        ],
      },
      {
        source: '/(.*)',
        headers: [
          { key: 'X-DNS-Prefetch-Control', value: 'on' },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
          { key: 'X-XSS-Protection', value: '1; mode=block' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
          { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains; preload' },
          { key: 'Content-Security-Policy', value: cspHeader },
          { key: 'Content-Language', value: 'tr' },
        ],
      },
      {
        source: '/_next/static/:path*',
        headers: [{ key: 'Cache-Control', value: 'public, max-age=31536000, immutable' }],
      },
      {
        source: '/:all*(svg|jpg|jpeg|png|webp|avif|ico|woff2|woff|ttf|eot)',
        headers: [{ key: 'Cache-Control', value: 'public, max-age=31536000, immutable' }],
      },
      {
        source: '/:all*(js|css)',
        headers: [{ key: 'Cache-Control', value: 'public, max-age=31536000, immutable' }],
      },
      {
        source: '/uploads/:path*',
        headers: [{ key: 'Cache-Control', value: 'public, max-age=31536000, immutable' }],
      },
      {
        source: '/api/:path*',
        headers: [{ key: 'X-Robots-Tag', value: 'noindex, nofollow' }],
      },
      {
        source: '/admin/:path*',
        headers: [{ key: 'X-Robots-Tag', value: 'noindex, nofollow' }],
      },
      {
        source: '/sw.js',
        headers: [
          { key: 'Cache-Control', value: 'no-cache, no-store, must-revalidate' },
          { key: 'Content-Type', value: 'application/javascript; charset=utf-8' },
        ],
      },
      {
        source: '/manifest.json',
        headers: [
          { key: 'Cache-Control', value: 'no-cache' },
          { key: 'Content-Type', value: 'application/manifest+json; charset=utf-8' },
        ],
      },
    ];
  },
};

export default nextConfig;
