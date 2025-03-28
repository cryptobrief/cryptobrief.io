'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { formatDistanceToNow } from 'date-fns';
import type { Article } from '@/lib/types';

// Type Guard for checking if data is an array of Articles
function isArticleArray(data: any): data is Article[] {
  return Array.isArray(data) && data.every((item) => item.slug && item.title);
}

export default function NewsGrid() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadArticles() {
      try {
        const response = await fetch('/api/articles');
        const data = await response.json();

        // Detailed logging of the fetched data
        console.log('Fetched data:', data);  // Log the data for debugging

        if (isArticleArray(data)) {
          setArticles(data);
        } else {
          console.error('Expected array but got:', data);
          setArticles([]); // fallback to empty array
        }
      } catch (error) {
        console.error('Error loading articles:', error);
        setArticles([]); // fallback to empty array on error
      } finally {
        setLoading(false);
      }
    }

    loadArticles();
  }, []);

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(9)].map((_, i) => (
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
        <Link href={`/news/${article.slug}`} key={article.slug}>
          <article className="card hover:shadow-xl transition-shadow h-full">
            <div className="relative">
              <div className="aspect-video bg-gray-200 dark:bg-gray-800 rounded-lg mb-4 overflow-hidden">
                <img
                  src={article.imageUrl || 'https://images.unsplash.com/photo-1518186233392-c232efbf2373'}
                  alt={article.title}
                  className="w-full h-full object-cover"
                />
              </div>
              {article.categories?.[0] && (
                <span className="absolute top-2 right-2 bg-blue-600 text-white px-2 py-1 rounded-full text-sm">
                  {article.categories[0]}
                </span>
              )}
            </div>
            <h2 className="text-xl font-bold mb-2 line-clamp-2">{article.title}</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-3">
              {article.description}
            </p>
            <div className="flex items-center justify-between text-sm text-gray-500 mt-auto">
              <span>{article.source || 'CryptoBrief'}</span>
              <time dateTime={article.date}>
                {formatDistanceToNow(new Date(article.date))} ago
              </time>
            </div>
          </article>
        </Link>
      ))}
    </div>
  );
}
