export interface PricingField {
  id: string;
  label: string;
  type: "select" | "number" | "boolean" | "date" | "text";
  options?: string[];
  min?: number;
  max?: number;
  priceImpact: "base" | "multiplier" | "addition" | "discount";
}

export interface PricingModule {
  id: string;
  name: string;
  slug: string;
  description: string;
  fields: PricingField[];
  basePrice: number;
  assignedPages: string[];
  isActive: boolean;
  order: number;
  createdAt: string;
  updatedAt: string;
}
