import { useState, type FormEvent } from 'react';
import { Link } from 'react-router-dom';

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
      <div className="container-site min-h-[75svh] md:min-h-screen flex flex-col justify-center items-center text-center py-16 md:py-20">
        <p className="type-label text-brand-slate mb-6 tracking-[0.2em] md:tracking-[0.3em]">AXIS / NEUTRAL</p>
        <h2 className="outline-display w-full px-1 mb-12 md:mb-16">
          JOIN THE UNDERGROUND.
        </h2>

        <form className="w-full max-w-2xl" onSubmit={(e) => void handleSubmit(e)}>
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
              className={`type-body mt-3 text-left ${status === 'error' ? 'text-brand-light-slate' : 'text-[#C8B090]'}`}
              role={status === 'error' ? 'alert' : 'status'}
            >
              {message}
            </p>
          )}
        </form>

        <div className="mt-12 md:mt-16 flex flex-wrap items-center justify-center gap-x-6 gap-y-3 sm:gap-8 type-caption text-brand-slate">
          <Link to="/policies" className="hover:text-brand-white transition-colors">
            Policies
          </Link>
          <Link to="/orders/track" className="hover:text-brand-white transition-colors">
            Track order
          </Link>
          <Link to="/contact" className="hover:text-brand-white transition-colors">
            Contact
          </Link>
          <Link to="/about" className="hover:text-brand-white transition-colors">
            Journal
          </Link>
        </div>
        <p className="type-caption text-brand-slate/70 mt-8">
          &copy; {new Date().getFullYear()} Axis Neutral Studio
        </p>
        <p className="type-caption text-brand-slate/60 mt-2">Melbourne / Australia</p>
      </div>
    </footer>
  );
}
