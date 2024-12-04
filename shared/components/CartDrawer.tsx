'use client';

import { PropsWithChildren } from 'react';
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
import { getCartItemDetails } from '../lib';

interface Props {
  className?: string;
}

export const CartDrawer: React.FC<PropsWithChildren<Props>> = ({ children, className }) => {
  return (
    <Sheet>
      <SheetTrigger asChild>{children}</SheetTrigger>

      <SheetContent className="flex flex-col justify-between pb-0 bg-[#F4F1EE]">
        <SheetHeader>
          <SheetTitle>
            В корзине <span className="font-bold">3 товара</span>
          </SheetTitle>
        </SheetHeader>

        <SheetDescription className="hidden" />

        <div className="-mx-6 mt-5 overflow-auto scrollbar flex-1">
          <div className="mb-2">
            <CartDrawerItem
              id={1}
              name={'Чоризо фреш'}
              imageUrl={
                'https://media.dodostatic.net/image/r:292x292/11EF9050501F3FA690A64053F5F07626.avif'
              }
              price={500}
              quantity={1}
              details={getCartItemDetails(1, 30, [
                {
                  name: 'Сырный бортик',
                },
                {
                  name: 'Сливочная моцарелла',
                },
                {
                  name: 'Сыры чеддер и пармезан',
                },
              ])}
            />
          </div>
          <div className="mb-2">
            <CartDrawerItem
              id={1}
              name={'Чоризо фреш'}
              imageUrl={
                'https://media.dodostatic.net/image/r:292x292/11EF9050501F3FA690A64053F5F07626.avif'
              }
              price={500}
              quantity={1}
              details={getCartItemDetails(1, 30, [
                {
                  name: 'Сырный бортик',
                },
                {
                  name: 'Сливочная моцарелла',
                },
                {
                  name: 'Сыры чеддер и пармезан',
                },
              ])}
            />
          </div>

          <div className="mb-2">
            <CartDrawerItem
              id={1}
              name={'Чоризо фреш'}
              imageUrl={
                'https://media.dodostatic.net/image/r:292x292/11EF9050501F3FA690A64053F5F07626.avif'
              }
              price={500}
              quantity={1}
              details={getCartItemDetails(1, 30, [
                {
                  name: 'Сырный бортик',
                },
                {
                  name: 'Сливочная моцарелла',
                },
                {
                  name: 'Сыры чеддер и пармезан',
                },
              ])}
            />
          </div>
        </div>

        <SheetFooter className="-mx-6 bg-white p-8">
          <div className="w-full">
            <div className="flex mb-4">
              <span className="flex flex-1 text-lg text-neutral-500">
                Итого
                <div className="flex-1 border-b border-dashed border-b-neutral-200 relative -top-1 mx-2" />
              </span>
              <span className="font-bold text-lg">500 ₽</span>
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
