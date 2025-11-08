import { auth } from '@/app/api/auth/[...nextauth]/route';
import { redirect } from 'next/navigation';

export async function getCurrentUser() {
  const session = await auth();
  return session?.user;
}

export async function requireAuth() {
  const user = await getCurrentUser();
  if (!user) {
    redirect('/auth/signin');
  }
  return user;
}

export async function requireRole(role: string) {
  const user = await requireAuth();
  if (user.role !== role && user.role !== 'ADMIN') {
    redirect('/');
  }
  return user;
}

