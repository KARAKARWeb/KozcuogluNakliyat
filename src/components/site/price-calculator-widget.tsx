"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calculator } from "lucide-react";

export function PriceCalculatorWidget() {
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [homeSize, setHomeSize] = useState("");
  const [floor, setFloor] = useState("");
  const [price, setPrice] = useState<number | null>(null);

  const calculatePrice = () => {
    const basePrice = 1000;
    const sizeMultiplier = homeSize === "1+1" ? 1 : homeSize === "2+1" ? 1.5 : homeSize === "3+1" ? 2 : 2.5;
    const floorMultiplier = 1 + (parseInt(floor) || 0) * 0.1;
    const calculated = basePrice * sizeMultiplier * floorMultiplier;
    setPrice(Math.round(calculated));
  };

  return (
    <div className="rounded-lg border bg-card p-6">
      <div className="flex items-center gap-2 mb-4">
        <Calculator className="h-5 w-5 text-primary" />
        <h3 className="text-lg font-semibold">Fiyat Hesapla</h3>
      </div>
      <div className="space-y-4">
        <div className="space-y-2">
          <Label>Nereden</Label>
          <Input placeholder="İlçe" value={from} onChange={(e) => setFrom(e.target.value)} />
        </div>
        <div className="space-y-2">
          <Label>Nereye</Label>
          <Input placeholder="İlçe" value={to} onChange={(e) => setTo(e.target.value)} />
        </div>
        <div className="space-y-2">
          <Label>Ev Büyüklüğü</Label>
          <Select value={homeSize} onValueChange={setHomeSize}>
            <SelectTrigger>
              <SelectValue placeholder="Seçin" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1+1">1+1</SelectItem>
              <SelectItem value="2+1">2+1</SelectItem>
              <SelectItem value="3+1">3+1</SelectItem>
              <SelectItem value="4+1">4+1</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label>Kat</Label>
          <Input type="number" placeholder="0" value={floor} onChange={(e) => setFloor(e.target.value)} />
        </div>
        <Button onClick={calculatePrice} className="w-full">Hesapla</Button>
        {price !== null && (
          <div className="rounded-lg bg-primary/10 p-4 text-center">
            <p className="text-sm text-muted-foreground">Tahmini Fiyat</p>
            <p className="text-2xl font-bold text-primary">{price} ₺</p>
          </div>
        )}
      </div>
    </div>
  );
}
