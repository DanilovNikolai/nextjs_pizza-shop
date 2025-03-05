import { Order } from '@prisma/client';
import { axiosInstance } from './axios';

export const getAll = async () => {
  const { data } = await axiosInstance.get<Order[]>('/orders');

  return data;
};
