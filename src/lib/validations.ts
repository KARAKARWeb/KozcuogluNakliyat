import { z } from "zod";

export const contactFormSchema = z.object({
  name: z.string().min(2, "Ad Soyad en az 2 karakter olmalı").max(100),
  phone: z.string().min(10, "Geçerli bir telefon numarası girin").max(20),
  email: z.string().email("Geçerli bir e-posta adresi girin").optional().or(z.literal("")),
  service: z.string().max(100).optional(),
  message: z.string().min(10, "Mesaj en az 10 karakter olmalı").max(2000),
});

export const reviewFormSchema = z.object({
  name: z.string().min(2, "Ad en az 2 karakter olmalı").max(100),
  rating: z.number().min(1, "Lütfen bir puan seçin").max(5),
  comment: z.string().min(10, "Yorum en az 10 karakter olmalı").max(1000),
  serviceSlug: z.string().optional(),
});

export const surveyFormSchema = z.object({
  name: z.string().min(2, "Ad Soyad en az 2 karakter olmalı").max(100),
  phone: z.string().min(10, "Geçerli bir telefon numarası girin").max(20),
  email: z.string().email("Geçerli bir e-posta adresi girin").optional().or(z.literal("")),
  fromAddress: z.string().min(5, "Çıkış adresi gerekli").max(300),
  fromFloor: z.string().max(10).optional(),
  fromElevator: z.string().max(10).optional(),
  toAddress: z.string().min(5, "Varış adresi gerekli").max(300),
  toFloor: z.string().max(10).optional(),
  toElevator: z.string().max(10).optional(),
  homeType: z.string().max(20).optional(),
  moveDate: z.string().max(20).optional(),
  notes: z.string().max(1000).optional(),
});

export type ContactFormData = z.infer<typeof contactFormSchema>;
export type ReviewFormData = z.infer<typeof reviewFormSchema>;
export type SurveyFormData = z.infer<typeof surveyFormSchema>;
