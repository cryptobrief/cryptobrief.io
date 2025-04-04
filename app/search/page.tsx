import { Suspense } from 'react';
import { getAllArticles } from '@/lib/articles';
import Link from 'next/link';

export const runtime = 'edge';
export const dynamic = 'force-dynamic';

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q = '' } = await searchParams;
  const articles = await getAllArticles();
  
  const searchResults = articles.filter(article => {
    const searchableText = `${article.title} ${article.description} ${article.categories?.join(' ')} ${article.tags?.join(' ')}`.toLowerCase();
    return searchableText.includes(q.toLowerCase());
  });

  return (
    <div className="space-y-8">
      <div className="card">
        <h1 className="text-3xl font-bold mb-6">Search Results</h1>
        <p className="text-gray-600 dark:text-gray-400 mb-8">
          {q ? (
            <>
              Found {searchResults.length} result{searchResults.length !== 1 ? 's' : ''} for &quot;{q}&quot;
            </>
          ) : (
            'Please enter a search term'
          )}
        </p>
      </div>

      <div className="space-y-6">
        {searchResults.map((article) => (
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

        {q && searchResults.length === 0 && (
          <div className="card">
            <p className="text-gray-600 dark:text-gray-400">
              No results found for &quot;{q}&quot;. Try a different search term.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}