import Link from "next/link";
import Image from "next/image";
import { readData } from "@/lib/db";
import type { Project } from "@/types";
import Breadcrumb from "@/components/site/breadcrumb";
import JsonLd from "@/components/site/json-ld";
import { breadcrumbSchema } from "@/lib/schemas";
import { Calendar, MapPin, Building2 } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Projelerimiz | Kozcuoğlu Nakliyat",
  description: "Kozcuoğlu Nakliyat tamamlanmış projeler. Başarılı nakliyat ve taşımacılık projelerimiz.",
  alternates: { canonical: "/projelerimiz" },
  openGraph: {
    title: "Projelerimiz | Kozcuoğlu Nakliyat",
    description: "Kozcuoğlu Nakliyat tamamlanmış projeler. Başarılı nakliyat ve taşımacılık projelerimiz.",
    url: "/projelerimiz",
    type: "website",
  },
};

export default async function ProjelerimizPage() {
  const activeProjects: Project[] = [];

  return (
    <>
      <JsonLd data={[breadcrumbSchema([{ name: "Kozcuoğlu Nakliyat", url: "/" }, { name: "Projelerimiz" }])]} />
      
      <section className="bg-[#122032] py-16 text-white md:py-20">
        <div className="mx-auto max-w-[1440px] px-4 md:px-6 lg:px-8">
          <h1 className="text-3xl font-bold md:text-4xl">Projelerimiz</h1>
          <p className="mt-3 max-w-2xl text-gray-300">
            Başarıyla tamamladığımız nakliyat ve taşımacılık projeleri
          </p>
          <Breadcrumb items={[{ label: "Projelerimiz" }]} />
        </div>
      </section>

      <section className="py-16 md:py-20 lg:py-24">
        <div className="mx-auto max-w-[1440px] px-4 md:px-6 lg:px-8">
          {activeProjects.length > 0 ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {activeProjects.map((project) => (
                <div key={project.id} className="overflow-hidden rounded-xl border bg-white shadow-sm transition hover:shadow-md">
                  {project.images && project.images[0] && (
                    <div className="relative aspect-video overflow-hidden bg-[#f5f5f5]">
                      <Image 
                        src={project.images[0]} 
                        alt={project.title} 
                        fill 
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw" 
                        className="object-cover" 
                        loading="lazy" 
                      />
                    </div>
                  )}
                  <div className="p-5">
                    <h2 className="text-lg font-bold text-[#122032]">{project.title}</h2>
                    <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">{project.description}</p>
                    
                    <div className="mt-4 space-y-2">
                      {project.serviceType && (
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Building2 className="h-4 w-4" />
                          <span>{project.serviceType}</span>
                        </div>
                      )}
                      {(project.fromLocation || project.toLocation) && (
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <MapPin className="h-4 w-4" />
                          <span>{project.fromLocation} → {project.toLocation}</span>
                        </div>
                      )}
                      {project.completedAt && (
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Calendar className="h-4 w-4" />
                          <span>{new Date(project.completedAt).toLocaleDateString("tr-TR")}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="py-12 text-center">
              <p className="text-muted-foreground">Henüz proje eklenmemiş</p>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
