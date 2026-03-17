// Content Similarity & Recommendation Engine

interface ContentItem {
  id: string;
  title: string;
  content: string;
  tags?: string[];
  category?: string;
}

// Calculate similarity score between two texts using TF-IDF
export function calculateSimilarity(text1: string, text2: string): number {
  const words1 = tokenize(text1);
  const words2 = tokenize(text2);
  
  const set1 = new Set(words1);
  const set2 = new Set(words2);
  
  const intersection = new Set([...set1].filter(x => set2.has(x)));
  const union = new Set([...set1, ...set2]);
  
  return intersection.size / union.size;
}

function tokenize(text: string): string[] {
  return text
    .toLowerCase()
    .replace(/[^\w\sğüşıöçĞÜŞİÖÇ]/g, '')
    .split(/\s+/)
    .filter(word => word.length > 2);
}

// Find similar content based on title and content
export function findSimilarContent(
  target: ContentItem,
  allContent: ContentItem[],
  limit: number = 5
): ContentItem[] {
  const scores = allContent
    .filter(item => item.id !== target.id)
    .map(item => {
      let score = 0;
      
      // Title similarity (weight: 0.4)
      score += calculateSimilarity(target.title, item.title) * 0.4;
      
      // Content similarity (weight: 0.3)
      score += calculateSimilarity(target.content, item.content) * 0.3;
      
      // Tag overlap (weight: 0.2)
      if (target.tags && item.tags) {
        const tagOverlap = target.tags.filter(t => item.tags?.includes(t)).length;
        score += (tagOverlap / Math.max(target.tags.length, item.tags.length)) * 0.2;
      }
      
      // Category match (weight: 0.1)
      if (target.category && item.category && target.category === item.category) {
        score += 0.1;
      }
      
      return { item, score };
    })
    .sort((a, b) => b.score - a.score)
    .slice(0, limit);
  
  return scores.map(s => s.item);
}

// Get recommendations based on user behavior
export function getRecommendations(
  viewedItems: ContentItem[],
  allContent: ContentItem[],
  limit: number = 5
): ContentItem[] {
  if (viewedItems.length === 0) {
    // Return popular content if no history
    return allContent.slice(0, limit);
  }
  
  const recommendations = new Map<string, number>();
  
  viewedItems.forEach(viewed => {
    const similar = findSimilarContent(viewed, allContent, 10);
    similar.forEach((item, index) => {
      const score = (10 - index) / 10; // Decay score
      recommendations.set(
        item.id,
        (recommendations.get(item.id) || 0) + score
      );
    });
  });
  
  return Array.from(recommendations.entries())
    .sort((a, b) => b[1] - a[1])
    .slice(0, limit)
    .map(([id]) => allContent.find(c => c.id === id)!)
    .filter(Boolean);
}

// Auto-suggest based on partial input
export function autoSuggest(
  query: string,
  allContent: ContentItem[],
  limit: number = 5
): ContentItem[] {
  const lowerQuery = query.toLowerCase();
  
  return allContent
    .filter(item => 
      item.title.toLowerCase().includes(lowerQuery) ||
      item.content.toLowerCase().includes(lowerQuery)
    )
    .slice(0, limit);
}

// Calculate content relevance score
export function calculateRelevance(
  query: string,
  content: ContentItem
): number {
  const queryWords = tokenize(query);
  const titleWords = tokenize(content.title);
  const contentWords = tokenize(content.content);
  
  let score = 0;
  
  queryWords.forEach(word => {
    // Title match (higher weight)
    if (titleWords.includes(word)) score += 3;
    // Content match
    if (contentWords.includes(word)) score += 1;
    // Tag match
    if (content.tags?.some(tag => tag.toLowerCase().includes(word))) score += 2;
  });
  
  return score;
}
