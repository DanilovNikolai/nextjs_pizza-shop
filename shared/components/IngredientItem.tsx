'use client';

// lucide
import { CircleCheck } from 'lucide-react';
// cn
import { cn } from '../lib/utils';
// custom hooks
import { useIsSmallLaptopScreen } from '../hooks';

interface Props {
  imageUrl: string;
  name: string;
  price: number;
  active?: boolean;
  onClick?: () => void;
  className?: string;
}

export const IngredientItem: React.FC<Props> = ({
  imageUrl,
  name,
  price,
  active,
  onClick,
  className,
}) => {
  const isSmallLaptopScreen = useIsSmallLaptopScreen();

  return (
    <div
      className={cn(
        'flex items-center flex-col justify-between p-1 rounded-md w-32 text-center relative cursor-pointer shadow-md bg-white',
        { 'border border-primary': active },
        { 'w-28': isSmallLaptopScreen },
        className
      )}
      onClick={onClick}
    >
      {active && <CircleCheck className="absolute top-2 right-2 text-primary" />}
      <div className="flex flex-col items-center justify-center">
        <img
          width={110}
          height={110}
          src={imageUrl}
          className={cn({ 'w-[50px] h-[50px]': isSmallLaptopScreen })}
        />
        <span className="text-xs mb-1">{name}</span>
      </div>
      <div className="font-bold">{price} ₽</div>
    </div>
  );
};
