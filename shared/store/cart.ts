// zustand
import { create } from 'zustand';
// api-client
import { Api } from '../services/api-client';
// lib
import { getCartDetails } from '../lib';
// types
import { CartStateItem } from '../lib/getCartDetails';

export interface CartState {
  loading: boolean;
  error: boolean;
  totalAmount: number;
  items: CartStateItem[];

  // Получение товаров из корзины
  fetchCartItems: () => Promise<void>;

  // Запрос на обновление количества товаров
  updateItemQuantity: (id: number, quantity: number) => Promise<void>;

  // Запрос на добавление товара в корзину
  addCartItem: (values: any) => Promise<void>;

  // Запрос на удаление товара из корзины
  removeCartItem: (id: number, quantity: number) => Promise<void>;
}

export const useCartStore = create<CartState>((set, get) => ({
  items: [],
  error: false,
  loading: true,
  totalAmount: 0,

  fetchCartItems: async () => {
    try {
      set({ loading: true, error: false });
      const data = await Api.cart.fetchCart();
      set(getCartDetails(data));
    } catch (error) {
      console.error(error);
      set({ error: true });
    } finally {
      set({ loading: false });
    }
  },

  updateItemQuantity: async (id: number, quantity: number) => {
    // TODO: Implement this method
  },

  addCartItem: async (value: any) => {
    // TODO: Implement this method
  },

  removeCartItem: async (id: number) => {
    // TODO: Implement this method
  },
}));
