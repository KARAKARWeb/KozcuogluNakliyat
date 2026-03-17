import { PrismaClient } from "@prisma/client";
import * as bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seeding database...");

  // Create admin user
  const hashedPassword = await bcrypt.hash("admin123", 10);
  
  const admin = await prisma.user.upsert({
    where: { email: "admin@kozcuoglunakliyat.com.tr" },
    update: {},
    create: {
      email: "admin@kozcuoglunakliyat.com.tr",
      name: "Admin User",
      password: hashedPassword,
      role: "ADMIN",
      isActive: true,
    },
  });

  console.log("✅ Admin user created:", admin.email);

  // Create sample blog posts
  const blogs = await Promise.all([
    prisma.blog.upsert({
      where: { slug: "ankara-nakliyat-rehberi" },
      update: {},
      create: {
        title: "Ankara Nakliyat Rehberi 2024",
        slug: "ankara-nakliyat-rehberi",
        excerpt: "Ankara'da nakliyat hizmeti alırken dikkat etmeniz gereken tüm detaylar",
        content: "Ankara'da nakliyat hizmeti alırken dikkat edilmesi gereken önemli noktalar...",
        category: "Rehber",
        tags: ["ankara", "nakliyat", "rehber"],
        author: "Kozcuoğlu Nakliyat",
        isPublished: true,
        publishedAt: new Date(),
      },
    }),
    prisma.blog.upsert({
      where: { slug: "ev-tasima-kontrol-listesi" },
      update: {},
      create: {
        title: "Ev Taşıma Kontrol Listesi",
        slug: "ev-tasima-kontrol-listesi",
        excerpt: "Ev taşırken unutmamanız gereken tüm adımlar",
        content: "Ev taşıma sürecinde yapılması gerekenler...",
        category: "İpuçları",
        tags: ["ev taşıma", "kontrol listesi", "ipuçları"],
        author: "Kozcuoğlu Nakliyat",
        isPublished: true,
        publishedAt: new Date(),
      },
    }),
  ]);

  console.log(`✅ ${blogs.length} blog posts created`);

  // Create sample services
  const services = await Promise.all([
    prisma.service.upsert({
      where: { slug: "ev-tasima" },
      update: {},
      create: {
        title: "Ev Taşıma",
        slug: "ev-tasima",
        excerpt: "Profesyonel ev taşıma hizmeti",
        content: "Ev eşyalarınızı güvenle taşıyoruz...",
        category: "Bireysel",
        order: 1,
        isActive: true,
      },
    }),
    prisma.service.upsert({
      where: { slug: "ofis-tasima" },
      update: {},
      create: {
        title: "Ofis Taşıma",
        slug: "ofis-tasima",
        excerpt: "Kurumsal ofis taşıma hizmeti",
        content: "Ofis eşyalarınızı profesyonelce taşıyoruz...",
        category: "Kurumsal",
        order: 2,
        isActive: true,
      },
    }),
  ]);

  console.log(`✅ ${services.length} services created`);

  // Create sample regions
  const regions = await Promise.all([
    prisma.region.upsert({
      where: { slug: "ankara-cankaya-nakliyat" },
      update: {},
      create: {
        title: "Çankaya Nakliyat",
        slug: "ankara-cankaya-nakliyat",
        district: "Çankaya",
        content: "Çankaya bölgesinde profesyonel nakliyat hizmeti...",
        type: "DISTRICT",
        isActive: true,
      },
    }),
    prisma.region.upsert({
      where: { slug: "ankara-kecioren-nakliyat" },
      update: {},
      create: {
        title: "Keçiören Nakliyat",
        slug: "ankara-kecioren-nakliyat",
        district: "Keçiören",
        content: "Keçiören bölgesinde güvenilir nakliyat hizmeti...",
        type: "DISTRICT",
        isActive: true,
      },
    }),
  ]);

  console.log(`✅ ${regions.length} regions created`);

  // Create settings
  const settings = await prisma.setting.upsert({
    where: { key: "site_settings" },
    update: {},
    create: {
      key: "site_settings",
      value: {
        siteName: "Kozcuoğlu Nakliyat",
        siteUrl: "https://kozcuoglunakliyat.com.tr",
        phone: "+90 545 181 4040",
        email: "info@karakar.web.tr",
        address: "Ankara, Türkiye",
      },
    },
  });

  console.log("✅ Settings created");

  console.log("🎉 Seeding completed successfully!");
}

main()
  .catch((e) => {
    console.error("❌ Seeding failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
