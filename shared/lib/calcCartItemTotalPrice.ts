import { CartItemDTO } from '../services/dto/cart.dto';

export const calcCartItemTotalPrice = (item: CartItemDTO): number => {
  const ingredientsTotalPrice = item.ingredients.reduce(
    (total, ingredient) => total + ingredient.price,
    0
  );

  return (item.productItem.price + ingredientsTotalPrice) * item.quantity;
};
