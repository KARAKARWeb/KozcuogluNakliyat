export type UserRole = "ADMIN" | "EDITOR" | "VIEWER";

export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  role: UserRole;
  isActive: boolean;
  lastLogin?: string;
  emailVerified?: boolean;
  createdAt: string;
  updatedAt: string;
}
