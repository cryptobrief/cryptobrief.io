import { NextResponse } from 'next/server';
import { getArticle } from '@/lib/articles';

export const runtime = 'edge';

export async function GET(request: Request) {
  try {
    // Extract the slug from the URL
    const url = new URL(request.url);
    const slug = url.pathname.split('/').pop();

    if (!slug) {
      return NextResponse.json({ error: 'Missing slug' }, { status: 400 });
    }

    const article = await getArticle(slug);

    if (!article) {
      return NextResponse.json({ error: 'Article not found' }, { status: 404 });
    }

    return NextResponse.json(article);
  } catch (error) {
    console.error('Error fetching article:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
