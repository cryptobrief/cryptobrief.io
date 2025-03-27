import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { serialize } from 'next-mdx-remote/serialize';

const articlesDirectory = path.join(process.cwd(), 'content/articles');

export async function getArticle(slug: string) {
  try {
    const fullPath = path.join(articlesDirectory, `${slug}.mdx`);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data, content } = matter(fileContents);
    
    const mdxSource = await serialize(content, {
      parseFrontmatter: false,
      mdxOptions: {
        development: process.env.NODE_ENV === 'development'
      }
    });

    return {
      slug,
      content: mdxSource,
      ...data,
    };
  } catch (error) {
    console.error('Error getting article:', error);
    throw error;
  }
}

export async function getAllArticles() {
  const files = fs.readdirSync(articlesDirectory);
  const articles = files.map((fileName) => {
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
  });

  // Sort articles by date in descending order (newest first)
  return articles.sort((a: any, b: any) => {
    if (new Date(a.date) < new Date(b.date)) {
      return 1;
    } else {
      return -1;
    }
  });
}