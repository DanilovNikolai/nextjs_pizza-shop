'use client';

// prisma types
import { ProductWithRelations } from '@/@types/prisma';
// container
import { ChoosePizzaForm, ChooseProductForm } from '@/shared/components';
// zustand store
import { useCartStore } from '@/shared/store';
// react-hot-toast
import toast from 'react-hot-toast';

interface Props {
  product: ProductWithRelations;
  onSubmit?: VoidFunction;
}

export const ProductForm: React.FC<Props> = ({ product, onSubmit: _onSubmit }) => {
  const addCartItem = useCartStore((state) => state.addCartItem);
  const loading = useCartStore((state) => state.loading);

  const firstItemVariant = product.variants[0]; // Для продуктов, у которых всего 1 вариант, мы берем первый и единственный
  const isPizzaForm = Boolean(firstItemVariant.pizzaType);

  const onSubmit = async (productVariantId?: number, ingredients?: number[]) => {
    try {
      const itemId = productVariantId ?? firstItemVariant.id;

      await addCartItem({
        productItemId: itemId,
        ingredients,
      });

      toast.success(`${product.name} теперь в корзине!`);
      _onSubmit?.();
    } catch (error) {
      toast.error(`Не удалось добавить ${product.name} в корзину`);
      console.error(error);
    }
  };

  if (isPizzaForm) {
    return (
      <ChoosePizzaForm
        imageUrl={product.imageUrl}
        name={product.name}
        ingredients={product.ingredients}
        variants={product.variants}
        description={product.description}
        onSubmit={onSubmit}
        loading={loading}
      />
    );
  }

  return (
    <ChooseProductForm
      onSubmit={onSubmit}
      imageUrl={product.imageUrl}
      name={product.name}
      description={product.description}
      price={firstItemVariant.price}
      loading={loading}
    />
  );
};
