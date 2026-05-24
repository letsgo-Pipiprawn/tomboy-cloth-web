import { Link } from 'react-router-dom';
import { BRAND, FOOTER_EXPLORE, FOOTER_SUPPORT } from '../data/site';

export default function Footer() {
  return (
    <footer className="bg-brand-black pt-24 pb-8 border-t border-brand-slate/20">
      <div className="max-w-screen-2xl mx-auto px-8 md:px-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-24">
          <div className="col-span-1 md:col-span-2">
            <Link to="/" className="font-serif text-2xl tracking-widest text-brand-white mb-6 block">
              AXIS <span className="opacity-50">/</span> NEUTRAL
            </Link>
            <p className="text-brand-slate text-sm max-w-sm leading-relaxed">{BRAND.description}</p>
          </div>

          <div>
            <h5 className="text-brand-white text-xs uppercase tracking-[0.2em] font-medium mb-6">
              Explore
            </h5>
            <ul className="flex flex-col gap-4 text-sm text-brand-slate">
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
            <h5 className="text-brand-white text-xs uppercase tracking-[0.2em] font-medium mb-6">
              Support
            </h5>
            <ul className="flex flex-col gap-4 text-sm text-brand-slate">
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

        <div className="mt-16 pt-12 border-t border-brand-slate/20">
          <p className="text-[11px] uppercase tracking-[0.2em] text-brand-slate mb-4">Studio notes</p>
          <form
            className="flex flex-col sm:flex-row gap-3 max-w-md"
            onSubmit={(e) => {
              e.preventDefault();
            }}
          >
            <input
              type="email"
              placeholder="Email address"
              aria-label="Email for newsletter"
              className="flex-1 bg-transparent border border-brand-slate/40 px-4 py-3 text-sm text-brand-white placeholder:text-brand-slate focus:border-brand-white outline-none"
            />
            <button
              type="submit"
              className="bg-brand-white text-brand-black px-6 py-3 text-xs uppercase tracking-widest font-semibold hover:bg-brand-light-slate transition-colors shrink-0"
            >
              Join
            </button>
          </form>
          <p className="text-[10px] text-brand-slate mt-3">Drop alerts · No spam</p>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-start md:items-center pt-8 border-t border-brand-slate/20 text-xs text-brand-slate uppercase tracking-widest gap-4">
          <p>&copy; {new Date().getFullYear()} Axis Neutral Studio. All rights reserved.</p>
          <div className="flex gap-6">
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
