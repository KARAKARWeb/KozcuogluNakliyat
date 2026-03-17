"use client";

import { useEffect } from "react";

export default function Log404() {
  useEffect(() => {
    const url = window.location.pathname + window.location.search;
    const referrer = document.referrer || "";
    fetch("/api/log-404", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ url, referrer }),
    }).catch(() => {});
  }, []);

  return null;
}
