module.exports = (_req, res) => {
  res.status(200).json({
    ok: true,
    stripe: Boolean(process.env.STRIPE_SECRET_KEY),
    supabase: Boolean(process.env.SUPABASE_SERVICE_ROLE_KEY),
  });
};
