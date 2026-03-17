"use client";

import { useState } from "react";
import { CheckCircle, AlertCircle, XCircle, Play, Download } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { checkWCAGCompliance, checkColorContrast, type WCAGCheckResult } from "@/lib/accessibility";

interface AccessibilityIssue {
  id: string;
  severity: "critical" | "serious" | "moderate" | "minor";
  criterion: string;
  description: string;
  element: string;
  suggestion: string;
}

export function AccessibilityTesting() {
  const [testing, setTesting] = useState(false);
  const [results, setResults] = useState<{
    score: number;
    issues: AccessibilityIssue[];
    passed: number;
    failed: number;
    warnings: number;
  } | null>(null);

  const runTests = async () => {
    setTesting(true);

    // Simulate testing
    await new Promise((resolve) => setTimeout(resolve, 2000));

    const mockResults = {
      score: 87,
      passed: 45,
      failed: 8,
      warnings: 12,
      issues: [
        {
          id: "1",
          severity: "critical" as const,
          criterion: "1.1.1 Non-text Content (A)",
          description: "Görsel için alt text eksik",
          element: "img.hero-image",
          suggestion: "Tüm görsellere anlamlı alt text ekleyin",
        },
        {
          id: "2",
          severity: "serious" as const,
          criterion: "1.4.3 Contrast (AA)",
          description: "Yetersiz renk kontrastı",
          element: ".text-muted",
          suggestion: "Kontrast oranını en az 4.5:1 yapın",
        },
        {
          id: "3",
          severity: "moderate" as const,
          criterion: "2.1.1 Keyboard (A)",
          description: "Klavye ile erişilemiyor",
          element: "div.custom-dropdown",
          suggestion: "Tüm interaktif elementlere tabindex ekleyin",
        },
        {
          id: "4",
          severity: "serious" as const,
          criterion: "3.3.2 Labels or Instructions (A)",
          description: "Form alanı için label eksik",
          element: "input#email",
          suggestion: "Tüm form alanlarına label ekleyin",
        },
        {
          id: "5",
          severity: "moderate" as const,
          criterion: "4.1.2 Name, Role, Value (A)",
          description: "ARIA attribute eksik",
          element: "button.menu-toggle",
          suggestion: "aria-label veya aria-labelledby ekleyin",
        },
      ],
    };

    setResults(mockResults);
    setTesting(false);
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "critical":
        return "text-red-600 bg-red-50 border-red-200";
      case "serious":
        return "text-orange-600 bg-orange-50 border-orange-200";
      case "moderate":
        return "text-yellow-600 bg-yellow-50 border-yellow-200";
      case "minor":
        return "text-blue-600 bg-blue-50 border-blue-200";
      default:
        return "text-gray-600 bg-gray-50 border-gray-200";
    }
  };

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case "critical":
      case "serious":
        return XCircle;
      case "moderate":
        return AlertCircle;
      default:
        return CheckCircle;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Erişilebilirlik Testi</h2>
        <div className="flex gap-2">
          <Button onClick={runTests} disabled={testing}>
            <Play className={`mr-2 h-4 w-4 ${testing ? "animate-spin" : ""}`} />
            {testing ? "Test Ediliyor..." : "Testi Başlat"}
          </Button>
          {results && (
            <Button variant="outline">
              <Download className="mr-2 h-4 w-4" />
              Raporu İndir
            </Button>
          )}
        </div>
      </div>

      {!results ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-16">
            <Play className="h-16 w-16 text-muted-foreground mb-4" />
            <p className="text-lg font-semibold mb-2">Erişilebilirlik Testi</p>
            <p className="text-sm text-muted-foreground mb-4">
              WCAG 2.1 AA uyumluluğunu kontrol edin
            </p>
            <Button onClick={runTests}>Testi Başlat</Button>
          </CardContent>
        </Card>
      ) : (
        <>
          {/* Score Overview */}
          <div className="grid gap-4 md:grid-cols-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Erişilebilirlik Skoru</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-4xl font-bold text-primary mb-2">
                  {results.score}
                </div>
                <Progress value={results.score} className="h-2" />
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Başarılı</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-green-600">
                  {results.passed}
                </div>
                <p className="text-xs text-muted-foreground">Test geçti</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Başarısız</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-red-600">
                  {results.failed}
                </div>
                <p className="text-xs text-muted-foreground">Düzeltilmeli</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Uyarılar</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-yellow-600">
                  {results.warnings}
                </div>
                <p className="text-xs text-muted-foreground">İncelenmeli</p>
              </CardContent>
            </Card>
          </div>

          {/* Issues List */}
          <Card>
            <CardHeader>
              <CardTitle>Tespit Edilen Sorunlar</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {results.issues.map((issue) => {
                  const Icon = getSeverityIcon(issue.severity);
                  return (
                    <div
                      key={issue.id}
                      className={`border rounded-lg p-4 ${getSeverityColor(issue.severity)}`}
                    >
                      <div className="flex items-start gap-3">
                        <Icon className="h-5 w-5 mt-0.5 flex-shrink-0" />
                        <div className="flex-1 space-y-2">
                          <div className="flex items-center justify-between">
                            <h4 className="font-semibold">{issue.criterion}</h4>
                            <Badge
                              variant={
                                issue.severity === "critical" || issue.severity === "serious"
                                  ? "destructive"
                                  : "secondary"
                              }
                            >
                              {issue.severity === "critical"
                                ? "Kritik"
                                : issue.severity === "serious"
                                ? "Ciddi"
                                : issue.severity === "moderate"
                                ? "Orta"
                                : "Düşük"}
                            </Badge>
                          </div>
                          <p className="text-sm">{issue.description}</p>
                          <div className="text-xs font-mono bg-black/5 rounded px-2 py-1">
                            {issue.element}
                          </div>
                          <div className="flex items-start gap-2 text-sm">
                            <span className="font-semibold">Öneri:</span>
                            <span>{issue.suggestion}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          {/* Testing Tools */}
          <Card>
            <CardHeader>
              <CardTitle>Test Araçları</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-3">
                <div className="border rounded-lg p-4">
                  <h4 className="font-semibold mb-2">Lighthouse</h4>
                  <p className="text-sm text-muted-foreground mb-3">
                    Chrome DevTools ile otomatik test
                  </p>
                  <Badge variant="outline">Entegre</Badge>
                </div>

                <div className="border rounded-lg p-4">
                  <h4 className="font-semibold mb-2">axe DevTools</h4>
                  <p className="text-sm text-muted-foreground mb-3">
                    Detaylı erişilebilirlik analizi
                  </p>
                  <Badge variant="outline">Önerilir</Badge>
                </div>

                <div className="border rounded-lg p-4">
                  <h4 className="font-semibold mb-2">Screen Reader</h4>
                  <p className="text-sm text-muted-foreground mb-3">
                    NVDA/JAWS ile manuel test
                  </p>
                  <Badge variant="outline">Manuel</Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* WCAG Compliance */}
          <Card>
            <CardHeader>
              <CardTitle>WCAG 2.1 AA Uyumluluk</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                    <span className="font-medium">Perceivable (Algılanabilir)</span>
                  </div>
                  <Badge className="bg-green-600">Uyumlu</Badge>
                </div>

                <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <AlertCircle className="h-5 w-5 text-yellow-600" />
                    <span className="font-medium">Operable (Kullanılabilir)</span>
                  </div>
                  <Badge variant="secondary">Kısmi</Badge>
                </div>

                <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                    <span className="font-medium">Understandable (Anlaşılabilir)</span>
                  </div>
                  <Badge className="bg-green-600">Uyumlu</Badge>
                </div>

                <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <AlertCircle className="h-5 w-5 text-yellow-600" />
                    <span className="font-medium">Robust (Sağlam)</span>
                  </div>
                  <Badge variant="secondary">Kısmi</Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </>
      )}
    </div>
  );
}

// Color Contrast Checker Component
export function ColorContrastChecker() {
  const [foreground, setForeground] = useState("#000000");
  const [background, setBackground] = useState("#ffffff");
  const [result, setResult] = useState(checkColorContrast("#000000", "#ffffff"));

  const handleCheck = () => {
    setResult(checkColorContrast(foreground, background));
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Renk Kontrast Kontrolü</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium mb-2 block">Ön Plan Rengi</label>
            <div className="flex gap-2">
              <input
                type="color"
                value={foreground}
                onChange={(e) => setForeground(e.target.value)}
                className="h-10 w-20 rounded border"
              />
              <input
                type="text"
                value={foreground}
                onChange={(e) => setForeground(e.target.value)}
                className="flex-1 rounded border px-3"
              />
            </div>
          </div>

          <div>
            <label className="text-sm font-medium mb-2 block">Arka Plan Rengi</label>
            <div className="flex gap-2">
              <input
                type="color"
                value={background}
                onChange={(e) => setBackground(e.target.value)}
                className="h-10 w-20 rounded border"
              />
              <input
                type="text"
                value={background}
                onChange={(e) => setBackground(e.target.value)}
                className="flex-1 rounded border px-3"
              />
            </div>
          </div>
        </div>

        <Button onClick={handleCheck} className="w-full">
          Kontrol Et
        </Button>

        <div
          className="p-8 rounded-lg text-center"
          style={{ backgroundColor: background, color: foreground }}
        >
          <p className="text-lg font-semibold">Örnek Metin</p>
          <p className="text-sm">Bu metin kontrast oranını gösterir</p>
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between p-3 bg-gray-50 rounded">
            <span className="font-medium">Kontrast Oranı</span>
            <span className="text-lg font-bold">{result.ratio.toFixed(2)}:1</span>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div className={`p-3 rounded ${result.AA ? "bg-green-50" : "bg-red-50"}`}>
              <div className="flex items-center gap-2">
                {result.AA ? (
                  <CheckCircle className="h-4 w-4 text-green-600" />
                ) : (
                  <XCircle className="h-4 w-4 text-red-600" />
                )}
                <span className="font-medium">WCAG AA</span>
              </div>
              <p className="text-xs text-muted-foreground mt-1">Normal metin</p>
            </div>

            <div className={`p-3 rounded ${result.AALarge ? "bg-green-50" : "bg-red-50"}`}>
              <div className="flex items-center gap-2">
                {result.AALarge ? (
                  <CheckCircle className="h-4 w-4 text-green-600" />
                ) : (
                  <XCircle className="h-4 w-4 text-red-600" />
                )}
                <span className="font-medium">WCAG AA Large</span>
              </div>
              <p className="text-xs text-muted-foreground mt-1">Büyük metin</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
