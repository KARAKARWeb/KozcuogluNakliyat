"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import PageHeader from "@/components/admin/page-header";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Pencil, Loader2, ExternalLink } from "lucide-react";
import type { Page } from "@/types";

export default function AdminPagesPage() {
  const [items, setItems] = useState<Page[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      const res = await fetch("/api/pages");
      const json = await res.json();
      if (json.success) setItems(json.data);
      setLoading(false);
    }
    fetchData();
  }, []);

  return (
    <div className="space-y-6">
      <PageHeader title="Sayfalar" description="Statik sayfa içeriklerini yönetin" />
      {loading ? (
        <div className="flex justify-center py-12"><Loader2 className="h-6 w-6 animate-spin text-muted-foreground" /></div>
      ) : (
        <div className="rounded-xl border bg-white shadow-sm">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Sayfa</TableHead>
                <TableHead>Slug</TableHead>
                <TableHead>SEO Başlık</TableHead>
                <TableHead className="text-right">İşlemler</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {items.map((p) => (
                <TableRow key={p.id} className="group">
                  <TableCell className="font-medium">{p.title}</TableCell>
                  <TableCell className="text-sm text-muted-foreground">{p.slug}</TableCell>
                  <TableCell className="max-w-[200px] truncate text-sm">{p.seo.title}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-1">
                      <Link href={`/admin/pages/${p.id}`}>
                        <Button variant="ghost" size="icon"><Pencil className="h-4 w-4" /></Button>
                      </Link>
                      {p.slug !== "/" && (
                        <Link href={`/${p.slug}`} target="_blank">
                          <Button variant="ghost" size="icon"><ExternalLink className="h-4 w-4 text-muted-foreground" /></Button>
                        </Link>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
              {items.length === 0 && <TableRow><TableCell colSpan={4} className="py-8 text-center text-muted-foreground">Sayfa bulunamadı</TableCell></TableRow>}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
}
