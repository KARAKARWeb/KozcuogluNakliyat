"use client";

import Link from "next/link";
import Image from "next/image";
import { Calendar, ArrowRight, TrendingUp } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface ContentItem {
  id: string;
  title: string;
  excerpt?: string;
  image?: string;
  url: string;
  date?: string;
  category?: string;
}

export function RelatedPosts({ posts }: { posts: ContentItem[] }) {
  if (posts.length === 0) return null;

  return (
    <section className="py-12">
      <h2 className="text-2xl font-bold mb-6">İlgili Yazılar</h2>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <Link key={post.id} href={post.url} className="group">
            <Card className="h-full transition-shadow hover:shadow-lg">
              {post.image && (
                <div className="relative h-48 w-full overflow-hidden rounded-t-lg">
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    className="object-cover transition-transform group-hover:scale-105"
                  />
                </div>
              )}
              <CardHeader>
                <div className="flex items-center gap-2 mb-2">
                  {post.category && (
                    <Badge variant="secondary">{post.category}</Badge>
                  )}
                  {post.date && (
                    <span className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Calendar className="h-3 w-3" />
                      {new Date(post.date).toLocaleDateString("tr-TR")}
                    </span>
                  )}
                </div>
                <CardTitle className="line-clamp-2 group-hover:text-primary transition-colors">
                  {post.title}
                </CardTitle>
              </CardHeader>
              {post.excerpt && (
                <CardContent>
                  <p className="text-sm text-muted-foreground line-clamp-3">
                    {post.excerpt}
                  </p>
                </CardContent>
              )}
            </Card>
          </Link>
        ))}
      </div>
    </section>
  );
}

export function RelatedServices({ services }: { services: ContentItem[] }) {
  if (services.length === 0) return null;

  return (
    <section className="py-12 bg-accent/50">
      <div className="container">
        <h2 className="text-2xl font-bold mb-6">İlgili Hizmetler</h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {services.map((service) => (
            <Link
              key={service.id}
              href={service.url}
              className="group rounded-lg border bg-white p-4 transition-all hover:shadow-md"
            >
              <h3 className="font-semibold mb-2 group-hover:text-primary transition-colors">
                {service.title}
              </h3>
              {service.excerpt && (
                <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
                  {service.excerpt}
                </p>
              )}
              <span className="text-sm text-primary flex items-center gap-1">
                Detaylı Bilgi
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

export function RelatedRegions({ regions }: { regions: ContentItem[] }) {
  if (regions.length === 0) return null;

  return (
    <section className="py-12">
      <h2 className="text-2xl font-bold mb-6">Yakın Bölgeler</h2>
      <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {regions.map((region) => (
          <Link
            key={region.id}
            href={region.url}
            className="rounded-lg border bg-white p-4 text-center transition-all hover:shadow-md hover:border-primary"
          >
            <h3 className="font-semibold">{region.title}</h3>
            {region.excerpt && (
              <p className="text-xs text-muted-foreground mt-1">{region.excerpt}</p>
            )}
          </Link>
        ))}
      </div>
    </section>
  );
}

export function LatestPosts({ posts, limit = 5 }: { posts: ContentItem[]; limit?: number }) {
  const latestPosts = posts.slice(0, limit);

  if (latestPosts.length === 0) return null;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calendar className="h-5 w-5" />
          Son Yazılar
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {latestPosts.map((post) => (
          <Link
            key={post.id}
            href={post.url}
            className="block border-b pb-3 last:border-0 last:pb-0 hover:text-primary transition-colors"
          >
            <h4 className="font-medium text-sm mb-1 line-clamp-2">{post.title}</h4>
            {post.date && (
              <span className="text-xs text-muted-foreground">
                {new Date(post.date).toLocaleDateString("tr-TR")}
              </span>
            )}
          </Link>
        ))}
      </CardContent>
    </Card>
  );
}

export function PopularPosts({ posts, limit = 5 }: { posts: ContentItem[]; limit?: number }) {
  const popularPosts = posts.slice(0, limit);

  if (popularPosts.length === 0) return null;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <TrendingUp className="h-5 w-5" />
          Popüler Yazılar
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {popularPosts.map((post, index) => (
          <Link
            key={post.id}
            href={post.url}
            className="flex gap-3 border-b pb-3 last:border-0 last:pb-0 hover:text-primary transition-colors"
          >
            <span className="flex-shrink-0 flex items-center justify-center w-8 h-8 rounded-full bg-primary text-primary-foreground font-bold text-sm">
              {index + 1}
            </span>
            <div className="flex-1">
              <h4 className="font-medium text-sm line-clamp-2">{post.title}</h4>
              {post.date && (
                <span className="text-xs text-muted-foreground">
                  {new Date(post.date).toLocaleDateString("tr-TR")}
                </span>
              )}
            </div>
          </Link>
        ))}
      </CardContent>
    </Card>
  );
}
