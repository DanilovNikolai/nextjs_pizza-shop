'use client';

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

interface Props {
  product: ProductWithRelations;
  className?: string;
}

export const ChooseProductModal: React.FC<Props> = ({ product, className }) => {
  const router = useRouter();
  const firstItemVariant = product.variants[0]; // Для продуктов, у которых всего 1 вариант, мы берем первый и единственный
  const isPizzaForm = Boolean(firstItemVariant.pizzaType);
  const addCartItem = useCartStore((state) => state.addCartItem);

  const onAddProduct = () => {
    addCartItem({
      productItemId: firstItemVariant.id,
    });
  };

  const onAddPizza = (productItemId: number, ingredients: number[]) => {
    addCartItem({
      productItemId,
      ingredients,
    });
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
            onSubmit={onAddPizza}
          />
        ) : (
          <ChooseProductForm
            onSubmit={onAddProduct}
            imageUrl={product.imageUrl}
            name={product.name}
            price={firstItemVariant.price}
          />
        )}
      </DialogContent>
    </Dialog>
  );
};
