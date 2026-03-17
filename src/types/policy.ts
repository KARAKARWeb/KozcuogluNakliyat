import type { SeoMeta } from "./service";

export interface Policy {
  id: string;
  title: string;
  slug: string;
  content: string;
  seo: SeoMeta;
  updatedAt: string;
}
