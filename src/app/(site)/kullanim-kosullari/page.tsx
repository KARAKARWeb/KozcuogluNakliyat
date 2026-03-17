import Breadcrumb from "@/components/site/breadcrumb";
import JsonLd from "@/components/site/json-ld";
import { breadcrumbSchema } from "@/lib/schemas";
import { readData } from "@/lib/db";
import type { Metadata } from "next";
import type { Policy } from "@/types";
import { notFound } from "next/navigation";

export async function generateMetadata(): Promise<Metadata> {
  const policies = await readData<Policy[]>("policies.json");
  const policy = policies.find((p) => p.id === "kullanim-kosullari");
  
  if (!policy) {
    return {
      title: "Kullanım Koşulları",
      description: "Kozcuoğlu Nakliyat web sitesi kullanım koşulları.",
    };
  }

  return {
    title: policy.seo.title,
    description: policy.seo.description,
    alternates: { canonical: policy.seo.canonical },
    openGraph: {
      title: policy.seo.title,
      description: policy.seo.description,
      url: policy.seo.canonical,
      type: "website",
    },
  };
}

export default async function KullanimKosullariPage() {
  const policies = await readData<Policy[]>("policies.json");
  const policy = policies.find((p) => p.id === "kullanim-kosullari");
  
  if (!policy) {
    notFound();
  }

  return (
    <>
      <JsonLd data={[breadcrumbSchema([{ name: "Kozcuoğlu Nakliyat", url: "/" }, { name: policy.title }])]} />
      <section className="bg-[#122032] py-16 text-white md:py-20">
        <div className="mx-auto max-w-[1440px] px-4 md:px-6 lg:px-8">
          <h1 className="text-3xl font-bold md:text-4xl">{policy.title}</h1>
          <Breadcrumb items={[{ label: policy.title }]} />
        </div>
      </section>
      <section className="py-16 md:py-20">
        <div 
          className="prose mx-auto max-w-3xl px-4 prose-headings:text-[#122032] prose-a:text-[#e3000f]"
          dangerouslySetInnerHTML={{ __html: policy.content }}
        />
      </section>
    </>
  );
}
