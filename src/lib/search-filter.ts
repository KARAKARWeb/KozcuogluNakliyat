// Advanced Search & Filter System

export interface SearchFilters {
  query?: string;
  category?: string;
  tags?: string[];
  dateFrom?: string;
  dateTo?: string;
  status?: string;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

export interface SearchResult<T> {
  items: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

// Advanced search with multiple filters
export function advancedSearch<T extends Record<string, any>>(
  items: T[],
  filters: SearchFilters,
  searchFields: string[] = ['title', 'content', 'description']
): T[] {
  let filtered = [...items];

  // Text search
  if (filters.query) {
    const query = filters.query.toLowerCase();
    filtered = filtered.filter(item =>
      searchFields.some(field => {
        const value = item[field];
        return value && String(value).toLowerCase().includes(query);
      })
    );
  }

  // Category filter
  if (filters.category) {
    filtered = filtered.filter(item => item.category === filters.category);
  }

  // Tags filter
  if (filters.tags && filters.tags.length > 0) {
    filtered = filtered.filter(item =>
      item.tags && filters.tags!.some(tag => item.tags.includes(tag))
    );
  }

  // Date range filter
  if (filters.dateFrom) {
    const fromDate = new Date(filters.dateFrom);
    filtered = filtered.filter(item => {
      const itemDate = new Date(item.createdAt || item.date);
      return itemDate >= fromDate;
    });
  }

  if (filters.dateTo) {
    const toDate = new Date(filters.dateTo);
    filtered = filtered.filter(item => {
      const itemDate = new Date(item.createdAt || item.date);
      return itemDate <= toDate;
    });
  }

  // Status filter
  if (filters.status) {
    filtered = filtered.filter(item => item.status === filters.status);
  }

  // Sorting
  if (filters.sortBy) {
    filtered.sort((a, b) => {
      const aVal = a[filters.sortBy!];
      const bVal = b[filters.sortBy!];
      
      if (aVal < bVal) return filters.sortOrder === 'asc' ? -1 : 1;
      if (aVal > bVal) return filters.sortOrder === 'asc' ? 1 : -1;
      return 0;
    });
  }

  return filtered;
}

// Paginate results
export function paginate<T>(
  items: T[],
  page: number = 1,
  pageSize: number = 10
): SearchResult<T> {
  const total = items.length;
  const totalPages = Math.ceil(total / pageSize);
  const start = (page - 1) * pageSize;
  const end = start + pageSize;
  
  return {
    items: items.slice(start, end),
    total,
    page,
    pageSize,
    totalPages,
  };
}

// Faceted search
export function getFacets<T extends Record<string, any>>(
  items: T[],
  facetFields: string[]
): Record<string, Array<{ value: string; count: number }>> {
  const facets: Record<string, Map<string, number>> = {};

  facetFields.forEach(field => {
    facets[field] = new Map();
  });

  items.forEach(item => {
    facetFields.forEach(field => {
      const value = item[field];
      if (value) {
        const values = Array.isArray(value) ? value : [value];
        values.forEach(v => {
          const current = facets[field].get(v) || 0;
          facets[field].set(v, current + 1);
        });
      }
    });
  });

  const result: Record<string, Array<{ value: string; count: number }>> = {};
  Object.entries(facets).forEach(([field, map]) => {
    result[field] = Array.from(map.entries())
      .map(([value, count]) => ({ value, count }))
      .sort((a, b) => b.count - a.count);
  });

  return result;
}

// Fuzzy search
export function fuzzySearch(query: string, text: string): number {
  const queryLower = query.toLowerCase();
  const textLower = text.toLowerCase();
  
  if (textLower.includes(queryLower)) return 1;
  
  let score = 0;
  let queryIndex = 0;
  
  for (let i = 0; i < textLower.length && queryIndex < queryLower.length; i++) {
    if (textLower[i] === queryLower[queryIndex]) {
      score++;
      queryIndex++;
    }
  }
  
  return score / query.length;
}

// Auto-complete suggestions
export function getAutocompleteSuggestions<T extends Record<string, any>>(
  items: T[],
  query: string,
  field: string = 'title',
  limit: number = 5
): string[] {
  const queryLower = query.toLowerCase();
  const suggestions = new Set<string>();

  items.forEach(item => {
    const value = item[field];
    if (value && String(value).toLowerCase().includes(queryLower)) {
      suggestions.add(String(value));
    }
  });

  return Array.from(suggestions).slice(0, limit);
}
