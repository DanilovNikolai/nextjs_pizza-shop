import { cn } from '@/lib/utils';
import React from 'react';
import { Container } from './Container';
import Image from 'next/image';

interface Props {
  className?: string;
}

const Header = ({ className }: Props) => {
  return (
    <header className={cn('border vorder-b', className)}>
      <Container className="flex items-center justify-between py-8">
        {/* Левая часть */}
        <div>
          <Image src="/logo.png" alt="logo" width={35} height={35} />
        </div>
      </Container>
    </header>
  );
};

export default Header;
