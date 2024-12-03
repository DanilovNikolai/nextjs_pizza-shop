// cn
import { cn } from '@/shared/lib/utils';

import { mapPizzaType, PizzaSize, PizzaType } from '@/shared/constants/pizza';
import { Ingredient } from '@prisma/client';

interface Props {
  name: string;
  pizzaSize?: PizzaSize;
  pizzaType?: PizzaType;
  ingredients?: Ingredient[];
  className?: string;
}

export const CartItemInfo: React.FC<Props> = ({
  name,
  pizzaSize,
  pizzaType,
  ingredients,
  className,
}) => {
  const details = [];

  if (pizzaSize && pizzaType) {
    details.push(`${mapPizzaType[pizzaType]} тесто, ${pizzaSize} см`);
  }

  if (ingredients) {
    details.push(...ingredients.map((ingredient) => ingredient.name));
  }

  return (
    <div>
      <div className={cn('flex items-center justify-between', className)}>
        <h2 className="text-lg font-bold flex-1 leading-6">{name}</h2>
      </div>
      {details.length > 0 && <p className="text-xs text-gray-400">{details.join(', ')}</p>}
    </div>
  );
};
