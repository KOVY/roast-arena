import { View, Text, FlatList, StyleSheet } from 'react-native'
import { useEffect, useState } from 'react'
import { supabaseClient } from '../../lib/supabase'
import RoastCard from '../../components/RoastCard'

export default function HomeScreen() {
  const [roasts, setRoasts] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadRoasts()
  }, [])

  const loadRoasts = async () => {
    try {
      const { data, error } = await supabaseClient
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
        .order('created_at', { ascending: false })
        .limit(20)

      if (error) throw error
      setRoasts(data || [])
    } catch (error) {
      console.error('Failed to load roasts:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🔥 RoastArena</Text>

      <FlatList
        data={roasts}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <RoastCard roast={item} />}
        contentContainerStyle={styles.list}
        refreshing={loading}
        onRefresh={loadRoasts}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    padding: 16,
    textAlign: 'center',
  },
  list: {
    padding: 16,
  },
})
