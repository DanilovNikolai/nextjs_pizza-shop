'use client';

// zod
import { zodResolver } from '@hookform/resolvers/zod';
import { formRegisterSchema, TFormRegisterValues } from './modals/forms';
// react-hook-form
import { FormProvider, useForm } from 'react-hook-form';
// types
import { User } from '@prisma/client';
// react-hot-toast
import toast from 'react-hot-toast';
// next-auth
import { signOut } from 'next-auth/react';
// components
import { Container, Title, FormInput } from '.';
// shadcn ui
import { Button } from './ui';
// server actions
import { updateUserInfo } from '@/app/actions';
// cn
import { cn } from '../lib/utils';

interface Props {
  data: User;
  className: string;
}

export const Profile: React.FC<Props> = ({ data, className }) => {
  const form = useForm({
    resolver: zodResolver(formRegisterSchema),
    defaultValues: {
      fullName: data.fullName,
      email: data.email,
      password: '',
      confirmPassword: '',
    },
  });

  // Функция подтверждения изменения данных пользователя
  const onSubmit = async (data: TFormRegisterValues) => {
    try {
      await updateUserInfo({
        email: data.email,
        fullName: data.fullName,
        password: data.password,
      });

      toast.success('Данные обновлены 📝', {
        icon: '✅',
      });
    } catch (error) {
      return toast.error('Ошибка при обновлении данных', {
        icon: '❌',
      });
    }
  };

  // Функция выхода из аккаунта
  const onClickSignOut = () => {
    signOut({
      callbackUrl: '/',
    });
  };

  return (
    <Container className={cn('my-10', className)}>
      <div className="flex flex-col justify-center items-center mmd:flex-1 mmd:p-5">
        <Title text={`Личные данные`} size="md" className="font-bold" />

        <FormProvider {...form}>
          <form
            className="flex flex-col gap-5 w-96 mt-10 mmd:mt-5 mmd:w-[90%]"
            onSubmit={form.handleSubmit(onSubmit)}
          >
            <FormInput name="email" label="E-Mail" required />
            <FormInput name="fullName" label="Полное имя" required />

            <FormInput type="password" name="password" label="Новый пароль" required />
            <FormInput type="password" name="confirmPassword" label="Повторите пароль" required />

            <Button
              disabled={form.formState.isSubmitting}
              className="text-base mt-10"
              type="submit"
            >
              Сохранить
            </Button>

            <Button
              onClick={onClickSignOut}
              variant="secondary"
              disabled={form.formState.isSubmitting}
              className="text-base"
              type="button"
            >
              Выйти
            </Button>
          </form>
        </FormProvider>
      </div>
    </Container>
  );
};
