// react-hook-form
import { FormProvider, useForm } from 'react-hook-form';
// zod schema
import { formLoginSchema, TFormLoginValues } from './authModalSchema';
// zod
import { zodResolver } from '@hookform/resolvers/zod';
// components
import { FormInput, Title } from '../..';
// shadcn ui
import { Button } from '../../ui';
// react-hot-toast
import toast from 'react-hot-toast';
// next-auth
import { signIn } from 'next-auth/react';

interface Props {
  onClose?: VoidFunction;
  className?: string;
}

export const LoginForm: React.FC<Props> = ({ onClose }) => {
  const form = useForm<TFormLoginValues>({
    resolver: zodResolver(formLoginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (data: TFormLoginValues) => {
    try {
      const response = await signIn('credentials', {
        ...data,
        redirect: false,
      });

      if (!response?.ok) {
        throw Error();
      }

      toast.success('Вы успешно вошли в аккаунт', {
        icon: '✅',
      });

      onClose?.();
    } catch (error) {
      console.error('[LOGIN] error', error);
      toast.error('Не удалось войти в аккаунт', {
        icon: '❌',
      });
    }
  };

  return (
    <FormProvider {...form}>
      <form className="flex flex-col gap-5" onSubmit={form.handleSubmit(onSubmit)}>
        <div className="flex justify-between items-center">
          <Title text="Вход в аккаунт" size="md" className="font-bold" />
          <p className="text-gray-400">Введите свою почту, чтобы войти в свой аккаунт</p>
        </div>
        <img src="/assets/images/phone-icon.png" alt="phone-icon" width={60} height={60} />
      </form>

      <FormInput name="email" label="E-Mail" required />
      <FormInput name="password" label="Пароль" type="password" required />

      <Button loading={form.formState.isSubmitting} className="h-12 text-base" type="submit">
        Войти
      </Button>
    </FormProvider>
  );
};