"use client";

import Link from "next/link";
import Image from "next/image";
import { Star, ArrowRight, Calendar } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import type { Review, Client, BlogPost } from "@/types";

interface Props {
  reviews: Review[];
  avgRating: string;
  clients: Client[];
  recentBlog: BlogPost[];
}

function CountUp({ target, suffix = "" }: { target: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          let start = 0;
          const duration = 2000;
          const step = target / (duration / 16);
          const timer = setInterval(() => {
            start += step;
            if (start >= target) { setCount(target); clearInterval(timer); }
            else setCount(Math.floor(start));
          }, 16);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [target]);

  return <div ref={ref} className="text-4xl font-bold">{count.toLocaleString("tr-TR")}{suffix}</div>;
}

export default function HomeClientSections({ reviews, avgRating, clients, recentBlog }: Props) {
  return (
    <>
      {/* Istatistikler */}
      <section className="bg-[#e3000f] py-16 text-white">
        <div className="mx-auto grid max-w-[1440px] grid-cols-2 gap-8 px-4 text-center md:grid-cols-4 md:px-6 lg:px-8">
          <div><CountUp target={1000} suffix="+" /><p className="mt-1 text-sm text-white/90">Başarılı Taşıma</p></div>
          <div><CountUp target={20} suffix="+" /><p className="mt-1 text-sm text-white/90">Yıl Deneyim</p></div>
          <div><CountUp target={50} suffix="+" /><p className="mt-1 text-sm text-white/90">Araç Filosu</p></div>
          <div><CountUp target={100} suffix="%" /><p className="mt-1 text-sm text-white/90">Memnuniyet</p></div>
        </div>
      </section>

      {/* Musteriler */}
      {clients.length > 0 && (
        <section className="py-16 md:py-20">
          <div className="mx-auto max-w-[1440px] px-4 md:px-6 lg:px-8">
            <div className="mb-10 text-center">
              <h2 className="text-2xl font-bold text-[#122032] md:text-3xl">Referanslarımız</h2>
              <p className="mt-2 text-muted-foreground">Bize güven duyan firmalar</p>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-8">
              {clients.map((c) => (
                <div key={c.id} className="grayscale transition hover:grayscale-0">
                  {c.logo ? (
                    <Image src={c.logo} alt={c.name} width={120} height={40} className="h-10 w-auto object-contain" loading="lazy" />
                  ) : (
                    <span className="text-sm font-medium text-muted-foreground">{c.name}</span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Yorumlar */}
      {reviews.length > 0 && (
        <section className="bg-[#f5f5f5] py-16 md:py-20 lg:py-24">
          <div className="mx-auto max-w-[1440px] px-4 md:px-6 lg:px-8">
            <div className="mb-10 text-center">
              <h2 className="text-2xl font-bold text-[#122032] md:text-3xl">Müşteri Yorumları</h2>
              <div className="mt-2 flex items-center justify-center gap-2">
                <div className="flex gap-0.5">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <span className="font-semibold text-[#122032]">{avgRating}</span>
                <span className="text-sm text-muted-foreground">({reviews.length} yorum)</span>
              </div>
            </div>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {reviews.map((r) => (
                <div key={r.id} className="rounded-xl bg-white p-6 shadow-sm">
                  <div className="flex gap-0.5">
                    {Array.from({ length: r.rating }).map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <div 
                    className="mt-3 text-sm leading-relaxed text-muted-foreground prose prose-sm max-w-none prose-strong:text-[#122032] prose-strong:font-bold prose-em:italic prose-u:underline"
                    dangerouslySetInnerHTML={{ __html: r.comment }}
                  />
                  <div className="mt-4 border-t pt-3">
                    <p className="text-sm font-semibold text-[#122032]">{r.name}</p>
                    <p className="text-xs text-muted-foreground" suppressHydrationWarning>
                      {new Date(r.createdAt).toLocaleDateString("tr-TR")}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Blog Onizleme */}
      {recentBlog.length > 0 && (
        <section className="py-16 md:py-20 lg:py-24">
          <div className="mx-auto max-w-[1440px] px-4 md:px-6 lg:px-8">
            <div className="mb-10 text-center">
              <h2 className="text-2xl font-bold text-[#122032] md:text-3xl">Blog</h2>
              <p className="mt-2 text-muted-foreground">Nakliyat hakkında faydalı içerikler</p>
            </div>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {recentBlog.map((b) => (
                <Link key={b.id} href={`/blog/${b.slug}`} className="group overflow-hidden rounded-xl border bg-white transition hover:shadow-lg">
                  {b.image && (
                    <div className="relative aspect-video overflow-hidden bg-[#f5f5f5]">
                      <Image src={b.image} alt={b.title} fill sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw" className="object-cover transition group-hover:scale-105" loading="lazy" />
                    </div>
                  )}
                  <div className="p-5">
                    <div className="flex items-center gap-2 text-xs text-muted-foreground" suppressHydrationWarning>
                      <Calendar className="h-3.5 w-3.5" />
                      {new Date(b.publishedAt || b.createdAt).toLocaleDateString("tr-TR")}
                      {b.category && <span className="rounded bg-[#f5f5f5] px-2 py-0.5 text-xs">{b.category}</span>}
                    </div>
                    <h3 className="mt-2 font-semibold text-[#122032] group-hover:text-[#e3000f]">{b.title}</h3>
                    <p className="mt-1 text-sm text-muted-foreground">{b.excerpt?.slice(0, 100)}</p>
                  </div>
                </Link>
              ))}
            </div>
            <div className="mt-8 text-center">
              <Link href="/blog" className="inline-flex items-center gap-2 text-sm font-medium text-[#e3000f] hover:underline">
                Tüm Yazılar <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </section>
      )}
    </>
  );
}
