// Role-Based Access Control (RBAC)

import type { UserRole } from "@/types/user";

// Permission definitions
export const PERMISSIONS = {
  // User management
  USER_CREATE: "user:create",
  USER_READ: "user:read",
  USER_UPDATE: "user:update",
  USER_DELETE: "user:delete",
  
  // Content management
  BLOG_CREATE: "blog:create",
  BLOG_UPDATE: "blog:update",
  BLOG_DELETE: "blog:delete",
  BLOG_PUBLISH: "blog:publish",
  
  SERVICE_CREATE: "service:create",
  SERVICE_UPDATE: "service:update",
  SERVICE_DELETE: "service:delete",
  
  PAGE_CREATE: "page:create",
  PAGE_UPDATE: "page:update",
  PAGE_DELETE: "page:delete",
  
  // Settings
  SETTINGS_UPDATE: "settings:update",
  
  // System
  BACKUP_CREATE: "backup:create",
  LOGS_VIEW: "logs:view",
} as const;

export type Permission = typeof PERMISSIONS[keyof typeof PERMISSIONS];

// Role permissions mapping
export const ROLE_PERMISSIONS: Record<UserRole, Permission[]> = {
  ADMIN: Object.values(PERMISSIONS),
  
  EDITOR: [
    PERMISSIONS.USER_READ,
    PERMISSIONS.BLOG_CREATE,
    PERMISSIONS.BLOG_UPDATE,
    PERMISSIONS.BLOG_DELETE,
    PERMISSIONS.BLOG_PUBLISH,
    PERMISSIONS.SERVICE_CREATE,
    PERMISSIONS.SERVICE_UPDATE,
    PERMISSIONS.SERVICE_DELETE,
    PERMISSIONS.PAGE_CREATE,
    PERMISSIONS.PAGE_UPDATE,
    PERMISSIONS.PAGE_DELETE,
  ],
  
  VIEWER: [
    PERMISSIONS.USER_READ,
  ],
};

// Check if user has permission
export function hasPermission(userRole: UserRole, permission: Permission): boolean {
  const rolePermissions = ROLE_PERMISSIONS[userRole];
  return rolePermissions.includes(permission);
}

// Check if user has any of the permissions
export function hasAnyPermission(userRole: UserRole, permissions: Permission[]): boolean {
  return permissions.some((permission) => hasPermission(userRole, permission));
}

// Check if user has all permissions
export function hasAllPermissions(userRole: UserRole, permissions: Permission[]): boolean {
  return permissions.every((permission) => hasPermission(userRole, permission));
}

// Route protection
export const PROTECTED_ROUTES: Record<string, Permission[]> = {
  "/admin/users": [PERMISSIONS.USER_READ],
  "/admin/users/new": [PERMISSIONS.USER_CREATE],
  "/admin/blog": [PERMISSIONS.BLOG_CREATE, PERMISSIONS.BLOG_UPDATE],
  "/admin/services": [PERMISSIONS.SERVICE_CREATE, PERMISSIONS.SERVICE_UPDATE],
  "/admin/pages": [PERMISSIONS.PAGE_CREATE, PERMISSIONS.PAGE_UPDATE],
  "/admin/settings": [PERMISSIONS.SETTINGS_UPDATE],
  "/admin/backup": [PERMISSIONS.BACKUP_CREATE],
  "/admin/logs": [PERMISSIONS.LOGS_VIEW],
};

export function canAccessRoute(userRole: UserRole, route: string): boolean {
  const requiredPermissions = PROTECTED_ROUTES[route];
  if (!requiredPermissions) return true; // No protection needed
  
  return hasAnyPermission(userRole, requiredPermissions);
}

// API endpoint protection
export const PROTECTED_ENDPOINTS: Record<string, Record<string, Permission[]>> = {
  "/api/users": {
    GET: [PERMISSIONS.USER_READ],
    POST: [PERMISSIONS.USER_CREATE],
  },
  "/api/users/[id]": {
    GET: [PERMISSIONS.USER_READ],
    PUT: [PERMISSIONS.USER_UPDATE],
    DELETE: [PERMISSIONS.USER_DELETE],
  },
  "/api/blog": {
    POST: [PERMISSIONS.BLOG_CREATE],
  },
  "/api/blog/[slug]": {
    PUT: [PERMISSIONS.BLOG_UPDATE],
    DELETE: [PERMISSIONS.BLOG_DELETE],
  },
  "/api/services": {
    POST: [PERMISSIONS.SERVICE_CREATE],
  },
  "/api/services/[slug]": {
    PUT: [PERMISSIONS.SERVICE_UPDATE],
    DELETE: [PERMISSIONS.SERVICE_DELETE],
  },
  "/api/settings": {
    PUT: [PERMISSIONS.SETTINGS_UPDATE],
  },
  "/api/backup": {
    POST: [PERMISSIONS.BACKUP_CREATE],
  },
};

export function canAccessEndpoint(
  userRole: UserRole,
  endpoint: string,
  method: string
): boolean {
  const endpointProtection = PROTECTED_ENDPOINTS[endpoint];
  if (!endpointProtection) return true;
  
  const requiredPermissions = endpointProtection[method];
  if (!requiredPermissions) return true;
  
  return hasAnyPermission(userRole, requiredPermissions);
}

// UI element visibility
export interface UIElement {
  id: string;
  requiredPermissions: Permission[];
  requireAll?: boolean;
}

export function canShowElement(userRole: UserRole, element: UIElement): boolean {
  if (element.requireAll) {
    return hasAllPermissions(userRole, element.requiredPermissions);
  }
  return hasAnyPermission(userRole, element.requiredPermissions);
}

// Role hierarchy
export const ROLE_HIERARCHY: Record<UserRole, number> = {
  ADMIN: 3,
  EDITOR: 2,
  VIEWER: 1,
};

export function isHigherRole(role1: UserRole, role2: UserRole): boolean {
  return ROLE_HIERARCHY[role1] > ROLE_HIERARCHY[role2];
}

export function canManageUser(managerRole: UserRole, targetRole: UserRole): boolean {
  return isHigherRole(managerRole, targetRole);
}
