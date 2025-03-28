import { getAllArticles } from '@/lib/articles'; // ✅ Correct import
import { NextResponse } from 'next/server';

export const runtime = 'nodejs'; // ✅ Must not be 'edge'

export async function GET() {
  try {
    const articles = await getAllArticles();

    // Optional: Safety check
    if (!Array.isArray(articles)) {
      console.error('Expected array but got:', articles);
      return NextResponse.json([], { status: 500 });
    }

    return NextResponse.json(articles);
  } catch (error) {
    console.error('Error in /api/articles:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
