import React from 'react';
import { cn } from '@/shared/lib/utils';
// components
import { CartButton, Container, SearchInput } from '.';
// next
import Image from 'next/image';
import Link from 'next/link';
// ui
import { Button } from './ui';
// lucide
import { User } from 'lucide-react';

interface HeaderProps {
  hasSearch?: boolean;
  hasCartButton?: boolean;
  className?: string;
}

export const Header: React.FC<HeaderProps> = ({
  hasSearch = true,
  hasCartButton = true,
  className,
}) => {
  return (
    <header className={cn('border-b', className)}>
      <Container className="flex items-center justify-between py-8">
        {/* Левая часть */}
        <Link href="/">
          <div className="flex items-center gap-4">
            <Image src="/logo.png" alt="logo" width={35} height={35} />
            <div>
              <h1 className="text-2xl uppercase font-black">Next Pizza</h1>
              <p className="text-sm text-gray-400 leading-3">вкусней уже некуда</p>
            </div>
          </div>
        </Link>

        {/* Поиск */}
        {hasSearch && (
          <div className="mx-10 flex-1">
            <SearchInput />
          </div>
        )}

        {/* Правая часть */}
        <div className="flex items-center gap-3">
          <Button variant="outline" className="flex items-center gap-1">
            <User size={16} />
            Войти
          </Button>

          {hasCartButton && (
            <div>
              <CartButton />
            </div>
          )}
        </div>
      </Container>
    </header>
  );
};
