import { useState } from 'react';

type RestockNotifyFormProps = {
  slug: string;
  size: string;
};

export default function RestockNotifyForm({ slug, size }: RestockNotifyFormProps) {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const nextEmail = email.trim();
    if (!nextEmail) return;

    setStatus('loading');
    setMessage(null);

    try {
      const res = await fetch('/api/restock/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: nextEmail, slug, size }),
      });
      const data = (await res.json()) as { ok?: boolean; error?: string; duplicate?: boolean };
      if (!res.ok || !data.ok) {
        setStatus('error');
        setMessage(data.error ?? 'Could not save alert');
        return;
      }
      setStatus('success');
      setMessage(
        data.duplicate
          ? 'You are already on the list for this size.'
          : 'We will email you when this size is back.',
      );
      setEmail('');
    } catch {
      setStatus('error');
      setMessage('Network error. Try again.');
    }
  }

  if (status === 'success') {
    return <p className="type-caption text-[#C8B090] mt-3">{message}</p>;
  }

  return (
    <form onSubmit={(e) => void handleSubmit(e)} className="mt-4 space-y-3">
      <p className="type-caption text-brand-slate">Notify me when size {size} is back</p>
      <div className="flex gap-2">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Your email"
          required
          disabled={status === 'loading'}
          className="flex-1 bg-transparent border border-brand-slate/40 px-3 py-2.5 type-caption text-brand-white outline-none focus:border-brand-white"
        />
        <button
          type="submit"
          disabled={status === 'loading'}
          className="type-caption uppercase tracking-widest border border-brand-slate/40 px-4 hover:border-brand-white transition-colors disabled:opacity-50"
        >
          Notify
        </button>
      </div>
      {message && status === 'error' && (
        <p className="type-caption text-brand-light-slate" role="alert">
          {message}
        </p>
      )}
    </form>
  );
}
