// components
import { Categories, Container, FilterDrawer, SortPopup } from '.';
// cn
import { cn } from '@/shared/lib/utils';
// prisma
import { Category } from '@prisma/client';

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
          <FilterDrawer />
        </div>
      </Container>
    </div>
  );
};
