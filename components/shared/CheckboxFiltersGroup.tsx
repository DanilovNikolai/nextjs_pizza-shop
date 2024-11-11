import React from 'react';

interface Props {
  className?: string;
  title: string;
  defaultItems?: Item[];
  items: Item[];
  limit?: number;
  searchInputPlaceholder?: string;
  onChange?: (values: string[]) => void;
  defaultValue?: string[];
}

export const CheckboxFiltersGroup: React.FC<Props> = ({ className }) => {
  return <div className={className}>CheckboxFiltersGroup</div>;
};
