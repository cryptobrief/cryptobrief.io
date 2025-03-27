'use client';

import { useState, useEffect } from 'react';
import { formatDistanceToNow } from 'date-fns';
import type { MarketSentiment } from '@/lib/types';

export default function HeroSection() {
  const [sentiment, setSentiment] = useState<MarketSentiment>({
    value: 50,
    classification: 'Neutral',
    timestamp: new Date().toISOString()
  });
  const [loading, setLoading] = useState(false);

  async function fetchSentiment() {
    try {
      setLoading(true);
      const response = await fetch('/api/sentiment');
      if (!response.ok) throw new Error('Failed to fetch sentiment');
      const data = await response.json();
      setSentiment(data);
    } catch (error) {
      console.error('Error fetching sentiment:', error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchSentiment();
    // Update sentiment every 5 minutes
    const interval = setInterval(fetchSentiment, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="mb-12">
      <div className="card">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h1 className="text-4xl font-bold mb-4">
              Crypto Market Overview
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Get real-time insights and AI-powered analysis of the cryptocurrency market
            </p>
            <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
              <h2 className="text-lg font-semibold mb-2">Market Sentiment</h2>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className={`text-2xl font-bold ${
                    sentiment.classification === 'Extreme Fear' ? 'text-red-600' :
                    sentiment.classification === 'Fear' ? 'text-orange-600' :
                    sentiment.classification === 'Neutral' ? 'text-blue-600' :
                    sentiment.classification === 'Greed' ? 'text-green-600' :
                    'text-emerald-600'
                  }`}>
                    {sentiment.classification}
                  </span>
                  {loading && (
                    <div className="animate-spin rounded-full h-4 w-4 border-2 border-blue-600 border-t-transparent" />
                  )}
                </div>
                <span className="text-sm text-gray-500">
                  Updated {formatDistanceToNow(new Date(sentiment.timestamp))} ago
                </span>
              </div>
              <div className="mt-4">
                <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                  <div 
                    className={`h-full transition-all duration-500 ${
                      sentiment.classification === 'Extreme Fear' ? 'bg-red-600' :
                      sentiment.classification === 'Fear' ? 'bg-orange-600' :
                      sentiment.classification === 'Neutral' ? 'bg-blue-600' :
                      sentiment.classification === 'Greed' ? 'bg-green-600' :
                      'bg-emerald-600'
                    }`}
                    style={{ width: `${sentiment.value}%` }}
                  />
                </div>
              </div>
            </div>
          </div>
          
          <div className="relative">
            <div className="bg-gray-100 dark:bg-gray-800 rounded-lg h-64 flex items-center justify-center">
              <p className="text-gray-500">Price Chart Coming Soon</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}