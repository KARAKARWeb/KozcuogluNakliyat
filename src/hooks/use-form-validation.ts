"use client";

import { useState, useCallback } from "react";

type ValidationRule<T> = {
  validate: (value: T) => boolean;
  message: string;
};

type ValidationRules<T> = {
  [K in keyof T]?: ValidationRule<T[K]>[];
};

export function useFormValidation<T extends Record<string, any>>(
  initialValues: T,
  rules: ValidationRules<T>
) {
  const [values, setValues] = useState<T>(initialValues);
  const [errors, setErrors] = useState<Partial<Record<keyof T, string>>>({});
  const [touched, setTouched] = useState<Partial<Record<keyof T, boolean>>>({});

  const validateField = useCallback(
    (name: keyof T, value: any): string | null => {
      const fieldRules = rules[name];
      if (!fieldRules) return null;

      for (const rule of fieldRules) {
        if (!rule.validate(value)) {
          return rule.message;
        }
      }
      return null;
    },
    [rules]
  );

  const handleChange = useCallback(
    (name: keyof T, value: any) => {
      setValues((prev) => ({ ...prev, [name]: value }));
      
      if (touched[name]) {
        const error = validateField(name, value);
        setErrors((prev) => ({ ...prev, [name]: error || undefined }));
      }
    },
    [touched, validateField]
  );

  const handleBlur = useCallback(
    (name: keyof T) => {
      setTouched((prev) => ({ ...prev, [name]: true }));
      const error = validateField(name, values[name]);
      setErrors((prev) => ({ ...prev, [name]: error || undefined }));
    },
    [values, validateField]
  );

  const validateAll = useCallback((): boolean => {
    const newErrors: Partial<Record<keyof T, string>> = {};
    let isValid = true;

    for (const name in rules) {
      const error = validateField(name as keyof T, values[name]);
      if (error) {
        newErrors[name as keyof T] = error;
        isValid = false;
      }
    }

    setErrors(newErrors);
    setTouched(
      Object.keys(rules).reduce((acc, key) => ({ ...acc, [key]: true }), {})
    );

    return isValid;
  }, [rules, values, validateField]);

  const reset = useCallback(() => {
    setValues(initialValues);
    setErrors({});
    setTouched({});
  }, [initialValues]);

  return {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    validateAll,
    reset,
    setValues,
  };
}

// Validation helpers
export const validators = {
  required: (message = "Bu alan zorunludur") => ({
    validate: (value: any) => {
      if (typeof value === "string") return value.trim().length > 0;
      return value !== null && value !== undefined && value !== "";
    },
    message,
  }),

  minLength: (min: number, message?: string) => ({
    validate: (value: string) => value.length >= min,
    message: message || `En az ${min} karakter olmalıdır`,
  }),

  maxLength: (max: number, message?: string) => ({
    validate: (value: string) => value.length <= max,
    message: message || `En fazla ${max} karakter olmalıdır`,
  }),

  email: (message = "Geçerli bir e-posta adresi giriniz") => ({
    validate: (value: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value),
    message,
  }),

  url: (message = "Geçerli bir URL giriniz") => ({
    validate: (value: string) =>
      /^https?:\/\/.+\..+/.test(value) || value === "",
    message,
  }),

  slug: (message = "Geçerli bir slug giriniz (küçük harf, tire)") => ({
    validate: (value: string) => /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(value),
    message,
  }),

  phone: (message = "Geçerli bir telefon numarası giriniz") => ({
    validate: (value: string) =>
      /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/.test(value),
    message,
  }),

  min: (min: number, message?: string) => ({
    validate: (value: number) => value >= min,
    message: message || `En az ${min} olmalıdır`,
  }),

  max: (max: number, message?: string) => ({
    validate: (value: number) => value <= max,
    message: message || `En fazla ${max} olmalıdır`,
  }),

  pattern: (pattern: RegExp, message = "Geçersiz format") => ({
    validate: (value: string) => pattern.test(value),
    message,
  }),
};
