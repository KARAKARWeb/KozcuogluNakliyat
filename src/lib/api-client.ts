// API Client - Centralized API calls with React Query

import { QueryClient } from '@tanstack/react-query';

// API Client Configuration
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || '';

// Query Client
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      gcTime: 1000 * 60 * 30, // 30 minutes (formerly cacheTime)
      retry: 3,
      refetchOnWindowFocus: false,
    },
    mutations: {
      retry: 1,
    },
  },
});

// API Client Class
class APIClient {
  private baseURL: string;

  constructor(baseURL: string = API_BASE_URL) {
    this.baseURL = baseURL;
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${this.baseURL}${endpoint}`;
    
    const config: RequestInit = {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
    };

    try {
      const response = await fetch(url, config);

      if (!response.ok) {
        const error = await response.json().catch(() => ({
          message: response.statusText,
        }));
        throw new Error(error.message || 'API request failed');
      }

      return response.json();
    } catch (error) {
      console.error('API Error:', error);
      throw error;
    }
  }

  // GET
  async get<T>(endpoint: string, options?: RequestInit): Promise<T> {
    return this.request<T>(endpoint, { ...options, method: 'GET' });
  }

  // POST
  async post<T>(endpoint: string, data?: any, options?: RequestInit): Promise<T> {
    return this.request<T>(endpoint, {
      ...options,
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  // PUT
  async put<T>(endpoint: string, data?: any, options?: RequestInit): Promise<T> {
    return this.request<T>(endpoint, {
      ...options,
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  // DELETE
  async delete<T>(endpoint: string, options?: RequestInit): Promise<T> {
    return this.request<T>(endpoint, { ...options, method: 'DELETE' });
  }

  // PATCH
  async patch<T>(endpoint: string, data?: any, options?: RequestInit): Promise<T> {
    return this.request<T>(endpoint, {
      ...options,
      method: 'PATCH',
      body: JSON.stringify(data),
    });
  }
}

export const apiClient = new APIClient();

// Query Keys
export const queryKeys = {
  blog: {
    all: ['blog'] as const,
    lists: () => [...queryKeys.blog.all, 'list'] as const,
    list: (filters: string) => [...queryKeys.blog.lists(), { filters }] as const,
    details: () => [...queryKeys.blog.all, 'detail'] as const,
    detail: (slug: string) => [...queryKeys.blog.details(), slug] as const,
  },
  services: {
    all: ['services'] as const,
    lists: () => [...queryKeys.services.all, 'list'] as const,
    list: (filters: string) => [...queryKeys.services.lists(), { filters }] as const,
    details: () => [...queryKeys.services.all, 'detail'] as const,
    detail: (slug: string) => [...queryKeys.services.details(), slug] as const,
  },
  users: {
    all: ['users'] as const,
    lists: () => [...queryKeys.users.all, 'list'] as const,
    list: (filters: string) => [...queryKeys.users.lists(), { filters }] as const,
    details: () => [...queryKeys.users.all, 'detail'] as const,
    detail: (id: string) => [...queryKeys.users.details(), id] as const,
  },
  notifications: {
    all: ['notifications'] as const,
    unread: () => [...queryKeys.notifications.all, 'unread'] as const,
  },
} as const;

// Cache Invalidation Helpers
export const invalidateQueries = {
  blog: () => queryClient.invalidateQueries({ queryKey: queryKeys.blog.all }),
  blogDetail: (slug: string) => queryClient.invalidateQueries({ queryKey: queryKeys.blog.detail(slug) }),
  services: () => queryClient.invalidateQueries({ queryKey: queryKeys.services.all }),
  serviceDetail: (slug: string) => queryClient.invalidateQueries({ queryKey: queryKeys.services.detail(slug) }),
  users: () => queryClient.invalidateQueries({ queryKey: queryKeys.users.all }),
  notifications: () => queryClient.invalidateQueries({ queryKey: queryKeys.notifications.all }),
};
