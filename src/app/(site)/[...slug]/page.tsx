import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { readData } from "@/lib/db";
import type { BlogPost } from "@/types";
import Breadcrumb from "@/components/site/breadcrumb";
import JsonLd from "@/components/site/json-ld";
import { articleSchema, breadcrumbSchema } from "@/lib/schemas";
import { Calendar, ArrowLeft, Tag } from "lucide-react";
import ContentSidebar from "@/components/site/content-sidebar";
import BlogTOC from "@/components/site/blog-toc";
import { ShareButtonsFull } from "@/components/site/share-buttons-full";
import { RelatedPostsWidget } from "@/components/site/related-posts-widget";
import { CommentFormList } from "@/components/site/comment-form-list";
import { ExecutiveSummary } from "@/components/site/executive-summary";
import type { Metadata } from "next";

async function findBlogPost(slugParts: string[]): Promise<BlogPost | null> {
  const fullSlug = slugParts.join("/");
  const cleanSlug = fullSlug.replace(/\.html$/, "");
  
  // Blog URL'leri /blog/slug formatında geliyor, sadece slug kısmını al
  const blogSlug = slugParts[0] === "blog" && slugParts.length > 1 ? slugParts[1] : cleanSlug;
  
  const posts = await readData<BlogPost[]>("blog-posts.json");
  return posts.find((p) => p.slug === blogSlug && p.isPublished) || null;
}

async function getRelatedPosts(currentSlug: string, category: string): Promise<BlogPost[]> {
  const posts = await readData<BlogPost[]>("blog-posts.json");
  return posts
    .filter((p) => p.isPublished && p.slug !== currentSlug && p.category === category)
    .slice(0, 3);
}

async function getComments(postSlug: string) {
  try {
    const comments = await readData<any[]>("comments.json").catch(() => []);
    return comments.filter((c) => c.pageSlug === postSlug);
  } catch {
    return [];
  }
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string[] }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = await findBlogPost(slug);
  if (!post) return { title: "Sayfa Bulunamadı" };
  
  // Blog URL'leri için canonical URL'i düzelt
  const canonicalPath = slug[0] === "blog" ? `/blog/${slug[1]}` : `/${slug.join("/")}`;
  
  return {
    title: post.seo?.title || post.title,
    description: post.seo?.description || post.excerpt,
    alternates: { canonical: canonicalPath },
    openGraph: {
      title: post.seo?.title || post.title,
      description: post.seo?.description || post.excerpt,
      url: canonicalPath,
      type: "article",
      publishedTime: post.publishedAt || post.createdAt,
      modifiedTime: post.updatedAt || post.createdAt,
      authors: [post.author || "Kozcuoğlu Nakliyat"],
      ...(post.image ? { images: [{ url: post.image, width: 1200, height: 630, alt: post.title }] } : {}),
      ...(post.category ? { section: post.category } : {}),
      ...(post.tags ? { tags: post.tags } : {}),
    },
  };
}

export const dynamicParams = true;

export async function generateStaticParams() {
  const posts = await readData<BlogPost[]>("blog-posts.json");
  return posts.filter((p) => p.isPublished).map((p) => ({ slug: [p.slug] }));
}

export default async function CatchAllPage({ params }: { params: Promise<{ slug: string[] }> }) {
  const { slug } = await params;
  const post = await findBlogPost(slug);
  if (!post) notFound();

  const relatedPosts = await getRelatedPosts(post.slug, post.category);
  const comments = await getComments(post.slug);
  const postUrl = `https://kozcuoglunakliyat.com.tr/${slug.join("/")}`;

  return (
    <>
      <JsonLd data={[
        articleSchema({
          headline: post.title,
          description: post.excerpt,
          url: `/${slug.join("/")}`,
          image: post.image || undefined,
          datePublished: post.publishedAt || post.createdAt,
          dateModified: post.updatedAt || post.createdAt,
          author: post.author || undefined,
        }),
        breadcrumbSchema([
          { name: "Kozcuoğlu Nakliyat", url: "/" },
          { name: "Blog", url: "/blog" },
          { name: post.title },
        ]),
      ]} />
      {/* Hero */}
      <section className="bg-[#122032] py-16 text-white md:py-20">
        <div className="mx-auto max-w-[1440px] px-4 md:px-6 lg:px-8">
          <h1 className="text-3xl font-bold md:text-4xl">{post.title}</h1>
          <div className="mt-4 flex flex-wrap items-center gap-4 text-sm text-gray-300">
            <time dateTime={post.publishedAt || post.createdAt} className="flex items-center gap-1"><Calendar className="h-4 w-4" />{new Date(post.publishedAt || post.createdAt).toLocaleDateString("tr-TR")}</time>
            {post.author && <span>Yazar: {post.author}</span>}
            {post.category && <span className="flex items-center gap-1"><Tag className="h-4 w-4" />{post.category}</span>}
          </div>
          <Breadcrumb items={[{ label: "Blog", href: "/blog" }, { label: post.title }]} />
        </div>
      </section>

      {/* Icerik */}
      <section className="py-16 md:py-20 lg:py-24">
        <div className="mx-auto grid max-w-[1440px] gap-8 px-4 md:px-6 lg:grid-cols-[1fr_320px] lg:px-8">
          <article>
            {post.image && (
              <div className="relative mb-8 aspect-video overflow-hidden rounded-xl">
                <Image src={post.image} alt={post.title} fill sizes="(max-width: 1024px) 100vw, 720px" className="object-cover" priority />
              </div>
            )}
            
            {post.excerpt && (
              <ExecutiveSummary 
                summary={post.excerpt}
                keyTakeaways={post.tags?.slice(0, 3).map(tag => `${tag} hakkında detaylı bilgi`)}
              />
            )}
            
            <div
              className="prose max-w-none prose-headings:text-[#122032] prose-headings:font-bold prose-h2:text-2xl prose-h2:mt-8 prose-h2:mb-3 prose-h3:text-xl prose-h3:mt-6 prose-h3:mb-2 prose-p:text-[#122032] prose-p:leading-relaxed prose-a:text-[#e3000f] prose-a:underline prose-img:rounded-lg"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />

            {post.tags && post.tags.length > 0 && (
              <div className="mt-8 border-t pt-6">
                <p className="mb-2 text-sm font-semibold text-[#122032]">Etiketler</p>
                <div className="flex flex-wrap gap-2">
                  {post.tags.map((tag) => (
                    <span key={tag} className="rounded-full bg-[#f5f5f5] px-3 py-1 text-xs font-medium text-muted-foreground">{tag}</span>
                  ))}
                </div>
              </div>
            )}

            {/* Share Buttons */}
            <div className="mt-8 border-t pt-6">
              <ShareButtonsFull
                url={postUrl}
                title={post.title}
                description={post.excerpt}
              />
            </div>

            {/* Related Posts */}
            {relatedPosts.length > 0 && (
              <div className="mt-8">
                <RelatedPostsWidget posts={relatedPosts} currentPostId={post.id} />
              </div>
            )}

            {/* Comments */}
            <div className="mt-8">
              <CommentFormList
                pageSlug={post.slug}
                comments={comments}
              />
            </div>

            <div className="mt-8">
              <Link href="/blog" className="inline-flex items-center gap-2 text-sm font-medium text-[#e3000f] hover:underline">
                <ArrowLeft className="h-4 w-4" /> Tüm Yazılar
              </Link>
            </div>
          </article>

          {/* Sidebar */}
          <aside className="space-y-6">
            <BlogTOC content={post.content} />
            <ContentSidebar />
          </aside>
        </div>
      </section>
    </>
  );
}
