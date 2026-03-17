export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

export const NAP = {
  name: "Kozcuoğlu Nakliyat",
  phone: "0216 494 53 37",
  phoneCustomerService: "444 7 436",
  gsm: "0532 138 49 79",
  email: "info@kozcuoglunakliyat.com.tr",
  whatsapp: "https://wa.me/905321384979?text=Merhaba",
  address: "Kaynarca Mah. Bahattin Veled Cad. No:37 34890 Pendik / İstanbul",
  workingHours: "Pazartesi-Cumartesi 08:00-19:00, Pazar 09:00-17:00",
} as const;

export const DEVELOPER = {
  name: "KARAKAR Web Tasarım ve Yazılım Ajansı",
  url: "https://karakar.web.tr",
  phone: "+90 545 181 4040",
  email: "info@karakar.web.tr",
  whatsapp: "https://wa.me/905451814040?text=Merhaba",
  logoDark: "https://karakar.web.tr/KARAKAR-Web-Logo-2.webp",
  logoLight: "https://karakar.web.tr/KARAKAR-Web-Logo-1.webp",
} as const;

export const BREAKPOINTS = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  "2xl": 1440,
} as const;
