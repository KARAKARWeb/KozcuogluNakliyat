export interface NapAddress {
  street: string;
  postalCode: string;
  district: string;
  city: string;
  country: string;
  full: string;
}

export interface NapGeo {
  latitude: number;
  longitude: number;
}

export interface Nap {
  name: string;
  phone: string;
  phoneCustomerService: string;
  gsm: string;
  email: string;
  address: NapAddress;
  geo: NapGeo;
  whatsapp: string;
  workingHours: string;
  mapEmbedUrl: string;
}

export interface SmtpConfig {
  host: string;
  port: number;
  user: string;
  pass: string;
  from: string;
  to: string;
}

export interface Integrations {
  ga4Id: string;
  gtmId: string;
  clarityId: string;

  indexNowKey: string;
  smtp: SmtpConfig;
}

export interface BlogCategory {
  id: string;
  name: string;
  slug: string;
}

export interface CustomCode {
  head: string;
  bodyStart: string;
  footer: string;
}

export interface Developer {
  name: string;
  url: string;
  phone: string;
  email: string;
  logoDark: string;
  logoLight: string;
}

export interface SiteSettings {
  name: string;
  url: string;
  description: string;
  language: string;
  logo: string;
  logoDark: string;
  favicon: string;
  ogImage: string;
}

export interface ServiceCategoryItem {
  id: string;
  name: string;
  slug: string;
  description: string;
  icon: string;
}

export interface Settings {
  site: SiteSettings;
  nap: Nap;
  sameAs: string[];
  integrations: Integrations;
  blogCategories: BlogCategory[];
  serviceCategories: ServiceCategoryItem[];
  customCode: CustomCode;
  developer: Developer;
}
