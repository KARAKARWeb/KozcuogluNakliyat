"use client";

import { useState } from "react";
import { CheckCircle, Circle, Printer } from "lucide-react";
import { Button } from "@/components/ui/button";

const CHECKLIST_SECTIONS = [
  {
    title: "Taşınma Öncesi (2-4 Hafta)",
    items: [
      "Nakliyat firması araştırması ve teklif alma",
      "Ücretsiz keşif talep etme",
      "Taşınma tarihi belirleme",
      "Gereksiz eşyaları ayıklama (bağış/satış)",
      "Ambalaj malzemesi temin etme",
      "Komşulara ve yöneticiye bilgi verme",
      "Posta adres değişikliği bildirimi",
      "Sigorta poliçesi kontrolü",
    ],
  },
  {
    title: "Taşınma Öncesi (1 Hafta)",
    items: [
      "Değerli eşyaları ayırma (takı, belge, para)",
      "Elektronik cihazları yedekleme",
      "Buzdolabını boşaltma ve çözme",
      "Çamaşır/bulaşık makinesi su tahliyesi",
      "Gardırop ve çekmeceleri boşaltma",
      "Kırılacak eşyaları özel paketleme",
      "Kutuları etiketleme (oda adı + içerik)",
      "İlaçları ve ilk yardım çantasını ayırma",
    ],
  },
  {
    title: "Taşınma Günü",
    items: [
      "Nakliyat ekibini karşılama ve bilgilendirme",
      "Eşya listesi kontrolü",
      "Değerli eşyaları yanınıza alma",
      "Elektrik, su, doğalgaz sayaç okuma",
      "Eski evin son kontrolü (pencere, kapı, musluk)",
      "Anahtar teslimi",
      "Yeni evde eşya yerleşim planı",
      "Nakliyat ekibine yönlendirme",
    ],
  },
  {
    title: "Taşınma Sonrası",
    items: [
      "Eşya hasar kontrolü",
      "Elektrik, su, doğalgaz abonelik işlemleri",
      "İnternet ve TV abonelik taşıma",
      "Nüfus müdürlüğü adres güncelleme",
      "Banka ve kurumlara adres bildirimi",
      "Çocukların okul kaydı güncelleme",
      "Yeni komşulara tanışma",
      "Nakliyat firmasına yorum bırakma",
    ],
  },
];

export default function MovingChecklist() {
  const [checked, setChecked] = useState<Set<string>>(new Set());

  function toggle(item: string) {
    setChecked((prev) => {
      const next = new Set(prev);
      if (next.has(item)) next.delete(item);
      else next.add(item);
      return next;
    });
  }

  const totalItems = CHECKLIST_SECTIONS.reduce((sum, s) => sum + s.items.length, 0);
  const checkedCount = checked.size;
  const progress = totalItems > 0 ? Math.round((checkedCount / totalItems) * 100) : 0;

  return (
    <>
      {/* İlerleme */}
      <div className="mb-8 rounded-xl border bg-white p-6 shadow-sm">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-muted-foreground">İlerleme</p>
            <p className="text-2xl font-bold text-[#122032]">%{progress}</p>
          </div>
          <p className="text-sm text-muted-foreground">{checkedCount}/{totalItems} tamamlandı</p>
        </div>
        <div className="mt-3 h-3 overflow-hidden rounded-full bg-[#f5f5f5]">
          <div
            className="h-full rounded-full bg-[#e3000f] transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Kontrol Listesi */}
      <div className="space-y-8">
        {CHECKLIST_SECTIONS.map((section) => (
          <div key={section.title}>
            <h2 className="mb-4 text-xl font-bold text-[#122032]">{section.title}</h2>
            <div className="space-y-2">
              {section.items.map((item) => {
                const isChecked = checked.has(item);
                return (
                  <button
                    key={item}
                    onClick={() => toggle(item)}
                    className={`flex w-full items-center gap-3 rounded-lg border p-4 text-left transition ${
                      isChecked ? "border-green-200 bg-green-50" : "border-gray-200 bg-white hover:border-[#e3000f]/30"
                    }`}
                  >
                    {isChecked ? (
                      <CheckCircle className="h-5 w-5 shrink-0 text-green-500" />
                    ) : (
                      <Circle className="h-5 w-5 shrink-0 text-gray-300" />
                    )}
                    <span className={`text-sm ${isChecked ? "text-green-700 line-through" : "text-[#122032]"}`}>
                      {item}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Aksiyonlar */}
      <div className="mt-8 flex flex-wrap gap-3">
        <Button onClick={() => window.print()} variant="outline" className="gap-2">
          <Printer className="h-4 w-4" /> Yazdır
        </Button>
        <Button onClick={() => setChecked(new Set())} variant="outline">
          İlerlemeyi Sıfırla
        </Button>
      </div>
    </>
  );
}
