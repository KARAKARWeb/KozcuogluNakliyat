"use client";

// Google Analytics 4 Event Tracking

declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
    dataLayer?: any[];
  }
}

// Event Categories
export const EventCategory = {
  ENGAGEMENT: "engagement",
  CONVERSION: "conversion",
  ECOMMERCE: "ecommerce",
  NAVIGATION: "navigation",
  FORM: "form",
  SOCIAL: "social",
} as const;

// Custom Events
export const trackEvent = (
  eventName: string,
  params?: Record<string, any>
) => {
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("event", eventName, params);
  }
};

// Page View Tracking
export const trackPageView = (url: string, title: string) => {
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("event", "page_view", {
      page_path: url,
      page_title: title,
    });
  }
};

// Conversion Tracking
export const trackConversion = (
  conversionId: string,
  value?: number,
  currency: string = "TRY"
) => {
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("event", "conversion", {
      send_to: conversionId,
      value: value,
      currency: currency,
    });
  }
};

// Form Submission Tracking
export const trackFormSubmission = (
  formName: string,
  formType: string,
  success: boolean
) => {
  trackEvent("form_submit", {
    event_category: EventCategory.FORM,
    form_name: formName,
    form_type: formType,
    success: success,
  });
};

// Quote Request Tracking
export const trackQuoteRequest = (
  serviceType: string,
  fromLocation: string,
  toLocation: string
) => {
  trackEvent("quote_request", {
    event_category: EventCategory.CONVERSION,
    service_type: serviceType,
    from_location: fromLocation,
    to_location: toLocation,
  });

  // Conversion event
  trackConversion("AW-CONVERSION_ID", 0, "TRY");
};

// Phone Click Tracking
export const trackPhoneClick = (phoneNumber: string, location: string) => {
  trackEvent("phone_click", {
    event_category: EventCategory.CONVERSION,
    phone_number: phoneNumber,
    click_location: location,
  });
};

// WhatsApp Click Tracking
export const trackWhatsAppClick = (location: string) => {
  trackEvent("whatsapp_click", {
    event_category: EventCategory.CONVERSION,
    click_location: location,
  });
};

// Email Click Tracking
export const trackEmailClick = (location: string) => {
  trackEvent("email_click", {
    event_category: EventCategory.CONVERSION,
    click_location: location,
  });
};

// Blog Post Read Tracking
export const trackBlogRead = (
  postTitle: string,
  postCategory: string,
  readTime: number
) => {
  trackEvent("blog_read", {
    event_category: EventCategory.ENGAGEMENT,
    post_title: postTitle,
    post_category: postCategory,
    read_time: readTime,
  });
};

// Service View Tracking
export const trackServiceView = (
  serviceName: string,
  serviceCategory: string
) => {
  trackEvent("service_view", {
    event_category: EventCategory.ENGAGEMENT,
    service_name: serviceName,
    service_category: serviceCategory,
  });
};

// Download Tracking
export const trackDownload = (fileName: string, fileType: string) => {
  trackEvent("file_download", {
    event_category: EventCategory.ENGAGEMENT,
    file_name: fileName,
    file_type: fileType,
  });
};

// Social Share Tracking
export const trackSocialShare = (
  platform: string,
  contentType: string,
  contentTitle: string
) => {
  trackEvent("share", {
    event_category: EventCategory.SOCIAL,
    method: platform,
    content_type: contentType,
    content_title: contentTitle,
  });
};

// Search Tracking
export const trackSearch = (searchTerm: string, resultsCount: number) => {
  trackEvent("search", {
    event_category: EventCategory.ENGAGEMENT,
    search_term: searchTerm,
    results_count: resultsCount,
  });
};

// Video Play Tracking
export const trackVideoPlay = (videoTitle: string, videoUrl: string) => {
  trackEvent("video_play", {
    event_category: EventCategory.ENGAGEMENT,
    video_title: videoTitle,
    video_url: videoUrl,
  });
};

// E-commerce Tracking
export const trackProductView = (
  productId: string,
  productName: string,
  price: number,
  category: string
) => {
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("event", "view_item", {
      event_category: EventCategory.ECOMMERCE,
      currency: "TRY",
      value: price,
      items: [
        {
          item_id: productId,
          item_name: productName,
          item_category: category,
          price: price,
        },
      ],
    });
  }
};

export const trackAddToCart = (
  productId: string,
  productName: string,
  price: number,
  quantity: number = 1
) => {
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("event", "add_to_cart", {
      event_category: EventCategory.ECOMMERCE,
      currency: "TRY",
      value: price * quantity,
      items: [
        {
          item_id: productId,
          item_name: productName,
          price: price,
          quantity: quantity,
        },
      ],
    });
  }
};

export const trackPurchase = (
  transactionId: string,
  value: number,
  items: Array<{
    item_id: string;
    item_name: string;
    price: number;
    quantity: number;
  }>
) => {
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("event", "purchase", {
      event_category: EventCategory.ECOMMERCE,
      transaction_id: transactionId,
      value: value,
      currency: "TRY",
      items: items,
    });
  }
};

// Custom Dimensions
export const setCustomDimension = (
  dimensionName: string,
  dimensionValue: string
) => {
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("set", "user_properties", {
      [dimensionName]: dimensionValue,
    });
  }
};

// User Properties
export const setUserProperty = (propertyName: string, propertyValue: string) => {
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("set", "user_properties", {
      [propertyName]: propertyValue,
    });
  }
};

// Goal Tracking
export const trackGoal = (
  goalName: string,
  goalValue?: number,
  goalCategory?: string
) => {
  trackEvent(goalName, {
    event_category: goalCategory || EventCategory.CONVERSION,
    value: goalValue,
  });
};

// Scroll Depth Tracking
export const trackScrollDepth = (percentage: number, pageUrl: string) => {
  trackEvent("scroll_depth", {
    event_category: EventCategory.ENGAGEMENT,
    scroll_percentage: percentage,
    page_url: pageUrl,
  });
};

// Time on Page Tracking
export const trackTimeOnPage = (seconds: number, pageUrl: string) => {
  trackEvent("time_on_page", {
    event_category: EventCategory.ENGAGEMENT,
    time_seconds: seconds,
    page_url: pageUrl,
  });
};

// Error Tracking
export const trackError = (
  errorMessage: string,
  errorType: string,
  errorLocation: string
) => {
  trackEvent("error", {
    event_category: "error",
    error_message: errorMessage,
    error_type: errorType,
    error_location: errorLocation,
  });
};

// Outbound Link Tracking
export const trackOutboundLink = (url: string, linkText: string) => {
  trackEvent("outbound_link", {
    event_category: EventCategory.NAVIGATION,
    link_url: url,
    link_text: linkText,
  });
};
