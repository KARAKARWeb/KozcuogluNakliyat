"use client";

import { Phone } from "lucide-react";

export default function PhoneButton() {
  return (
    <a
      href="tel:4447436"
      aria-label="Telefon ile arayın"
      className="fixed bottom-6 left-6 z-40 hidden h-14 w-14 items-center justify-center rounded-full bg-[#122032] text-white shadow-lg transition-transform hover:scale-110 lg:flex"
    >
      <Phone className="h-6 w-6" />
    </a>
  );
}
