/**
 * Minimal Stripe Checkout helper (client-side wrapper)
 * Expects an API route at /api/checkout that creates a session server-side.
 */
export async function createCheckoutSession(priceId: string, successUrl = '/', cancelUrl = '/') {
  const res = await fetch('/api/checkout', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ priceId, successUrl, cancelUrl }),
  });

  if (!res.ok) throw new Error('Failed to create checkout session');
  return res.json();
}

export default createCheckoutSession;
