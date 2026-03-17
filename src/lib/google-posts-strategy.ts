// Google Business Profile Posts Strategy

interface GooglePost {
  type: "UPDATE" | "EVENT" | "OFFER" | "PRODUCT";
  title: string;
  content: string;
  ctaType?: "BOOK" | "CALL" | "LEARN_MORE" | "SIGN_UP";
  ctaUrl?: string;
  imageUrl?: string;
  startDate?: string;
  endDate?: string;
}

// Blog yazılarından GBP post oluştur
export function convertBlogToGBPPost(blogPost: {
  title: string;
  excerpt: string;
  slug: string;
  image?: string;
}): GooglePost {
  return {
    type: "UPDATE",
    title: blogPost.title.slice(0, 58), // Max 58 characters
    content: blogPost.excerpt.slice(0, 1500), // Max 1500 characters
    ctaType: "LEARN_MORE",
    ctaUrl: `https://kozcuoglunakliyat.com.tr/blog/${blogPost.slug}`,
    imageUrl: blogPost.image,
  };
}

// Haftalık post takvimi
export function generateWeeklyPosts(): GooglePost[] {
  const posts: GooglePost[] = [
    {
      type: "UPDATE",
      title: "Evden Eve Nakliyat İpuçları",
      content: "Taşınma öncesi hazırlık için 10 önemli ipucu! Eşyalarınızı güvenli paketleme, nakliyat günü yapılacaklar ve daha fazlası. Detaylı rehberimizi okuyun.",
      ctaType: "LEARN_MORE",
      ctaUrl: "https://kozcuoglunakliyat.com.tr/blog/tasinma-kontrol-listesi",
    },
    {
      type: "OFFER",
      title: "Şubat Kampanyası - %20 İndirim",
      content: "Şubat ayı boyunca evden eve nakliyat hizmetlerinde %20 indirim! Profesyonel ekip, sigortalı taşıma, ücretsiz paketleme malzemesi. Hemen teklif alın.",
      ctaType: "CALL",
      ctaUrl: "tel:4447436",
      startDate: new Date().toISOString(),
      endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
    },
    {
      type: "UPDATE",
      title: "Müşteri Memnuniyeti %98.5",
      content: "2024 yılında 15.000+ müşteriye hizmet verdik ve %98.5 memnuniyet oranı elde ettik. Güvenilir nakliyat için Kozcuoğlu Nakliyat.",
      ctaType: "BOOK",
      ctaUrl: "https://kozcuoglunakliyat.com.tr/iletisim",
    },
  ];
  
  return posts;
}

// Post performans metrikleri
export interface PostMetrics {
  views: number;
  clicks: number;
  ctr: number;
  calls: number;
}

export function trackPostPerformance(postId: string): PostMetrics {
  // GBP API integration would go here
  return {
    views: 0,
    clicks: 0,
    ctr: 0,
    calls: 0,
  };
}
