'use client';

import { useState } from 'react';
import { Edit2, Trash2 } from 'lucide-react';

interface PostActionsProps {
  postId: string;
  authorId: string;
}

export function PostActions({ postId, authorId }: PostActionsProps) {
  const [isEditing, setIsEditing] = useState(false);

  const handleDelete = async () => {
    if (!confirm('Are you sure you want to delete this post?')) {
      return;
    }

    try {
      const response = await fetch(`/api/posts/${postId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        window.location.reload();
      } else {
        alert('Failed to delete post');
      }
    } catch (error) {
      console.error('Error deleting post:', error);
      alert('An error occurred');
    }
  };

  return (
    <div className="flex items-center space-x-2">
      <button
        onClick={() => setIsEditing(true)}
        className="p-1 text-gray-400 hover:text-space-accent transition-colors"
        title="Edit post"
      >
        <Edit2 className="w-4 h-4" />
      </button>
      <button
        onClick={handleDelete}
        className="p-1 text-gray-400 hover:text-space-danger transition-colors"
        title="Delete post"
      >
        <Trash2 className="w-4 h-4" />
      </button>
    </div>
  );
}

