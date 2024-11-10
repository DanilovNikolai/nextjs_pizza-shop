import { cn } from '@/lib/utils';
import Link from 'next/link';
import React from 'react';

interface Props {
  className?: string;
}

const categories = [
  'Пиццы',
  'Комбо',
  'Закуски',
  'Коктейли',
  'Кофе',
  'Напитки',
  'Десерты',
];

const activeIndex = 0;

export const Categories: React.FC<Props> = () => {
  return (
    <div className={cn('inline-flex gap-1 bg-gray-50 p-1 rounded-2xl')}>
      {categories.map((category, index) => (
        <Link
          key={index}
          href={''}
          className={cn(
            'flex items-center font-bold h-11 rounded-2xl px-5',
            activeIndex === index &&
              'bg-white shadow-md shadow-gray-200 text-primary'
          )}
        >
          <button>{category}</button>
        </Link>
      ))}
    </div>
  );
};
