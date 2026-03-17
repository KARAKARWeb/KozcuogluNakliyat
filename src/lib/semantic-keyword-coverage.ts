// Semantic Keyword Coverage - LSI keywords, eş anlamlılar, ilgili kavramlar

interface SemanticKeywordSet {
  primary: string;
  synonyms: string[];
  related: string[];
  lsi: string[];
  entities: string[];
}

// LSI (Latent Semantic Indexing) Keywords
export const SEMANTIC_KEYWORDS: Record<string, SemanticKeywordSet> = {
  "evden-eve-nakliyat": {
    primary: "evden eve nakliyat",
    synonyms: ["ev taşıma", "konut taşıma", "ev eşyası taşıma", "taşınma hizmeti"],
    related: [
      "nakliye firması",
      "taşıma şirketi",
      "eşya taşıma",
      "mobilya taşıma",
      "beyaz eşya taşıma",
    ],
    lsi: [
      "paketleme malzemesi",
      "taşıma ücreti",
      "nakliyat aracı",
      "eşya sigortası",
      "taşıma ekibi",
      "nakliye hizmeti",
      "ev değişikliği",
      "taşınma günü",
    ],
    entities: [
      "asansörlü nakliyat",
      "sigortalı taşıma",
      "profesyonel paketleme",
      "montaj demontaj",
    ],
  },
  
  "ofis-tasima": {
    primary: "ofis taşıma",
    synonyms: ["ofis taşımacılığı", "iş yeri taşıma", "kurumsal taşıma", "şirket taşıma"],
    related: [
      "ofis mobilyası",
      "IT ekipman taşıma",
      "arşiv taşıma",
      "kurumsal nakliyat",
      "iş yeri değişikliği",
    ],
    lsi: [
      "ofis demirbaşı",
      "çalışma masası",
      "sunucu odası",
      "kablo yönetimi",
      "ofis dolapları",
      "toplantı masası",
      "personel koordinasyonu",
      "iş akışı kesintisi",
    ],
    entities: [
      "hafta sonu taşıma",
      "IT altyapı taşıma",
      "kurumsal sigorta",
      "evrak güvenliği",
    ],
  },
  
  "sehirler-arasi-nakliyat": {
    primary: "şehirler arası nakliyat",
    synonyms: [
      "şehirlerarası taşıma",
      "uzun mesafe nakliyat",
      "illere arası taşıma",
      "farklı şehre taşınma",
    ],
    related: [
      "yurt içi taşıma",
      "karayolu taşımacılığı",
      "mesafeli nakliyat",
      "il dışı taşıma",
    ],
    lsi: [
      "kilometre başı ücret",
      "teslimat süresi",
      "yol güzergahı",
      "ara depo",
      "GPS takip",
      "nakliye aracı",
      "uzun yol sigortası",
      "şehir değişikliği",
    ],
    entities: [
      "parça eşya taşıma",
      "tam kamyon",
      "parsiyel yük",
      "teslimat garantisi",
    ],
  },
};

// Check semantic keyword coverage in content
export function checkSemanticCoverage(content: string, topic: string): {
  score: number;
  covered: string[];
  missing: string[];
  recommendations: string[];
} {
  const keywords = SEMANTIC_KEYWORDS[topic];
  if (!keywords) {
    return { score: 0, covered: [], missing: [], recommendations: [] };
  }
  
  const contentLower = content.toLowerCase();
  const allKeywords = [
    ...keywords.synonyms,
    ...keywords.related,
    ...keywords.lsi,
    ...keywords.entities,
  ];
  
  const covered = allKeywords.filter(kw => contentLower.includes(kw.toLowerCase()));
  const missing = allKeywords.filter(kw => !contentLower.includes(kw.toLowerCase()));
  
  const score = (covered.length / allKeywords.length) * 100;
  
  const recommendations: string[] = [];
  if (score < 50) {
    recommendations.push(`Semantic coverage düşük (%${score.toFixed(0)}). Daha fazla ilgili kavram ekle.`);
  }
  if (keywords.synonyms.every(syn => !contentLower.includes(syn.toLowerCase()))) {
    recommendations.push(`En az 2-3 eş anlamlı kullan: ${keywords.synonyms.slice(0, 3).join(", ")}`);
  }
  if (keywords.entities.filter(ent => contentLower.includes(ent.toLowerCase())).length < 2) {
    recommendations.push(`İlgili entity'leri bahset: ${keywords.entities.slice(0, 2).join(", ")}`);
  }
  
  return {
    score,
    covered,
    missing: missing.slice(0, 10), // Top 10 missing
    recommendations,
  };
}

// Generate semantic-rich paragraph
export function generateSemanticParagraph(topic: string, context: string): string {
  const keywords = SEMANTIC_KEYWORDS[topic];
  if (!keywords) return "";
  
  const synonym = keywords.synonyms[0];
  const related = keywords.related.slice(0, 2);
  const lsi = keywords.lsi.slice(0, 2);
  
  return `${keywords.primary} (${synonym}) hizmeti, ${related.join(" ve ")} konusunda uzmanlaşmış ${context}. ${lsi.join(", ")} gibi detaylar profesyonel ekibimiz tarafından titizlikle planlanır.`;
}

// Suggest related keywords for content expansion
export function suggestRelatedKeywords(topic: string, currentContent: string): string[] {
  const keywords = SEMANTIC_KEYWORDS[topic];
  if (!keywords) return [];
  
  const contentLower = currentContent.toLowerCase();
  
  // Find missing high-value keywords
  const missingLSI = keywords.lsi.filter(kw => !contentLower.includes(kw.toLowerCase()));
  const missingEntities = keywords.entities.filter(kw => !contentLower.includes(kw.toLowerCase()));
  
  return [...missingLSI.slice(0, 5), ...missingEntities.slice(0, 3)];
}
