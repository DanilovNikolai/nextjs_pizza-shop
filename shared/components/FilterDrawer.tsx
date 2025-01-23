// lucide
import { Filter } from 'lucide-react';
// ui
import { Sheet, SheetContent, SheetDescription, SheetTitle, SheetTrigger } from './ui';
// components
import { FilterOptions } from './FilterOptions';

interface Props {
  className?: string;
}

export const FilterDrawer: React.FC<Props> = () => {
  return (
    <Sheet>
      {/* Триггер шторки */}
      <SheetTrigger className="hidden mmd:block text-lg font-bold cursor-pointer">
        <div className="hidden mmd:flex mmd:gap-1 mmd:items-center mmd:rounded-xl mmd:py-2 mmd:px-5 mmd:bg-gray-50">
          <Filter height={16} width={16} className="mr-2" />
          <span className="text-[0.8rem]">Фильтры</span>
        </div>
      </SheetTrigger>

      {/* Содержимое шторки */}
      <SheetContent side="left" className="bg-white w-[70%] h-full overflow-y-auto">
        <SheetTitle className="hidden" />
        <SheetDescription className="hidden" />
        <FilterOptions />
      </SheetContent>
    </Sheet>
  );
};
