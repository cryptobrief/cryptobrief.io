'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Tweet } from 'react-tweet';
import { FiDollarSign, FiTrendingUp } from 'react-icons/fi';
import { FaBitcoin } from 'react-icons/fa';
import type { CryptoPrice } from '@/lib/types';

export default function Sidebar() {
  const [prices] = useState<CryptoPrice[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <div className="space-y-6">
      {/* Google Ads Space */}
      <div className="card">
        <div className="bg-gray-100 dark:bg-gray-800 rounded-lg h-[250px] flex items-center justify-center">
          <p className="text-gray-500">Advertisement</p>
        </div>
      </div>

      {/* Affiliate Marketing Banners */}
      <div className="space-y-4">
        {/* Binance Banner */}
        <Link href="https://accounts.binance.com/register" target="_blank" rel="noopener noreferrer" className="block">
          <div className="card bg-[#F3BA2F] hover:opacity-90 transition-opacity">
            <div className="flex items-center justify-between p-4">
              <div className="text-black">
                <h3 className="font-bold text-lg">Trade on Binance</h3>
                <p className="text-sm">Get up to 100 USDT in trading fee rebate</p>
              </div>
              <img 
                src="https://public.bnbstatic.com/static/images/common/binance-logo.png" 
                alt="Binance" 
                className="h-8"
              />
            </div>
          </div>
        </Link>

        {/* Ledger Banner */}
        <Link href="https://shop.ledger.com" target="_blank" rel="noopener noreferrer" className="block">
          <div className="card bg-black hover:opacity-90 transition-opacity">
            <div className="flex items-center justify-between p-4">
              <div className="text-white">
                <h3 className="font-bold text-lg">Secure Your Crypto</h3>
                <p className="text-sm">Get your Ledger hardware wallet</p>
              </div>
              <img 
                src="https://cdn.shopify.com/s/files/1/2974/4858/files/ledger-logo_200x.png" 
                alt="Ledger" 
                className="h-8 invert"
              />
            </div>
          </div>
        </Link>
      </div>

      {/* Twitter Trends */}
      <div className="card">
        <h2 className="text-xl font-bold mb-4">Crypto Twitter</h2>
        <div className="space-y-4">
          <Tweet id="1631001385985773568" />
          <Tweet id="1631001385985773569" />
        </div>
      </div>

      {/* Crypto Tools Widgets */}
      <div className="card">
        <h2 className="text-xl font-bold mb-4">Quick Tools</h2>
        <div className="space-y-4">
          {/* Portfolio Value */}
          <div className="p-4 bg-gray-100 dark:bg-gray-800 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <FaBitcoin className="text-[#F7931A]" />
              <h3 className="font-semibold">Portfolio Value</h3>
            </div>
            <p className="text-2xl font-bold">$25,420.69</p>
            <p className="text-sm text-green-600">+2.5% (24h)</p>
          </div>

          {/* Quick Convert */}
          <div className="p-4 bg-gray-100 dark:bg-gray-800 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <FiDollarSign className="text-green-600" />
              <h3 className="font-semibold">Quick Convert</h3>
            </div>
            <div className="flex flex-col gap-2">
              <div className="relative">
                <input
                  type="number"
                  placeholder="1 BTC"
                  className="w-full px-3 py-2 rounded border dark:border-gray-700 dark:bg-gray-900"
                />
              </div>
              <div className="flex items-center justify-center">
                <span className="px-3 py-2">=</span>
              </div>
              <div className="relative">
                <input
                  type="number"
                  placeholder="$42,000"
                  className="w-full px-3 py-2 rounded border dark:border-gray-700 dark:bg-gray-900"
                  readOnly
                />
              </div>
            </div>
          </div>

          {/* Market Trends */}
          <div className="p-4 bg-gray-100 dark:bg-gray-800 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <FiTrendingUp className="text-blue-600" />
              <h3 className="font-semibold">Market Trends</h3>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Fear & Greed Index</span>
                <span className="font-semibold text-yellow-600">65 - Greed</span>
              </div>
              <div className="flex justify-between">
                <span>BTC Dominance</span>
                <span className="font-semibold">48.2%</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Additional Ad Space */}
      <div className="card">
        <div className="bg-gray-100 dark:bg-gray-800 rounded-lg h-[600px] flex items-center justify-center">
          <p className="text-gray-500">Advertisement</p>
        </div>
      </div>
    </div>
  );
}