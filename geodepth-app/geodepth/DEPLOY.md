# GeoDepth — Deployment Guide

## What You Have
- `/public/index.html` — Full frontend (free + pro tiers)
- `/api/checkout.js` — Creates Stripe checkout session
- `/api/verify.js` — Verifies payment + saves to Supabase
- `/api/status.js` — Checks if device has pro access
- `/vercel.json` — Routing config
- `/package.json` — Dependencies

---

## Step 1 — Supabase Database
1. Go to supabase.com/dashboard → your project
2. Click "SQL Editor" → "New Query"
3. Paste contents of SUPABASE_SETUP.sql → Run it
4. Get your SERVICE ROLE key: Settings → API → service_role key (NOT anon)

---

## Step 2 — Deploy to Vercel
1. Go to github.com → New repository → name it "geodepth"
2. Upload all files (drag & drop or use GitHub Desktop)
3. Go to vercel.com → New Project → Import your GitHub repo
4. Before deploying, click "Environment Variables" and add ALL of these:

| Variable | Value |
|---|---|
| STRIPE_SECRET_KEY | sk_live_... (your rotated key) |
| STRIPE_PRICE_ID | price_1T85mCHlAXaRcljVrY3MXKgO |
| SUPABASE_URL | https://lmjjvhuornsdnvxktrnh.supabase.co |
| SUPABASE_SERVICE_KEY | (service role key from Supabase settings) |

5. Click Deploy → wait 60 seconds → your app is live!

---

## Step 3 — Test It
1. Open your Vercel URL
2. Click "Upgrade to Pro"
3. Use Stripe test card: 4242 4242 4242 4242, any future date, any CVC
4. You should be redirected back with Pro unlocked

---

## Step 4 — Go Live
1. Rotate your Stripe secret key (Developers → API Keys → Roll key)
2. Update the STRIPE_SECRET_KEY environment variable in Vercel
3. Share your URL!

---

## Keys Already Embedded in Frontend
- Mapbox token: pk.eyJ1IjoiZ3JpbWVyaWNhIi...
- Supabase anon key: eyJhbGci... (safe for frontend)
- Stripe publishable key: pk_live_yA2s... (safe for frontend)

These are all public-safe keys. The secret keys only live in Vercel environment variables.
