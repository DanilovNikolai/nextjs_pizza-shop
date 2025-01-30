'use client';

// cn
import { cn } from '@/shared/lib/utils';
// zustand store
import { useCategoryStore } from '@/shared/store/category';
// types
import { TCategory } from './TopBar';

interface CategoriesProps {
  items: TCategory[];
  className?: string;
}

export const Categories: React.FC<CategoriesProps> = ({ items, className }) => {
  const { activeId, setActiveId } = useCategoryStore();

  const handleCategoryClick = (
    id: number,
    name: string,
    disabled: boolean,
    event: React.MouseEvent
  ) => {
    if (disabled) return; // Не даем кликать на disabled категории

    event.preventDefault();
    setActiveId(id);

    const section = document.getElementById(name);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <nav className={cn('inline-flex gap-1 bg-gray-50 p-1 rounded-2xl', className)}>
      {items.map(({ id, name, disabled }) => (
        <button
          key={id}
          onClick={(event) => handleCategoryClick(id, name, disabled, event)}
          className={cn(
            'flex items-center font-bold rounded-xl py-2 px-5 mmd:px-3 mmd:text-[0.8em]',
            activeId === id && 'bg-white shadow-md shadow-gray-200 text-primary',
            disabled && 'opacity-30 cursor-not-allowed' // Стили для отключенных категорий
          )}
          disabled={disabled} // Добавляем `disabled`
        >
          {name}
        </button>
      ))}
    </nav>
  );
};
