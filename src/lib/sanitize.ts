export function sanitize(input: string): string {
  return input
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#x27;")
    .replace(/\//g, "&#x2F;");
}

export function sanitizeObject<T extends Record<string, unknown>>(obj: T): T {
  const sanitized = { ...obj };
  for (const key of Object.keys(sanitized)) {
    const value = sanitized[key];
    if (typeof value === "string") {
      (sanitized as Record<string, unknown>)[key] = sanitize(value);
    }
  }
  return sanitized;
}
