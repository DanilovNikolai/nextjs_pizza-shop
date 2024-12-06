// prisma
import { prisma } from '@/prisma/prisma-client';
// lib
import { calcCartItemTotalPrice } from './calcCartItemTotalPrice';

export const updateCartTotalAmount = async (token: string) => {
  // Находим корзину по токену
  const userCart = await prisma.cart.findFirst({
    where: {
      token,
    },
    include: {
      items: {
        orderBy: {
          createdAt: 'desc',
        },
        include: {
          productItem: {
            include: {
              product: true,
            },
          },
          ingredients: true,
        },
      },
    },
  });

  // Если не находим, то не выполняем действия
  if (!userCart) {
    return;
  }

  // Суммируем полные стоимости каждого товара и получаем общую стоимость
  const totalAmount = userCart.items.reduce(
    (total, item) => total + calcCartItemTotalPrice(item),
    0
  );

  // Обновляем корзину с новыми данными (totalAmount) и возвращаем её
  return await prisma.cart.update({
    where: {
      id: userCart.id,
    },
    data: {
      totalAmount,
    },
    include: {
      items: {
        orderBy: {
          createdAt: 'desc',
        },
        include: {
          productItem: {
            include: {
              product: true,
            },
          },
          ingredients: true,
        },
      },
    },
  });
};
