"use client";

import { useState, useEffect } from "react";

interface ConsentGuardProps {
  children: React.ReactNode;
}

export default function AnalyticsConsentGuard({ children }: ConsentGuardProps) {
  const [allowed, setAllowed] = useState<boolean | null>(null);

  useEffect(() => {
    function checkConsent() {
      const raw = localStorage.getItem("cookie-consent");
      if (!raw) {
        setAllowed(true);
        return;
      }
      try {
        const parsed = JSON.parse(raw);
        setAllowed(parsed.analytics === true);
      } catch {
        setAllowed(true);
      }
    }

    checkConsent();

    function handleUpdate(e: Event) {
      const detail = (e as CustomEvent).detail;
      setAllowed(detail?.analytics === true);
    }

    window.addEventListener("cookie-consent-update", handleUpdate);
    return () => window.removeEventListener("cookie-consent-update", handleUpdate);
  }, []);

  if (allowed === null || allowed === false) return null;

  return <>{children}</>;
}
