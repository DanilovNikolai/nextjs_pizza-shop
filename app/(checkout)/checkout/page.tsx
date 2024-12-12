import { Container, Title } from '@/shared/components';
import React from 'react';

interface CheckoutProps {
  className?: string;
}

export default function CheckoutPage({ className }: CheckoutProps) {
  return (
    <Container className="mt-10">
      <Title text="Оформление заказа" className="font-extrabold mb-8 text-[36px]" />
    </Container>
  );
}
