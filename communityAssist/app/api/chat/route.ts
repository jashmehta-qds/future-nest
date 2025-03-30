import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { prompt } = await request.json();

    if (!prompt) {
      return NextResponse.json({ error: 'Ask me something!!' }, { status: 400 });
    }

    const messages = [
      {
        role: 'system',
        content: 'You are a helpful assistant that answers user questions based on the provided data.',
      },
      {
        role: 'user',
        content: prompt,
      },
    ];

    const aiResponse = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: messages,
        max_tokens: 150,
      }),
    });

    const data = await aiResponse.json();
    const aiTextResponse = data.choices[0].message.content.trim();

    return NextResponse.json({ response: aiTextResponse });
  } catch (error) {
    console.error('Error communicating with AI API:', error);
    return NextResponse.json(
      { error: 'Failed to process the request' },
      { status: 500 }
    );
  }
} 