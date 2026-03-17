"use client";

import { useState, useEffect } from "react";
import NextImage from "next/image";
import type { GalleryItem } from "@/types";
import Breadcrumb from "@/components/site/breadcrumb";
import JsonLd from "@/components/site/json-ld";
import { breadcrumbSchema, gallerySchema } from "@/lib/schemas";
import { Image as ImageIcon, Video } from "lucide-react";
import { LightboxImageViewer } from "@/components/site/lightbox-image-viewer";

export default function GaleriPage() {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [pageData, setPageData] = useState<any>(null);
  const [images, setImages] = useState<GalleryItem[]>([]);
  const [videos, setVideos] = useState<GalleryItem[]>([]);

  // Load data
  useEffect(() => {
    Promise.all([
      fetch('/api/pages/galeri').then(r => r.json()).then(d => d.data).catch(() => null),
      fetch('/api/gallery').then(r => r.json()).then(d => d.data || []).catch(() => [])
    ]).then(([pd, gallery]) => {
      setPageData(pd);
      const active = gallery.filter((g: GalleryItem) => g.isActive).sort((a: GalleryItem, b: GalleryItem) => a.order - b.order);
      setImages(active.filter((g: GalleryItem) => g.type === "image"));
      setVideos(active.filter((g: GalleryItem) => g.type === "video"));
    });
  }, []);

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  return (
    <>
      <JsonLd data={[
        breadcrumbSchema([{ name: "Kozcuoğlu Nakliyat", url: "/" }, { name: "Galeri" }]),
        gallerySchema(
          images.map((g) => ({ name: g.title, url: g.url, description: g.title })),
          videos.map((g) => ({ name: g.title, embedUrl: g.url }))
        ),
      ]} />
      <section className="bg-[#122032] py-16 text-white md:py-20">
        <div className="mx-auto max-w-[1440px] px-4 md:px-6 lg:px-8">
          <h1 className="text-3xl font-bold md:text-4xl">{pageData?.sections?.hero?.title || "Galeri"}</h1>

          <p className="mt-3 max-w-2xl text-gray-300">{pageData?.sections?.hero?.content || "Taşıma süreçlerimizden kareler"}</p>

          <Breadcrumb items={[{ label: "Galeri" }]} />
        </div>
      </section>

      <section className="py-16 md:py-20 lg:py-24">
        <div className="mx-auto max-w-[1440px] px-4 md:px-6 lg:px-8">
          {images.length > 0 && (
            <>
              <h2 className="mb-6 flex items-center gap-2 text-2xl font-bold text-[#122032]"><ImageIcon className="h-6 w-6" /> Fotoğraflar</h2>
              <div className="grid gap-4 grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                {images.map((g, index) => (
                  <div key={g.id} className="group overflow-hidden rounded-xl border bg-[#f5f5f5] cursor-pointer" onClick={() => openLightbox(index)}>
                    <div className="relative aspect-square overflow-hidden">
                      <NextImage src={g.url} alt={g.title} fill sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw" className="object-cover transition group-hover:scale-105" loading="lazy" />
                    </div>
                    <div className="p-3">
                      <p className="truncate text-sm font-medium text-[#122032]">{g.title}</p>
                    </div>
                  </div>
                ))}
              </div>

              {lightboxOpen && (
                <LightboxImageViewer
                  images={images.map(g => ({ src: g.url, alt: g.title, title: g.title }))}
                  initialIndex={lightboxIndex}
                  onClose={() => setLightboxOpen(false)}
                />
              )}
            </>
          )}

          {videos.length > 0 && (
            <div className="mt-12">
              <h2 className="mb-6 flex items-center gap-2 text-2xl font-bold text-[#122032]"><Video className="h-6 w-6" /> Videolar</h2>
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {videos.map((g) => (
                  <div key={g.id} className="overflow-hidden rounded-xl border bg-white shadow-sm">
                    <div className="aspect-video bg-[#f5f5f5]">
                      {g.url.includes("youtube") || g.url.includes("youtu.be") ? (
                        <iframe src={g.url} title={g.title} className="h-full w-full" allowFullScreen />
                      ) : (
                        <video src={g.url} controls className="h-full w-full object-cover" />
                      )}
                    </div>
                    <div className="p-4">
                      <p className="font-medium text-[#122032]">{g.title}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {images.length === 0 && videos.length === 0 && <p className="py-12 text-center text-muted-foreground">Henüz galeri öğesi yok</p>}
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
