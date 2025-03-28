import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const articlesDir = path.join(process.cwd(), 'content/articles');
const outputPath = path.join(process.cwd(), 'lib/article-cache.json');

async function buildCache() {
  const files = fs.readdirSync(articlesDir);
  const cache = [];

  // 🪄 Dynamic import for ESM-friendly MDX processing
  const { serialize } = await import('next-mdx-remote/serialize');

  for (const filename of files) {
    const filePath = path.join(articlesDir, filename);
    const raw = fs.readFileSync(filePath, 'utf8');
    const { data, content } = matter(raw);

    // ✅ Auto-fix for unclosed <img> tags
    const fixedContent = content.replace(/<img([^>]*?)>/g, '<img$1 />');
    const mdxSource = await serialize(fixedContent);

    cache.push({
      slug: filename.replace(/\.mdx$/, ''),
      title: data.title,
      date: data.date,
      description: data.description,
      categories: data.categories || [],
      tags: data.tags || [],
      content: mdxSource,
    });
  }

  // ✅ Save to .next/cache/articles.json
  fs.mkdirSync(path.dirname(outputPath), { recursive: true });
  fs.writeFileSync(outputPath, JSON.stringify(cache, null, 2));
  console.log('✅ Precompiled articles saved to .next/cache/articles.json');
}

buildCache();
