'use client';

import { useState } from 'react';
// cn
import { cn } from '@/shared/lib/utils';
// lucide icons
import { ArrowDown, ArrowDown10, ArrowDownZA, ArrowUp, ArrowUp01, ArrowUpAZ } from 'lucide-react';
// shadcn ui
import { Popover, PopoverContent, PopoverTrigger } from './ui';
// custom hooks
import { useIsMobile, useSortQueryParams } from '../hooks';
// components
import { Backdrop } from './';

export interface SortOption {
  sortBy: 'name' | 'price' | undefined;
  orderBy: 'asc' | 'desc' | undefined;
}

const sortOptions: SortOption[] = [
  { sortBy: 'name', orderBy: 'asc' },
  { sortBy: 'name', orderBy: 'desc' },
  { sortBy: 'price', orderBy: 'asc' },
  { sortBy: 'price', orderBy: 'desc' },
];

export const SortPopup: React.FC<{ className?: string }> = ({ className }) => {
  const [sortParams, setSortParams] = useState<SortOption>({
    sortBy: 'name',
    orderBy: 'asc',
  });
  const { updateSortParams } = useSortQueryParams();
  const [sortPopupOpen, setSortPopupOpen] = useState(false);

  const isMobile = useIsMobile();

  const handleSortChange = (option: SortOption) => {
    setSortParams(option);
    updateSortParams(option); // обновляем search params в url через qs
  };

  return (
    <>
      <Backdrop isVisible={sortPopupOpen} onClick={() => setSortPopupOpen(false)} zIndex={40} />

      <Popover>
        <PopoverTrigger asChild>
          <button
            className={cn(
              'relative inline-flex items-center justify-center gap-1 bg-gray-50 py-3 px-5 rounded-2xl cursor-pointer mmd:text-[0.8em] z-40'
            )}
            onClick={() => setSortPopupOpen(!sortPopupOpen)}
          >
            <b>Сортировка:</b>
            <b className="text-primary flex gap-1 items-center">
              {sortParams.sortBy === 'name' ? 'по названию' : 'по цене'}{' '}
              {sortParams.orderBy === 'asc' ? <ArrowUp size={16} /> : <ArrowDown size={16} />}
            </b>
          </button>
        </PopoverTrigger>

        <PopoverContent className="bg-gray-50 w-full p-0" align={isMobile ? 'start' : 'end'}>
          <ul className="text-gray-600">
            {sortOptions.map((option, index) => (
              <li
                key={index}
                className={cn(
                  'flex gap-2 justify-between items-center cursor-pointer first:rounded-t-2xl last:rounded-b-2xl py-1 px-4 w-full hover:bg-gray-200 transition',
                  sortParams.sortBy === option.sortBy && sortParams.orderBy === option.orderBy
                    ? 'bg-gray-200 text-primary'
                    : ''
                )}
                onClick={() => handleSortChange(option)}
              >
                {option.sortBy === 'name' ? 'по названию' : 'по цене'}{' '}
                {option.sortBy === 'name' && option.orderBy === 'asc' && <ArrowUpAZ size={16} />}
                {option.sortBy === 'name' && option.orderBy === 'desc' && <ArrowDownZA size={16} />}
                {option.sortBy === 'price' && option.orderBy === 'asc' && <ArrowUp01 size={16} />}
                {option.sortBy === 'price' && option.orderBy === 'desc' && (
                  <ArrowDown10 size={16} />
                )}
              </li>
            ))}
          </ul>
        </PopoverContent>
      </Popover>
    </>
  );
};
