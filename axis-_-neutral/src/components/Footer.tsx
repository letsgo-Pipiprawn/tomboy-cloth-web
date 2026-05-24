import { Link } from 'react-router-dom';
import { BRAND, AU_COMMERCE, FOOTER_EXPLORE, FOOTER_SUPPORT } from '../data/site';
import { formatPrice } from '../data/products';

export default function Footer() {
  return (
    <footer className="bg-brand-black section-y-sm border-t border-brand-slate/20">
      <div className="container-site">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-14 md:gap-12 mb-20 md:mb-28">
          <div className="col-span-1 md:col-span-2">
            <Link to="/" className="font-serif text-2xl tracking-[0.12em] text-brand-white mb-8 block">
              AXIS <span className="opacity-50">/</span> NEUTRAL
            </Link>
            <p className="type-body-lg text-brand-slate max-w-sm">{BRAND.description}</p>
          </div>

          <div>
            <h2 className="type-label text-brand-white mb-6">Explore</h2>
            <ul className="flex flex-col gap-5 type-body text-brand-slate">
              {FOOTER_EXPLORE.map((item) => (
                <li key={item.label}>
                  <Link to={item.href} className="hover:text-brand-white transition-colors">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="type-label text-brand-white mb-6">Support</h2>
            <ul className="flex flex-col gap-5 type-body text-brand-slate">
              {FOOTER_SUPPORT.map((item) => (
                <li key={item.label}>
                  {item.href.startsWith('mailto') ? (
                    <a href={item.href} className="hover:text-brand-white transition-colors">
                      {item.label}
                    </a>
                  ) : (
                    <Link to={item.href} className="hover:text-brand-white transition-colors">
                      {item.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-16 pt-14 border-t border-brand-slate/20">
          <p className="type-label text-brand-slate mb-5">Studio notes</p>
          <form
            className="flex flex-col sm:flex-row gap-4 max-w-md"
            onSubmit={(e) => {
              e.preventDefault();
            }}
          >
            <input
              type="email"
              placeholder="Email address"
              aria-label="Email for newsletter"
              className="flex-1 bg-transparent border border-brand-slate/40 px-4 py-3.5 type-body text-brand-white placeholder:text-brand-slate focus:border-brand-white outline-none"
            />
            <button
              type="submit"
              className="type-btn bg-brand-white text-brand-black px-7 py-3.5 hover:bg-brand-light-slate transition-colors shrink-0"
            >
              Join
            </button>
          </form>
          <p className="type-caption text-brand-slate mt-4">Drop alerts · No spam</p>
        </div>

        <p className="type-caption text-brand-slate/70 max-w-2xl leading-relaxed pt-10 mt-10 border-t border-brand-slate/20">
          {BRAND.location} · Complimentary delivery within Australia on orders over{' '}
          {formatPrice(AU_COMMERCE.freeShippingThresholdAud)} · {AU_COMMERCE.returnsDays}-day
          returns ·{' '}
          <Link to="/policies" className="hover:text-brand-white transition-colors">
            Client services
          </Link>
        </p>

        <div className="flex flex-col md:flex-row justify-between items-start md:items-center pt-8 type-caption text-brand-slate gap-6">
          <p>&copy; {new Date().getFullYear()} Axis Neutral Studio. All rights reserved.</p>
          <div className="flex gap-8">
            <a href="#" className="hover:text-brand-white transition-colors">
              Instagram
            </a>
            <a href="#" className="hover:text-brand-white transition-colors">
              Pinterest
            </a>
            <Link to="/about" className="hover:text-brand-white transition-colors">
              Journal
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
