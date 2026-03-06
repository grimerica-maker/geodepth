const Stripe = require('stripe');
const { createClient } = require('@supabase/supabase-js');

module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const stripe = Stripe(process.env.STRIPE_SECRET_KEY);
  const supabase = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_SERVICE_KEY
  );

  try {
    const { sessionId, deviceId } = req.body;

    const session = await stripe.checkout.sessions.retrieve(sessionId);

    if (session.payment_status !== 'paid') {
      return res.status(400).json({ success: false, error: 'Payment not completed' });
    }

    // Store pro access in Supabase
    const { error } = await supabase
      .from('pro_users')
      .upsert({
        device_id: deviceId,
        stripe_session_id: sessionId,
        activated_at: new Date().toISOString(),
        amount_paid: session.amount_total,
      }, { onConflict: 'device_id' });

    if (error) throw error;

    res.status(200).json({ success: true, pro: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};
