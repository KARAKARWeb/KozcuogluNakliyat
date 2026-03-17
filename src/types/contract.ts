import type { SeoMeta } from "./service";

export interface Contract {
  id: string;
  title: string;
  slug: string;
  content: string;
  seo: SeoMeta;
  isActive: boolean;
  order: number;
  createdAt: string;
  updatedAt: string;
}
