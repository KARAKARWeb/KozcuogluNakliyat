import Breadcrumb from "@/components/site/breadcrumb";
import ContactForm from "@/components/site/contact-form";
import JsonLd from "@/components/site/json-ld";
import { contactPageSchema, movingCompanySchema, breadcrumbSchema } from "@/lib/schemas";
import { Phone, Mail, MapPin, Clock, MessageCircle } from "lucide-react";
import type { Page } from "@/types";
import { getPageData } from "@/lib/get-page-data";
import type { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  const pd = await getPageData("iletisim");
  const seo = pd?.seo;
  return {
    title: seo?.title || "İletişim",
    description: seo?.description || "Kozcuoğlu Nakliyat iletişim. Ücretsiz keşif ve fiyat teklifi için bize ulaşın. ☎ 444 7 436",
    alternates: { canonical: "/iletisim" },
    openGraph: {
      title: seo?.title || "İletişim",
      description: seo?.description || "Kozcuoğlu Nakliyat iletişim. Ücretsiz keşif ve fiyat teklifi için bize ulaşın. ☎ 444 7 436",
      url: "/iletisim",
      type: "website",
      ...(seo?.ogImage ? { images: [{ url: seo.ogImage }] } : {}),
    },
  };
}

export default async function IletisimPage() {
  const pageData = await getPageData("iletisim");
  const { readData } = await import("@/lib/db");
  const settings = await readData<any>("settings.json");
  const mapUrl = settings?.nap?.mapEmbedUrl || "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3015.8!2d29.2334!3d40.8776!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDDCsDUyJzM5LjQiTiAyOcKwMTQnMDAuMiJF!5e0!3m2!1str!2str!4v1";
  
  return (
    <>
      <JsonLd data={[
        contactPageSchema(),
        movingCompanySchema(),
        breadcrumbSchema([{ name: "Kozcuoğlu Nakliyat", url: "/" }, { name: "İletişim" }]),
      ]} />
      <section className="bg-[#122032] py-16 text-white md:py-20">
        <div className="mx-auto max-w-[1440px] px-4 md:px-6 lg:px-8">
          <h1 className="text-3xl font-bold md:text-4xl">{pageData?.sections?.hero?.title || "İletişim"}</h1>

          <p className="mt-3 max-w-2xl text-gray-300">{pageData?.sections?.hero?.content || "Bize ulaşın, size en kısa sürede dönüş yapalım"}</p>

          <Breadcrumb items={[{ label: "İletişim" }]} />
        </div>
      </section>

      <section className="py-16 md:py-20 lg:py-24">
        <div className="mx-auto grid max-w-[1440px] gap-12 px-4 md:px-6 lg:grid-cols-2 lg:px-8">
          {/* İletişim Bilgileri */}
          <div>
            <div className="space-y-4">
              <div className="group rounded-xl border-2 border-gray-100 bg-gradient-to-br from-white to-gray-50 p-6 transition-all hover:border-[#e3000f] hover:shadow-lg">
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-[#e3000f] to-[#c5000d] text-white shadow-lg">
                    <MapPin className="h-6 w-6" />
                  </div>
                  <div className="flex-1">
                    <p className="text-lg font-bold text-[#122032]">Adres</p>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">Kaynarca Mah. Bahattin Veled Cad. No:37<br/>34890 Pendik / İstanbul</p>
                  </div>
                </div>
              </div>
              <div className="group rounded-xl border-2 border-gray-100 bg-gradient-to-br from-white to-gray-50 p-6 transition-all hover:border-[#e3000f] hover:shadow-lg">
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-[#e3000f] to-[#c5000d] text-white shadow-lg">
                    <Phone className="h-6 w-6" />
                  </div>
                  <div className="flex-1">
                    <p className="text-lg font-bold text-[#122032]">Telefon</p>
                    <div className="mt-2 space-y-1">
                      <p className="text-sm"><a href="tel:4447436" className="font-semibold text-[#e3000f] hover:underline">444 7 436</a></p>
                      <p className="text-sm"><a href="tel:02164945337" className="text-muted-foreground hover:text-[#e3000f]">0216 494 53 37</a></p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="group rounded-xl border-2 border-gray-100 bg-gradient-to-br from-white to-gray-50 p-6 transition-all hover:border-[#e3000f] hover:shadow-lg">
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-[#e3000f] to-[#c5000d] text-white shadow-lg">
                    <Mail className="h-6 w-6" />
                  </div>
                  <div className="flex-1">
                    <p className="text-lg font-bold text-[#122032]">E-Posta</p>
                    <p className="mt-2 text-sm"><a href="mailto:info@kozcuoglunakliyat.com.tr" className="text-[#e3000f] hover:underline">info@kozcuoglunakliyat.com.tr</a></p>
                  </div>
                </div>
              </div>
            </div>

            <a href="https://wa.me/905321384979?text=Merhaba" target="_blank" rel="noopener noreferrer" className="mt-6 flex items-center justify-center gap-3 rounded-xl bg-[#25D366] px-8 py-4 text-base font-semibold text-white shadow-lg transition-all hover:bg-[#128C7E] hover:shadow-xl">
              <MessageCircle className="h-5 w-5" /> WhatsApp ile Hemen Yazın
            </a>
          </div>

          {/* Form — Client Component */}
          <ContactForm />
        </div>
      </section>

      {/* Google Maps */}
      <section className="bg-[#f5f5f5]">
        <iframe
          src={mapUrl}
          width="100%"
          height="400"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Kozcuoğlu Nakliyat Konum"
          className="w-full"
        />
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
