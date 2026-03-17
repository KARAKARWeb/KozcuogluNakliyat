// Ana sayfa için critical CSS ve optimizasyonlar
export const criticalCSS = `
  /* Critical Above-the-fold CSS */
  body{margin:0;font-family:var(--font-inter),system-ui,sans-serif;background:#fff;color:#122032}
  .hero{background:#122032;color:#fff;min-height:600px}
  .container{max-width:1440px;margin:0 auto;padding:0 1rem}
  @media(min-width:768px){.container{padding:0 1.5rem}}
  @media(min-width:1024px){.container{padding:0 2rem}}
`;

export const preloadResources = [
  { rel: 'preload', as: 'image', href: '/images/hero-bg.webp', type: 'image/webp' },
  { rel: 'preload', as: 'font', href: '/fonts/inter-var.woff2', type: 'font/woff2', crossOrigin: 'anonymous' },
];

export const deferredScripts = [
  'https://www.googletagmanager.com/gtag/js',
  'https://www.clarity.ms/tag/',
  'https://embed.tawk.to/',
];
