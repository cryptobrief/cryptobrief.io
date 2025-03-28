// lib/news-cache.ts
import fs from 'fs';
import path from 'path';

export function getCachedArticleBySlug(slug: string) {
  const filePath = path.join(process.cwd(), '.cache/news.json');
  const raw = fs.readFileSync(filePath, 'utf8');
  const articles = JSON.parse(raw);

  return articles.find((a: any) =>
    a.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '') === slug
  );
}
