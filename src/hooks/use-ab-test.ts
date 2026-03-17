"use client";

import { useState, useEffect } from "react";
import { getVariant, trackABTestConversion } from "@/lib/ab-testing";

export function useABTest(testId: string, userId?: string) {
  const [variant, setVariant] = useState<string>("control");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const assignedVariant = getVariant(testId, userId);
    setVariant(assignedVariant);
    setIsLoading(false);
  }, [testId, userId]);

  const trackConversion = (value?: number) => {
    trackABTestConversion(testId, variant, value);
  };

  return {
    variant,
    isLoading,
    trackConversion,
    isVariant: (variantId: string) => variant === variantId,
  };
}

export function useABTestConfig<T = any>(
  testId: string,
  variantConfigs: Record<string, T>
): T | null {
  const { variant, isLoading } = useABTest(testId);

  if (isLoading) return null;

  return variantConfigs[variant] || variantConfigs.control || null;
}
