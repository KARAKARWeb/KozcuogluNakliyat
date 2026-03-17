// SEO Analysis & Optimization Tools

interface SEOAnalysis {
  score: number;
  issues: string[];
  warnings: string[];
  suggestions: string[];
}

interface PageContent {
  title: string;
  description: string;
  content: string;
  url: string;
  keywords?: string[];
}

// Analyze page SEO
export function analyzeSEO(page: PageContent): SEOAnalysis {
  const issues: string[] = [];
  const warnings: string[] = [];
  const suggestions: string[] = [];
  let score = 100;

  // Title analysis
  if (!page.title) {
    issues.push("Title eksik");
    score -= 20;
  } else if (page.title.length < 30) {
    warnings.push("Title çok kısa (min 30 karakter)");
    score -= 5;
  } else if (page.title.length > 60) {
    warnings.push("Title çok uzun (max 60 karakter)");
    score -= 5;
  }

  // Description analysis
  if (!page.description) {
    issues.push("Meta description eksik");
    score -= 15;
  } else if (page.description.length < 120) {
    warnings.push("Description çok kısa (min 120 karakter)");
    score -= 5;
  } else if (page.description.length > 160) {
    warnings.push("Description çok uzun (max 160 karakter)");
    score -= 5;
  }

  // Content analysis
  if (!page.content) {
    issues.push("İçerik eksik");
    score -= 30;
  } else {
    const wordCount = page.content.split(/\s+/).length;
    if (wordCount < 300) {
      warnings.push("İçerik çok kısa (min 300 kelime)");
      score -= 10;
    }

    // Heading analysis
    const h1Count = (page.content.match(/<h1/g) || []).length;
    if (h1Count === 0) {
      warnings.push("H1 başlığı eksik");
      score -= 10;
    } else if (h1Count > 1) {
      warnings.push("Birden fazla H1 başlığı var");
      score -= 5;
    }

    // Image alt text
    const images = page.content.match(/<img/g) || [];
    const alts = page.content.match(/alt="/g) || [];
    if (images.length > alts.length) {
      warnings.push(`${images.length - alts.length} görselde alt text eksik`);
      score -= 5;
    }
  }

  // URL analysis
  if (page.url.length > 100) {
    suggestions.push("URL çok uzun, kısaltmayı düşünün");
  }
  if (!/^[a-z0-9-/]+$/.test(page.url)) {
    suggestions.push("URL'de özel karakter var, SEO dostu değil");
  }

  // Keyword analysis
  if (page.keywords && page.keywords.length > 0) {
    const titleLower = page.title.toLowerCase();
    const descLower = page.description.toLowerCase();
    const missingKeywords = page.keywords.filter(
      k => !titleLower.includes(k.toLowerCase()) && !descLower.includes(k.toLowerCase())
    );
    if (missingKeywords.length > 0) {
      suggestions.push(`Bu anahtar kelimeler title/description'da yok: ${missingKeywords.join(', ')}`);
    }
  }

  return {
    score: Math.max(0, score),
    issues,
    warnings,
    suggestions,
  };
}

// Extract keywords from content
export function extractKeywords(content: string, limit: number = 10): string[] {
  const words = content
    .toLowerCase()
    .replace(/[^\w\sğüşıöçĞÜŞİÖÇ]/g, '')
    .split(/\s+/)
    .filter(word => word.length > 3);

  const frequency = new Map<string, number>();
  words.forEach(word => {
    frequency.set(word, (frequency.get(word) || 0) + 1);
  });

  return Array.from(frequency.entries())
    .sort((a, b) => b[1] - a[1])
    .slice(0, limit)
    .map(([word]) => word);
}

// Generate meta description from content
export function generateMetaDescription(content: string, maxLength: number = 160): string {
  const text = content.replace(/<[^>]*>/g, '').trim();
  if (text.length <= maxLength) return text;
  
  const truncated = text.substring(0, maxLength);
  const lastSpace = truncated.lastIndexOf(' ');
  return truncated.substring(0, lastSpace) + '...';
}

// Optimize title for SEO
export function optimizeTitle(title: string, keywords: string[]): string {
  let optimized = title;
  
  // Add primary keyword if not present
  if (keywords.length > 0 && !title.toLowerCase().includes(keywords[0].toLowerCase())) {
    optimized = `${keywords[0]} - ${title}`;
  }
  
  // Ensure length is optimal
  if (optimized.length > 60) {
    optimized = optimized.substring(0, 57) + '...';
  }
  
  return optimized;
}

// Check for duplicate content
export function checkDuplicateContent(content1: string, content2: string): number {
  const words1 = new Set(content1.toLowerCase().split(/\s+/));
  const words2 = new Set(content2.toLowerCase().split(/\s+/));
  
  const intersection = new Set([...words1].filter(x => words2.has(x)));
  const union = new Set([...words1, ...words2]);
  
  return (intersection.size / union.size) * 100;
}

// Generate sitemap entry
export function generateSitemapEntry(url: string, priority: number = 0.5, changefreq: string = 'weekly'): string {
  return `
  <url>
    <loc>${url}</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`;
}
