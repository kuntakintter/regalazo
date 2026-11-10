'use client';

declare global {
  interface Window {
    googleTranslateElementInit?: () => void;
    google?: {
      translate?: {
        TranslateElement?: new (
          options: { pageLanguage: string; autoDisplay: boolean },
          elementId: string
        ) => unknown;
      };
    };
  }
}

let pendingGoogleCode: string | null = null;
let elementInitialized = false;

export function setGoogleTranslateCookie(googleCode: string): void {
  if (typeof document === 'undefined' || typeof window === 'undefined') return;
  const domain = window.location.hostname;
  const rootDomain = domain.replace(/^www\./, '');

  if (googleCode === 'es') {
    const expirePast = 'expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    document.cookie = `googtrans=; ${expirePast}`;
    document.cookie = `googtrans=; domain=${domain}; ${expirePast}`;
    document.cookie = `googtrans=; domain=.${rootDomain}; ${expirePast}`;
  } else {
    const transVal = `/es/${googleCode}`;
    const maxAge = 'max-age=31536000; path=/;';
    document.cookie = `googtrans=${transVal}; ${maxAge}`;
    if (domain && domain !== 'localhost') {
      document.cookie = `googtrans=${transVal}; domain=${domain}; ${maxAge}`;
      document.cookie = `googtrans=${transVal}; domain=.${rootDomain}; ${maxAge}`;
    }
  }
}

export function getGoogleTranslateCookieCode(): string | null {
  if (typeof document === 'undefined') return null;
  const match = document.cookie.match(/(?:^|;\s*)googtrans=\/es\/([a-zA-Z-]+)/);
  return match?.[1] || null;
}

function applyComboSelection(googleCode: string, attempts: number = 0): void {
  if (typeof document === 'undefined') return;
  const select = document.querySelector('.goog-te-combo') as HTMLSelectElement | null;
  if (select) {
    if (select.value !== googleCode) {
      select.value = googleCode;
      select.dispatchEvent(new Event('change'));
    }
    return;
  }
  if (attempts < 15) {
    window.setTimeout(() => applyComboSelection(googleCode, attempts + 1), 250);
  }
}

/**
 * Loads Google Translate ONLY when a non-Spanish language is needed/selected,
 * keeping default Spanish loads completely free of third-party cookie issues.
 */
export function ensureGoogleTranslateLoaded(googleCode: string): void {
  if (typeof window === 'undefined' || typeof document === 'undefined') return;
  if (!googleCode || googleCode === 'es') {
    setGoogleTranslateCookie('es');
    return;
  }

  pendingGoogleCode = googleCode;
  setGoogleTranslateCookie(googleCode);

  if (!window.googleTranslateElementInit) {
    window.googleTranslateElementInit = () => {
      if (window.google?.translate?.TranslateElement && !elementInitialized) {
        elementInitialized = true;
        new window.google.translate.TranslateElement(
          {
            pageLanguage: 'es',
            autoDisplay: false,
          },
          'google_translate_element'
        );
      }
      if (pendingGoogleCode && pendingGoogleCode !== 'es') {
        applyComboSelection(pendingGoogleCode);
      }
    };
  }

  if (window.google?.translate?.TranslateElement) {
    window.googleTranslateElementInit();
    return;
  }

  const existingScript = document.getElementById('google-translate-script');
  if (!existingScript) {
    const script = document.createElement('script');
    script.id = 'google-translate-script';
    script.async = true;
    script.src =
      'https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
    document.body.appendChild(script);
  } else {
    applyComboSelection(googleCode);
  }
}
