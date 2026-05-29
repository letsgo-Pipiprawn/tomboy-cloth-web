import Stripe from 'stripe';
import {
  audToCents,
  CheckoutError,
  computeShippingAud,
  type CheckoutItemInput,
  type ShippingMethod,
  validateCheckoutItems,
} from '../commerce.js';
import { encodeCheckoutItemsMetadata } from '../checkoutMetadata.js';
import { getSiteUrl } from '../env.js';
import { getStripe } from '../stripe.js';

/** Match frontend validation phase — manual CJ, standard shipping only. */
const VALIDATION_MODE = process.env.VALIDATION_MODE !== 'false';

export type CreateCheckoutSessionResult =
  | { ok: true; clientSecret: string; sessionId: string }
  | { ok: false; status: number; message: string };

export async function createCheckoutSession(
  body: unknown,
): Promise<CreateCheckoutSessionResult> {
  try {
    const payload = body as { items?: CheckoutItemInput[]; shippingMethod?: ShippingMethod };
    const items = payload?.items;
    if (!Array.isArray(items)) {
      return { ok: false, status: 400, message: 'Expected { items: [...] }' };
    }

    const shippingMethod: ShippingMethod =
      !VALIDATION_MODE && payload.shippingMethod === 'express' ? 'express' : 'standard';

    const { lineItems, subtotalAud } = await validateCheckoutItems(items);
    const shippingAud = computeShippingAud(subtotalAud, shippingMethod);
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
            name:
              shippingMethod === 'express'
                ? 'Express Shipping (Australia)'
                : 'Standard Shipping (Australia)',
          },
        },
      });
    }

    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      ui_mode: 'embedded',
      line_items: stripeLineItems,
      return_url: `${siteUrl}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      shipping_address_collection: {
        allowed_countries: ['AU'],
      },
      phone_number_collection: { enabled: true },
      branding_settings: {
        display_name: 'AXIS / NEUTRAL',
        background_color: '#0a0a0a',
        button_color: '#f1ece4',
        font_family: 'inter',
        border_style: 'rectangular',
      },
      metadata: {
        ...encodeCheckoutItemsMetadata(lineItems),
        subtotal_aud: subtotalAud.toFixed(2),
        shipping_aud: shippingAud.toFixed(2),
        shipping_method: shippingMethod,
        total_aud: totalAud.toFixed(2),
      },
    });

    if (!session.client_secret) {
      return { ok: false, status: 500, message: 'Stripe did not return a checkout client secret' };
    }

    return { ok: true, clientSecret: session.client_secret, sessionId: session.id };
  } catch (err) {
    if (err instanceof CheckoutError) {
      return { ok: false, status: err.status, message: err.message };
    }
    console.error('[checkout/create-session]', err);
    const stripeMessage = err instanceof Stripe.errors.StripeError ? err.message : null;
    return {
      ok: false,
      status: 500,
      message: stripeMessage ?? 'Unable to create checkout session',
    };
  }
}
