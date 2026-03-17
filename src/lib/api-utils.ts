// API Utilities - Pagination, Filtering, Sorting, Validation, Response

import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

// ============================================
// PAGINATION
// ============================================

export interface PaginationParams {
  page?: number;
  limit?: number;
  cursor?: string;
}

export interface PaginationMeta {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  hasNext: boolean;
  hasPrev: boolean;
  nextCursor?: string;
  prevCursor?: string;
}

export function getPaginationParams(searchParams: URLSearchParams): PaginationParams {
  return {
    page: parseInt(searchParams.get("page") || "1"),
    limit: Math.min(parseInt(searchParams.get("limit") || "10"), 100),
    cursor: searchParams.get("cursor") || undefined,
  };
}

export function createPaginationMeta(
  total: number,
  page: number,
  limit: number,
  items?: any[]
): PaginationMeta {
  const totalPages = Math.ceil(total / limit);
  
  return {
    total,
    page,
    limit,
    totalPages,
    hasNext: page < totalPages,
    hasPrev: page > 1,
    nextCursor: items && items.length > 0 ? items[items.length - 1].id : undefined,
    prevCursor: items && items.length > 0 ? items[0].id : undefined,
  };
}

export function paginateArray<T>(array: T[], page: number, limit: number): T[] {
  const start = (page - 1) * limit;
  const end = start + limit;
  return array.slice(start, end);
}

// ============================================
// FILTERING
// ============================================

export interface FilterParams {
  [key: string]: string | string[] | undefined;
}

export type FilterOperator = "eq" | "ne" | "gt" | "gte" | "lt" | "lte" | "contains" | "in";

export interface Filter {
  field: string;
  operator: FilterOperator;
  value: any;
}

export function parseFilters(searchParams: URLSearchParams): Filter[] {
  const filters: Filter[] = [];
  
  searchParams.forEach((value, key) => {
    if (key.startsWith("filter[")) {
      const match = key.match(/filter\[(.+?)\](?:\[(.+?)\])?/);
      if (match) {
        const field = match[1];
        const operator = (match[2] || "eq") as FilterOperator;
        
        filters.push({
          field,
          operator,
          value: value.includes(",") ? value.split(",") : value,
        });
      }
    }
  });
  
  return filters;
}

export function applyFilters<T extends Record<string, any>>(
  items: T[],
  filters: Filter[]
): T[] {
  return items.filter((item) => {
    return filters.every((filter) => {
      const fieldValue = item[filter.field];
      
      switch (filter.operator) {
        case "eq":
          return fieldValue === filter.value;
        case "ne":
          return fieldValue !== filter.value;
        case "gt":
          return fieldValue > filter.value;
        case "gte":
          return fieldValue >= filter.value;
        case "lt":
          return fieldValue < filter.value;
        case "lte":
          return fieldValue <= filter.value;
        case "contains":
          return String(fieldValue).toLowerCase().includes(String(filter.value).toLowerCase());
        case "in":
          return Array.isArray(filter.value) && filter.value.includes(fieldValue);
        default:
          return true;
      }
    });
  });
}

// Date range filtering
export function filterByDateRange<T extends Record<string, any>>(
  items: T[],
  field: string,
  startDate?: string,
  endDate?: string
): T[] {
  return items.filter((item) => {
    const date = new Date(item[field]);
    
    if (startDate && date < new Date(startDate)) return false;
    if (endDate && date > new Date(endDate)) return false;
    
    return true;
  });
}

// Full-text search
export function searchItems<T extends Record<string, any>>(
  items: T[],
  query: string,
  fields: string[]
): T[] {
  const lowerQuery = query.toLowerCase();
  
  return items.filter((item) => {
    return fields.some((field) => {
      const value = item[field];
      return value && String(value).toLowerCase().includes(lowerQuery);
    });
  });
}

// ============================================
// SORTING
// ============================================

export interface SortParams {
  field: string;
  order: "asc" | "desc";
}

export function parseSortParams(searchParams: URLSearchParams): SortParams[] {
  const sortParam = searchParams.get("sort");
  if (!sortParam) return [];
  
  return sortParam.split(",").map((sort) => {
    const isDesc = sort.startsWith("-");
    const field = isDesc ? sort.slice(1) : sort;
    
    return {
      field,
      order: isDesc ? "desc" : "asc",
    };
  });
}

export function applySorting<T extends Record<string, any>>(
  items: T[],
  sorts: SortParams[]
): T[] {
  if (sorts.length === 0) return items;
  
  return [...items].sort((a, b) => {
    for (const sort of sorts) {
      const aVal = a[sort.field];
      const bVal = b[sort.field];
      
      if (aVal === bVal) continue;
      
      const comparison = aVal > bVal ? 1 : -1;
      return sort.order === "asc" ? comparison : -comparison;
    }
    return 0;
  });
}

// ============================================
// VALIDATION
// ============================================

export async function validateRequest<T>(
  req: NextRequest,
  schema: z.ZodSchema<T>
): Promise<{ success: true; data: T } | { success: false; error: string; details: any }> {
  try {
    const body = await req.json();
    const result = schema.safeParse(body);
    
    if (!result.success) {
      return {
        success: false,
        error: "Validation failed",
        details: result.error.format(),
      };
    }
    
    return {
      success: true,
      data: result.data,
    };
  } catch (error) {
    return {
      success: false,
      error: "Invalid JSON",
      details: error,
    };
  }
}

export function validateQueryParams<T>(
  searchParams: URLSearchParams,
  schema: z.ZodSchema<T>
): { success: true; data: T } | { success: false; error: string; details: any } {
  const params = Object.fromEntries(searchParams.entries());
  const result = schema.safeParse(params);
  
  if (!result.success) {
    return {
      success: false,
      error: "Query parameter validation failed",
      details: result.error.format(),
    };
  }
  
  return {
    success: true,
    data: result.data,
  };
}

// ============================================
// RESPONSE STANDARDIZATION
// ============================================

export interface ApiSuccessResponse<T = any> {
  success: true;
  data: T;
  meta?: PaginationMeta;
  message?: string;
}

export interface ApiErrorResponse {
  success: false;
  error: string;
  message?: string;
  details?: any;
  code?: string;
}

export type ApiResponse<T = any> = ApiSuccessResponse<T> | ApiErrorResponse;

export function successResponse<T>(
  data: T,
  meta?: PaginationMeta,
  message?: string
): NextResponse<ApiSuccessResponse<T>> {
  return NextResponse.json(
    {
      success: true,
      data,
      meta,
      message,
    },
    {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "no-cache",
      },
    }
  );
}

export function errorResponse(
  error: string,
  status: number = 400,
  details?: any,
  code?: string
): NextResponse<ApiErrorResponse> {
  return NextResponse.json(
    {
      success: false,
      error,
      details,
      code,
    },
    {
      status,
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
}

export function createdResponse<T>(
  data: T,
  message?: string
): NextResponse<ApiSuccessResponse<T>> {
  return NextResponse.json(
    {
      success: true,
      data,
      message: message || "Resource created successfully",
    },
    {
      status: 201,
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
}

export function noContentResponse(): NextResponse {
  return new NextResponse(null, { status: 204 });
}

// ============================================
// RATE LIMITING
// ============================================

interface RateLimitStore {
  [key: string]: {
    count: number;
    resetAt: number;
  };
}

const rateLimitStore: RateLimitStore = {};

export interface RateLimitConfig {
  maxRequests: number;
  windowMs: number;
}

export function checkRateLimit(
  identifier: string,
  config: RateLimitConfig = { maxRequests: 100, windowMs: 60000 }
): {
  allowed: boolean;
  remaining: number;
  resetAt: number;
} {
  const now = Date.now();
  const record = rateLimitStore[identifier];
  
  if (!record || now > record.resetAt) {
    rateLimitStore[identifier] = {
      count: 1,
      resetAt: now + config.windowMs,
    };
    
    return {
      allowed: true,
      remaining: config.maxRequests - 1,
      resetAt: now + config.windowMs,
    };
  }
  
  if (record.count >= config.maxRequests) {
    return {
      allowed: false,
      remaining: 0,
      resetAt: record.resetAt,
    };
  }
  
  record.count++;
  
  return {
    allowed: true,
    remaining: config.maxRequests - record.count,
    resetAt: record.resetAt,
  };
}

export function getRateLimitHeaders(
  limit: number,
  remaining: number,
  resetAt: number
): Record<string, string> {
  return {
    "X-RateLimit-Limit": String(limit),
    "X-RateLimit-Remaining": String(remaining),
    "X-RateLimit-Reset": String(Math.floor(resetAt / 1000)),
  };
}

export function rateLimitExceededResponse(resetAt: number): NextResponse {
  return NextResponse.json(
    {
      success: false,
      error: "Rate limit exceeded",
      message: "Too many requests. Please try again later.",
      retryAfter: Math.ceil((resetAt - Date.now()) / 1000),
    },
    {
      status: 429,
      headers: {
        "Content-Type": "application/json",
        "Retry-After": String(Math.ceil((resetAt - Date.now()) / 1000)),
      },
    }
  );
}

// ============================================
// HELPER FUNCTIONS
// ============================================

export function getClientIp(req: NextRequest): string {
  return (
    req.headers.get("x-forwarded-for")?.split(",")[0] ||
    req.headers.get("x-real-ip") ||
    "unknown"
  );
}

export function getUserAgent(req: NextRequest): string {
  return req.headers.get("user-agent") || "unknown";
}
