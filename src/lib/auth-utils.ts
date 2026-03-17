// Authentication Utilities - Multi-User Support

import bcrypt from "bcryptjs";
import { z } from "zod";

// User validation schemas
export const registerSchema = z.object({
  name: z.string().min(2, "İsim en az 2 karakter olmalı"),
  email: z.string().email("Geçerli bir e-posta adresi girin"),
  password: z
    .string()
    .min(8, "Şifre en az 8 karakter olmalı")
    .regex(/[A-Z]/, "Şifre en az bir büyük harf içermeli")
    .regex(/[a-z]/, "Şifre en az bir küçük harf içermeli")
    .regex(/[0-9]/, "Şifre en az bir rakam içermeli"),
  role: z.enum(["ADMIN", "EDITOR", "VIEWER"]).optional(),
});

export const loginSchema = z.object({
  email: z.string().email("Geçerli bir e-posta adresi girin"),
  password: z.string().min(1, "Şifre gerekli"),
});

export const updateProfileSchema = z.object({
  name: z.string().min(2).optional(),
  email: z.string().email().optional(),
  currentPassword: z.string().optional(),
  newPassword: z
    .string()
    .min(8)
    .regex(/[A-Z]/)
    .regex(/[a-z]/)
    .regex(/[0-9]/)
    .optional(),
});

// Password utilities
export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 12);
}

export async function verifyPassword(
  password: string,
  hashedPassword: string
): Promise<boolean> {
  return bcrypt.compare(password, hashedPassword);
}

export function generateRandomPassword(length: number = 16): string {
  const charset =
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*";
  let password = "";
  
  // Ensure at least one of each required character type
  password += "ABCDEFGHIJKLMNOPQRSTUVWXYZ"[Math.floor(Math.random() * 26)];
  password += "abcdefghijklmnopqrstuvwxyz"[Math.floor(Math.random() * 26)];
  password += "0123456789"[Math.floor(Math.random() * 10)];
  password += "!@#$%^&*"[Math.floor(Math.random() * 8)];
  
  // Fill the rest
  for (let i = password.length; i < length; i++) {
    password += charset[Math.floor(Math.random() * charset.length)];
  }
  
  // Shuffle
  return password
    .split("")
    .sort(() => Math.random() - 0.5)
    .join("");
}

// Password strength checker
export function checkPasswordStrength(password: string): {
  score: number;
  strength: "weak" | "medium" | "strong" | "very-strong";
  feedback: string[];
} {
  let score = 0;
  const feedback: string[] = [];

  // Length
  if (password.length >= 8) score += 1;
  else feedback.push("Şifre en az 8 karakter olmalı");

  if (password.length >= 12) score += 1;
  if (password.length >= 16) score += 1;

  // Character types
  if (/[a-z]/.test(password)) score += 1;
  else feedback.push("Küçük harf ekleyin");

  if (/[A-Z]/.test(password)) score += 1;
  else feedback.push("Büyük harf ekleyin");

  if (/[0-9]/.test(password)) score += 1;
  else feedback.push("Rakam ekleyin");

  if (/[^a-zA-Z0-9]/.test(password)) score += 1;
  else feedback.push("Özel karakter ekleyin");

  // Common patterns
  if (/(.)\1{2,}/.test(password)) {
    score -= 1;
    feedback.push("Tekrarlayan karakterlerden kaçının");
  }

  if (/^[0-9]+$/.test(password)) {
    score -= 2;
    feedback.push("Sadece rakam kullanmayın");
  }

  let strength: "weak" | "medium" | "strong" | "very-strong";
  if (score <= 2) strength = "weak";
  else if (score <= 4) strength = "medium";
  else if (score <= 6) strength = "strong";
  else strength = "very-strong";

  return { score, strength, feedback };
}

// User role utilities
export type UserRole = "ADMIN" | "EDITOR" | "VIEWER";

export const ROLE_HIERARCHY: Record<UserRole, number> = {
  ADMIN: 3,
  EDITOR: 2,
  VIEWER: 1,
};

export function hasPermission(userRole: UserRole, requiredRole: UserRole): boolean {
  return ROLE_HIERARCHY[userRole] >= ROLE_HIERARCHY[requiredRole];
}

export function canManageUser(managerRole: UserRole, targetRole: UserRole): boolean {
  return ROLE_HIERARCHY[managerRole] > ROLE_HIERARCHY[targetRole];
}

// Session utilities
export function generateSessionToken(): string {
  return Array.from(crypto.getRandomValues(new Uint8Array(32)))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

export function generateVerificationToken(): string {
  return Array.from(crypto.getRandomValues(new Uint8Array(32)))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

// Email verification
export function createVerificationLink(token: string, baseUrl: string): string {
  return `${baseUrl}/auth/verify-email?token=${token}`;
}

// Password reset
export function createPasswordResetLink(token: string, baseUrl: string): string {
  return `${baseUrl}/auth/reset-password?token=${token}`;
}

// Token expiration
export function isTokenExpired(expiresAt: Date): boolean {
  return new Date() > expiresAt;
}

export function createTokenExpiration(hours: number = 24): Date {
  const expiration = new Date();
  expiration.setHours(expiration.getHours() + hours);
  return expiration;
}

// User sanitization (remove sensitive data)
export function sanitizeUser<T extends { password?: string; [key: string]: any }>(
  user: T
): Omit<T, "password"> {
  const { password, ...sanitized } = user;
  return sanitized;
}

// Activity logging
export interface UserActivity {
  userId: string;
  action: string;
  ipAddress?: string;
  userAgent?: string;
  timestamp: Date;
}

export function createActivityLog(
  userId: string,
  action: string,
  ipAddress?: string,
  userAgent?: string
): UserActivity {
  return {
    userId,
    action,
    ipAddress,
    userAgent,
    timestamp: new Date(),
  };
}

// Rate limiting for auth endpoints
const loginAttempts = new Map<string, { count: number; resetAt: number }>();

export function checkLoginAttempts(
  identifier: string,
  maxAttempts: number = 5,
  windowMs: number = 15 * 60 * 1000
): { allowed: boolean; remaining: number; resetAt: number } {
  const now = Date.now();
  const record = loginAttempts.get(identifier);

  if (!record || now > record.resetAt) {
    loginAttempts.set(identifier, { count: 1, resetAt: now + windowMs });
    return { allowed: true, remaining: maxAttempts - 1, resetAt: now + windowMs };
  }

  if (record.count >= maxAttempts) {
    return { allowed: false, remaining: 0, resetAt: record.resetAt };
  }

  record.count++;
  return {
    allowed: true,
    remaining: maxAttempts - record.count,
    resetAt: record.resetAt,
  };
}

export function resetLoginAttempts(identifier: string): void {
  loginAttempts.delete(identifier);
}

// User status
export type UserStatus = "active" | "inactive" | "suspended" | "pending_verification";

export function canUserLogin(status: UserStatus): boolean {
  return status === "active";
}

// Common password list (top 100 most common passwords)
const COMMON_PASSWORDS = [
  "123456",
  "password",
  "12345678",
  "qwerty",
  "123456789",
  "12345",
  "1234",
  "111111",
  "1234567",
  "dragon",
  "123123",
  "baseball",
  "iloveyou",
  "trustno1",
  "1234567890",
  "sunshine",
  "master",
  "welcome",
  "shadow",
  "ashley",
  "football",
  "jesus",
  "michael",
  "ninja",
  "mustang",
  "password1",
];

export function isCommonPassword(password: string): boolean {
  return COMMON_PASSWORDS.includes(password.toLowerCase());
}

// User search and filtering
export function searchUsers<T extends { name: string; email: string }>(
  users: T[],
  query: string
): T[] {
  const lowerQuery = query.toLowerCase();
  return users.filter(
    (user) =>
      user.name.toLowerCase().includes(lowerQuery) ||
      user.email.toLowerCase().includes(lowerQuery)
  );
}

export function filterUsersByRole<T extends { role: UserRole }>(
  users: T[],
  role: UserRole
): T[] {
  return users.filter((user) => user.role === role);
}

export function filterActiveUsers<T extends { isActive: boolean }>(users: T[]): T[] {
  return users.filter((user) => user.isActive);
}
