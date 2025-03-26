'use client';

import { useState, useEffect } from 'react';
import { formatDistanceToNow } from 'date-fns';
import type { MarketSentiment } from '@/lib/types';

export default function HeroSection() {
  const [mounted, setMounted] = useState(false);
  const [sentiment, setSentiment] = useState<MarketSentiment>({
    value: 50,
    classification: 'Neutral',
    timestamp: new Date().toISOString()
  });

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

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
                <span className="text-2xl font-bold text-blue-600">{sentiment.classification}</span>
                <span className="text-sm text-gray-500">
                  Updated {formatDistanceToNow(new Date(sentiment.timestamp))} ago
                </span>
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