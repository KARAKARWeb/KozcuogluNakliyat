/**
 * JSON Data to PostgreSQL Migration Script
 * Mevcut JSON dosyalarındaki verileri PostgreSQL'e taşır
 */

import { PrismaClient } from "@prisma/client";
import fs from "fs";
import path from "path";

const prisma = new PrismaClient();
const DATA_DIR = path.join(process.cwd(), "data");

interface JsonBlog {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  image?: string;
  category: string;
  tags?: string[];
  author: string;
  isPublished: boolean;
  publishedAt?: string;
  createdAt: string;
  updatedAt: string;
}

async function migrateBlogs() {
  const filePath = path.join(DATA_DIR, "blog.json");
  if (!fs.existsSync(filePath)) {
    console.log("⏭️  blog.json not found, skipping...");
    return 0;
  }

  const data: JsonBlog[] = JSON.parse(fs.readFileSync(filePath, "utf-8"));
  let count = 0;

  for (const item of data) {
    await prisma.blog.upsert({
      where: { slug: item.slug },
      update: {
        title: item.title,
        excerpt: item.excerpt,
        content: item.content,
        image: item.image,
        category: item.category,
        tags: item.tags || [],
        author: item.author,
        isPublished: item.isPublished,
        publishedAt: item.publishedAt ? new Date(item.publishedAt) : null,
        updatedAt: new Date(item.updatedAt),
      },
      create: {
        id: item.id,
        title: item.title,
        slug: item.slug,
        excerpt: item.excerpt,
        content: item.content,
        image: item.image,
        category: item.category,
        tags: item.tags || [],
        author: item.author,
        isPublished: item.isPublished,
        publishedAt: item.publishedAt ? new Date(item.publishedAt) : null,
        createdAt: new Date(item.createdAt),
        updatedAt: new Date(item.updatedAt),
      },
    });
    count++;
  }

  return count;
}

async function migrateServices() {
  const filePath = path.join(DATA_DIR, "services.json");
  if (!fs.existsSync(filePath)) {
    console.log("⏭️  services.json not found, skipping...");
    return 0;
  }

  const data = JSON.parse(fs.readFileSync(filePath, "utf-8"));
  let count = 0;

  for (const item of data) {
    await prisma.service.upsert({
      where: { slug: item.slug },
      update: {
        title: item.title,
        excerpt: item.excerpt,
        content: item.content,
        image: item.image,
        icon: item.icon,
        category: item.category,
        order: item.order || 0,
        isActive: item.isActive ?? true,
        updatedAt: new Date(item.updatedAt || item.createdAt),
      },
      create: {
        id: item.id,
        title: item.title,
        slug: item.slug,
        excerpt: item.excerpt,
        content: item.content,
        image: item.image,
        icon: item.icon,
        category: item.category,
        order: item.order || 0,
        isActive: item.isActive ?? true,
        createdAt: new Date(item.createdAt),
        updatedAt: new Date(item.updatedAt || item.createdAt),
      },
    });
    count++;
  }

  return count;
}

async function migrateSolutions() {
  const filePath = path.join(DATA_DIR, "solutions.json");
  if (!fs.existsSync(filePath)) {
    console.log("⏭️  solutions.json not found, skipping...");
    return 0;
  }

  const data = JSON.parse(fs.readFileSync(filePath, "utf-8"));
  let count = 0;

  for (const item of data) {
    await prisma.solution.upsert({
      where: { slug: item.slug },
      update: {
        title: item.title,
        content: item.content,
        image: item.image,
        order: item.order || 0,
        isActive: item.isActive ?? true,
        updatedAt: new Date(item.updatedAt || item.createdAt),
      },
      create: {
        id: item.id,
        title: item.title,
        slug: item.slug,
        content: item.content,
        image: item.image,
        order: item.order || 0,
        isActive: item.isActive ?? true,
        createdAt: new Date(item.createdAt),
        updatedAt: new Date(item.updatedAt || item.createdAt),
      },
    });
    count++;
  }

  return count;
}

async function migrateRegions() {
  const filePath = path.join(DATA_DIR, "regions.json");
  if (!fs.existsSync(filePath)) {
    console.log("⏭️  regions.json not found, skipping...");
    return 0;
  }

  const data = JSON.parse(fs.readFileSync(filePath, "utf-8"));
  let count = 0;

  for (const item of data) {
    await prisma.region.upsert({
      where: { slug: item.slug },
      update: {
        title: item.title,
        district: item.district,
        content: item.content,
        type: item.type === "intercity" ? "INTERCITY" : "DISTRICT",
        isActive: item.isActive ?? true,
        updatedAt: new Date(item.updatedAt || item.createdAt),
      },
      create: {
        id: item.id,
        title: item.title,
        slug: item.slug,
        district: item.district,
        content: item.content,
        type: item.type === "intercity" ? "INTERCITY" : "DISTRICT",
        isActive: item.isActive ?? true,
        createdAt: new Date(item.createdAt),
        updatedAt: new Date(item.updatedAt || item.createdAt),
      },
    });
    count++;
  }

  return count;
}

async function migratePages() {
  const filePath = path.join(DATA_DIR, "pages.json");
  if (!fs.existsSync(filePath)) {
    console.log("⏭️  pages.json not found, skipping...");
    return 0;
  }

  const data = JSON.parse(fs.readFileSync(filePath, "utf-8"));
  let count = 0;

  for (const item of data) {
    await prisma.page.upsert({
      where: { slug: item.slug },
      update: {
        title: item.title,
        content: item.content || "",
        sections: item.sections || {},
        seoTitle: item.seoTitle,
        seoDesc: item.seoDesc,
        isActive: item.isActive ?? true,
        updatedAt: new Date(item.updatedAt || item.createdAt),
      },
      create: {
        id: item.id,
        slug: item.slug,
        title: item.title,
        content: item.content || "",
        sections: item.sections || {},
        seoTitle: item.seoTitle,
        seoDesc: item.seoDesc,
        isActive: item.isActive ?? true,
        createdAt: new Date(item.createdAt),
        updatedAt: new Date(item.updatedAt || item.createdAt),
      },
    });
    count++;
  }

  return count;
}

async function migrateSettings() {
  const filePath = path.join(DATA_DIR, "settings.json");
  if (!fs.existsSync(filePath)) {
    console.log("⏭️  settings.json not found, skipping...");
    return 0;
  }

  const data = JSON.parse(fs.readFileSync(filePath, "utf-8"));

  await prisma.setting.upsert({
    where: { key: "site_settings" },
    update: {
      value: data,
      updatedAt: new Date(),
    },
    create: {
      key: "site_settings",
      value: data,
    },
  });

  return 1;
}

async function migrateRedirects() {
  const filePath = path.join(DATA_DIR, "redirects.json");
  if (!fs.existsSync(filePath)) {
    console.log("⏭️  redirects.json not found, skipping...");
    return 0;
  }

  const data = JSON.parse(fs.readFileSync(filePath, "utf-8"));
  let count = 0;

  for (const item of data) {
    await prisma.redirect.upsert({
      where: { source: item.source },
      update: {
        destination: item.destination,
        type: item.type,
        isActive: item.isActive ?? true,
      },
      create: {
        id: item.id,
        source: item.source,
        destination: item.destination,
        type: item.type,
        isActive: item.isActive ?? true,
        createdAt: new Date(item.createdAt || new Date()),
      },
    });
    count++;
  }

  return count;
}

async function main() {
  console.log("🚀 Starting JSON to PostgreSQL migration...\n");

  try {
    const blogs = await migrateBlogs();
    console.log(`✅ Migrated ${blogs} blog posts`);

    const services = await migrateServices();
    console.log(`✅ Migrated ${services} services`);

    const solutions = await migrateSolutions();
    console.log(`✅ Migrated ${solutions} solutions`);

    const regions = await migrateRegions();
    console.log(`✅ Migrated ${regions} regions`);

    const pages = await migratePages();
    console.log(`✅ Migrated ${pages} pages`);

    const settings = await migrateSettings();
    console.log(`✅ Migrated ${settings} settings`);

    const redirects = await migrateRedirects();
    console.log(`✅ Migrated ${redirects} redirects`);

    console.log("\n🎉 Migration completed successfully!");
    console.log("\n⚠️  IMPORTANT: JSON dosyaları hala kullanılıyor.");
    console.log("Database'e geçiş için API route'larını güncellemeniz gerekiyor.");
  } catch (error) {
    console.error("\n❌ Migration failed:", error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

main();
