'use client';

// react-hook-form
import { useForm, SubmitHandler, FormProvider } from 'react-hook-form';
// zod
import { zodResolver } from '@hookform/resolvers/zod';
// components
import {
  Container,
  Title,
  CheckoutCart,
  CheckoutInvoice,
  CheckoutPersonalInfo,
  CheckoutAddress,
  checkoutFormSchema,
} from '@/shared/components';
// custom hooks
import { useCart } from '@/shared/hooks';
// types
import { CheckoutFormType } from '@/shared/components/checkout/checkoutFormSchema';

export default function CheckoutPage() {
  const { items, totalAmount, updateItemQuantity, removeCartItem, loading } = useCart();

  // Передаем поля и валидатор (zod)
  const form = useForm<CheckoutFormType>({
    resolver: zodResolver(checkoutFormSchema),
    defaultValues: {
      email: '',
      firstName: '',
      lastName: '',
      phone: '',
      address: '',
      comment: '',
    },
  });

  const onSubmit: SubmitHandler<CheckoutFormType> = (data) => {
    console.log(data);
  };

  const onClickCountButton = (id: number, quantity: number, type: 'plus' | 'minus') => {
    const newQuantity = type === 'plus' ? quantity + 1 : quantity - 1;
    updateItemQuantity(id, newQuantity);
  };

  return (
    <Container className="mt-10">
      <Title text="Оформление заказа" className="font-extrabold mb-8 text-[36px]" />

      {/** FormProvider передает контекст во все компоненты внутри себя.
       form.handleSubmit - ф-ция,проверяющая поля на валидность, вызывающаяся при сабмите */}

      <FormProvider {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="flex gap-10">
            {/** Левая сторона */}
            <div className="flex flex-col gap-10 flex-1 mb-20">
              <CheckoutCart
                items={items}
                removeCartItem={removeCartItem}
                onClickCountButton={onClickCountButton}
                loading={loading}
              />

              <CheckoutPersonalInfo className={loading ? 'opacity-40 pointer-events-none' : ''} />

              <CheckoutAddress className={loading ? 'opacity-40 pointer-events-none' : ''} />
            </div>

            {/** Правая сторона */}
            <div className="w-[450px]">
              <CheckoutInvoice totalAmount={totalAmount} loading={loading} />
            </div>
          </div>
        </form>
      </FormProvider>
    </Container>
  );
}
