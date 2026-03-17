"use client";

import { MessageCircle } from "lucide-react";

export default function WhatsAppButton() {
  return (
    <a
      href="https://wa.me/905321384979?text=Merhaba%2C%20nakliyat%20hizmeti%20hakk%C4%B1nda%20bilgi%20almak%20istiyorum."
      target="_blank"
      rel="noopener noreferrer"
      aria-label="WhatsApp ile iletişim"
      className="fixed bottom-6 right-6 z-40 hidden h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg transition-transform hover:scale-110 lg:flex"
    >
      <MessageCircle className="h-7 w-7" />
    </a>
  );
}
