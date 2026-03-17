"use client";

import { useState, useEffect } from "react";
import { Search, Eye, AlertCircle, Link2, ExternalLink, CheckCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

// Meta Preview Component
export function MetaPreview({
  title,
  description,
  url,
}: {
  title: string;
  description: string;
  url: string;
}) {
  const titleLength = title.length;
  const descLength = description.length;

  const titleStatus =
    titleLength >= 50 && titleLength <= 60
      ? "good"
      : titleLength < 50 || titleLength > 70
      ? "bad"
      : "warning";

  const descStatus =
    descLength >= 150 && descLength <= 160
      ? "good"
      : descLength < 120 || descLength > 160
      ? "bad"
      : "warning";

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Eye className="h-5 w-5" />
          Meta Önizleme
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Google Preview */}
        <div>
          <h4 className="text-sm font-semibold mb-3">Google Arama Sonucu</h4>
          <div className="border rounded-lg p-4 bg-white">
            <div className="text-xs text-green-700 mb-1">{url}</div>
            <div className="text-xl text-blue-600 hover:underline cursor-pointer mb-1">
              {title || "Sayfa Başlığı"}
            </div>
            <div className="text-sm text-gray-600">
              {description || "Meta açıklaması buraya gelecek..."}
            </div>
          </div>
        </div>

        {/* Character Counts */}
        <div className="space-y-3">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium">Başlık Uzunluğu</span>
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">
                  {titleLength} / 60
                </span>
                <Badge
                  variant={
                    titleStatus === "good"
                      ? "default"
                      : titleStatus === "warning"
                      ? "secondary"
                      : "destructive"
                  }
                >
                  {titleStatus === "good"
                    ? "İyi"
                    : titleStatus === "warning"
                    ? "Uyarı"
                    : "Kötü"}
                </Badge>
              </div>
            </div>
            <Progress
              value={(titleLength / 70) * 100}
              className={`h-2 ${
                titleStatus === "good"
                  ? "[&>div]:bg-green-500"
                  : titleStatus === "warning"
                  ? "[&>div]:bg-yellow-500"
                  : "[&>div]:bg-red-500"
              }`}
            />
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium">Açıklama Uzunluğu</span>
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">
                  {descLength} / 160
                </span>
                <Badge
                  variant={
                    descStatus === "good"
                      ? "default"
                      : descStatus === "warning"
                      ? "secondary"
                      : "destructive"
                  }
                >
                  {descStatus === "good"
                    ? "İyi"
                    : descStatus === "warning"
                    ? "Uyarı"
                    : "Kötü"}
                </Badge>
              </div>
            </div>
            <Progress
              value={(descLength / 160) * 100}
              className={`h-2 ${
                descStatus === "good"
                  ? "[&>div]:bg-green-500"
                  : descStatus === "warning"
                  ? "[&>div]:bg-yellow-500"
                  : "[&>div]:bg-red-500"
              }`}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

// Keyword Density Analyzer
export function KeywordDensity({ content }: { content: string }) {
  const [keywords, setKeywords] = useState<
    Array<{ word: string; count: number; density: number }>
  >([]);

  useEffect(() => {
    if (!content) return;

    const words = content
      .toLowerCase()
      .replace(/[^\w\sğüşıöçĞÜŞİÖÇ]/g, "")
      .split(/\s+/)
      .filter((word) => word.length > 3);

    const wordCount: Record<string, number> = {};
    words.forEach((word) => {
      wordCount[word] = (wordCount[word] || 0) + 1;
    });

    const totalWords = words.length;
    const keywordList = Object.entries(wordCount)
      .map(([word, count]) => ({
        word,
        count,
        density: (count / totalWords) * 100,
      }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 10);

    setKeywords(keywordList);
  }, [content]);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Search className="h-5 w-5" />
          Anahtar Kelime Yoğunluğu
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {keywords.length === 0 ? (
            <p className="text-sm text-muted-foreground text-center py-8">
              İçerik analiz edilecek...
            </p>
          ) : (
            keywords.map((keyword, index) => (
              <div key={keyword.word}>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-xs font-bold text-white">
                      {index + 1}
                    </span>
                    <span className="font-medium">{keyword.word}</span>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-semibold">{keyword.count}x</div>
                    <div className="text-xs text-muted-foreground">
                      {keyword.density.toFixed(2)}%
                    </div>
                  </div>
                </div>
                <Progress value={keyword.density * 10} className="h-1" />
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  );
}

// Readability Score
export function ReadabilityScore({ content }: { content: string }) {
  const [score, setScore] = useState(0);
  const [grade, setGrade] = useState("");
  const [suggestions, setSuggestions] = useState<string[]>([]);

  useEffect(() => {
    if (!content) return;

    const sentences = content.split(/[.!?]+/).filter((s) => s.trim().length > 0);
    const words = content.split(/\s+/).filter((w) => w.length > 0);
    const syllables = words.reduce((count, word) => {
      return count + countSyllables(word);
    }, 0);

    const avgWordsPerSentence = words.length / sentences.length;
    const avgSyllablesPerWord = syllables / words.length;

    // Flesch Reading Ease Score (adapted for Turkish)
    const readingEase =
      206.835 - 1.015 * avgWordsPerSentence - 84.6 * avgSyllablesPerWord;

    setScore(Math.max(0, Math.min(100, readingEase)));

    if (readingEase >= 90) setGrade("Çok Kolay");
    else if (readingEase >= 80) setGrade("Kolay");
    else if (readingEase >= 70) setGrade("Oldukça Kolay");
    else if (readingEase >= 60) setGrade("Standart");
    else if (readingEase >= 50) setGrade("Oldukça Zor");
    else if (readingEase >= 30) setGrade("Zor");
    else setGrade("Çok Zor");

    const newSuggestions = [];
    if (avgWordsPerSentence > 20) {
      newSuggestions.push("Cümleleri kısaltın (ortalama 20 kelimeden az)");
    }
    if (avgSyllablesPerWord > 2) {
      newSuggestions.push("Daha basit kelimeler kullanın");
    }
    if (sentences.length < 5) {
      newSuggestions.push("Daha fazla cümle ekleyin");
    }
    setSuggestions(newSuggestions);
  }, [content]);

  const countSyllables = (word: string): number => {
    const vowels = "aeıioöuüAEIİOÖUÜ";
    let count = 0;
    let prevIsVowel = false;

    for (const char of word) {
      const isVowel = vowels.includes(char);
      if (isVowel && !prevIsVowel) {
        count++;
      }
      prevIsVowel = isVowel;
    }

    return Math.max(1, count);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Okunabilirlik Skoru</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-center mb-6">
          <div className="text-5xl font-bold text-primary mb-2">
            {score.toFixed(0)}
          </div>
          <div className="text-lg font-semibold">{grade}</div>
        </div>

        <Progress value={score} className="h-3 mb-6" />

        {suggestions.length > 0 && (
          <div className="space-y-2">
            <h4 className="font-semibold text-sm">Öneriler:</h4>
            {suggestions.map((suggestion, index) => (
              <div key={index} className="flex items-start gap-2 text-sm">
                <AlertCircle className="h-4 w-4 text-yellow-500 mt-0.5 flex-shrink-0" />
                <span>{suggestion}</span>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}

// Internal Linking Suggestions
export function InternalLinkingSuggestions({
  currentUrl,
  content,
}: {
  currentUrl: string;
  content: string;
}) {
  const [suggestions, setSuggestions] = useState<
    Array<{ url: string; anchor: string; relevance: number }>
  >([]);

  useEffect(() => {
    // Mock suggestions - in real app, this would analyze content and suggest relevant internal links
    const mockSuggestions = [
      {
        url: "/ev-tasima",
        anchor: "ev taşıma hizmetleri",
        relevance: 95,
      },
      {
        url: "/ofis-tasima",
        anchor: "ofis taşıma",
        relevance: 87,
      },
      {
        url: "/ankara-nakliyat",
        anchor: "Ankara nakliyat",
        relevance: 82,
      },
      {
        url: "/iletisim",
        anchor: "iletişim",
        relevance: 75,
      },
    ];

    setSuggestions(mockSuggestions);
  }, [content, currentUrl]);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Link2 className="h-5 w-5" />
          İç Bağlantı Önerileri
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {suggestions.map((suggestion) => (
            <div
              key={suggestion.url}
              className="flex items-center justify-between p-3 border rounded-lg hover:bg-accent transition-colors"
            >
              <div className="flex-1">
                <div className="font-medium text-sm mb-1">{suggestion.anchor}</div>
                <div className="text-xs text-muted-foreground">{suggestion.url}</div>
              </div>
              <div className="flex items-center gap-3">
                <div className="text-right">
                  <div className="text-xs text-muted-foreground">Uygunluk</div>
                  <div className="font-semibold text-sm">{suggestion.relevance}%</div>
                </div>
                <Button size="sm" variant="outline">
                  Ekle
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

// Broken Link Checker
export function BrokenLinkChecker({ content }: { content: string }) {
  const [links, setLinks] = useState<
    Array<{ url: string; status: "checking" | "ok" | "broken"; statusCode?: number }>
  >([]);
  const [checking, setChecking] = useState(false);

  const extractLinks = () => {
    const urlRegex = /(https?:\/\/[^\s<>"]+)/g;
    const matches = content.match(urlRegex) || [];
    const uniqueLinks = [...new Set(matches)];

    setLinks(
      uniqueLinks.map((url) => ({
        url,
        status: "checking",
      }))
    );

    return uniqueLinks;
  };

  const checkLinks = async () => {
    setChecking(true);
    const extractedLinks = extractLinks();

    for (const link of extractedLinks) {
      try {
        const response = await fetch(`/api/check-link?url=${encodeURIComponent(link)}`);
        const data = await response.json();

        setLinks((prev) =>
          prev.map((l) =>
            l.url === link
              ? {
                  ...l,
                  status: data.ok ? "ok" : "broken",
                  statusCode: data.statusCode,
                }
              : l
          )
        );
      } catch (error) {
        setLinks((prev) =>
          prev.map((l) =>
            l.url === link ? { ...l, status: "broken", statusCode: 0 } : l
          )
        );
      }
    }

    setChecking(false);
  };

  const brokenCount = links.filter((l) => l.status === "broken").length;
  const okCount = links.filter((l) => l.status === "ok").length;

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <ExternalLink className="h-5 w-5" />
            Bozuk Link Kontrolü
          </CardTitle>
          <Button onClick={checkLinks} disabled={checking} size="sm">
            {checking ? "Kontrol Ediliyor..." : "Linkleri Kontrol Et"}
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        {links.length === 0 ? (
          <p className="text-sm text-muted-foreground text-center py-8">
            Link kontrolü için butona tıklayın
          </p>
        ) : (
          <>
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <div className="text-2xl font-bold text-green-600">{okCount}</div>
                <div className="text-sm text-green-700">Çalışıyor</div>
              </div>
              <div className="text-center p-4 bg-red-50 rounded-lg">
                <div className="text-2xl font-bold text-red-600">{brokenCount}</div>
                <div className="text-sm text-red-700">Bozuk</div>
              </div>
            </div>

            <div className="space-y-2 max-h-96 overflow-y-auto">
              {links.map((link) => (
                <div
                  key={link.url}
                  className="flex items-center justify-between p-3 border rounded-lg"
                >
                  <div className="flex-1 min-w-0">
                    <div className="text-sm truncate">{link.url}</div>
                    {link.statusCode && (
                      <div className="text-xs text-muted-foreground">
                        Status: {link.statusCode}
                      </div>
                    )}
                  </div>
                  <div className="ml-3">
                    {link.status === "checking" && (
                      <Badge variant="secondary">Kontrol ediliyor...</Badge>
                    )}
                    {link.status === "ok" && (
                      <Badge className="bg-green-600">
                        <CheckCircle className="mr-1 h-3 w-3" />
                        OK
                      </Badge>
                    )}
                    {link.status === "broken" && (
                      <Badge variant="destructive">
                        <AlertCircle className="mr-1 h-3 w-3" />
                        Bozuk
                      </Badge>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
}

// SEO Content Editor
export function SEOContentEditor() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [content, setContent] = useState("");
  const [url, setUrl] = useState("https://kozcuoglunakliyat.com.tr/ornek-sayfa");

  return (
    <div className="space-y-6">
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Editor */}
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>İçerik Düzenleyici</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium mb-2 block">Sayfa Başlığı</label>
                <Input
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="SEO başlığınızı girin..."
                />
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">Meta Açıklama</label>
                <Textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Meta açıklamanızı girin..."
                  rows={3}
                />
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">İçerik</label>
                <Textarea
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="Sayfa içeriğinizi girin..."
                  rows={10}
                />
              </div>
            </CardContent>
          </Card>

          <InternalLinkingSuggestions currentUrl={url} content={content} />
        </div>

        {/* Analysis */}
        <div className="space-y-4">
          <MetaPreview title={title} description={description} url={url} />
          <KeywordDensity content={content} />
          <ReadabilityScore content={content} />
          <BrokenLinkChecker content={content} />
        </div>
      </div>
    </div>
  );
}
