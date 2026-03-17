"use client";

import { useState, useEffect, useCallback } from "react";
import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Loader2, FileText, ArrowLeft, Save, Plus, Trash2, GripVertical } from "lucide-react";
import MediaPicker from "@/components/admin/media-picker";
import RichTextEditor from "@/components/admin/rich-text-editor";

/* eslint-disable @typescript-eslint/no-explicit-any */

export default function AdminPageEditPage() {
  const params = useParams();
  const router = useRouter();
  const pageId = params.id as string;

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [pageData, setPageData] = useState<any>(null);
  const [seo, setSeo] = useState({ title: "", description: "", ogImage: "", robots: "index, follow", canonical: "" });
  const [sections, setSections] = useState<Record<string, any>>({});
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    async function load() {
      setLoading(true);
      const res = await fetch("/api/pages");
      const json = await res.json();
      if (json.success) {
        const found = (json.data as any[]).find((p: any) => p.id === pageId);
        if (found) {
          setPageData(found);
          setSeo(found.seo || { title: "", description: "", ogImage: "", robots: "index, follow", canonical: "" });
          setSections(JSON.parse(JSON.stringify(found.sections || {})));
        }
      }
      setLoading(false);
    }
    load();
  }, [pageId]);

  const updateField = useCallback((sectionKey: string, field: string, value: any) => {
    setSections((prev) => ({
      ...prev,
      [sectionKey]: { ...prev[sectionKey], [field]: value },
    }));
  }, []);

  const updateItemField = useCallback((sectionKey: string, arrayField: string, index: number, field: string, value: string) => {
    setSections((prev) => {
      const arr = [...(prev[sectionKey]?.[arrayField] || [])];
      arr[index] = { ...arr[index], [field]: value };
      return { ...prev, [sectionKey]: { ...prev[sectionKey], [arrayField]: arr } };
    });
  }, []);

  const addItem = useCallback((sectionKey: string, arrayField: string, template: any) => {
    setSections((prev) => {
      const arr = [...(prev[sectionKey]?.[arrayField] || []), template];
      return { ...prev, [sectionKey]: { ...prev[sectionKey], [arrayField]: arr } };
    });
  }, []);

  const removeItem = useCallback((sectionKey: string, arrayField: string, index: number) => {
    setSections((prev) => {
      const arr = [...(prev[sectionKey]?.[arrayField] || [])];
      arr.splice(index, 1);
      return { ...prev, [sectionKey]: { ...prev[sectionKey], [arrayField]: arr } };
    });
  }, []);

  async function handleSave() {
    if (!pageData) return;
    setSaving(true);
    await fetch(`/api/pages/${pageData.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ seo, sections }),
    });
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  }

  if (loading) return <div className="flex justify-center py-20"><Loader2 className="h-6 w-6 animate-spin text-muted-foreground" /></div>;
  if (!pageData) return (
    <div className="space-y-6">
      <p className="text-muted-foreground">Sayfa bulunamadı</p>
      <Button variant="outline" onClick={() => router.push("/admin/pages")} className="gap-2"><ArrowLeft className="h-4 w-4" /> Geri Dön</Button>
    </div>
  );

  const sectionEntries = Object.entries(sections);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => router.push("/admin/pages")}><ArrowLeft className="h-5 w-5" /></Button>
          <div>
            <h1 className="text-xl font-bold text-[#122032]">{pageData.title}</h1>
            <p className="text-sm text-muted-foreground">Sayfa içeriğini düzenleyin — {sectionEntries.length} bölüm</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          {saved && <span className="text-sm font-medium text-green-600">Kaydedildi ✓</span>}
          <Button onClick={handleSave} disabled={saving} className="gap-2 bg-[#e3000f] hover:bg-[#c5000d]">
            {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
            Kaydet
          </Button>
        </div>
      </div>

      {/* SEO Card */}
      <SeoCard seo={seo} setSeo={setSeo} />

      {/* Section Cards */}
      {sectionEntries.map(([key, sec]) => (
        <SectionCard
          key={key}
          sectionKey={key}
          section={sec}
          onUpdateField={(field, value) => updateField(key, field, value)}
          onUpdateItemField={(arrayField, index, field, value) => updateItemField(key, arrayField, index, field, value)}
          onAddItem={(arrayField, template) => addItem(key, arrayField, template)}
          onRemoveItem={(arrayField, index) => removeItem(key, arrayField, index)}
        />
      ))}

      {/* Alt kaydet */}
      <div className="flex items-center justify-between rounded-xl border bg-white p-4 shadow-sm">
        <Button variant="outline" onClick={() => router.push("/admin/pages")} className="gap-2"><ArrowLeft className="h-4 w-4" /> Sayfalara Dön</Button>
        <div className="flex items-center gap-3">
          {saved && <span className="text-sm font-medium text-green-600">Kaydedildi ✓</span>}
          <Button onClick={handleSave} disabled={saving} className="gap-2 bg-[#e3000f] hover:bg-[#c5000d]">
            {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
            Kaydet
          </Button>
        </div>
      </div>
    </div>
  );
}

/* ─── SEO Card ─── */
function SeoCard({ seo, setSeo }: { seo: any; setSeo: (v: any) => void }) {
  return (
    <div className="rounded-xl border bg-white p-6 shadow-sm space-y-4">
      <h2 className="text-sm font-bold text-[#122032] uppercase tracking-wider flex items-center gap-2">
        <FileText className="h-4 w-4 text-[#e3000f]" /> SEO Ayarları
      </h2>
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label>SEO Başlık</Label>
          <Input value={seo.title} onChange={(e) => setSeo({ ...seo, title: e.target.value })} />
          <p className="text-xs text-muted-foreground">{seo.title.length}/60 karakter</p>
        </div>
        <div className="space-y-2">
          <Label>SEO Açıklama</Label>
          <Textarea value={seo.description} onChange={(e) => setSeo({ ...seo, description: e.target.value })} rows={3} />
          <p className="text-xs text-muted-foreground">{seo.description.length}/160 karakter</p>
        </div>
        <MediaPicker value={seo.ogImage || ""} onChange={(url) => setSeo({ ...seo, ogImage: url })} label="OG Image" folder="general" />
        <div className="space-y-2">
          <Label>Robots</Label>
          <Input value={seo.robots || "index, follow"} onChange={(e) => setSeo({ ...seo, robots: e.target.value })} />
        </div>
      </div>
    </div>
  );
}

/* ─── Section Labels ─── */
const SECTION_LABELS: Record<string, string> = {
  hero: "Hero Bölümü",
  intro: "Giriş Bölümü",
  article: "Makale Başlığı",
  infoBox: "Bilgi Kutusu",
  factors: "Faktörler Listesi",
  priceTable: "Fiyat Tablosu",
  savingTips: "Tasarruf İpuçları",
  warning: "Uyarı Kutusu",
  services: "Hizmetlerimiz Başlık",
  servicesContent: "Hizmetlerimiz Altı İçerik",
  whyUs: "Neden Biz",
  whyUsContent: "Neden Biz Altı İçerik",
  process: "Taşıma Süreci",
  processContent: "Taşıma Süreci Altı İçerik",
  solutions: "Çözümlerimiz Başlık",
  regions: "Hizmet Bölgeleri Başlık",
  regionsContent: "Hizmet Bölgeleri Altı İçerik",
  faq: "Sıkça Sorulan Sorular",
  cta: "CTA (Aksiyon Çağrısı)",
  seoText: "SEO Metin Alanı",
  trustBadges: "Güven Rozetleri",
  story: "Hikayemiz",
  values: "Değerlerimiz",
  stats: "Rakamlarla Biz",
  info: "Bilgi Bölümü",
  formTitle: "Form Başlığı",
};

/* ─── Section Card ─── */
function SectionCard({
  sectionKey, section, onUpdateField, onUpdateItemField, onAddItem, onRemoveItem,
}: {
  sectionKey: string;
  section: any;
  onUpdateField: (field: string, value: any) => void;
  onUpdateItemField: (arrayField: string, index: number, field: string, value: string) => void;
  onAddItem: (arrayField: string, template: any) => void;
  onRemoveItem: (arrayField: string, index: number) => void;
}) {
  const label = SECTION_LABELS[sectionKey] || sectionKey;
  const hasItems = section?.items && Array.isArray(section.items);
  const hasSteps = section?.steps && Array.isArray(section.steps);
  const hasFaqItems = sectionKey === "faq" && section?.items && Array.isArray(section.items);
  const isHeroSection = sectionKey === "hero";
  const isPriceTable = sectionKey === "priceTable";
  const hasRows = isPriceTable && section?.rows && Array.isArray(section.rows);

  return (
    <div className="rounded-xl border bg-white p-6 shadow-sm space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-bold text-[#122032] flex items-center gap-2">
          <GripVertical className="h-4 w-4 text-gray-300" />
          <FileText className="h-4 w-4 text-[#e3000f]" />
          {label}
        </h2>
      </div>

      {/* Title field */}
      {section?.title !== undefined && (
        <div className="space-y-2">
          <Label>Başlık</Label>
          <Input value={section.title || ""} onChange={(e) => onUpdateField("title", e.target.value)} />
        </div>
      )}

      {/* Content field — Rich Text Editor */}
      {section?.content !== undefined && (
        <div className="space-y-2">
          <Label>Açıklama / İçerik</Label>
          <RichTextEditor
            content={section.content || ""}
            onChange={(html) => onUpdateField("content", html)}
            placeholder="İçerik yazın..."
          />
        </div>
      )}

      {/* Hero background image */}
      {isHeroSection && (
        <div className="border-t pt-4">
          <MediaPicker
            value={section.backgroundImage || ""}
            onChange={(url) => onUpdateField("backgroundImage", url)}
            label="Hero Arka Plan Görseli"
            folder="general"
          />
        </div>
      )}

      {/* Button fields */}
      {(section?.button1Text !== undefined || section?.buttonText !== undefined) && (
        <div className="grid gap-3 sm:grid-cols-2 border-t pt-4">
          <p className="col-span-full text-xs font-semibold text-muted-foreground uppercase">Butonlar</p>
          {section?.buttonText !== undefined && (
            <>
              <div className="space-y-1">
                <Label className="text-xs">Buton Metni</Label>
                <Input value={section.buttonText || ""} onChange={(e) => onUpdateField("buttonText", e.target.value)} className="h-9 text-sm" />
              </div>
              <div className="space-y-1">
                <Label className="text-xs">Buton Linki</Label>
                <Input value={section.buttonLink || ""} onChange={(e) => onUpdateField("buttonLink", e.target.value)} className="h-9 text-sm" />
              </div>
            </>
          )}
          {section?.button1Text !== undefined && (
            <>
              <div className="space-y-1">
                <Label className="text-xs">Buton 1 Metni</Label>
                <Input value={section.button1Text || ""} onChange={(e) => onUpdateField("button1Text", e.target.value)} className="h-9 text-sm" />
              </div>
              <div className="space-y-1">
                <Label className="text-xs">Buton 1 Linki</Label>
                <Input value={section.button1Link || ""} onChange={(e) => onUpdateField("button1Link", e.target.value)} className="h-9 text-sm" />
              </div>
            </>
          )}
          {section?.button2Text !== undefined && (
            <>
              <div className="space-y-1">
                <Label className="text-xs">Buton 2 Metni</Label>
                <Input value={section.button2Text || ""} onChange={(e) => onUpdateField("button2Text", e.target.value)} className="h-9 text-sm" />
              </div>
              <div className="space-y-1">
                <Label className="text-xs">Buton 2 Linki</Label>
                <Input value={section.button2Link || ""} onChange={(e) => onUpdateField("button2Link", e.target.value)} className="h-9 text-sm" />
              </div>
            </>
          )}
          {section?.button3Text !== undefined && (
            <div className="space-y-1">
              <Label className="text-xs">Buton 3 Metni</Label>
              <Input value={section.button3Text || ""} onChange={(e) => onUpdateField("button3Text", e.target.value)} className="h-9 text-sm" />
            </div>
          )}
          {section?.button4Text !== undefined && (
            <>
              <div className="space-y-1">
                <Label className="text-xs">Buton 4 Metni</Label>
                <Input value={section.button4Text || ""} onChange={(e) => onUpdateField("button4Text", e.target.value)} className="h-9 text-sm" />
              </div>
              <div className="space-y-1">
                <Label className="text-xs">Buton 4 Linki</Label>
                <Input value={section.button4Link || ""} onChange={(e) => onUpdateField("button4Link", e.target.value)} className="h-9 text-sm" />
              </div>
            </>
          )}
        </div>
      )}

      {/* Items (whyUs, trustBadges, values, stats) */}
      {hasItems && !hasFaqItems && (
        <div className="border-t pt-4 space-y-3">
          <div className="flex items-center justify-between">
            <p className="text-xs font-semibold text-muted-foreground uppercase">Öğeler ({section.items.length})</p>
            <Button variant="outline" size="sm" className="h-7 gap-1 text-xs" onClick={() => onAddItem("items", { label: "", title: "", desc: "", icon: "" })}>
              <Plus className="h-3 w-3" /> Ekle
            </Button>
          </div>
          {section.items.map((item: any, i: number) => (
            <div key={i} className="flex gap-2 items-start rounded-lg border bg-gray-50 p-3">
              <div className="flex-1 grid gap-2 sm:grid-cols-3">
                <Input value={item.label || item.title || ""} onChange={(e) => onUpdateItemField("items", i, item.label !== undefined ? "label" : "title", e.target.value)} placeholder="Başlık" className="h-8 text-sm" />
                <Input value={item.desc || item.description || ""} onChange={(e) => onUpdateItemField("items", i, item.desc !== undefined ? "desc" : "description", e.target.value)} placeholder="Açıklama" className="h-8 text-sm" />
                <Input value={item.icon || ""} onChange={(e) => onUpdateItemField("items", i, "icon", e.target.value)} placeholder="İkon adı" className="h-8 text-sm" />
              </div>
              <Button variant="ghost" size="icon" className="h-8 w-8 shrink-0 text-red-500 hover:text-red-700" onClick={() => onRemoveItem("items", i)}>
                <Trash2 className="h-3.5 w-3.5" />
              </Button>
            </div>
          ))}
        </div>
      )}

      {/* Steps (process) */}
      {hasSteps && (
        <div className="border-t pt-4 space-y-3">
          <div className="flex items-center justify-between">
            <p className="text-xs font-semibold text-muted-foreground uppercase">Adımlar ({section.steps.length})</p>
            <Button variant="outline" size="sm" className="h-7 gap-1 text-xs" onClick={() => onAddItem("steps", { title: "", desc: "" })}>
              <Plus className="h-3 w-3" /> Ekle
            </Button>
          </div>
          {section.steps.map((step: any, i: number) => (
            <div key={i} className="flex gap-2 items-start rounded-lg border bg-gray-50 p-3">
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#e3000f] text-xs font-bold text-white">{i + 1}</span>
              <div className="flex-1 grid gap-2 sm:grid-cols-2">
                <Input value={step.title || ""} onChange={(e) => onUpdateItemField("steps", i, "title", e.target.value)} placeholder="Adım başlığı" className="h-8 text-sm" />
                <Input value={step.desc || ""} onChange={(e) => onUpdateItemField("steps", i, "desc", e.target.value)} placeholder="Açıklama" className="h-8 text-sm" />
              </div>
              <Button variant="ghost" size="icon" className="h-8 w-8 shrink-0 text-red-500 hover:text-red-700" onClick={() => onRemoveItem("steps", i)}>
                <Trash2 className="h-3.5 w-3.5" />
              </Button>
            </div>
          ))}
        </div>
      )}

      {/* Price Table */}
      {isPriceTable && (
        <div className="border-t pt-4 space-y-4">
          {/* Caption */}
          {section?.caption !== undefined && (
            <div className="space-y-2">
              <Label>Tablo Açıklaması</Label>
              <Input value={section.caption || ""} onChange={(e) => onUpdateField("caption", e.target.value)} placeholder="Tablo açıklaması" />
            </div>
          )}
          
          {/* Headers */}
          {section?.headers && Array.isArray(section.headers) && (
            <div className="space-y-2">
              <Label>Tablo Başlıkları (virgülle ayırın)</Label>
              <Input 
                value={section.headers.join(", ")} 
                onChange={(e) => onUpdateField("headers", e.target.value.split(",").map((h: string) => h.trim()))} 
                placeholder="Ev Tipi, Eşya Hacmi, Asansörsüz, Asansörlü, Ek Hizmetlerle" 
              />
            </div>
          )}
          
          {/* Rows */}
          {hasRows && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <p className="text-xs font-semibold text-muted-foreground uppercase">Satırlar ({section.rows.length})</p>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="h-7 gap-1 text-xs" 
                  onClick={() => {
                    const template: Record<string, string> = {};
                    section.headers.forEach((h: string) => { template[h] = ""; });
                    onAddItem("rows", template);
                  }}
                >
                  <Plus className="h-3 w-3" /> Satır Ekle
                </Button>
              </div>
              {section.rows.map((row: any, i: number) => (
                <div key={i} className="rounded-lg border bg-gray-50 p-3 space-y-2">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-semibold text-muted-foreground">Satır {i + 1}</span>
                    <Button variant="ghost" size="icon" className="h-6 w-6 shrink-0 text-red-500 hover:text-red-700" onClick={() => onRemoveItem("rows", i)}>
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  </div>
                  <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
                    {section.headers.map((header: string, j: number) => (
                      <div key={j} className="space-y-1">
                        <Label className="text-xs">{header}</Label>
                        <Input 
                          value={row[header] || ""} 
                          onChange={(e) => {
                            const newRows = [...section.rows];
                            newRows[i] = { ...newRows[i], [header]: e.target.value };
                            onUpdateField("rows", newRows);
                          }}
                          placeholder={header}
                          className="h-8 text-sm" 
                        />
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* FAQ Items */}
      {hasFaqItems && (
        <div className="border-t pt-4 space-y-3">
          <div className="flex items-center justify-between">
            <p className="text-xs font-semibold text-muted-foreground uppercase">Sorular ({section.items.length})</p>
            <Button variant="outline" size="sm" className="h-7 gap-1 text-xs" onClick={() => onAddItem("items", { q: "", a: "" })}>
              <Plus className="h-3 w-3" /> Soru Ekle
            </Button>
          </div>
          {section.items.map((item: any, i: number) => (
            <div key={i} className="rounded-lg border bg-gray-50 p-3 space-y-2">
              <div className="flex items-start gap-2">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded bg-[#122032] text-[10px] font-bold text-white">S{i + 1}</span>
                <Input value={item.q || ""} onChange={(e) => onUpdateItemField("items", i, "q", e.target.value)} placeholder="Soru" className="h-8 text-sm flex-1" />
                <Button variant="ghost" size="icon" className="h-8 w-8 shrink-0 text-red-500 hover:text-red-700" onClick={() => onRemoveItem("items", i)}>
                  <Trash2 className="h-3.5 w-3.5" />
                </Button>
              </div>
              <Textarea value={item.a || ""} onChange={(e) => onUpdateItemField("items", i, "a", e.target.value)} placeholder="Cevap" rows={2} className="text-sm" />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
