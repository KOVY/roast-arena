/**
 * Simple edge function to proxy Grok AI generation.
 * Expects POST { prompt, style }
 */
export default async function handler(req: any) {
  try {
    if (req.method !== 'POST') return new Response(null, { status: 405 });
    const { prompt, style } = await req.json();
    const key = process.env.GROK_API_KEY;
    if (!key) return new Response(JSON.stringify({ error: 'GROK_API_KEY not set' }), { status: 500 });

    const body = { prompt: Write a  roast: , max_tokens: 256 };

    const grokRes = await fetch('https://api.grok.ai/v1/generate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: Bearer  },
      body: JSON.stringify(body),
    });

    const data = await grokRes.json();
    const text = data.text ?? data.result ?? JSON.stringify(data);
    return new Response(JSON.stringify({ text }), { status: 200, headers: { 'Content-Type': 'application/json' } });
  } catch (err: any) {
    return new Response(JSON.stringify({ error: String(err) }), { status: 500 });
  }
}
