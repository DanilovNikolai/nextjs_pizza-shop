// next
import Link from 'next/link';
// components
import { Title } from './Title';
// shadcn
import { Button } from './ui';
// lucide
import { Plus } from 'lucide-react';
// prisma types
import { Ingredient } from '@prisma/client';
// cn
import { cn } from '../lib/utils';

interface Props {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
  className?: string;
  ingredients: Ingredient[];
}

export const ProductCard: React.FC<Props> = ({
  id,
  name,
  price,
  imageUrl,
  ingredients,
  className,
}) => {
  return (
    <>
      <Link href={`product/${id}`}>
        <div className={cn('mmd:flex mmd:justify-start items-center', className)}>
          <div className="flex justify-center p-6 bg-secondary rounded-lg mmd:w-[150px] mmd:h-[150px] mmd:mr-5 mmd:flex-shrink-0">
            <img
              className="w-[215px] h-[215px] mmd:h-[100%] mmd:w-[100%]"
              src={imageUrl}
              alt={name}
            />
          </div>

          <div>
            <Title text={name} size="sm" className="mb-1 mt-3 font-bold mmd:text-[1.2rem]" />

            <p className="text-sm text-gray-400">
              {ingredients ? ingredients.map((ingredient) => ingredient.name).join(', ') : ''}
            </p>

            <div className="flex justify-between items-center mt-4">
              <span className="text-[20px] mmd:text-[15px] mmd:mr-3">
                от <b>{price} ₽</b>
              </span>

              <Button variant="secondary" className="text-base font-bold mmd:text-[0.8rem]">
                <Plus size={20} className="mr-1" />
                Добавить
              </Button>
            </div>
          </div>
        </div>
      </Link>
    </>
  );
};
