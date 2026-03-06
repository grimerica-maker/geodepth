const { createClient } = require('@supabase/supabase-js');

module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const supabase = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_SERVICE_KEY
  );

  try {
    const { deviceId } = req.body;

    const { data, error } = await supabase
      .from('pro_users')
      .select('device_id, activated_at')
      .eq('device_id', deviceId)
      .single();

    if (error || !data) {
      return res.status(200).json({ pro: false });
    }

    res.status(200).json({ pro: true, activatedAt: data.activated_at });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
