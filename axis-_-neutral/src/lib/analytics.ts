declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
    fbq?: (...args: unknown[]) => void;
    _fbq?: (...args: unknown[]) => void;
  }
}

const GA4_ID = import.meta.env.VITE_GA4_MEASUREMENT_ID as string | undefined;
const META_PIXEL_ID = import.meta.env.VITE_META_PIXEL_ID as string | undefined;

let initialized = false;

function injectScript(id: string, src: string): void {
  if (document.getElementById(id)) return;
  const script = document.createElement('script');
  script.id = id;
  script.async = true;
  script.src = src;
  document.head.appendChild(script);
}

export function initAnalytics(): void {
  if (initialized || typeof window === 'undefined') return;
  initialized = true;

  if (GA4_ID) {
    injectScript('ga4-loader', `https://www.googletagmanager.com/gtag/js?id=${GA4_ID}`);
    window.dataLayer = window.dataLayer ?? [];
    window.gtag = function gtag(...args: unknown[]) {
      window.dataLayer?.push(args);
    };
    window.gtag('js', new Date());
    window.gtag('config', GA4_ID, { send_page_view: false });
  }

  if (META_PIXEL_ID) {
    type FbqStub = ((...args: unknown[]) => void) & {
      callMethod?: (...args: unknown[]) => void;
      queue: unknown[];
      loaded?: boolean;
      version?: string;
    };

    if (!window.fbq) {
      const stub: FbqStub = function (...args: unknown[]) {
        if (stub.callMethod) {
          stub.callMethod(...args);
        } else {
          stub.queue.push(args);
        }
      };
      stub.queue = [];
      stub.loaded = true;
      stub.version = '2.0';
      window.fbq = stub;
      window._fbq = stub;
      injectScript('meta-pixel-loader', 'https://connect.facebook.net/en_US/fbevents.js');
    }
    window.fbq?.('init', META_PIXEL_ID);
  }
}

export function isAnalyticsEnabled(): boolean {
  return Boolean(GA4_ID || META_PIXEL_ID);
}

export function trackPageView(path: string): void {
  if (GA4_ID && window.gtag) {
    window.gtag('event', 'page_view', { page_path: path });
  }
  if (META_PIXEL_ID && window.fbq) {
    window.fbq('track', 'PageView');
  }
}

export function trackViewItem(item: {
  slug: string;
  name: string;
  priceAud: number;
  category?: string;
}): void {
  if (GA4_ID && window.gtag) {
    window.gtag('event', 'view_item', {
      currency: 'AUD',
      value: item.priceAud,
      items: [
        {
          item_id: item.slug,
          item_name: item.name,
          item_category: item.category,
          price: item.priceAud,
        },
      ],
    });
  }
  if (META_PIXEL_ID && window.fbq) {
    window.fbq('track', 'ViewContent', {
      content_ids: [item.slug],
      content_name: item.name,
      content_type: 'product',
      value: item.priceAud,
      currency: 'AUD',
    });
  }
}

export function trackAddToCart(item: {
  slug: string;
  name: string;
  priceAud: number;
  quantity?: number;
}): void {
  const quantity = item.quantity ?? 1;
  if (GA4_ID && window.gtag) {
    window.gtag('event', 'add_to_cart', {
      currency: 'AUD',
      value: item.priceAud * quantity,
      items: [
        {
          item_id: item.slug,
          item_name: item.name,
          price: item.priceAud,
          quantity,
        },
      ],
    });
  }
  if (META_PIXEL_ID && window.fbq) {
    window.fbq('track', 'AddToCart', {
      content_ids: [item.slug],
      content_name: item.name,
      content_type: 'product',
      value: item.priceAud * quantity,
      currency: 'AUD',
    });
  }
}

export function trackBeginCheckout(payload: {
  valueAud: number;
  itemCount: number;
}): void {
  if (GA4_ID && window.gtag) {
    window.gtag('event', 'begin_checkout', {
      currency: 'AUD',
      value: payload.valueAud,
      items: [{ quantity: payload.itemCount }],
    });
  }
  if (META_PIXEL_ID && window.fbq) {
    window.fbq('track', 'InitiateCheckout', {
      value: payload.valueAud,
      currency: 'AUD',
      num_items: payload.itemCount,
    });
  }
}

export function trackPurchase(payload: {
  transactionId?: string | null;
  valueAud: number;
  currency?: string;
}): void {
  if (GA4_ID && window.gtag) {
    window.gtag('event', 'purchase', {
      transaction_id: payload.transactionId ?? undefined,
      currency: payload.currency ?? 'AUD',
      value: payload.valueAud,
    });
  }
  if (META_PIXEL_ID && window.fbq) {
    window.fbq('track', 'Purchase', {
      value: payload.valueAud,
      currency: payload.currency ?? 'AUD',
    });
  }
}
