import { NextResponse } from 'next/server';
import { requireAuth } from '@/lib/auth';
import { threadSchema } from '@/lib/validations';
import { createThread } from '@/lib/db/thread';

export async function POST(request: Request) {
  try {
    const user = await requireAuth();
    const body = await request.json();
    const validated = threadSchema.parse(body);

    const thread = await createThread({
      ...validated,
      authorId: user.id,
    });

    return NextResponse.json({ thread }, { status: 201 });
  } catch (error: any) {
    if (error.errors) {
      return NextResponse.json(
        { error: error.errors[0].message },
        { status: 400 }
      );
    }

    console.error('Thread creation error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

