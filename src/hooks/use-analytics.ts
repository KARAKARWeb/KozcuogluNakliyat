"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import {
  trackPageView,
  trackScrollDepth,
  trackTimeOnPage,
} from "@/lib/analytics-tracking";

export function usePageTracking() {
  const pathname = usePathname();
  const startTimeRef = useRef<number>(Date.now());
  const scrollTrackedRef = useRef<Set<number>>(new Set());

  useEffect(() => {
    // Track page view
    trackPageView(pathname, document.title);

    // Reset scroll tracking
    scrollTrackedRef.current = new Set();
    startTimeRef.current = Date.now();

    // Scroll depth tracking
    const handleScroll = () => {
      const scrollPercentage = Math.round(
        (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100
      );

      // Track at 25%, 50%, 75%, 100%
      const milestones = [25, 50, 75, 100];
      milestones.forEach((milestone) => {
        if (
          scrollPercentage >= milestone &&
          !scrollTrackedRef.current.has(milestone)
        ) {
          scrollTrackedRef.current.add(milestone);
          trackScrollDepth(milestone, pathname);
        }
      });
    };

    // Time on page tracking
    const handleBeforeUnload = () => {
      const timeSpent = Math.round((Date.now() - startTimeRef.current) / 1000);
      trackTimeOnPage(timeSpent, pathname);
    };

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [pathname]);
}

export function useConversionTracking() {
  return {
    trackQuoteRequest: (data: {
      serviceType: string;
      fromLocation: string;
      toLocation: string;
    }) => {
      // Track in analytics
      if (typeof window !== "undefined" && window.gtag) {
        window.gtag("event", "quote_request", {
          event_category: "conversion",
          service_type: data.serviceType,
          from_location: data.fromLocation,
          to_location: data.toLocation,
        });
      }
    },
    trackContactForm: (formType: string) => {
      if (typeof window !== "undefined" && window.gtag) {
        window.gtag("event", "contact_form_submit", {
          event_category: "conversion",
          form_type: formType,
        });
      }
    },
    trackPhoneClick: (location: string) => {
      if (typeof window !== "undefined" && window.gtag) {
        window.gtag("event", "phone_click", {
          event_category: "conversion",
          click_location: location,
        });
      }
    },
  };
}
