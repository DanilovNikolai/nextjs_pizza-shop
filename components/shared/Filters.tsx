'use client';

import React, { useState } from 'react';
// components
import { Title, FilterCheckbox, RangeSlider, CheckboxFiltersGroup } from './';
// ui
import { Input } from '../ui/input';
// custom hooks
import { useFilterIngredients } from '@/hooks/useFilterIngredients';

interface FiltersProps {
  className?: string;
}

interface PriceProps {
  priceFrom: number;
  priceTo: number;
}

export const Filters: React.FC<FiltersProps> = ({ className }) => {
  const { ingredients, loading, handleAddId, selectedIds } =
    useFilterIngredients();

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

  return (
    <div className={className}>
      <Title text="Фильтрация" size="sm" className="mb-5 font-bold" />

      {/* Верхние чекбоксы */}
      <div className="flex flex-col gap-4">
        <FilterCheckbox name="filters" text="Можно собирать" value="1" />
        <FilterCheckbox name="filters" text="Новинки" value="2" />
      </div>

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
        selectedIds={selectedIds}
      />
    </div>
  );
};
