// components
import { FormTextarea, WhiteBlock } from '../';
import AddressInput from '../AddressInputWrapper';

interface Props {
  className?: string;
}

export const CheckoutAddress: React.FC<Props> = () => {
  return (
    <WhiteBlock title="3. Адрес доставки">
      <div className="flex flex-col gap-5">
        <AddressInput />

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
