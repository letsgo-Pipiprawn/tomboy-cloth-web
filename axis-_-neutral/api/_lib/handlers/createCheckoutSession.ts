import type Stripe from 'stripe';
import {
  audToCents,
  CheckoutError,
  computeShippingAud,
  type CheckoutItemInput,
  validateCheckoutItems,
} from '../commerce';
import { getSiteUrl } from '../env';
import { getStripe } from '../stripe';

export type CreateCheckoutSessionResult =
  | { ok: true; url: string; sessionId: string }
  | { ok: false; status: number; message: string };

export async function createCheckoutSession(
  body: unknown,
): Promise<CreateCheckoutSessionResult> {
  try {
    const payload = body as { items?: CheckoutItemInput[] };
    const items = payload?.items;
    if (!Array.isArray(items)) {
      return { ok: false, status: 400, message: 'Expected { items: [...] }' };
    }

    const { lineItems, subtotalAud } = await validateCheckoutItems(items);
    const shippingAud = computeShippingAud(subtotalAud);
    const totalAud = subtotalAud + shippingAud;
    const siteUrl = getSiteUrl();
    const stripe = getStripe();

    const stripeLineItems: Stripe.Checkout.SessionCreateParams.LineItem[] = lineItems.map(
      (item) => ({
        quantity: item.quantity,
        price_data: {
          currency: 'aud',
          unit_amount: audToCents(item.unitPriceAud),
          product_data: {
            name: item.name,
            description: `Size ${item.size}`,
            metadata: {
              slug: item.slug,
              size: item.size,
            },
          },
        },
      }),
    );

    if (shippingAud > 0) {
      stripeLineItems.push({
        quantity: 1,
        price_data: {
          currency: 'aud',
          unit_amount: audToCents(shippingAud),
          product_data: {
            name: 'Standard Shipping (Australia)',
          },
        },
      });
    }

    const metadataItems = lineItems.map((item) => ({
      slug: item.slug,
      name: item.name,
      size: item.size,
      quantity: item.quantity,
      unitPriceAud: item.unitPriceAud,
      productId: item.productId,
      cjProductId: item.cjProductId,
      cjVariantId: item.cjVariantId,
    }));

    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      line_items: stripeLineItems,
      success_url: `${siteUrl}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${siteUrl}/checkout/cancel`,
      shipping_address_collection: {
        allowed_countries: ['AU'],
      },
      phone_number_collection: { enabled: true },
      metadata: {
        items_json: JSON.stringify(metadataItems),
        subtotal_aud: subtotalAud.toFixed(2),
        shipping_aud: shippingAud.toFixed(2),
        total_aud: totalAud.toFixed(2),
      },
    });

    if (!session.url) {
      return { ok: false, status: 500, message: 'Stripe did not return a checkout URL' };
    }

    return { ok: true, url: session.url, sessionId: session.id };
  } catch (err) {
    if (err instanceof CheckoutError) {
      return { ok: false, status: err.status, message: err.message };
    }
    console.error('[checkout/create-session]', err);
    return { ok: false, status: 500, message: 'Unable to create checkout session' };
  }
}
