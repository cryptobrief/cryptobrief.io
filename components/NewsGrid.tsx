'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import type { Article } from '@/lib/types';

export default function NewsGrid() {
  const [mounted, setMounted] = useState(false);
  const [articles, setArticles] = useState<Article[]>([]);

  useEffect(() => {
    setMounted(true);

    // Fetch the dynamic articles and limit to 9
    async function fetchArticles() {
      try {
        const fetchedArticles: Article[] = await fetch('/api/news').then(res => res.json());
        // Limit to the first 9 articles
        setArticles(fetchedArticles.slice(0, 9));
      } catch (error) {
        console.error('Error fetching articles:', error);
        setArticles([]); // Handle errors by showing no articles or fallback content
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
