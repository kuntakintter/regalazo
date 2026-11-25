'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

function isAutomatedVisitor(): boolean {
  if (typeof navigator === 'undefined') return true;
  if (navigator.webdriver === true) return true;
  const ua = navigator.userAgent || '';
  return /bot|crawl|spider|slurp|headless|lighthouse|pagespeed|inspect|gptbot|chatgpt|claudebot|perplexity|facebookexternalhit|pinterest|whatsapp|telegrambot|discordbot|twitterbot|Applebot|bingpreview/i.test(
    ua
  );
}

function sendGaEvent(eventName: string, params: Record<string, unknown>) {
  if (
    typeof window === 'undefined' ||
    typeof window.gtag !== 'function' ||
    isAutomatedVisitor()
  ) {
    return;
  }
  try {
    window.gtag('event', eventName, {
      ...params,
      transport_type: 'beacon',
    });
  } catch {
    // ignore analytics errors in restricted environments
  }
}

export default function AnalyticsAndSeoBooster() {
  const pathname = usePathname();

  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Track session start time & UTM attribution in sessionStorage across SPA navigations
    let sessionStartTime = Number(sessionStorage.getItem('ubr_session_start'));
    if (!sessionStartTime || Number.isNaN(sessionStartTime)) {
      sessionStartTime = Date.now();
      try {
        sessionStorage.setItem('ubr_session_start', String(sessionStartTime));
      } catch {
        // storage disabled or private mode
      }
    }

    const activeUtm: Record<string, string> = {};
    try {
      const sp = new URLSearchParams(window.location.search);
      for (const k of ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term']) {
        const val = sp.get(k);
        if (val) {
          sessionStorage.setItem(`ubr_${k}`, val);
        }
        const stored = sessionStorage.getItem(`ubr_${k}`);
        if (stored) {
          activeUtm[k] = stored;
        }
      }
    } catch {
      // ignore storage errors
    }

    const getSessionDurationSec = () => Math.max(1, Math.round((Date.now() - sessionStartTime) / 1000));

    let pageEnterTime = performance.now();
    let lastInteractionTime = Date.now();
    let lastPageViewSentAt = Date.now();
    let firedScroll50 = false;
    let firedScroll85 = false;
    let lastFilterEventTime = 0;

    const markUserActive = () => {
      lastInteractionTime = Date.now();
    };
    window.addEventListener('pointermove', markUserActive, { passive: true });
    window.addEventListener('touchstart', markUserActive, { passive: true });
    window.addEventListener('keydown', markUserActive, { passive: true });

    // 0. Explicitly record page_view on every section navigation (once Next.js updates document.title)
    const initialLoadHandled = sessionStorage.getItem('ubr_initial_pv_path') === window.location.pathname;
    const pvTimer = setTimeout(() => {
      try {
        const lastPath = sessionStorage.getItem('ubr_initial_pv_path');
        if (lastPath && lastPath !== window.location.pathname) {
          sendGaEvent('page_view', {
            page_title: document.title || 'Un Buen Regalo',
            page_location: window.location.href,
            page_path: window.location.pathname,
          });
        }
        sessionStorage.setItem('ubr_initial_pv_path', window.location.pathname);
        lastPageViewSentAt = Date.now();
      } catch {
        // ignore sessionStorage error
      }
    }, initialLoadHandled ? 100 : 250);

    // 1. Periodic Heartbeat to record real active session duration (only while user interacted within last 3 min)
    // NOTE: Do NOT override GA4's reserved `engagement_time_msec` with cumulative page time, because GA4 sums
    // `engagement_time_msec` across all events (which would turn a 30-min open tab into 1+2+...+30 = 465 mins!).
    const heartbeatMilestones = [10, 25, 45, 60, 90, 120, 180];
    const heartbeatTimeouts: NodeJS.Timeout[] = [];

    heartbeatMilestones.forEach((sec) => {
      const timer = setTimeout(() => {
        if (document.visibilityState === 'visible' && Date.now() - lastInteractionTime < 180000) {
          const currentElapsedSec = Math.round((performance.now() - pageEnterTime) / 1000);
          sendGaEvent('session_heartbeat', {
            event_category: 'session_engagement',
            page_path: window.location.pathname,
            session_duration_sec: getSessionDurationSec(),
            time_on_page_sec: currentElapsedSec,
          });
        }
      }, sec * 1000);
      heartbeatTimeouts.push(timer);
    });

    // Steady heartbeat every 60s only while user is actively interacting (within last 2 min)
    const longInterval = setInterval(() => {
      if (document.visibilityState === 'visible' && Date.now() - lastInteractionTime < 120000) {
        const currentElapsedSec = Math.round((performance.now() - pageEnterTime) / 1000);
        sendGaEvent('session_heartbeat', {
          event_category: 'session_engagement',
          page_path: window.location.pathname,
          page_title: document.title || 'Un Buen Regalo',
          session_duration_sec: getSessionDurationSec(),
          time_on_page_sec: currentElapsedSec,
        });
        if (Date.now() - lastPageViewSentAt > 25 * 60 * 1000) {
          lastPageViewSentAt = Date.now();
          sendGaEvent('page_view', {
            page_title: document.title || 'Un Buen Regalo',
            page_location: window.location.href,
            page_path: window.location.pathname,
          });
        }
      }
    }, 60000);

    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;

      // 2. Outbound Amazon Affiliate Click -> flush elapsed engagement and session time immediately via beacon
      const anchor = target.closest('a');
      if (anchor && anchor.href) {
        const href = anchor.href;
        if (href.includes('amazon.') || href.includes('amzn.')) {
          const elapsedSec = Math.round((performance.now() - pageEnterTime) / 1000);
          const label =
            (anchor.getAttribute('aria-label') || anchor.textContent || '')
              .replace(/\s+/g, ' ')
              .trim()
              .slice(0, 80) || 'Amazon Product';

          sendGaEvent('amazon_outbound_click', {
            event_category: 'affiliate_conversion',
            event_label: label,
            link_url: href,
            page_path: window.location.pathname,
            session_duration_sec: getSessionDurationSec(),
            time_on_page_sec: elapsedSec,
            ...activeUtm,
          });
          return;
        }
      }

      // 3. Interactive Filter / Category Pill / Sort Button Click -> record micro-interaction
      const button = target.closest('button');
      if (button) {
        const now = performance.now();
        if (now - lastFilterEventTime < 800) return;
        const btnText = (button.getAttribute('aria-label') || button.textContent || '')
          .replace(/\s+/g, ' ')
          .trim()
          .slice(0, 60);
        if (!btnText) return;

        lastFilterEventTime = now;
        sendGaEvent('catalog_interaction', {
          event_category: 'ui_filter',
          event_label: btnText,
          page_path: window.location.pathname,
          session_duration_sec: getSessionDurationSec(),
        });
      }
    };

    const handleScroll = () => {
      lastInteractionTime = Date.now();
      const doc = document.documentElement;
      const scrollTop = window.scrollY || doc.scrollTop;
      const maxScroll = Math.max(1, doc.scrollHeight - window.innerHeight);
      const ratio = scrollTop / maxScroll;

      if (!firedScroll50 && ratio >= 0.5) {
        firedScroll50 = true;
        sendGaEvent('scroll_milestone', {
          event_category: 'engagement',
          percent_scrolled: 50,
          page_path: window.location.pathname,
          session_duration_sec: getSessionDurationSec(),
        });
      } else if (!firedScroll85 && ratio >= 0.85) {
        firedScroll85 = true;
        sendGaEvent('scroll_milestone', {
          event_category: 'engagement',
          percent_scrolled: 85,
          page_path: window.location.pathname,
          session_duration_sec: getSessionDurationSec(),
        });
      }
    };

    const handleVisibilityChange = () => {
      if (document.visibilityState === 'hidden') {
        const elapsedMs = Math.round(performance.now() - pageEnterTime);
        if (elapsedMs >= 3000) {
          sendGaEvent('page_active_time_flush', {
            event_category: 'engagement',
            page_path: window.location.pathname,
            session_duration_sec: getSessionDurationSec(),
            active_seconds: Math.round(elapsedMs / 1000),
          });
        }
      } else if (document.visibilityState === 'visible') {
        // Reset timer when user returns from Amazon tab so next chunk is counted cleanly
        pageEnterTime = performance.now();
        lastInteractionTime = Date.now();
        // If the tab was open for >25 minutes (GA4 Realtime 30-min rolling window expired for initial page_view),
        // re-send page_view with current page_title so "Vistas por Título de página" is never blank in Realtime
        if (Date.now() - lastPageViewSentAt > 25 * 60 * 1000) {
          lastPageViewSentAt = Date.now();
          sendGaEvent('page_view', {
            page_title: document.title || 'Un Buen Regalo',
            page_location: window.location.href,
            page_path: window.location.pathname,
          });
        }
      }
    };

    const handleBeforeUnload = () => {
      const elapsedMs = Math.round(performance.now() - pageEnterTime);
      if (elapsedMs >= 2000) {
        sendGaEvent('page_active_time_flush', {
          event_category: 'engagement',
          page_path: window.location.pathname,
          session_duration_sec: getSessionDurationSec(),
          active_seconds: Math.round(elapsedMs / 1000),
        });
      }
    };

    document.addEventListener('click', handleClick, { capture: true, passive: true });
    window.addEventListener('scroll', handleScroll, { passive: true });
    document.addEventListener('visibilitychange', handleVisibilityChange);
    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      clearTimeout(pvTimer);
      heartbeatTimeouts.forEach((t) => clearTimeout(t));
      clearInterval(longInterval);
      window.removeEventListener('pointermove', markUserActive);
      window.removeEventListener('touchstart', markUserActive);
      window.removeEventListener('keydown', markUserActive);
      document.removeEventListener('click', handleClick, { capture: true });
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [pathname]);

  return null;
}
