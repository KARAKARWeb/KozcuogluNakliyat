import Link from "next/link";
import Image from "next/image";
import { readData } from "@/lib/db";
import type { Client } from "@/types";
import Breadcrumb from "@/components/site/breadcrumb";
import JsonLd from "@/components/site/json-ld";
import { breadcrumbSchema } from "@/lib/schemas";
import { Building2 } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Kurumsal Referanslar",
  description: "Kozcuoğlu Nakliyat kurumsal referanslar. İş ortaklarımız ve kurumsal müşterilerimiz.",
  alternates: { canonical: "/kurumsal-referanslar" },
  openGraph: {
    title: "Kurumsal Referanslar",
    description: "Kozcuoğlu Nakliyat kurumsal referanslar. İş ortaklarımız ve kurumsal müşterilerimiz.",
    url: "/kurumsal-referanslar",
    type: "website",
  },
};

export default async function KurumsalReferanslarPage() {
  const clients = await readData<Client[]>("clients.json");
  const activeClients = clients.filter((c) => c.isActive);

  return (
    <>
      <JsonLd data={[breadcrumbSchema([{ name: "Kozcuoğlu Nakliyat", url: "/" }, { name: "Referanslarımız", url: "/referanslarimiz" }, { name: "Kurumsal Referanslar" }])]} />
      <section className="bg-[#122032] py-16 text-white md:py-20">
        <div className="mx-auto max-w-[1440px] px-4 md:px-6 lg:px-8">
          <h1 className="text-3xl font-bold md:text-4xl">Kurumsal Referanslar</h1>

          <p className="mt-3 max-w-2xl text-gray-300">Güvenilir iş ortaklarımız ve kurumsal müşterilerimiz</p>

          <Breadcrumb items={[{ label: "Referanslarımız", href: "/referanslarimiz" }, { label: "Kurumsal Referanslar" }]} />
        </div>
      </section>

      <section className="py-16 md:py-20">
        <div className="mx-auto max-w-[1440px] px-4 md:px-6 lg:px-8">
          {activeClients.length > 0 ? (
            <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {activeClients.map((c) => (
                <div key={c.id} className="flex flex-col items-center rounded-xl border p-6 text-center">
                  {c.logo ? (
                    <Image src={c.logo} alt={c.name} width={200} height={64} className="h-16 w-auto object-contain" loading="lazy" />
                  ) : (
                    <Building2 className="h-12 w-12 text-[#e3000f]" />
                  )}
                  <h3 className="mt-3 font-bold text-[#122032]">{c.name}</h3>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center text-muted-foreground">Kurumsal referanslar yakında eklenecektir.</p>
          )}
          <div className="mt-10 text-center">
            <Link href="/referanslarimiz" className="text-sm font-medium text-[#e3000f] hover:underline">&larr; Tüm Referanslar</Link>
          </div>
        </div>
      </section>
    </>
  );
}
