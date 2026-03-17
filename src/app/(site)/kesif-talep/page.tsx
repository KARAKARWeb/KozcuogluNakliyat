import { Metadata } from "next";
import KesifTalepForm from "@/components/site/kesif-talep-form";
import { CheckCircle, Clock, Shield, Phone } from "lucide-react";
import Breadcrumb from "@/components/site/breadcrumb";
import JsonLd from "@/components/site/json-ld";
import { breadcrumbSchema } from "@/lib/schemas";

export const metadata: Metadata = {
  title: "Ücretsiz Keşif Talebi | Kozcuoğlu Nakliyat",
  description: "Profesyonel ekibimiz adresinize gelsin, eşyalarınızı incelesin ve size en uygun fiyat teklifini sunalım. Ücretsiz keşif hizmeti.",
  alternates: { canonical: "/kesif-talep" },
  openGraph: {
    title: "Ücretsiz Keşif Talebi | Kozcuoğlu Nakliyat",
    description: "Profesyonel ekibimiz adresinize gelsin, eşyalarınızı incelesin ve size en uygun fiyat teklifini sunalım. Ücretsiz keşif hizmeti.",
    url: "/kesif-talep",
    type: "website",
  },
};

const FEATURES = [
  {
    icon: CheckCircle,
    title: "Ücretsiz Hizmet",
    description: "Keşif hizmetimiz tamamen ücretsizdir",
  },
  {
    icon: Clock,
    title: "Hızlı Randevu",
    description: "24 saat içinde size dönüş yapıyoruz",
  },
  {
    icon: Shield,
    title: "Profesyonel Ekip",
    description: "Deneyimli uzmanlarımız yerinde inceleme yapar",
  },
  {
    icon: Phone,
    title: "Detaylı Bilgilendirme",
    description: "Tüm süreç hakkında bilgi alırsınız",
  },
];

const PROCESS = [
  { step: 1, title: "Form Doldurun", desc: "Bilgilerinizi ve adres detaylarınızı paylaşın" },
  { step: 2, title: "Randevu Alın", desc: "Size uygun tarih ve saatte randevu oluşturalım" },
  { step: 3, title: "Keşif Yapılsın", desc: "Ekibimiz adresinize gelip eşyalarınızı incelesin" },
  { step: 4, title: "Teklif Alın", desc: "Detaylı ve net fiyat teklifi sunalım" },
];

export default function KesifTalepPage() {
  return (
    <>
      <JsonLd data={[
        breadcrumbSchema([
          { name: "Kozcuoğlu Nakliyat", url: "/" },
          { name: "Keşif Talebi" }
        ]),
      ]} />

      {/* Hero */}
      <section className="bg-gradient-to-br from-[#122032] via-[#1a2d47] to-[#122032] py-16 text-white md:py-20">
        <div className="mx-auto max-w-[1440px] px-4 md:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="text-3xl font-bold md:text-4xl lg:text-5xl">
              Ücretsiz Keşif Talebi
            </h1>
            <p className="mt-4 text-lg text-gray-300 md:text-xl">
              Profesyonel ekibimiz adresinize gelsin, eşyalarınızı incelesin ve size en uygun fiyat teklifini sunalım
            </p>
            <Breadcrumb items={[{ label: "Keşif Talebi" }]} />
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-12 md:py-16">
        <div className="mx-auto max-w-[1440px] px-4 md:px-6 lg:px-8">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {FEATURES.map((feature, i) => (
              <div key={i} className="rounded-xl border bg-white p-6 text-center shadow-sm transition hover:shadow-md">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#e3000f]/10">
                  <feature.icon className="h-7 w-7 text-[#e3000f]" />
                </div>
                <h3 className="mt-4 font-bold text-[#122032]">{feature.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Form Section */}
      <section className="py-12 md:py-16 lg:py-20">
        <div className="mx-auto max-w-[1440px] px-4 md:px-6 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-5">
            {/* Sol Taraf - Süreç */}
            <div className="lg:col-span-2">
              <div className="sticky top-24 space-y-6">
                <div>
                  <h2 className="text-2xl font-bold text-[#122032]">Keşif Süreci Nasıl İşler?</h2>
                  <p className="mt-2 text-muted-foreground">
                    4 basit adımda ücretsiz keşif hizmeti alın ve en uygun teklifi görün
                  </p>
                </div>

                <div className="space-y-4">
                  {PROCESS.map((item) => (
                    <div key={item.step} className="flex gap-4">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#e3000f] text-lg font-bold text-white">
                        {item.step}
                      </div>
                      <div>
                        <h3 className="font-semibold text-[#122032]">{item.title}</h3>
                        <p className="mt-1 text-sm text-muted-foreground">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="rounded-xl border border-[#e3000f]/20 bg-[#fef2f2] p-5">
                  <h3 className="font-bold text-[#122032]">Neden Keşif Önemli?</h3>
                  <ul className="mt-3 space-y-2 text-sm text-[#122032]/80">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-[#e3000f]" />
                      <span>Eşyalarınızın hacmi ve ağırlığı doğru hesaplanır</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-[#e3000f]" />
                      <span>Özel eşyalar için gerekli önlemler belirlenir</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-[#e3000f]" />
                      <span>Bina özellikleri ve taşıma zorluğu tespit edilir</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-[#e3000f]" />
                      <span>En doğru fiyat teklifi sunulur</span>
                    </li>
                  </ul>
                </div>

                <div className="rounded-xl bg-[#122032] p-5 text-white">
                  <h3 className="font-bold">Hemen Arayın</h3>
                  <p className="mt-1 text-sm text-white/70">Telefon ile de keşif randevusu alabilirsiniz</p>
                  <a href="tel:4447436" className="mt-3 block rounded-lg bg-[#e3000f] py-3 text-center font-bold transition hover:bg-[#c5000d]">
                    444 7 436
                  </a>
                </div>
              </div>
            </div>

            {/* Sağ Taraf - Form */}
            <div className="lg:col-span-3">
              <div className="rounded-2xl border-2 border-gray-100 bg-white p-6 shadow-xl md:p-8">
                <div className="mb-6">
                  <h2 className="text-2xl font-bold text-[#122032]">Keşif Talep Formu</h2>
                  <p className="mt-2 text-muted-foreground">
                    Formu doldurun, en kısa sürede sizinle iletişime geçelim
                  </p>
                </div>
                <KesifTalepForm />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-gray-50 py-12 md:py-16">
        <div className="mx-auto max-w-[1440px] px-4 md:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl">
            <h2 className="text-center text-2xl font-bold text-[#122032] md:text-3xl">
              Sıkça Sorulan Sorular
            </h2>
            <div className="mt-8 space-y-4">
              <details className="group rounded-xl border bg-white p-5 shadow-sm">
                <summary className="flex cursor-pointer items-center justify-between font-semibold text-[#122032]">
                  Keşif hizmeti gerçekten ücretsiz mi?
                  <span className="ml-2 text-[#e3000f] transition group-open:rotate-180">▼</span>
                </summary>
                <p className="mt-3 text-sm text-muted-foreground">
                  Evet, keşif hizmetimiz tamamen ücretsizdir. Ekibimiz adresinize gelir, eşyalarınızı inceler ve size detaylı bir fiyat teklifi sunar. Hiçbir ücret talep edilmez.
                </p>
              </details>

              <details className="group rounded-xl border bg-white p-5 shadow-sm">
                <summary className="flex cursor-pointer items-center justify-between font-semibold text-[#122032]">
                  Ne kadar sürede randevu alırım?
                  <span className="ml-2 text-[#e3000f] transition group-open:rotate-180">▼</span>
                </summary>
                <p className="mt-3 text-sm text-muted-foreground">
                  Talebinizi aldıktan sonra 24 saat içinde sizinle iletişime geçip randevu oluşturuyoruz. Acil durumlar için aynı gün randevu da verebiliyoruz.
                </p>
              </details>

              <details className="group rounded-xl border bg-white p-5 shadow-sm">
                <summary className="flex cursor-pointer items-center justify-between font-semibold text-[#122032]">
                  Keşif ne kadar sürer?
                  <span className="ml-2 text-[#e3000f] transition group-open:rotate-180">▼</span>
                </summary>
                <p className="mt-3 text-sm text-muted-foreground">
                  Ev büyüklüğüne göre değişmekle birlikte ortalama 30-45 dakika sürmektedir. Ekibimiz tüm eşyalarınızı detaylı şekilde inceler.
                </p>
              </details>

              <details className="group rounded-xl border bg-white p-5 shadow-sm">
                <summary className="flex cursor-pointer items-center justify-between font-semibold text-[#122032]">
                  Keşif sonrası teklifi kabul etmek zorunda mıyım?
                  <span className="ml-2 text-[#e3000f] transition group-open:rotate-180">▼</span>
                </summary>
                <p className="mt-3 text-sm text-muted-foreground">
                  Hayır, keşif sonrası sunulan teklifi kabul etme zorunluluğunuz yoktur. Teklifi değerlendirip karar verebilirsiniz.
                </p>
              </details>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
