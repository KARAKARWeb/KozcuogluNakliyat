"use client";

import { useState } from "react";
import { Upload, Image as ImageIcon, Download, Trash2, Eye } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface ImageFile {
  id: string;
  name: string;
  originalSize: number;
  optimizedSize: number;
  format: string;
  width: number;
  height: number;
  url: string;
  optimizedUrl: string;
}

export function ImageOptimizer() {
  const [images, setImages] = useState<ImageFile[]>([]);
  const [uploading, setUploading] = useState(false);
  const [quality, setQuality] = useState("85");
  const [format, setFormat] = useState("webp");

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;

    setUploading(true);

    for (const file of files) {
      // Simulate optimization
      const optimizedSize = Math.round(file.size * 0.6); // 40% reduction
      
      const newImage: ImageFile = {
        id: `img_${Date.now()}_${Math.random()}`,
        name: file.name,
        originalSize: file.size,
        optimizedSize,
        format: format,
        width: 1920,
        height: 1080,
        url: URL.createObjectURL(file),
        optimizedUrl: URL.createObjectURL(file),
      };

      setImages((prev) => [...prev, newImage]);
    }

    setUploading(false);
  };

  const totalOriginalSize = images.reduce((sum, img) => sum + img.originalSize, 0);
  const totalOptimizedSize = images.reduce((sum, img) => sum + img.optimizedSize, 0);
  const savingsPercentage = totalOriginalSize > 0
    ? ((totalOriginalSize - totalOptimizedSize) / totalOriginalSize) * 100
    : 0;

  const formatBytes = (bytes: number) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + " " + sizes[i];
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Görsel Optimizasyonu</h2>
        <div className="flex gap-3">
          <Select value={format} onValueChange={setFormat}>
            <SelectTrigger className="w-[120px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="webp">WebP</SelectItem>
              <SelectItem value="jpeg">JPEG</SelectItem>
              <SelectItem value="png">PNG</SelectItem>
            </SelectContent>
          </Select>

          <Select value={quality} onValueChange={setQuality}>
            <SelectTrigger className="w-[120px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="60">Düşük (60%)</SelectItem>
              <SelectItem value="75">Orta (75%)</SelectItem>
              <SelectItem value="85">Yüksek (85%)</SelectItem>
              <SelectItem value="95">Maksimum (95%)</SelectItem>
            </SelectContent>
          </Select>

          <label className="cursor-pointer">
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={handleFileUpload}
              className="hidden"
            />
            <Button disabled={uploading}>
              <Upload className="mr-2 h-4 w-4" />
              {uploading ? "Yükleniyor..." : "Görsel Yükle"}
            </Button>
          </label>
        </div>
      </div>

      {/* Stats */}
      {images.length > 0 && (
        <div className="grid gap-4 md:grid-cols-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Toplam Görsel</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{images.length}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Orijinal Boyut</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{formatBytes(totalOriginalSize)}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Optimize Boyut</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{formatBytes(totalOptimizedSize)}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Tasarruf</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">
                {savingsPercentage.toFixed(1)}%
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Images List */}
      {images.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-16">
            <ImageIcon className="h-16 w-16 text-muted-foreground mb-4" />
            <p className="text-lg font-semibold mb-2">Henüz görsel yüklenmedi</p>
            <p className="text-sm text-muted-foreground mb-4">
              Optimize etmek için görsel yükleyin
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {images.map((image) => (
            <Card key={image.id}>
              <CardContent className="p-4">
                <div className="aspect-video bg-gray-100 rounded-lg mb-3 overflow-hidden">
                  <img
                    src={image.url}
                    alt={image.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium truncate">{image.name}</span>
                    <Badge>{image.format.toUpperCase()}</Badge>
                  </div>

                  <div className="text-xs text-muted-foreground">
                    {image.width} × {image.height}
                  </div>

                  <div className="space-y-1">
                    <div className="flex justify-between text-xs">
                      <span>Orijinal:</span>
                      <span className="font-semibold">{formatBytes(image.originalSize)}</span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span>Optimize:</span>
                      <span className="font-semibold text-green-600">
                        {formatBytes(image.optimizedSize)}
                      </span>
                    </div>
                    <Progress
                      value={((image.originalSize - image.optimizedSize) / image.originalSize) * 100}
                      className="h-1"
                    />
                    <div className="text-xs text-center text-green-600 font-semibold">
                      {(((image.originalSize - image.optimizedSize) / image.originalSize) * 100).toFixed(1)}% tasarruf
                    </div>
                  </div>

                  <div className="flex gap-2 pt-2">
                    <Button variant="outline" size="sm" className="flex-1">
                      <Eye className="mr-1 h-3 w-3" />
                      Önizle
                    </Button>
                    <Button variant="outline" size="sm" className="flex-1">
                      <Download className="mr-1 h-3 w-3" />
                      İndir
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setImages(images.filter((img) => img.id !== image.id))}
                    >
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {images.length > 0 && (
        <div className="flex justify-end gap-3">
          <Button variant="outline" onClick={() => setImages([])}>
            Tümünü Temizle
          </Button>
          <Button>
            <Download className="mr-2 h-4 w-4" />
            Tümünü İndir
          </Button>
        </div>
      )}
    </div>
  );
}
