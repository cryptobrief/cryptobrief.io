import fs from 'fs';
import path from 'path';

export function getArticleBySlug(slug: string) {
  const filePath = path.join(process.cwd(), 'content/articles', `${slug}.mdx`);

  if (!fs.existsSync(filePath)) return null;

  const content = fs.readFileSync(filePath, 'utf8');

  return content;
}