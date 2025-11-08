import { formatDistanceToNow } from 'date-fns';
import { Edit2, Trash2 } from 'lucide-react';
import { getCurrentUser } from '@/lib/auth';
import { PostActions } from './PostActions';

interface Post {
  id: string;
  content: string;
  isEdited: boolean;
  createdAt: Date;
  updatedAt: Date;
  author: {
    id: string;
    username: string;
    avatar: string | null;
    reputation: number;
    role: string;
    createdAt: Date;
  };
}

interface PostListProps {
  posts: Post[];
  threadId: string;
}

export async function PostList({ posts, threadId }: PostListProps) {
  const user = await getCurrentUser();

  return (
    <div className="space-y-4">
      {posts.map((post, index) => (
        <div
          key={post.id}
          className="bg-space-light/50 backdrop-blur-sm rounded-lg border border-space-accent/20 p-6"
        >
          <div className="flex items-start space-x-4">
            <div className="flex-shrink-0">
              <div className="w-12 h-12 bg-space-accent rounded-full flex items-center justify-center">
                <span className="text-space-darker font-bold">
                  {post.author.username[0].toUpperCase()}
                </span>
              </div>
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-2">
                  <span className="font-semibold text-space-accent">
                    {post.author.username}
                  </span>
                  {post.author.role !== 'MEMBER' && (
                    <span className="px-2 py-0.5 text-xs bg-space-warning/20 text-space-warning rounded">
                      {post.author.role}
                    </span>
                  )}
                  <span className="text-sm text-gray-400">
                    Rep: {post.author.reputation}
                  </span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-gray-400">
                  {post.isEdited && (
                    <span className="text-xs">(edited)</span>
                  )}
                  <span>
                    {formatDistanceToNow(new Date(post.createdAt), {
                      addSuffix: true,
                    })}
                  </span>
                  {user && (user.id === post.author.id || user.role === 'ADMIN' || user.role === 'MODERATOR') && (
                    <PostActions postId={post.id} authorId={post.author.id} />
                  )}
                </div>
              </div>
              <div className="prose prose-invert max-w-none">
                <p className="whitespace-pre-wrap text-gray-200">
                  {post.content}
                </p>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

