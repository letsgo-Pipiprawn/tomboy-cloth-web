import 'dotenv/config';
import express from 'express';
import { createCheckoutSession } from '../api/lib/handlers/createCheckoutSession.js';
import {
  fetchCheckoutSessionSummary,
  processStripeWebhook,
} from '../api/lib/handlers/stripeWebhook.js';
import wishlistSignup from '../api/wishlist/signup.js';
import wishlistCount from '../api/wishlist/count.js';
import newsletterSignup from '../api/newsletter/signup.js';
import orderTrack from '../api/orders/track.js';

const app = express();
const port = Number(process.env.API_PORT ?? 3002);

function asVercelHandler(handler: (req: unknown, res: unknown) => Promise<unknown>) {
  return (req: express.Request, res: express.Response) => {
    void handler(req, res);
  };
}

app.post('/api/checkout/create-session', express.json(), async (req, res) => {
  const result = await createCheckoutSession(req.body);
  if (result.ok === false) {
    return res.status(result.status).json({ error: result.message });
  }
  return res.status(200).json({ url: result.url, sessionId: result.sessionId });
});

app.get('/api/checkout/session', async (req, res) => {
  const sessionId = typeof req.query.session_id === 'string' ? req.query.session_id : null;
  if (!sessionId) {
    return res.status(400).json({ error: 'session_id is required' });
  }
  try {
    const summary = await fetchCheckoutSessionSummary(sessionId);
    return res.status(200).json(summary);
  } catch (err) {
    console.error('[checkout/session]', err);
    return res.status(404).json({ error: 'Session not found' });
  }
});

app.post(
  '/api/webhooks/stripe',
  express.raw({ type: 'application/json' }),
  async (req, res) => {
    const signature = req.headers['stripe-signature'];
    const sig = Array.isArray(signature) ? signature[0] : signature;
    const rawBody = Buffer.isBuffer(req.body) ? req.body : Buffer.from(req.body ?? '');
    const result = await processStripeWebhook(rawBody, sig);
    return res.status(result.status).send(result.body);
  },
);

app.get('/api/wishlist/count', asVercelHandler(wishlistCount));
app.post('/api/wishlist/signup', express.json(), asVercelHandler(wishlistSignup));
app.post('/api/newsletter/signup', express.json(), asVercelHandler(newsletterSignup));
app.post('/api/orders/track', express.json(), asVercelHandler(orderTrack));

app.listen(port, () => {
  console.log(`[dev-api] http://127.0.0.1:${port}`);
});
