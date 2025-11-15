import Constants from 'expo-constants'

const GROK_API_KEY = Constants.expoConfig?.extra?.grokApiKey || ''
const GROK_API_URL = 'https://api.grok.ai/v1/generate'

export async function generateRoast(prompt: string, style: string = 'playful'): Promise<string> {
  if (!GROK_API_KEY) {
    throw new Error('Grok API key is not configured')
  }

  const response = await fetch(GROK_API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${GROK_API_KEY}`,
    },
    body: JSON.stringify({
      prompt,
      style,
      max_tokens: 256,
      temperature: 0.9,
    }),
  })

  if (!response.ok) {
    throw new Error('Failed to generate roast')
  }

  const data = await response.json()
  return data.text || data.result || ''
}
