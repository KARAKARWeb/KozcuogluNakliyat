import { 
  Home, 
  Building2, 
  Truck, 
  Package, 
  Warehouse, 
  MapPin, 
  Sofa,
  LucideIcon 
} from "lucide-react";

// Hizmet slug'larına göre ikon mapping
export const SERVICE_ICONS: Record<string, LucideIcon> = {
  "evden-eve-nakliyat": Home,
  "ev-tasima": Home,
  "ofis-tasima": Building2,
  "sehirler-arasi-nakliyat": Truck,
  "parca-esya-tasima": Package,
  "esya-depolama": Warehouse,
  "asansorlu-nakliyat": Building2,
  "villa-tasimaciligi": Home,
  "mobilya-tasima": Sofa,
  "default": Truck,
};

export function getServiceIcon(slug: string): LucideIcon {
  return SERVICE_ICONS[slug] || SERVICE_ICONS.default;
}
