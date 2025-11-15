import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import { useState } from 'react'
import { supabaseClient } from '../lib/supabase'

interface RoastCardProps {
  roast: any
}

export default function RoastCard({ roast }: RoastCardProps) {
  const [likes, setLikes] = useState(roast.likes)

  const handleLike = async () => {
    const newLikes = likes + 1
    setLikes(newLikes)

    try {
      await supabaseClient
        .from('roasts')
        .update({ likes: newLikes })
        .eq('id', roast.id)
    } catch (error) {
      console.error('Failed to update likes:', error)
      setLikes(likes)
    }
  }

  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>
            {roast.author?.name?.[0]?.toUpperCase() || '?'}
          </Text>
        </View>
        <View style={styles.authorInfo}>
          <Text style={styles.authorName}>
            {roast.author?.name || 'Anonymous'}
          </Text>
          <Text style={styles.date}>
            {new Date(roast.created_at).toLocaleDateString()}
          </Text>
        </View>
      </View>

      <Text style={styles.text}>{roast.text}</Text>

      <TouchableOpacity style={styles.likeButton} onPress={handleLike}>
        <Text style={styles.likeText}>❤️ {likes}</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#1a1a1a',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#ff6b35',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  avatarText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  authorInfo: {
    flex: 1,
  },
  authorName: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  date: {
    color: '#666',
    fontSize: 12,
  },
  text: {
    color: '#fff',
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 12,
  },
  likeButton: {
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: '#333',
  },
  likeText: {
    color: '#ff6b35',
    fontSize: 14,
  },
})
