// Local FAQ Generator - Bölgeye özel SSS

interface LocalFAQ {
  question: string;
  answer: string;
}

// Bölge bazlı SSS şablonları
export function generateLocalFAQs(district: string, city: string = "İstanbul"): LocalFAQ[] {
  return [
    {
      question: `${district}'de nakliyat fiyatları ne kadardır?`,
      answer: `${district} için nakliyat fiyatları eşya miktarı, kat sayısı ve mesafeye göre değişir. Ortalama 2+1 daire için 5.000-12.000 TL, 3+1 daire için 8.000-18.000 TL arasındadır. ${district} bölgesinde asansörlü nakliyat hizmeti de sunuyoruz.`,
    },
    {
      question: `${district}'den ${city} içi taşıma ne kadar sürer?`,
      answer: `${district}'den ${city} içi farklı ilçelere taşıma ortalama 4-8 saat sürer. Trafik yoğunluğu ve mesafeye göre süre değişebilir. ${district} bölgesinde sabah erken saatlerde başlanan taşımalar daha hızlı tamamlanır.`,
    },
    {
      question: `${district}'de hangi nakliyat hizmetlerini sunuyorsunuz?`,
      answer: `${district} bölgesinde evden eve nakliyat, ofis taşıma, parça eşya taşıma, asansörlü nakliyat, eşya depolama ve paketleme hizmetleri sunuyoruz. ${district} ve çevre mahallelerine 7/24 hizmet veriyoruz.`,
    },
    {
      question: `${district}'de asansörlü nakliyat gerekli mi?`,
      answer: `${district} bölgesinde çoğu bina 4+ katlı olduğundan asansörlü nakliyat önerilir. Özellikle ${district}'deki yüksek katlı binalarda dış cephe asansörü ile taşıma hem daha güvenli hem de daha hızlıdır.`,
    },
    {
      question: `${district}'de hafta sonu nakliyat yapıyor musunuz?`,
      answer: `Evet, ${district} bölgesinde hafta sonu ve resmi tatillerde de nakliyat hizmeti veriyoruz. ${district}'de hafta sonu taşıma için en az 1 hafta önceden rezervasyon yapmanızı öneriyoruz.`,
    },
  ];
}

// İlçe bazlı özel bilgiler
export const DISTRICT_INFO: Record<string, { 
  avgPrice: string; 
  avgDuration: string; 
  features: string[];
}> = {
  "kadıköy": {
    avgPrice: "8.000-15.000 TL",
    avgDuration: "5-7 saat",
    features: ["Yoğun trafik", "Çoğu bina asansörlü", "Park sorunu"],
  },
  "beşiktaş": {
    avgPrice: "9.000-18.000 TL",
    avgDuration: "6-8 saat",
    features: ["Dar sokaklar", "Tarihi binalar", "Asansör gerekli"],
  },
  "üsküdar": {
    avgPrice: "7.000-14.000 TL",
    avgDuration: "5-7 saat",
    features: ["Yokuşlu arazı", "Asansörlü nakliyat önemli", "Trafik yoğun"],
  },
  "şişli": {
    avgPrice: "8.500-16.000 TL",
    avgDuration: "5-7 saat",
    features: ["Modern binalar", "Asansör mevcut", "Park alanı kısıtlı"],
  },
};
