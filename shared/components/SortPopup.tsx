'use client';

import { useState } from 'react';
import { cn } from '@/shared/lib/utils';
import { ArrowDown, ArrowDownZA, ArrowUp, ArrowUpAZ } from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from './ui';
import { useIsMobile } from '../hooks';

interface SortOption {
  type: 'по названию' | 'по цене';
  value: 'asc' | 'desc';
}

const sortOptions: SortOption[] = [
  { type: 'по названию', value: 'asc' },
  { type: 'по названию', value: 'desc' },
  { type: 'по цене', value: 'asc' },
  { type: 'по цене', value: 'desc' },
];

export const SortPopup: React.FC<{ className?: string }> = ({ className }) => {
  const [sortParams, setSortParams] = useState<SortOption>({
    type: 'по названию',
    value: 'asc',
  });

  const isMobile = useIsMobile();

  const handleSortChange = (option: SortOption) => {
    setSortParams(option);
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <button
          className={cn(
            'relative inline-flex items-center justify-center gap-1 bg-gray-50 py-3 px-5 rounded-2xl cursor-pointer mmd:text-[0.8em]'
          )}
        >
          <b>Сортировка:</b>
          <b className="text-primary flex gap-1 items-center">
            {sortParams.type}{' '}
            {sortParams.value === 'asc' ? <ArrowUp size={16} /> : <ArrowDown size={16} />}
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
                sortParams.type === option.type && sortParams.value === option.value
                  ? 'bg-gray-200 text-primary'
                  : ''
              )}
              onClick={() => handleSortChange(option)}
            >
              {option.type}{' '}
              {option.value === 'asc' ? <ArrowUpAZ size={16} /> : <ArrowDownZA size={16} />}
            </li>
          ))}
        </ul>
      </PopoverContent>
    </Popover>
  );
};
