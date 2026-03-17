// React Query Hooks - API Data Fetching

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { apiClient, queryKeys, invalidateQueries } from './api-client';
import type { BlogPost, Service, User } from '@/types';

// Blog Hooks
export function useBlogPosts() {
  return useQuery({
    queryKey: queryKeys.blog.lists(),
    queryFn: () => apiClient.get<{ success: boolean; data: BlogPost[] }>('/api/blog'),
  });
}

export function useBlogPost(slug: string) {
  return useQuery({
    queryKey: queryKeys.blog.detail(slug),
    queryFn: () => apiClient.get<{ success: boolean; data: BlogPost }>(`/api/blog/${slug}`),
    enabled: !!slug,
  });
}

export function useCreateBlogPost() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (data: Partial<BlogPost>) => 
      apiClient.post<{ success: boolean; data: BlogPost }>('/api/blog', data),
    onSuccess: () => {
      invalidateQueries.blog();
    },
  });
}

export function useUpdateBlogPost() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ slug, data }: { slug: string; data: Partial<BlogPost> }) =>
      apiClient.put<{ success: boolean; data: BlogPost }>(`/api/blog/${slug}`, data),
    onSuccess: (_, variables) => {
      invalidateQueries.blog();
      invalidateQueries.blogDetail(variables.slug);
    },
  });
}

export function useDeleteBlogPost() {
  return useMutation({
    mutationFn: (slug: string) =>
      apiClient.delete<{ success: boolean }>(`/api/blog/${slug}`),
    onSuccess: () => {
      invalidateQueries.blog();
    },
  });
}

// Service Hooks
export function useServices() {
  return useQuery({
    queryKey: queryKeys.services.lists(),
    queryFn: () => apiClient.get<{ success: boolean; data: Service[] }>('/api/services'),
  });
}

export function useService(slug: string) {
  return useQuery({
    queryKey: queryKeys.services.detail(slug),
    queryFn: () => apiClient.get<{ success: boolean; data: Service }>(`/api/services/${slug}`),
    enabled: !!slug,
  });
}

export function useCreateService() {
  return useMutation({
    mutationFn: (data: Partial<Service>) =>
      apiClient.post<{ success: boolean; data: Service }>('/api/services', data),
    onSuccess: () => {
      invalidateQueries.services();
    },
  });
}

export function useUpdateService() {
  return useMutation({
    mutationFn: ({ slug, data }: { slug: string; data: Partial<Service> }) =>
      apiClient.put<{ success: boolean; data: Service }>(`/api/services/${slug}`, data),
    onSuccess: (_, variables) => {
      invalidateQueries.services();
      invalidateQueries.serviceDetail(variables.slug);
    },
  });
}

// User Hooks
export function useUsers() {
  return useQuery({
    queryKey: queryKeys.users.lists(),
    queryFn: () => apiClient.get<{ success: boolean; data: User[] }>('/api/users'),
  });
}

export function useCreateUser() {
  return useMutation({
    mutationFn: (data: Partial<User>) =>
      apiClient.post<{ success: boolean; data: User }>('/api/users', data),
    onSuccess: () => {
      invalidateQueries.users();
    },
  });
}

// Notification Hooks
export function useNotifications() {
  return useQuery({
    queryKey: queryKeys.notifications.all,
    queryFn: () => apiClient.get<{ success: boolean; data: any[] }>('/api/notifications'),
    refetchInterval: 30000, // Refetch every 30 seconds
  });
}

export function useMarkNotificationRead() {
  return useMutation({
    mutationFn: (id: string) =>
      apiClient.post<{ success: boolean }>(`/api/notifications/${id}/read`),
    onSuccess: () => {
      invalidateQueries.notifications();
    },
  });
}

// Optimistic Update Example
export function useOptimisticBlogUpdate() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ slug, data }: { slug: string; data: Partial<BlogPost> }) =>
      apiClient.put<{ success: boolean; data: BlogPost }>(`/api/blog/${slug}`, data),
    
    // Optimistic update
    onMutate: async ({ slug, data }) => {
      // Cancel outgoing refetches
      await queryClient.cancelQueries({ queryKey: queryKeys.blog.detail(slug) });
      
      // Snapshot previous value
      const previousBlog = queryClient.getQueryData(queryKeys.blog.detail(slug));
      
      // Optimistically update
      queryClient.setQueryData(queryKeys.blog.detail(slug), (old: any) => ({
        ...old,
        data: { ...old?.data, ...data },
      }));
      
      return { previousBlog };
    },
    
    // Rollback on error
    onError: (err, variables, context) => {
      if (context?.previousBlog) {
        queryClient.setQueryData(
          queryKeys.blog.detail(variables.slug),
          context.previousBlog
        );
      }
    },
    
    // Refetch on success or error
    onSettled: (_, __, variables) => {
      invalidateQueries.blogDetail(variables.slug);
    },
  });
}
