import type { VercelRequest, VercelResponse } from '@vercel/node';
import { sendEmail, isEmailConfigured } from '../email.js';
import { getSupabaseAdmin, isSupabaseAdminConfigured } from '../supabaseAdmin.js';

const STUDIO_EMAIL = process.env.CONTACT_TO_EMAIL ?? 'studio@axisneutral.com';

type Body = {
  name?: string;
  email?: string;
  message?: string;
};

export async function handleContactSubmit(req: VercelRequest, res: VercelResponse) {
  const body = (typeof req.body === 'string' ? JSON.parse(req.body) : req.body) as Body;
  const name = body.name?.trim();
  const email = body.email?.trim().toLowerCase();
  const message = body.message?.trim();

  if (!name || name.length < 2) {
    return res.status(400).json({ error: 'Name is required' });
  }
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return res.status(400).json({ error: 'Valid email required' });
  }
  if (!message || message.length < 10) {
    return res.status(400).json({ error: 'Message must be at least 10 characters' });
  }

  if (isSupabaseAdminConfigured()) {
    const supabase = getSupabaseAdmin();
    const { error } = await supabase.from('contact_inquiries').insert({ name, email, message });
    if (error) {
      console.error('[contact/submit] db', error);
      return res.status(500).json({ error: 'Could not save enquiry' });
    }
  }

  if (isEmailConfigured()) {
    const result = await sendEmail({
      to: STUDIO_EMAIL,
      subject: `[AXIS / NEUTRAL] Contact — ${name}`,
      body: `Name: ${name}\nEmail: ${email}\n\n${message}`,
    });
    if (!result.ok) {
      console.error('[contact/submit] email', 'error' in result ? result.error : 'unknown');
    }
  }

  if (!isSupabaseAdminConfigured() && !isEmailConfigured()) {
    return res.status(503).json({
      error: 'Contact form is not configured yet. Email studio@axisneutral.com directly.',
    });
  }

  return res.status(200).json({ ok: true });
}
