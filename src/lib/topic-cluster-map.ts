// Topic Cluster Map - İçerik hiyerarşisi, orphan content kontrolü, link equity

interface TopicNode {
  id: string;
  title: string;
  url: string;
  type: "pillar" | "cluster" | "supporting";
  parentId?: string;
  children: string[];
  internalLinks: number;
  externalLinks: number;
  linkEquity: number;
}

interface ClusterMap {
  pillars: TopicNode[];
  clusters: TopicNode[];
  orphans: TopicNode[];
  linkEquityDistribution: { url: string; equity: number }[];
}

// Topic cluster hierarchy definition
export const TOPIC_HIERARCHY: Record<string, TopicNode> = {
  // PILLAR 1: Evden Eve Nakliyat
  "evden-eve-nakliyat": {
    id: "evden-eve-nakliyat",
    title: "Evden Eve Nakliyat",
    url: "/evden-eve-nakliyat",
    type: "pillar",
    children: [
      "asansorlu-nakliyat",
      "parca-esya-tasima",
      "esya-depolama",
      "tasinma-kontrol-listesi",
      "blog/evden-eve-nakliyat-fiyatlari",
      "blog/esya-paketleme-teknikleri",
      "blog/nakliyat-sigortasi",
      "blog/tasinma-mevsimi",
    ],
    internalLinks: 0,
    externalLinks: 0,
    linkEquity: 100,
  },
  
  // PILLAR 2: Ofis Taşıma
  "ofis-tasima": {
    id: "ofis-tasima",
    title: "Ofis Taşıma",
    url: "/ofis-tasima",
    type: "pillar",
    children: [
      "blog/ofis-tasima-maliyeti",
      "blog/ofis-tasima-planlama",
      "blog/it-altyapisi-tasima",
      "blog/ofis-mobilyasi-montaj",
      "blog/hafta-sonu-ofis-tasima",
      "blog/arsiv-evrak-tasima",
      "blog/ofis-tasima-sigortasi",
      "blog/ofis-tasima-ekip-yonetimi",
    ],
    internalLinks: 0,
    externalLinks: 0,
    linkEquity: 100,
  },
  
  // PILLAR 3: Şehirler Arası Nakliyat
  "sehirler-arasi-nakliyat": {
    id: "sehirler-arasi-nakliyat",
    title: "Şehirler Arası Nakliyat",
    url: "/sehirler-arasi-nakliyat",
    type: "pillar",
    children: [
      "blog/sehirler-arasi-nakliyat-fiyatlari",
      "blog/uzun-mesafe-esya-guvenligi",
      "blog/sehirler-arasi-teslimat-suresi",
      "blog/gps-esya-takibi",
      "blog/yeni-sehre-tasinma",
      "blog/sehirler-arasi-sigorta",
      "blog/kis-sehirler-arasi-tasima",
    ],
    internalLinks: 0,
    externalLinks: 0,
    linkEquity: 100,
  },
};

// Detect orphan content (pages without parent pillar)
export function detectOrphanContent(allPages: TopicNode[]): TopicNode[] {
  const orphans: TopicNode[] = [];
  
  allPages.forEach(page => {
    if (page.type === "supporting" || page.type === "cluster") {
      const hasParent = Object.values(TOPIC_HIERARCHY).some(pillar =>
        pillar.children.includes(page.id)
      );
      
      if (!hasParent) {
        orphans.push(page);
      }
    }
  });
  
  return orphans;
}

// Calculate link equity distribution
export function calculateLinkEquity(pages: TopicNode[]): { url: string; equity: number }[] {
  const totalLinks = pages.reduce((sum, p) => sum + p.internalLinks, 0);
  
  return pages.map(page => ({
    url: page.url,
    equity: totalLinks > 0 ? (page.internalLinks / totalLinks) * 100 : 0,
  })).sort((a, b) => b.equity - a.equity);
}

// Generate cluster map visualization data
export function generateClusterMap(pages: TopicNode[]): ClusterMap {
  const pillars = pages.filter(p => p.type === "pillar");
  const clusters = pages.filter(p => p.type === "cluster");
  const orphans = detectOrphanContent(pages);
  const linkEquityDistribution = calculateLinkEquity(pages);
  
  return {
    pillars,
    clusters,
    orphans,
    linkEquityDistribution,
  };
}

// Recommend internal links for better cluster connection
export function recommendInternalLinks(pageId: string): { url: string; reason: string }[] {
  const recommendations: { url: string; reason: string }[] = [];
  
  // Find parent pillar
  const parentPillar = Object.values(TOPIC_HIERARCHY).find(pillar =>
    pillar.children.includes(pageId)
  );
  
  if (parentPillar) {
    recommendations.push({
      url: parentPillar.url,
      reason: `Ana pillar sayfasına link ekle (${parentPillar.title})`,
    });
    
    // Recommend sibling pages
    const siblings = parentPillar.children.filter(child => child !== pageId).slice(0, 3);
    siblings.forEach(sibling => {
      recommendations.push({
        url: `/${sibling}`,
        reason: `İlgili içeriğe link ekle`,
      });
    });
  }
  
  return recommendations;
}

// Content gap analysis
export function analyzeContentGaps(pillarId: string): {
  missingTopics: string[];
  weakCoverage: string[];
  recommendations: string[];
} {
  const pillar = TOPIC_HIERARCHY[pillarId];
  if (!pillar) return { missingTopics: [], weakCoverage: [], recommendations: [] };
  
  const expectedMinimumArticles = 8;
  const currentArticles = pillar.children.length;
  
  const missingTopics: string[] = [];
  const recommendations: string[] = [];
  
  if (currentArticles < expectedMinimumArticles) {
    recommendations.push(
      `${pillarId} için ${expectedMinimumArticles - currentArticles} ek makale gerekli`
    );
  }
  
  // Topic-specific gaps
  if (pillarId === "evden-eve-nakliyat") {
    const hasInsurance = pillar.children.some(c => c.includes("sigorta"));
    const hasPricing = pillar.children.some(c => c.includes("fiyat"));
    
    if (!hasInsurance) missingTopics.push("Nakliyat sigortası detaylı rehber");
    if (!hasPricing) missingTopics.push("Fiyatlandırma hesaplama rehberi");
  }
  
  return {
    missingTopics,
    weakCoverage: [],
    recommendations,
  };
}
