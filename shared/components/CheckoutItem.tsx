'use client';

// cn
import { cn } from '@/shared/lib/utils';
// lucide
import { Trash2 } from 'lucide-react';
// components
import * as CartItemDetails from './cart-item-details';
// types
import { CartItemProps } from './cart-item-details/CartItemDetails.types';

interface Props extends CartItemProps {
  onClickCountButton?: (type: 'plus' | 'minus') => void;
  onClickRemove?: () => void;
  className?: string;
}

export const CheckoutItem: React.FC<Props> = ({
  name,
  price,
  imageUrl,
  quantity,
  details,
  disabled,
  className,
  onClickCountButton,
  onClickRemove,
}) => {
  return (
    <div
      className={cn(
        'flex items-center justify-between py-4 border-b border-gray-300 last:border-b-0 mmd:py-2 mmd:relative',
        { 'opacity-50 pointer-events-none': disabled },
        className
      )}
    >
      <div className="flex flex-1 mmd:flex-col mmd:items-start">
        <div className="flex items-center gap-5 flex-1">
          <CartItemDetails.Image src={imageUrl} className="w-16 h-16 object-cover mmd:ml-[6px]" />
          <CartItemDetails.Info name={name} details={details} />
        </div>

        <div className="flex items-center gap-5 ml-10 mmd:ml-0">
          <CartItemDetails.Price
            value={price}
            className="text-lg font-bold mmd:text-sm mmd:absolute mmd:bottom-2 mmd:right-0"
          />

          <CartItemDetails.CountButton
            onClick={onClickCountButton}
            value={quantity}
            className="flex items-center gap-2"
          />

          <button type="button" onClick={onClickRemove}>
            <Trash2
              className="text-gray-400 cursor-pointer hover:text-gray-600 mmd:size-4 mmd:absolute mmd:top-0 mmd:right-0"
              size={20}
            />
          </button>
        </div>
      </div>
    </div>
  );
};
