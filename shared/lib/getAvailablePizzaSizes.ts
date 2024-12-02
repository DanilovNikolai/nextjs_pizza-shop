import { ProductItem } from '@prisma/client';
import { PizzaType, pizzaSizes } from '../constants/pizza';
// types
import { Variant } from '../components/PizzaVariantsSelector';

/** Функция для получения доступных размеров пиццы для выбора в селекторе
 *
 * @param type - тип теста пиццы
 * @param variants - варианты пиццы
 *
 * @returns доступные вараинты размеров пиццы
 */

export const getAvailablePizzaSizes = (type: PizzaType, variants: ProductItem[]): Variant[] => {
  const filteredPizzasByType = variants.filter((item) => item.pizzaType === type); // При выборе теста получаем все доступные пиццы с данным тестом

  /* Создаем новый массив вариантов пицц с новым свойством 'disabled'. Пробегаемся по всем доступным размерам.
  Если в массиве availablePizzas есть хотя бы одна пицца, у которой размер (pizzaSize) совпадает со значением текущего размера (variant.value), 
  то disabled будет false (размер доступен). */
  const availablePizzaSizes = pizzaSizes.map((variant) => ({
    name: variant.name,
    value: variant.value,
    disabled: !filteredPizzasByType.some(
      (pizza) => Number(pizza.pizzaSize) === Number(variant.value)
    ),
  }));

  return availablePizzaSizes;
};
