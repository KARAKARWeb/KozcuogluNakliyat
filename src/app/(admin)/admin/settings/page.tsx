"use client";

import { useState, useEffect } from "react";
import PageHeader from "@/components/admin/page-header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Loader2, Save, Plus, Trash2, Download, Upload, KeyRound, Activity } from "lucide-react";
import type { Settings } from "@/types";

interface ActivityLog {
  id: string;
  action: string;
  entity: string;
  entityId?: string;
  details?: string;
  user: string;
  createdAt: string;
}

export default function AdminSettingsPage() {
  const [settings, setSettings] = useState<Settings | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [newCatName, setNewCatName] = useState("");
  const [newCatSlug, setNewCatSlug] = useState("");
  const [newSvcCatName, setNewSvcCatName] = useState("");
  const [newSvcCatSlug, setNewSvcCatSlug] = useState("");
  const [newSvcCatDesc, setNewSvcCatDesc] = useState("");
  const [pwForm, setPwForm] = useState({ current: "", newPw: "", confirm: "" });
  const [pwMsg, setPwMsg] = useState("");
  const [pwLoading, setPwLoading] = useState(false);
  const [activityLogs, setActivityLogs] = useState<ActivityLog[]>([]);
  const [logsLoading, setLogsLoading] = useState(false);

  async function fetchData() {
    setLoading(true);
    const res = await fetch("/api/settings");
    const json = await res.json();
    if (json.success) setSettings(json.data);
    setLoading(false);
  }

  useEffect(() => { fetchData(); }, []);

  async function handleSave() {
    if (!settings) return;
    setSaving(true);
    await fetch("/api/settings", { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(settings) });
    setSaving(false);
  }

  function updateNap(key: string, value: string) {
    if (!settings) return;
    setSettings({ ...settings, nap: { ...settings.nap, [key]: value } });
  }

  function updateSite(key: string, value: string) {
    if (!settings) return;
    setSettings({ ...settings, site: { ...settings.site, [key]: value } });
  }

  function updateIntegrations(key: string, value: string) {
    if (!settings) return;
    setSettings({ ...settings, integrations: { ...settings.integrations, [key]: value } });
  }

  if (loading || !settings) {
    return <div className="flex justify-center py-12"><Loader2 className="h-6 w-6 animate-spin text-muted-foreground" /></div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <PageHeader title="Ayarlar" description="Site ve firma ayarlarını yönetin" />
        <Button onClick={handleSave} disabled={saving} className="bg-[#e3000f] hover:bg-[#c5000d]">
          {saving ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Save className="mr-2 h-4 w-4" />}
          Kaydet
        </Button>
      </div>

      <Tabs defaultValue="nap" className="rounded-xl border bg-white p-5 shadow-sm">
        <TabsList>
          <TabsTrigger value="nap">NAP Bilgileri</TabsTrigger>
          <TabsTrigger value="site">Site</TabsTrigger>
          <TabsTrigger value="social">Sosyal Medya</TabsTrigger>
          <TabsTrigger value="integrations">Entegrasyonlar</TabsTrigger>
          <TabsTrigger value="code">Özel Kod</TabsTrigger>
          <TabsTrigger value="svc-categories">Hizmet Kategorileri</TabsTrigger>
          <TabsTrigger value="categories">Blog Kategorileri</TabsTrigger>
          <TabsTrigger value="pwa">PWA</TabsTrigger>
          <TabsTrigger value="backup">Yedekleme</TabsTrigger>
          <TabsTrigger value="activity">İşlem Geçmişi</TabsTrigger>
          <TabsTrigger value="password">Şifre</TabsTrigger>
        </TabsList>

        <TabsContent value="nap" className="space-y-4 pt-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2"><Label>Firma Adı</Label><Input value={settings.nap.name} onChange={(e) => updateNap("name", e.target.value)} /></div>
            <div className="space-y-2"><Label>Telefon</Label><Input value={settings.nap.phone} onChange={(e) => updateNap("phone", e.target.value)} /></div>
            <div className="space-y-2"><Label>Müşteri Hizmetleri</Label><Input value={settings.nap.phoneCustomerService} onChange={(e) => updateNap("phoneCustomerService", e.target.value)} /></div>
            <div className="space-y-2"><Label>GSM</Label><Input value={settings.nap.gsm} onChange={(e) => updateNap("gsm", e.target.value)} /></div>
            <div className="space-y-2"><Label>E-Posta</Label><Input value={settings.nap.email} onChange={(e) => updateNap("email", e.target.value)} /></div>
            <div className="space-y-2"><Label>WhatsApp</Label><Input value={settings.nap.whatsapp} onChange={(e) => updateNap("whatsapp", e.target.value)} /></div>
          </div>
          <div className="space-y-2"><Label>Adres</Label><Input value={settings.nap.address.full} onChange={(e) => setSettings({ ...settings, nap: { ...settings.nap, address: { ...settings.nap.address, full: e.target.value } } })} /></div>
          <div className="space-y-2"><Label>Çalışma Saatleri</Label><Input value={settings.nap.workingHours} onChange={(e) => updateNap("workingHours", e.target.value)} /></div>
          <div className="space-y-2">
            <Label>Google Maps Embed URL</Label>
            <Textarea 
              value={settings.nap.mapEmbedUrl || ""} 
              onChange={(e) => updateNap("mapEmbedUrl", e.target.value)} 
              placeholder="https://www.google.com/maps/embed?pb=..."
              rows={3}
              className="font-mono text-xs"
            />
            <p className="text-xs text-muted-foreground">Google Maps'ten "Embed a map" → "Copy HTML" → iframe src değerini buraya yapıştırın</p>
          </div>
        </TabsContent>

        <TabsContent value="site" className="space-y-4 pt-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2"><Label>Site Adı</Label><Input value={settings.site.name} onChange={(e) => updateSite("name", e.target.value)} /></div>
            <div className="space-y-2"><Label>URL</Label><Input value={settings.site.url} onChange={(e) => updateSite("url", e.target.value)} /></div>
          </div>
          <div className="space-y-2"><Label>Açıklama</Label><Textarea value={settings.site.description} onChange={(e) => updateSite("description", e.target.value)} rows={2} /></div>
          <div className="border-t pt-4">
            <p className="mb-3 text-sm font-semibold">Logo & Favicon (SEO)</p>
            <p className="mb-4 text-xs text-muted-foreground">Logo: SVG veya PNG (şeffaf arka plan, min 200px genişlik). Favicon: ICO veya PNG (32x32 / 48x48). OG Image: 1200x630 px.</p>
            <div className="grid gap-4 sm:grid-cols-2">
              {[
                { key: "logo" as const, label: "Logo", accept: ".svg,.png,.webp", hint: "Açık arka plan için" },
                { key: "logoDark" as const, label: "Logo (Koyu)", accept: ".svg,.png,.webp", hint: "Koyu arka plan için" },
                { key: "favicon" as const, label: "Favicon", accept: ".ico,.png,.svg", hint: "32x32 veya 48x48" },
                { key: "ogImage" as const, label: "OG Image", accept: ".jpg,.jpeg,.png,.webp", hint: "1200x630 px" },
              ].map((item) => (
                <div key={item.key} className="space-y-2 rounded-lg border p-3">
                  <Label>{item.label}</Label>
                  <p className="text-[10px] text-muted-foreground">{item.hint}</p>
                  {settings.site[item.key] && (
                    <div className="flex items-center gap-2">
                      <img src={settings.site[item.key]} alt={item.label} className="h-10 w-auto rounded bg-gray-50 object-contain" onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }} />
                      <span className="truncate text-xs text-muted-foreground">{settings.site[item.key]}</span>
                    </div>
                  )}
                  <div className="flex gap-2">
                    <Input value={settings.site[item.key]} onChange={(e) => updateSite(item.key, e.target.value)} placeholder="URL veya yol" className="flex-1 text-xs" />
                    <Button variant="outline" size="sm" className="shrink-0 text-xs" onClick={() => {
                      const input = document.createElement("input"); input.type = "file"; input.accept = item.accept;
                      input.onchange = async (e) => {
                        const file = (e.target as HTMLInputElement).files?.[0];
                        if (!file) return;
                        const formData = new FormData();
                        formData.append("file", file);
                        formData.append("path", `/uploads/general/${item.key}${file.name.substring(file.name.lastIndexOf("."))}`);
                        const res = await fetch("/api/media/upload-icon", { method: "POST", body: formData });
                        const json = await res.json();
                        if (json.success) updateSite(item.key, `/uploads/general/${item.key}${file.name.substring(file.name.lastIndexOf("."))}`);
                      };
                      input.click();
                    }}><Upload className="mr-1 h-3 w-3" />Yükle</Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="social" className="space-y-4 pt-4">
          <p className="text-sm text-muted-foreground">sameAs linkleri (her satıra bir URL)</p>
          <Textarea
            value={settings.sameAs.join("\n")}
            onChange={(e) => setSettings({ ...settings, sameAs: e.target.value.split("\n").filter(Boolean) })}
            rows={8}
            className="font-mono text-sm"
          />
        </TabsContent>

        <TabsContent value="integrations" className="space-y-4 pt-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2"><Label>GA4 ID</Label><Input value={settings.integrations.ga4Id} onChange={(e) => updateIntegrations("ga4Id", e.target.value)} placeholder="G-XXXXXXXXXX" /></div>
            <div className="space-y-2"><Label>GTM ID</Label><Input value={settings.integrations.gtmId} onChange={(e) => updateIntegrations("gtmId", e.target.value)} placeholder="GTM-XXXXXXX" /></div>
            <div className="space-y-2"><Label>Clarity ID</Label><Input value={settings.integrations.clarityId} onChange={(e) => updateIntegrations("clarityId", e.target.value)} /></div>

            <div className="space-y-2"><Label>IndexNow Key</Label><Input value={settings.integrations.indexNowKey} onChange={(e) => updateIntegrations("indexNowKey", e.target.value)} /></div>
          </div>
          <div className="border-t pt-4">
            <div className="mb-3 flex items-center justify-between">
              <p className="text-sm font-semibold">SMTP E-posta Ayarları</p>
              <Button 
                variant="outline" 
                size="sm"
                onClick={async () => {
                  const testEmail = prompt("Test e-postası göndermek için e-posta adresinizi girin:");
                  if (!testEmail) return;
                  const res = await fetch("/api/test-email", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ email: testEmail })
                  });
                  const data = await res.json();
                  alert(data.success ? "Test e-postası gönderildi!" : `Hata: ${data.error}`);
                }}
              >
                Test E-postası Gönder
              </Button>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2"><Label>SMTP Host</Label><Input value={settings.integrations.smtp.host} onChange={(e) => setSettings({ ...settings, integrations: { ...settings.integrations, smtp: { ...settings.integrations.smtp, host: e.target.value } } })} placeholder="smtp.gmail.com" /></div>
              <div className="space-y-2"><Label>Port</Label><Input type="number" value={settings.integrations.smtp.port} onChange={(e) => setSettings({ ...settings, integrations: { ...settings.integrations, smtp: { ...settings.integrations.smtp, port: Number(e.target.value) } } })} placeholder="587" /></div>
              <div className="space-y-2"><Label>Kullanıcı Adı</Label><Input value={settings.integrations.smtp.user} onChange={(e) => setSettings({ ...settings, integrations: { ...settings.integrations, smtp: { ...settings.integrations.smtp, user: e.target.value } } })} placeholder="email@example.com" /></div>
              <div className="space-y-2"><Label>Şifre</Label><Input type="password" value={settings.integrations.smtp.pass} onChange={(e) => setSettings({ ...settings, integrations: { ...settings.integrations, smtp: { ...settings.integrations.smtp, pass: e.target.value } } })} placeholder="••••••••" /></div>
              <div className="space-y-2"><Label>Gönderen E-posta</Label><Input value={settings.integrations.smtp.from} onChange={(e) => setSettings({ ...settings, integrations: { ...settings.integrations, smtp: { ...settings.integrations.smtp, from: e.target.value } } })} placeholder="info@kozcuoglunakliyat.com.tr" /></div>
              <div className="space-y-2"><Label>Alıcı E-posta (Varsayılan)</Label><Input value={settings.integrations.smtp.to} onChange={(e) => setSettings({ ...settings, integrations: { ...settings.integrations, smtp: { ...settings.integrations.smtp, to: e.target.value } } })} placeholder="info@kozcuoglunakliyat.com.tr" /></div>
            </div>
            <p className="mt-2 text-xs text-muted-foreground">
              Not: Gmail kullanıyorsanız, "Uygulama Şifresi" oluşturmanız gerekebilir. Port 587 (TLS) veya 465 (SSL) kullanabilirsiniz.
            </p>
          </div>
        </TabsContent>

        <TabsContent value="code" className="space-y-4 pt-4">
          <div className="space-y-2"><Label>Head Kodu</Label><Textarea value={settings.customCode.head} onChange={(e) => setSettings({ ...settings, customCode: { ...settings.customCode, head: e.target.value } })} rows={4} className="font-mono text-sm" /></div>
          <div className="space-y-2"><Label>Body Başı Kodu</Label><Textarea value={settings.customCode.bodyStart} onChange={(e) => setSettings({ ...settings, customCode: { ...settings.customCode, bodyStart: e.target.value } })} rows={4} className="font-mono text-sm" /></div>
          <div className="space-y-2"><Label>Footer Kodu</Label><Textarea value={settings.customCode.footer} onChange={(e) => setSettings({ ...settings, customCode: { ...settings.customCode, footer: e.target.value } })} rows={4} className="font-mono text-sm" /></div>
        </TabsContent>
        <TabsContent value="svc-categories" className="space-y-4 pt-4">
          <p className="text-sm text-muted-foreground">Hizmet sayfalarında kullanılacak kategorileri yönetin</p>
          <div className="space-y-2">
            {(settings.serviceCategories || []).map((cat, i) => (
              <div key={cat.id} className="flex items-center gap-2">
                <Input value={cat.name} onChange={(e) => {
                  const cats = [...(settings.serviceCategories || [])];
                  cats[i] = { ...cats[i], name: e.target.value };
                  setSettings({ ...settings, serviceCategories: cats });
                }} className="flex-1" placeholder="Kategori adı" />
                <Input value={cat.slug} onChange={(e) => {
                  const cats = [...(settings.serviceCategories || [])];
                  cats[i] = { ...cats[i], slug: e.target.value };
                  setSettings({ ...settings, serviceCategories: cats });
                }} className="w-32" placeholder="slug" />
                <Input value={cat.description} onChange={(e) => {
                  const cats = [...(settings.serviceCategories || [])];
                  cats[i] = { ...cats[i], description: e.target.value };
                  setSettings({ ...settings, serviceCategories: cats });
                }} className="flex-1" placeholder="Açıklama" />
                <Button variant="ghost" size="icon" onClick={() => {
                  setSettings({ ...settings, serviceCategories: (settings.serviceCategories || []).filter((_, idx) => idx !== i) });
                }}><Trash2 className="h-4 w-4 text-red-500" /></Button>
              </div>
            ))}
          </div>
          <div className="flex items-end gap-2">
            <div className="flex-1 space-y-1"><Label>Ad</Label><Input value={newSvcCatName} onChange={(e) => setNewSvcCatName(e.target.value)} placeholder="Bireysel Hizmetler" /></div>
            <div className="w-32 space-y-1"><Label>Slug</Label><Input value={newSvcCatSlug} onChange={(e) => setNewSvcCatSlug(e.target.value)} placeholder="bireysel" /></div>
            <div className="flex-1 space-y-1"><Label>Açıklama</Label><Input value={newSvcCatDesc} onChange={(e) => setNewSvcCatDesc(e.target.value)} placeholder="Kategori açıklaması" /></div>
            <Button onClick={() => {
              if (!newSvcCatName) return;
              const slug = newSvcCatSlug || newSvcCatName.toLowerCase().replace(/ğ/g,"g").replace(/ü/g,"u").replace(/ş/g,"s").replace(/ı/g,"i").replace(/ö/g,"o").replace(/ç/g,"c").replace(/[^a-z0-9]+/g,"-").replace(/(^-|-$)/g,"");
              setSettings({ ...settings, serviceCategories: [...(settings.serviceCategories || []), { id: slug, name: newSvcCatName, slug, description: newSvcCatDesc, icon: "Package" }] });
              setNewSvcCatName(""); setNewSvcCatSlug(""); setNewSvcCatDesc("");
            }}><Plus className="mr-1 h-4 w-4" />Ekle</Button>
          </div>
        </TabsContent>

        <TabsContent value="categories" className="space-y-4 pt-4">
          <p className="text-sm text-muted-foreground">Blog yazılarında kullanılacak kategorileri yönetin</p>
          <div className="space-y-2">
            {settings.blogCategories.map((cat, i) => (
              <div key={cat.id} className="flex items-center gap-2">
                <Input value={cat.name} onChange={(e) => {
                  const cats = [...settings.blogCategories];
                  cats[i] = { ...cats[i], name: e.target.value };
                  setSettings({ ...settings, blogCategories: cats });
                }} className="flex-1" />
                <Input value={cat.slug} onChange={(e) => {
                  const cats = [...settings.blogCategories];
                  cats[i] = { ...cats[i], slug: e.target.value };
                  setSettings({ ...settings, blogCategories: cats });
                }} className="flex-1" placeholder="slug" />
                <Button variant="ghost" size="icon" onClick={() => {
                  setSettings({ ...settings, blogCategories: settings.blogCategories.filter((_, idx) => idx !== i) });
                }}><Trash2 className="h-4 w-4 text-red-500" /></Button>
              </div>
            ))}
          </div>
          <div className="flex items-end gap-2">
            <div className="flex-1 space-y-1"><Label>Ad</Label><Input value={newCatName} onChange={(e) => setNewCatName(e.target.value)} placeholder="Kategori adı" /></div>
            <div className="flex-1 space-y-1"><Label>Slug</Label><Input value={newCatSlug} onChange={(e) => setNewCatSlug(e.target.value)} placeholder="kategori-slug" /></div>
            <Button onClick={() => {
              if (!newCatName) return;
              const slug = newCatSlug || newCatName.toLowerCase().replace(/\s+/g, "-");
              setSettings({ ...settings, blogCategories: [...settings.blogCategories, { id: slug, name: newCatName, slug }] });
              setNewCatName(""); setNewCatSlug("");
            }}><Plus className="mr-1 h-4 w-4" />Ekle</Button>
          </div>
        </TabsContent>

        <TabsContent value="pwa" className="space-y-4 pt-4">
          <p className="text-sm text-muted-foreground">PWA ikonlarını yönetin. İkonlar <code className="rounded bg-gray-100 px-1 text-xs">/public/icons/</code> klasöründe bulunur.</p>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {["72x72", "96x96", "128x128", "144x144", "152x152", "192x192", "384x384", "512x512"].map((size) => (
              <div key={size} className="rounded-lg border p-3 text-center">
                <img src={`/icons/icon-${size}.png`} alt={`Icon ${size}`} className="mx-auto mb-2 h-16 w-16 rounded-lg bg-gray-50 object-contain" onError={(e) => { (e.target as HTMLImageElement).src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='64' height='64'%3E%3Crect fill='%23f3f4f6' width='64' height='64' rx='8'/%3E%3Ctext x='32' y='36' text-anchor='middle' fill='%239ca3af' font-size='10'%3EYok%3C/text%3E%3C/svg%3E"; }} />
                <p className="text-xs font-medium">{size}</p>
                <Button variant="outline" size="sm" className="mt-2 w-full text-xs" onClick={() => {
                  const input = document.createElement("input"); input.type = "file"; input.accept = "image/png";
                  input.onchange = async (e) => {
                    const file = (e.target as HTMLInputElement).files?.[0];
                    if (!file) return;
                    const formData = new FormData();
                    formData.append("file", file);
                    formData.append("path", `/icons/icon-${size}.png`);
                    await fetch("/api/media/upload-icon", { method: "POST", body: formData });
                    window.location.reload();
                  };
                  input.click();
                }}><Upload className="mr-1 h-3 w-3" />Yükle</Button>
              </div>
            ))}
          </div>
          <div className="border-t pt-4">
            <p className="mb-3 text-sm font-semibold">Ekran Görüntüleri</p>
            <div className="grid gap-4 sm:grid-cols-2">
              {[{ name: "screenshot-wide.png", label: "Geniş (1280x720)", size: "1280x720" }, { name: "screenshot-narrow.png", label: "Dar (720x1280)", size: "720x1280" }].map((ss) => (
                <div key={ss.name} className="rounded-lg border p-3 text-center">
                  <img src={`/icons/${ss.name}`} alt={ss.label} className="mx-auto mb-2 h-20 rounded bg-gray-50 object-contain" onError={(e) => { (e.target as HTMLImageElement).src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='80'%3E%3Crect fill='%23f3f4f6' width='120' height='80' rx='8'/%3E%3Ctext x='60' y='44' text-anchor='middle' fill='%239ca3af' font-size='10'%3EYok%3C/text%3E%3C/svg%3E"; }} />
                  <p className="text-xs font-medium">{ss.label}</p>
                  <Button variant="outline" size="sm" className="mt-2 w-full text-xs" onClick={() => {
                    const input = document.createElement("input"); input.type = "file"; input.accept = "image/png";
                    input.onchange = async (e) => {
                      const file = (e.target as HTMLInputElement).files?.[0];
                      if (!file) return;
                      const formData = new FormData();
                      formData.append("file", file);
                      formData.append("path", `/icons/${ss.name}`);
                      await fetch("/api/media/upload-icon", { method: "POST", body: formData });
                      window.location.reload();
                    };
                    input.click();
                  }}><Upload className="mr-1 h-3 w-3" />Yükle</Button>
                </div>
              ))}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="backup" className="space-y-4 pt-4">
          <div className="rounded-lg border p-4">
            <h3 className="mb-2 font-semibold">Tam Veri Yedekleme</h3>
            <p className="mb-3 text-sm text-muted-foreground">Tüm JSON veri dosyalarını (30+ dosya) tek bir yedek dosyası olarak indirin</p>
            <Button variant="outline" onClick={async () => {
              const res = await fetch("/api/backup");
              const blob = await res.blob();
              const url = URL.createObjectURL(blob);
              const a = document.createElement("a"); a.href = url; a.download = `kozcuoglu-backup-${new Date().toISOString().slice(0, 10)}.json`; a.click();
              URL.revokeObjectURL(url);
            }}><Download className="mr-2 h-4 w-4" />Tüm Verileri İndir (JSON)</Button>
          </div>
          <div className="rounded-lg border border-yellow-200 bg-yellow-50 p-4">
            <h3 className="mb-2 font-semibold text-yellow-800">Geri Yükleme</h3>
            <p className="mb-3 text-sm text-yellow-700">Önceden indirdiğiniz yedek dosyasını yükleyin. <strong>Dikkat:</strong> Mevcut tüm veriler üzerine yazılır!</p>
            <Button variant="outline" className="border-yellow-400 hover:bg-yellow-100" onClick={() => {
              if (!confirm("Tüm veriler yedek dosyasıyla değiştirilecek. Emin misiniz?")) return;
              const input = document.createElement("input"); input.type = "file"; input.accept = ".json";
              input.onchange = async (e) => {
                const file = (e.target as HTMLInputElement).files?.[0];
                if (!file) return;
                const text = await file.text();
                try {
                  const data = JSON.parse(text);
                  const res = await fetch("/api/backup", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) });
                  const json = await res.json();
                  if (json.success) { alert(`${json.restored} dosya geri yüklendi`); fetchData(); }
                  else alert(json.error || "Geri yükleme başarısız");
                } catch { alert("Geçersiz JSON dosyası"); }
              };
              input.click();
            }}><Upload className="mr-2 h-4 w-4" />Yedekten Geri Yükle</Button>
          </div>
          <div className="rounded-lg border p-4">
            <h3 className="mb-2 font-semibold">Sadece Ayarlar</h3>
            <p className="mb-3 text-sm text-muted-foreground">Sadece site ayarlarını indirin veya yükleyin</p>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={async () => {
                const res = await fetch("/api/settings");
                const json = await res.json();
                const blob = new Blob([JSON.stringify(json.data, null, 2)], { type: "application/json" });
                const url = URL.createObjectURL(blob);
                const a = document.createElement("a"); a.href = url; a.download = `kozcuoglu-settings-${new Date().toISOString().slice(0, 10)}.json`; a.click();
                URL.revokeObjectURL(url);
              }}><Download className="mr-1 h-3 w-3" />Ayarları İndir</Button>
              <Button variant="outline" size="sm" onClick={() => {
                const input = document.createElement("input"); input.type = "file"; input.accept = ".json";
                input.onchange = async (e) => {
                  const file = (e.target as HTMLInputElement).files?.[0];
                  if (!file) return;
                  const text = await file.text();
                  try {
                    const data = JSON.parse(text);
                    await fetch("/api/settings", { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) });
                    fetchData();
                  } catch { alert("Geçersiz JSON dosyası"); }
                };
                input.click();
              }}><Upload className="mr-1 h-3 w-3" />Ayar Yükle</Button>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="activity" className="space-y-4 pt-4">
          <div className="flex items-center justify-between">
            <p className="text-sm text-muted-foreground">Son işlem kayıtları (en yeni en üstte)</p>
            <Button variant="outline" size="sm" onClick={async () => {
              setLogsLoading(true);
              const res = await fetch("/api/activity-logs");
              const json = await res.json();
              if (json.success) setActivityLogs(json.data);
              setLogsLoading(false);
            }}>{logsLoading ? <Loader2 className="mr-1 h-3 w-3 animate-spin" /> : <Activity className="mr-1 h-3 w-3" />}Yükle</Button>
          </div>
          {activityLogs.length === 0 ? (
            <p className="py-8 text-center text-sm text-muted-foreground">{logsLoading ? "Yükleniyor..." : "Logları görmek için \"Yükle\" butonuna tıklayın"}</p>
          ) : (
            <div className="max-h-96 overflow-y-auto rounded-lg border">
              <table className="w-full text-sm">
                <thead className="sticky top-0 bg-gray-50">
                  <tr>
                    <th className="px-3 py-2 text-left font-medium">Tarih</th>
                    <th className="px-3 py-2 text-left font-medium">İşlem</th>
                    <th className="px-3 py-2 text-left font-medium">Varlık</th>
                    <th className="px-3 py-2 text-left font-medium">Detay</th>
                  </tr>
                </thead>
                <tbody>
                  {activityLogs.slice(0, 50).map((log) => (
                    <tr key={log.id} className="border-t">
                      <td className="whitespace-nowrap px-3 py-2 text-xs text-muted-foreground">{new Date(log.createdAt).toLocaleString("tr-TR")}</td>
                      <td className="px-3 py-2"><span className={`rounded px-1.5 py-0.5 text-xs font-medium ${log.action === "create" ? "bg-green-100 text-green-700" : log.action === "update" ? "bg-blue-100 text-blue-700" : log.action === "delete" ? "bg-red-100 text-red-700" : "bg-gray-100 text-gray-700"}`}>{log.action}</span></td>
                      <td className="px-3 py-2 text-xs">{log.entity}</td>
                      <td className="max-w-xs truncate px-3 py-2 text-xs text-muted-foreground">{log.details}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </TabsContent>

        <TabsContent value="password" className="space-y-4 pt-4">
          <div className="max-w-md space-y-4">
            <div className="space-y-2"><Label>Mevcut Şifre</Label><Input type="password" value={pwForm.current} onChange={(e) => setPwForm({ ...pwForm, current: e.target.value })} /></div>
            <div className="space-y-2"><Label>Yeni Şifre</Label><Input type="password" value={pwForm.newPw} onChange={(e) => setPwForm({ ...pwForm, newPw: e.target.value })} /></div>
            <div className="space-y-2"><Label>Yeni Şifre (Tekrar)</Label><Input type="password" value={pwForm.confirm} onChange={(e) => setPwForm({ ...pwForm, confirm: e.target.value })} /></div>
            {pwMsg && <p className={`text-sm ${pwMsg.includes("başarı") ? "text-green-600" : "text-red-600"}`}>{pwMsg}</p>}
            <Button disabled={pwLoading} onClick={async () => {
              setPwMsg("");
              if (pwForm.newPw !== pwForm.confirm) { setPwMsg("Şifreler eşleşmiyor"); return; }
              if (pwForm.newPw.length < 6) { setPwMsg("Şifre en az 6 karakter olmalı"); return; }
              setPwLoading(true);
              const res = await fetch("/api/auth/change-password", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ currentPassword: pwForm.current, newPassword: pwForm.newPw }) });
              const json = await res.json();
              setPwMsg(json.success ? "Şifre başarıyla değiştirildi" : (json.error || "Hata oluştu"));
              if (json.success) setPwForm({ current: "", newPw: "", confirm: "" });
              setPwLoading(false);
            }} className="bg-[#e3000f] hover:bg-[#c5000d]">
              {pwLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <KeyRound className="mr-2 h-4 w-4" />}
              Şifre Değiştir
            </Button>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
