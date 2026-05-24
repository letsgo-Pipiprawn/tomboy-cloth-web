import { Link } from 'react-router-dom';
import SeoHead from '../components/SeoHead';
import { BRAND } from '../data/site';

export default function CheckoutCancelPage() {
  return (
    <>
      <SeoHead title="Checkout cancelled" description={`${BRAND.name} checkout`} />
      <section className="section-y container-narrow text-center">
        <p className="type-label text-brand-slate mb-4">Checkout</p>
        <h1 className="type-h1 text-brand-white mb-6">Payment cancelled</h1>
        <p className="type-body-lg text-brand-light-slate mb-10 max-w-md mx-auto">
          Your bag is unchanged. Return when you are ready — we ship across Australia.
        </p>
        <Link
          to="/collections/aw26"
          className="type-link text-brand-white border-b border-brand-slate pb-1"
        >
          Back to shop
        </Link>
      </section>
    </>
  );
}
