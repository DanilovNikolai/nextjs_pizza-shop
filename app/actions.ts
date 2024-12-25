'use server';

// psrima
import { prisma } from '@/prisma/prisma-client';
// type
import { OrderStatus } from '@prisma/client';
import { CheckoutFormType } from '@/shared/components/checkout/checkoutFormSchema';
// lib
import { createPayment, sendEmail } from '@/shared/lib';
// next
import { cookies } from 'next/headers';
// components
import { PayOrderEmail } from '@/shared/components/email-templates/PayOrderEmail';

export const createOrder = async (data: CheckoutFormType) => {
  try {
    const cookieStore = cookies(); // вытаскиваем куки с помощью cookies(), т.к. req.cookies в серверных экшенах недоступен (нет доступа к req, resp)
    const cartToken = cookieStore.get('cartToken')?.value;

    if (!cartToken) {
      throw new Error('Cart token not found');
    }

    // Находим корзину по токену
    const userCart = await prisma.cart.findFirst({
      include: {
        user: true,
        items: {
          include: {
            ingredients: true,
            productItem: {
              include: {
                product: true,
              },
            },
          },
        },
      },
      where: {
        token: cartToken,
      },
    });

    // Если корзина не найдена
    if (!userCart) {
      throw new Error('Cart not found');
    }

    // Если сумма заказа равна 0
    if (userCart?.totalAmount === 0) {
      throw new Error('Cart is empty');
    }

    // Создаем заказ в БД
    const order = await prisma.order.create({
      data: {
        fullName: data.firstName + ' ' + data.lastName,
        email: data.email,
        phone: data.phone,
        address: data.address,
        comment: data.comment,
        token: cartToken,
        totalAmount: userCart.totalAmount,
        status: OrderStatus.PENDING,
        items: userCart.items,
      },
    });

    // Очищаем корзину, но не удаляем её саму
    await prisma.cart.update({
      where: {
        id: userCart.id,
      },
      data: {
        totalAmount: 0,
      },
    });

    await prisma.cartItem.deleteMany({
      where: {
        cartId: userCart.id,
      },
    });

    const paymentData = await createPayment({
      amount: order.totalAmount,
      orderId: order.id,
      description: `Оплата заказа #${order.id}`,
    });

    if (!paymentData) {
      throw new Error('Payment data not found');
    }

    await prisma.order.update({
      where: {
        id: order.id,
      },
      data: {
        paymentId: paymentData.id,
      },
    });

    const paymentUrl = paymentData.confirmation.confirmation_url;

    // Отправляем email о сделанном заказе с помощью сервиса Resend.com
    await sendEmail(
      data.email,
      `Next Pizza / Оплатите заказ #${order.id}`,
      PayOrderEmail({
        orderId: order.id,
        totalAmount: order.totalAmount,
        paymentUrl,
      })
    );

    return paymentUrl;
  } catch (error) {
    console.log('[CreateOrder] Server error', error);
  }
};

