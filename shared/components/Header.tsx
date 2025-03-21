'use client';

import { useEffect, useState } from 'react';
// cn
import { cn } from '@/shared/lib/utils';
// components
import { AuthModal, CartButton, Container, ProfileButton, SearchInput } from '.';
// next
import { useRouter, useSearchParams } from 'next/navigation';
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
  const [openAuthModal, setOpenAuthModal] = useState(false);
  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    let toastMessage = '';

    if (searchParams.has('paid')) {
      toastMessage = 'Заказ успешно оплачен! Информация отправлена на почту.';
    }

    if (searchParams.has('verified')) {
      toastMessage = 'Ваша почта успешно подтверждена!';
    }

    if (toastMessage) {
      setTimeout(() => {
        router.replace('/');
        toast.success(toastMessage, {
          duration: 3000,
        });
      }, 1500);
    }
  }, []);

  return (
    <header className={cn('border-b mmd:w-full', className)}>
      <Container className="flex items-center justify-between py-8 mmd:py-3 mmd:px-2">
        <div className="flex flex-1 mmd:flex-col mmd:mr-2">
          {/* Левая часть */}
          <Link href="/">
            <div className="flex items-center gap-4">
              <Image src="/logo.png" alt="logo" width={35} height={35} />
              <div>
                <h1 className="text-2xl uppercase font-black mmd:text-[20px]">Next Pizza</h1>
                <p className="text-sm text-gray-400 leading-3">вкусней уже некуда!</p>
              </div>
            </div>
          </Link>

          {/* Поиск */}
          {hasSearch && (
            <div className="mx-10 flex-1 mmd:mx-0 mmd:mt-4">
              <SearchInput />
            </div>
          )}
        </div>

        {/* Правая часть */}
        <div className="flex items-center gap-3 mmd:flex-col">
          <AuthModal isOpen={openAuthModal} onClose={() => setOpenAuthModal(false)} />

          <ProfileButton onClickSignIn={() => setOpenAuthModal(true)} />

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
