'use client';

import { PropsWithChildren, useState } from 'react';
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
  SheetClose,
} from './ui';
// next-link
import Link from 'next/link';
// lucide
import { ArrowLeft, ArrowRight } from 'lucide-react';
// component
import { CartDrawerItem } from './CartDrawerItem';
import Image from 'next/image';
import { Title } from './Title';
// lib
import { getCartItemDetails } from '../lib';
// types
import { PizzaSize, PizzaType } from '../constants/pizza';
// clsx
import { cn } from '../lib/utils';
// custom hooks
import { useCart } from '../hooks';

export const CartDrawer: React.FC<PropsWithChildren> = ({ children }) => {
  const { items, totalAmount, updateItemQuantity, removeCartItem } = useCart();
  const [redirecting, setRedirecting] = useState(false);

  const onClickCountButton = (id: number, quantity: number, type: 'plus' | 'minus') => {
    const newQuantity = type === 'plus' ? quantity + 1 : quantity - 1;
    updateItemQuantity(id, newQuantity);
  };

  return (
    <Sheet>
      <SheetTrigger asChild>{children}</SheetTrigger>

      <SheetContent className="flex flex-col justify-between pb-0 bg-[#F4F1EE]">
        <div className={cn('flex flex-col h-full', { 'justify-center': !totalAmount })}>
          <SheetTitle className="hidden" />
          {totalAmount > 0 && (
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
              {items.length >= 5 && (
                <SheetTitle>
                  В корзине <span className="font-bold">{items.length} товаров</span>
                </SheetTitle>
              )}
            </SheetHeader>
          )}

          <SheetDescription className="hidden" />

          {!totalAmount && (
            <div className="flex flex-col items-center justify-center w-72 mx-auto">
              <Image src="/assets/images/empty-box.png" alt="Empty cart" width={120} height={120} />
              <Title size="sm" text="Корзина пустая" className="text-center font-bold my-2" />
              <p className="text-center text-neutral-500 mb-5">
                Добавьте товар, чтобы совершить заказ
              </p>
              <SheetClose asChild>
                <Button className="w-56 h-12 text-base" size="lg">
                  <ArrowLeft className="w-5 mr-2" />
                  Вернуться назад
                </Button>
              </SheetClose>
            </div>
          )}

          {totalAmount > 0 && (
            <>
              <div className="-mx-6 mt-5 overflow-auto scrollbar flex-1">
                {items.map((item) => (
                  <div className="mb-2" key={item.id}>
                    <CartDrawerItem
                      id={item.id}
                      name={item.name}
                      imageUrl={item.imageUrl}
                      price={item.price}
                      quantity={item.quantity}
                      disabled={item.disabled}
                      onClickCountButton={(type) =>
                        onClickCountButton(item.id, item.quantity, type)
                      }
                      onClickRemove={() => removeCartItem(item.id)}
                      details={getCartItemDetails(
                        item.ingredients,
                        item.pizzaType as PizzaType,
                        item.pizzaSize as PizzaSize
                      )}
                    />
                  </div>
                ))}
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
                  <Link href="/checkout">
                    <Button
                      onClick={() => setRedirecting(true)}
                      loading={redirecting}
                      type="submit"
                      className="w-full h-12 text-base"
                    >
                      Оформить заказ
                      <ArrowRight className="w-5 ml-2" />
                    </Button>
                  </Link>
                </div>
              </SheetFooter>
            </>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
};
