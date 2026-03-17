"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2, Search, CheckCircle, Circle } from "lucide-react";

const STEPS = ["Keşif", "Teklif", "Onay", "Paketleme", "Yükleme", "Taşıma", "Boşaltma", "Teslim"];

export default function TrackingForm() {
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{ customerName: string; currentStep: number; status: string } | null>(null);
  const [error, setError] = useState("");

  async function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    if (!code.trim()) return;
    setLoading(true);
    setError("");
    setResult(null);
    try {
      const res = await fetch(`/api/tracking?code=${code.trim()}`);
      const json = await res.json();
      if (json.success && json.data) {
        setResult(json.data);
      } else {
        setError("Takip kodu bulunamadı. Lütfen kontrol edip tekrar deneyin.");
      }
    } catch {
      setError("Bağlantı hatası");
    }
    setLoading(false);
  }

  return (
    <>
      <form onSubmit={handleSearch} className="flex gap-2">
        <Input
          value={code}
          onChange={(e) => setCode(e.target.value)}
          placeholder="6 haneli takip kodu"
          maxLength={6}
          className="text-center text-lg font-mono tracking-widest"
        />
        <Button type="submit" disabled={loading} className="bg-[#e3000f] hover:bg-[#c5000d]">
          {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Search className="h-4 w-4" />}
        </Button>
      </form>

      {error && <p className="mt-4 text-center text-sm text-red-600" role="alert">{error}</p>}

      {result && (
        <div className="mt-8">
          <div className="mb-6 rounded-xl border bg-white p-5 text-center shadow-sm">
            <p className="text-sm text-muted-foreground">Müşteri</p>
            <p className="text-lg font-semibold text-[#122032]">{result.customerName}</p>
            <p className="mt-1 text-sm text-muted-foreground">Durum: <span className="font-medium text-[#e3000f]">{result.status}</span></p>
          </div>
          <div className="space-y-3">
            {STEPS.map((step, i) => {
              const done = i < result.currentStep;
              const current = i === result.currentStep;
              return (
                <div key={step} className={`flex items-center gap-3 rounded-lg border p-3 ${current ? "border-[#e3000f] bg-[#fef2f2]" : done ? "bg-green-50" : "bg-white"}`}>
                  {done ? (
                    <CheckCircle className="h-5 w-5 text-green-500" />
                  ) : current ? (
                    <div className="h-5 w-5 animate-pulse rounded-full bg-[#e3000f]" />
                  ) : (
                    <Circle className="h-5 w-5 text-gray-300" />
                  )}
                  <span className={`text-sm font-medium ${done ? "text-green-700" : current ? "text-[#e3000f]" : "text-muted-foreground"}`}>
                    {i + 1}. {step}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </>
  );
}
