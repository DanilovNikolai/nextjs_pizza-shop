import React from 'react';
import { cn } from '@/shared/lib/utils';
import { ArrowUpDown } from 'lucide-react';

interface SortPopupProps {
  className?: string;
}

export const SortPopup: React.FC<SortPopupProps> = ({ className }) => {
  return (
    <div
      className={cn(
        'inline-flex items-center gap-1 bg-gray-50 py-3 px-5 rounded-2xl cursor-pointer mmd:text-[0.8em]',
        className
      )}
    >
      <ArrowUpDown size={16} />
      <b>Сортировка:</b>
      <b className="text-primary">популярное</b>
    </div>
  );
};
