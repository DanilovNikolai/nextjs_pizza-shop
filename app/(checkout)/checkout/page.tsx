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
import { cn } from '@/shared/lib/utils';

export default function CheckoutPage() {
  const [submitting, setSubmitting] = useState(false);
  const { items, totalAmount, updateItemQuantity, removeCartItem, loading } = useCart();
  const { data: session } = useSession();

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
        location.href = url;
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
    <Container className="mt-10 mmd:mt-5 mmd:w-full mmd:flex-col">
      <Title text="Оформление заказа" className="font-extrabold mb-8 text-[36px] mmd:text-[28px] mmd:mb-4" />

      <FormProvider {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="flex gap-10 mmd:flex-col mmd:gap-5">
            {/** Левая сторона */}
            <div className="flex flex-col gap-10 flex-1 mb-20 mmd:mb-0 mmd:gap-5">
              <CheckoutCart
                items={items}
                removeCartItem={removeCartItem}
                onClickCountButton={onClickCountButton}
                loading={loading}
                className="mmd:px-2"
              />

              <CheckoutPersonalInfo
                className={cn(loading ? 'opacity-40 pointer-events-none' : '', 'mmd:px-2')}
              />

              <CheckoutAddress
                className={cn(loading ? 'opacity-40 pointer-events-none' : '', 'mmd:px-2')}
              />
            </div>

            {/** Правая сторона */}
            <div className="w-[450px] mmd:w-full mmd:px-2">
              <CheckoutInvoice totalAmount={totalAmount} loading={loading || submitting} />
            </div>
          </div>
        </form>
      </FormProvider>
    </Container>
  );
}
