import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const supabaseUrl = Deno.env.get('SUPABASE_URL') || ''
const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') || ''
const supabase = createClient(supabaseUrl, supabaseKey)

interface PizzeriaStats {
  pizzeria_id: string
  total_challenges: number
  active_challenges: number
  total_participants: number
  total_rewards_given: number
}

serve(async (req) => {
  const url = new URL(req.url)
  const pizzeriaId = url.searchParams.get('pizzeria_id')

  if (!pizzeriaId) {
    return new Response(
      JSON.stringify({ error: 'pizzeria_id parameter is required' }),
      { status: 400, headers: { 'Content-Type': 'application/json' } }
    )
  }

  try {
    // Get pizzeria details
    const { data: pizzeria, error: pizzeriaError } = await supabase
      .from('pizzerias')
      .select('*')
      .eq('id', pizzeriaId)
      .single()

    if (pizzeriaError) throw pizzeriaError

    // Get challenge stats
    const { data: challenges, error: challengesError } = await supabase
      .from('challenges')
      .select('*')
      .eq('pizzeria_id', pizzeriaId)

    if (challengesError) throw challengesError

    const stats: PizzeriaStats = {
      pizzeria_id: pizzeriaId,
      total_challenges: challenges?.length || 0,
      active_challenges: challenges?.filter((c) => {
        // Challenge is active if it doesn't have expires_at or it's in the future
        if (!c.expires_at) return true
        return new Date(c.expires_at) > new Date()
      }).length || 0,
      total_participants: 0, // TODO: Track challenge participants
      total_rewards_given: 0, // TODO: Track completed challenges
    }

    return new Response(
      JSON.stringify({
        pizzeria,
        stats,
        challenges,
      }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    )
  } catch (err) {
    console.error('Pizzeria tracker error:', err)
    return new Response(
      JSON.stringify({ error: err instanceof Error ? err.message : 'Tracker error' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    )
  }
})
