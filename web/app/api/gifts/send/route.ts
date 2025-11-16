import { NextResponse } from 'next/server'
import { supabaseClient } from '@/lib/supabase'

export async function POST(req: Request) {
  try {
    const { roastId, roastAuthorId, giftTypeId, amount, currency } = await req.json()

    // Validate input
    if (!roastId || !roastAuthorId || !giftTypeId || !amount || !currency) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    if (amount <= 0) {
      return NextResponse.json(
        { error: 'Invalid amount' },
        { status: 400 }
      )
    }

    // TODO: Get current user from session
    // For MVP, we'll use a dummy user ID - replace with real auth
    const currentUserId = 'dummy-user-id' // Replace with: const { data: { user } } = await supabase.auth.getUser()

    if (!currentUserId) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    // Check if user is trying to gift themselves
    if (currentUserId === roastAuthorId) {
      return NextResponse.json(
        { error: 'Cannot send gift to yourself' },
        { status: 400 }
      )
    }

    // Call Supabase function to process gift transaction
    const { data, error } = await supabaseClient.rpc('send_gift', {
      p_from_user: currentUserId,
      p_to_user: roastAuthorId,
      p_roast_id: roastId,
      p_gift_type_id: giftTypeId,
      p_amount: amount,
      p_currency: currency
    })

    if (error) {
      console.error('Gift transaction error:', error)
      return NextResponse.json(
        { error: error.message || 'Failed to send gift' },
        { status: 500 }
      )
    }

    // Return success response with transaction details
    return NextResponse.json({
      success: true,
      gift_id: data.gift_id,
      author_share: data.author_share,
      platform_share: data.platform_share,
      payout_eligible: data.payout_eligible
    })
  } catch (err: any) {
    console.error('Error in send-gift API:', err)
    return NextResponse.json(
      { error: err.message ?? 'Internal server error' },
      { status: 500 }
    )
  }
}
