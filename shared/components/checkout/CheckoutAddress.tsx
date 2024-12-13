import { Input, Textarea } from '../ui';
import { WhiteBlock } from '../WhiteBlock';

interface Props {
  className?: string;
}

export const CheckoutAddress: React.FC<Props> = () => {
  return (
    <WhiteBlock title="3. Адрес доставки">
      <div className="flex flex-col gap-5">
        <Input name="firstName" className="text-base" placeholder="Введите адрес..." />
        <Textarea rows={5} className="text-base" placeholder="Комментарий к заказу" />
      </div>
    </WhiteBlock>
  );
};
