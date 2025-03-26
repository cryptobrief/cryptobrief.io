'use client';

import { useState, useEffect } from 'react';

export default function PortfolioTracker() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <div className="card">
      <h2 className="text-2xl font-bold mb-4">Portfolio Tracker</h2>
      <p className="text-gray-600 dark:text-gray-400 mb-6">
        Track your crypto portfolio performance in real-time.
      </p>
      <div className="bg-gray-100 dark:bg-gray-800 rounded-lg h-48 flex items-center justify-center">
        <p className="text-gray-500">Portfolio Tracker Coming Soon</p>
      </div>
    </div>
  );
}