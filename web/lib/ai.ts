/**
 * Grok API wrapper (minimal). Uses GROK_API_KEY env var.
 * Note: endpoint and request shape are illustrative; adapt to the real Grok API.
 */
type GrokResponse = { text?: string; result?: string } | any;

export async function generateRoast(prompt: string, style = 'playful'): Promise<string> {
  const key = process.env.NEXT_PUBLIC_GROK_API_KEY ?? process.env.GROK_API_KEY;
  if (!key) throw new Error('GROK_API_KEY is not set');

  const body = {
    prompt: `Write a ${style} roast about: ${prompt}`,
    max_tokens: 256,
    temperature: 0.9,
  };

  const res = await fetch('https://api.grok.ai/v1/generate', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${key}` },
    body: JSON.stringify(body),
  });

  const data: GrokResponse = await res.json();
  // adapt depending on the actual response shape
  return (data.text as string) ?? (data.result as string) ?? JSON.stringify(data);
}

export default generateRoast;
