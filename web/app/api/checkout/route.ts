import Stripe from 'stripe';
import { NextResponse } from 'next/server';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY ?? '', { apiVersion: '2023-10-16' });

export async function POST(req: Request) {
  try {
    const { priceId, successUrl, cancelUrl } = await req.json();
    if (!priceId) return NextResponse.json({ error: 'priceId required' }, { status: 400 });

    const session = await stripe.checkout.sessions.create({
      mode: 'subscription',
      payment_method_types: ['card'],
      line_items: [{ price: priceId, quantity: 1 }],
      success_url: successUrl ?? process.env.NEXT_PUBLIC_APP_URL ?? 'http://localhost:3000',
      cancel_url: cancelUrl ?? process.env.NEXT_PUBLIC_APP_URL ?? 'http://localhost:3000',
    });

    return NextResponse.json({ id: session.id });
  } catch (err: any) {
    return NextResponse.json({ error: err.message ?? String(err) }, { status: 500 });
  }
}