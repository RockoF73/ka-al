import { NextResponse } from 'next/server';
import { requireAuth } from '@/lib/auth';
import { deletePost } from '@/lib/db/post';

interface RouteContext {
  params: Promise<{ id: string }>;
}

export async function DELETE(request: Request, context: RouteContext) {
  try {
    const user = await requireAuth();
    const { id } = await context.params;

    await deletePost(id, user.id, user.role || 'MEMBER');

    return NextResponse.json({ message: 'Post deleted' }, { status: 200 });
  } catch (error) {
    console.error('Post deletion error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

