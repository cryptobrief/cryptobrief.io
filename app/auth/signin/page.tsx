'use client';

import { signIn } from 'next-auth/react';

export default function SignInPage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-6">
      <h1 className="text-3xl font-bold mb-4">🔐 Sign In to Admin</h1>

      <button
        onClick={() => signIn('google')}
        className="mb-4 px-6 py-2 bg-red-600 text-white rounded hover:bg-red-700"
      >
        Sign in with Google
      </button>

      <button
        onClick={() => signIn('github')}
        className="px-6 py-2 bg-gray-800 text-white rounded hover:bg-gray-900"
      >
        Sign in with GitHub
      </button>
    </main>
  );
}
