'use client';

// cn
import { cn } from '@/shared/lib/utils';
// next
import Link from 'next/link';
// zustand store
import { useCategoryStore } from '@/shared/store/category';
import { Category } from '@prisma/client';

interface CategoriesProps {
  items: Category[];
  className?: string;
}

export const Categories: React.FC<CategoriesProps> = ({ items, className }) => {
  const categoryActiveId = useCategoryStore((state) => state.activeId);

  return (
    <div className={cn('inline-flex gap-1 bg-gray-50 p-1 rounded-2xl', className)}>
      {items.map(({ id, name }, index) => (
        <Link
          key={index}
          href={`/#${name}`}
          className={cn(
            'flex items-center font-bold h-11 rounded-2xl px-5',
            categoryActiveId === id && 'bg-white shadow-md shadow-gray-200 text-primary'
          )}
        >
          <button>{name}</button>
        </Link>
      ))}
    </div>
  );
};
