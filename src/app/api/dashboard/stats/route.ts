import { NextResponse } from "next/server";
import { readData } from "@/lib/db";
import type { BlogPost, Service, Region, Message, Review, SurveyRequest } from "@/types";

export async function GET() {
  try {
    const [blogs, services, regions, messages, reviews, surveys] = await Promise.all([
      readData<BlogPost[]>("blog-posts.json"),
      readData<Service[]>("services.json"),
      readData<Region[]>("regions.json"),
      readData<Message[]>("messages.json"),
      readData<Review[]>("reviews.json"),
      readData<SurveyRequest[]>("survey-requests.json"),
    ]);

    // Calculate monthly data (last 6 months)
    const now = new Date();
    const monthlyData = [];
    
    for (let i = 5; i >= 0; i--) {
      const month = new Date(now.getFullYear(), now.getMonth() - i, 1);
      const monthName = month.toLocaleDateString('tr-TR', { month: 'short' });
      
      // Simulate traffic data (in production, get from analytics)
      monthlyData.push({
        month: monthName,
        ziyaretci: Math.floor(Math.random() * 3000) + 3000,
        teklif: Math.floor(Math.random() * 200) + 200,
        dönüşüm: Math.floor(Math.random() * 3) + 6,
      });
    }

    // Category distribution
    const categoryData = [
      { name: 'Evden Eve', value: services.filter(s => s.slug?.includes('evden-eve')).length, color: '#0088FE' },
      { name: 'Kurumsal', value: services.filter(s => s.slug?.includes('kurumsal')).length, color: '#00C49F' },
      { name: 'Depolama', value: services.filter(s => s.slug?.includes('depolama')).length, color: '#FFBB28' },
      { name: 'Paketleme', value: services.filter(s => s.slug?.includes('paketleme')).length, color: '#FF8042' },
    ];

    // Region data
    const regionData = regions
      .slice(0, 5)
      .map(r => ({
        region: r.title,
        count: Math.floor(Math.random() * 30) + 15,
      }));

    return NextResponse.json({
      success: true,
      data: {
        stats: {
          blogs: blogs.length,
          services: services.length,
          regions: regions.length,
          messages: messages.length,
          reviews: reviews.length,
          surveys: surveys.length,
          unreadMessages: messages.filter(m => m.status === 'unread').length,
          pendingReviews: reviews.filter(r => r.status === 'pending').length,
        },
        charts: {
          monthly: monthlyData,
          categories: categoryData,
          regions: regionData,
        },
      },
    });
  } catch (error) {
    console.error('Dashboard stats error:', error);
    return NextResponse.json(
      { success: false, error: 'İstatistikler alınamadı' },
      { status: 500 }
    );
  }
}
