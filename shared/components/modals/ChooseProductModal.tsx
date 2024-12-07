'use client';

import { useState } from 'react';
// shadcn ui
import { Dialog, DialogContent, DialogTitle } from '@/shared/components/ui';
// components
import { ChoosePizzaForm, ChooseProductForm } from '..';
// cn
import { cn } from '@/shared/lib/utils';
// next
import { useRouter } from 'next/navigation';
// types
import { ProductWithRelations } from '@/@types/prisma';
// zustand store
import { useCartStore } from '@/shared/store';
// react-hot-toast
import toast from 'react-hot-toast';

interface Props {
  product: ProductWithRelations;
  className?: string;
}

export const ChooseProductModal: React.FC<Props> = ({ product, className }) => {
  const router = useRouter();
  const firstItemVariant = product.variants[0]; // Для продуктов, у которых всего 1 вариант, мы берем первый и единственный
  const isPizzaForm = Boolean(firstItemVariant.pizzaType);
  const addCartItem = useCartStore((state) => state.addCartItem);
  const loading = useCartStore((state) => state.loading);

  const onSubmit = async (productVariantId?: number, ingredients?: number[]) => {
    try {
      const itemId = productVariantId ?? firstItemVariant.id;

      await addCartItem({
        productItemId: itemId,
        ingredients,
      });

      toast.success(`${product.name} теперь в корзине!`);
      router.back();
    } catch (error) {
      toast.error(`Не удалось добавить ${product.name} в корзину`);
      console.error(error);
    }
  };

  return (
    <Dialog open={Boolean(product)} onOpenChange={() => router.back()}>
      <DialogContent
        aria-describedby={undefined}
        className={cn(
          'p-0 w-[1060px] max-w-[1060px] min-h-[550px] bg-white overflow-hidden',
          className
        )}
      >
        <DialogTitle className="hidden" />
        {isPizzaForm ? (
          <ChoosePizzaForm
            imageUrl={product.imageUrl}
            name={product.name}
            ingredients={product.ingredients}
            variants={product.variants}
            onSubmit={onSubmit}
            loading={loading}
          />
        ) : (
          <ChooseProductForm
            onSubmit={onSubmit}
            imageUrl={product.imageUrl}
            name={product.name}
            price={firstItemVariant.price}
            loading={loading}
          />
        )}
      </DialogContent>
    </Dialog>
  );
};
