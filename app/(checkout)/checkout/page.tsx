'use client';

// react-hook-form
import { useForm, SubmitHandler } from 'react-hook-form';
// zod
import { zodResolver } from '@hookform/resolvers/zod';
// components
import {
  CheckoutInvoice,
  Container,
  Title,
  CheckoutCart,
  CheckoutPersonalInfo,
  CheckoutAddress,
} from '@/shared/components';
// custom hooks
import { useCart } from '@/shared/hooks';

export default function CheckoutPage() {
  const { items, totalAmount, updateItemQuantity, removeCartItem } = useCart();

  const form = useForm({
    resolver: zodResolver(),
    defaultValues: {
      email: '',
      firstName: '',
      lastName: '',
      phone: '',
      address: '',
      comment: '',
    },
  });

  const onClickCountButton = (id: number, quantity: number, type: 'plus' | 'minus') => {
    const newQuantity = type === 'plus' ? quantity + 1 : quantity - 1;
    updateItemQuantity(id, newQuantity);
  };

  return (
    <Container className="mt-10">
      <Title text="Оформление заказа" className="font-extrabold mb-8 text-[36px]" />

      <div className="flex gap-10">
        {/** Левая сторона */}
        <div className="flex flex-col gap-10 flex-1 mb-20">
          <CheckoutCart
            items={items}
            removeCartItem={removeCartItem}
            onClickCountButton={onClickCountButton}
          />

          <CheckoutPersonalInfo />

          <CheckoutAddress />
        </div>

        {/** Правая сторона */}
        <div className="w-[450px]">
          <CheckoutInvoice totalAmount={totalAmount} />
        </div>
      </div>
    </Container>
  );
}
