import { NextRequest, NextResponse } from 'next/server';
// types
import { PaymentCallbackData } from '@/@types/yookassa';
import { CartItemDTO } from '@/shared/services/dto/cart.dto';
// prisma
import { prisma } from '@/prisma/prisma-client';
import { OrderStatus } from '@prisma/client';
// lib
import { sendEmail } from '@/shared/lib';
// components
import { OrderSuccessEmail } from '@/shared/components';

export async function POST(req: NextRequest) {
  try {
    // Получаем объект от Юкассы после успешной оплаты
    const body = (await req.json()) as PaymentCallbackData;

    // Находим В БД заказ, который был оплачен, по id оплаченного заказа
    const order = await prisma.order.findFirst({
      where: {
        id: Number(body.object.metadata.order_id),
      },
    });

    // Если такого заказа нет, то ошибка
    if (!order) {
      return NextResponse.json({ error: 'Order not found' });
    }

    const isSucceeded = body.object.status === 'succeeded';

    // Обновляем статус успешного заказа
    await prisma.order.update({
      where: {
        id: order.id,
      },
      data: {
        status: isSucceeded ? OrderStatus.SUCCEEDED : OrderStatus.CANCELLED,
      },
    });

    // Сохраняем товары из успешного заказа в items
    const items = order?.items as unknown as CartItemDTO[];

    // Отправляем на почту клиента письмо об оплате заказа, если заказ был успешно оформлен
    if (isSucceeded) {
      await sendEmail(
        order.email,
        'Next Pizza / Ваш заказ успешно оформлен! 🎉',
        OrderSuccessEmail({ orderId: order.id, items })
      );
    } else {
      //TODO письмо о неуспешной оплате
    }
  } catch (error) {
    console.log('[Checkout Callback] Error:', error);

    return NextResponse.json({ error: 'Server error' });
  }
}
