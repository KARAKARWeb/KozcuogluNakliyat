import Link from "next/link";
import { readData } from "@/lib/db";
import type { Project } from "@/types";
import Breadcrumb from "@/components/site/breadcrumb";
import JsonLd from "@/components/site/json-ld";
import { breadcrumbSchema } from "@/lib/schemas";
import { Star } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Bireysel Referanslar",
  description: "Kozcuoğlu Nakliyat bireysel referanslar. Müşterilerimizin deneyimleri ve değerlendirmeleri.",
  alternates: { canonical: "/bireysel-referanslar" },
  openGraph: {
    title: "Bireysel Referanslar",
    description: "Kozcuoğlu Nakliyat bireysel referanslar. Müşterilerimizin deneyimleri ve değerlendirmeleri.",
    url: "/bireysel-referanslar",
    type: "website",
  },
};

export default async function BireyselReferanslarPage() {
  const bireysel: Project[] = [];

  return (
    <>
      <JsonLd data={[breadcrumbSchema([{ name: "Kozcuoğlu Nakliyat", url: "/" }, { name: "Referanslarımız", url: "/referanslarimiz" }, { name: "Bireysel Referanslar" }])]} />
      <section className="bg-[#122032] py-16 text-white md:py-20">
        <div className="mx-auto max-w-[1440px] px-4 md:px-6 lg:px-8">
          <h1 className="text-3xl font-bold md:text-4xl">Bireysel Referanslar</h1>

          <p className="mt-3 max-w-2xl text-gray-300">Bireysel müşterilerimizin deneyimleri</p>

          <Breadcrumb items={[{ label: "Referanslarımız", href: "/referanslarimiz" }, { label: "Bireysel Referanslar" }]} />
        </div>
      </section>

      <section className="py-16 md:py-20">
        <div className="mx-auto max-w-[1440px] px-4 md:px-6 lg:px-8">
          {bireysel.length > 0 ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {bireysel.map((p) => (
                <div key={p.id} className="rounded-xl border p-6">
                  <div className="flex gap-0.5">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <h3 className="mt-3 font-bold text-[#122032]">{p.title}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{p.description}</p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center text-muted-foreground">Bireysel referanslar yakında eklenecektir.</p>
          )}
          <div className="mt-10 text-center">
            <Link href="/referanslarimiz" className="text-sm font-medium text-[#e3000f] hover:underline">&larr; Tüm Referanslar</Link>
          </div>
        </div>
      </section>
    </>
  );
}
