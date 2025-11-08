import { CategoryList } from '@/components/forum/CategoryList';
import { getCategories } from '@/lib/db/category';

export default async function HomePage() {
  const categories = await getCategories();

  return (
    <div className="space-y-8">
      <div className="text-center space-y-4">
        <h1 className="text-5xl font-bold glow-text">
          Kazinga Alliance
        </h1>
        <p className="text-xl text-gray-300">
          Survival Space Guild Forum
        </p>
        <div className="w-24 h-1 bg-space-accent mx-auto rounded-full"></div>
      </div>

      <CategoryList categories={categories} />
    </div>
  );
}

