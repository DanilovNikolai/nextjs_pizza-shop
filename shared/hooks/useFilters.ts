'use client';

import { useMemo, useState } from 'react';
// next
import { useSearchParams } from 'next/navigation';
// react-use
import { useSet } from 'react-use';

interface PriceProps {
  priceFrom?: number;
  priceTo?: number;
}

interface QueryParamsFilters extends PriceProps {
  pizzaTypes: string;
  pizzaSizes: string;
  ingredients: string;
}

export interface Filters {
  pizzaTypes: Set<string>;
  pizzaSizes: Set<string>;
  selectedIngredients: Set<string>;
  prices: PriceProps;
}

interface ReturnProps extends Filters {
  setPrices: (name: keyof PriceProps, value: number) => void;
  setPizzaTypes: (value: string) => void;
  setPizzaSizes: (value: string) => void;
  setIngredients: (value: string) => void;
}

export const useFilters = (): ReturnProps => {
  const searchParams = useSearchParams() as unknown as Map<keyof QueryParamsFilters, string>;

  // Фильтр по цене
  const [prices, setPrices] = useState<PriceProps>({
    priceFrom: Number(searchParams.get('priceFrom')) || undefined,
    priceTo: Number(searchParams.get('priceTo')) || undefined,
  });

  // Обновляет фильтр по цене (либо 'priceFrom', либо 'priceTo')
  const updatePrice = (name: keyof PriceProps, value: number) => {
    setPrices((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Фильтр ингредиентов
  const [selectedIngredients, { toggle: toggleIngredients }] = useSet(
    new Set<string>(
      searchParams.has('ingredients') ? searchParams.get('ingredients')?.split(',') : []
    )
  );

  // Фильтр по размеру пиццы
  const [pizzaSizes, { toggle: togglePizzaSizes }] = useSet(
    new Set<string>(
      searchParams.has('pizzaSizes') ? searchParams.get('pizzaSizes')?.split(',') : []
    )
  );

  // Фильтр по типу пиццы
  const [pizzaTypes, { toggle: togglePizzaTypes }] = useSet(
    new Set<string>(
      searchParams.has('pizzaTypes') ? searchParams.get('pizzaTypes')?.split(',') : []
    )
  );

  const filters = {
    ...prices,
    pizzaTypes: Array.from(pizzaTypes),
    pizzaSizes: Array.from(pizzaSizes),
    ingredients: Array.from(selectedIngredients),
  };

  return useMemo(
    () => ({
      prices,
      selectedIngredients,
      pizzaSizes,
      pizzaTypes,
      setPrices: updatePrice,
      setPizzaTypes: togglePizzaTypes,
      setPizzaSizes: togglePizzaSizes,
      setIngredients: toggleIngredients,
    }),
    [prices, selectedIngredients, pizzaSizes, pizzaTypes]
  );
};
