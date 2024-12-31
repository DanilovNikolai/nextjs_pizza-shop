'use client';

import { useEffect, useState } from 'react';
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
// server actions
import { createOrder } from '@/app/actions';
// react-hot-toast
import toast from 'react-hot-toast';
// next-auth
import { useSession } from 'next-auth/react';
// services
import { Api } from '@/shared/services/api-client';

export default function CheckoutPage() {
  const [submitting, setSubmitting] = useState(false);
  const { items, totalAmount, updateItemQuantity, removeCartItem, loading } = useCart();
  const { data: session } = useSession();

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

  useEffect(() => {
    async function fetchUserInfo() {
      const data = await Api.auth.getMe();
      const [firstName, lastName] = data.fullName.split(' ');

      form.setValue('firstName', firstName);
      form.setValue('lastName', lastName);
      form.setValue('email', data.email);
    }

    if (session) {
      fetchUserInfo();
    }
  }, [session, form]);

  const onSubmit: SubmitHandler<CheckoutFormType> = async (data) => {
    try {
      setSubmitting(true);
      const url = await createOrder(data);

      toast.success('Заказ успешно оформлен! 📝 Переход на оплату... ', {
        icon: '✅',
      });

      if (url) {
        location.href = url; // перенаправляем пользователя на новый url, location - глобальный объект из JS
      }
    } catch (error) {
      console.log(error);
      setSubmitting(false);
      toast.error('Не удалось создать заказ'),
        {
          icon: '❌',
        };
    }
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
              <CheckoutInvoice totalAmount={totalAmount} loading={loading || submitting} />
            </div>
          </div>
        </form>
      </FormProvider>
    </Container>
  );
}
