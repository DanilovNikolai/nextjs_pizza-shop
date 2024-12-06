// prisma
import { prisma } from '@/prisma/prisma-client';

export const findOrCreateCart = async (token: string) => {
  // Ищем в БД корзину по токену
  let userCart = await prisma.cart.findFirst({
    where: {
      token,
    },
  });

  // Если корзины нет, то создаем её и вшиваем токен
  if (!userCart) {
    userCart = await prisma.cart.create({
      data: {
        token,
      },
    });
  }

  return userCart;
};
