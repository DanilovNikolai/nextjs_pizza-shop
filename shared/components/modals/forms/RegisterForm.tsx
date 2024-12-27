// react-hook-form
import { FormProvider, useForm } from 'react-hook-form';
// zod schema
import { formRegisterSchema, TFormRegisterValues } from './authModalSchema';
// zod
import { zodResolver } from '@hookform/resolvers/zod';
// components
import { FormInput, Title } from '../..';
// shadcn ui
import { Button } from '../../ui';
// react-hot-toast
import toast from 'react-hot-toast';
// server actions
import { registerUser } from '@/app/actions';

interface Props {
  onClose?: VoidFunction;
  onClickLogin?: VoidFunction;
}

export const RegisterForm: React.FC<Props> = ({ onClose, onClickLogin }) => {
  const form = useForm<TFormRegisterValues>({
    resolver: zodResolver(formRegisterSchema),
    defaultValues: {
      email: '',
      fullName: '',
      password: '',
      confirmPassword: '',
    },
  });

  const onSubmit = async (data: TFormRegisterValues) => {
    try {
      await registerUser({
        email: data.email,
        fullName: data.fullName,
        password: data.password,
      });

      toast.success('Вы успешно зарегестрировались! 📝 Подтвердите свою почту', {
        icon: '✅',
      });

      onClose?.();
    } catch (error) {
      console.error('[REGISTER] error', error);
      toast.error('Не удалось зарегестрироваться', {
        icon: '❌',
      });
    }
  };

  return (
    <FormProvider {...form}>
      <Title text="Регистрация" size="md" className="font-bold" />
      <form className="flex flex-col gap-5" onSubmit={form.handleSubmit(onSubmit)}>
        <FormInput name="email" label="E-Mail" required />
        <FormInput name="fullName" label="Полное имя" required />
        <FormInput name="password" label="Пароль" type="password" required />
        <FormInput name="confirmPassword" label="Подтвердите пароль" type="password" required />

        <Button loading={form.formState.isSubmitting} className="h-12 text-base" type="submit">
          Зарегистрироваться
        </Button>
      </form>
    </FormProvider>
  );
};
