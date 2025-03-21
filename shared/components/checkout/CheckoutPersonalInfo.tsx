// components
import { FormInput, WhiteBlock } from '../';

interface Props {
  className?: string;
}

export const CheckoutPersonalInfo: React.FC<Props> = ({ className }) => {
  return (
    <WhiteBlock title="2. Персональные данные" className={className}>
      <div className="grid grid-cols-2 gap-5 mmd:grid-cols-1 mmd:gap-2 mmd:w-full">
        <FormInput name="firstName" className="text-base" placeholder="Имя" />
        <FormInput name="lastName" className="text-base" placeholder="Фамилия" />
        <FormInput name="email" className="text-base" placeholder="E-Mail" />
        <FormInput name="phone" className="text-base" placeholder="Телефон" />
      </div>
    </WhiteBlock>
  );
};
