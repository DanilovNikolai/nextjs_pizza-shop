import { Ingredient, ProductItem } from '@prisma/client';
import { PizzaSize, PizzaType } from '../constants/pizza';

/** Функция для расчета общей стоимости пиццы
 *
 * @param size - размер выбранной пиццы
 * @param type - тип теста выбранной пиццы
 * @param variants - все варианты выбранной пиццы
 * @param ingredients - все ингредиенты выбранной пиццы
 * @param selectedIngredients - выбранные ингредиенты для пиццы
 *
 * @return number общая стоимость пиццы
 */

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
