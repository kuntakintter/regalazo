declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

/**
 * Tracks sharing actions silently into Google Analytics 4 (GA4).
 * Completely transparent to the user (no popups, alerts or UI changes).
 */
export function trackShareEvent(
  method: 'WhatsApp' | 'Telegram' | 'X' | 'Facebook' | 'Copy Link' | 'Native Share',
  contentType: 'voting_group' | 'social_bar' | 'product_card',
  extraData?: Record<string, unknown>
) {
  if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
    // 1. Standard GA4 recommended share event
    window.gtag('event', 'share', {
      method,
      content_type: contentType,
      ...extraData,
    });

    // 2. Custom dedicated event name (e.g. 'share_whatsapp', 'share_copy_link')
    // This allows it to show up directly as its own row in the GA4 Events table!
    const cleanMethod = method.toLowerCase().replace(/[^a-z0-9]/g, '_');
    window.gtag('event', `share_${cleanMethod}`, {
      content_type: contentType,
      ...extraData,
    });
  }
}

export function trackAffiliateClick(data: {
  productId: string;
  productTitle: string;
  category?: string;
  priceText?: string;
  destinationUrl?: string;
  placement?: string;
}) {
  if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
    window.gtag('event', 'affiliate_click', {
      product_id: data.productId,
      product_title: data.productTitle,
      category: data.category || 'general',
      price_text: data.priceText || '',
      destination_url: data.destinationUrl || '',
      placement: data.placement || 'default',
    });
  }
}
