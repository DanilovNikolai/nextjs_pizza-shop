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
    <div className="flex gap-2 overflow-x-auto scrollbar-hide sm:flex-nowrap">
      <div className={cn('inline-flex gap-1 bg-gray-50 p-1 rounded-2xl', className)}>
        {items.map(({ id, name }, index) => (
          <Link
            key={index}
            href={`/#${name}`}
            className={cn(
              'flex items-center font-bold rounded-xl py-2 px-5 mmd:px-3',
              categoryActiveId === id && 'bg-white shadow-md shadow-gray-200 text-primary'
            )}
          >
            <button className='mmd:text-[0.8em]'>{name}</button>
          </Link>
        ))}
      </div>
    </div>
  );
};
