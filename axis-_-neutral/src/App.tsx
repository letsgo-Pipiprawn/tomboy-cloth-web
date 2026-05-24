/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import ScrollToTop from './components/ScrollToTop';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import CollectionPage from './pages/CollectionPage';
import ProductPage from './pages/ProductPage';
import AboutPage from './pages/AboutPage';
import PolicyPage from './pages/PolicyPage';
import FAQPage from './pages/FAQPage';
import ContactPage from './pages/ContactPage';
import SizeGuidePage from './pages/SizeGuidePage';
import CheckoutSuccessPage from './pages/CheckoutSuccessPage';
import CheckoutCancelPage from './pages/CheckoutCancelPage';
import NotFoundPage from './pages/NotFoundPage';
import { getFeaturedProduct } from './data/products';

function FeaturedProductRedirect() {
  const product = getFeaturedProduct();
  return <Navigate to={`/products/${product.slug}`} replace />;
}

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="collections/:slug" element={<CollectionPage />} />
          <Route path="collections" element={<Navigate to="/collections/aw26" replace />} />
          <Route path="products/:slug" element={<ProductPage />} />
          <Route path="product" element={<FeaturedProductRedirect />} />
          <Route path="about" element={<AboutPage />} />
          <Route path="policies" element={<PolicyPage />} />
          <Route path="faq" element={<FAQPage />} />
          <Route path="contact" element={<ContactPage />} />
          <Route path="size-guide" element={<SizeGuidePage />} />
          <Route path="checkout/success" element={<CheckoutSuccessPage />} />
          <Route path="checkout/cancel" element={<CheckoutCancelPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
