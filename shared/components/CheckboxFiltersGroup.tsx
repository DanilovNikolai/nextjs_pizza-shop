'use client';

import React, { useState } from 'react';
// components
import { FilterCheckbox, FilterCheckboxProps } from './FilterCheckbox';
// shadcn-ui
import { Input, Skeleton } from './ui';

type Item = FilterCheckboxProps;

interface Props {
  title: string;
  items: Item[];
  selectedValues: Set<string>;
  name?: string;
  limit?: number;
  loading?: boolean;
  defaultItems?: Item[];
  defaultValue?: string[];
  onClickCheckbox?: (id: string) => void;
  searchInputPlaceholder?: string;
  className?: string;
}

export const CheckboxFiltersGroup: React.FC<Props> = ({
  title,
  items,
  defaultItems,
  limit = 5,
  loading,
  searchInputPlaceholder = 'Поиск...',
  className,
  onClickCheckbox,
  selectedValues,
  name,
}) => {
  const [showAll, setShowAll] = useState(false);
  const [searchValue, setSearchValue] = useState('');

  const handleChangeSearchInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  if (loading) {
    return (
      <div className={className}>
        <p className="font-bold mb-3">{title}</p>

        {...Array(limit)
          .fill(0)
          .map((_, index) => <Skeleton key={index} className="h-6 mb-4 rounded-[8px] mt-3" />)}
        <Skeleton className="h-6 mb-4 w-[50%] rounded-[8px]" />
      </div>
    );
  }

  const list = showAll
    ? items.filter((item) => item.text.toLowerCase().includes(searchValue.toLowerCase()))
    : (defaultItems || items).slice(0, limit);

  return (
    <div className={className}>
      <p className="font-bold mb-3">{title}</p>

      {showAll && (
        <div className="mb-5">
          <Input
            onChange={handleChangeSearchInput}
            placeholder={searchInputPlaceholder}
            className="bg-gray-50 border-none"
          />
        </div>
      )}

      <div className="flex flex-col gap-4 max-h-96 pr-2 overflow-auto scrollbar">
        {list.map((item, index) => (
          <FilterCheckbox
            key={index}
            text={item.text}
            value={item.value}
            endAdornment={item.endAdornment}
            checked={selectedValues?.has(item.value)}
            onCheckedChange={() => onClickCheckbox?.(item.value)}
            name={name}
          />
        ))}
      </div>

      {items.length > limit && (
        <div className={showAll ? 'border-t border-t-neutral-100 mt-4' : ''}>
          <button onClick={() => setShowAll(!showAll)} className="text-primary mt-3">
            {showAll ? 'Скрыть' : '+ Показать всё'}
          </button>
        </div>
      )}
    </div>
  );
};
