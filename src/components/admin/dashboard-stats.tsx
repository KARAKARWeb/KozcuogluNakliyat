"use client";

import { FileText, Package, Lightbulb, MapPin, TrendingUp, TrendingDown } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface StatCardProps {
  title: string;
  value: number | string;
  icon: React.ComponentType<{ className?: string }>;
  trend?: { value: number; isPositive: boolean };
  description?: string;
}

function StatCard({ title, value, icon: Icon, trend, description }: StatCardProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <Icon className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        {trend && (
          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            {trend.isPositive ? (
              <TrendingUp className="h-3 w-3 text-green-500" />
            ) : (
              <TrendingDown className="h-3 w-3 text-red-500" />
            )}
            <span className={trend.isPositive ? "text-green-500" : "text-red-500"}>
              {trend.value}%
            </span>
            <span>son aydan</span>
          </div>
        )}
        {description && (
          <p className="text-xs text-muted-foreground mt-1">{description}</p>
        )}
      </CardContent>
    </Card>
  );
}

export function DashboardStats() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <StatCard
        title="Blog Yazıları"
        value={45}
        icon={FileText}
        trend={{ value: 12, isPositive: true }}
        description="Toplam yayınlanmış yazı"
      />
      <StatCard
        title="Hizmetler"
        value={28}
        icon={Package}
        trend={{ value: 5, isPositive: true }}
        description="Aktif hizmet sayfası"
      />
      <StatCard
        title="Çözümler"
        value={15}
        icon={Lightbulb}
        trend={{ value: 3, isPositive: false }}
        description="Çözüm sayfası"
      />
      <StatCard
        title="Bölgeler"
        value={120}
        icon={MapPin}
        trend={{ value: 8, isPositive: true }}
        description="Hizmet verilen bölge"
      />
    </div>
  );
}

export function RecentActivity() {
  const activities = [
    { id: 1, action: "Blog yazısı eklendi", item: "Ankara Nakliyat Rehberi", time: "2 saat önce" },
    { id: 2, action: "Hizmet güncellendi", item: "Ev Taşıma", time: "5 saat önce" },
    { id: 3, action: "Bölge eklendi", item: "Çankaya Nakliyat", time: "1 gün önce" },
    { id: 4, action: "Çözüm yayınlandı", item: "Ofis Taşıma Çözümü", time: "2 gün önce" },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Son Aktiviteler</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activities.map((activity) => (
            <div key={activity.id} className="flex items-center justify-between border-b pb-3 last:border-0 last:pb-0">
              <div>
                <p className="text-sm font-medium">{activity.action}</p>
                <p className="text-xs text-muted-foreground">{activity.item}</p>
              </div>
              <span className="text-xs text-muted-foreground">{activity.time}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

export function QuickStats() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Hızlı İstatistikler</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">Toplam İçerik</span>
          <span className="text-2xl font-bold">208</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">Aktif Sayfalar</span>
          <span className="text-2xl font-bold">195</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">Taslaklar</span>
          <span className="text-2xl font-bold">13</span>
        </div>
      </CardContent>
    </Card>
  );
}
