// prisma
import { prisma } from '@/prisma/prisma-client';
// lib
import { updateCartTotalAmount } from '@/shared/lib';
// next
import { NextRequest, NextResponse } from 'next/server';

type Params = {
  params: {
    id: string;
  };
};

export async function PATCH(req: NextRequest, { params }: Params) {
  try {
    const body = (await req.json()) as { quantity: number }; // Сохраняем тело запроса клиента в body
    const token = req.cookies.get('cartToken')?.value; // Ищем токен в cookie и сохраняем в token

    if (!token) {
      return NextResponse.json({ error: 'Cart token not found' });
    }

    // Находим товар в корзине по id
    const cartItem = await prisma.cartItem.findFirst({
      where: {
        id: Number(params.id),
      },
    });

    // Если не находим товар, то возвращаем клиенту текст с ошибкой
    if (!cartItem) {
      return NextResponse.json({ error: 'Cart item not found' });
    }

    // Для найденного товара в корзине обновляем переданные клиентом данные по его количеству
    await prisma.cartItem.update({
      where: {
        id: Number(params.id),
      },
      data: {
        quantity: body.quantity,
      },
    });

    // И затем обновляем общую стоимость всех товаров в корзине
    const updatedUserCart = await updateCartTotalAmount(token);

    // Возвращаем обновленную корзину клиенту
    return NextResponse.json(updatedUserCart);
  } catch (error) {
    console.log('[CART_PATCH] Server error', error);
    return NextResponse.json({ message: 'Не удалось обновить корзину' }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest, { params }: Params) {
  try {
    const token = req.cookies.get('cartToken')?.value; // Ищем токен в cookie и сохраняем в token

    if (!token) {
      return NextResponse.json({ error: 'Cart token not found' });
    }

    // Находим товар в корзине по id
    const cartItem = await prisma.cartItem.findFirst({
      where: {
        id: Number(params.id),
      },
    });

    // Если не находим товар, то возвращаем клиенту текст с ошибкой
    if (!cartItem) {
      return NextResponse.json({ error: 'Cart item not found' });
    }

    // Удаляем найденный товар из корзины
    await prisma.cartItem.delete({
      where: {
        id: Number(params.id),
      },
    });

    // И затем обновляем общую стоимость всех товаров в корзине
    const updatedUserCart = await updateCartTotalAmount(token);

    // Возвращаем обновленную корзину клиенту
    return NextResponse.json(updatedUserCart);
  } catch (error) {
    console.log('[CART_DELETE] Server error', error);
    return NextResponse.json({ message: 'Не удалось удалить товар' }, { status: 500 });
  }
}
