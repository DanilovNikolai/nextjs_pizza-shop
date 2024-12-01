'use client';

import { useState } from 'react';
// cn
import { cn } from '@/shared/lib/utils';
// components
import { PizzaVariantsSelector, PizzaImage, Title, IngredientItem } from '.';
// shadcn ui
import { Button } from './ui';
// consts
import { pizzaSizes, PizzaSize, PizzaType, pizzaTypes } from '../constants/pizza';
// prisma types
import { Ingredient } from '@prisma/client';
// react-use
import { useSet } from 'react-use';

interface ChoosePizzaFormProps {
  imageUrl: string;
  name: string;
  ingredients: Ingredient[];
  variants?: any[];
  onClickAddCart?: VoidFunction;
  className?: string;
}

export const ChoosePizzaForm: React.FC<ChoosePizzaFormProps> = ({
  imageUrl,
  name,
  ingredients,
  variants,
  onClickAddCart,
  className,
}) => {
  const [size, setSize] = useState<PizzaSize>(20);
  const [type, setType] = useState<PizzaType>(1);

  const [selectedIngredients, { toggle: selectIngredient }] = useSet(new Set<number>([]));

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

        <div className="flex flex-col gap-2 mt-5">
          <PizzaVariantsSelector
            variants={pizzaSizes}
            value={String(size)}
            onClick={(value) => setSize(Number(value) as PizzaSize)}
          />

          <PizzaVariantsSelector
            variants={pizzaTypes}
            value={String(type)}
            onClick={(value) => setType(Number(value) as PizzaType)}
          />
        </div>

        <div className="bg-gray-50 p-4 mt-2 rounded-md h-[420px] overflow-auto scrollbar">
          <div className="grid grid-cols-3 gap-3 ">
            {ingredients.map((ingredient) => (
              <IngredientItem
                key={ingredient.id}
                name={ingredient.name}
                price={ingredient.price}
                imageUrl={ingredient.imageUrl}
                onClick={() => selectIngredient(ingredient.id)}
                active={selectedIngredients.has(ingredient.id)}
              />
            ))}
          </div>
        </div>

        <Button className="h-[55px] px-10 text-base rounded-[18px] w-full mt-10">
          Добавить в корзину за {totalPrice} ₽
        </Button>
      </div>
    </div>
  );
};
