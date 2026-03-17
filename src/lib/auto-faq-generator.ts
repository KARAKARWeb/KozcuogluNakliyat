// Automatic FAQ Generation - Sayfa bazlı otomatik FAQPage schema

import { generateDynamicFAQ, generateEnhancedFAQSchema, mergeFAQs } from "./dynamic-faq-schema";

interface PageFAQConfig {
  slug: string;
  title: string;
  type: "service" | "region" | "blog" | "general";
  staticFAQs?: { question: string; answer: string }[];
}

// Auto-generate FAQ schema for any page
export function autoGenerateFAQSchema(config: PageFAQConfig, baseUrl: string = "https://kozcuoglunakliyat.com.tr") {
  const pageUrl = `${baseUrl}/${config.slug}`;
  
  // Generate dynamic FAQs based on page type
  const dynamicFAQs = generateDynamicFAQ({
    pageType: config.type,
    mainKeyword: config.title,
    pageTitle: config.title,
  });
  
  // Merge with static FAQs if provided
  const allFAQs = config.staticFAQs 
    ? mergeFAQs(config.staticFAQs, dynamicFAQs)
    : dynamicFAQs;
  
  // Generate enhanced FAQ schema
  return generateEnhancedFAQSchema(allFAQs, pageUrl);
}

// Hook for dynamic pages to auto-add FAQ schema
export function useFAQSchema(pageData: PageFAQConfig) {
  return autoGenerateFAQSchema(pageData);
}
