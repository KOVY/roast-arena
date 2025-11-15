# 💰 RoastArena Monetization Flow

Complete documentation of the monetization architecture for RoastArena.

## 🎯 Overview

RoastArena uses a **credits-based economy** with multiple revenue streams:

1. **Credit purchases** (Stripe Checkout)
2. **Gift sending** (credits → themed gifts)
3. **Gift receiving** (users earn from gifts)
4. **Withdrawal system** (60/40 revenue split)
5. **Premium subscriptions** (future)

---

## 💳 1. Credit Purchase Flow

### User Journey

```
User clicks "Buy Credits"
  → Stripe Checkout opens
  → User selects bundle + payment method
  → Payment processed
  → Webhook triggers credit addition
  → User receives credits + bonus
```

### Credit Bundles (Example: cs-CZ / CZK)

| Bundle | Price | Credits | Bonus | Total | Discount |
|--------|-------|---------|-------|-------|----------|
| Small  | 100 Kč | 100 | 0 | 100 | 0% |
| Medium | 500 Kč | 500 | 50 | **550** | +10% |
| Large  | 1000 Kč | 1000 | 200 | **1200** | +20% |

**Conversion Rate**: 1 credit = 1 local currency unit (1 Kč, $1, €1, etc.)

### Stripe Integration

```javascript
// Frontend: Create checkout session
const response = await fetch('/api/stripe/create-checkout', {
  method: 'POST',
  body: JSON.stringify({
    bundleId: 'medium', // small, medium, large
    locale: 'cs-CZ',
    successUrl: window.location.origin + '/success',
    cancelUrl: window.location.origin + '/cancel'
  })
});

const { sessionId } = await response.json();

// Redirect to Stripe Checkout
const stripe = Stripe(process.env.NEXT_PUBLIC_STRIPE_KEY);
await stripe.redirectToCheckout({ sessionId });
```

```typescript
// Backend: Supabase Edge Function
import Stripe from 'https://esm.sh/stripe@11.1.0?target=deno'

const stripe = new Stripe(Deno.env.get('STRIPE_SECRET_KEY')!, {
  apiVersion: '2023-10-16',
})

serve(async (req) => {
  const { bundleId, locale } = await req.json()

  // Get bundle config
  const bundles = {
    small: { amount: 10000, credits: 100 },   // 100.00 in cents
    medium: { amount: 50000, credits: 550 },  // 500.00 in cents
    large: { amount: 100000, credits: 1200 }  // 1000.00 in cents
  }

  const bundle = bundles[bundleId]
  const currency = getCurrencyForLocale(locale) // CZK, USD, EUR, etc.

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items: [{
      price_data: {
        currency: currency.toLowerCase(),
        product_data: {
          name: `${bundle.credits} Credits`,
          description: `RoastArena Credit Bundle`,
        },
        unit_amount: bundle.amount,
      },
      quantity: 1,
    }],
    mode: 'payment',
    success_url: successUrl,
    cancel_url: cancelUrl,
    metadata: {
      userId: user.id,
      bundleId,
      credits: bundle.credits
    }
  })

  return new Response(JSON.stringify({ sessionId: session.id }))
})
```

### Webhook Handler

```typescript
// backend/functions/stripe-webhook/index.ts
import Stripe from 'https://esm.sh/stripe@11.1.0?target=deno'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

serve(async (req) => {
  const signature = req.headers.get('stripe-signature')!
  const body = await req.text()

  const event = stripe.webhooks.constructEvent(
    body,
    signature,
    Deno.env.get('STRIPE_WEBHOOK_SECRET')!
  )

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session
    const { userId, credits } = session.metadata

    // Add credits to user account
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_SERVICE_KEY')!
    )

    await supabase
      .from('users')
      .update({
        credits: supabase.rpc('increment_credits', { amount: credits })
      })
      .eq('id', userId)

    // Log transaction
    await supabase.from('transactions').insert({
      user_id: userId,
      type: 'credit_purchase',
      amount: credits,
      currency: session.currency,
      stripe_session_id: session.id
    })
  }

  return new Response(JSON.stringify({ received: true }))
})
```

---

## 🎁 2. Gift System

### Gift Rarity & Pricing

| Rarity | Gift Examples | Credit Cost | Visual Effect |
|--------|--------------|-------------|---------------|
| **COMMON** | Heart ❤️, Star ⭐, Rose 🌹 | 9 | Fade in |
| **RARE** | Fire 🔥, Rocket 🚀, Bomb 💣 | 49 | Particle burst |
| **EPIC** | Trophy 🏆, Badge 💎 | 99 | Confetti explosion |
| **LEGENDARY** | Fire Crown 👑 | 199 | Full-screen animation |

### Gift Sending Flow

```
User clicks "Send Gift" on roast
  → Gift modal opens
  → User selects gift from warehouse
  → Confirm send (deducts from warehouse)
  → Animation plays
  → Recipient receives gift value
  → 60/40 split applies (platform/creator)
```

### Implementation

```typescript
// Send gift function
async function sendGift(roastId: string, giftId: string) {
  const response = await fetch('/api/gifts/send', {
    method: 'POST',
    body: JSON.stringify({
      roast_id: roastId,
      gift_id: giftId
    })
  })

  if (response.ok) {
    // Play WOW animation
    playGiftAnimation(giftId)

    // Update warehouse count
    updateWarehouse()
  }
}
```

```sql
-- Supabase function to send gift
CREATE OR REPLACE FUNCTION send_gift(
  p_sender_id UUID,
  p_recipient_id UUID,
  p_roast_id UUID,
  p_gift_id UUID
)
RETURNS BOOLEAN AS $$
DECLARE
  v_gift_value INTEGER;
  v_platform_share INTEGER;
  v_creator_share INTEGER;
BEGIN
  -- Get gift value
  SELECT credit_value INTO v_gift_value
  FROM gifts
  WHERE id = p_gift_id;

  -- Calculate split (60% platform, 40% creator)
  v_platform_share := ROUND(v_gift_value * 0.6);
  v_creator_share := ROUND(v_gift_value * 0.4);

  -- Deduct from sender's warehouse
  UPDATE user_gifts
  SET quantity = quantity - 1
  WHERE user_id = p_sender_id AND gift_id = p_gift_id;

  -- Add to recipient's earnings
  UPDATE users
  SET earnings = earnings + v_creator_share
  WHERE id = p_recipient_id;

  -- Log transaction
  INSERT INTO gift_transactions (
    sender_id,
    recipient_id,
    roast_id,
    gift_id,
    value,
    platform_share,
    creator_share
  ) VALUES (
    p_sender_id,
    p_recipient_id,
    p_roast_id,
    p_gift_id,
    v_gift_value,
    v_platform_share,
    v_creator_share
  );

  RETURN TRUE;
END;
$$ LANGUAGE plpgsql;
```

---

## 💸 3. Withdrawal System

### User Journey

```
User accumulates earnings from gifts
  → Clicks "Withdraw" in profile
  → Reviews 60/40 split breakdown
  → Enters bank account (IBAN)
  → Confirms withdrawal
  → Platform processes via Stripe Connect
  → Money arrives in 3-5 business days
```

### Revenue Split Example

**Scenario**: User received **1000 Kč** worth of gifts

- **Platform share (60%)**: 600 Kč
- **Creator share (40%)**: **400 Kč** (withdrawable)

### Implementation

```typescript
// Withdrawal request
async function requestWithdrawal(amount: number) {
  const response = await fetch('/api/withdrawals/request', {
    method: 'POST',
    body: JSON.stringify({
      amount, // In local currency
      iban: userIban,
      locale: 'cs-CZ'
    })
  })

  if (response.ok) {
    alert('Žádost o výběr odeslána! Peníze dorazí do 3-5 dnů.')
  }
}
```

```typescript
// Backend: Process withdrawal via Stripe Connect
import Stripe from 'https://esm.sh/stripe@11.1.0?target=deno'

serve(async (req) => {
  const { userId, amount, iban } = await req.json()

  const stripe = new Stripe(Deno.env.get('STRIPE_SECRET_KEY')!)

  // Create payout
  const payout = await stripe.payouts.create({
    amount: amount * 100, // Convert to cents
    currency: 'czk',
    method: 'standard', // 3-5 days
    destination: iban,
    metadata: { userId }
  })

  // Update user's earnings
  const supabase = createClient(...)
  await supabase
    .from('users')
    .update({
      earnings: supabase.rpc('decrement_earnings', { amount })
    })
    .eq('id', userId)

  // Log withdrawal
  await supabase.from('withdrawals').insert({
    user_id: userId,
    amount,
    status: 'pending',
    stripe_payout_id: payout.id
  })

  return new Response(JSON.stringify({ success: true }))
})
```

---

## 🔄 4. Complete Flow Diagram

```
┌─────────────────────────────────────────────────────────────┐
│                    USER MONETIZATION FLOW                    │
└─────────────────────────────────────────────────────────────┘

1️⃣ PURCHASE CREDITS
   User pays → Stripe → Webhook → Credits added to account

2️⃣ BUY GIFTS (optional)
   Credits → Gift packs → Warehouse inventory

3️⃣ SEND GIFTS
   Warehouse → Roast/Echo → Recipient receives value

4️⃣ EARNINGS SPLIT
   Gift value (100%) → Platform (60%) + Creator (40%)

5️⃣ WITHDRAW
   Earnings → Stripe Connect → Bank account (3-5 days)

┌─────────────────────────────────────────────────────────────┐
│                    REVENUE STREAMS                           │
└─────────────────────────────────────────────────────────────┘

✅ Credit sales (100% revenue - Stripe fees ~2.9%)
✅ Gift commissions (60% of all gift values)
✅ Premium subscriptions (future)
✅ Pizzeria partnerships (future)
✅ Sponsored challenges (future)
```

---

## 💡 Key Features

### 1. **Multi-Currency Support**

All prices automatically convert based on locale:

- **cs-CZ**: 100 Kč, 500 Kč, 1000 Kč
- **en-US**: $4.99, $24.99, $49.99
- **de-DE**: €4,99, €24,99, €49,99
- **ru-RU**: 499 ₽, 2499 ₽, 4999 ₽

### 2. **Browse Without Barrier**

Users can browse ALL content without login:
- View roasts
- Read echo chains
- See leaderboards
- Browse pizzerias

**Login required only for**:
- Creating roasts
- Sending echoes
- Sending gifts
- Check-ins
- Challenges

### 3. **Smart Pricing**

Bundles incentivize larger purchases:
- 10% bonus on medium bundle
- 20% bonus on large bundle
- Round numbers (no cents/haléře)

### 4. **Transparent Split**

Users always see earnings breakdown:
```
Celková hodnota dárků: 1000 Kč
Náš podíl (60%): 600 Kč
Tvůj zisk (40%): 400 Kč ← Withdrawable
```

---

## 🗄️ Database Schema

```sql
-- Users table
CREATE TABLE users (
  id UUID PRIMARY KEY,
  username TEXT UNIQUE,
  credits INTEGER DEFAULT 0,
  earnings INTEGER DEFAULT 0, -- In local currency cents
  locale TEXT DEFAULT 'cs-CZ',
  stripe_customer_id TEXT,
  stripe_account_id TEXT, -- For Connect payouts
  created_at TIMESTAMP DEFAULT NOW()
);

-- Gifts catalog
CREATE TABLE gifts (
  id UUID PRIMARY KEY,
  name TEXT,
  icon TEXT,
  rarity TEXT, -- common, rare, epic, legendary
  credit_value INTEGER,
  animation_type TEXT
);

-- User's gift warehouse
CREATE TABLE user_gifts (
  user_id UUID REFERENCES users(id),
  gift_id UUID REFERENCES gifts(id),
  quantity INTEGER DEFAULT 0,
  PRIMARY KEY (user_id, gift_id)
);

-- Gift transactions log
CREATE TABLE gift_transactions (
  id UUID PRIMARY KEY,
  sender_id UUID REFERENCES users(id),
  recipient_id UUID REFERENCES users(id),
  roast_id UUID REFERENCES roasts(id),
  gift_id UUID REFERENCES gifts(id),
  value INTEGER,
  platform_share INTEGER,
  creator_share INTEGER,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Withdrawals
CREATE TABLE withdrawals (
  id UUID PRIMARY KEY,
  user_id UUID REFERENCES users(id),
  amount INTEGER,
  status TEXT, -- pending, completed, failed
  stripe_payout_id TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  completed_at TIMESTAMP
);

-- Transactions log
CREATE TABLE transactions (
  id UUID PRIMARY KEY,
  user_id UUID REFERENCES users(id),
  type TEXT, -- credit_purchase, gift_send, gift_receive, withdrawal
  amount INTEGER,
  currency TEXT,
  stripe_session_id TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);
```

---

## 🚀 Next Steps

1. **Implement Stripe Checkout** in `web/app/api/stripe/`
2. **Add webhook handler** in `backend/functions/stripe-webhook/`
3. **Create gift marketplace** UI in `web/app/(main)/gifts/`
4. **Build withdrawal flow** in `web/app/(main)/profile/withdraw/`
5. **Set up Stripe Connect** for creator payouts
6. **Add analytics dashboard** for tracking revenue

---

## 📊 Estimated Revenue Model

**Assumptions**:
- 10,000 active users
- 30% purchase credits (3,000 users)
- Average purchase: 500 Kč/month
- 50% of credits used for gifts

**Monthly Revenue**:
```
Credit sales:     3,000 × 500 Kč = 1,500,000 Kč
Gift commissions: 750,000 × 60%  =   450,000 Kč
─────────────────────────────────────────────
Total:                             1,950,000 Kč/month
Annual:                           23,400,000 Kč/year
```

**After Stripe fees (2.9%)**:
```
Net revenue: ~22,721,000 Kč/year ($1M USD)
```

---

*Tento dokument popisuje kompletní monetizační flow RoastArena. Pro implementaci viz `/web/app/api/` a `/backend/functions/`.*
