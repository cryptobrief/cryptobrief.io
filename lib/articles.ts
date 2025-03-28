import type { Article } from './types';
import articleCache from './article-cache.json'; // ✅ Correct path

// Return all articles (newest first, without full content for performance)
export async function getAllArticles(): Promise<Article[]> {
  return articleCache
    .map(({ content, ...rest }) => ({
      ...rest,
      content: '', // omit heavy content from list view
    }))
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()); // newest first
}

// Return a specific article by slug (with full content)
export async function getArticle(slug: string): Promise<Article | null> {
  const found = articleCache.find((a) => a.slug === slug);
  return found || null;
}
