import { notFound } from 'next/navigation';
import { getArticle } from '@/lib/articles';
import Article from '@/components/Article';

export const runtime = 'edge';
export const dynamicParams = true;
export const dynamic = 'force-dynamic'; // <- helps with build/runtime consistency

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  try {
    const { slug } = await params;
    const article = await getArticle(slug);

    if (!article || !article.title || !article.content) {
      console.error('[ArticlePage Error] Invalid or missing article:', { slug, article });
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
  } catch (error) {
    console.error('[ArticlePage Error] Exception while loading article:', error);
    return notFound();
  }
}
