"use client";

import { useState } from "react";
import { Facebook, Twitter, Linkedin, MessageCircle, Link2, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface SocialShareProps {
  url: string;
  title: string;
  description?: string;
}

export function SocialShare({ url, title, description }: SocialShareProps) {
  const [copied, setCopied] = useState(false);

  const shareUrl = typeof window !== "undefined" ? window.location.origin + url : url;
  const encodedUrl = encodeURIComponent(shareUrl);
  const encodedTitle = encodeURIComponent(title);
  const encodedDescription = encodeURIComponent(description || title);

  const shareLinks = {
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
    twitter: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
    whatsapp: `https://wa.me/?text=${encodedTitle}%20${encodedUrl}`,
  };

  const handleShare = (platform: keyof typeof shareLinks) => {
    const width = 600;
    const height = 400;
    const left = window.screen.width / 2 - width / 2;
    const top = window.screen.height / 2 - height / 2;

    window.open(
      shareLinks[platform],
      "_blank",
      `width=${width},height=${height},left=${left},top=${top}`
    );
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  return (
    <div className="flex items-center gap-2">
      <span className="text-sm font-medium text-muted-foreground">Paylaş:</span>
      
      <Button
        variant="outline"
        size="icon"
        onClick={() => handleShare("facebook")}
        title="Facebook'ta Paylaş"
      >
        <Facebook className="h-4 w-4" />
      </Button>

      <Button
        variant="outline"
        size="icon"
        onClick={() => handleShare("twitter")}
        title="Twitter'da Paylaş"
      >
        <Twitter className="h-4 w-4" />
      </Button>

      <Button
        variant="outline"
        size="icon"
        onClick={() => handleShare("linkedin")}
        title="LinkedIn'de Paylaş"
      >
        <Linkedin className="h-4 w-4" />
      </Button>

      <Button
        variant="outline"
        size="icon"
        onClick={() => handleShare("whatsapp")}
        title="WhatsApp'ta Paylaş"
      >
        <MessageCircle className="h-4 w-4" />
      </Button>

      <Button
        variant="outline"
        size="icon"
        onClick={copyToClipboard}
        title="Linki Kopyala"
      >
        {copied ? <Check className="h-4 w-4 text-green-500" /> : <Link2 className="h-4 w-4" />}
      </Button>
    </div>
  );
}

export function SocialShareDropdown({ url, title, description }: SocialShareProps) {
  const [copied, setCopied] = useState(false);

  const shareUrl = typeof window !== "undefined" ? window.location.origin + url : url;
  const encodedUrl = encodeURIComponent(shareUrl);
  const encodedTitle = encodeURIComponent(title);

  const shareLinks = {
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
    twitter: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
    whatsapp: `https://wa.me/?text=${encodedTitle}%20${encodedUrl}`,
  };

  const handleShare = (platform: keyof typeof shareLinks) => {
    window.open(shareLinks[platform], "_blank", "width=600,height=400");
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm">
          Paylaş
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => handleShare("facebook")}>
          <Facebook className="mr-2 h-4 w-4" />
          Facebook
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleShare("twitter")}>
          <Twitter className="mr-2 h-4 w-4" />
          Twitter
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleShare("linkedin")}>
          <Linkedin className="mr-2 h-4 w-4" />
          LinkedIn
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleShare("whatsapp")}>
          <MessageCircle className="mr-2 h-4 w-4" />
          WhatsApp
        </DropdownMenuItem>
        <DropdownMenuItem onClick={copyToClipboard}>
          {copied ? <Check className="mr-2 h-4 w-4 text-green-500" /> : <Link2 className="mr-2 h-4 w-4" />}
          {copied ? "Kopyalandı!" : "Linki Kopyala"}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export function SocialShareSticky({ url, title, description }: SocialShareProps) {
  return (
    <div className="fixed left-4 top-1/2 -translate-y-1/2 hidden lg:flex flex-col gap-2 z-50">
      <SocialShare url={url} title={title} description={description} />
    </div>
  );
}

export function SocialShareButtons({ url, title }: { url: string; title: string }) {
  const shareUrl = typeof window !== "undefined" ? window.location.origin + url : url;

  return (
    <div className="flex flex-wrap gap-3">
      <a
        href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-2 rounded-lg bg-[#1877F2] px-4 py-2 text-white hover:opacity-90 transition-opacity"
      >
        <Facebook className="h-4 w-4" />
        <span className="text-sm font-medium">Facebook</span>
      </a>

      <a
        href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(title)}`}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-2 rounded-lg bg-[#1DA1F2] px-4 py-2 text-white hover:opacity-90 transition-opacity"
      >
        <Twitter className="h-4 w-4" />
        <span className="text-sm font-medium">Twitter</span>
      </a>

      <a
        href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-2 rounded-lg bg-[#0A66C2] px-4 py-2 text-white hover:opacity-90 transition-opacity"
      >
        <Linkedin className="h-4 w-4" />
        <span className="text-sm font-medium">LinkedIn</span>
      </a>

      <a
        href={`https://wa.me/?text=${encodeURIComponent(title + " " + shareUrl)}`}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-2 rounded-lg bg-[#25D366] px-4 py-2 text-white hover:opacity-90 transition-opacity"
      >
        <MessageCircle className="h-4 w-4" />
        <span className="text-sm font-medium">WhatsApp</span>
      </a>
    </div>
  );
}
