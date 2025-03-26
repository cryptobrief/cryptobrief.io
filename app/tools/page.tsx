import { Suspense } from 'react';
import PortfolioTracker from '@/components/tools/PortfolioTracker';
import EventsCalendar from '@/components/tools/EventsCalendar';
import CurrencyConverter from '@/components/tools/CurrencyConverter';

export default function ToolsPage() {
  return (
    <div className="space-y-8">
      <div className="card">
        <h1 className="text-3xl font-bold mb-6">Crypto Tools</h1>
        <p className="text-gray-600 dark:text-gray-400 mb-8">
          Powerful tools to help you track, analyze, and manage your crypto investments.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Suspense fallback={<div className="card animate-pulse h-64" />}>
          <PortfolioTracker />
        </Suspense>
        
        <Suspense fallback={<div className="card animate-pulse h-64" />}>
          <CurrencyConverter />
        </Suspense>
      </div>

      <Suspense fallback={<div className="card animate-pulse h-96" />}>
        <EventsCalendar />
      </Suspense>
    </div>
  );
}