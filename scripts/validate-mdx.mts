import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const articlesDir = path.join(process.cwd(), 'content/articles');

async function validateArticles() {
  const files = fs.readdirSync(articlesDir);
  const { serialize } = await import('next-mdx-remote/serialize');

  for (const filename of files) {
    const filePath = path.join(articlesDir, filename);
    const raw = fs.readFileSync(filePath, 'utf8');
    const { content } = matter(raw);

    try {
      const fixed = content.replace(/<img([^>]*?)>/g, '<img$1 />'); // optional: fix <img> tags
      await serialize(fixed);
      console.log(`✅ ${filename} - OK`);
    } catch (error: unknown) {
        console.error(`❌ ${filename} - ERROR`);
        if (error instanceof Error) {
          console.error(error.message);
        } else {
          console.error(String(error));
        }
      }
    }
  }


validateArticles();
