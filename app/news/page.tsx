import { Suspense } from 'react';
import { getAllArticles } from '@/lib/articles';
import Link from 'next/link';

export default async function NewsPage() {
  const articles = await getAllArticles();

  return (
    <div className="space-y-8">
      <div className="card">
        <h1 className="text-3xl font-bold mb-6">Latest Crypto News</h1>
        <p className="text-gray-600 dark:text-gray-400 mb-8">
          Stay informed with the latest cryptocurrency news and insights.
        </p>
      </div>

      <div className="space-y-6">
        {articles.map((article) => (
          <Link href={`/news/${article.slug}`} key={article.slug}>
            <article className="card hover:shadow-xl transition-shadow">
              <h2 className="text-xl font-bold mb-2">{article.title}</h2>
              <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">
                {article.description}
              </p>
              <div className="flex flex-wrap gap-2">
                {article.categories?.map((category) => (
                  <span
                    key={category}
                    className="bg-blue-100 dark:bg-blue-900/20 text-blue-800 dark:text-blue-200 px-2 py-1 rounded text-sm"
                  >
                    {category}
                  </span>
                ))}
              </div>
            </article>
          </Link>
        ))}
      </div>
    </div>
  );
}