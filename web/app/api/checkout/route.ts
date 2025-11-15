import Stripe from 'stripe';
import { NextResponse } from 'next/server';

// Initialize Stripe client lazily to avoid build-time errors
let stripe: Stripe | null = null;

function getStripeClient(): Stripe {
  if (!process.env.STRIPE_SECRET_KEY) {
    throw new Error('Missing required environment variable: STRIPE_SECRET_KEY');
  }
  if (!stripe) {
    stripe = new Stripe(process.env.STRIPE_SECRET_KEY, { apiVersion: '2023-10-16' });
  }
  return stripe;
}

// URL validation helper
function isValidUrl(url: string): boolean {
  try {
    const parsed = new URL(url);
    return parsed.protocol === 'http:' || parsed.protocol === 'https:';
  } catch {
    return false;
  }
}

export async function POST(req: Request) {
  try {
    const { priceId, successUrl, cancelUrl } = await req.json();

    // Validate priceId
    if (!priceId || typeof priceId !== 'string') {
      return NextResponse.json(
        { error: 'Invalid priceId: must be a non-empty string' },
        { status: 400 }
      );
    }

    // Validate priceId format (Stripe price IDs start with 'price_')
    if (!priceId.startsWith('price_')) {
      return NextResponse.json(
        { error: 'Invalid priceId format: must start with "price_"' },
        { status: 400 }
      );
    }

    // Validate URLs if provided
    if (successUrl && !isValidUrl(successUrl)) {
      return NextResponse.json(
        { error: 'Invalid successUrl: must be a valid HTTP(S) URL' },
        { status: 400 }
      );
    }

    if (cancelUrl && !isValidUrl(cancelUrl)) {
      return NextResponse.json(
        { error: 'Invalid cancelUrl: must be a valid HTTP(S) URL' },
        { status: 400 }
      );
    }

    const defaultUrl = process.env.NEXT_PUBLIC_APP_URL ?? 'http://localhost:3000';

    const stripeClient = getStripeClient();
    const session = await stripeClient.checkout.sessions.create({
      mode: 'subscription',
      payment_method_types: ['card'],
      line_items: [{ price: priceId, quantity: 1 }],
      success_url: successUrl ?? defaultUrl,
      cancel_url: cancelUrl ?? defaultUrl,
    });

    // Log successful checkout session creation (without sensitive data)
    console.log(`Checkout session created: ${session.id} for price: ${priceId}`);

    return NextResponse.json({ id: session.id });
  } catch (err: any) {
    // Log error for debugging (without exposing to client)
    console.error('Checkout error:', err.message);

    return NextResponse.json(
      { error: 'Failed to create checkout session' },
      { status: 500 }
    );
  }
}