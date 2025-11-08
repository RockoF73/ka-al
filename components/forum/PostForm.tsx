'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

interface PostFormProps {
  threadId: string;
  onSuccess?: () => void;
}

export function PostForm({ threadId, onSuccess }: PostFormProps) {
  const router = useRouter();
  const [content, setContent] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          content,
          threadId,
        }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Failed to create post');
      }

      setContent('');
      if (onSuccess) {
        onSuccess();
      } else {
        router.refresh();
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && (
        <div className="p-3 bg-space-danger/20 border border-space-danger rounded-lg text-space-danger text-sm">
          {error}
        </div>
      )}
      <div>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Write your reply..."
          rows={6}
          className="w-full px-4 py-3 bg-space-dark border border-space-accent/20 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-space-accent transition-colors resize-none"
          required
        />
      </div>
      <div className="flex justify-end">
        <button
          type="submit"
          disabled={isSubmitting || !content.trim()}
          className="px-6 py-2 bg-space-accent text-space-darker rounded-lg hover:bg-space-accentDark transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? 'Posting...' : 'Post Reply'}
        </button>
      </div>
    </form>
  );
}

