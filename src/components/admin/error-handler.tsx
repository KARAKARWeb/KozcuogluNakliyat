"use client";

import { useState } from "react";
import { AlertCircle, XCircle, RefreshCw, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

interface ErrorMessageProps {
  title?: string;
  message: string;
  onRetry?: () => void;
  onDismiss?: () => void;
  variant?: "error" | "warning" | "info";
}

export function ErrorMessage({
  title = "Hata",
  message,
  onRetry,
  onDismiss,
  variant = "error",
}: ErrorMessageProps) {
  const [dismissed, setDismissed] = useState(false);

  if (dismissed) return null;

  const handleDismiss = () => {
    setDismissed(true);
    onDismiss?.();
  };

  const variantStyles = {
    error: "border-red-200 bg-red-50 text-red-900",
    warning: "border-yellow-200 bg-yellow-50 text-yellow-900",
    info: "border-blue-200 bg-blue-50 text-blue-900",
  };

  return (
    <Alert className={variantStyles[variant]}>
      <AlertCircle className="h-4 w-4" />
      <AlertTitle className="flex items-center justify-between">
        {title}
        {onDismiss && (
          <button onClick={handleDismiss} className="hover:opacity-70">
            <X className="h-4 w-4" />
          </button>
        )}
      </AlertTitle>
      <AlertDescription className="mt-2 space-y-3">
        <p>{message}</p>
        {onRetry && (
          <Button variant="outline" size="sm" onClick={onRetry}>
            <RefreshCw className="mr-2 h-4 w-4" />
            Tekrar Dene
          </Button>
        )}
      </AlertDescription>
    </Alert>
  );
}

export function ErrorBoundaryFallback({
  error,
  resetError,
}: {
  error: Error;
  resetError: () => void;
}) {
  return (
    <div className="flex min-h-[400px] items-center justify-center p-6">
      <div className="max-w-md space-y-4 text-center">
        <XCircle className="mx-auto h-12 w-12 text-red-500" />
        <h2 className="text-xl font-bold text-[#122032]">Bir Hata Oluştu</h2>
        <p className="text-sm text-muted-foreground">{error.message}</p>
        <div className="flex gap-2 justify-center">
          <Button onClick={resetError}>
            <RefreshCw className="mr-2 h-4 w-4" />
            Tekrar Dene
          </Button>
          <Button variant="outline" onClick={() => window.location.reload()}>
            Sayfayı Yenile
          </Button>
        </div>
      </div>
    </div>
  );
}

export function EmptyState({
  icon: Icon = AlertCircle,
  title,
  description,
  action,
}: {
  icon?: React.ComponentType<{ className?: string }>;
  title: string;
  description?: string;
  action?: { label: string; onClick: () => void };
}) {
  return (
    <div className="flex min-h-[300px] items-center justify-center p-6">
      <div className="max-w-md space-y-4 text-center">
        <Icon className="mx-auto h-12 w-12 text-muted-foreground" />
        <h3 className="text-lg font-semibold text-[#122032]">{title}</h3>
        {description && (
          <p className="text-sm text-muted-foreground">{description}</p>
        )}
        {action && (
          <Button onClick={action.onClick}>{action.label}</Button>
        )}
      </div>
    </div>
  );
}

export function useErrorHandler() {
  const [error, setError] = useState<string | null>(null);

  const handleError = (err: unknown) => {
    const message = err instanceof Error ? err.message : "Bilinmeyen bir hata oluştu";
    setError(message);
    console.error("Error:", err);
  };

  const clearError = () => setError(null);

  return { error, handleError, clearError };
}

export function NetworkError({ onRetry }: { onRetry: () => void }) {
  return (
    <ErrorMessage
      title="Bağlantı Hatası"
      message="Sunucuya bağlanılamadı. Lütfen internet bağlantınızı kontrol edin."
      onRetry={onRetry}
      variant="error"
    />
  );
}

export function ValidationError({ errors }: { errors: string[] }) {
  return (
    <Alert className="border-yellow-200 bg-yellow-50 text-yellow-900">
      <AlertCircle className="h-4 w-4" />
      <AlertTitle>Doğrulama Hatası</AlertTitle>
      <AlertDescription className="mt-2">
        <ul className="list-disc list-inside space-y-1">
          {errors.map((error, i) => (
            <li key={i} className="text-sm">{error}</li>
          ))}
        </ul>
      </AlertDescription>
    </Alert>
  );
}
