import { NextResponse } from 'next/server';
import { signUpSchema } from '@/lib/validations';
import { createUser, getUserByEmail, getUserByUsername } from '@/lib/db/user';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const validated = signUpSchema.parse(body);

    // Check if user already exists
    const [existingEmail, existingUsername] = await Promise.all([
      getUserByEmail(validated.email),
      getUserByUsername(validated.username),
    ]);

    if (existingEmail) {
      return NextResponse.json(
        { error: 'Email already registered' },
        { status: 400 }
      );
    }

    if (existingUsername) {
      return NextResponse.json(
        { error: 'Username already taken' },
        { status: 400 }
      );
    }

    const user = await createUser(validated);

    return NextResponse.json(
      { message: 'Account created successfully', user },
      { status: 201 }
    );
  } catch (error: any) {
    if (error.errors) {
      return NextResponse.json(
        { error: error.errors[0].message },
        { status: 400 }
      );
    }

    console.error('Signup error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

