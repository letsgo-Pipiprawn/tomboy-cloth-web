import { Link, useNavigate } from 'react-router-dom';
import { ShoppingBag } from 'lucide-react';
import SeoHead from '../components/SeoHead';
import PageHero from '../components/PageHero';
import CartSummary from '../components/CartSummary';
import { useCart } from '../context/CartContext';

export default function CartPage() {
  const navigate = useNavigate();
  const { items, itemCount } = useCart();

  function handleCheckout() {
    navigate('/checkout');
  }

  return (
    <main id="content">
      <SeoHead title="Shopping Bag" description="Review your AXIS / NEUTRAL bag before checkout." path="/cart" />
      <PageHero label="Bag" title="Your Selection" subtitle={`${itemCount} item${itemCount === 1 ? '' : 's'}`} />

      <div className="container-site section-content pb-24">
        {items.length === 0 ? (
          <div className="flex flex-col items-center gap-6 py-20 text-center">
            <ShoppingBag className="w-12 h-12 text-brand-slate stroke-[1]" />
            <p className="type-body text-brand-slate">Your bag is empty.</p>
            <Link
              to="/collections/all"
              className="type-link text-brand-slate border-b border-brand-slate pb-1 hover:text-brand-white"
            >
              Shop all objects
            </Link>
          </div>
        ) : (
          <div className="max-w-lg mx-auto">
            <CartSummary onCheckout={handleCheckout} />
          </div>
        )}
      </div>
    </main>
  );
}
