import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import Stripe from 'https://esm.sh/stripe@11.1.0?target=deno'

const stripe = new Stripe(Deno.env.get('STRIPE_SECRET_KEY') || '', {
  apiVersion: '2022-11-15',
  httpClient: Stripe.createFetchHttpClient(),
})

const webhookSecret = Deno.env.get('STRIPE_WEBHOOK_SECRET')

serve(async (req) => {
  const signature = req.headers.get('stripe-signature')

  if (!signature || !webhookSecret) {
    return new Response('Missing signature or webhook secret', { status: 400 })
  }

  try {
    const body = await req.text()
    const event = stripe.webhooks.constructEvent(body, signature, webhookSecret)

    // Handle different event types
    switch (event.type) {
      case 'checkout.session.completed':
        const session = event.data.object as Stripe.Checkout.Session
        console.log('Checkout completed:', session.id)
        // TODO: Update user subscription in database
        break

      case 'customer.subscription.created':
        const subscription = event.data.object as Stripe.Subscription
        console.log('Subscription created:', subscription.id)
        // TODO: Store subscription details
        break

      case 'customer.subscription.updated':
        const updatedSub = event.data.object as Stripe.Subscription
        console.log('Subscription updated:', updatedSub.id)
        // TODO: Update subscription in database
        break

      case 'customer.subscription.deleted':
        const deletedSub = event.data.object as Stripe.Subscription
        console.log('Subscription deleted:', deletedSub.id)
        // TODO: Mark subscription as cancelled
        break

      default:
        console.log('Unhandled event type:', event.type)
    }

    return new Response(JSON.stringify({ received: true }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    })
  } catch (err) {
    console.error('Webhook error:', err)
    return new Response(
      JSON.stringify({ error: err instanceof Error ? err.message : 'Webhook error' }),
      { status: 400, headers: { 'Content-Type': 'application/json' } }
    )
  }
})
