// prisma types
import { Ingredient, ProductItem } from '@prisma/client';
// constants
import { mapPizzaType, PizzaSize, PizzaType } from '../constants/pizza';
// lib
import { calcTotalPizzaPrice } from '../lib';

export const getPizzaDetails = (
  size: PizzaSize,
  type: PizzaType,
  variants: ProductItem[],
  ingredients: Ingredient[],
  selectedIngredients: Set<number>
) => {
  const totalPizzaPrice = calcTotalPizzaPrice(
    size,
    type,
    variants,
    ingredients,
    selectedIngredients
  );

  const productDescription = `Диаметр ${size} см, ${mapPizzaType[type]} тесто`;

  return { totalPizzaPrice, productDescription };
};
