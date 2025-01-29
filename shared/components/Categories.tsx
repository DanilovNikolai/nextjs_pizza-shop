'use client';

// cn
import { cn } from '@/shared/lib/utils';
// zustand store
import { useCategoryStore } from '@/shared/store/category';
// types
import { Category } from '@prisma/client';

interface CategoriesProps {
  items: Category[];
  className?: string;
}

export const Categories: React.FC<CategoriesProps> = ({ items, className }) => {
  const { activeId, setActiveId } = useCategoryStore();

  const handleCategoryClick = (id: number, name: string, event: React.MouseEvent) => {
    event.preventDefault(); // Отключаем стандартный переход по `href`

    setActiveId(id); // Обновляем Zustand перед скроллом

    const section = document.getElementById(name);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="flex gap-2 overflow-x-auto scrollbar-hide sm:flex-nowrap">
      <nav className={cn('inline-flex gap-1 bg-gray-50 p-1 rounded-2xl', className)}>
        {items.map(({ id, name }) => (
          <button
            key={id}
            onClick={(event) => handleCategoryClick(id, name, event)}
            className={cn(
              'flex items-center font-bold rounded-xl py-2 px-5 mmd:px-3 mmd:text-[0.8em]',
              activeId === id && 'bg-white shadow-md shadow-gray-200 text-primary'
            )}
          >
            {name}
          </button>
        ))}
      </nav>
    </div>
  );
};
