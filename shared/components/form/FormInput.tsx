'use client';

// react-hook-form
import { useFormContext } from 'react-hook-form';
// lucide icons
import { Asterisk } from 'lucide-react';
// ui
import { Input } from '../ui';
// components
import { ErrorText, ClearButton } from '../';

interface FormInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  name: string;
  label?: string;
  required?: boolean;
  className?: string;
}

export const FormInput: React.FC<FormInputProps> = ({
  name,
  label,
  required,
  className,
  ...props
}) => {
  const {
    register, // регистрирует input внутри react-hook-form, чтобы тот работал через логику этой библиотеки
    formState: { errors },
    watch,
    setValue,
  } = useFormContext();

  const value = watch(name);
  const errorText = errors[name]?.message as string;

  const onClickClear = () => {
    setValue(name, '', { shouldValidate: true });
  };

  return (
    <div className={className}>
      {label && (
        <p className="flex font-medium mb-2">
          {label} {required && <Asterisk className="text-red-500" size={12}/>}
        </p>
      )}

      <div className="relative">
        <Input className="h-12 text-md" {...register(name)} {...props} />

        {value && <ClearButton onClick={onClickClear} />}
      </div>

      {errorText && <ErrorText text={errorText} className="mt-2" />}
    </div>
  );
};
