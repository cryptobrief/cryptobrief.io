import { notFound } from 'next/navigation';
import { getArticle } from '@/lib/articles';
import Article from '@/components/Article';

export const runtime = 'edge';
export const dynamicParams = true;

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = await getArticle(slug);

  if (!article || !article.title) {
    return notFound();
  }

  return (
    <div className="max-w-3xl mx-auto">
      <Article 
        title={article.title}
        date={article.date}
        content={article.content}
        categories={article.categories}
        tags={article.tags}
        description={article.description}
      />
    </div>
  );
}
