import { useState, type FormEvent } from 'react';
import { Link } from 'react-router-dom';
import { BRAND } from '../data/site';

const DROP_NOTES_SUBJECT = encodeURIComponent('AXIS / NEUTRAL drop notes');

function buildDropNotesMailto(email: string) {
  const body = encodeURIComponent(
    `Please add this address to AXIS / NEUTRAL drop notes:\n\n${email.trim()}`,
  );
  return `mailto:${BRAND.email}?subject=${DROP_NOTES_SUBJECT}&body=${body}`;
}

export default function Footer() {
  const [email, setEmail] = useState('');
  const [formError, setFormError] = useState<string | null>(null);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const nextEmail = email.trim();
    if (!nextEmail) {
      setFormError('Enter an email address');
      return;
    }

    const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(nextEmail);
    if (!isValid) {
      setFormError('Enter a valid email address');
      return;
    }

    setFormError(null);
    window.location.href = buildDropNotesMailto(nextEmail);
  }

  return (
    <footer className="bg-brand-black border-t border-brand-slate/20 mt-[150px]">
      <div className="container-site min-h-screen flex flex-col justify-center items-center text-center py-20">
        <p className="type-label text-brand-slate mb-6 tracking-[0.3em]">AXIS / NEUTRAL</p>
        <h2 className="marquee-outline !text-[clamp(2.8rem,12vw,10rem)] leading-[0.86] mb-16">
          JOIN THE UNDERGROUND.
        </h2>

        <form className="w-full max-w-2xl" onSubmit={handleSubmit}>
          <div className="flex items-end gap-4 border-b border-brand-slate/45 pb-4">
            <input
              type="email"
              value={email}
              onChange={(event) => {
                setEmail(event.target.value);
                if (formError) setFormError(null);
              }}
              placeholder="Leave your email."
              aria-label="Email for newsletter"
              className="flex-1 bg-transparent type-body-lg text-brand-white placeholder:text-brand-slate/70 outline-none border-none"
            />
            <button
              type="submit"
              className="text-3xl leading-none text-brand-light-slate hover:text-brand-white transition-colors px-1"
              aria-label="Submit email"
            >
              →
            </button>
          </div>
          {formError && <p className="type-body text-brand-light-slate mt-3 text-left">{formError}</p>}
        </form>

        <div className="mt-16 flex items-center gap-8 type-caption text-brand-slate">
          <Link to="/policies" className="hover:text-brand-white transition-colors">
            Policies
          </Link>
          <a href={`mailto:${BRAND.email}`} className="hover:text-brand-white transition-colors">
            Contact
          </a>
          <Link to="/about" className="hover:text-brand-white transition-colors">
            Journal
          </Link>
        </div>
        <p className="type-caption text-brand-slate/70 mt-8">
          &copy; {new Date().getFullYear()} Axis Neutral Studio
        </p>
        <p className="type-caption text-brand-slate/60 mt-2">Melbourne / Australia</p>
      </div>
      <div className="container-site pb-10">
        <p className="type-caption text-brand-slate/60 text-center">
          Opens your mail client for drop note requests
        </p>
      </div>
    </footer>
  );
}
