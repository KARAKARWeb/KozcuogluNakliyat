"use client";

import { useState, useEffect } from "react";
import PageHeader from "@/components/admin/page-header";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Pencil, Loader2, ExternalLink } from "lucide-react";
import Link from "next/link";
import type { Policy } from "@/types";

export default function AdminPoliciesPage() {
  const [items, setItems] = useState<Policy[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [editItem, setEditItem] = useState<Policy | null>(null);
  const [form, setForm] = useState({ title: "", content: "", seoTitle: "", seoDescription: "" });

  async function fetchData() {
    setLoading(true);
    const res = await fetch("/api/policies");
    const json = await res.json();
    if (json.success) setItems(json.data);
    setLoading(false);
  }

  useEffect(() => {
    fetchData();
  }, []);

  function openEdit(item: Policy) {
    setEditItem(item);
    setForm({
      title: item.title,
      content: item.content,
      seoTitle: item.seo.title,
      seoDescription: item.seo.description,
    });
    setDialogOpen(true);
  }

  async function handleSave() {
    if (!editItem) return;
    setSaving(true);
    const payload = {
      title: form.title,
      content: form.content,
      seo: {
        title: form.seoTitle,
        description: form.seoDescription,
        ogImage: "",
        robots: "index, follow",
        canonical: `/${editItem.slug}`,
      },
    };
    await fetch(`/api/policies/${editItem.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    setSaving(false);
    setDialogOpen(false);
    fetchData();
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title="Politikalar"
        description="Gizlilik politikası, çerez politikası, KVKK ve kullanım koşullarını yönetin"
      />
      {loading ? (
        <div className="flex justify-center py-12">
          <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
        </div>
      ) : (
        <div className="rounded-xl border bg-white shadow-sm">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Başlık</TableHead>
                <TableHead>Slug</TableHead>
                <TableHead>Son Güncelleme</TableHead>
                <TableHead className="text-right">İşlemler</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {items.map((p) => (
                <TableRow key={p.id}>
                  <TableCell className="font-medium">{p.title}</TableCell>
                  <TableCell className="text-sm text-muted-foreground">/{p.slug}</TableCell>
                  <TableCell className="text-sm text-muted-foreground">
                    {new Date(p.updatedAt).toLocaleDateString("tr-TR", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-1">
                      <Button variant="ghost" size="icon" onClick={() => openEdit(p)}>
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Link href={`/${p.slug}`} target="_blank">
                        <Button variant="ghost" size="icon">
                          <ExternalLink className="h-4 w-4 text-muted-foreground" />
                        </Button>
                      </Link>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
              {items.length === 0 && (
                <TableRow>
                  <TableCell colSpan={4} className="py-8 text-center text-muted-foreground">
                    Henüz politika yok
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      )}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-h-[90vh] max-w-4xl overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{editItem?.title} Düzenle</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Başlık</Label>
              <Input
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label>İçerik (HTML)</Label>
              <Textarea
                value={form.content}
                onChange={(e) => setForm({ ...form, content: e.target.value })}
                rows={15}
                className="font-mono text-sm"
              />
              <p className="text-xs text-muted-foreground">
                HTML etiketleri kullanabilirsiniz: &lt;h2&gt;, &lt;h3&gt;, &lt;p&gt;, &lt;ul&gt;, &lt;li&gt;, vb.
              </p>
            </div>
            <div className="border-t pt-4">
              <p className="mb-3 text-sm font-semibold">SEO</p>
              <div className="space-y-3">
                <div className="space-y-2">
                  <Label>SEO Başlık</Label>
                  <Input
                    value={form.seoTitle}
                    onChange={(e) => setForm({ ...form, seoTitle: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label>SEO Açıklama</Label>
                  <Textarea
                    value={form.seoDescription}
                    onChange={(e) => setForm({ ...form, seoDescription: e.target.value })}
                    rows={2}
                  />
                </div>
              </div>
            </div>
            <div className="flex justify-end gap-2 border-t pt-4">
              <Button variant="outline" onClick={() => setDialogOpen(false)}>
                İptal
              </Button>
              <Button
                onClick={handleSave}
                disabled={saving || !form.title}
                className="bg-[#e3000f] hover:bg-[#c5000d]"
              >
                {saving ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                Güncelle
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
