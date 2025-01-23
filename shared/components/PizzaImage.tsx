'use client';

// cn
import { cn } from '@/shared/lib/utils';
// react-responsive lib
import { useMediaQuery } from 'react-responsive';

interface PizzaImageProps {
  imageUrl: string;
  size: 20 | 30 | 40;
  className?: string;
}

export const PizzaImage: React.FC<PizzaImageProps> = ({ imageUrl, size, className }) => {
  const isSmallLaptopScreen = useMediaQuery({ query: '(max-width: 1024px)' });

  // Размеры изображения для каждого `size` на разных экранах
  const sizes = {
    20: isSmallLaptopScreen ? 150 : 300,
    30: isSmallLaptopScreen ? 200 : 400,
    40: isSmallLaptopScreen ? 250 : 500,
  };

  // Размеры границ
  const borderSizes = {
    medium: isSmallLaptopScreen ? sizes[30] - 25 : sizes[30] - 35, // Граница соответствует среднему размеру
    large: isSmallLaptopScreen ? sizes[40] - 25 : sizes[40] - 35, // Граница соответствует большому размеру
  };

  return (
    <div className={cn('flex items-center justify-center flex-1 relative w-full', className)}>
      {/* Изображение пиццы */}
      <img
        src={imageUrl}
        alt="Pizza"
        className={cn('relative left-3 top-2 transition-all z-10 duration-300', {
          'left-[4px] top-[2px]': isSmallLaptopScreen,
        })}
        style={{
          width: `${sizes[size]}px`,
          height: `${sizes[size]}px`,
        }}
      />

      {/* Средняя граница */}
      <div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 border-dashed border-2 rounded-full border-gray-200"
        style={{
          width: `${borderSizes.medium}px`,
          height: `${borderSizes.medium}px`,
        }}
      ></div>

      {/* Большая граница */}
      <div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 border-dotted border-2 rounded-full border-gray-200"
        style={{
          width: `${borderSizes.large}px`,
          height: `${borderSizes.large}px`,
        }}
      ></div>
    </div>
  );
};
