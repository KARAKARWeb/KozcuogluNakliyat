"use client";

import { useEffect, useRef } from "react";

export default function EmbedWrapper({ children }: { children: React.ReactNode }) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function sendHeight() {
      if (window.self === window.top) return;
      const h = containerRef.current?.scrollHeight || document.body.scrollHeight;
      window.parent.postMessage({ type: "kozcuoglu-resize", height: h }, "*");
    }
    sendHeight();
    const interval = setInterval(sendHeight, 500);
    return () => clearInterval(interval);
  }, []);

  return <div ref={containerRef}>{children}</div>;
}
