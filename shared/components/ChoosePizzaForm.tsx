'use client';

import { useEffect, useState } from 'react';
// react-use
import { useSet } from 'react-use';
// cn
import { cn } from '@/shared/lib/utils';
// components
import { PizzaVariantsSelector, PizzaImage, Title, IngredientItem } from '.';
// shadcn ui
import { Button } from './ui';
// consts
import { pizzaSizes, pizzaTypes, PizzaSize, PizzaType, mapPizzaType } from '../constants/pizza';
// prisma types
import { Ingredient, ProductItem } from '@prisma/client';

interface ChoosePizzaFormProps {
  imageUrl: string;
  name: string;
  ingredients: Ingredient[];
  variants: ProductItem[];
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

  // Добавляет в коллекцию Set или убирает из неё id выбранных ингредиентов
  const [selectedIngredients, { toggle: selectIngredient }] = useSet(new Set<number>([]));

  const productDescription = `Диаметр ${size} см, ${mapPizzaType[type]} тесто`;

  const pizzaPrice =
    variants.find((variant) => variant.pizzaType === type && variant.pizzaSize === size)?.price ||
    0;

  const totalIngredientsPrice = ingredients
    .filter((ingredient) => selectedIngredients.has(ingredient.id))
    .reduce((total, ingredient) => total + ingredient.price, 0);

  const totalPrice = pizzaPrice + totalIngredientsPrice;

  // Функция кнопки добавления в корзину
  const handleClickAdd = () => {
    onClickAddCart?.();
    console.log({ size, type, selectedIngredients });
  };

  const availablePizzas = variants.filter((item) => item.pizzaType === type); // При выборе теста получаем все доступные размеры пицц

  /* Создаем новый массив вариантов пицц с новым свойством 'disabled'. Пробегаемся по всем доступным размерам.
  Если в массиве availablePizzas есть хотя бы одна пицца, у которой размер (pizzaSize) совпадает со значением текущего размера (variant.value), 
  то disabled будет false (размер доступен). */
  const availablePizzaSizes = pizzaSizes.map((variant) => ({
    name: variant.name,
    value: variant.value,
    disabled: !availablePizzas.some((pizza) => Number(pizza.pizzaSize) === Number(variant.value)),
  }));

  // При смене типа пиццы находим первый доступный размер пиццы и делаем его активным
  useEffect(() => {
    const availableSize = availablePizzaSizes?.find((item) => !item.disabled);

    if (availableSize) {
      setSize(Number(availableSize.value) as PizzaSize);
    }
  }, [type]);

  console.log({ variants, availablePizzas, availablePizzaSizes });

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

        <Button
          className="h-[55px] px-10 text-base rounded-[18px] w-full mt-10"
          onClick={handleClickAdd}
        >
          Добавить в корзину за {totalPrice} ₽
        </Button>
      </div>
    </div>
  );
};
