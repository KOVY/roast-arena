'use client'

export const dynamic = 'force-dynamic'

import { useEffect, useState } from 'react'
import { supabaseClient } from '@/lib/supabase'
import { UserProfile } from '@/shared/types/user'
import { Roast } from '@/shared/types/roast'
import RoastCard from '@/components/ui/RoastCard'
import { motion } from 'framer-motion'

export default function ProfilePage() {
  const [user, setUser] = useState<any>(null)
  const [profile, setProfile] = useState<UserProfile | null>(null)
  const [roasts, setRoasts] = useState<Roast[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadProfile()
  }, [])

  const loadProfile = async () => {
    try {
      // Get current user
      const { data: { user } } = await supabaseClient.auth.getUser()
      if (!user) return

      setUser(user)

      // Get user profile
      const { data: profileData } = await supabaseClient
        .from('users')
        .select('*')
        .eq('id', user.id)
        .single()

      // Get user's roasts
      const { data: roastsData } = await supabaseClient
        .from('roasts')
        .select(`
          id,
          author_id,
          text,
          created_at,
          likes,
          author:author_id (
            id,
            name,
            email
          )
        `)
        .eq('author_id', user.id)
        .order('created_at', { ascending: false })

      // Calculate stats
      const totalRoasts = roastsData?.length || 0
      const totalLikes = roastsData?.reduce((sum, r) => sum + r.likes, 0) || 0

      setProfile({
        ...profileData,
        total_roasts: totalRoasts,
        total_likes: totalLikes,
        total_echoes: 0, // TODO: Calculate from parent_roast_id
      } as UserProfile)

      setRoasts((roastsData || []) as unknown as Roast[])
    } catch (error) {
      console.error('Failed to load profile:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse text-gray-400">Loading profile...</div>
      </div>
    )
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-xl text-gray-400 mb-4">Please log in to view your profile</p>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Profile Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass rounded-2xl p-8 mb-8"
      >
        <div className="flex items-start gap-6">
          <div className="w-24 h-24 rounded-full bg-gradient-to-br from-orange-500 to-pink-500 flex items-center justify-center text-4xl font-bold">
            {profile?.name?.[0]?.toUpperCase() || '?'}
          </div>

          <div className="flex-1">
            <h1 className="text-3xl font-bold mb-2">{profile?.name}</h1>
            <p className="text-gray-400 mb-4">{profile?.email}</p>

            <div className="grid grid-cols-3 gap-4">
              <div className="bg-white/5 rounded-lg p-4">
                <p className="text-2xl font-bold gradient-text">{profile?.total_roasts}</p>
                <p className="text-sm text-gray-400">Roasts</p>
              </div>
              <div className="bg-white/5 rounded-lg p-4">
                <p className="text-2xl font-bold gradient-text">{profile?.total_likes}</p>
                <p className="text-sm text-gray-400">Likes</p>
              </div>
              <div className="bg-white/5 rounded-lg p-4">
                <p className="text-2xl font-bold gradient-text">{profile?.total_echoes}</p>
                <p className="text-sm text-gray-400">Echoes</p>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* User's Roasts */}
      <div>
        <h2 className="text-2xl font-bold mb-6">Your Roasts</h2>
        {roasts.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-400">You haven't created any roasts yet</p>
          </div>
        ) : (
          <div className="space-y-4">
            {roasts.map((roast, index) => (
              <motion.div
                key={roast.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <RoastCard roast={roast} />
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
