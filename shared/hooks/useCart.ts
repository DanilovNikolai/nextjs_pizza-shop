import { useEffect } from 'react';
// zustand
import { useCartStore } from '../store';
// types
import { CreateCartItemValues } from '../services/dto/cart.dto';
import { CartStateItem } from '../lib/getCartDetails';

type ReturnProps = {
  totalAmount: number;
  items: CartStateItem[];
  loading: boolean;
  updateItemQuantity: (id: number, quantity: number) => void;
  removeCartItem: (id: number) => void;
  addCartItem: (values: CreateCartItemValues) => void;
};

export const useCart = (): ReturnProps => {
  const items = useCartStore((state) => state.items);
  const totalAmount = useCartStore((state) => state.totalAmount);
  const loading = useCartStore((state) => state.loading);
  const fetchCartItems = useCartStore((state) => state.fetchCartItems);
  const updateItemQuantity = useCartStore((state) => state.updateItemQuantity);
  const removeCartItem = useCartStore((state) => state.removeCartItem);
  const addCartItem = useCartStore((state) => state.addCartItem);

  useEffect(() => {
    fetchCartItems();
  }, [fetchCartItems]);

  return {
    items,
    totalAmount,
    loading,
    updateItemQuantity,
    removeCartItem,
    addCartItem,
  };
};
