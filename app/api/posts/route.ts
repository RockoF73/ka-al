import { NextResponse } from 'next/server';
import { requireAuth } from '@/lib/auth';
import { postSchema } from '@/lib/validations';
import { createPost } from '@/lib/db/post';

export async function POST(request: Request) {
  try {
    const user = await requireAuth();
    const body = await request.json();
    const validated = postSchema.parse(body);

    const post = await createPost({
      ...validated,
      authorId: user.id,
    });

    return NextResponse.json({ post }, { status: 201 });
  } catch (error: any) {
    if (error.errors) {
      return NextResponse.json(
        { error: error.errors[0].message },
        { status: 400 }
      );
    }

    console.error('Post creation error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

