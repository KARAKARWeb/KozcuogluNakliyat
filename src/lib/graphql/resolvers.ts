// GraphQL Resolvers

import { readData, writeData } from "@/lib/db";
import type { Service, Region, BlogPost, Review, Message } from "@/types";

export const resolvers = {
  Query: {
    services: async (_: any, { limit = 10, offset = 0 }: { limit?: number; offset?: number }) => {
      const services = await readData<Service[]>("services.json");
      return services.slice(offset, offset + limit);
    },
    
    service: async (_: any, { id, slug }: { id?: string; slug?: string }) => {
      const services = await readData<Service[]>("services.json");
      if (id) return services.find(s => s.id === id);
      if (slug) return services.find(s => s.slug === slug);
      return null;
    },
    
    regions: async (_: any, { limit = 10, offset = 0 }: { limit?: number; offset?: number }) => {
      const regions = await readData<Region[]>("regions.json");
      return regions.slice(offset, offset + limit);
    },
    
    region: async (_: any, { id, slug }: { id?: string; slug?: string }) => {
      const regions = await readData<Region[]>("regions.json");
      if (id) return regions.find(r => r.id === id);
      if (slug) return regions.find(r => r.slug === slug);
      return null;
    },
    
    blogPosts: async (_: any, { limit = 10, offset = 0 }: { limit?: number; offset?: number }) => {
      const posts = await readData<BlogPost[]>("blog-posts.json");
      return posts.slice(offset, offset + limit);
    },
    
    blogPost: async (_: any, { id, slug }: { id?: string; slug?: string }) => {
      const posts = await readData<BlogPost[]>("blog-posts.json");
      if (id) return posts.find(p => p.id === id);
      if (slug) return posts.find(p => p.slug === slug);
      return null;
    },
    
    reviews: async (_: any, { limit = 10, offset = 0 }: { limit?: number; offset?: number }) => {
      const reviews = await readData<Review[]>("reviews.json");
      return reviews.slice(offset, offset + limit);
    },
    
    messages: async (_: any, { limit = 10, offset = 0 }: { limit?: number; offset?: number }) => {
      const messages = await readData<Message[]>("messages.json");
      return messages.slice(offset, offset + limit);
    },
  },
  
  Mutation: {
    createService: async (_: any, { input }: { input: Partial<Service> }) => {
      const services = await readData<Service[]>("services.json");
      const newService: Service = {
        id: Date.now().toString(),
        ...input,
        isActive: input.isActive ?? true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      } as Service;
      
      services.push(newService);
      await writeData("services.json", services);
      return newService;
    },
    
    updateService: async (_: any, { id, input }: { id: string; input: Partial<Service> }) => {
      const services = await readData<Service[]>("services.json");
      const index = services.findIndex(s => s.id === id);
      if (index === -1) throw new Error("Service not found");
      
      services[index] = {
        ...services[index],
        ...input,
        updatedAt: new Date().toISOString(),
      };
      
      await writeData("services.json", services);
      return services[index];
    },
    
    deleteService: async (_: any, { id }: { id: string }) => {
      const services = await readData<Service[]>("services.json");
      const filtered = services.filter(s => s.id !== id);
      await writeData("services.json", filtered);
      return true;
    },
    
    createBlogPost: async (_: any, { input }: { input: Partial<BlogPost> }) => {
      const posts = await readData<BlogPost[]>("blog-posts.json");
      const newPost: BlogPost = {
        id: Date.now().toString(),
        ...input,
        author: input.author || "Admin",
        isPublished: input.isPublished ?? false,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      } as BlogPost;
      
      posts.push(newPost);
      await writeData("blog-posts.json", posts);
      return newPost;
    },
    
    updateBlogPost: async (_: any, { id, input }: { id: string; input: Partial<BlogPost> }) => {
      const posts = await readData<BlogPost[]>("blog-posts.json");
      const index = posts.findIndex(p => p.id === id);
      if (index === -1) throw new Error("Blog post not found");
      
      posts[index] = {
        ...posts[index],
        ...input,
        updatedAt: new Date().toISOString(),
      };
      
      await writeData("blog-posts.json", posts);
      return posts[index];
    },
    
    deleteBlogPost: async (_: any, { id }: { id: string }) => {
      const posts = await readData<BlogPost[]>("blog-posts.json");
      const filtered = posts.filter(p => p.id !== id);
      await writeData("blog-posts.json", filtered);
      return true;
    },
    
    createReview: async (_: any, { input }: { input: Partial<Review> }) => {
      const reviews = await readData<Review[]>("reviews.json");
      const newReview: Review = {
        id: Date.now().toString(),
        ...input,
        status: "pending",
        createdAt: new Date().toISOString(),
      } as Review;
      
      reviews.push(newReview);
      await writeData("reviews.json", reviews);
      return newReview;
    },
    
    updateReview: async (_: any, { id, input }: { id: string; input: Partial<Review> }) => {
      const reviews = await readData<Review[]>("reviews.json");
      const index = reviews.findIndex(r => r.id === id);
      if (index === -1) throw new Error("Review not found");
      
      reviews[index] = { ...reviews[index], ...input };
      await writeData("reviews.json", reviews);
      return reviews[index];
    },
    
    deleteReview: async (_: any, { id }: { id: string }) => {
      const reviews = await readData<Review[]>("reviews.json");
      const filtered = reviews.filter(r => r.id !== id);
      await writeData("reviews.json", filtered);
      return true;
    },
    
    createMessage: async (_: any, { input }: { input: Partial<Message> }) => {
      const messages = await readData<Message[]>("messages.json");
      const newMessage: Message = {
        id: Date.now().toString(),
        ...input,
        status: "unread",
        createdAt: new Date().toISOString(),
      } as Message;
      
      messages.push(newMessage);
      await writeData("messages.json", messages);
      return newMessage;
    },
  },
};
