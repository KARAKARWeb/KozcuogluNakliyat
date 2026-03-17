import Breadcrumb from "@/components/site/breadcrumb";
import JsonLd from "@/components/site/json-ld";
import { faqSchema, breadcrumbSchema } from "@/lib/schemas";
import { ChevronRight } from "lucide-react";
import type { Page } from "@/types";
import { getPageData } from "@/lib/get-page-data";
import type { Metadata } from "next";

const FAQ_ITEMS = [
  { q: "Nakliyat fiyatı nasıl belirlenir?", a: "Fiyat; eşya miktarı, mesafe, kat durumu, asansör varlığına göre belirlenir. Ücretsiz keşif ile kesin fiyat verilir." },
  { q: "Eşyalarım sigortalanır mı?", a: "Evet, tüm taşımalarımız sigorta kapsamındadır. Hasar durumunda tazminat ödenir." },
  { q: "Taşıma ne kadar sürer?", a: "Şehir içi taşımalar genellikle 1 gün içerisinde tamamlanır. Şehirler arası taşımalarda mesafeye göre değişir." },
  { q: "Ambalajlama hizmeti var mı?", a: "Evet, profesyonel ambalajlama hizmetimiz mevcuttur. Tüm eşyalarınız özenle paketlenir." },
  { q: "Asansörlü nakliyat yapılıyor mu?", a: "Evet, dış cephe asansörü ile yüksek katlara güvenli taşıma yapılmaktadır." },
  { q: "Depolama hizmeti var mı?", a: "Evet, güvenli ve klimalı depolama tesislerimizde eşyalarınızı saklayabilirsiniz." },
  { q: "Hafta sonu taşıma yapılıyor mu?", a: "Evet, hafta sonu ve resmi tatillerde de hizmet vermekteyiz." },
  { q: "Ödeme nasıl yapılır?", a: "Nakit, kredi kartı ve havale/EFT ile ödeme yapabilirsiniz." },
  { q: "İptal ve erteleme politikanız nedir?", a: "Taşıma tarihinden 48 saat önce ücretsiz iptal veya erteleme yapılabilir." },
  { q: "Montaj demontaj hizmeti var mı?", a: "Evet, mobilya montaj ve demontaj hizmetimiz mevcuttur." },
];

export async function generateMetadata(): Promise<Metadata> {
  const pd = await getPageData("sikca-sorulan-sorular");
  const seo = pd?.seo;
  return {
    title: seo?.title || "Sıkça Sorulan Sorular",
    description: seo?.description || "Nakliyat hakkında sıkça sorulan sorular ve cevapları.",
    alternates: { canonical: "/sikca-sorulan-sorular" },
    openGraph: {
      title: seo?.title || "Sıkça Sorulan Sorular",
      description: seo?.description || "Nakliyat hakkında sıkça sorulan sorular ve cevapları.",
      url: "/sikca-sorulan-sorular",
      type: "website",
      ...(seo?.ogImage ? { images: [{ url: seo.ogImage }] } : {}),
    },
  };
}

export default async function SSSPage() {
  const pageData = await getPageData("sikca-sorulan-sorular");
  return (
    <>
      <JsonLd data={[
        faqSchema(FAQ_ITEMS.map((item) => ({ question: item.q, answer: item.a })))!,
        breadcrumbSchema([{ name: "Kozcuoğlu Nakliyat", url: "/" }, { name: "Sıkça Sorulan Sorular" }]),
      ]} />
      <section className="bg-[#122032] py-16 text-white md:py-20">
        <div className="mx-auto max-w-[1440px] px-4 md:px-6 lg:px-8">
          <h1 className="text-3xl font-bold md:text-4xl">{pageData?.sections?.hero?.title || "Sıkça Sorulan Sorular"}</h1>

          <p className="mt-3 max-w-2xl text-gray-300">{pageData?.sections?.hero?.content || "Nakliyat hakkında merak ettikleriniz"}</p>

          <Breadcrumb items={[{ label: "Sıkça Sorulan Sorular" }]} />
        </div>
      </section>

      <section className="py-16 md:py-20 lg:py-24">
        <div className="mx-auto max-w-3xl px-4 md:px-6 lg:px-8">
          <div className="space-y-4">
            {FAQ_ITEMS.map((item, i) => (
              <details key={i} className="group rounded-xl border bg-white shadow-sm">
                <summary className="flex cursor-pointer items-center justify-between p-5 font-medium text-[#122032]">
                  {item.q}
                  <ChevronRight className="h-4 w-4 shrink-0 transition group-open:rotate-90" />
                </summary>
                <div className="border-t px-5 pb-5 pt-3 text-sm leading-relaxed text-muted-foreground">
                  {item.a}
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {pageData?.sections?.seoText?.content && (
        <section className="py-16 md:py-20">
          <div className="mx-auto max-w-[1440px] px-4 md:px-6 lg:px-8">
            <div className="prose max-w-none prose-headings:text-[#122032] prose-headings:font-bold prose-p:text-[#122032]/80 prose-p:leading-relaxed prose-a:text-[#e3000f] prose-a:underline" dangerouslySetInnerHTML={{ __html: pageData.sections.seoText.content }} />
          </div>
        </section>
      )}
    </>
  );
}
