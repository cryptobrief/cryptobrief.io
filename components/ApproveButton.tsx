'use client';

import { useState } from 'react';

export default function ApproveButton({ article }: { article: { title: string; content: string; summary?: string } }) {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  async function handleApprove() {
    setStatus('loading');

    const res = await fetch('/api/articles/approve', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(article),
    });

    const data = await res.json();

    if (data.success) {
      setStatus('success');
      alert(`✅ Approved! Article saved as ${data.slug}.mdx`);
      window.location.href = '/admin/articles';
    } else {
      setStatus('error');
      alert(`❌ Failed to approve: ${data.error}`);
    }
  }

  return (
    <button
      onClick={handleApprove}
      className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
      disabled={status === 'loading'}
    >
      {status === 'loading' ? 'Approving...' : 'Approve Article'}
    </button>
  );
}
