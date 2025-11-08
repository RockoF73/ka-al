import { redirect } from 'next/navigation';
import { requireAuth } from '@/lib/auth';
import { getCategories } from '@/lib/db/category';
import { ThreadForm } from '@/components/forum/ThreadForm';

interface PageProps {
  searchParams: Promise<{ category?: string }>;
}

export default async function NewThreadPage({ searchParams }: PageProps) {
  const user = await requireAuth();
  const { category } = await searchParams;
  const categories = await getCategories();

  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold glow-text mb-6">Create New Thread</h1>
      <ThreadForm categories={categories} defaultCategoryId={category} />
    </div>
  );
}

