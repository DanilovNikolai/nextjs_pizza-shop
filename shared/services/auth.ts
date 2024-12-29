import { User } from '@prisma/client';
// axios
import { axiosInstance } from './axios';

export const getMe = async () => {
  const { data } = await axiosInstance.get<User>('/auth/me');

  return data;
};
