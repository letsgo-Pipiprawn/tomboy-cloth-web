/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import ScrollToTop from './components/ScrollToTop';
import Layout from './components/Layout';
import AnalyticsListener from './components/AnalyticsListener';
import HomePage from './pages/HomePage';
import { getFeaturedProduct } from './data/products';

const CollectionPage = lazy(() => import('./pages/CollectionPage'));
const ProductPage = lazy(() => import('./pages/ProductPage'));
const AboutPage = lazy(() => import('./pages/AboutPage'));
const PolicyPage = lazy(() => import('./pages/PolicyPage'));
const FAQPage = lazy(() => import('./pages/FAQPage'));
const ContactPage = lazy(() => import('./pages/ContactPage'));
const SizeGuidePage = lazy(() => import('./pages/SizeGuidePage'));
const CheckoutPage = lazy(() => import('./pages/CheckoutPage'));
const CheckoutSuccessPage = lazy(() => import('./pages/CheckoutSuccessPage'));
const CheckoutCancelPage = lazy(() => import('./pages/CheckoutCancelPage'));
const OrderTrackPage = lazy(() => import('./pages/OrderTrackPage'));
const CartPage = lazy(() => import('./pages/CartPage'));
const LookbookPage = lazy(() => import('./pages/LookbookPage'));
const SavedPage = lazy(() => import('./pages/SavedPage'));
const AccountPage = lazy(() => import('./pages/AccountPage'));
const PolicyRedirectPage = lazy(() => import('./pages/PolicyRedirectPage'));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage'));

function FeaturedProductRedirect() {
  const product = getFeaturedProduct();
  if (!product) return <Navigate to="/collections/all" replace />;
  return <Navigate to={`/products/${product.slug}`} replace />;
}

function RouteFallback() {
  return (
    <main className="min-h-[50vh] flex items-center justify-center section-content">
      <p className="type-body text-brand-slate">Loading...</p>
    </main>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <AnalyticsListener />
      <Suspense fallback={<RouteFallback />}>
        <Routes>
          <Route element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route path="collections/:slug" element={<CollectionPage />} />
            <Route path="collections" element={<Navigate to="/collections/all" replace />} />
            <Route path="products/:slug" element={<ProductPage />} />
            <Route path="product" element={<FeaturedProductRedirect />} />
            <Route path="about" element={<AboutPage />} />
            <Route path="policies" element={<PolicyPage />} />
            <Route path="faq" element={<FAQPage />} />
            <Route path="contact" element={<ContactPage />} />
            <Route path="size-guide" element={<SizeGuidePage />} />
            <Route path="checkout" element={<CheckoutPage />} />
            <Route path="checkout/success" element={<CheckoutSuccessPage />} />
            <Route path="checkout/cancel" element={<CheckoutCancelPage />} />
            <Route path="cart" element={<CartPage />} />
            <Route path="lookbook" element={<LookbookPage />} />
            <Route path="saved" element={<SavedPage />} />
            <Route path="account" element={<AccountPage />} />
            <Route path="shipping" element={<PolicyRedirectPage />} />
            <Route path="returns" element={<PolicyRedirectPage />} />
            <Route path="privacy" element={<PolicyRedirectPage />} />
            <Route path="terms" element={<PolicyRedirectPage />} />
            <Route path="orders/track" element={<OrderTrackPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}
