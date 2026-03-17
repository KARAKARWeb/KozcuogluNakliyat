"use client";

import Link from "next/link";
import Image from "next/image";
import { Clock, Calendar } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface RelatedPost {
  id: string;
  title: string;
  slug: string;
  excerpt?: string;
  image?: string;
  category?: string;
  readTime?: number;
  publishedAt?: string;
}

interface RelatedPostsWidgetProps {
  posts: RelatedPost[];
  currentPostId: string;
}

export function RelatedPostsWidget({ posts, currentPostId }: RelatedPostsWidgetProps) {
  const relatedPosts = posts.filter(p => p.id !== currentPostId).slice(0, 3);

  if (relatedPosts.length === 0) return null;

  return (
    <div className="space-y-4">
      <h3 className="text-xl font-bold">İlgili Yazılar</h3>
      <div className="grid gap-4 md:grid-cols-3">
        {relatedPosts.map((post) => (
          <Link key={post.id} href={`/blog/${post.slug}`}>
            <Card className="h-full transition-shadow hover:shadow-lg">
              {post.image && (
                <div className="relative aspect-video w-full overflow-hidden rounded-t-lg">
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    className="object-cover"
                  />
                </div>
              )}
              <CardContent className="p-4">
                {post.category && (
                  <span className="text-xs font-medium text-primary">{post.category}</span>
                )}
                <h4 className="mt-2 font-semibold line-clamp-2">{post.title}</h4>
                {post.excerpt && (
                  <p className="mt-2 text-sm text-muted-foreground line-clamp-2">{post.excerpt}</p>
                )}
                <div className="mt-3 flex items-center gap-3 text-xs text-muted-foreground">
                  {post.readTime && (
                    <span className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {post.readTime} dk
                    </span>
                  )}
                  {post.publishedAt && (
                    <span className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      {new Date(post.publishedAt).toLocaleDateString('tr-TR')}
                    </span>
                  )}
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
