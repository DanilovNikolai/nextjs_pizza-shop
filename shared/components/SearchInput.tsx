'use client';

import React, { useRef, useState } from 'react';
// cn
import { cn } from '@/shared/lib/utils';
// lucide
import { Search } from 'lucide-react';
// shadcn
import { Input } from './ui';
// react-use
import { useClickAway, useDebounce } from 'react-use';
// next
import Link from 'next/link';
// api
import { Api } from '@/shared/services/api-client';
// types
import { Product } from '@prisma/client';

interface Props {
  className?: string;
}

export const SearchInput: React.FC<Props> = ({ className }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);
  const searchInputRef = useRef(null);

  // ф-ция проверяет клик вне выбранного элемента
  useClickAway(searchInputRef, () => {
    setIsFocused(false);
  });

  useDebounce(
    async () => {
      try {
        const response = await Api.products.search(searchQuery); // '/api/products/search?query={searchQuery}'
        setProducts(response);
      } catch (error) {
        console.log(error);
      }
    },
    300,
    [searchQuery]
  );

  const handleClickItem = () => {
    setIsFocused(false);
    setSearchQuery('');
    setProducts([]);
  };

  return (
    <>
      {isFocused && <div className="fixed top-0 left-0 bottom-0 right-0 bg-black/50 z-30"></div>}

      <div
        ref={searchInputRef}
        className={cn('flex rounded-2xl flex-1 justify-between relative h-11 z-30', className)}
      >
        <Search className="absolute top-1/2 translate-y-[-50%] left-3 h-5 text-gray-400" />
        <Input
          className="rounded-2xl outline-none w-full bg-gray-100 pl-11"
          type="text"
          placeholder="Найти товар..."
          onFocus={() => setIsFocused(true)}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />

        {products.length > 0 && (
          <div
            className={cn(
              'absolute w-full bg-white rounded-xl py-2 top-14 shadow-md transition-all duration-200 invisible opacity-0 z-30',
              isFocused && 'visible opacity-100 top-12'
            )}
          >
            {products.map((product) => (
              <Link
                key={product.id}
                className="flex gap-3 items-center px-3 py-2 hover:bg-primary/10"
                href={`/product/${product.id}`}
                onClick={handleClickItem}
              >
                <img className="rounded-sm h-8 w-8" src={product.imageUrl} alt={product.name} />
                <span>{product.name}</span>
              </Link>
            ))}
          </div>
        )}
      </div>
    </>
  );
};
