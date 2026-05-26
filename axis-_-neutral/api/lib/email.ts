import { getSiteUrl } from './env.js';

type SendEmailInput = {
  to: string;
  subject: string;
  body: string;
};

type SendEmailSuccess = { ok: true };
type SendEmailFailure = { ok: false; error: string };
export type SendEmailResult = SendEmailSuccess | SendEmailFailure;

export function isEmailConfigured(): boolean {
  return Boolean(process.env.RESEND_API_KEY && process.env.EMAIL_FROM);
}

export async function sendEmail(input: SendEmailInput): Promise<SendEmailResult> {
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.EMAIL_FROM;

  if (!apiKey || !from) {
    return { ok: false, error: 'RESEND_API_KEY or EMAIL_FROM not configured' } satisfies SendEmailFailure;
  }

  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from,
      to: [input.to],
      subject: input.subject,
      text: input.body,
    }),
  });

  if (!res.ok) {
    const raw = await res.text();
    return { ok: false, error: raw.slice(0, 240) || `Resend error ${res.status}` } satisfies SendEmailFailure;
  }

  return { ok: true } satisfies SendEmailSuccess;
}

export function buildPreorderOpenEmail(input: {
  productName: string;
  productSlug: string;
  discountPercent: number;
  shipsInWeeks: number;
}): { subject: string; body: string } {
  const url = `${getSiteUrl()}/products/${input.productSlug}`;
  const subject = `Preorder is open — ${input.productName}`;
  const body = `Hi,

You joined the waitlist for ${input.productName}. The threshold has been reached — preorder is now open.

${input.discountPercent}% off early access
Ships in approximately ${input.shipsInWeeks} weeks

Reserve yours: ${url}

This is a preorder item. Your piece is reserved at checkout and ships in approximately ${input.shipsInWeeks} weeks.

— AXIS / NEUTRAL
Melbourne / Australia`;

  return { subject, body };
}
