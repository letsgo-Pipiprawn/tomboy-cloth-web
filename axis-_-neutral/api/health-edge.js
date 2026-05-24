export const config = { runtime: 'edge' };

export default function handler() {
  return Response.json({
    ok: true,
    runtime: 'edge',
    stripe: Boolean(process.env.STRIPE_SECRET_KEY),
  });
}
