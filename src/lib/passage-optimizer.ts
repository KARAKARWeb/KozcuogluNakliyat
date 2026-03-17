// Passage Ranking Optimization - H2'leri soru formatına çevir, direkt cevap ekle

export interface PassageSection {
  id: string;
  question: string;
  directAnswer: string;
  content: string;
}

// H2 başlıkları için soru formatı mapping
export const PASSAGE_QUESTIONS: Record<string, PassageSection[]> = {
  "evden-eve-nakliyat": [
    {
      id: "ne-kadar-surer",
      question: "Evden eve nakliyat ne kadar sürer?",
      directAnswer: "Ortalama bir 3+1 daire için evden eve nakliyat 4-6 saat sürer. Eşya miktarı, kat sayısı ve asansör durumuna göre bu süre değişir.",
      content: "Detaylı içerik buraya gelecek...",
    },
    {
      id: "fiyat-nasil-hesaplanir",
      question: "Nakliyat fiyatı nasıl hesaplanır?",
      directAnswer: "Nakliyat fiyatı; eşya hacmi (m³), kat sayısı, asansör durumu, mesafe ve ekstra hizmetlere göre hesaplanır. 2+1 daire için ortalama 5.000-12.000 TL arasıdır.",
      content: "Detaylı içerik buraya gelecek...",
    },
    {
      id: "hangi-esyalar-tasinir",
      question: "Hangi eşyalar nakliyat kapsamında taşınır?",
      directAnswer: "Mobilya, beyaz eşya, elektronik cihazlar, kişisel eşyalar ve ev tekstili nakliyat kapsamındadır. Tehlikeli maddeler ve çok değerli eşyalar kapsam dışıdır.",
      content: "Detaylı içerik buraya gelecek...",
    },
    {
      id: "sigorta-gerekli-mi",
      question: "Nakliyat sigortası gerekli mi?",
      directAnswer: "Evet, nakliyat sigortası şiddetle önerilir. Hasar durumunda eşyalarınız sigorta kapsamında tazmin edilir. Profesyonel firmalar sigortalı taşımacılık yapar.",
      content: "Detaylı içerik buraya gelecek...",
    },
    {
      id: "ne-zaman-rezervasyon",
      question: "Ne kadar önceden rezervasyon yapmalıyım?",
      directAnswer: "En az 1-2 hafta önceden rezervasyon yapmanız önerilir. Yaz ayları ve ay sonları yoğun olduğundan daha erken rezervasyon avantajlıdır.",
      content: "Detaylı içerik buraya gelecek...",
    },
  ],
  "ofis-tasima": [
    {
      id: "ofis-ne-kadar-surer",
      question: "Ofis taşıma ne kadar sürer?",
      directAnswer: "50 kişilik bir ofis için ortalama 1-2 gün sürer. IT altyapısı ve özel ekipmanlar varsa 3-4 güne kadar uzayabilir.",
      content: "Detaylı içerik buraya gelecek...",
    },
    {
      id: "is-akisi-durur-mu",
      question: "Ofis taşıma sırasında iş akışı durur mu?",
      directAnswer: "Hafta sonu veya mesai dışı taşıma ile iş akışı kesintiye uğramaz. Cuma akşamı başlayıp Pazar akşamı tamamlanabilir.",
      content: "Detaylı içerik buraya gelecek...",
    },
    {
      id: "it-altyapisi-nasil-tasinir",
      question: "IT altyapısı nasıl taşınır?",
      directAnswer: "Sunucular özel paketleme ile, kablolar etiketlenerek taşınır. IT uzmanı eşliğinde söküm-takım yapılır. Veri yedekleme önceden tamamlanmalıdır.",
      content: "Detaylı içerik buraya gelecek...",
    },
  ],
  "sehirler-arasi-nakliyat": [
    {
      id: "sehirler-arasi-ne-kadar-surer",
      question: "Şehirler arası nakliyat ne kadar sürer?",
      directAnswer: "İstanbul-Ankara arası 1 gün, İstanbul-İzmir 1-2 gün, İstanbul-Antalya 2-3 gün sürer. Hava koşullarına göre değişebilir.",
      content: "Detaylı içerik buraya gelecek...",
    },
    {
      id: "uzun-mesafe-guvenli-mi",
      question: "Uzun mesafe taşımada eşyalar güvende mi?",
      directAnswer: "Evet, profesyonel paketleme ve sigortalı taşıma ile eşyalar güvendedir. GPS takip sistemi ile anlık konum takibi yapılır.",
      content: "Detaylı içerik buraya gelecek...",
    },
  ],
};

// Section ID generator - anchor-friendly
export function generateSectionId(text: string): string {
  return text
    .toLowerCase()
    .replace(/ı/g, "i")
    .replace(/ğ/g, "g")
    .replace(/ü/g, "u")
    .replace(/ş/g, "s")
    .replace(/ö/g, "o")
    .replace(/ç/g, "c")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

// Direct answer component için HTML generator
export function generateDirectAnswerHTML(answer: string): string {
  return `<div class="direct-answer-box" style="background: linear-gradient(135deg, #fef2f2 0%, #fff 100%); border-left: 4px solid #e3000f; padding: 1.5rem; margin: 1.5rem 0; border-radius: 0.75rem;">
    <div style="display: flex; align-items: start; gap: 1rem;">
      <div style="flex-shrink: 0; width: 2.5rem; height: 2.5rem; background: #e3000f; border-radius: 0.5rem; display: flex; align-items: center; justify-content: center; color: white; font-weight: bold; font-size: 1.25rem;">✓</div>
      <div>
        <div style="font-size: 0.875rem; font-weight: 600; color: #e3000f; margin-bottom: 0.5rem;">KISA CEVAP</div>
        <p style="margin: 0; color: #122032; line-height: 1.6; font-size: 1rem;">${answer}</p>
      </div>
    </div>
  </div>`;
}
