import type { SeoMeta } from "./service";

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  image: string;
  category: string;
  tags: string[];
  author: string;
  seo: SeoMeta;
  schemas: string[];
  isPublished: boolean;
  publishedAt: string;
  createdAt: string;
  updatedAt: string;
}
