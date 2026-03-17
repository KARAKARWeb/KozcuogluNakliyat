import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const DATA_DIR = path.join(process.cwd(), "data");

export async function GET(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams;
    const query = searchParams.get("q")?.toLowerCase() || "";

    if (query.length < 2) {
      return NextResponse.json({ results: [] });
    }

    const results: any[] = [];

    // Blog search
    const blogPath = path.join(DATA_DIR, "blog.json");
    if (fs.existsSync(blogPath)) {
      const blogData = JSON.parse(fs.readFileSync(blogPath, "utf-8"));
      blogData.forEach((post: any) => {
        if (
          post.title.toLowerCase().includes(query) ||
          post.excerpt.toLowerCase().includes(query) ||
          post.content.toLowerCase().includes(query)
        ) {
          results.push({
            id: post.id,
            title: post.title,
            excerpt: post.excerpt,
            url: `/${post.slug}.html`,
            type: "blog",
          });
        }
      });
    }

    // Services search
    const servicesPath = path.join(DATA_DIR, "services.json");
    if (fs.existsSync(servicesPath)) {
      const servicesData = JSON.parse(fs.readFileSync(servicesPath, "utf-8"));
      servicesData.forEach((service: any) => {
        if (
          service.title.toLowerCase().includes(query) ||
          service.content.toLowerCase().includes(query)
        ) {
          results.push({
            id: service.id,
            title: service.title,
            excerpt: service.excerpt || service.title,
            url: `/${service.slug}`,
            type: "service",
          });
        }
      });
    }

    // Solutions search
    const solutionsPath = path.join(DATA_DIR, "solutions.json");
    if (fs.existsSync(solutionsPath)) {
      const solutionsData = JSON.parse(fs.readFileSync(solutionsPath, "utf-8"));
      solutionsData.forEach((solution: any) => {
        if (
          solution.title.toLowerCase().includes(query) ||
          solution.content.toLowerCase().includes(query)
        ) {
          results.push({
            id: solution.id,
            title: solution.title,
            excerpt: solution.excerpt || solution.title,
            url: `/${solution.slug}`,
            type: "solution",
          });
        }
      });
    }

    // Regions search
    const regionsPath = path.join(DATA_DIR, "regions.json");
    if (fs.existsSync(regionsPath)) {
      const regionsData = JSON.parse(fs.readFileSync(regionsPath, "utf-8"));
      regionsData.forEach((region: any) => {
        if (
          region.title.toLowerCase().includes(query) ||
          region.district.toLowerCase().includes(query) ||
          region.content.toLowerCase().includes(query)
        ) {
          results.push({
            id: region.id,
            title: region.title,
            excerpt: `${region.district} - ${region.type === "district" ? "İlçe" : "Şehirler Arası"}`,
            url: `/${region.slug}.html`,
            type: "region",
          });
        }
      });
    }

    return NextResponse.json({
      success: true,
      results: results.slice(0, 10),
      total: results.length,
    });
  } catch (error) {
    console.error("Search error:", error);
    return NextResponse.json(
      { success: false, error: "Arama sırasında hata oluştu" },
      { status: 500 }
    );
  }
}
