// Loading States - Skeleton Screens & Progress Indicators

import { Loader2 } from "lucide-react";

// Skeleton components
export function Skeleton({ className = "" }: { className?: string }) {
  return (
    <div
      className={`animate-pulse rounded-md bg-gray-200 ${className}`}
      aria-hidden="true"
    />
  );
}

export function SkeletonText({ lines = 3, className = "" }: { lines?: number; className?: string }) {
  return (
    <div className={`space-y-2 ${className}`}>
      {Array.from({ length: lines }).map((_, i) => (
        <Skeleton
          key={i}
          className={`h-4 ${i === lines - 1 ? "w-3/4" : "w-full"}`}
        />
      ))}
    </div>
  );
}

export function SkeletonCard({ className = "" }: { className?: string }) {
  return (
    <div className={`rounded-lg border bg-white p-6 ${className}`}>
      <Skeleton className="mb-4 h-6 w-1/3" />
      <SkeletonText lines={3} />
      <div className="mt-4 flex gap-2">
        <Skeleton className="h-10 w-24" />
        <Skeleton className="h-10 w-24" />
      </div>
    </div>
  );
}

export function SkeletonTable({ rows = 5, cols = 4 }: { rows?: number; cols?: number }) {
  return (
    <div className="rounded-lg border bg-white">
      <div className="border-b p-4">
        <div className="flex gap-4">
          {Array.from({ length: cols }).map((_, i) => (
            <Skeleton key={i} className="h-4 w-24" />
          ))}
        </div>
      </div>
      {Array.from({ length: rows }).map((_, i) => (
        <div key={i} className="border-b p-4 last:border-0">
          <div className="flex gap-4">
            {Array.from({ length: cols }).map((_, j) => (
              <Skeleton key={j} className="h-4 flex-1" />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export function SkeletonImage({ className = "" }: { className?: string }) {
  return (
    <Skeleton className={`aspect-video w-full ${className}`} />
  );
}

// Loading spinners
export function LoadingSpinner({ size = "md", className = "" }: { size?: "sm" | "md" | "lg"; className?: string }) {
  const sizeClasses = {
    sm: "h-4 w-4",
    md: "h-6 w-6",
    lg: "h-8 w-8",
  };

  return (
    <Loader2 className={`animate-spin ${sizeClasses[size]} ${className}`} aria-label="Yükleniyor" />
  );
}

export function LoadingOverlay({ message = "Yükleniyor..." }: { message?: string }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="rounded-lg bg-white p-6 shadow-xl">
        <div className="flex flex-col items-center gap-3">
          <LoadingSpinner size="lg" className="text-[#e3000f]" />
          <p className="text-sm font-medium text-gray-700">{message}</p>
        </div>
      </div>
    </div>
  );
}

export function LoadingButton({
  loading,
  children,
  className = "",
  ...props
}: {
  loading: boolean;
  children: React.ReactNode;
  className?: string;
  [key: string]: any;
}) {
  return (
    <button
      disabled={loading}
      className={`inline-flex items-center gap-2 ${className}`}
      {...props}
    >
      {loading && <LoadingSpinner size="sm" />}
      {children}
    </button>
  );
}

// Progress indicators
export function ProgressBar({ value, max = 100, className = "" }: { value: number; max?: number; className?: string }) {
  const percentage = Math.min((value / max) * 100, 100);

  return (
    <div className={`h-2 w-full overflow-hidden rounded-full bg-gray-200 ${className}`}>
      <div
        className="h-full bg-[#e3000f] transition-all duration-300"
        style={{ width: `${percentage}%` }}
        role="progressbar"
        aria-valuenow={value}
        aria-valuemin={0}
        aria-valuemax={max}
      />
    </div>
  );
}

export function ProgressCircle({ value, max = 100, size = 48 }: { value: number; max?: number; size?: number }) {
  const percentage = Math.min((value / max) * 100, 100);
  const radius = (size - 4) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (percentage / 100) * circumference;

  return (
    <div className="relative inline-flex items-center justify-center">
      <svg width={size} height={size} className="-rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="currentColor"
          strokeWidth="4"
          fill="none"
          className="text-gray-200"
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="currentColor"
          strokeWidth="4"
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          className="text-[#e3000f] transition-all duration-300"
        />
      </svg>
      <span className="absolute text-xs font-semibold">{Math.round(percentage)}%</span>
    </div>
  );
}

// Loading states for specific components
export function LoadingPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      <Skeleton className="mb-6 h-10 w-1/3" />
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <SkeletonCard />
        <SkeletonCard />
        <SkeletonCard />
      </div>
    </div>
  );
}

export function LoadingList({ items = 5 }: { items?: number }) {
  return (
    <div className="space-y-4">
      {Array.from({ length: items }).map((_, i) => (
        <div key={i} className="flex items-center gap-4 rounded-lg border bg-white p-4">
          <Skeleton className="h-12 w-12 rounded-full" />
          <div className="flex-1">
            <Skeleton className="mb-2 h-4 w-1/3" />
            <Skeleton className="h-3 w-2/3" />
          </div>
        </div>
      ))}
    </div>
  );
}
