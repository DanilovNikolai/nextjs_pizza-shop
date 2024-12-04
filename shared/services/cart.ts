// prisma types
import { Cart } from '@prisma/client';
// axios
import { axiosInstance } from './axios';

export const fetchCart = async (): Promise<Cart> => {
  const { data } = await axiosInstance.get<Cart>('/cart');

  return data;
};
