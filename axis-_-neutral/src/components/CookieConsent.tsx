import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const STORAGE_KEY = 'axis-neutral-cookie-consent';

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      if (!localStorage.getItem(STORAGE_KEY)) setVisible(true);
    } catch {
      setVisible(true);
    }
  }, []);

  function accept() {
    localStorage.setItem(STORAGE_KEY, 'accepted');
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-label="Cookie consent"
      className="fixed bottom-0 inset-x-0 z-[80] p-4 md:p-6 pointer-events-none"
    >
      <div className="container-site pointer-events-auto">
        <div className="max-w-3xl mx-auto border border-brand-slate/30 bg-brand-black/95 backdrop-blur-md px-5 py-5 md:px-8 md:py-6 flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-8">
          <p className="type-caption text-brand-light-slate leading-relaxed flex-1">
            We use essential cookies and analytics to run the store and understand traffic. See our{' '}
            <Link to="/policies#privacy" className="underline hover:text-brand-white">
              privacy policy
            </Link>
            .
          </p>
          <button
            type="button"
            onClick={accept}
            className="type-btn shrink-0 bg-brand-white text-brand-black px-8 py-3 hover:bg-brand-light-slate transition-colors"
          >
            Accept
          </button>
        </div>
      </div>
    </div>
  );
}
