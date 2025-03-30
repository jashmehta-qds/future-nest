import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { pinCode } = await request.json();

    if (!pinCode) {
      return NextResponse.json({ error: 'Pin code is required' }, { status: 400 });
    }

    const newsPrompt = [
      {
        role: 'system',
        content: 'You are a helpful assistant that provides news articles based on a pin code.',
      },
      {
        role: 'user',
        content: `Fetch the latest news articles (up to 5 days old) for the region with pin code ${pinCode}. Provide the title, URL, and publication date for each article in chronological order (latest to oldest).`,
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
        messages: newsPrompt,
        max_tokens: 500,
      }),
    });

    const data = await aiResponse.json();
    const newsData = data.choices[0].message.content.trim();

    return NextResponse.json({ news: newsData });
  } catch (error) {
    console.error('Error fetching news:', error);
    return NextResponse.json(
      { error: 'Failed to fetch news' },
      { status: 500 }
    );
  }
} 