'use client';

import { useEffect } from 'react';
import { cn } from '@/shared/lib/utils';
// components
import { CartButton, Container, ProfileButton, SearchInput } from '.';
// next
import { useSearchParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
// react-hot-toast
import toast from 'react-hot-toast';


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
  const searchParams = useSearchParams();

  useEffect(() => {
    if (searchParams.has('paid')) {
      setTimeout(() => {
        toast.success('Заказ успешно оплачен! Информация отправлена на почту.');
      }, 1000);
    }
  }, []);

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
          <ProfileButton />

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
