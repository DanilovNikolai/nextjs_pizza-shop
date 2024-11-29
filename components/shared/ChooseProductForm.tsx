import { cn } from '@/lib/utils';
// components
import { ProductImage, Title } from '.';
// shadcn ui
import { Button } from '../ui';

interface ChoosePizzaFormProps {
  className?: string;
  imageUrl: string;
  name: string;
  ingredients: any[];
  items?: any[];
  onClickAdd?: VoidFunction;
}

export const ChooseProductForm: React.FC<ChoosePizzaFormProps> = ({
  imageUrl,
  name,
  ingredients,
  items,
  onClickAdd,
  className,
}) => {
  const productDescription = '30 см, традиционное тесто';
  const totalPrice = 350;

  return (
    <div className={cn('flex flex-1', className)}>
      <div className="flex items-center justify-center flex-1 relative w-full">
        <img
          src={imageUrl}
          alt={name}
          className="relative left-2 top-2 transition-all z-10 duration-300 w-[350px] h-[350px]"
        />
      </div>

      <div className="w-[490px] bg-[#F9F9F9] p-7">
        <Title text={name} size="md" className="font-extrabold mb-1" />
        <p className="text-gray-400">{productDescription}</p>
        <Button className="h-[55px] px-10 text-base rounded-[18px] w-full mt-10">
          Добавить в корзину за {totalPrice} ₽
        </Button>
      </div>
    </div>
  );
};
