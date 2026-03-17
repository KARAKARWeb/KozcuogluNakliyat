"use client";

import { useState, useEffect, useRef } from "react";
import { ChevronUp } from "lucide-react";

export default function BackToTop() {
  const [show, setShow] = useState(false);
  const ticking = useRef(false);

  useEffect(() => {
    function onScroll() {
      if (!ticking.current) {
        ticking.current = true;
        requestAnimationFrame(() => {
          setShow(window.scrollY > 300);
          ticking.current = false;
        });
      }
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!show) return null;

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      aria-label="Sayfa başına dön"
      className="fixed bottom-[88px] right-6 z-40 flex h-10 w-10 items-center justify-center rounded-full bg-[#122032]/80 text-white shadow-md transition-all hover:bg-[#122032] lg:bottom-24"
    >
      <ChevronUp className="h-5 w-5" />
    </button>
  );
}
