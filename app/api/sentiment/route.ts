import { NextResponse } from 'next/server';
import type { MarketSentiment } from '@/lib/types';

export const runtime = 'edge';

// Helper function to calculate sentiment
function calculateSentiment(): MarketSentiment {
  // This is a simplified example. In production, you would:
  // 1. Fetch data from multiple sources (APIs, social media, news)
  // 2. Use more sophisticated sentiment analysis
  // 3. Consider market indicators, trading volume, etc.
  
  const value = Math.floor(Math.random() * 100);
  let classification: MarketSentiment['classification'];
  
  if (value < 20) classification = 'Extreme Fear';
  else if (value < 40) classification = 'Fear';
  else if (value < 60) classification = 'Neutral';
  else if (value < 80) classification = 'Greed';
  else classification = 'Extreme Greed';

  return {
    value,
    classification,
    timestamp: new Date().toISOString()
  };
}

export async function GET() {
  try {
    const sentiment = calculateSentiment();
    return NextResponse.json(sentiment);
  } catch (error) {
    console.error('Error calculating sentiment:', error);
    return NextResponse.json(
      { error: 'Failed to calculate market sentiment' },
      { status: 500 }
    );
  }
}