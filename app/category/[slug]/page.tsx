import { notFound } from 'next/navigation';
import { getCategoryBySlug } from '@/lib/db/category';
import { getThreadsByCategory } from '@/lib/db/thread';
import { ThreadList } from '@/components/forum/ThreadList';
import Link from 'next/link';

interface PageProps {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ page?: string }>;
}

export default async function CategoryPage({ params, searchParams }: PageProps) {
  const { slug } = await params;
  const { page = '1' } = await searchParams;
  const pageNum = parseInt(page, 10) || 1;

  const category = await getCategoryBySlug(slug);
  if (!category) {
    notFound();
  }

  const { threads, pagination } = await getThreadsByCategory(
    category.id,
    pageNum
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold glow-text mb-2">{category.name}</h1>
          {category.description && (
            <p className="text-gray-400">{category.description}</p>
          )}
        </div>
        <Link
          href={`/threads/new?category=${category.id}`}
          className="px-4 py-2 bg-space-accent text-space-darker rounded-lg hover:bg-space-accentDark transition-colors font-medium"
        >
          New Thread
        </Link>
      </div>

      <ThreadList threads={threads} />

      {pagination.totalPages > 1 && (
        <div className="flex justify-center space-x-2">
          {Array.from({ length: pagination.totalPages }, (_, i) => i + 1).map(
            (page) => (
              <Link
                key={page}
                href={`/category/${slug}?page=${page}`}
                className={`px-4 py-2 rounded-lg ${
                  page === pageNum
                    ? 'bg-space-accent text-space-darker'
                    : 'bg-space-light text-gray-300 hover:bg-space-accent/20'
                } transition-colors`}
              >
                {page}
              </Link>
            )
          )}
        </div>
      )}
    </div>
  );
}

