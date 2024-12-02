import { useEffect, useState } from 'react';
// react-use
import { useSet } from 'react-use';
// constants
import { PizzaSize, PizzaType } from '../constants/pizza';
// types
import { ProductItem } from '@prisma/client';
import { Variant } from '../components/PizzaVariantsSelector';
// lib
import { getAvailablePizzaSizes } from '../lib';

interface ReturnProps {
  size: PizzaSize;
  type: PizzaType;
  selectedIngredients: Set<number>;
  availablePizzaSizes: Variant[];
  setSize: (size: PizzaSize) => void;
  setType: (size: PizzaType) => void;
  selectIngredient: (id: number) => void;
}

export const usePizzaOptions = (variants: ProductItem[]): ReturnProps => {
  const [size, setSize] = useState<PizzaSize>(20);
  const [type, setType] = useState<PizzaType>(1);

  const availablePizzaSizes = getAvailablePizzaSizes(type, variants);

  // Добавляет в коллекцию Set или убирает из неё id выбранных ингредиентов
  const [selectedIngredients, { toggle: selectIngredient }] = useSet(new Set<number>([]));

  // При смене типа пиццы находим первый доступный размер пиццы и делаем его активным
  useEffect(() => {
    const selectedAndAvailableSize = availablePizzaSizes?.find(
      (item) => Number(item.value) === size && !item.disabled
    );
    const availableSize = availablePizzaSizes?.find((item) => !item.disabled);

    // Если размер был выбран и он доступен, то выбираем его
    if (selectedAndAvailableSize) {
      setSize(Number(selectedAndAvailableSize?.value) as PizzaSize);
      // иначе выбираем первый доступный размер
    } else {
      setSize(Number(availableSize?.value) as PizzaSize);
    }
  }, [type]);

  return {
    size,
    type,
    setSize,
    setType,
    selectedIngredients,
    selectIngredient,
    availablePizzaSizes,
  };
};
