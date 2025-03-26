// app/api/news/route.ts

export const runtime = 'edge'; // Add this line to use Edge Runtime

import { NextResponse } from 'next/server';

export async function GET() {
  const articles = [
    {
      id: 'dynamic-article-1',
      title: 'Dynamic Article Example',
      summary: 'Example of dynamically fetched article.',
      imageUrl: '/images/example-dynamic.jpg',
      source: 'CoinDesk',
      publishedAt: '2025-03-27',
      url: '/news/dynamic-article-example',
    },
    // Additional dynamic articles here
  ];

  return NextResponse.json(articles);
}
