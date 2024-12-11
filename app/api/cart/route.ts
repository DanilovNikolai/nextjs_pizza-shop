// prisma
import { prisma } from '@/prisma/prisma-client';
// next
import { NextRequest, NextResponse } from 'next/server';
// crypto lib
import crypto from 'crypto';
// lib
import { findOrCreateCart } from '@/shared/lib/findOrCreateCart';
import { updateCartTotalAmount } from '@/shared/lib';
// types
import { CreateCartItemValues } from '@/shared/services/dto/cart.dto';

export async function GET(req: NextRequest) {
  try {
    const token = req.cookies.get('cartToken')?.value;

    if (!token) {
      return NextResponse.json({ totalAmount: 0, items: [] });
    }

    // Ищем корзину пользователя в БД либо по userId, либо по token
    const userCart = await prisma.cart.findFirst({
      where: {
        OR: [
          {
            token,
          },
        ],
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

    return NextResponse.json(userCart);
  } catch (error) {
    console.log('[CART_GET] Server error', error);
    return NextResponse.json({ message: 'Не удалось получить корзину' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    let token = req.cookies.get('cartToken')?.value;

    if (!token) {
      token = crypto.randomUUID(); // Генерируем токе с помощью библиотеки crypto
    }

    // Получаем старую корзину или новую созданную
    const userCart = await findOrCreateCart(token);

    const body = (await req.json()) as CreateCartItemValues;

    // Ищем в БД cartItem по параметрам
    const findCartItem = await prisma.cartItem.findFirst({
      where: {
        cartId: userCart.id,
        productItemId: body.productItemId,
        ingredients: { every: { id: { in: body.ingredients } } }, // Каждый id в массиве ингредиентов должен совпадать с id переданного массива
      },
    });

    // Если такой товар в корзине нашелся, то обновляем у него quantity на 1
    if (findCartItem) {
      await prisma.cartItem.update({
        where: {
          id: findCartItem.id,
        },
        data: {
          quantity: findCartItem.quantity + 1,
        },
      });
    } else {
      // Иначе, если идентичного товара в корзине не оказалось, то создаем его
      await prisma.cartItem.create({
        data: {
          cartId: userCart.id,
          productItemId: body.productItemId,
          quantity: 1,
          ingredients: { connect: body.ingredients?.map((id) => ({ id })) },
        },
      });
    }

    // Затем обновляем общую стоимость всех товаров в корзине
    const updatedUserCart = await updateCartTotalAmount(token);

    // Сохраняем ответ сервера в переменную, но не отправляем клиенту
    const response = NextResponse.json(updatedUserCart);

    // Вшиваем токен в ответ сервера
    response.cookies.set('cartToken', token);

    // Теперь всё отправляем клиенту
    return response;
  } catch (error) {
    console.log('[CART_POST] Server error', error);
    return NextResponse.json({ message: 'Не удалось создать корзину' }, { status: 500 });
  }
}
