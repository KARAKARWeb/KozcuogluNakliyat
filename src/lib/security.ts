// Security Utilities - Input Sanitization, XSS Protection, CSRF

import { z } from "zod";

// XSS Protection - HTML Sanitization
export function sanitizeHtml(html: string): string {
  // Remove script tags
  let sanitized = html.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, "");
  
  // Remove event handlers
  sanitized = sanitized.replace(/on\w+\s*=\s*["'][^"']*["']/gi, "");
  sanitized = sanitized.replace(/on\w+\s*=\s*[^\s>]*/gi, "");
  
  // Remove javascript: protocol
  sanitized = sanitized.replace(/javascript:/gi, "");
  
  // Remove data: protocol (can be used for XSS)
  sanitized = sanitized.replace(/data:text\/html/gi, "");
  
  return sanitized;
}

// Escape HTML entities
export function escapeHtml(text: string): string {
  const map: Record<string, string> = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#x27;",
    "/": "&#x2F;",
  };
  
  return text.replace(/[&<>"'/]/g, (char) => map[char]);
}

// Unescape HTML entities
export function unescapeHtml(text: string): string {
  const map: Record<string, string> = {
    "&amp;": "&",
    "&lt;": "<",
    "&gt;": ">",
    "&quot;": '"',
    "&#x27;": "'",
    "&#x2F;": "/",
  };
  
  return text.replace(/&amp;|&lt;|&gt;|&quot;|&#x27;|&#x2F;/g, (entity) => map[entity]);
}

// Strip HTML tags
export function stripHtml(html: string): string {
  return html.replace(/<[^>]*>/g, "");
}

// Sanitize user input (for display)
export function sanitizeInput(input: string): string {
  return escapeHtml(input.trim());
}

// SQL Injection Prevention (N/A for JSON but good practice)
export function escapeSql(value: string): string {
  return value.replace(/'/g, "''").replace(/\\/g, "\\\\");
}

// File Upload Validation
export const ALLOWED_IMAGE_TYPES = ["image/jpeg", "image/png", "image/webp", "image/gif"];
export const ALLOWED_DOCUMENT_TYPES = ["application/pdf", "application/msword", "application/vnd.openxmlformats-officedocument.wordprocessingml.document"];
export const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB

export interface FileValidationResult {
  valid: boolean;
  error?: string;
}

export function validateImageFile(file: File): FileValidationResult {
  if (!ALLOWED_IMAGE_TYPES.includes(file.type)) {
    return {
      valid: false,
      error: "Geçersiz dosya tipi. Sadece JPEG, PNG, WebP ve GIF dosyaları yüklenebilir.",
    };
  }
  
  if (file.size > MAX_FILE_SIZE) {
    return {
      valid: false,
      error: `Dosya boyutu çok büyük. Maksimum ${MAX_FILE_SIZE / 1024 / 1024}MB olmalı.`,
    };
  }
  
  return { valid: true };
}

export function validateDocumentFile(file: File): FileValidationResult {
  if (!ALLOWED_DOCUMENT_TYPES.includes(file.type)) {
    return {
      valid: false,
      error: "Geçersiz dosya tipi. Sadece PDF ve Word dosyaları yüklenebilir.",
    };
  }
  
  if (file.size > MAX_FILE_SIZE) {
    return {
      valid: false,
      error: `Dosya boyutu çok büyük. Maksimum ${MAX_FILE_SIZE / 1024 / 1024}MB olmalı.`,
    };
  }
  
  return { valid: true };
}

// Validate file extension
export function getFileExtension(filename: string): string {
  return filename.slice(((filename.lastIndexOf(".") - 1) >>> 0) + 2).toLowerCase();
}

export function isAllowedExtension(filename: string, allowedExtensions: string[]): boolean {
  const ext = getFileExtension(filename);
  return allowedExtensions.includes(ext);
}

// CSRF Token Generation
export function generateCsrfToken(): string {
  return Array.from(crypto.getRandomValues(new Uint8Array(32)))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

// CSRF Token Validation
const csrfTokens = new Map<string, { token: string; expiresAt: number }>();

export function storeCsrfToken(sessionId: string, token: string, expiresInMs: number = 3600000): void {
  csrfTokens.set(sessionId, {
    token,
    expiresAt: Date.now() + expiresInMs,
  });
}

export function validateCsrfToken(sessionId: string, token: string): boolean {
  const stored = csrfTokens.get(sessionId);
  
  if (!stored) return false;
  if (Date.now() > stored.expiresAt) {
    csrfTokens.delete(sessionId);
    return false;
  }
  
  return stored.token === token;
}

export function cleanupExpiredCsrfTokens(): void {
  const now = Date.now();
  for (const [sessionId, data] of csrfTokens.entries()) {
    if (now > data.expiresAt) {
      csrfTokens.delete(sessionId);
    }
  }
}

// URL Validation
export function isValidUrl(url: string): boolean {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}

export function isSafeUrl(url: string): boolean {
  if (!isValidUrl(url)) return false;
  
  const parsed = new URL(url);
  
  // Only allow http and https
  if (!["http:", "https:"].includes(parsed.protocol)) {
    return false;
  }
  
  // Block localhost and private IPs in production
  if (process.env.NODE_ENV === "production") {
    if (parsed.hostname === "localhost" || parsed.hostname === "127.0.0.1") {
      return false;
    }
    
    // Block private IP ranges
    if (/^(10|172\.(1[6-9]|2[0-9]|3[01])|192\.168)\./.test(parsed.hostname)) {
      return false;
    }
  }
  
  return true;
}

// Email Validation (more strict than basic regex)
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
  
  if (!emailRegex.test(email)) return false;
  
  // Additional checks
  const [local, domain] = email.split("@");
  
  if (local.length > 64) return false;
  if (domain.length > 255) return false;
  
  return true;
}

// Phone Number Validation (Turkish format)
export function isValidPhoneNumber(phone: string): boolean {
  // Remove spaces, dashes, parentheses
  const cleaned = phone.replace(/[\s\-\(\)]/g, "");
  
  // Turkish phone number: +90 5XX XXX XX XX or 05XX XXX XX XX
  const phoneRegex = /^(\+90|0)?5\d{9}$/;
  
  return phoneRegex.test(cleaned);
}

// Slug Validation
export function isValidSlug(slug: string): boolean {
  const slugRegex = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
  return slugRegex.test(slug);
}

export function sanitizeSlug(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-+|-+$/g, "");
}

// Content Security Policy
export function generateNonce(): string {
  return Array.from(crypto.getRandomValues(new Uint8Array(16)))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

// Rate Limiting by IP
const ipRateLimits = new Map<string, { count: number; resetAt: number }>();

export function checkIpRateLimit(
  ip: string,
  maxRequests: number = 100,
  windowMs: number = 60000
): { allowed: boolean; remaining: number; resetAt: number } {
  const now = Date.now();
  const record = ipRateLimits.get(ip);
  
  if (!record || now > record.resetAt) {
    ipRateLimits.set(ip, { count: 1, resetAt: now + windowMs });
    return { allowed: true, remaining: maxRequests - 1, resetAt: now + windowMs };
  }
  
  if (record.count >= maxRequests) {
    return { allowed: false, remaining: 0, resetAt: record.resetAt };
  }
  
  record.count++;
  return { allowed: true, remaining: maxRequests - record.count, resetAt: record.resetAt };
}

// Input Length Validation
export const INPUT_LIMITS = {
  NAME: 100,
  EMAIL: 255,
  PHONE: 20,
  TITLE: 200,
  EXCERPT: 500,
  MESSAGE: 5000,
  CONTENT: 50000,
  URL: 2048,
  SLUG: 100,
} as const;

export function validateInputLength(
  input: string,
  maxLength: number,
  fieldName: string = "Input"
): { valid: boolean; error?: string } {
  if (input.length > maxLength) {
    return {
      valid: false,
      error: `${fieldName} çok uzun. Maksimum ${maxLength} karakter olmalı.`,
    };
  }
  return { valid: true };
}

// Sanitize filename
export function sanitizeFilename(filename: string): string {
  return filename
    .replace(/[^a-zA-Z0-9._-]/g, "_")
    .replace(/_{2,}/g, "_")
    .substring(0, 255);
}

// Check for suspicious patterns
export function containsSuspiciousPatterns(input: string): boolean {
  const suspiciousPatterns = [
    /<script/i,
    /javascript:/i,
    /on\w+\s*=/i,
    /<iframe/i,
    /eval\(/i,
    /expression\(/i,
    /vbscript:/i,
    /data:text\/html/i,
  ];
  
  return suspiciousPatterns.some((pattern) => pattern.test(input));
}

// Sanitize object (recursively sanitize all string values)
export function sanitizeObject<T extends Record<string, any>>(obj: T): T {
  const sanitized = { ...obj };
  
  for (const key in sanitized) {
    const value = sanitized[key];
    
    if (typeof value === "string") {
      sanitized[key] = sanitizeInput(value) as any;
    } else if (typeof value === "object" && value !== null && !Array.isArray(value)) {
      sanitized[key] = sanitizeObject(value);
    } else if (Array.isArray(value)) {
      sanitized[key] = value.map((item: any) =>
        typeof item === "string" ? sanitizeInput(item) : item
      ) as any;
    }
  }
  
  return sanitized;
}

// Password validation schema
export const passwordSchema = z
  .string()
  .min(8, "Şifre en az 8 karakter olmalı")
  .regex(/[A-Z]/, "Şifre en az bir büyük harf içermeli")
  .regex(/[a-z]/, "Şifre en az bir küçük harf içermeli")
  .regex(/[0-9]/, "Şifre en az bir rakam içermeli")
  .regex(/[^A-Za-z0-9]/, "Şifre en az bir özel karakter içermeli");

// Safe JSON parse
export function safeJsonParse<T>(json: string, fallback: T): T {
  try {
    return JSON.parse(json);
  } catch {
    return fallback;
  }
}

// Prevent prototype pollution
export function safeAssign<T extends object>(target: T, source: any): T {
  const result = { ...target };
  
  for (const key in source) {
    if (key === "__proto__" || key === "constructor" || key === "prototype") {
      continue;
    }
    
    if (Object.prototype.hasOwnProperty.call(source, key)) {
      (result as any)[key] = source[key];
    }
  }
  
  return result;
}
