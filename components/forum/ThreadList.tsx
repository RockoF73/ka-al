import Link from 'next/link';
import { formatDistanceToNow } from 'date-fns';
import { MessageSquare, Lock, Pin, Eye } from 'lucide-react';

interface Thread {
  id: string;
  title: string;
  slug: string;
  isLocked: boolean;
  isPinned: boolean;
  views: number;
  lastPostAt: Date;
  author: {
    id: string;
    username: string;
    avatar: string | null;
  };
  _count: {
    posts: number;
  };
}

interface ThreadListProps {
  threads: Thread[];
}

export function ThreadList({ threads }: ThreadListProps) {
  return (
    <div className="space-y-2">
      {threads.map((thread) => (
        <div
          key={thread.id}
          className={`bg-space-light/50 backdrop-blur-sm rounded-lg border ${
            thread.isPinned
              ? 'border-space-warning/40 bg-space-warning/5'
              : 'border-space-accent/20'
          } p-4 hover:border-space-accent/40 transition-all`}
        >
          <div className="flex items-start justify-between">
            <div className="flex-1 min-w-0">
              <div className="flex items-center space-x-2 mb-2">
                {thread.isPinned && (
                  <Pin className="w-4 h-4 text-space-warning" />
                )}
                {thread.isLocked && (
                  <Lock className="w-4 h-4 text-gray-500" />
                )}
                <Link
                  href={`/thread/${thread.slug}`}
                  className="text-lg font-semibold text-space-accent hover:text-space-accentDark transition-colors truncate"
                >
                  {thread.title}
                </Link>
              </div>
              <div className="flex items-center space-x-4 text-sm text-gray-400">
                <span>by {thread.author.username}</span>
                <span className="flex items-center space-x-1">
                  <MessageSquare className="w-4 h-4" />
                  <span>{thread._count.posts}</span>
                </span>
                <span className="flex items-center space-x-1">
                  <Eye className="w-4 h-4" />
                  <span>{thread.views}</span>
                </span>
              </div>
            </div>
            <div className="ml-4 text-right text-sm text-gray-400">
              {formatDistanceToNow(new Date(thread.lastPostAt), {
                addSuffix: true,
              })}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

