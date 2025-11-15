import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const supabaseUrl = Deno.env.get('SUPABASE_URL') || ''
const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') || ''
const supabase = createClient(supabaseUrl, supabaseKey)

interface AnalyticsEvent {
  event_type: string
  user_id?: string
  roast_id?: string
  metadata?: Record<string, any>
}

serve(async (req) => {
  if (req.method !== 'POST') {
    return new Response('Method not allowed', { status: 405 })
  }

  try {
    const event: AnalyticsEvent = await req.json()

    // Validate required fields
    if (!event.event_type) {
      return new Response(
        JSON.stringify({ error: 'event_type is required' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      )
    }

    // Log analytics event
    // In production, you might send this to a dedicated analytics service
    console.log('Analytics event:', {
      type: event.event_type,
      user: event.user_id,
      roast: event.roast_id,
      timestamp: new Date().toISOString(),
      ...event.metadata,
    })

    // Track common events
    switch (event.event_type) {
      case 'roast_created':
        // Increment roast counter
        break

      case 'roast_liked':
        // Track engagement
        break

      case 'challenge_accepted':
        // Track challenge engagement
        break

      case 'user_registered':
        // Track user acquisition
        break

      default:
        console.log('Custom event:', event.event_type)
    }

    return new Response(
      JSON.stringify({ success: true }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    )
  } catch (err) {
    console.error('Analytics error:', err)
    return new Response(
      JSON.stringify({ error: err instanceof Error ? err.message : 'Analytics error' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    )
  }
})
