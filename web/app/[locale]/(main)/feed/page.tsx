'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { useLocale } from '@/components/providers/LocaleProvider'
import { useTranslation } from '@/lib/i18n'
import { supabaseClient } from '@/lib/supabase'
import BottomNav from '@/components/layout/BottomNav'
import GiftModal from '@/components/gifts/GiftModal'

interface RoastPost {
  id: string
  content: string
  author: {
    id?: string
    username: string
    avatar_url?: string
  }
  likes: number
  comments: number
  shares: number
  gifts?: number
  created_at: string
  isLiked?: boolean
}

export default function FeedPage() {
  const { locale } = useLocale()
  const { t } = useTranslation()
  const [posts, setPosts] = useState<RoastPost[]>([])
  const [loading, setLoading] = useState(true)
  const [loadingMore, setLoadingMore] = useState(false)
  const [hasMore, setHasMore] = useState(true)
  const [page, setPage] = useState(0)
  const [giftModalOpen, setGiftModalOpen] = useState(false)
  const [selectedPost, setSelectedPost] = useState<RoastPost | null>(null)

  useEffect(() => {
    loadFeed()
  }, [])

  useEffect(() => {
    // Infinite scroll observer
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop
        >= document.documentElement.offsetHeight - 500
      ) {
        if (!loadingMore && hasMore) {
          loadMorePosts()
        }
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [loadingMore, hasMore, page])

  const loadFeed = async () => {
    try {
      // Try to load from database
      const { data } = await supabaseClient
        .from('roasts')
        .select(`
          id,
          content,
          author_id,
          created_at,
          users!roasts_author_id_fkey (
            username,
            avatar_url
          )
        `)
        .order('created_at', { ascending: false })
        .range(0, 19)
        .limit(20)

      if (data && data.length > 0) {
        setPosts(data.map((roast: any) => ({
          id: roast.id,
          content: roast.content,
          author: {
            id: roast.author_id,
            username: roast.users?.username || 'Anonymous',
            avatar_url: roast.users?.avatar_url
          },
          likes: Math.floor(Math.random() * 500),
          comments: Math.floor(Math.random() * 100),
          shares: Math.floor(Math.random() * 50),
          gifts: Math.floor(Math.random() * 20),
          created_at: roast.created_at,
          isLiked: false
        })))
        setPage(1)
        setHasMore(data.length === 20)
      } else {
        throw new Error('No data')
      }
    } catch (error) {
      // Use sample data if database fails
      setPosts([
        {
          id: '1',
          content: t('feed.samplePosts.post1'),
          author: { id: 'sample-1', username: 'CodeRoaster' },
          likes: 423,
          comments: 89,
          shares: 34,
          gifts: 12,
          created_at: new Date().toISOString(),
          isLiked: false
        },
        {
          id: '2',
          content: t('feed.samplePosts.post2'),
          author: { id: 'sample-2', username: 'DesignSavage' },
          likes: 567,
          comments: 123,
          shares: 45,
          gifts: 23,
          created_at: new Date(Date.now() - 3600000).toISOString(),
          isLiked: true
        },
        {
          id: '3',
          content: t('feed.samplePosts.post3'),
          author: { id: 'sample-3', username: 'BackendBeast' },
          likes: 789,
          comments: 156,
          shares: 67,
          gifts: 8,
          created_at: new Date(Date.now() - 7200000).toISOString(),
          isLiked: false
        }
      ])
    } finally {
      setLoading(false)
    }
  }

  const handleLike = (postId: string) => {
    setPosts(posts.map(post => {
      if (post.id === postId) {
        return {
          ...post,
          isLiked: !post.isLiked,
          likes: post.isLiked ? post.likes - 1 : post.likes + 1
        }
      }
      return post
    }))
  }

  const handleOpenGiftModal = (post: RoastPost) => {
    setSelectedPost(post)
    setGiftModalOpen(true)
  }

  const handleCloseGiftModal = () => {
    setGiftModalOpen(false)
    setSelectedPost(null)
  }

  const loadMorePosts = async () => {
    if (loadingMore || !hasMore) return
    setLoadingMore(true)

    try {
      const start = page * 20
      const end = start + 19

      const { data } = await supabaseClient
        .from('roasts')
        .select(`
          id,
          content,
          author_id,
          created_at,
          users!roasts_author_id_fkey (
            username,
            avatar_url
          )
        `)
        .order('created_at', { ascending: false })
        .range(start, end)

      if (data && data.length > 0) {
        const newPosts = data.map((roast: any) => ({
          id: roast.id,
          content: roast.content,
          author: {
            id: roast.author_id,
            username: roast.users?.username || 'Anonymous',
            avatar_url: roast.users?.avatar_url
          },
          likes: Math.floor(Math.random() * 500),
          comments: Math.floor(Math.random() * 100),
          shares: Math.floor(Math.random() * 50),
          gifts: Math.floor(Math.random() * 20),
          created_at: roast.created_at,
          isLiked: false
        }))
        setPosts(prev => [...prev, ...newPosts])
        setPage(prev => prev + 1)
        setHasMore(data.length === 20)
      } else {
        setHasMore(false)
      }
    } catch (error) {
      console.error('Failed to load more posts:', error)
    } finally {
      setLoadingMore(false)
    }
  }

  const formatTimeAgo = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const seconds = Math.floor((now.getTime() - date.getTime()) / 1000)

    if (seconds < 60) return 'just now'
    if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`
    if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`
    return `${Math.floor(seconds / 86400)}d ago`
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-background-dark text-white pb-24">
        <div className="sticky top-0 z-40 backdrop-blur-xl bg-background-dark/80 border-b border-white/10">
          <div className="flex items-center justify-between p-4">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-vibrant-blue bg-clip-text text-transparent">
              {t('common.appName')}
            </h1>
            <button className="p-2 hover:bg-white/5 rounded-lg transition-colors">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
              </svg>
            </button>
          </div>
        </div>
        <div className="max-w-2xl mx-auto p-4">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="glassmorphic rounded-xl p-4 mb-4 overflow-hidden">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-white/10 animate-pulse" />
                <div className="flex-1 space-y-2">
                  <div className="h-4 w-24 bg-white/10 rounded animate-pulse" />
                  <div className="h-3 w-16 bg-white/10 rounded animate-pulse" />
                </div>
              </div>
              <div className="space-y-2">
                <div className="h-4 w-full bg-white/10 rounded animate-pulse" />
                <div className="h-4 w-3/4 bg-white/10 rounded animate-pulse" />
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background-dark text-white pb-24">
      {/* Header */}
      <div className="sticky top-0 z-40 backdrop-blur-xl bg-background-dark/80 border-b border-white/10">
        <div className="flex items-center justify-between p-4">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-vibrant-blue bg-clip-text text-transparent">
            {t('common.appName')}
          </h1>
          <button className="p-2 hover:bg-white/5 rounded-lg transition-colors">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
            </svg>
          </button>
        </div>
      </div>

      {/* Feed */}
      <div className="max-w-2xl mx-auto p-4 flex flex-col gap-4">
        {posts.map((post, index) => (
          <motion.div
            key={post.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="glassmorphic rounded-xl p-4 hover:bg-white/10 transition-all duration-300"
          >
            {/* Post Header */}
            <div className="flex items-start gap-3 mb-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-vibrant-blue flex items-center justify-center font-bold text-sm flex-shrink-0">
                {post.author.username[0]}
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-bold text-sm">{post.author.username}</p>
                <p className="text-xs text-gray-400">{formatTimeAgo(post.created_at)}</p>
              </div>
              <button className="p-1 hover:bg-white/5 rounded-lg transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
                </svg>
              </button>
            </div>

            {/* Post Content */}
            <p className="text-base mb-4 leading-relaxed">{post.content}</p>

            {/* Reaction Bar */}
            <div className="flex items-center gap-6 pt-3 border-t border-white/10">
              <button
                onClick={() => handleLike(post.id)}
                className="flex items-center gap-2 hover:text-primary transition-colors group"
              >
                <motion.div
                  whileTap={{ scale: 1.2 }}
                  className={post.isLiked ? 'text-primary' : 'text-gray-400'}
                >
                  <svg className="w-5 h-5" fill={post.isLiked ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </motion.div>
                <span className={`text-sm font-medium ${post.isLiked ? 'text-primary' : 'text-gray-400 group-hover:text-primary'}`}>
                  {post.likes}
                </span>
              </button>

              <button className="flex items-center gap-2 text-gray-400 hover:text-vibrant-blue transition-colors group">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
                <span className="text-sm font-medium group-hover:text-vibrant-blue">{post.comments}</span>
              </button>

              <button className="flex items-center gap-2 text-gray-400 hover:text-green-400 transition-colors group">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                </svg>
                <span className="text-sm font-medium group-hover:text-green-400">{post.shares}</span>
              </button>

              <button
                onClick={() => handleOpenGiftModal(post)}
                className="flex items-center gap-2 text-gray-400 hover:text-yellow-400 transition-colors group"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
                </svg>
                <span className="text-sm font-medium group-hover:text-yellow-400">{post.gifts || 0}</span>
              </button>
            </div>
          </motion.div>
        ))}

        {/* Loading More Indicator */}
        {loadingMore && (
          <div className="flex justify-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-primary"></div>
          </div>
        )}

        {/* End of Feed */}
        {!hasMore && posts.length > 0 && (
          <div className="text-center py-8 text-gray-400">
            <p>{t('feed.noMoreRoasts')}</p>
          </div>
        )}
      </div>

      {/* Floating Action Button */}
      <Link href={`/${locale}/create`}>
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="fixed bottom-24 right-6 w-14 h-14 rounded-full bg-gradient-to-r from-primary to-vibrant-blue flex items-center justify-center shadow-primary-glow z-30"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
        </motion.button>
      </Link>

      {/* Bottom Navigation */}
      <BottomNav />

      {/* Gift Modal */}
      {selectedPost && (
        <GiftModal
          isOpen={giftModalOpen}
          onClose={handleCloseGiftModal}
          roastId={selectedPost.id}
          roastAuthorId={selectedPost.author.id || ''}
          roastAuthorName={selectedPost.author.username}
        />
      )}
    </div>
  )
}
