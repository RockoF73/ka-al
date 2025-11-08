import { notFound } from 'next/navigation';
import { getThreadBySlug, incrementThreadViews } from '@/lib/db/thread';
import { getPostsByThread } from '@/lib/db/post';
import { PostList } from '@/components/forum/PostList';
import { PostForm } from '@/components/forum/PostForm';
import { getCurrentUser } from '@/lib/auth';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

interface PageProps {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ page?: string }>;
}

export default async function ThreadPage({ params, searchParams }: PageProps) {
  const { slug } = await params;
  const { page = '1' } = await searchParams;
  const pageNum = parseInt(page, 10) || 1;

  const thread = await getThreadBySlug(slug);
  if (!thread) {
    notFound();
  }

  // Increment views (fire and forget)
  incrementThreadViews(thread.id).catch(console.error);

  const { posts, pagination } = await getPostsByThread(thread.id, pageNum);
  const user = await getCurrentUser();

  return (
    <div className="space-y-6">
      <div>
        <Link
          href={`/category/${thread.category.slug}`}
          className="inline-flex items-center space-x-2 text-space-accent hover:text-space-accentDark transition-colors mb-4"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to {thread.category.name}</span>
        </Link>
        <h1 className="text-3xl font-bold glow-text mb-2">{thread.title}</h1>
        <div className="flex items-center space-x-4 text-sm text-gray-400">
          <span>by {thread.author.username}</span>
          <span>{thread._count.posts} posts</span>
          <span>{thread.views} views</span>
        </div>
      </div>

      <PostList posts={posts} threadId={thread.id} />

      {pagination.totalPages > 1 && (
        <div className="flex justify-center space-x-2">
          {Array.from({ length: pagination.totalPages }, (_, i) => i + 1).map(
            (page) => (
              <Link
                key={page}
                href={`/thread/${slug}?page=${page}`}
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

      {!thread.isLocked && user && (
        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-4">Post a Reply</h2>
          <PostForm threadId={thread.id} />
        </div>
      )}
      {!thread.isLocked && !user && (
        <div className="mt-8 p-4 bg-space-light/50 rounded-lg border border-space-accent/20 text-center">
          <p className="text-gray-400">
            Please{' '}
            <a href="/auth/signin" className="text-space-accent hover:underline">
              sign in
            </a>{' '}
            to post a reply.
          </p>
        </div>
      )}
    </div>
  );
}

