// Crawl Budget Optimization - Faceted navigation, orphan pages, crawl depth

interface CrawlRule {
  pattern: string;
  action: "allow" | "disallow";
  reason: string;
}

// Faceted navigation URL patterns to block
export const FACETED_NAVIGATION_RULES: CrawlRule[] = [
  {
    pattern: "?sort=",
    action: "disallow",
    reason: "Sorting parameters create duplicate content",
  },
  {
    pattern: "?filter=",
    action: "disallow",
    reason: "Filter parameters create duplicate content",
  },
  {
    pattern: "?page=",
    action: "allow",
    reason: "Pagination is valuable for indexing",
  },
  {
    pattern: "?color=",
    action: "disallow",
    reason: "Color filters create duplicate content",
  },
  {
    pattern: "?price=",
    action: "disallow",
    reason: "Price filters create duplicate content",
  },
];

// Generate robots.txt rules
export function generateRobotsTxtRules(): string {
  const disallowRules = FACETED_NAVIGATION_RULES
    .filter(rule => rule.action === "disallow")
    .map(rule => `Disallow: /*${rule.pattern}*`)
    .join("\n");
  
  return `User-agent: *
${disallowRules}
Allow: /*?page=*

# Sitemap
Sitemap: https://kozcuoglunakliyat.com.tr/sitemap.xml
Sitemap: https://kozcuoglunakliyat.com.tr/image-sitemap.xml`;
}

// Pagination rel="next"/"prev" helper
export function generatePaginationLinks(currentPage: number, totalPages: number, baseUrl: string) {
  const links: { rel: string; href: string }[] = [];
  
  if (currentPage > 1) {
    links.push({
      rel: "prev",
      href: `${baseUrl}?page=${currentPage - 1}`,
    });
  }
  
  if (currentPage < totalPages) {
    links.push({
      rel: "next",
      href: `${baseUrl}?page=${currentPage + 1}`,
    });
  }
  
  return links;
}

// Orphan page detection
export interface PageNode {
  url: string;
  internalLinks: string[];
  isOrphan: boolean;
}

export function detectOrphanPages(pages: PageNode[]): PageNode[] {
  const linkedPages = new Set<string>();
  
  // Collect all linked pages
  pages.forEach(page => {
    page.internalLinks.forEach(link => linkedPages.add(link));
  });
  
  // Find orphans (pages not linked by any other page)
  return pages.filter(page => !linkedPages.has(page.url));
}

// Crawl depth calculator
export interface CrawlDepthResult {
  url: string;
  depth: number;
  path: string[];
  isDeep: boolean;
}

export function calculateCrawlDepth(
  startUrl: string,
  targetUrl: string,
  siteStructure: Map<string, string[]>
): CrawlDepthResult {
  const queue: { url: string; depth: number; path: string[] }[] = [
    { url: startUrl, depth: 0, path: [startUrl] },
  ];
  const visited = new Set<string>();
  
  while (queue.length > 0) {
    const current = queue.shift()!;
    
    if (current.url === targetUrl) {
      return {
        url: targetUrl,
        depth: current.depth,
        path: current.path,
        isDeep: current.depth > 3,
      };
    }
    
    if (visited.has(current.url)) continue;
    visited.add(current.url);
    
    const links = siteStructure.get(current.url) || [];
    links.forEach(link => {
      queue.push({
        url: link,
        depth: current.depth + 1,
        path: [...current.path, link],
      });
    });
  }
  
  return {
    url: targetUrl,
    depth: -1,
    path: [],
    isDeep: true,
  };
}

// Max 3-click rule validator
export function validateThreeClickRule(pages: CrawlDepthResult[]): {
  passed: boolean;
  violations: CrawlDepthResult[];
  recommendations: string[];
} {
  const violations = pages.filter(page => page.depth > 3);
  const recommendations: string[] = [];
  
  if (violations.length > 0) {
    recommendations.push(`${violations.length} sayfa 3 tık kuralını ihlal ediyor`);
    recommendations.push("Ana menüye veya footer'a link ekleyin");
    recommendations.push("İç linkleme stratejisini güçlendirin");
  }
  
  return {
    passed: violations.length === 0,
    violations,
    recommendations,
  };
}
