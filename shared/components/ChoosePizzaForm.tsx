'use client';

import { useState } from 'react';
// cn
import { cn } from '@/shared/lib/utils';
// components
import { PizzaVariantsSelector, PizzaImage, Title } from '.';
// shadcn ui
import { Button } from './ui';
// consts
import { pizzaSizes, PizzaSize, PizzaType } from '../constants/pizza';

interface ChoosePizzaFormProps {
  className?: string;
  imageUrl: string;
  name: string;
  ingredients: any[];
  variants?: any[];
  onClickAdd?: VoidFunction;
}

export const ChoosePizzaForm: React.FC<ChoosePizzaFormProps> = ({
  imageUrl,
  name,
  ingredients,
  variants,
  onClickAdd,
  className,
}) => {
  const [size, setSize] = useState<PizzaSize>(20);
  const [type, setType] = useState<PizzaType>(1);

  const productDescription = '30 см, традиционное тесто';
  const totalPrice = 350;

  return (
    <div className={cn('flex flex-1', className)}>
      <div className="flex items-center justify-center flex-1 relative w-full">
        <PizzaImage imageUrl={imageUrl} size={size} />
      </div>

      <div className="w-[490px] bg-[#F9F9F9] p-7">
        <Title text={name} size="md" className="font-extrabold mb-1" />
        <p className="text-gray-400">{productDescription}</p>

        {
          <PizzaVariantsSelector
            variants={pizzaSizes}
            value={String(size)}
            onClick={(value) => setSize(Number(value) as PizzaSize)}
          />
        }

        <Button className="h-[55px] px-10 text-base rounded-[18px] w-full mt-10">
          Добавить в корзину за {totalPrice} ₽
        </Button>
      </div>
    </div>
  );
};
