import type { SeoMeta, FaqItem } from "./service";

export interface Solution {
  id: string;
  title: string;
  slug: string;
  description: string;
  shortDescription: string;
  image: string;
  icon: string;
  content: string;
  seo: SeoMeta;
  schemas: string[];
  faq: FaqItem[];
  order: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}
