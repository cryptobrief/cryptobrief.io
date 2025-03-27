import { Suspense } from 'react';
import dynamic from 'next/dynamic';

const HeroSection = dynamic(() => import('@/components/HeroSection'), {
  loading: () => <div className="card animate-pulse h-64" />
});

const NewsGrid = dynamic(() => import('@/components/NewsGrid'), {
  loading: () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {[...Array(6)].map((_, i) => (
        <div key={i} className="card animate-pulse">
          <div className="bg-gray-200 dark:bg-gray-700 h-48 rounded-lg mb-4"></div>
          <div className="space-y-3">
            <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded"></div>
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-5/6"></div>
          </div>
        </div>
      ))}
    </div>
  )
});

const Sidebar = dynamic(() => import('@/components/Sidebar'), {
  loading: () => <div className="card animate-pulse h-96" />
});

export default function Home() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
      <div className="lg:col-span-9">
        <div className="mb-8">
          <Suspense fallback={<div className="card animate-pulse h-64" />}>
            <HeroSection />
          </Suspense>
        </div>
        <div>
          <Suspense fallback={
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="card animate-pulse">
                  <div className="bg-gray-200 dark:bg-gray-700 h-48 rounded-lg mb-4"></div>
                  <div className="space-y-3">
                    <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
                    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded"></div>
                    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-5/6"></div>
                  </div>
                </div>
              ))}
            </div>
          }>
            <NewsGrid />
          </Suspense>
        </div>
      </div>
      <aside className="lg:col-span-3">
        <Suspense fallback={<div className="card animate-pulse h-96" />}>
          <Sidebar />
        </Suspense>
      </aside>
    </div>
  );
}