import React from 'react';

interface CheckoutProps {
  className?: string;
}

export default function CheckoutPage({ className }: CheckoutProps) {
  return <div className={className}>Checkout</div>;
}
