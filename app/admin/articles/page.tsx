console.log('✅ SITE_URL:', process.env.NEXT_PUBLIC_SITE_URL);
export const runtime = 'edge';

import fs from 'fs';
import path from 'path';
import Link from 'next/link';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth-options';

function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export default async function AdminArticlesPage() {
  const session = await getServerSession(authOptions);

  const isAdmin = session?.user?.email === 'cryptobrief75@gmail.com';

  if (!session) {
    return (
      <main className="p-6 max-w-2xl mx-auto text-center">
        <h1 className="text-2xl font-bold mb-4">🔒 Please sign in to view this page.</h1>
        <Link href="/auth/signin" className="text-blue-600 underline hover:text-blue-800">
          Go to Sign In
        </Link>
      </main>
    );
  }

  if (!isAdmin) {
    return (
      <main className="p-6 max-w-2xl mx-auto text-center">
        <h1 className="text-2xl font-bold mb-4 text-red-600">🚫 Not Authorized</h1>
        <p className="text-gray-600">You do not have permission to view this page.</p>
      </main>
    );
  }

  const filePath = path.join(process.cwd(), '.cache/news.json');
  const raw = fs.readFileSync(filePath, 'utf8');
  const articles = JSON.parse(raw);

  const approvedDir = path.join(process.cwd(), 'content/articles');
  const approvedSlugs = fs.existsSync(approvedDir)
    ? fs.readdirSync(approvedDir).map((file) => file.replace(/\.mdx$/, ''))
    : [];

  return (
    <main className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">📝 Articles to Approve</h1>
      <p className="mb-4 text-sm text-gray-600">Signed in as {session.user?.email}</p>

      <ul className="space-y-4">
        {articles.map((article: any) => {
          const slug = generateSlug(article.title);
          const isApproved = approvedSlugs.includes(slug);

          return (
            <li
              key={slug}
              className={`p-3 rounded border ${
                isApproved ? 'line-through text-gray-400 bg-gray-100' : 'bg-white'
              }`}
            >
              <Link
                href={`/admin/articles/preview/${slug}`}
                className={`underline ${
                  isApproved ? 'pointer-events-none cursor-not-allowed' : 'text-blue-600 hover:text-blue-800'
                }`}
              >
                {article.title}
              </Link>
            </li>
          );
        })}
      </ul>
    </main>
  );
}
