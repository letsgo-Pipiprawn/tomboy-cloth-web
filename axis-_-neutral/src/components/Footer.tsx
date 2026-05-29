import { useState, type FormEvent } from 'react';
import { Link } from 'react-router-dom';
import { FOOTER_EXPLORE, FOOTER_SUPPORT } from '../data/site';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState<string | null>(null);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const nextEmail = email.trim();
    if (!nextEmail) {
      setStatus('error');
      setMessage('Enter an email address');
      return;
    }

    const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(nextEmail);
    if (!isValid) {
      setStatus('error');
      setMessage('Enter a valid email address');
      return;
    }

    setStatus('loading');
    setMessage(null);

    try {
      const res = await fetch('/api/newsletter/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: nextEmail, source: 'footer' }),
      });
      const data = (await res.json()) as { ok?: boolean; error?: string; duplicate?: boolean };

      if (!res.ok || !data.ok) {
        setStatus('error');
        setMessage(data.error ?? 'Could not save your email. Try again.');
        return;
      }

      setStatus('success');
      setMessage(
        data.duplicate ? 'You are already on the list.' : 'You are on the list. Drop notes only — no noise.',
      );
      setEmail('');
    } catch {
      setStatus('error');
      setMessage('Network error. Try again in a moment.');
    }
  }

  return (
    <footer className="bg-brand-black border-t border-brand-slate/20 mt-20 md:mt-[150px] overflow-x-clip">
      <div className="container-site py-16 md:py-24">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-16 mb-16 md:mb-20">
          <div className="lg:col-span-2">
            <p className="type-label text-brand-slate mb-6 tracking-[0.2em]">AXIS / NEUTRAL</p>
            <h2 className="outline-display max-w-xl mb-8">JOIN THE UNDERGROUND.</h2>
            <form className="max-w-md" onSubmit={(e) => void handleSubmit(e)}>
              <div className="flex items-end gap-4 border-b border-brand-slate/45 pb-4">
                <input
                  type="email"
                  value={email}
                  onChange={(event) => {
                    setEmail(event.target.value);
                    if (message) setMessage(null);
                    if (status !== 'idle') setStatus('idle');
                  }}
                  placeholder="Leave your email."
                  aria-label="Email for newsletter"
                  disabled={status === 'loading' || status === 'success'}
                  className="flex-1 bg-transparent type-body-lg text-brand-white placeholder:text-brand-slate/70 outline-none border-none disabled:opacity-60"
                />
                <button
                  type="submit"
                  disabled={status === 'loading' || status === 'success'}
                  className="text-3xl leading-none text-brand-light-slate hover:text-brand-white transition-colors px-1 disabled:opacity-50"
                  aria-label="Submit email"
                >
                  →
                </button>
              </div>
              {message && (
                <p
                  className={`type-body mt-3 ${status === 'error' ? 'text-brand-light-slate' : 'text-[#C8B090]'}`}
                  role={status === 'error' ? 'alert' : 'status'}
                >
                  {message}
                </p>
              )}
            </form>
          </div>

          <div>
            <p className="type-label text-brand-slate mb-6">Explore</p>
            <ul className="space-y-3">
              {FOOTER_EXPLORE.map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className="type-caption text-brand-light-slate hover:text-brand-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="type-label text-brand-slate mb-6">Support</p>
            <ul className="space-y-3">
              {FOOTER_SUPPORT.map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className="type-caption text-brand-light-slate hover:text-brand-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-4 pt-8 border-t border-brand-slate/20 type-caption text-brand-slate/70">
          <p>&copy; {new Date().getFullYear()} Axis Neutral Studio</p>
          <p>Melbourne / Australia</p>
        </div>
      </div>
    </footer>
  );
}
