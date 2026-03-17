"use client";

import { Loader2 } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

export function TableSkeleton({ rows = 5, columns = 5 }: { rows?: number; columns?: number }) {
  return (
    <div className="space-y-3">
      {Array.from({ length: rows }).map((_, i) => (
        <div key={i} className="flex gap-4">
          {Array.from({ length: columns }).map((_, j) => (
            <Skeleton key={j} className="h-12 flex-1" />
          ))}
        </div>
      ))}
    </div>
  );
}

export function CardSkeleton() {
  return (
    <div className="rounded-xl border bg-white p-6 shadow-sm space-y-4">
      <Skeleton className="h-6 w-1/3" />
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-2/3" />
    </div>
  );
}

export function FormSkeleton() {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Skeleton className="h-4 w-24" />
        <Skeleton className="h-10 w-full" />
      </div>
      <div className="space-y-2">
        <Skeleton className="h-4 w-24" />
        <Skeleton className="h-10 w-full" />
      </div>
      <div className="space-y-2">
        <Skeleton className="h-4 w-24" />
        <Skeleton className="h-32 w-full" />
      </div>
      <Skeleton className="h-10 w-32" />
    </div>
  );
}

export function Spinner({ size = "default" }: { size?: "sm" | "default" | "lg" }) {
  const sizeClasses = {
    sm: "h-4 w-4",
    default: "h-6 w-6",
    lg: "h-8 w-8",
  };

  return (
    <Loader2 className={`${sizeClasses[size]} animate-spin text-muted-foreground`} />
  );
}

export function FullPageLoader() {
  return (
    <div className="flex h-screen items-center justify-center">
      <div className="text-center space-y-4">
        <Spinner size="lg" />
        <p className="text-sm text-muted-foreground">Yükleniyor...</p>
      </div>
    </div>
  );
}

export function InlineLoader({ text = "Yükleniyor..." }: { text?: string }) {
  return (
    <div className="flex items-center gap-2 text-sm text-muted-foreground">
      <Spinner size="sm" />
      <span>{text}</span>
    </div>
  );
}

export function ProgressBar({ progress, max = 100 }: { progress: number; max?: number }) {
  const percentage = Math.min((progress / max) * 100, 100);
  
  return (
    <div className="space-y-2">
      <div className="flex justify-between text-sm">
        <span className="text-muted-foreground">İlerleme</span>
        <span className="font-medium">{Math.round(percentage)}%</span>
      </div>
      <div className="h-2 w-full overflow-hidden rounded-full bg-secondary">
        <div
          className="h-full bg-primary transition-all duration-300"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}

export function ButtonLoader({ loading, children }: { loading: boolean; children: React.ReactNode }) {
  return (
    <>
      {loading && <Spinner size="sm" />}
      {children}
    </>
  );
}
