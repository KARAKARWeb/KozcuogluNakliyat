// Image Sitemap Generator - Google Images için görünürlük

interface ImageEntry {
  loc: string;
  images: {
    url: string;
    title?: string;
    caption?: string;
    geoLocation?: string;
    license?: string;
  }[];
}

export function generateImageSitemap(entries: ImageEntry[]): string {
  const xmlHeader = '<?xml version="1.0" encoding="UTF-8"?>';
  const urlsetOpen = '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">';
  const urlsetClose = '</urlset>';

  const urls = entries.map(entry => {
    const images = entry.images.map(img => `
    <image:image>
      <image:loc>${escapeXml(img.url)}</image:loc>
      ${img.title ? `<image:title>${escapeXml(img.title)}</image:title>` : ''}
      ${img.caption ? `<image:caption>${escapeXml(img.caption)}</image:caption>` : ''}
      ${img.geoLocation ? `<image:geo_location>${escapeXml(img.geoLocation)}</image:geo_location>` : ''}
      ${img.license ? `<image:license>${escapeXml(img.license)}</image:license>` : ''}
    </image:image>`).join('');

    return `
  <url>
    <loc>${escapeXml(entry.loc)}</loc>${images}
  </url>`;
  }).join('');

  return `${xmlHeader}\n${urlsetOpen}${urls}\n${urlsetClose}`;
}

function escapeXml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}
