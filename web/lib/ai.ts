/**
 * Client-side wrapper for the generate-roast API.
 * Calls the server-side API route to keep API keys secure.
 */
export async function generateRoast(prompt: string, style = 'playful'): Promise<string> {
  const res = await fetch('/api/generate-roast', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ prompt, style }),
  });

  if (!res.ok) {
    const error = await res.json().catch(() => ({ error: 'Failed to generate roast' }));
    throw new Error(error.error || 'Failed to generate roast');
  }

  const data = await res.json();
  return data.text;
}

export default generateRoast;
