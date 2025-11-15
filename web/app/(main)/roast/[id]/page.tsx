'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { supabaseClient } from '@/lib/supabase'
import RoastCard from '@/components/ui/RoastCard'
import { Roast, User } from '@/shared/types/roast'

interface EchoData {
  id: string
  text: string
  author: User | null
  created_at: string
  likes: number
}

export default function RoastDetailPage() {
  const params = useParams()
  const roastId = params.id as string

  const [roast, setRoast] = useState<EchoData | null>(null)
  const [echos, setEchos] = useState<EchoData[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    loadRoastAndEchos()
  }, [roastId])

  const loadRoastAndEchos = async () => {
    try {
      setLoading(true)

      // Load main roast
      const { data: roastData, error: roastError } = await supabaseClient
        .from('roasts')
        .select(`
          id,
          text,
          created_at,
          likes,
          author:author_id (
            id,
            name,
            email
          )
        `)
        .eq('id', roastId)
        .single()

      if (roastError) throw roastError

      setRoast(roastData as EchoData)

      // Load echos (responses to this roast)
      // In a full implementation, you'd have a parent_roast_id column
      // For now, we'll show related roasts
      const { data: echosData, error: echosError } = await supabaseClient
        .from('roasts')
        .select(`
          id,
          text,
          created_at,
          likes,
          author:author_id (
            id,
            name,
            email
          )
        `)
        .neq('id', roastId)
        .order('created_at', { ascending: false })
        .limit(5)

      if (echosError) throw echosError

      setEchos(echosData as EchoData[])
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load roast')
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse text-gray-400">Loading roast...</div>
      </div>
    )
  }

  if (error || !roast) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-red-400">
          {error || 'Roast not found'}
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen p-4 md:p-8">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Main Roast */}
        <div className="animate-slideUp">
          <h1 className="text-3xl font-bold gradient-text mb-6">
            Roast Arena
          </h1>
          <RoastCard roast={roast} featured />
        </div>

        {/* Echo Chain */}
        {echos.length > 0 && (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-gray-300">
              Echo Chain
            </h2>
            <div className="space-y-4">
              {echos.map((echo, index) => (
                <div
                  key={echo.id}
                  className="animate-slideUp"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <RoastCard roast={echo} />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
