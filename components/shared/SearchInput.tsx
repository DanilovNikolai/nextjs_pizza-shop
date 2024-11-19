'use client';

import React, { useRef, useState } from 'react';
// cn
import { cn } from '@/lib/utils';
// lucide
import { Search } from 'lucide-react';
// shadcn
import { Input } from '../ui';
// react-use
import { useClickAway } from 'react-use';
// next
import Link from 'next/link';

interface Props {
  className?: string;
}

export const SearchInput: React.FC<Props> = ({ className }) => {
  const [isFocused, setIsFocused] = useState(false);
  const searchInputRef = useRef(null);

  useClickAway(searchInputRef, () => {
    setIsFocused(false);
  });

  return (
    <>
      {isFocused && (
        <div className="fixed top-0 left-0 bottom-0 right-0 bg-black/50 z-30"></div>
      )}

      <div
        ref={searchInputRef}
        className={cn(
          'flex rounded-2xl flex-1 justify-between relative h-11 z-30',
          className
        )}
      >
        <Search className="absolute top-1/2 translate-y-[-50%] left-3 h-5 text-gray-400" />
        <Input
          className="rounded-2xl outline-none w-full bg-gray-100 pl-11"
          type="text"
          placeholder="Найти товар..."
          onFocus={() => setIsFocused(true)}
        />

        <div
          className={cn(
            'absolute w-full bg-white rounded-xl py-2 top-14 shadow-md transition-all duration-200 invisible opacity-0 z-30',
            isFocused && 'visible opacity-100 top-12'
          )}
        >
          <Link
            className="flex gap-3 items-center px-3 py-2 hover:bg-primary/10"
            href="/product/1"
          >
            <img
              className="rounded-sm h-8 w-8"
              src="https://media.dodostatic.net/image/r:233x233/11EE7D61304FAF5A98A6958F2BB2D260.webp"
              alt="Пицца1"
            />
            <span>Пицца 1</span>
          </Link>
        </div>
      </div>
    </>
  );
};
