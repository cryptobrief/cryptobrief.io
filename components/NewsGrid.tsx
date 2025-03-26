'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import type { Article } from '@/lib/types';

export default function NewsGrid() {
  const [mounted, setMounted] = useState(false);
  const [articles, setArticles] = useState<Article[]>([]);

  // Define your static articles separately and add content and category
  const staticArticles: Article[] = [
    {
      id: 'bitcoin-atm-risks',
      title: 'Bitcoin ATMs: Convenience Meets Risk—Here’s What You Need to Know',
      summary: 'Bitcoin ATMs offer easy crypto transactions, but beware of scams. Learn how to stay safe.',
      imageUrl: '/images/bitcoin-atm.jpg', // ensure this image exists in public/images/
      source: 'CryptoBrief.io',
      publishedAt: '2025-03-26',
      url: '/news/bitcoin-atm-risks',
      content: 'Bitcoin ATMs, also known as BTMs, are rapidly becoming a common sight, offering users the convenience of buying and selling Bitcoin using cash or a card. These machines function similarly to traditional bank ATMs but with a unique digital touch. But with the rising popularity of BTMs, there’s also an increased risk of scams. Here’s everything you need to know...',
      category: 'Bitcoin',  // Add the appropriate category
    },
    // You can add more static articles here, following the same structure
  ];

  useEffect(() => {
    setMounted(true);

    // Fetch your dynamic articles (future implementation)
    async function fetchArticles() {
      try {
        const fetchedArticles: Article[] = await fetch('/api/news').then(res => res.json());
        setArticles([...staticArticles, ...fetchedArticles]);
      } catch (error) {
        console.error('Error fetching articles:', error);
        setArticles(staticArticles); // Fallback to static if API fails
      }
    }

    fetchArticles();
  }, []);

  if (!mounted) {
    return null;
  }

  if (articles.length === 0) {
    return (
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
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {articles.map((article) => (
        <Link key={article.id} href={article.url}>
          <article className="card cursor-pointer hover:shadow-lg transition-shadow">
            <img
              src={article.imageUrl}
              alt={article.title}
              className="w-full h-48 object-cover rounded-lg mb-4"
            />
            <h2 className="text-xl font-bold mb-2">{article.title}</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-4">{article.summary}</p>
            <div className="flex items-center justify-between text-sm text-gray-500">
              <span>{article.source}</span>
              <span>{article.publishedAt}</span>
            </div>
          </article>
        </Link>
      ))}
    </div>
  );
}
