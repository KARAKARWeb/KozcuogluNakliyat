// NLP-Friendly Content Structure & Entity Salience Optimization

interface EntityMention {
  entity: string;
  context: string;
  position: number;
  isFirstMention: boolean;
}

interface EntityDensityReport {
  entity: string;
  count: number;
  density: number;
  isOptimal: boolean;
  recommendation: string;
}

// Contextual entity descriptions - İlk kullanımda açıklama ekle
export const ENTITY_CONTEXTS: Record<string, string> = {
  "asansörlü nakliyat": "dış cephe asansörü ile yüksek katlara güvenli eşya taşıma hizmeti",
  "parça eşya taşıma": "az miktarda eşya için ekonomik parsiyel yük taşımacılığı",
  "ofis taşıma": "kurumsal ofis ve iş yeri taşımacılığı hizmeti",
  "şehirler arası nakliyat": "farklı şehirler arasında uzun mesafe eşya taşımacılığı",
  "eşya depolama": "güvenli ve klimatize depo ortamında geçici eşya muhafaza hizmeti",
  "evden eve nakliyat": "konut değişikliğinde tüm ev eşyalarının profesyonel taşınması",
  "sigortalı taşıma": "eşya hasarlarının tazmin edildiği güvenceli nakliyat hizmeti",
  "paketleme hizmeti": "eşyaların profesyonel malzemelerle korunarak hazırlanması",
  "montaj-demontaj": "mobilyaların söküm ve kurulum işlemleri",
  "nakliyat sigortası": "taşıma sırasında oluşabilecek hasarlara karşı mali koruma",
};

// Entity prominence optimization - Co-occurrence patterns
export const ENTITY_CO_OCCURRENCE: Record<string, string[]> = {
  "evden eve nakliyat": [
    "paketleme hizmeti",
    "sigortalı taşıma",
    "montaj-demontaj",
    "eşya depolama",
    "asansörlü nakliyat",
  ],
  "ofis taşıma": [
    "IT altyapısı",
    "arşiv taşıma",
    "kurumsal nakliyat",
    "hafta sonu taşıma",
    "sigortalı taşıma",
  ],
  "şehirler arası nakliyat": [
    "uzun mesafe",
    "GPS takip",
    "parça eşya taşıma",
    "nakliyat sigortası",
    "teslimat süresi",
  ],
};

// Add contextual description to first entity mention
export function addEntityContext(content: string, entity: string): string {
  const context = ENTITY_CONTEXTS[entity.toLowerCase()];
  if (!context) return content;
  
  // Find first occurrence
  const regex = new RegExp(`\\b${entity}\\b`, "i");
  const match = content.match(regex);
  
  if (!match) return content;
  
  // Add context in parentheses after first mention
  return content.replace(regex, `${match[0]} (${context})`);
}

// Entity density analysis
export function analyzeEntityDensity(content: string, targetEntity: string): EntityDensityReport {
  const words = content.split(/\s+/).length;
  const entityRegex = new RegExp(`\\b${targetEntity}\\b`, "gi");
  const matches = content.match(entityRegex);
  const count = matches ? matches.length : 0;
  
  // Optimal density: 1-2% for main entity
  const density = (count / words) * 100;
  const isOptimal = density >= 0.8 && density <= 2.5;
  
  let recommendation = "";
  if (density < 0.8) {
    recommendation = `Entity "${targetEntity}" kullanımı az (${density.toFixed(2)}%). Hedef: 1-2%`;
  } else if (density > 2.5) {
    recommendation = `Entity "${targetEntity}" çok fazla kullanılmış (${density.toFixed(2)}%). Keyword stuffing riski!`;
  } else {
    recommendation = `Entity density optimal (${density.toFixed(2)}%)`;
  }
  
  return {
    entity: targetEntity,
    count,
    density,
    isOptimal,
    recommendation,
  };
}

// Natural distribution check
export function checkNaturalDistribution(content: string, entity: string): {
  isNatural: boolean;
  sections: { section: number; mentions: number }[];
  recommendation: string;
} {
  // Split content into 4 sections
  const sectionSize = Math.floor(content.length / 4);
  const sections = [
    content.slice(0, sectionSize),
    content.slice(sectionSize, sectionSize * 2),
    content.slice(sectionSize * 2, sectionSize * 3),
    content.slice(sectionSize * 3),
  ];
  
  const entityRegex = new RegExp(`\\b${entity}\\b`, "gi");
  const sectionMentions = sections.map((section, idx) => ({
    section: idx + 1,
    mentions: (section.match(entityRegex) || []).length,
  }));
  
  // Check if distribution is too uneven
  const maxMentions = Math.max(...sectionMentions.map(s => s.mentions));
  const minMentions = Math.min(...sectionMentions.map(s => s.mentions));
  const isNatural = maxMentions - minMentions <= 3;
  
  const recommendation = isNatural
    ? "Entity dağılımı doğal ve dengeli"
    : `Entity dağılımı dengesiz. Bölüm ${sectionMentions.find(s => s.mentions === maxMentions)?.section} çok yoğun.`;
  
  return {
    isNatural,
    sections: sectionMentions,
    recommendation,
  };
}

// NLP-friendly content structure validator
export function validateNLPStructure(content: string): {
  score: number;
  issues: string[];
  recommendations: string[];
} {
  const issues: string[] = [];
  const recommendations: string[] = [];
  let score = 100;
  
  // Check 1: Paragraph length (optimal: 3-5 sentences)
  const paragraphs = content.split("\n\n");
  const longParagraphs = paragraphs.filter(p => p.split(/[.!?]/).length > 7);
  if (longParagraphs.length > 0) {
    issues.push(`${longParagraphs.length} paragraf çok uzun (>7 cümle)`);
    recommendations.push("Paragrafları 3-5 cümleye böl");
    score -= 10;
  }
  
  // Check 2: Sentence length (optimal: 15-20 words)
  const sentences = content.split(/[.!?]/).filter(s => s.trim().length > 0);
  const longSentences = sentences.filter(s => s.split(/\s+/).length > 25);
  if (longSentences.length > sentences.length * 0.3) {
    issues.push(`%${((longSentences.length / sentences.length) * 100).toFixed(0)} cümle çok uzun (>25 kelime)`);
    recommendations.push("Uzun cümleleri kısa ve net cümlelere böl");
    score -= 15;
  }
  
  // Check 3: Heading structure (H2 > H3 hierarchy)
  const h2Count = (content.match(/^#{2}\s/gm) || []).length;
  const h3Count = (content.match(/^#{3}\s/gm) || []).length;
  if (h2Count === 0) {
    issues.push("H2 başlık yok");
    recommendations.push("En az 3-5 H2 başlık ekle");
    score -= 20;
  }
  
  // Check 4: First paragraph has entity mention
  const firstParagraph = paragraphs[0] || "";
  if (firstParagraph.length > 0) {
    const hasEntityInFirst = Object.keys(ENTITY_CONTEXTS).some(entity =>
      firstParagraph.toLowerCase().includes(entity)
    );
    if (!hasEntityInFirst) {
      issues.push("İlk paragrafta ana entity yok");
      recommendations.push("İlk paragrafta ana hizmeti/entity'yi bahset");
      score -= 10;
    }
  }
  
  return {
    score: Math.max(0, score),
    issues,
    recommendations,
  };
}

// Generate entity-optimized content snippet
export function generateEntityOptimizedSnippet(
  mainEntity: string,
  relatedEntities: string[],
  context: string
): string {
  const mainContext = ENTITY_CONTEXTS[mainEntity.toLowerCase()] || mainEntity;
  
  return `${mainEntity} (${mainContext}), ${relatedEntities.slice(0, 2).join(", ")} ile birlikte ${context} için en uygun çözümdür.`;
}
