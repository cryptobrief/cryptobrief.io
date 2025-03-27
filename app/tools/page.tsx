import { Suspense } from 'react';
import dynamic from 'next/dynamic';

const PortfolioTracker = dynamic(() => import('@/components/tools/PortfolioTracker'), {
  loading: () => <div className="card animate-pulse h-64" />
});

const EventsCalendar = dynamic(() => import('@/components/tools/EventsCalendar'), {
  loading: () => <div className="card animate-pulse h-96" />
});

const CurrencyConverter = dynamic(() => import('@/components/tools/CurrencyConverter'), {
  loading: () => <div className="card animate-pulse h-64" />
});

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
        <div>
          <Suspense fallback={<div className="card animate-pulse h-64" />}>
            <PortfolioTracker />
          </Suspense>
        </div>
        
        <div>
          <Suspense fallback={<div className="card animate-pulse h-64" />}>
            <CurrencyConverter />
          </Suspense>
        </div>
      </div>

      <div>
        <Suspense fallback={<div className="card animate-pulse h-96" />}>
          <EventsCalendar />
        </Suspense>
      </div>
    </div>
  );
}