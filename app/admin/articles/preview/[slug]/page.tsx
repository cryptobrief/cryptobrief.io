export const runtime = 'edge';

import { getCachedArticleBySlug } from '@/lib/news-cache';
import ApproveButton from '@/components/ApproveButton';

type Params = {
  slug: string;
};

type Props = {
  params: Promise<Params>;
};

export default async function PreviewPage({ params }: Props) {
  const { slug } = await params; // Await the promise to get the actual params
  const article = getCachedArticleBySlug(slug);

  if (!article) {
    return (
      <main className="p-6 max-w-2xl mx-auto text-red-600">
        ❌ Article not found for slug: {slug}
      </main>
    );
  }

  return (
    <main className="p-6 max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">{article.title}</h1>
      <p className="mb-6 whitespace-pre-line">{article.content}</p>
      <ApproveButton article={article} />
    </main>
  );
}
