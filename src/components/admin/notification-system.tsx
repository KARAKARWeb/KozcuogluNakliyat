"use client";

import { useState } from "react";
import { Bell, Mail, MessageSquare, X, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

interface Notification {
  id: string;
  type: "email" | "push" | "sms";
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
}

export function NotificationBell() {
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: "1",
      type: "email",
      title: "Yeni blog yorumu",
      message: "Ankara Nakliyat yazınıza yorum yapıldı",
      timestamp: "5 dakika önce",
      read: false,
    },
    {
      id: "2",
      type: "push",
      title: "Hizmet güncellendi",
      message: "Ev Taşıma hizmeti başarıyla güncellendi",
      timestamp: "1 saat önce",
      read: false,
    },
  ]);

  const unreadCount = notifications.filter((n) => !n.read).length;

  const markAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const removeNotification = (id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          {unreadCount > 0 && (
            <Badge
              variant="destructive"
              className="absolute -right-1 -top-1 h-5 w-5 rounded-full p-0 text-xs"
            >
              {unreadCount}
            </Badge>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-80">
        <div className="flex items-center justify-between border-b p-3">
          <h3 className="font-semibold">Bildirimler</h3>
          {unreadCount > 0 && (
            <Button variant="ghost" size="sm" onClick={markAllAsRead}>
              Tümünü Okundu İşaretle
            </Button>
          )}
        </div>
        <div className="max-h-96 overflow-y-auto">
          {notifications.length === 0 ? (
            <div className="p-8 text-center text-sm text-muted-foreground">
              Bildirim yok
            </div>
          ) : (
            notifications.map((notification) => (
              <div
                key={notification.id}
                className={`border-b p-3 hover:bg-accent ${
                  !notification.read ? "bg-blue-50" : ""
                }`}
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1 space-y-1">
                    <div className="flex items-center gap-2">
                      {notification.type === "email" && (
                        <Mail className="h-4 w-4 text-blue-500" />
                      )}
                      {notification.type === "push" && (
                        <Bell className="h-4 w-4 text-green-500" />
                      )}
                      {notification.type === "sms" && (
                        <MessageSquare className="h-4 w-4 text-purple-500" />
                      )}
                      <p className="text-sm font-medium">{notification.title}</p>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      {notification.message}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {notification.timestamp}
                    </p>
                  </div>
                  <div className="flex gap-1">
                    {!notification.read && (
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-6 w-6"
                        onClick={() => markAsRead(notification.id)}
                      >
                        <Check className="h-3 w-3" />
                      </Button>
                    )}
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-6 w-6"
                      onClick={() => removeNotification(notification.id)}
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export function NotificationPreferences() {
  const [preferences, setPreferences] = useState({
    emailNotifications: true,
    pushNotifications: true,
    smsNotifications: false,
    blogComments: true,
    contentUpdates: true,
    systemAlerts: true,
  });

  const handleToggle = (key: keyof typeof preferences) => {
    setPreferences((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-4">Bildirim Tercihleri</h3>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <Label htmlFor="email-notif">E-posta Bildirimleri</Label>
            <Switch
              id="email-notif"
              checked={preferences.emailNotifications}
              onCheckedChange={() => handleToggle("emailNotifications")}
            />
          </div>
          
          <div className="flex items-center justify-between">
            <Label htmlFor="push-notif">Push Bildirimleri</Label>
            <Switch
              id="push-notif"
              checked={preferences.pushNotifications}
              onCheckedChange={() => handleToggle("pushNotifications")}
            />
          </div>
          
          <div className="flex items-center justify-between">
            <Label htmlFor="sms-notif">SMS Bildirimleri</Label>
            <Switch
              id="sms-notif"
              checked={preferences.smsNotifications}
              onCheckedChange={() => handleToggle("smsNotifications")}
            />
          </div>
        </div>
      </div>

      <div>
        <h4 className="font-medium mb-3">Bildirim Türleri</h4>
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <Label htmlFor="blog-comments">Blog Yorumları</Label>
            <Switch
              id="blog-comments"
              checked={preferences.blogComments}
              onCheckedChange={() => handleToggle("blogComments")}
            />
          </div>
          
          <div className="flex items-center justify-between">
            <Label htmlFor="content-updates">İçerik Güncellemeleri</Label>
            <Switch
              id="content-updates"
              checked={preferences.contentUpdates}
              onCheckedChange={() => handleToggle("contentUpdates")}
            />
          </div>
          
          <div className="flex items-center justify-between">
            <Label htmlFor="system-alerts">Sistem Uyarıları</Label>
            <Switch
              id="system-alerts"
              checked={preferences.systemAlerts}
              onCheckedChange={() => handleToggle("systemAlerts")}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
