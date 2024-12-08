'use client';

// lucide
import { ArrowRight, ShoppingCart } from 'lucide-react';
// shadcn
import { Button } from './ui';
// cn
import { cn } from '../lib/utils';
// component
import { CartDrawer } from './';
// zustand store
import { useCartStore } from '../store';

interface Props {
  className?: string;
}

export const CartButton: React.FC<Props> = ({ className }) => {
  const totalAmount = useCartStore((state) => state.totalAmount);
  const cartItems = useCartStore((state) => state.items);
  const loading = useCartStore((state) => state.loading);

  return (
    <CartDrawer>
      <Button
        loading={loading}
        className={cn('group relative', { 'w-[105px]': loading }, className)}
      >
        <b>{totalAmount} ₽</b>
        <span className="h-full w-[1px] bg-white/30 mx-3" />
        <div className="flex items-center gap-1 transition duration-300 group-hover:opacity-0">
          <ShoppingCart size={16} className="relative" strokeWidth={2} />
          <b>{cartItems.length}</b>
        </div>
        <ArrowRight
          size={20}
          className="absolute right-5 transition duration-300 translate-x-2 opacity-0 group-hover:opacity-100 group-hover:translate-x-0"
        />
      </Button>
    </CartDrawer>
  );
};
