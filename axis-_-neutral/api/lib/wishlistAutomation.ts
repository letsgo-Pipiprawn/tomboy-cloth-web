import { buildPreorderOpenEmail, isEmailConfigured, sendEmail } from './email.js';
import { getSupabaseAdmin } from './supabaseAdmin.js';

type WishlistProduct = {
  slug: string;
  name: string;
  fulfillment_type: string;
  wishlist_goal: number;
  preorder_discount_percent: number;
  ships_in_weeks: number;
};

export type PreorderOpenResult = {
  opened: boolean;
  alreadyOpen: boolean;
  emailsQueued: number;
  emailsSent: number;
};

async function getWishlistProduct(slug: string): Promise<WishlistProduct | null> {
  const supabase = getSupabaseAdmin();
  const { data, error } = await supabase
    .from('products')
    .select(
      'slug, name, fulfillment_type, wishlist_goal, preorder_discount_percent, ships_in_weeks',
    )
    .eq('slug', slug)
    .eq('is_active', true)
    .maybeSingle();

  if (error || !data) return null;
  return data as WishlistProduct;
}

async function getSignupCount(slug: string): Promise<number> {
  const supabase = getSupabaseAdmin();
  const { count } = await supabase
    .from('wishlist_signups')
    .select('*', { count: 'exact', head: true })
    .eq('product_slug', slug);
  return count ?? 0;
}

async function queuePreorderNotifications(
  product: WishlistProduct,
): Promise<{ queued: number; sent: number }> {
  const supabase = getSupabaseAdmin();
  const { data: signups, error } = await supabase
    .from('wishlist_signups')
    .select('id, email')
    .eq('product_slug', product.slug)
    .is('preorder_notified_at', null);

  if (error || !signups?.length) {
    return { queued: 0, sent: 0 };
  }

  const { subject, body } = buildPreorderOpenEmail({
    productName: product.name,
    productSlug: product.slug,
    discountPercent: product.preorder_discount_percent,
    shipsInWeeks: product.ships_in_weeks,
  });

  let sent = 0;
  const canSendNow = isEmailConfigured();

  for (const signup of signups) {
    const { data: outboxRow, error: outboxError } = await supabase
      .from('email_outbox')
      .insert({
        to_email: signup.email,
        subject,
        body,
        template: 'preorder_open',
        metadata: { product_slug: product.slug, signup_id: signup.id },
      })
      .select('id')
      .single();

    if (outboxError || !outboxRow) continue;

    if (canSendNow) {
      const result = await sendEmail({ to: signup.email, subject, body });
      if (!result.ok) {
        await supabase
          .from('email_outbox')
          .update({
            status: 'failed',
            last_error: 'error' in result ? result.error : 'Send failed',
            attempts: 1,
          })
          .eq('id', outboxRow.id);
        continue;
      }

      sent += 1;
      await supabase
        .from('email_outbox')
        .update({ status: 'sent', sent_at: new Date().toISOString(), attempts: 1 })
        .eq('id', outboxRow.id);
      await supabase
        .from('wishlist_signups')
        .update({ preorder_notified_at: new Date().toISOString() })
        .eq('id', signup.id);
    }
  }

  return { queued: signups.length, sent };
}

/** When wishlist count >= goal, flip product to preorder and notify signups. */
export async function maybeOpenPreorder(productSlug: string): Promise<PreorderOpenResult> {
  const product = await getWishlistProduct(productSlug);
  if (!product) {
    return { opened: false, alreadyOpen: false, emailsQueued: 0, emailsSent: 0 };
  }

  if (product.fulfillment_type === 'preorder') {
    return { opened: false, alreadyOpen: true, emailsQueued: 0, emailsSent: 0 };
  }

  if (product.fulfillment_type !== 'wishlist') {
    return { opened: false, alreadyOpen: false, emailsQueued: 0, emailsSent: 0 };
  }

  const count = await getSignupCount(productSlug);
  if (count < product.wishlist_goal) {
    return { opened: false, alreadyOpen: false, emailsQueued: 0, emailsSent: 0 };
  }

  const supabase = getSupabaseAdmin();
  const openedAt = new Date().toISOString();

  const { data: updated, error: updateError } = await supabase
    .from('products')
    .update({
      fulfillment_type: 'preorder',
      preorder_opened_at: openedAt,
    })
    .eq('slug', productSlug)
    .eq('fulfillment_type', 'wishlist')
    .select('slug, name, preorder_discount_percent, ships_in_weeks')
    .maybeSingle();

  if (updateError || !updated) {
    return { opened: false, alreadyOpen: false, emailsQueued: 0, emailsSent: 0 };
  }

  const notifyProduct: WishlistProduct = {
    ...product,
    name: updated.name ?? product.name,
    fulfillment_type: 'preorder',
  };

  const { queued, sent } = await queuePreorderNotifications(notifyProduct);

  console.info('[wishlist] Preorder opened', productSlug, { count, queued, sent });

  return {
    opened: true,
    alreadyOpen: false,
    emailsQueued: queued,
    emailsSent: sent,
  };
}

export async function processEmailOutbox(limit = 20): Promise<{
  processed: number;
  sent: number;
  failed: number;
}> {
  if (!isEmailConfigured()) {
    return { processed: 0, sent: 0, failed: 0 };
  }

  const supabase = getSupabaseAdmin();
  const { data: rows, error } = await supabase
    .from('email_outbox')
    .select('id, to_email, subject, body, attempts, metadata')
    .eq('status', 'pending')
    .order('created_at', { ascending: true })
    .limit(limit);

  if (error || !rows?.length) {
    return { processed: 0, sent: 0, failed: 0 };
  }

  let sent = 0;
  let failed = 0;

  for (const row of rows) {
    const result = await sendEmail({
      to: row.to_email,
      subject: row.subject,
      body: row.body,
    });

    const attempts = (row.attempts ?? 0) + 1;
    const metadata = row.metadata as { signup_id?: string } | null;

    if (!result.ok) {
      failed += 1;
      await supabase
        .from('email_outbox')
        .update({
          status: 'failed',
          last_error: 'error' in result ? result.error : 'Send failed',
          attempts,
        })
        .eq('id', row.id);
      continue;
    }

    sent += 1;
    await supabase
      .from('email_outbox')
      .update({ status: 'sent', sent_at: new Date().toISOString(), attempts })
      .eq('id', row.id);
    if (metadata?.signup_id) {
      await supabase
        .from('wishlist_signups')
        .update({ preorder_notified_at: new Date().toISOString() })
        .eq('id', metadata.signup_id);
    }
  }

  return { processed: rows.length, sent, failed };
}
