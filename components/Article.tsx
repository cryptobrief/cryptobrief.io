// components/Article.tsx
import { ReactNode } from 'react';

type ArticleProps = {
  title: string;
  date: string;
  description: string;
  children: ReactNode;
};

export default function Article({ title, date, description, children }: ArticleProps) {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold">{title}</h1>
      <p className="text-sm text-gray-500">{date}</p>
      <p className="mt-2 mb-4">{description}</p>
      <article className="prose">
        {children}
      </article>
    </div>
  );
}
