'use client';

import React, { useEffect, useState } from 'react';
import { format } from 'date-fns';
import dynamic from 'next/dynamic';
import type { MDXRemoteSerializeResult } from 'next-mdx-remote';

const MDXRemoteWrapper = dynamic(
  () => import('./MDXRemoteWrapper'),
  { 
    ssr: false,
    loading: () => (
      <div className="animate-pulse space-y-4">
        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded"></div>
        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-5/6"></div>
      </div>
    )
  }
);

interface ArticleProps {
  title: string;
  date: string;
  description: string;
  content: MDXRemoteSerializeResult | string;
  categories?: string[];
  tags?: string[];
}

interface TableOfContentsItem {
  id: string;
  title: string;
  level: number;
}

export default function Article({ title, date, description, content, categories = [], tags = [] }: ArticleProps) {
  const [tableOfContents, setTableOfContents] = useState<TableOfContentsItem[]>([]);

  useEffect(() => {
    // Extract headings from content after component mounts
    const articleContent = document.querySelector('.prose');
    if (articleContent) {
      const headings = articleContent.querySelectorAll('h2');
      const toc: TableOfContentsItem[] = Array.from(headings).map((heading, index) => {
        const id = `section-${index}`;
        heading.id = id;
        return {
          id,
          title: heading.textContent || '',
          level: parseInt(heading.tagName.charAt(1))
        };
      });
      setTableOfContents(toc);
    }
  }, [content]);

  return (
    <article className="max-w-5xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <div className="lg:col-span-3">
          <div className="card">
            <h1 className="font-heading text-[2.5rem] leading-[1.2] tracking-[-0.5px] font-bold mb-4">{title}</h1>
            <div className="flex items-center gap-4 text-gray-600 dark:text-gray-400 mb-8">
              <time dateTime={date}>{format(new Date(date), 'MMMM d, yyyy')}</time>
              {categories.length > 0 && (
                <div className="flex gap-2">
                  {categories.map((category) => (
                    <span
                      key={category}
                      className="bg-blue-100 dark:bg-blue-900/20 text-blue-800 dark:text-blue-200 px-2 py-1 rounded text-sm"
                    >
                      {category}
                    </span>
                  ))}
                </div>
              )}
            </div>
            
            <div className="prose dark:prose-invert max-w-none">
              {typeof content === 'string' ? (
                <div dangerouslySetInnerHTML={{ __html: content }} />
              ) : (
                <MDXRemoteWrapper source={content} />
              )}
            </div>

            {tags.length > 0 && (
              <div className="mt-8 pt-8 border-t dark:border-gray-800">
                <div className="flex flex-wrap gap-2">
                  {tags.map((tag) => (
                    <span
                      key={tag}
                      className="bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 px-2 py-1 rounded text-sm"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="lg:col-span-1">
          <div className="card sticky top-4">
            <h2 className="text-xl font-bold mb-4">Contents</h2>
            <nav className="space-y-2">
              {tableOfContents.map((item) => (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  className="block text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                >
                  {item.title}
                </a>
              ))}
            </nav>
          </div>
        </div>
      </div>
    </article>
  );
}