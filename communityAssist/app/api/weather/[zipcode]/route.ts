import { NextResponse } from 'next/server';

export async function GET(
  request: Request,
  { params }: { params: { zipcode: string } }
) {
  try {
    if (!params.zipcode) {
      return NextResponse.json(
        { error: 'Zipcode is required' },
        { status: 400 }
      );
    }

    const response = await fetch(
      `https://weather-api-l672.onrender.com/weather/zipcode/${params.zipcode}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        next: { revalidate: 300 }, // Cache for 5 minutes
      }
    );

    if (!response.ok) {
      throw new Error(`Weather API responded with status: ${response.status}`);
    }

    const data = await response.json();

    if (!data || !Array.isArray(data)) {
      throw new Error('Invalid data format received from weather API');
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error('Weather API Error:', error);
    return NextResponse.json(
      { 
        error: 'Failed to fetch weather data',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
} 