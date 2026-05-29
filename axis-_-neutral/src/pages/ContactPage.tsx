import { useState } from 'react';
import PageHero from '../components/PageHero';
import SeoHead from '../components/SeoHead';
import SectionLabel from '../components/SectionLabel';
import { BRAND } from '../data/site';

export default function ContactPage() {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const name = String(data.get('name') ?? '').trim();
    const email = String(data.get('email') ?? '').trim();
    const body = String(data.get('message') ?? '').trim();

    setStatus('loading');
    setMessage(null);

    try {
      const res = await fetch('/api/contact/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, message: body }),
      });
      const json = (await res.json()) as { ok?: boolean; error?: string };
      if (!res.ok || !json.ok) {
        setStatus('error');
        setMessage(json.error ?? 'Could not send message. Email us directly.');
        return;
      }
      setStatus('success');
      setMessage('Thank you — we received your message and will reply as soon as we can.');
      form.reset();
    } catch {
      setStatus('error');
      setMessage('Network error. Try again or email studio@axisneutral.com.');
    }
  }

  return (
    <main id="content">
      <SeoHead
        title="Contact"
        description={`Contact ${BRAND.name} studio in Melbourne — orders, sizing, and press.`}
        path="/contact"
      />
      <PageHero
        label="Studio"
        title="Get in Touch"
        subtitle="Orders, sizing, and press. Prefer email? Write us directly."
      />
      <div className="container-narrow section-content">
        <div className="mb-14 space-y-8 type-body text-brand-slate">
          <p>
            <span className="type-label text-brand-white block mb-2">Email (fastest)</span>
            <a href={`mailto:${BRAND.email}`} className="hover:text-brand-white transition-colors">
              {BRAND.email}
            </a>
          </p>
          <p>
            <span className="type-label text-brand-white block mb-2">Location</span>
            {BRAND.location}
          </p>
        </div>

        {status === 'success' ? (
          <p className="type-body-lg text-brand-light-slate" role="status">
            {message}
          </p>
        ) : (
          <form className="space-y-8" onSubmit={(e) => void handleSubmit(e)}>
            <SectionLabel>Enquiry</SectionLabel>
            <div>
              <label htmlFor="name" className="type-label text-brand-slate block mb-3">
                Name
              </label>
              <input
                id="name"
                name="name"
                required
                disabled={status === 'loading'}
                className="w-full bg-transparent border border-brand-slate/40 px-4 py-3.5 type-body text-brand-white focus:border-brand-white outline-none transition-colors disabled:opacity-60"
              />
            </div>
            <div>
              <label htmlFor="email" className="type-label text-brand-slate block mb-3">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                disabled={status === 'loading'}
                className="w-full bg-transparent border border-brand-slate/40 px-4 py-3.5 type-body text-brand-white focus:border-brand-white outline-none transition-colors disabled:opacity-60"
              />
            </div>
            <div>
              <label htmlFor="message" className="type-label text-brand-slate block mb-3">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                rows={5}
                required
                minLength={10}
                disabled={status === 'loading'}
                className="w-full bg-transparent border border-brand-slate/40 px-4 py-3.5 type-body text-brand-white focus:border-brand-white outline-none transition-colors resize-none disabled:opacity-60"
              />
            </div>
            {message && status === 'error' && (
              <p className="type-caption text-brand-light-slate" role="alert">
                {message}
              </p>
            )}
            <button
              type="submit"
              disabled={status === 'loading'}
              className="type-btn bg-brand-white text-brand-black px-10 py-4 hover:bg-brand-light-slate transition-colors disabled:opacity-60"
            >
              {status === 'loading' ? 'Sending…' : 'Send Message'}
            </button>
          </form>
        )}
      </div>
    </main>
  );
}
