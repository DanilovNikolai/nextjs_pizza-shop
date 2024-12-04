import { create } from 'zustand';
import { Api } from '../services/api-client';

export type ICartItem = {
  id: number;
  quantity: number;
  name: string;
  imageUrl: string;
  price: number;
  pizzaSize?: number | null;
  pizzaType?: number | null;
  ingredients: Array<{ name: string; price: number }>;
};

export interface CartState {
  loading: boolean;
  error: boolean;
  totalAmount: number;
  items: ICartItem[];

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
      const data = Api.cart.fetchCart();
      set(getCartDetails(data));
    } catch (error) {
      console.error(error);
      set({ error: true });
    } finally {
      set({ loading: false });
    }
  },

  updateItemQuantity: async (id: number, quantity: number) => {},

  addCartItem: async (value: any) => {},

  removeCartItem: async (id: number) => {},
}));
