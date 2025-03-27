import { notFound } from 'next/navigation';
import { getArticle } from '@/lib/articles';
import Article from '@/components/Article';

export default async function ArticlePage({ params }: { params: { slug: string } }) {
  try {
    const article = await getArticle(params.slug);

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
    console.error('Error loading article:', error);
    notFound();
  }
}