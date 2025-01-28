import { cn } from '@/shared/lib/utils';
// components
import { Title } from '.';
// shadcn ui
import { Button } from './ui';

interface ChooseProductFormProps {
  imageUrl: string;
  name: string;
  price: number;
  description?: string | null;
  loading?: boolean;
  onSubmit?: VoidFunction;
  className?: string;
}

export const ChooseProductForm: React.FC<ChooseProductFormProps> = ({
  imageUrl,
  name,
  price,
  description,
  loading,
  onSubmit,
  className,
}) => {
  return (
    <div className={cn('flex flex-1 w-full mmd:flex-col mmd:items-center', className)}>
      <div className="flex items-center justify-center flex-1 relative w-full mmd:hidden">
        <img
          src={imageUrl}
          alt={name}
          className="relative left-2 top-2 transition-all z-10 duration-300 w-max-[350px] h-max-[350px]"
        />
      </div>

      <div className="flex flex-col justify-between w-[490px] bg-[#F9F9F9] p-7 mmd:w-full">
        <Title text={name} size="md" className="font-extrabold mb-1" />
        <p className="text-gray-400 mt-3">{description}</p>

        <div className="hidden items-center justify-center flex-1 relative w-full mmd:flex">
          <img
            src={imageUrl}
            alt={name}
            className="relative left-2 top-2 transition-all z-10 duration-300 w-[350px] h-[350px] mmd:w-[250px] mmd:h-[250px]"
          />
        </div>

        <Button
          loading={loading}
          onClick={() => onSubmit?.()}
          className="h-[55px] px-10 text-base rounded-[18px] w-full mt-10"
        >
          Добавить в корзину за {price} ₽
        </Button>
      </div>
    </div>
  );
};
