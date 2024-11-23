'use client';

import React, { useEffect, useState } from 'react';
// components
import { Title, RangeSlider, CheckboxFiltersGroup } from './';
// ui
import { Input } from '../ui/input';
// custom hooks
import { useFilterIngredients } from '@/hooks/useFilterIngredients';
// react-use
import { useSet } from 'react-use';

interface FiltersProps {
  className?: string;
}

interface PriceProps {
  priceFrom: number;
  priceTo: number;
}

export const Filters: React.FC<FiltersProps> = ({ className }) => {
  const { ingredients, loading, handleAddId, selectedIngredients } =
    useFilterIngredients();

  const [pizzaSizes, { toggle: togglePizzaSizes }] = useSet(
    new Set<string>([])
  );
  const [pizzaTypes, { toggle: togglePizzaTypes }] = useSet(
    new Set<string>([])
  );

  const [prices, setPrices] = useState<PriceProps>({
    priceFrom: 0,
    priceTo: 1000,
  });

  const items = ingredients.map((ingredient) => ({
    value: String(ingredient.id),
    text: ingredient.name,
  }));

  const handleSetPrice = (name: keyof PriceProps, value: number) => {
    setPrices({
      ...prices,
      [name]: value,
    });
  };

  useEffect(() => {
    console.log({ prices, pizzaSizes, pizzaTypes, selectedIngredients });
  }, [prices, pizzaSizes, pizzaTypes, selectedIngredients]);

  return (
    <div className={className}>
      <Title text="Фильтрация" size="sm" className="mb-5 font-bold" />

      {/* Верхние чекбоксы */}
      <CheckboxFiltersGroup
        title="Тип теста"
        name="pizzaTypes"
        className="mb-5"
        onClickCheckbox={togglePizzaTypes}
        selectedValues={pizzaTypes}
        items={[
          { text: 'Тонкое', value: '1' },
          { text: 'Традиционное', value: '2' },
        ]}
      />

      <CheckboxFiltersGroup
        title="Размеры"
        name="pizzaSizes"
        className="mb-5"
        onClickCheckbox={togglePizzaSizes}
        selectedValues={pizzaSizes}
        items={[
          { text: '20 см', value: '20' },
          { text: '30 см', value: '30' },
          { text: '40 см', value: '40' },
        ]}
      />

      {/* Фильтр цен */}
      <div className="mt-5 border-y border-y-neutral-100 pt-6 pb-7">
        <p className="font-bold mb-3">Цена от и до:</p>
        <div className="flex gap-3 mb-5">
          <Input
            type="number"
            placeholder="0"
            min={0}
            max={1000}
            value={String(prices.priceFrom)}
            onChange={(e) =>
              handleSetPrice('priceFrom', Number(e.target.value))
            }
          />
          <Input
            type="number"
            placeholder="1000"
            min={100}
            max={1000}
            value={String(prices.priceTo)}
            onChange={(e) => handleSetPrice('priceTo', Number(e.target.value))}
          />
        </div>

        {/* Ползунок */}
        <RangeSlider
          min={0}
          max={1000}
          step={10}
          value={[prices.priceFrom, prices.priceTo]}
          onValueChange={([priceFrom, priceTo]) =>
            setPrices({ priceFrom, priceTo })
          }
        />
      </div>

      {/* Нижние чекбоксы */}
      <CheckboxFiltersGroup
        title="Ингредиенты"
        name="ingredients"
        className="mt-5"
        limit={6}
        defaultItems={items.slice(0, 6)}
        items={items}
        loading={loading}
        onClickCheckbox={handleAddId}
        selectedValues={selectedIngredients}
      />
    </div>
  );
};
