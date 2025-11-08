import Link from 'next/link';
import { formatDistanceToNow } from 'date-fns';
import { MessageSquare, Lock, Pin } from 'lucide-react';

interface Category {
  id: string;
  name: string;
  description: string | null;
  slug: string;
  threads: Array<{
    id: string;
    title: string;
    slug: string;
    lastPostAt: Date;
    author: {
      id: string;
      username: string;
    };
    _count: {
      posts: number;
    };
  }>;
  _count: {
    threads: number;
  };
}

interface CategoryListProps {
  categories: Category[];
}

export function CategoryList({ categories }: CategoryListProps) {
  return (
    <div className="space-y-4">
      {categories.map((category) => (
        <div
          key={category.id}
          className="bg-space-light/50 backdrop-blur-sm rounded-lg border border-space-accent/20 p-6 hover:border-space-accent/40 transition-all glow-border"
        >
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center space-x-3 mb-2">
                <Link
                  href={`/category/${category.slug}`}
                  className="text-2xl font-bold text-space-accent hover:text-space-accentDark transition-colors"
                >
                  {category.name}
                </Link>
              </div>
              {category.description && (
                <p className="text-gray-400 mb-4">{category.description}</p>
              )}
              <div className="flex items-center space-x-4 text-sm text-gray-400">
                <span>{category._count.threads} threads</span>
              </div>
            </div>

            {category.threads.length > 0 && (
              <div className="ml-6 text-right min-w-[200px]">
                <Link
                  href={`/thread/${category.threads[0].slug}`}
                  className="block text-space-accent hover:text-space-accentDark transition-colors font-medium mb-1 truncate"
                >
                  {category.threads[0].title}
                </Link>
                <div className="text-xs text-gray-400">
                  by {category.threads[0].author.username} •{' '}
                  {formatDistanceToNow(new Date(category.threads[0].lastPostAt), {
                    addSuffix: true,
                  })}
                </div>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

