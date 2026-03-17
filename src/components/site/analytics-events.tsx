"use client";

import { useEffect } from "react";
import {
  trackPhoneClick,
  trackWhatsAppClick,
  trackEmailClick,
  trackSocialShare,
  trackDownload,
  trackOutboundLink,
} from "@/lib/analytics-tracking";

// Phone Click Tracker
export function PhoneLink({
  phone,
  location,
  children,
  className,
}: {
  phone: string;
  location: string;
  children: React.ReactNode;
  className?: string;
}) {
  const handleClick = () => {
    trackPhoneClick(phone, location);
  };

  return (
    <a href={`tel:${phone}`} onClick={handleClick} className={className}>
      {children}
    </a>
  );
}

// WhatsApp Click Tracker
export function WhatsAppLink({
  phone,
  message,
  location,
  children,
  className,
}: {
  phone: string;
  message?: string;
  location: string;
  children: React.ReactNode;
  className?: string;
}) {
  const handleClick = () => {
    trackWhatsAppClick(location);
  };

  const whatsappUrl = `https://wa.me/${phone.replace(/\D/g, "")}${
    message ? `?text=${encodeURIComponent(message)}` : ""
  }`;

  return (
    <a
      href={whatsappUrl}
      onClick={handleClick}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
    >
      {children}
    </a>
  );
}

// Email Click Tracker
export function EmailLink({
  email,
  subject,
  location,
  children,
  className,
}: {
  email: string;
  subject?: string;
  location: string;
  children: React.ReactNode;
  className?: string;
}) {
  const handleClick = () => {
    trackEmailClick(location);
  };

  const mailtoUrl = `mailto:${email}${subject ? `?subject=${encodeURIComponent(subject)}` : ""}`;

  return (
    <a href={mailtoUrl} onClick={handleClick} className={className}>
      {children}
    </a>
  );
}

// Social Share Tracker
export function SocialShareButton({
  platform,
  url,
  title,
  contentType,
  children,
  className,
}: {
  platform: "facebook" | "twitter" | "linkedin" | "whatsapp";
  url: string;
  title: string;
  contentType: string;
  children: React.ReactNode;
  className?: string;
}) {
  const handleClick = () => {
    trackSocialShare(platform, contentType, title);
  };

  const shareUrls = {
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
    twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
    whatsapp: `https://wa.me/?text=${encodeURIComponent(title + " " + url)}`,
  };

  return (
    <a
      href={shareUrls[platform]}
      onClick={handleClick}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
    >
      {children}
    </a>
  );
}

// Download Tracker
export function DownloadLink({
  href,
  fileName,
  fileType,
  children,
  className,
}: {
  href: string;
  fileName: string;
  fileType: string;
  children: React.ReactNode;
  className?: string;
}) {
  const handleClick = () => {
    trackDownload(fileName, fileType);
  };

  return (
    <a href={href} onClick={handleClick} download className={className}>
      {children}
    </a>
  );
}

// Outbound Link Tracker
export function OutboundLink({
  href,
  linkText,
  children,
  className,
}: {
  href: string;
  linkText: string;
  children: React.ReactNode;
  className?: string;
}) {
  const handleClick = () => {
    trackOutboundLink(href, linkText);
  };

  return (
    <a
      href={href}
      onClick={handleClick}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
    >
      {children}
    </a>
  );
}

// Scroll Depth Tracker Component
export function ScrollDepthTracker() {
  useEffect(() => {
    const scrollTracked = new Set<number>();

    const handleScroll = () => {
      const scrollPercentage = Math.round(
        (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100
      );

      const milestones = [25, 50, 75, 100];
      milestones.forEach((milestone) => {
        if (scrollPercentage >= milestone && !scrollTracked.has(milestone)) {
          scrollTracked.add(milestone);
          if (typeof window !== "undefined" && window.gtag) {
            window.gtag("event", "scroll_depth", {
              event_category: "engagement",
              scroll_percentage: milestone,
              page_url: window.location.pathname,
            });
          }
        }
      });
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return null;
}

// Time on Page Tracker Component
export function TimeOnPageTracker() {
  useEffect(() => {
    const startTime = Date.now();

    const handleBeforeUnload = () => {
      const timeSpent = Math.round((Date.now() - startTime) / 1000);
      if (typeof window !== "undefined" && window.gtag) {
        window.gtag("event", "time_on_page", {
          event_category: "engagement",
          time_seconds: timeSpent,
          page_url: window.location.pathname,
        });
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, []);

  return null;
}
