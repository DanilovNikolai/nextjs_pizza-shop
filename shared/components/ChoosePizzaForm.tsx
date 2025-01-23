'use client';

// cn
import { cn } from '@/shared/lib/utils';
// components
import { PizzaVariantsSelector, PizzaImage, Title, IngredientItem } from '.';
// shadcn ui
import { Button } from './ui';
// consts
import { pizzaTypes, PizzaSize, PizzaType } from '../constants/pizza';
// prisma types
import { Ingredient, ProductItem } from '@prisma/client';
// custom hooks
import { usePizzaOptions } from '../hooks';
// lib
import { getPizzaDetails } from '../lib';
// react-responsive lib
import { useMediaQuery } from 'react-responsive';

interface ChoosePizzaFormProps {
  imageUrl: string;
  name: string;
  ingredients: Ingredient[];
  variants: ProductItem[];
  loading?: boolean;
  onSubmit: (itemId: number, ingrediets: number[]) => void;
  className?: string;
}

export const ChoosePizzaForm: React.FC<ChoosePizzaFormProps> = ({
  imageUrl,
  name,
  ingredients,
  variants,
  onSubmit,
  loading,
  className,
}) => {
  const {
    size,
    type,
    setSize,
    setType,
    selectedIngredients,
    selectIngredient,
    availablePizzaSizes,
    currentVariantId,
  } = usePizzaOptions(variants);

  const { totalPizzaPrice, productDescription } = getPizzaDetails(
    size,
    type,
    variants,
    ingredients,
    selectedIngredients
  );

  const isSmallLaptopScreen = useMediaQuery({ query: '(max-width: 1024px)' });

  // Функция кнопки добавления пиццы в корзину
  const handleClickAdd = () => {
    if (currentVariantId) {
      onSubmit(currentVariantId, Array.from(selectedIngredients));
    }
  };

  return (
    <div className={cn('flex flex-1 mmd:flex-col mmd:items-center', className)}>
      <div className="flex items-center justify-center flex-1 relative w-full mmd:hidden">
        <PizzaImage imageUrl={imageUrl} size={size} />
      </div>

      <div className={cn('w-[50%] bg-[#F9F9F9] p-7 mmd:w-full mmd:p-4')}>
        <Title text={name} size="md" className="font-extrabold mb-1" />
        <p className="text-gray-400">{productDescription}</p>

        <div className="flex flex-col gap-2 mt-5">
          <PizzaVariantsSelector
            variants={availablePizzaSizes}
            value={String(size)}
            onClick={(value) => setSize(Number(value) as PizzaSize)}
          />

          <PizzaVariantsSelector
            variants={pizzaTypes}
            value={String(type)}
            onClick={(value) => setType(Number(value) as PizzaType)}
          />
        </div>

        <div className="items-center justify-center flex-1 relative w-full hidden mmd:flex mmd:h-[260px]">
          <PizzaImage imageUrl={imageUrl} size={size} />
        </div>

        <div
          className={cn(
            'bg-gray-50 p-4 mt-2 rounded-md h-[420px] overflow-auto scrollbar mmd:p-2 mmd:h-full mmd:overflow-x-auto'
          )}
        >
          <div className={cn('grid grid-cols-3 gap-3 mmd:flex mmd:gap-3', {"grid-cols-2": isSmallLaptopScreen})}>
            {ingredients.map((ingredient) => (
              <IngredientItem
                key={ingredient.id}
                name={ingredient.name}
                price={ingredient.price}
                imageUrl={ingredient.imageUrl}
                onClick={() => selectIngredient(ingredient.id)}
                active={selectedIngredients.has(ingredient.id)}
                className={'mmd:flex-shrink-0'}
              />
            ))}
          </div>
        </div>

        <Button
          loading={loading}
          className="h-[55px] px-10 text-base rounded-[18px] w-full mt-10 mmd:mt-5 mmd:px-5 mmd:h-10"
          onClick={handleClickAdd}
        >
          Добавить в корзину за {totalPizzaPrice} ₽
        </Button>
      </div>
    </div>
  );
};
