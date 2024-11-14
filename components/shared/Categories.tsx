'use client';

import React from 'react';
// cn
import { cn } from '@/lib/utils';
// next
import Link from 'next/link';
// zustand store
import { useCategoryStore } from '@/store/category';

interface CategoriesProps {
  className?: string;
}

const categories = [
  { id: 1, name: 'Пиццы' },
  { id: 2, name: 'Комбо' },
  { id: 3, name: 'Закуски' },
  { id: 4, name: 'Коктейли' },
  { id: 5, name: 'Кофе' },
  { id: 6, name: 'Напитки' },
  { id: 7, name: 'Десерты' },
];

export const Categories: React.FC<CategoriesProps> = () => {
  const categoryActiveId = useCategoryStore((state) => state.activeId);

  return (
    <div className={cn('inline-flex gap-1 bg-gray-50 p-1 rounded-2xl')}>
      {categories.map(({ id, name }, index) => (
        <Link
          key={index}
          href={`/#${name}`}
          className={cn(
            'flex items-center font-bold h-11 rounded-2xl px-5',
            categoryActiveId === id &&
              'bg-white shadow-md shadow-gray-200 text-primary'
          )}
        >
          <button>{name}</button>
        </Link>
      ))}
    </div>
  );
};
