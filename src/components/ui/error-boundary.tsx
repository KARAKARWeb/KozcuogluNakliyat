"use client";

import React from "react";
import { AlertTriangle, RefreshCw, Home } from "lucide-react";
import { Button } from "./button";

interface ErrorBoundaryProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
  onError?: (error: Error, errorInfo: React.ErrorInfo) => void;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error("ErrorBoundary caught an error:", error, errorInfo);
    
    if (this.props.onError) {
      this.props.onError(error, errorInfo);
    }

    // Log to error tracking service (Sentry, etc.)
    if (typeof window !== "undefined" && (window as any).Sentry) {
      (window as any).Sentry.captureException(error, { extra: errorInfo });
    }
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null });
  };

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="flex min-h-[400px] items-center justify-center p-6">
          <div className="max-w-md text-center">
            <div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full bg-red-100">
              <AlertTriangle className="h-8 w-8 text-red-600" />
            </div>
            <h2 className="mb-2 text-xl font-bold text-gray-900">Bir Hata Oluştu</h2>
            <p className="mb-6 text-sm text-gray-600">
              Üzgünüz, bir şeyler ters gitti. Lütfen sayfayı yenilemeyi deneyin.
            </p>
            {process.env.NODE_ENV === "development" && this.state.error && (
              <div className="mb-6 rounded-lg bg-gray-100 p-4 text-left">
                <p className="mb-2 text-xs font-semibold text-gray-700">Hata Detayı:</p>
                <pre className="overflow-x-auto text-xs text-red-600">
                  {this.state.error.message}
                </pre>
              </div>
            )}
            <div className="flex flex-col gap-2 sm:flex-row sm:justify-center">
              <Button onClick={this.handleReset} className="gap-2">
                <RefreshCw className="h-4 w-4" />
                Tekrar Dene
              </Button>
              <Button variant="outline" onClick={() => window.location.href = "/"} className="gap-2">
                <Home className="h-4 w-4" />
                Ana Sayfa
              </Button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

// Error message component
export function ErrorMessage({ 
  message, 
  onRetry, 
  className = "" 
}: { 
  message: string; 
  onRetry?: () => void; 
  className?: string;
}) {
  return (
    <div className={`rounded-lg border border-red-200 bg-red-50 p-4 ${className}`} role="alert">
      <div className="flex items-start gap-3">
        <AlertTriangle className="h-5 w-5 flex-shrink-0 text-red-600" />
        <div className="flex-1">
          <p className="text-sm font-medium text-red-800">{message}</p>
          {onRetry && (
            <button
              onClick={onRetry}
              className="mt-2 text-sm font-medium text-red-600 hover:text-red-700 hover:underline"
            >
              Tekrar Dene
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

// Success message component
export function SuccessMessage({ message, className = "" }: { message: string; className?: string }) {
  return (
    <div className={`rounded-lg border border-green-200 bg-green-50 p-4 ${className}`} role="status">
      <p className="text-sm font-medium text-green-800">{message}</p>
    </div>
  );
}

// Warning message component
export function WarningMessage({ message, className = "" }: { message: string; className?: string }) {
  return (
    <div className={`rounded-lg border border-amber-200 bg-amber-50 p-4 ${className}`} role="alert">
      <p className="text-sm font-medium text-amber-800">{message}</p>
    </div>
  );
}

// Info message component
export function InfoMessage({ message, className = "" }: { message: string; className?: string }) {
  return (
    <div className={`rounded-lg border border-blue-200 bg-blue-50 p-4 ${className}`} role="status">
      <p className="text-sm font-medium text-blue-800">{message}</p>
    </div>
  );
}
