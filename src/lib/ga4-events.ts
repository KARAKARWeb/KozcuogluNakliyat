// Google Analytics 4 Event Tracking

declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
    dataLayer?: any[];
  }
}

export interface GA4Event {
  action: string;
  category: string;
  label?: string;
  value?: number;
  [key: string]: any;
}

// Initialize GA4
export function initGA4(measurementId: string) {
  if (typeof window === 'undefined') return;

  window.dataLayer = window.dataLayer || [];
  window.gtag = function gtag() {
    window.dataLayer?.push(arguments);
  };
  
  window.gtag('js', new Date());
  window.gtag('config', measurementId, {
    page_path: window.location.pathname,
  });
}

// Track page view
export function trackPageView(url: string, title?: string) {
  if (typeof window === 'undefined' || !window.gtag) return;

  window.gtag('event', 'page_view', {
    page_path: url,
    page_title: title || document.title,
    page_location: window.location.href,
  });
}

// Track custom event
export function trackEvent(event: GA4Event) {
  if (typeof window === 'undefined' || !window.gtag) return;

  window.gtag('event', event.action, {
    event_category: event.category,
    event_label: event.label,
    value: event.value,
    ...event,
  });
}

// Conversion tracking
export function trackConversion(conversionId: string, value?: number) {
  if (typeof window === 'undefined' || !window.gtag) return;

  window.gtag('event', 'conversion', {
    send_to: conversionId,
    value: value,
    currency: 'TRY',
  });
}

// E-commerce tracking
export function trackViewItem(item: {
  id: string;
  name: string;
  category?: string;
  price?: number;
}) {
  if (typeof window === 'undefined' || !window.gtag) return;

  window.gtag('event', 'view_item', {
    currency: 'TRY',
    value: item.price || 0,
    items: [
      {
        item_id: item.id,
        item_name: item.name,
        item_category: item.category,
        price: item.price,
      },
    ],
  });
}

export function trackAddToCart(item: {
  id: string;
  name: string;
  category?: string;
  price?: number;
  quantity?: number;
}) {
  if (typeof window === 'undefined' || !window.gtag) return;

  window.gtag('event', 'add_to_cart', {
    currency: 'TRY',
    value: (item.price || 0) * (item.quantity || 1),
    items: [
      {
        item_id: item.id,
        item_name: item.name,
        item_category: item.category,
        price: item.price,
        quantity: item.quantity || 1,
      },
    ],
  });
}

export function trackPurchase(transaction: {
  id: string;
  value: number;
  items: Array<{
    id: string;
    name: string;
    category?: string;
    price?: number;
    quantity?: number;
  }>;
}) {
  if (typeof window === 'undefined' || !window.gtag) return;

  window.gtag('event', 'purchase', {
    transaction_id: transaction.id,
    value: transaction.value,
    currency: 'TRY',
    items: transaction.items.map(item => ({
      item_id: item.id,
      item_name: item.name,
      item_category: item.category,
      price: item.price,
      quantity: item.quantity || 1,
    })),
  });
}

// Goal tracking
export function trackGoal(goalName: string, value?: number) {
  if (typeof window === 'undefined' || !window.gtag) return;

  window.gtag('event', goalName, {
    event_category: 'goal',
    value: value,
  });
}

// Custom dimensions
export function setUserProperty(property: string, value: string) {
  if (typeof window === 'undefined' || !window.gtag) return;

  window.gtag('set', 'user_properties', {
    [property]: value,
  });
}

// Common events
export const GA4Events = {
  // Form submissions
  formSubmit: (formName: string) =>
    trackEvent({
      action: 'form_submit',
      category: 'engagement',
      label: formName,
    }),

  // Button clicks
  buttonClick: (buttonName: string, location?: string) =>
    trackEvent({
      action: 'button_click',
      category: 'engagement',
      label: buttonName,
      location: location,
    }),

  // Quote request
  quoteRequest: (serviceType?: string) =>
    trackEvent({
      action: 'quote_request',
      category: 'conversion',
      label: serviceType,
    }),

  // Phone call
  phoneCall: () =>
    trackEvent({
      action: 'phone_call',
      category: 'conversion',
    }),

  // WhatsApp click
  whatsappClick: () =>
    trackEvent({
      action: 'whatsapp_click',
      category: 'engagement',
    }),

  // Newsletter signup
  newsletterSignup: () =>
    trackEvent({
      action: 'newsletter_signup',
      category: 'conversion',
    }),

  // Social share
  socialShare: (platform: string, url: string) =>
    trackEvent({
      action: 'share',
      category: 'engagement',
      label: platform,
      url: url,
    }),

  // Search
  search: (query: string, resultsCount: number) =>
    trackEvent({
      action: 'search',
      category: 'engagement',
      label: query,
      value: resultsCount,
    }),

  // Video play
  videoPlay: (videoTitle: string) =>
    trackEvent({
      action: 'video_play',
      category: 'engagement',
      label: videoTitle,
    }),

  // Download
  download: (fileName: string) =>
    trackEvent({
      action: 'file_download',
      category: 'engagement',
      label: fileName,
    }),

  // Outbound link
  outboundLink: (url: string) =>
    trackEvent({
      action: 'click',
      category: 'outbound',
      label: url,
    }),
};
