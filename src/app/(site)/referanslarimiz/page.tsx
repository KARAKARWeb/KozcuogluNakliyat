import { readData } from "@/lib/db";
import Image from "next/image";
import type { Client } from "@/types";
import Breadcrumb from "@/components/site/breadcrumb";
import JsonLd from "@/components/site/json-ld";
import { breadcrumbSchema } from "@/lib/schemas";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Referanslarımız",
  description: "Kozcuoğlu Nakliyat müşteri referansları ve iş ortakları.",
  alternates: { canonical: "/referanslar" },
};

export default async function ReferanslarimizPage() {
  const clients = await readData<Client[]>("clients.json");
  const active = clients.filter((c) => c.isActive).sort((a, b) => a.order - b.order);

  return (
    <>
      <JsonLd data={[breadcrumbSchema([{ name: "Kozcuoğlu Nakliyat", url: "/" }, { name: "Referanslarımız" }])]} />
      <section className="bg-[#122032] py-16 text-white md:py-20">
        <div className="mx-auto max-w-[1440px] px-4 md:px-6 lg:px-8">
          <h1 className="text-3xl font-bold md:text-4xl">Referanslarımız</h1>

          <p className="mt-3 max-w-2xl text-gray-300">Bize güven duyan firmalar</p>

          <Breadcrumb items={[{ label: "Referanslarımız" }]} />
        </div>
      </section>

      <section className="py-16 md:py-20 lg:py-24">
        <div className="mx-auto max-w-[1440px] px-4 md:px-6 lg:px-8">
          {active.length === 0 ? (
            <p className="py-12 text-center text-muted-foreground">Henüz referans eklenmemiş</p>
          ) : (
            <div className="grid gap-6 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
              {active.map((c) => (
                <div key={c.id} className="flex flex-col items-center rounded-xl border bg-white p-6 transition hover:shadow-md">
                  {c.logo ? (
                    <Image src={c.logo} alt={c.name} width={160} height={48} className="h-12 w-auto object-contain grayscale transition hover:grayscale-0" loading="lazy" />
                  ) : (
                    <div className="flex h-12 items-center">
                      <span className="text-sm font-medium text-muted-foreground">{c.name}</span>
                    </div>
                  )}
                  <p className="mt-3 text-center text-xs font-medium text-[#122032]">{c.name}</p>
                  {c.website && (
                    <a href={c.website} target="_blank" rel="noopener noreferrer" className="mt-1 text-xs text-[#e3000f] hover:underline">Web sitesi</a>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
