import { Ingredient, ProductItem } from '@prisma/client';
import { PizzaSize, PizzaType } from '../constants/pizza';

export const calcTotalPizzaPrice = (
  size: PizzaSize,
  type: PizzaType,
  variants: ProductItem[],
  ingredients: Ingredient[],
  selectedIngredients: Set<number>
) => {
  const pizzaPrice =
    variants.find((variant) => variant.pizzaType === type && variant.pizzaSize === size)?.price ||
    0;

  const totalIngredientsPrice = ingredients
    .filter((ingredient) => selectedIngredients.has(ingredient.id))
    .reduce((total, ingredient) => total + ingredient.price, 0);

  return pizzaPrice + totalIngredientsPrice;
};
