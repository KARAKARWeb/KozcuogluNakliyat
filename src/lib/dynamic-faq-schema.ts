// Dynamic FAQ Schema Generator - Sayfa içeriğinden otomatik FAQ oluştur

interface FAQItem {
  question: string;
  answer: string;
}

interface DynamicFAQConfig {
  pageType: "service" | "region" | "blog" | "general";
  pageTitle: string;
  mainKeyword: string;
  relatedKeywords?: string[];
}

// Common FAQ templates by page type
const FAQ_TEMPLATES: Record<string, FAQItem[]> = {
  service: [
    {
      question: "{service} hizmeti ne kadar sürer?",
      answer: "Ortalama {service} hizmeti 4-6 saat sürer. Eşya miktarı ve mesafeye göre değişiklik gösterebilir.",
    },
    {
      question: "{service} fiyatı nasıl hesaplanır?",
      answer: "{service} fiyatı; eşya hacmi, kat sayısı, mesafe ve ekstra hizmetlere göre hesaplanır.",
    },
    {
      question: "{service} için sigorta var mı?",
      answer: "Evet, tüm {service} hizmetlerimiz sigortalıdır. Eşyalarınız hasar durumunda tazmin edilir.",
    },
    {
      question: "{service} için ne kadar önceden rezervasyon yapmalıyım?",
      answer: "{service} için en az 1-2 hafta önceden rezervasyon yapmanızı öneriyoruz.",
    },
  ],
  region: [
    {
      question: "{region} nakliyat fiyatları ne kadardır?",
      answer: "{region} için nakliyat fiyatları eşya miktarına göre değişir. Ortalama 5.000-15.000 TL arasındadır.",
    },
    {
      question: "{region} için hangi bölgelere hizmet veriyorsunuz?",
      answer: "{region} ve çevresindeki tüm mahallelere profesyonel nakliyat hizmeti sunuyoruz.",
    },
    {
      question: "{region} nakliyat ne kadar sürer?",
      answer: "{region} içinde ortalama 4-6 saat, şehirler arası ise mesafeye göre 1-3 gün sürer.",
    },
  ],
  blog: [
    {
      question: "{topic} hakkında daha fazla bilgi nereden alabilirim?",
      answer: "Blog yazımızda {topic} hakkında detaylı bilgi bulabilirsiniz. Ayrıca müşteri hizmetlerimizden destek alabilirsiniz.",
    },
  ],
};

// Generate dynamic FAQ based on page context
export function generateDynamicFAQ(config: DynamicFAQConfig): FAQItem[] {
  const templates = FAQ_TEMPLATES[config.pageType] || [];
  
  return templates.map((template) => ({
    question: template.question
      .replace("{service}", config.mainKeyword)
      .replace("{region}", config.mainKeyword)
      .replace("{topic}", config.mainKeyword),
    answer: template.answer
      .replace("{service}", config.mainKeyword)
      .replace("{region}", config.mainKeyword)
      .replace("{topic}", config.mainKeyword),
  }));
}

// Merge static and dynamic FAQs
export function mergeFAQs(staticFAQs: FAQItem[], dynamicFAQs: FAQItem[]): FAQItem[] {
  const merged = [...staticFAQs];
  
  // Add dynamic FAQs that don't exist in static
  dynamicFAQs.forEach((dynamicFAQ) => {
    const exists = staticFAQs.some((staticFAQ) => 
      staticFAQ.question.toLowerCase() === dynamicFAQ.question.toLowerCase()
    );
    
    if (!exists) {
      merged.push(dynamicFAQ);
    }
  });
  
  return merged;
}

// Generate FAQ schema with enhanced structure
export function generateEnhancedFAQSchema(faqs: FAQItem[], pageUrl: string) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "@id": `${pageUrl}#faqpage`,
    mainEntity: faqs.map((faq, idx) => ({
      "@type": "Question",
      "@id": `${pageUrl}#faq-${idx + 1}`,
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

// Auto-generate FAQs from page content (AI-like extraction)
export function extractFAQsFromContent(content: string, limit: number = 5): FAQItem[] {
  const faqs: FAQItem[] = [];
  
  // Simple extraction: Look for question patterns in content
  const questionPatterns = [
    /(?:^|\n)#{2,3}\s+(.+\?)\s*\n/g,  // Markdown headers with questions
    /(?:^|\n)(.+\?)\s*\n/g,            // Standalone questions
  ];
  
  questionPatterns.forEach((pattern) => {
    const matches = content.matchAll(pattern);
    for (const match of matches) {
      if (faqs.length >= limit) break;
      
      const question = match[1].trim();
      // Extract answer (next paragraph after question)
      const answerMatch = content.slice(match.index! + match[0].length).match(/^(.+?)(?:\n\n|\n#{1,3}|$)/);
      const answer = answerMatch ? answerMatch[1].trim().slice(0, 200) : "";
      
      if (answer) {
        faqs.push({ question, answer });
      }
    }
  });
  
  return faqs;
}
