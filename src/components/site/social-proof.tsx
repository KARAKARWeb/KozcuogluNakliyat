"use client";

import { useState } from "react";
import { Star, Quote, Building2, Award, ChevronLeft, ChevronRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";

interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  content: string;
  rating: number;
  image?: string;
  date: string;
}

export function TestimonialsSection({ testimonials }: { testimonials: Testimonial[] }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const next = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const previous = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const current = testimonials[currentIndex];

  return (
    <section className="py-16 bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Müşterilerimiz Ne Diyor?</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Binlerce mutlu müşterimizin deneyimlerini okuyun
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <Card className="relative overflow-hidden">
            <CardContent className="p-8 md:p-12">
              <Quote className="h-12 w-12 text-primary/20 mb-6" />
              
              <div className="mb-6">
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-5 w-5 ${
                        i < current.rating
                          ? "fill-yellow-400 text-yellow-400"
                          : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>
                <p className="text-lg leading-relaxed mb-6">{current.content}</p>
              </div>

              <div className="flex items-center gap-4">
                {current.image && (
                  <div className="relative h-16 w-16 rounded-full overflow-hidden bg-gray-200">
                    <Image
                      src={current.image}
                      alt={current.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                )}
                <div>
                  <p className="font-semibold">{current.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {current.role} - {current.company}
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-between mt-8">
                <Button variant="outline" size="icon" onClick={previous}>
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <div className="flex gap-2">
                  {testimonials.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentIndex(index)}
                      className={`h-2 w-2 rounded-full transition-all ${
                        index === currentIndex
                          ? "bg-primary w-8"
                          : "bg-gray-300"
                      }`}
                    />
                  ))}
                </div>
                <Button variant="outline" size="icon" onClick={next}>
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}

export function TestimonialsGrid({ testimonials }: { testimonials: Testimonial[] }) {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {testimonials.map((testimonial) => (
        <Card key={testimonial.id} className="hover:shadow-lg transition-shadow">
          <CardContent className="p-6">
            <div className="flex gap-1 mb-4">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`h-4 w-4 ${
                    i < testimonial.rating
                      ? "fill-yellow-400 text-yellow-400"
                      : "text-gray-300"
                  }`}
                />
              ))}
            </div>
            <p className="text-sm leading-relaxed mb-4">{testimonial.content}</p>
            <div className="flex items-center gap-3 pt-4 border-t">
              {testimonial.image && (
                <div className="relative h-10 w-10 rounded-full overflow-hidden bg-gray-200">
                  <Image
                    src={testimonial.image}
                    alt={testimonial.name}
                    fill
                    className="object-cover"
                  />
                </div>
              )}
              <div>
                <p className="font-semibold text-sm">{testimonial.name}</p>
                <p className="text-xs text-muted-foreground">{testimonial.company}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

interface CaseStudy {
  id: string;
  title: string;
  client: string;
  industry: string;
  challenge: string;
  solution: string;
  results: string[];
  image?: string;
  metrics: {
    label: string;
    value: string;
  }[];
}

export function CaseStudies({ caseStudies }: { caseStudies: CaseStudy[] }) {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Başarı Hikayeleri</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Müşterilerimizin başarı hikayelerini keşfedin
          </p>
        </div>

        <div className="space-y-8">
          {caseStudies.map((study) => (
            <Card key={study.id} className="overflow-hidden">
              <div className="grid md:grid-cols-2 gap-6">
                {study.image && (
                  <div className="relative h-64 md:h-auto bg-gradient-to-br from-primary/10 to-primary/5">
                    <Image
                      src={study.image}
                      alt={study.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                )}
                <CardContent className="p-6 md:p-8">
                  <Badge className="mb-4">{study.industry}</Badge>
                  <h3 className="text-2xl font-bold mb-2">{study.title}</h3>
                  <p className="text-muted-foreground mb-6">{study.client}</p>

                  <div className="space-y-4 mb-6">
                    <div>
                      <h4 className="font-semibold mb-2">Zorluk</h4>
                      <p className="text-sm text-muted-foreground">{study.challenge}</p>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2">Çözüm</h4>
                      <p className="text-sm text-muted-foreground">{study.solution}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 mb-6">
                    {study.metrics.map((metric, index) => (
                      <div key={index} className="text-center p-4 bg-primary/5 rounded-lg">
                        <div className="text-2xl font-bold text-primary">{metric.value}</div>
                        <div className="text-xs text-muted-foreground">{metric.label}</div>
                      </div>
                    ))}
                  </div>

                  <Button>Detayları Gör</Button>
                </CardContent>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

export function ClientLogos({ logos }: { logos: { name: string; logo: string }[] }) {
  return (
    <section className="py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <h3 className="text-center text-sm font-semibold text-muted-foreground mb-8">
          BİZE GÜVENEN MARKALAR
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8 items-center">
          {logos.map((client) => (
            <div
              key={client.name}
              className="flex items-center justify-center grayscale hover:grayscale-0 transition-all opacity-60 hover:opacity-100"
            >
              <Image
                src={client.logo}
                alt={client.name}
                width={120}
                height={60}
                className="object-contain"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function TrustBadges() {
  const badges = [
    {
      icon: Award,
      title: "15+ Yıl Tecrübe",
      description: "Sektörde güvenilir hizmet",
    },
    {
      icon: Building2,
      title: "10,000+ Taşıma",
      description: "Başarıyla tamamlandı",
    },
    {
      icon: Star,
      title: "4.9/5 Puan",
      description: "Müşteri memnuniyeti",
    },
    {
      icon: Award,
      title: "%100 Sigortalı",
      description: "Güvenli taşımacılık",
    },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {badges.map((badge, index) => {
        const Icon = badge.icon;
        return (
          <Card key={index} className="text-center">
            <CardContent className="p-6">
              <div className="flex justify-center mb-3">
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <Icon className="h-6 w-6 text-primary" />
                </div>
              </div>
              <h4 className="font-bold mb-1">{badge.title}</h4>
              <p className="text-xs text-muted-foreground">{badge.description}</p>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}

export function SocialMediaFeed() {
  const posts = [
    {
      id: "1",
      platform: "instagram",
      image: "/images/social/post1.jpg",
      likes: 234,
      comments: 12,
    },
    {
      id: "2",
      platform: "instagram",
      image: "/images/social/post2.jpg",
      likes: 189,
      comments: 8,
    },
    {
      id: "3",
      platform: "instagram",
      image: "/images/social/post3.jpg",
      likes: 312,
      comments: 15,
    },
    {
      id: "4",
      platform: "instagram",
      image: "/images/social/post4.jpg",
      likes: 267,
      comments: 11,
    },
  ];

  return (
    <section className="py-12">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h3 className="text-2xl font-bold mb-2">Bizi Takip Edin</h3>
          <p className="text-muted-foreground">@kozcuoglunakliyat</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {posts.map((post) => (
            <a
              key={post.id}
              href="https://instagram.com/kozcuoglunakliyat"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative aspect-square overflow-hidden rounded-lg bg-gray-200"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-primary/5" />
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4 text-white">
                <div className="flex items-center gap-1">
                  <Star className="h-5 w-5 fill-white" />
                  <span className="font-semibold">{post.likes}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Quote className="h-5 w-5" />
                  <span className="font-semibold">{post.comments}</span>
                </div>
              </div>
            </a>
          ))}
        </div>

        <div className="text-center mt-6">
          <Button variant="outline" asChild>
            <a
              href="https://instagram.com/kozcuoglunakliyat"
              target="_blank"
              rel="noopener noreferrer"
            >
              Instagram'da Takip Et
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
}

export function LiveActivityFeed() {
  const activities = [
    { name: "Ahmet Y.", action: "Ankara'dan İstanbul'a taşındı", time: "2 dakika önce" },
    { name: "Mehmet K.", action: "Fiyat teklifi aldı", time: "5 dakika önce" },
    { name: "Ayşe D.", action: "Ofis taşıma rezervasyonu yaptı", time: "8 dakika önce" },
  ];

  return (
    <div className="fixed bottom-20 left-4 z-40 max-w-xs">
      <Card className="shadow-lg animate-slide-up">
        <CardContent className="p-4">
          <div className="flex items-center gap-2 mb-3">
            <div className="h-2 w-2 bg-green-500 rounded-full animate-pulse" />
            <span className="text-sm font-semibold">Canlı Aktivite</span>
          </div>
          <div className="space-y-2">
            {activities.slice(0, 1).map((activity, index) => (
              <div key={index} className="text-sm">
                <p>
                  <strong>{activity.name}</strong> {activity.action}
                </p>
                <p className="text-xs text-muted-foreground">{activity.time}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
