// components
import { Title, FilterOptions } from '.';

interface FiltersProps {
  className?: string;
}

export const Filters: React.FC<FiltersProps> = ({ className }) => {
  return (
    <div className={className}>
      {/* На экранах больше 768px показываем фильтрацию */}
      <div className="block mmd:hidden">
        <div className="bg-white p-5 rounded-md shadow-lg">
          <Title text="Фильтрация" size="sm" className="mb-5 font-bold" />
          <FilterOptions />
        </div>
      </div>
    </div>
  );
};
