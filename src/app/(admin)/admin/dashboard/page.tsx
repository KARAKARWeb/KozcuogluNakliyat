import { readData } from "@/lib/db";
import type {
  Service,
  Solution,
  Region,
  BlogPost,
  Review,
  Message,
  SurveyRequest,
  TrackingItem,
  GalleryItem,
  Campaign,
  Log404,
} from "@/types";
import {
  Truck,
  Wrench,
  MapPin,
  FileText,
  Star,
  Mail,
  ClipboardList,
  Package,
  Image,
  Megaphone,
  AlertTriangle,
  Clock,
  MessageSquare,
  ExternalLink,
  Bell,
  Activity,
} from "lucide-react";
import Link from "next/link";
import { TrafficChart, CategoryChart, RegionChart, ConversionChart } from "@/components/admin/dashboard-charts";

interface ActivityLog {
  id: string;
  action: string;
  entity: string;
  entityId?: string;
  details?: string;
  user: string;
  createdAt: string;
}

interface Notification {
  id: string;
  type: "info" | "warning" | "success" | "error";
  title: string;
  message: string;
  link?: string;
  isRead: boolean;
  createdAt: string;
}

async function getDashboardData() {
  const [
    services,
    solutions,
    regions,
    blogPosts,
    reviews,
    messages,
    surveys,
    tracking,
    gallery,
    campaigns,
    logs404,
    activityLogs,
    notifications,
  ] = await Promise.all([
    readData<Service[]>("services.json"),
    readData<Solution[]>("solutions.json"),
    readData<Region[]>("regions.json"),
    readData<BlogPost[]>("blog-posts.json"),
    readData<Review[]>("reviews.json"),
    readData<Message[]>("messages.json"),
    readData<SurveyRequest[]>("survey-requests.json"),
    readData<TrackingItem[]>("tracking.json"),
    readData<GalleryItem[]>("gallery.json"),
    readData<Campaign[]>("campaigns.json"),
    readData<Log404[]>("404-logs.json"),
    readData<ActivityLog[]>("activity-logs.json"),
    readData<Notification[]>("notifications.json"),
  ]);

  return {
    services: services.length,
    solutions: solutions.length,
    regions: regions.length,
    blogPosts: blogPosts.length,
    pendingReviews: reviews.filter((r) => r.status === "pending").length,
    totalReviews: reviews.length,
    unreadMessages: messages.filter((m) => m.status === "unread").length,
    totalMessages: messages.length,
    newSurveys: surveys.filter((s) => s.status === "pending").length,
    totalSurveys: surveys.length,
    activeTracking: tracking.filter((t) => t.status === "active").length,
    galleryCount: gallery.length,
    activeCampaigns: campaigns.filter((c) => c.isActive).length,
    new404: logs404.filter((l) => l.status === "new").length,
    recentMessages: messages
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
      .slice(0, 5),
    recentSurveys: surveys
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
      .slice(0, 5),
    pendingReviewsList: reviews
      .filter((r) => r.status === "pending")
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
      .slice(0, 5),
    recentActivity: activityLogs
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
      .slice(0, 8),
    recentNotifications: notifications
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
      .slice(0, 5),
    unreadNotifications: notifications.filter((n) => !n.isRead).length,
  };
}

export default async function AdminDashboardPage() {
  const data = await getDashboardData();

  const statCards = [
    { label: "Hizmetler", value: data.services, icon: Truck, href: "/admin/services", color: "text-blue-600 bg-blue-50" },
    { label: "Çözümler", value: data.solutions, icon: Wrench, href: "/admin/solutions", color: "text-purple-600 bg-purple-50" },
    { label: "Bölgeler", value: data.regions, icon: MapPin, href: "/admin/regions", color: "text-green-600 bg-green-50" },
    { label: "Blog", value: data.blogPosts, icon: FileText, href: "/admin/blog", color: "text-orange-600 bg-orange-50" },
    { label: "Yorumlar", value: data.totalReviews, icon: Star, href: "/admin/reviews", color: "text-yellow-600 bg-yellow-50" },
    { label: "Mesajlar", value: data.totalMessages, icon: Mail, href: "/admin/messages", color: "text-cyan-600 bg-cyan-50" },
    { label: "Keşif Talepleri", value: `${data.newSurveys}/${data.totalSurveys}`, icon: ClipboardList, href: "/admin/surveys", color: "text-pink-600 bg-pink-50" },
    { label: "Aktif Takip", value: data.activeTracking, icon: Package, href: "/admin/tracking", color: "text-indigo-600 bg-indigo-50" },
    { label: "Galeri", value: data.galleryCount, icon: Image, href: "/admin/gallery", color: "text-teal-600 bg-teal-50" },
    { label: "Kampanyalar", value: data.activeCampaigns, icon: Megaphone, href: "/admin/campaigns", color: "text-red-600 bg-red-50" },
  ];

  const alerts = [
    data.pendingReviews > 0 && { label: `${data.pendingReviews} onay bekleyen yorum`, href: "/admin/reviews", color: "border-yellow-400 bg-yellow-50" },
    data.unreadMessages > 0 && { label: `${data.unreadMessages} okunmamış mesaj`, href: "/admin/messages", color: "border-blue-400 bg-blue-50" },
    data.newSurveys > 0 && { label: `${data.newSurveys} yeni keşif talebi`, href: "/admin/surveys", color: "border-pink-400 bg-pink-50" },
    data.new404 > 0 && { label: `${data.new404} yeni 404 hatası`, href: "/admin/redirects", color: "border-red-400 bg-red-50" },
  ].filter(Boolean) as { label: string; href: string; color: string }[];

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-[#122032]">Dashboard</h1>

      {alerts.length > 0 && (
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {alerts.map((alert) => (
            <Link
              key={alert.href}
              href={alert.href}
              className={`flex items-center gap-2 rounded-lg border-l-4 p-3 text-sm font-medium transition hover:shadow-sm ${alert.color}`}
            >
              <AlertTriangle className="h-4 w-4 shrink-0" />
              {alert.label}
            </Link>
          ))}
        </div>
      )}

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
        {statCards.map((card) => (
          <Link
            key={card.href}
            href={card.href}
            className="flex items-center gap-3 rounded-xl border bg-white p-4 shadow-sm transition hover:shadow-md"
          >
            <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${card.color}`}>
              <card.icon className="h-5 w-5" />
            </div>
            <div>
              <p className="text-2xl font-bold text-[#122032]">{card.value}</p>
              <p className="text-xs text-muted-foreground">{card.label}</p>
            </div>
          </Link>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="rounded-xl border bg-white p-5 shadow-sm">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="font-semibold text-[#122032]">Son Mesajlar</h2>
            <Link href="/admin/messages" className="text-xs text-[#e3000f] hover:underline">
              Tümünü Gör
            </Link>
          </div>
          {data.recentMessages.length === 0 ? (
            <p className="text-sm text-muted-foreground">Henüz mesaj yok</p>
          ) : (
            <div className="space-y-3">
              {data.recentMessages.map((msg) => (
                <div key={msg.id} className="flex items-start gap-2 border-b pb-2 last:border-0">
                  <MessageSquare className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground" />
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium">{msg.name}</p>
                    <p className="truncate text-xs text-muted-foreground">{msg.message}</p>
                  </div>
                  {msg.status === "unread" && (
                    <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-blue-500" />
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="rounded-xl border bg-white p-5 shadow-sm">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="font-semibold text-[#122032]">Onay Bekleyen Yorumlar</h2>
            <Link href="/admin/reviews" className="text-xs text-[#e3000f] hover:underline">
              Tümünü Gör
            </Link>
          </div>
          {data.pendingReviewsList.length === 0 ? (
            <p className="text-sm text-muted-foreground">Onay bekleyen yorum yok</p>
          ) : (
            <div className="space-y-3">
              {data.pendingReviewsList.map((review) => (
                <div key={review.id} className="flex items-start gap-2 border-b pb-2 last:border-0">
                  <Star className="mt-0.5 h-4 w-4 shrink-0 text-yellow-500" />
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium">{review.name}</p>
                    <p className="truncate text-xs text-muted-foreground">{review.comment}</p>
                    <div className="mt-0.5 flex gap-0.5">
                      {Array.from({ length: review.rating }).map((_, i) => (
                        <Star key={i} className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="rounded-xl border bg-white p-5 shadow-sm">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="font-semibold text-[#122032]">Son Keşif Talepleri</h2>
            <Link href="/admin/surveys" className="text-xs text-[#e3000f] hover:underline">
              Tümünü Gör
            </Link>
          </div>
          {data.recentSurveys.length === 0 ? (
            <p className="text-sm text-muted-foreground">Henüz keşif talebi yok</p>
          ) : (
            <div className="space-y-3">
              {data.recentSurveys.map((survey) => (
                <div key={survey.id} className="flex items-start gap-2 border-b pb-2 last:border-0">
                  <Clock className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground" />
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium">{survey.name}</p>
                    <p className="truncate text-xs text-muted-foreground">
                      {survey.fromAddress} &rarr; {survey.toAddress}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-xl border bg-white p-5 shadow-sm">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="flex items-center gap-2 font-semibold text-[#122032]"><Activity className="h-4 w-4" /> Son İşlemler</h2>
          </div>
          {data.recentActivity.length === 0 ? (
            <p className="text-sm text-muted-foreground">Henüz işlem kaydı yok</p>
          ) : (
            <div className="space-y-2">
              {data.recentActivity.map((log) => (
                <div key={log.id} className="flex items-start gap-2 border-b pb-2 last:border-0">
                  <div className="mt-1 h-2 w-2 shrink-0 rounded-full bg-gray-400" />
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm">{log.details || `${log.action} — ${log.entity}`}</p>
                    <p className="text-[10px] text-muted-foreground">{new Date(log.createdAt).toLocaleString("tr-TR")}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="rounded-xl border bg-white p-5 shadow-sm">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="flex items-center gap-2 font-semibold text-[#122032]">
              <Bell className="h-4 w-4" /> Bildirimler
              {data.unreadNotifications > 0 && (
                <span className="rounded-full bg-[#e3000f] px-2 py-0.5 text-[10px] font-bold text-white">{data.unreadNotifications}</span>
              )}
            </h2>
          </div>
          {data.recentNotifications.length === 0 ? (
            <p className="text-sm text-muted-foreground">Henüz bildirim yok</p>
          ) : (
            <div className="space-y-2">
              {data.recentNotifications.map((n) => (
                <div key={n.id} className={`flex items-start gap-2 rounded-lg border p-2 ${!n.isRead ? "border-blue-200 bg-blue-50" : ""}`}>
                  <div className={`mt-1 h-2 w-2 shrink-0 rounded-full ${n.type === "error" ? "bg-red-500" : n.type === "warning" ? "bg-yellow-500" : n.type === "success" ? "bg-green-500" : "bg-blue-500"}`} />
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium">{n.title}</p>
                    <p className="truncate text-xs text-muted-foreground">{n.message}</p>
                    <p className="text-[10px] text-muted-foreground">{new Date(n.createdAt).toLocaleString("tr-TR")}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <TrafficChart />
        <CategoryChart />
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <RegionChart />
        <ConversionChart />
      </div>

      <div className="rounded-xl border bg-white p-5 shadow-sm">
        <h2 className="mb-3 font-semibold text-[#122032]">Hızlı Erişim</h2>
        <div className="flex flex-wrap gap-2">
          {[
            { label: "Hizmet Ekle", href: "/admin/services" },
            { label: "Blog Yazısı Ekle", href: "/admin/blog" },
            { label: "Bölge Ekle", href: "/admin/regions" },
            { label: "Kampanya Ekle", href: "/admin/campaigns" },
            { label: "Ayarlar", href: "/admin/settings" },
            { label: "Siteyi Gör", href: "/", external: true },
          ].map((link) => (
            <Link
              key={link.href}
              href={link.href}
              target={link.external ? "_blank" : undefined}
              className="inline-flex items-center gap-1 rounded-md border bg-gray-50 px-3 py-1.5 text-sm transition hover:bg-gray-100"
            >
              {link.label}
              {link.external && <ExternalLink className="h-3 w-3" />}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
