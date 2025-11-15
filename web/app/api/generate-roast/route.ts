import { NextResponse } from 'next/server';

type GrokResponse = { text?: string; result?: string } | any;

export async function POST(req: Request) {
  try {
    const { prompt, style = 'playful' } = await req.json();

    // Validate input
    if (!prompt || typeof prompt !== 'string') {
      return NextResponse.json(
        { error: 'Invalid prompt: must be a non-empty string' },
        { status: 400 }
      );
    }

    if (prompt.length > 1000) {
      return NextResponse.json(
        { error: 'Prompt too long: maximum 1000 characters' },
        { status: 400 }
      );
    }

    const key = process.env.GROK_API_KEY;
    if (!key) {
      console.error('GROK_API_KEY is not configured');
      return NextResponse.json(
        { error: 'AI service not configured' },
        { status: 503 }
      );
    }

    const body = {
      prompt: `Write a ${style} roast about: ${prompt}`,
      max_tokens: 256,
      temperature: 0.9,
    };

    const res = await fetch('https://api.grok.ai/v1/generate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${key}`,
      },
      body: JSON.stringify(body),
    });

    if (!res.ok) {
      console.error(`Grok API error: ${res.status} ${res.statusText}`);
      const errorText = await res.text().catch(() => 'Unknown error');
      return NextResponse.json(
        { error: 'Failed to generate roast', details: errorText },
        { status: res.status }
      );
    }

    const data: GrokResponse = await res.json();
    const text = (data.text as string) ?? (data.result as string) ?? JSON.stringify(data);

    return NextResponse.json({ text });
  } catch (err: any) {
    console.error('Error in generate-roast API:', err);
    return NextResponse.json(
      { error: err.message ?? 'Internal server error' },
      { status: 500 }
    );
  }
}
