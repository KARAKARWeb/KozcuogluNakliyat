import type { SeoMeta } from "./service";

export interface PageSection {
  title?: string;
  content?: string;
  buttonText?: string;
  buttonLink?: string;
  button1Text?: string;
  button1Link?: string;
  button2Text?: string;
  button2Link?: string;
  button3Text?: string;
  button4Text?: string;
  button4Link?: string;
  items?: Record<string, string>[];
  steps?: { title: string; desc: string }[];
  [key: string]: unknown;
}

export interface Page {
  id: string;
  slug: string;
  title: string;
  sections: Record<string, PageSection>;
  seo: SeoMeta;
  schemas: string[];
}
