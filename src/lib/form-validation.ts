// Form Validation - Zod Schemas & Utilities

import { z } from "zod";

// Common validation messages (Turkish)
export const VALIDATION_MESSAGES = {
  required: "Bu alan zorunludur",
  email: "Geçerli bir e-posta adresi girin",
  phone: "Geçerli bir telefon numarası girin",
  url: "Geçerli bir URL girin",
  minLength: (min: number) => `En az ${min} karakter olmalı`,
  maxLength: (max: number) => `En fazla ${max} karakter olmalı`,
  min: (min: number) => `En az ${min} olmalı`,
  max: (max: number) => `En fazla ${max} olmalı`,
  slug: "Sadece küçük harf, rakam ve tire (-) kullanın",
  password: "Şifre en az 8 karakter, bir büyük harf, bir küçük harf ve bir rakam içermeli",
  passwordMatch: "Şifreler eşleşmiyor",
  fileSize: (maxMB: number) => `Dosya boyutu en fazla ${maxMB}MB olmalı`,
  fileType: (types: string) => `Sadece ${types} dosyaları yüklenebilir`,
} as const;

// Common field schemas
export const commonSchemas = {
  email: z.string().email(VALIDATION_MESSAGES.email),
  phone: z.string().regex(/^(\+90|0)?5\d{9}$/, VALIDATION_MESSAGES.phone),
  url: z.string().url(VALIDATION_MESSAGES.url),
  slug: z.string().regex(/^[a-z0-9-]+$/, VALIDATION_MESSAGES.slug),
  password: z
    .string()
    .min(8, VALIDATION_MESSAGES.minLength(8))
    .regex(/[A-Z]/, "En az bir büyük harf içermeli")
    .regex(/[a-z]/, "En az bir küçük harf içermeli")
    .regex(/[0-9]/, "En az bir rakam içermeli"),
  name: z.string().min(2, VALIDATION_MESSAGES.minLength(2)).max(100, VALIDATION_MESSAGES.maxLength(100)),
  title: z.string().min(1, VALIDATION_MESSAGES.required).max(200, VALIDATION_MESSAGES.maxLength(200)),
  content: z.string().min(1, VALIDATION_MESSAGES.required),
  excerpt: z.string().max(500, VALIDATION_MESSAGES.maxLength(500)).optional(),
};

// Blog validation schema
export const blogSchema = z.object({
  title: commonSchemas.title,
  slug: commonSchemas.slug,
  excerpt: z.string().min(1, VALIDATION_MESSAGES.required).max(500, VALIDATION_MESSAGES.maxLength(500)),
  content: commonSchemas.content,
  image: z.string().optional(),
  category: z.string().min(1, VALIDATION_MESSAGES.required),
  tags: z.array(z.string()).optional(),
  author: z.string().min(1, VALIDATION_MESSAGES.required),
  isPublished: z.boolean().optional(),
  seoTitle: z.string().max(60, VALIDATION_MESSAGES.maxLength(60)).optional(),
  seoDescription: z.string().max(160, VALIDATION_MESSAGES.maxLength(160)).optional(),
});

export type BlogFormData = z.infer<typeof blogSchema>;

// Service validation schema
export const serviceSchema = z.object({
  title: commonSchemas.title,
  slug: commonSchemas.slug,
  description: z.string().min(1, VALIDATION_MESSAGES.required).max(200, VALIDATION_MESSAGES.maxLength(200)),
  content: commonSchemas.content,
  image: z.string().optional(),
  icon: z.string().optional(),
  category: z.string().min(1, VALIDATION_MESSAGES.required),
  order: z.number().min(0, VALIDATION_MESSAGES.min(0)).optional(),
  isActive: z.boolean().optional(),
  seoTitle: z.string().max(60, VALIDATION_MESSAGES.maxLength(60)).optional(),
  seoDescription: z.string().max(160, VALIDATION_MESSAGES.maxLength(160)).optional(),
});

export type ServiceFormData = z.infer<typeof serviceSchema>;

// Contact form validation schema
export const contactSchema = z.object({
  name: commonSchemas.name,
  email: commonSchemas.email,
  phone: commonSchemas.phone.optional(),
  subject: z.string().optional(),
  message: z.string().min(10, VALIDATION_MESSAGES.minLength(10)).max(1000, VALIDATION_MESSAGES.maxLength(1000)),
});

export type ContactFormData = z.infer<typeof contactSchema>;

// Quote request validation schema
export const quoteSchema = z.object({
  name: commonSchemas.name,
  email: commonSchemas.email,
  phone: commonSchemas.phone,
  fromAddress: z.string().min(1, VALIDATION_MESSAGES.required),
  toAddress: z.string().min(1, VALIDATION_MESSAGES.required),
  moveDate: z.string().min(1, VALIDATION_MESSAGES.required),
  homeSize: z.string().min(1, VALIDATION_MESSAGES.required),
  hasElevator: z.boolean().optional(),
  hasPackaging: z.boolean().optional(),
  hasInsurance: z.boolean().optional(),
  notes: z.string().max(500, VALIDATION_MESSAGES.maxLength(500)).optional(),
});

export type QuoteFormData = z.infer<typeof quoteSchema>;

// User registration validation schema
export const registerSchema = z.object({
  name: commonSchemas.name,
  email: commonSchemas.email,
  password: commonSchemas.password,
  confirmPassword: z.string(),
  role: z.enum(["ADMIN", "EDITOR", "VIEWER"]).optional(),
}).refine((data) => data.password === data.confirmPassword, {
  message: VALIDATION_MESSAGES.passwordMatch,
  path: ["confirmPassword"],
});

export type RegisterFormData = z.infer<typeof registerSchema>;

// Login validation schema
export const loginSchema = z.object({
  email: commonSchemas.email,
  password: z.string().min(1, VALIDATION_MESSAGES.required),
});

export type LoginFormData = z.infer<typeof loginSchema>;

// Page validation schema
export const pageSchema = z.object({
  slug: commonSchemas.slug,
  title: commonSchemas.title,
  content: z.string().optional(),
  sections: z.record(z.string(), z.any()).optional(),
  seoTitle: z.string().max(60, VALIDATION_MESSAGES.maxLength(60)).optional(),
  seoDescription: z.string().max(160, VALIDATION_MESSAGES.maxLength(160)).optional(),
  isActive: z.boolean().optional(),
});

export type PageFormData = z.infer<typeof pageSchema>;

// Newsletter subscription schema
export const newsletterSchema = z.object({
  email: commonSchemas.email,
  source: z.string().optional(),
});

export type NewsletterFormData = z.infer<typeof newsletterSchema>;

// Validation helper functions
export function getFieldError(
  errors: Record<string, any>,
  fieldName: string
): string | undefined {
  const error = errors[fieldName];
  if (!error) return undefined;
  
  if (typeof error === "string") return error;
  if (error.message) return error.message;
  if (error._errors && error._errors.length > 0) return error._errors[0];
  
  return undefined;
}

export function hasFieldError(
  errors: Record<string, any>,
  fieldName: string
): boolean {
  return !!getFieldError(errors, fieldName);
}

export function validateField<T>(
  schema: z.ZodSchema<T>,
  data: any
): { success: boolean; errors?: Record<string, string> } {
  const result = schema.safeParse(data);
  
  if (result.success) {
    return { success: true };
  }
  
  const errors: Record<string, string> = {};
  result.error.issues.forEach((err: z.ZodIssue) => {
    const path = err.path.join(".");
    errors[path] = err.message;
  });
  
  return { success: false, errors };
}

// Real-time field validation
export function createFieldValidator<T>(schema: z.ZodSchema<T>) {
  return (fieldName: string, value: any) => {
    try {
      const fieldSchema = (schema as any).shape[fieldName];
      if (!fieldSchema) return null;
      
      const result = fieldSchema.safeParse(value);
      if (result.success) return null;
      
      return result.error.issues[0]?.message || "Geçersiz değer";
    } catch (error) {
      return "Geçersiz değer";
    }
  };
}

// Form state helper
export interface FormState<T> {
  data: Partial<T>;
  errors: Record<string, string>;
  touched: Record<string, boolean>;
  isSubmitting: boolean;
  isValid: boolean;
}

export function createInitialFormState<T>(initialData?: Partial<T>): FormState<T> {
  return {
    data: initialData || {},
    errors: {},
    touched: {},
    isSubmitting: false,
    isValid: false,
  };
}

// Required field indicator
export function isFieldRequired(schema: z.ZodSchema<any>, fieldName: string): boolean {
  try {
    const fieldSchema = (schema as any).shape?.[fieldName];
    if (!fieldSchema) return false;
    
    // Check if field is optional
    return !fieldSchema.isOptional();
  } catch {
    return false;
  }
}
