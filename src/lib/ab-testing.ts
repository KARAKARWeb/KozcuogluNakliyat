"use client";

export interface ABTestVariant {
  id: string;
  name: string;
  weight: number;
  config: Record<string, any>;
}

export interface ABTest {
  id: string;
  name: string;
  description: string;
  status: "draft" | "running" | "paused" | "completed";
  variants: ABTestVariant[];
  startDate: string;
  endDate?: string;
  targetMetric: string;
  sampleSize: number;
  confidenceLevel: number;
}

export interface ABTestResult {
  variantId: string;
  impressions: number;
  conversions: number;
  conversionRate: number;
  revenue?: number;
  isWinner?: boolean;
  confidence?: number;
}

// Get assigned variant for user
export function getVariant(testId: string, userId?: string): string {
  if (typeof window === "undefined") return "control";

  const storageKey = `ab_test_${testId}`;
  const stored = localStorage.getItem(storageKey);

  if (stored) {
    return stored;
  }

  // Get test configuration
  const test = getABTest(testId);
  if (!test || test.status !== "running") {
    return "control";
  }

  // Assign variant based on weights
  const random = Math.random() * 100;
  let cumulative = 0;

  for (const variant of test.variants) {
    cumulative += variant.weight;
    if (random <= cumulative) {
      localStorage.setItem(storageKey, variant.id);
      trackVariantAssignment(testId, variant.id);
      return variant.id;
    }
  }

  return "control";
}

// Track variant assignment
function trackVariantAssignment(testId: string, variantId: string) {
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("event", "ab_test_assignment", {
      event_category: "ab_testing",
      test_id: testId,
      variant_id: variantId,
    });
  }
}

// Track conversion
export function trackABTestConversion(
  testId: string,
  variantId: string,
  value?: number
) {
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("event", "ab_test_conversion", {
      event_category: "ab_testing",
      test_id: testId,
      variant_id: variantId,
      value: value,
    });
  }

  // Save to localStorage for reporting
  const resultsKey = `ab_results_${testId}_${variantId}`;
  const results = JSON.parse(localStorage.getItem(resultsKey) || "{}");
  results.conversions = (results.conversions || 0) + 1;
  if (value) {
    results.revenue = (results.revenue || 0) + value;
  }
  localStorage.setItem(resultsKey, JSON.stringify(results));
}

// Get test configuration
function getABTest(testId: string): ABTest | null {
  const testsKey = "ab_tests";
  const tests = JSON.parse(localStorage.getItem(testsKey) || "[]");
  return tests.find((t: ABTest) => t.id === testId) || null;
}

// Calculate statistical significance
export function calculateSignificance(
  controlConversions: number,
  controlImpressions: number,
  variantConversions: number,
  variantImpressions: number
): number {
  const p1 = controlConversions / controlImpressions;
  const p2 = variantConversions / variantImpressions;
  const pPool = (controlConversions + variantConversions) / (controlImpressions + variantImpressions);

  const se = Math.sqrt(pPool * (1 - pPool) * (1 / controlImpressions + 1 / variantImpressions));
  const zScore = (p2 - p1) / se;

  // Convert z-score to confidence level
  const confidence = (1 - Math.exp(-0.717 * zScore - 0.416 * zScore * zScore)) * 100;
  return Math.min(Math.max(confidence, 0), 100);
}

// Determine winner
export function determineWinner(results: ABTestResult[]): ABTestResult | null {
  if (results.length < 2) return null;

  const sorted = [...results].sort((a, b) => b.conversionRate - a.conversionRate);
  const winner = sorted[0];
  const control = results.find((r) => r.variantId === "control") || sorted[1];

  const confidence = calculateSignificance(
    control.conversions,
    control.impressions,
    winner.conversions,
    winner.impressions
  );

  if (confidence >= 95) {
    return { ...winner, isWinner: true, confidence };
  }

  return null;
}

// Save test configuration
export function saveABTest(test: ABTest) {
  const testsKey = "ab_tests";
  const tests = JSON.parse(localStorage.getItem(testsKey) || "[]");
  const index = tests.findIndex((t: ABTest) => t.id === test.id);

  if (index >= 0) {
    tests[index] = test;
  } else {
    tests.push(test);
  }

  localStorage.setItem(testsKey, JSON.stringify(tests));
}

// Get all tests
export function getAllABTests(): ABTest[] {
  const testsKey = "ab_tests";
  return JSON.parse(localStorage.getItem(testsKey) || "[]");
}

// Get test results
export function getABTestResults(testId: string): ABTestResult[] {
  const test = getABTest(testId);
  if (!test) return [];

  return test.variants.map((variant) => {
    const resultsKey = `ab_results_${testId}_${variant.id}`;
    const results = JSON.parse(localStorage.getItem(resultsKey) || "{}");

    const impressions = results.impressions || 0;
    const conversions = results.conversions || 0;
    const conversionRate = impressions > 0 ? (conversions / impressions) * 100 : 0;

    return {
      variantId: variant.id,
      impressions,
      conversions,
      conversionRate,
      revenue: results.revenue,
    };
  });
}
