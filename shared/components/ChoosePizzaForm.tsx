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
import { usePizzaOptions, useIsSmallLaptopScreen } from '../hooks';
// lib
import { getPizzaDetails } from '../lib';

interface ChoosePizzaFormProps {
  imageUrl: string;
  name: string;
  ingredients: Ingredient[];
  variants: ProductItem[];
  description?: string | null;
  loading?: boolean;
  onSubmit: (itemId: number, ingrediets: number[]) => void;
  className?: string;
}

export const ChoosePizzaForm: React.FC<ChoosePizzaFormProps> = ({
  imageUrl,
  name,
  ingredients,
  variants,
  description,
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

  const isSmallLaptopScreen = useIsSmallLaptopScreen();

  // Функция кнопки добавления пиццы в корзину
  const handleClickAdd = () => {
    if (currentVariantId) {
      onSubmit(currentVariantId, Array.from(selectedIngredients));
    }
  };

  return (
    <div
      className={cn(
        'flex flex-1 w-full h-full mmd:flex-col mmd:items-center mmd:h-full',
        className
      )}
    >
      <div className="flex items-center justify-center flex-1 relative w-full mmd:hidden">
        <PizzaImage imageUrl={imageUrl} size={size} />
      </div>

      <div
        className={cn(
          'w-[50%] h-full bg-[#F9F9F9] rounded-2xl p-7 mmd:w-full mmd:p-4 mmd:rounded-none',
          { 'w-[60%]': isSmallLaptopScreen }
        )}
      >
        <Title text={name} size="md" className="font-extrabold mb-1" />
        <p>{productDescription}</p>
        <p className="text-gray-400 mt-3">{description}</p>

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
            'h-[420px] max-h-[280px] overflow-y-auto overflow-x-hidden bg-gray-50 p-4 mt-2 rounded-md mmd:p-2 mmd:max-h-[180px] mmd:overflow-x-auto mmd:overflow-y-hidden'
          )}
        >
          <div className={cn('grid grid-cols-3 gap-3 mmd:flex mmd:gap-3')}>
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
