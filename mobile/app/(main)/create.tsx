import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native'
import { useState } from 'react'
import { supabaseClient } from '../../lib/supabase'
import { generateRoast } from '../../lib/ai'

export default function CreateScreen() {
  const [prompt, setPrompt] = useState('')
  const [style, setStyle] = useState('playful')
  const [generatedRoast, setGeneratedRoast] = useState('')
  const [loading, setLoading] = useState(false)

  const handleGenerate = async () => {
    if (!prompt.trim()) {
      Alert.alert('Error', 'Please enter a prompt')
      return
    }

    setLoading(true)
    try {
      const roast = await generateRoast(prompt, style)
      setGeneratedRoast(roast)
    } catch (error) {
      Alert.alert('Error', 'Failed to generate roast')
    } finally {
      setLoading(false)
    }
  }

  const handleSave = async () => {
    if (!generatedRoast) return

    try {
      const { data: { user } } = await supabaseClient.auth.getUser()

      await supabaseClient.from('roasts').insert([
        {
          text: generatedRoast,
          author_id: user?.id || null,
        },
      ])

      Alert.alert('Success', 'Roast saved!')
      setPrompt('')
      setGeneratedRoast('')
    } catch (error) {
      Alert.alert('Error', 'Failed to save roast')
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create Roast</Text>

      <TextInput
        style={styles.input}
        placeholder="What do you want to roast?"
        placeholderTextColor="#666"
        value={prompt}
        onChangeText={setPrompt}
        multiline
      />

      <TouchableOpacity
        style={[styles.button, loading && styles.buttonDisabled]}
        onPress={handleGenerate}
        disabled={loading}
      >
        <Text style={styles.buttonText}>
          {loading ? 'Generating...' : 'Generate Roast'}
        </Text>
      </TouchableOpacity>

      {generatedRoast && (
        <View style={styles.result}>
          <Text style={styles.resultText}>{generatedRoast}</Text>
          <TouchableOpacity style={styles.button} onPress={handleSave}>
            <Text style={styles.buttonText}>Save Roast</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    padding: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 24,
  },
  input: {
    backgroundColor: '#1a1a1a',
    borderRadius: 12,
    padding: 16,
    color: '#fff',
    fontSize: 16,
    minHeight: 100,
    marginBottom: 16,
  },
  button: {
    backgroundColor: '#ff6b35',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
  },
  buttonDisabled: {
    opacity: 0.5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  result: {
    marginTop: 24,
    padding: 16,
    backgroundColor: '#1a1a1a',
    borderRadius: 12,
  },
  resultText: {
    color: '#fff',
    fontSize: 16,
    marginBottom: 16,
  },
})
