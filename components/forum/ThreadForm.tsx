'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { threadSchema } from '@/lib/validations';

interface Category {
  id: string;
  name: string;
  slug: string;
}

interface ThreadFormProps {
  categories: Category[];
  defaultCategoryId?: string;
}

export function ThreadForm({ categories, defaultCategoryId }: ThreadFormProps) {
  const router = useRouter();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [categoryId, setCategoryId] = useState(defaultCategoryId || '');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);

    try {
      const validated = threadSchema.parse({ title, content, categoryId });

      const response = await fetch('/api/threads', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(validated),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Failed to create thread');
      }

      const data = await response.json();
      router.push(`/thread/${data.thread.slug}`);
    } catch (err: any) {
      if (err.errors) {
        setError(err.errors[0].message);
      } else {
        setError(err.message || 'An error occurred');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <div className="p-3 bg-space-danger/20 border border-space-danger rounded-lg text-space-danger text-sm">
          {error}
        </div>
      )}
      <div>
        <label htmlFor="category" className="block text-sm font-medium mb-2">
          Category
        </label>
        <select
          id="category"
          value={categoryId}
          onChange={(e) => setCategoryId(e.target.value)}
          className="w-full px-4 py-3 bg-space-dark border border-space-accent/20 rounded-lg text-white focus:outline-none focus:border-space-accent transition-colors"
          required
        >
          <option value="">Select a category</option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label htmlFor="title" className="block text-sm font-medium mb-2">
          Thread Title
        </label>
        <input
          id="title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full px-4 py-3 bg-space-dark border border-space-accent/20 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-space-accent transition-colors"
          placeholder="Enter thread title..."
          required
        />
      </div>
      <div>
        <label htmlFor="content" className="block text-sm font-medium mb-2">
          Content
        </label>
        <textarea
          id="content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows={12}
          className="w-full px-4 py-3 bg-space-dark border border-space-accent/20 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-space-accent transition-colors resize-none"
          placeholder="Write your thread content..."
          required
        />
      </div>
      <div className="flex justify-end space-x-4">
        <button
          type="button"
          onClick={() => router.back()}
          className="px-6 py-2 bg-space-light text-gray-300 rounded-lg hover:bg-space-dark transition-colors"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={isSubmitting || !title.trim() || !content.trim() || !categoryId}
          className="px-6 py-2 bg-space-accent text-space-darker rounded-lg hover:bg-space-accentDark transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? 'Creating...' : 'Create Thread'}
        </button>
      </div>
    </form>
  );
}

