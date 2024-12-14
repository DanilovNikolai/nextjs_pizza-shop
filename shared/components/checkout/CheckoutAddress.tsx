'use client';

// react-hook-form
import { Controller, useFormContext } from 'react-hook-form';
// components
import { ErrorText, FormTextarea, WhiteBlock } from '../';
import AddressInput from '../AddressInputWrapper';

interface Props {
  className?: string;
}

export const CheckoutAddress: React.FC<Props> = ({className}) => {
  const { control } = useFormContext();

  return (
    <WhiteBlock title="3. Адрес доставки" className={className}>
      <div className="flex flex-col gap-5">
        {/** Используем Controller из RHF и оборачиваем в него AddressInput, чтобы использовать в нем логику RHF */}
        <Controller
          control={control}
          name="address"
          render={({ field, fieldState }) => (
            <>
              <AddressInput onChange={field.onChange} />
              {fieldState.error?.message && <ErrorText text={fieldState.error.message} />}
            </>
          )}
        />

        <FormTextarea
          name="comment"
          rows={5}
          className="text-base"
          placeholder="Комментарий к заказу"
        />
      </div>
    </WhiteBlock>
  );
};
