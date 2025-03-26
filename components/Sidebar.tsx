'use client';

import { useState, useEffect } from 'react';
import type { CryptoPrice } from '@/lib/types';

export default function Sidebar() {
  const [mounted, setMounted] = useState(false);
  const [prices, setPrices] = useState<CryptoPrice[]>([]);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <div className="space-y-6">
      <div className="card">
        <h2 className="text-xl font-bold mb-4">Top Cryptocurrencies</h2>
        {prices.length === 0 ? (
          <div className="space-y-4">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="animate-pulse flex items-center justify-between">
                <div className="space-y-2">
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-24"></div>
                  <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-16"></div>
                </div>
                <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-20"></div>
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            {prices.map((crypto) => (
              <div key={crypto.id} className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium">{crypto.name}</h3>
                  <p className="text-sm text-gray-500">{crypto.symbol.toUpperCase()}</p>
                </div>
                <div className={`text-right ${crypto.price_change_percentage_24h >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  ${crypto.current_price.toLocaleString()}
                  <p className="text-sm">
                    {crypto.price_change_percentage_24h > 0 ? '+' : ''}
                    {crypto.price_change_percentage_24h.toFixed(2)}%
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="card">
        <h2 className="text-xl font-bold mb-4">Sponsored</h2>
        <div className="bg-gray-100 dark:bg-gray-800 rounded-lg h-48 flex items-center justify-center">
          <p className="text-gray-500">Advertisement</p>
        </div>
      </div>
    </div>
  );
}