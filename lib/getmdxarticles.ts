import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { serialize } from 'next-mdx-remote/serialize';
import type { Article } from './types';

const articlesDirectory = path.join(process.cwd(), 'content/articles');

export async function getAllArticles(): Promise<Article[]> {
  const files = fs.readdirSync(articlesDirectory);

  const articles: Article[] = await Promise.all(
    files.map(async (filename) => {
      const filePath = path.join(articlesDirectory, filename);
      const fileContent = fs.readFileSync(filePath, 'utf8');
      const { data, content } = matter(fileContent);

      return {
        slug: filename.replace(/\.mdx$/, ''),
        title: data.title,
        date: data.date,
        description: data.description,
        categories: data.categories || [],
        tags: data.tags || [],
        content: await serialize(content),
      };
    })
  );

  // Sort by date (newest first)
  return articles.sort((a, b) => (new Date(a.date) < new Date(b.date) ? 1 : -1));
}

export async function getArticle(slug: string): Promise<Article | null> {
  try {
    const filePath = path.join(articlesDirectory, `${slug}.mdx`);
    const fileContent = fs.readFileSync(filePath, 'utf8');
    const { data, content } = matter(fileContent);

    return {
      slug,
      title: data.title,
      date: data.date,
      description: data.description,
      categories: data.categories || [],
      tags: data.tags || [],
      content: await serialize(content),
    };
  } catch (err) {
    console.error(`Error loading article for slug: ${slug}`, err);
    return null;
  }
}