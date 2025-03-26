import { Suspense } from 'react';
import HeroSection from '@/components/HeroSection';
import NewsGrid from '@/components/NewsGrid';
import Sidebar from '@/components/Sidebar';

export default function Home() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
      <div className="lg:col-span-9">
        <Suspense fallback={<div>Loading hero section...</div>}>
          <HeroSection />
        </Suspense>
        <Suspense fallback={<div>Loading news...</div>}>
          <NewsGrid />
        </Suspense>
      </div>
      <aside className="lg:col-span-3">
        <Suspense fallback={<div>Loading sidebar...</div>}>
          <Sidebar />
        </Suspense>
      </aside>
    </div>
  );
}