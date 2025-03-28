import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const articlesDirectory = path.join(process.cwd(), 'content/articles');

export async function GET() {
  try {
    const files = fs.readdirSync(articlesDirectory);
    const articles = await Promise.all(
      files.map(async (fileName) => {
        const slug = fileName.replace(/\.mdx$/, '');
        const fullPath = path.join(articlesDirectory, fileName);
        const fileContents = fs.readFileSync(fullPath, 'utf8');
        const { data, content } = matter(fileContents);
        
        // Get the first paragraph as a summary if no description is provided
        const summary = data.description || content.split('\n')[0];

        return {
          slug,
          ...data,
          description: summary,
          imageUrl: data.imageUrl || 'https://images.unsplash.com/photo-1518186233392-c232efbf2373',
        };
      })
    );

    // Sort articles by date in descending order (newest first)
    const sortedArticles = articles.sort((a: any, b: any) => {
      if (new Date(a.date) < new Date(b.date)) {
        return 1;
      } else {
        return -1;
      }
    });

    return NextResponse.json(sortedArticles);
  } catch (error) {
    console.error('Error fetching articles:', error);
    return NextResponse.json({ error: 'Failed to fetch articles' }, { status: 500 });
  }
}