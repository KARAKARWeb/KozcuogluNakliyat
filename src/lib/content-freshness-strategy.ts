// Content Freshness Strategy - Otomatik güncelleme, tarih yönetimi

interface ContentFreshnessMetrics {
  url: string;
  lastModified: Date;
  publishDate: Date;
  ageInDays: number;
  freshnessScore: number;
  needsUpdate: boolean;
  updatePriority: "high" | "medium" | "low";
}

interface UpdateRecommendation {
  url: string;
  reason: string;
  suggestedUpdates: string[];
  priority: "high" | "medium" | "low";
}

// Calculate content freshness score
export function calculateFreshnessScore(publishDate: Date, lastModified: Date): number {
  const now = new Date();
  const daysSincePublish = Math.floor((now.getTime() - publishDate.getTime()) / (1000 * 60 * 60 * 24));
  const daysSinceUpdate = Math.floor((now.getTime() - lastModified.getTime()) / (1000 * 60 * 60 * 24));
  
  // Scoring logic:
  // - Content < 30 days: 100 points
  // - Content 30-90 days: 80 points
  // - Content 90-180 days: 60 points
  // - Content 180-365 days: 40 points
  // - Content > 365 days: 20 points
  // - Recent update bonus: +20 points if updated in last 30 days
  
  let score = 100;
  
  if (daysSincePublish > 30 && daysSincePublish <= 90) score = 80;
  else if (daysSincePublish > 90 && daysSincePublish <= 180) score = 60;
  else if (daysSincePublish > 180 && daysSincePublish <= 365) score = 40;
  else if (daysSincePublish > 365) score = 20;
  
  // Bonus for recent updates
  if (daysSinceUpdate < 30) score += 20;
  
  return Math.min(100, score);
}

// Determine if content needs update
export function needsContentUpdate(metrics: ContentFreshnessMetrics): boolean {
  const { ageInDays, freshnessScore } = metrics;
  
  // Update if:
  // - Content > 6 months old AND freshness score < 60
  // - Content > 1 year old regardless of score
  return (ageInDays > 180 && freshnessScore < 60) || ageInDays > 365;
}

// Generate update recommendations
export function generateUpdateRecommendations(
  url: string,
  publishDate: Date,
  lastModified: Date,
  contentType: "service" | "blog" | "region"
): UpdateRecommendation {
  const now = new Date();
  const ageInDays = Math.floor((now.getTime() - publishDate.getTime()) / (1000 * 60 * 60 * 24));
  const freshnessScore = calculateFreshnessScore(publishDate, lastModified);
  
  const suggestedUpdates: string[] = [];
  let priority: "high" | "medium" | "low" = "low";
  let reason = "";
  
  if (ageInDays > 365) {
    priority = "high";
    reason = `İçerik ${Math.floor(ageInDays / 365)} yıldan eski`;
    suggestedUpdates.push("Fiyat bilgilerini güncelle (2026 fiyatları)");
    suggestedUpdates.push("İstatistikleri güncelle");
    suggestedUpdates.push("Yeni hizmet/özellikler ekle");
    suggestedUpdates.push("Görselleri yenile");
  } else if (ageInDays > 180) {
    priority = "medium";
    reason = `İçerik ${Math.floor(ageInDays / 30)} aydan eski`;
    suggestedUpdates.push("Mevsimsel bilgileri güncelle");
    suggestedUpdates.push("Yeni müşteri yorumları ekle");
    suggestedUpdates.push("FAQ'leri genişlet");
  } else if (freshnessScore < 60) {
    priority = "low";
    reason = "Freshness score düşük";
    suggestedUpdates.push("Küçük iyileştirmeler yap");
    suggestedUpdates.push("İç linkleri kontrol et");
  }
  
  // Content-type specific recommendations
  if (contentType === "blog") {
    suggestedUpdates.push("'Son Güncelleme' tarihi ekle");
    suggestedUpdates.push("Yeni trendleri/gelişmeleri ekle");
  } else if (contentType === "service") {
    suggestedUpdates.push("Hizmet kapsamını genişlet");
    suggestedUpdates.push("Yeni bölge/şehir ekle");
  }
  
  return {
    url,
    reason,
    suggestedUpdates,
    priority,
  };
}

// Auto-update date fields in content
export function autoUpdateDateFields(content: string): string {
  const currentYear = new Date().getFullYear();
  
  // Update year references
  let updated = content.replace(/202[0-5]/g, currentYear.toString());
  
  // Update "güncel" references
  updated = updated.replace(
    /güncel fiyat/gi,
    `${currentYear} Güncel Fiyat`
  );
  
  return updated;
}

// Content freshness monitoring
export class ContentFreshnessMonitor {
  private contentRegistry: Map<string, ContentFreshnessMetrics> = new Map();
  
  registerContent(url: string, publishDate: Date, lastModified: Date) {
    const now = new Date();
    const ageInDays = Math.floor((now.getTime() - publishDate.getTime()) / (1000 * 60 * 60 * 24));
    const freshnessScore = calculateFreshnessScore(publishDate, lastModified);
    
    const metrics: ContentFreshnessMetrics = {
      url,
      publishDate,
      lastModified,
      ageInDays,
      freshnessScore,
      needsUpdate: needsContentUpdate({
        url,
        publishDate,
        lastModified,
        ageInDays,
        freshnessScore,
        needsUpdate: false,
        updatePriority: "low",
      }),
      updatePriority: ageInDays > 365 ? "high" : ageInDays > 180 ? "medium" : "low",
    };
    
    this.contentRegistry.set(url, metrics);
  }
  
  getUpdateQueue(): ContentFreshnessMetrics[] {
    return Array.from(this.contentRegistry.values())
      .filter(m => m.needsUpdate)
      .sort((a, b) => {
        const priorityOrder = { high: 3, medium: 2, low: 1 };
        return priorityOrder[b.updatePriority] - priorityOrder[a.updatePriority];
      });
  }
  
  generateMonthlyReport(): {
    totalContent: number;
    needsUpdate: number;
    avgFreshnessScore: number;
    highPriority: number;
  } {
    const all = Array.from(this.contentRegistry.values());
    const needsUpdate = all.filter(m => m.needsUpdate);
    const highPriority = needsUpdate.filter(m => m.updatePriority === "high");
    const avgScore = all.reduce((sum, m) => sum + m.freshnessScore, 0) / all.length;
    
    return {
      totalContent: all.length,
      needsUpdate: needsUpdate.length,
      avgFreshnessScore: avgScore,
      highPriority: highPriority.length,
    };
  }
}

export const freshnessMonitor = new ContentFreshnessMonitor();
