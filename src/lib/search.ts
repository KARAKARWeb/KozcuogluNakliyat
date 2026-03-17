// Search Functionality - Site İçi Arama

export interface SearchResult {
  id: string;
  type: 'blog' | 'service' | 'region' | 'page';
  title: string;
  excerpt: string;
  url: string;
  image?: string;
  category?: string;
  relevance: number;
}

export interface SearchOptions {
  query: string;
  types?: Array<'blog' | 'service' | 'region' | 'page'>;
  limit?: number;
  offset?: number;
}

// Simple text search (can be replaced with Algolia/ElasticSearch)
export function searchContent(content: string, query: string): number {
  const lowerContent = content.toLowerCase();
  const lowerQuery = query.toLowerCase();
  
  if (!lowerContent.includes(lowerQuery)) return 0;
  
  // Calculate relevance score
  const words = lowerQuery.split(' ');
  let score = 0;
  
  words.forEach(word => {
    const count = (lowerContent.match(new RegExp(word, 'g')) || []).length;
    score += count;
  });
  
  return score;
}

// Search in multiple fields
export function calculateRelevance(item: any, query: string): number {
  let score = 0;
  
  // Title match (highest weight)
  if (item.title) {
    score += searchContent(item.title, query) * 10;
  }
  
  // Excerpt/description match
  if (item.excerpt) {
    score += searchContent(item.excerpt, query) * 5;
  }
  if (item.description) {
    score += searchContent(item.description, query) * 5;
  }
  
  // Content match
  if (item.content) {
    score += searchContent(item.content, query) * 2;
  }
  
  // Category/tags match
  if (item.category) {
    score += searchContent(item.category, query) * 3;
  }
  if (item.tags && Array.isArray(item.tags)) {
    item.tags.forEach((tag: string) => {
      score += searchContent(tag, query) * 3;
    });
  }
  
  return score;
}

// Autocomplete suggestions
export function generateSuggestions(query: string, allItems: any[]): string[] {
  const suggestions = new Set<string>();
  const lowerQuery = query.toLowerCase();
  
  allItems.forEach(item => {
    // Title suggestions
    if (item.title?.toLowerCase().includes(lowerQuery)) {
      suggestions.add(item.title);
    }
    
    // Category suggestions
    if (item.category?.toLowerCase().includes(lowerQuery)) {
      suggestions.add(item.category);
    }
    
    // Tag suggestions
    if (item.tags && Array.isArray(item.tags)) {
      item.tags.forEach((tag: string) => {
        if (tag.toLowerCase().includes(lowerQuery)) {
          suggestions.add(tag);
        }
      });
    }
  });
  
  return Array.from(suggestions).slice(0, 5);
}

// Highlight search terms in text
export function highlightSearchTerms(text: string, query: string): string {
  const words = query.split(' ').filter(w => w.length > 2);
  let highlighted = text;
  
  words.forEach(word => {
    const regex = new RegExp(`(${word})`, 'gi');
    highlighted = highlighted.replace(regex, '<mark>$1</mark>');
  });
  
  return highlighted;
}

// Extract excerpt with search term
export function extractExcerpt(content: string, query: string, maxLength: number = 200): string {
  const lowerContent = content.toLowerCase();
  const lowerQuery = query.toLowerCase();
  const index = lowerContent.indexOf(lowerQuery);
  
  if (index === -1) {
    return content.substring(0, maxLength) + '...';
  }
  
  const start = Math.max(0, index - 50);
  const end = Math.min(content.length, index + maxLength - 50);
  
  let excerpt = content.substring(start, end);
  if (start > 0) excerpt = '...' + excerpt;
  if (end < content.length) excerpt = excerpt + '...';
  
  return excerpt;
}
