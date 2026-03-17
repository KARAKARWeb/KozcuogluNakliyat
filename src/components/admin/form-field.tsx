"use client";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { AlertCircle, CheckCircle2 } from "lucide-react";

interface FormFieldProps {
  label: string;
  name: string;
  value: string;
  error?: string;
  touched?: boolean;
  required?: boolean;
  type?: "text" | "email" | "url" | "tel" | "number" | "textarea";
  placeholder?: string;
  onChange: (name: string, value: string) => void;
  onBlur: (name: string) => void;
  rows?: number;
}

export function FormField({
  label,
  name,
  value,
  error,
  touched,
  required,
  type = "text",
  placeholder,
  onChange,
  onBlur,
  rows = 4,
}: FormFieldProps) {
  const hasError = touched && error;
  const isValid = touched && !error && value;

  return (
    <div className="space-y-2">
      <Label htmlFor={name} className="flex items-center gap-1">
        {label}
        {required && <span className="text-red-500">*</span>}
      </Label>
      
      <div className="relative">
        {type === "textarea" ? (
          <Textarea
            id={name}
            value={value}
            onChange={(e) => onChange(name, e.target.value)}
            onBlur={() => onBlur(name)}
            placeholder={placeholder}
            rows={rows}
            className={hasError ? "border-red-500" : isValid ? "border-green-500" : ""}
          />
        ) : (
          <Input
            id={name}
            type={type}
            value={value}
            onChange={(e) => onChange(name, e.target.value)}
            onBlur={() => onBlur(name)}
            placeholder={placeholder}
            className={hasError ? "border-red-500 pr-10" : isValid ? "border-green-500 pr-10" : ""}
          />
        )}
        
        {hasError && (
          <AlertCircle className="absolute right-3 top-3 h-5 w-5 text-red-500" />
        )}
        {isValid && (
          <CheckCircle2 className="absolute right-3 top-3 h-5 w-5 text-green-500" />
        )}
      </div>

      {hasError && (
        <p className="text-sm text-red-500 flex items-center gap-1">
          <AlertCircle className="h-3 w-3" />
          {error}
        </p>
      )}
    </div>
  );
}
