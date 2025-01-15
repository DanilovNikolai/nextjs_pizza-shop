// components
import { Categories, Container, FilterOptions, SortPopup } from '.';
// cn
import { cn } from '@/shared/lib/utils';
// prisma
import { Category } from '@prisma/client';
// lucide
import { Filter } from 'lucide-react';
// ui
import { Sheet, SheetContent, SheetDescription, SheetTitle, SheetTrigger } from './ui';

interface TopBarProps {
  categories: Category[];
  className?: string;
}

export const TopBar: React.FC<TopBarProps> = ({ categories, className }) => {
  return (
    <div className={cn('sticky top-0 bg-white py-5 shadow-lg shadow-black/5 z-10', className)}>
      <Container className="flex items-center justify-between gap-2">
        <Categories items={categories} />
        <div className="flex gap-2 justify-between">
          <SortPopup />

          {/* На экранах меньше 768px показываем триггер и шторку */}
          <Sheet>
            {/* Триггер шторки */}
            <SheetTrigger className="hidden mmd:block text-lg font-bold cursor-pointer">
              <div className="hidden mmd:flex mmd:gap-1 mmd:items-center mmd:rounded-xl mmd:py-2 mmd:px-5 mmd:bg-gray-50">
                <Filter height={16} width={16} className="mr-2" />
                <span className="text-[0.8rem]">Фильтры</span>
              </div>
            </SheetTrigger>

            {/* Содержимое шторки */}
            <SheetContent side="left" className="bg-white w-[70%] h-full">
              <SheetTitle className="hidden" />
              <SheetDescription className="hidden" />
              <FilterOptions />
            </SheetContent>
          </Sheet>
        </div>
      </Container>
    </div>
  );
};
