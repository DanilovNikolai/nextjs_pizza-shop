'use client';

import React from 'react';
// components
import { Title, FilterCheckbox, RangeSlider, CheckboxFiltersGroup } from './';
// ui
import { Input } from '../ui/input';
// custom hooks
import { useFilterIngredients } from '@/hooks/useFilterIngredients';

interface FiltersProps {
  className?: string;
}

export const Filters: React.FC<FiltersProps> = ({ className }) => {
  const { ingredients, loading, handleAddId, selectedIds } =
    useFilterIngredients();

  const items = ingredients.map((ingredient) => ({
    value: String(ingredient.id),
    text: ingredient.name,
  }));

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
            defaultValue={0}
          />
          <Input type="number" placeholder="1000" min={100} max={1000} />
        </div>

        {/* Ползунок */}
        <RangeSlider min={0} max={1000} step={10} value={[0, 1000]} />
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
