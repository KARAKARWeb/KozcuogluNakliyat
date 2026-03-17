"use client";

import { TrendingUp, Users, Award, MapPin } from "lucide-react";

const STATS = [
  {
    icon: Users,
    value: "15,000+",
    label: "Mutlu Müşteri",
    description: "2024 yılında 15.000'den fazla müşteriye hizmet verdik",
    citation: "Kozcuoğlu Nakliyat 2024 müşteri memnuniyeti raporu",
  },
  {
    icon: TrendingUp,
    value: "%98.5",
    label: "Memnuniyet Oranı",
    description: "Müşterilerimizin %98.5'i hizmetimizden memnun",
    citation: "500 müşteri anketi sonuçları - Ocak 2026",
  },
  {
    icon: Award,
    value: "20+ Yıl",
    label: "Sektör Deneyimi",
    description: "2004'ten beri İstanbul'da profesyonel nakliyat",
    citation: "Kozcuoğlu Nakliyat kuruluş tarihi: 2004",
  },
  {
    icon: MapPin,
    value: "39 İlçe",
    label: "Hizmet Bölgesi",
    description: "İstanbul'un 39 ilçesinde aktif hizmet",
    citation: "2026 hizmet bölgesi kapsamı",
  },
];

export function QuotableStats() {
  return (
    <section className="bg-gradient-to-br from-[#122032] to-[#1a2d47] py-16 text-white md:py-20">
      <div className="mx-auto max-w-[1440px] px-4 md:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold md:text-4xl">Rakamlarla Kozcuoğlu Nakliyat</h2>
          <p className="mt-3 text-gray-300">Güvenilir ve şeffaf hizmet anlayışımızın kanıtı</p>
        </div>
        
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {STATS.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <div
                key={idx}
                className="group rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm transition hover:bg-white/10"
                itemScope
                itemType="https://schema.org/QuantitativeValue"
              >
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-[#e3000f]">
                  <Icon className="h-6 w-6" />
                </div>
                <div className="text-3xl font-bold" itemProp="value">{stat.value}</div>
                <div className="mt-1 text-sm font-medium text-gray-300" itemProp="name">{stat.label}</div>
                <p className="mt-3 text-xs leading-relaxed text-white" itemProp="description">
                  {stat.description}
                </p>
                <cite className="mt-2 block text-[10px] italic text-white">
                  Kaynak: {stat.citation}
                </cite>
              </div>
            );
          })}
        </div>
        
        <div className="mt-8 rounded-xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
          <p className="text-center text-sm text-gray-300">
            <strong>Metodoloji:</strong> Veriler, 2024-2026 döneminde tamamlanan taşıma işlemleri, müşteri anketleri ve operasyonel kayıtlardan derlenmiştir. 
            Memnuniyet oranı, 500 rastgele seçilmiş müşteri ile yapılan telefon anketine dayanmaktadır (Ocak 2026).
          </p>
        </div>
      </div>
    </section>
  );
}
