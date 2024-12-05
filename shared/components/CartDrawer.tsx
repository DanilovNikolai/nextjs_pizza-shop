'use client';

import { PropsWithChildren, useEffect } from 'react';
// shadcn
import {
  Button,
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetFooter,
  SheetTitle,
  SheetTrigger,
} from './ui';
// next-link
import Link from 'next/link';
// lucide
import { ArrowRight } from 'lucide-react';
// component
import { CartDrawerItem } from './CartDrawerItem';
// lib
import { getCartItemDetails } from '../lib';
// zustand
import { useCartStore } from '../store';
// types
import { PizzaSize, PizzaType } from '../constants/pizza';

interface Props {
  className?: string;
}

export const CartDrawer: React.FC<PropsWithChildren<Props>> = ({ children }) => {
  const items = useCartStore((state) => state.items);
  const totalAmount = useCartStore((state) => state.totalAmount);
  const fetchCartItems = useCartStore((state) => state.fetchCartItems);

  useEffect(() => {
    fetchCartItems();
  }, [fetchCartItems]);

  return (
    <Sheet>
      <SheetTrigger asChild>{children}</SheetTrigger>

      <SheetContent className="flex flex-col justify-between pb-0 bg-[#F4F1EE]">
        <SheetHeader>
          {items.length === 1 && (
            <SheetTitle>
              В корзине <span className="font-bold">{items.length} товар</span>
            </SheetTitle>
          )}
          {items.length > 1 && items.length < 5 && (
            <SheetTitle>
              В корзине <span className="font-bold">{items.length} товара</span>
            </SheetTitle>
          )}
          {items.length === 0 && items.length >= 5 && (
            <SheetTitle>
              В корзине <span className="font-bold">{items.length} товаров</span>
            </SheetTitle>
          )}
        </SheetHeader>

        <SheetDescription className="hidden" />

        <div className="-mx-6 mt-5 overflow-auto scrollbar flex-1">
          <div className="mb-2">
            {items.map((item) => (
              <CartDrawerItem
                key={item.id}
                id={item.id}
                name={item.name}
                imageUrl={item.imageUrl}
                price={item.price}
                quantity={item.quantity}
                details={
                  item.pizzaSize && item.pizzaType
                    ? getCartItemDetails(
                        item.ingredients,
                        item.pizzaType as PizzaType,
                        item.pizzaSize as PizzaSize
                      )
                    : ''
                }
              />
            ))}
          </div>
        </div>

        <SheetFooter className="-mx-6 bg-white p-8">
          <div className="w-full">
            <div className="flex mb-4">
              <span className="flex flex-1 text-lg text-neutral-500">
                Итого
                <div className="flex-1 border-b border-dashed border-b-neutral-200 relative -top-1 mx-2" />
              </span>
              <span className="font-bold text-lg">{totalAmount} ₽</span>
            </div>
            <Link href="/cart">
              <Button type="submit" className="w-full h-12 text-base">
                Оформить заказ
                <ArrowRight className="w-5 ml-2" />
              </Button>
            </Link>
          </div>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};
