// types
import { PizzaSize, PizzaType } from '@/shared/constants/pizza';
import { CartStateItem } from '@/shared/lib/getCartDetails';
// components
import { CheckoutItem, CheckoutItemSkeleton, WhiteBlock } from '../';
// lib
import { getCartItemDetails } from '@/shared/lib';

interface CheckoutCartProps {
  items: CartStateItem[];
  loading?: boolean;
  removeCartItem: (id: number) => void;
  onClickCountButton?: (id: number, quantity: number, type: 'plus' | 'minus') => void;
  className?: string;
}

export const CheckoutCart: React.FC<CheckoutCartProps> = ({
  items,
  loading,
  removeCartItem,
  onClickCountButton,
  className,
}) => {
  return (
    <WhiteBlock title="1. Корзина" className={className}>
      <div className="flex flex-col gap-5 mmd:gap-2 mmd:w-full">
        {loading
          ? [...Array(3)].map((_, index) => <CheckoutItemSkeleton key={index} />)
          : items.map((item) => (
              <CheckoutItem
                key={item.id}
                id={item.id}
                name={item.name}
                imageUrl={item.imageUrl}
                price={item.price}
                quantity={item.quantity}
                details={getCartItemDetails(
                  item.ingredients,
                  item.pizzaType as PizzaType,
                  item.pizzaSize as PizzaSize
                )}
                disabled={item.disabled}
                onClickCountButton={(type) => onClickCountButton?.(item.id, item.quantity, type)}
                onClickRemove={() => removeCartItem(item.id)}
              />
            ))}
      </div>
    </WhiteBlock>
  );
};
