export interface SeoMeta {
  title: string;
  description: string;
  ogImage: string;
  robots: string;
  canonical: string;
}

export interface FaqItem {
  question: string;
  answer: string;
}

export type ServiceCategory = "bireysel" | "kurumsal" | "diger";

export interface Service {
  id: string;
  title: string;
  slug: string;
  category: ServiceCategory;
  description: string;
  shortDescription: string;
  image: string;
  icon: string;
  content: string;
  seo: SeoMeta;
  schemas: string[];
  faq: FaqItem[];
  pricingModuleId: string | null;
  order: number;
  isActive: boolean;
  showOnHomepage: boolean;
  createdAt: string;
  updatedAt: string;
}
