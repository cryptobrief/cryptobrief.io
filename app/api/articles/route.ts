import { NextResponse } from 'next/server';
import { getAllArticles } from '@/lib/articles';

export const runtime = 'edge';

export async function GET() {
  try {
    const articles = await getAllArticles();
    return NextResponse.json(articles);
  } catch (error) {
    console.error('Error in /api/articles:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}