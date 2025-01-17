'use client';

// cn
import { cn } from '@/shared/lib/utils';

interface Props {
  className?: string;
}

export const CheckoutItemSkeleton: React.FC<Props> = ({ className }) => {
  return (
    <div
      className={cn(
        'flex items-center justify-between py-4 border-b border-gray-300 last:border-b-0 mmd:py-2 mmd:flex-col mmd:items-start mmd:gap-2 mmd:w-full',
        className
      )}
    >
      <div className="flex items-center gap-5 flex-1 mmd:w-full mmd:gap-3">
        {/* Скелетон для изображения */}
        <div className="w-16 h-16 bg-gray-200 rounded-full animate-pulse mmd:w-14 mmd:h-14" />
        {/* Скелетон для имени и деталей */}
        <div className="flex flex-col gap-2 flex-1 mmd:w-full">
          <div className="h-5 bg-gray-200 rounded animate-pulse w-3/4 mmd:w-full" />
          <div className="h-4 bg-gray-200 rounded animate-pulse w-1/2 mmd:w-3/4" />
        </div>
      </div>

      <div className="flex items-center gap-5 ml-10 mmd:ml-0 mmd:w-full mmd:justify-between">
        <div className="h-5 w-10 bg-gray-200 rounded animate-pulse mmd:w-[20%] mmd:h-4" />
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 bg-gray-200 rounded animate-pulse mmd:hidden" />
          <div className="h-8 w-8 bg-gray-200 rounded animate-pulse mmd:hidden" />
        </div>
        <div className="h-5 w-5 bg-gray-200 rounded animate-pulse mmd:w-10 mmd:h-4" />
      </div>
    </div>
  );
};
