import { Link } from 'react-router-dom';
import { Package, Heart, Mail } from 'lucide-react';
import SeoHead from '../components/SeoHead';
import PageHero from '../components/PageHero';
import { useSavedItems } from '../context/SavedItemsContext';
import { BRAND } from '../data/site';

export default function AccountPage() {
  const { count } = useSavedItems();

  const links = [
    {
      icon: Package,
      title: 'Track an order',
      description: 'Look up status with your email and order number from checkout.',
      href: '/orders/track',
    },
    {
      icon: Heart,
      title: 'Saved objects',
      description: `${count} piece${count === 1 ? '' : 's'} saved on this device.`,
      href: '/saved',
    },
    {
      icon: Mail,
      title: 'Contact studio',
      description: 'Sizing, orders, and press.',
      href: '/contact',
    },
  ];

  return (
    <main id="content">
      <SeoHead
        title="Account"
        description="Track orders and contact AXIS / NEUTRAL studio."
        path="/account"
        noindex
      />
      <PageHero
        label="Studio"
        title="Your orders"
        subtitle="Track a purchase or reach the studio — no password needed."
      />

      <div className="container-narrow section-content pb-24 space-y-6">
        {links.map(({ icon: Icon, title, description, href }) => (
          <Link
            key={href}
            to={href}
            className="flex gap-5 p-6 border border-brand-slate/25 hover:border-brand-slate/50 transition-colors group"
          >
            <Icon className="w-5 h-5 text-brand-slate group-hover:text-brand-white shrink-0 mt-1" />
            <div>
              <h2 className="type-body-lg text-brand-white mb-1">{title}</h2>
              <p className="type-body text-brand-slate">{description}</p>
            </div>
          </Link>
        ))}

        <p className="type-caption text-brand-slate pt-8 border-t border-brand-slate/20">
          Questions about shipping? Email{' '}
          <a href={`mailto:${BRAND.email}`} className="text-brand-light-slate hover:text-brand-white">
            {BRAND.email}
          </a>{' '}
          with your order number (AXN-…).
        </p>
      </div>
    </main>
  );
}
