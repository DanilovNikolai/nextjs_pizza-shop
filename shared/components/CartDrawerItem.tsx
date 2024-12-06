'use client';

// cn
import { cn } from '../lib/utils';
// components
import * as CartItem from './cart-item-details';
// types
import { CartItemProps } from './cart-item-details/CartItemDetails.types';
// lucide
import { Trash2Icon } from 'lucide-react';

interface Props extends CartItemProps {
  onClickCountButton?: (type: 'plus' | 'minus') => void;
  onClickRemove?: () => void;
  className?: string;
}

export const CartDrawerItem: React.FC<Props> = ({
  name,
  imageUrl,
  price,
  quantity,
  details,
  onClickCountButton,
  onClickRemove,
  className,
}) => {
  return (
    <div className={cn('flex bg-white p-5 gap-6', className)}>
      <CartItem.Image src={imageUrl} />

      <div className="flex-1">
        <CartItem.Info name={name} details={details} />

        <hr className="my-3" />

        <div className="flex items-center justify-between">
          <CartItem.CountButton onClick={onClickCountButton} value={quantity} />

          <div className="flex items-center gap-3">
            <CartItem.Price value={price} />
            <Trash2Icon
              className="text-gray-400 cursor-pointer hover:text-gray-600"
              size={16}
              onClick={onClickRemove}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
