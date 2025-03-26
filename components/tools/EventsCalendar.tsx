'use client';

import { useState, useEffect } from 'react';

export default function EventsCalendar() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <div className="card">
      <h2 className="text-2xl font-bold mb-4">Crypto Events Calendar</h2>
      <p className="text-gray-600 dark:text-gray-400 mb-6">
        Stay updated with important cryptocurrency events, launches, and updates.
      </p>
      <div className="bg-gray-100 dark:bg-gray-800 rounded-lg h-64 flex items-center justify-center">
        <p className="text-gray-500">Events Calendar Coming Soon</p>
      </div>
    </div>
  );
}