import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const STORAGE_KEY = 'axis-neutral-cookie-consent';
const SHOW_DELAY_MS = 2800;

function setCookieBannerOffset(active: boolean) {
  document.documentElement.style.setProperty(
    '--cookie-banner-offset',
    active ? '5.75rem' : '0px',
  );
}

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    let showTimer: ReturnType<typeof setTimeout> | undefined;
    try {
      if (!localStorage.getItem(STORAGE_KEY)) {
        showTimer = setTimeout(() => setVisible(true), SHOW_DELAY_MS);
      }
    } catch {
      showTimer = setTimeout(() => setVisible(true), SHOW_DELAY_MS);
    }
    return () => {
      if (showTimer) clearTimeout(showTimer);
    };
  }, []);

  useEffect(() => {
    setCookieBannerOffset(visible);
    return () => setCookieBannerOffset(false);
  }, [visible]);

  function accept() {
    localStorage.setItem(STORAGE_KEY, 'accepted');
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-label="Cookie consent"
      className="fixed z-[80] pointer-events-none left-0 right-0 bottom-[max(1rem,env(safe-area-inset-bottom))] px-4 md:px-6 md:left-auto md:right-6 md:max-w-md"
    >
      <div className="pointer-events-auto border border-brand-slate/30 bg-brand-black/95 backdrop-blur-md px-4 py-4 md:px-5 md:py-5 flex flex-col gap-4 shadow-[0_8px_32px_rgba(0,0,0,0.45)]">
        <p className="type-caption text-brand-light-slate leading-relaxed">
          We use essential cookies and analytics to run the store and understand traffic. See our{' '}
          <Link to="/policies#privacy" className="underline hover:text-brand-white">
            privacy policy
          </Link>
          .
        </p>
        <button
          type="button"
          onClick={accept}
          className="type-btn w-full sm:w-auto self-end bg-brand-white text-brand-black px-6 py-2.5 hover:bg-brand-light-slate transition-colors"
        >
          Accept
        </button>
      </div>
    </div>
  );
}
