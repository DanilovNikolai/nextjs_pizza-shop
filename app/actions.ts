'use server';

// psrima
import { prisma } from '@/prisma/prisma-client';
// types
import { OrderStatus, Prisma } from '@prisma/client';
import { CheckoutFormType } from '@/shared/components/checkout/checkoutFormSchema';
// lib
import { createPayment, sendEmail } from '@/shared/lib';
// next
import { cookies } from 'next/headers';
// components
import { PayOrderEmail } from '@/shared/components/email-templates/PayOrderEmail';
import { VerificationUserEmail } from '@/shared/components';
// lib
import { getUserSession } from '@/shared/lib/getUserSession';
// bcrypt
import { hashSync } from 'bcrypt';

export async function createOrder(data: CheckoutFormType) {
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
}

export async function updateUserInfo(body: Prisma.UserUpdateInput) {
  try {
    const currentUser = await getUserSession();

    if (!currentUser) {
      throw new Error('Пользователь не найден');
    }

    const foundUser = await prisma.user.findFirst({
      where: {
        id: Number(currentUser.id),
      },
    });

    await prisma.user.update({
      where: {
        id: Number(currentUser.id),
      },
      data: {
        fullName: body.fullName,
        email: body.email,
        password: body.password ? hashSync(body.password as string, 10) : foundUser?.password,
      },
    });
  } catch (error) {
    console.error('[UPDATE_USER] error', error);
    throw error;
  }
}

export async function registerUser(body: Prisma.UserCreateInput) {
  try {
    // Ищем пользователя в БД
    const user = await prisma.user.findFirst({
      where: {
        email: body.email,
      },
    });

    // Если пользователь нашелся, то смотрим подтверждена ли у него почта, если нет, то кидаем ошибку
    if (user) {
      if (!user?.verified) {
        throw new Error('Почта не подтверждена');
      }

      // Если пользователь с верифицированной почтой уже есть, то кидаем ошибку
      throw new Error('Пользователь с таким email уже существует!');
    }

    // Если пользователя такого не нашлось, то создаем его
    const createdUser = await prisma.user.create({
      data: {
        fullName: body.fullName,
        email: body.email,
        password: hashSync(body.password, 10),
      },
    });

    // Далее создаем рандомный код для верификации почты
    const code = Math.floor(100000 + Math.random() * 900000).toString();

    // Создаем запись с кодом в таблице БД для конкретного userId
    await prisma.verificationCode.create({
      data: {
        code,
        userId: createdUser.id,
      },
    });

    // Отправляем письмо с кодом на почту
    await sendEmail(
      createdUser.email,
      `Next Pizza / Подтверждение регистрации`,
      VerificationUserEmail({
        code,
        fullName: createdUser.fullName,
      })
    );
  } catch (error) {
    console.error('[REGISTER_USER] error', error);
    throw error;
  }
}
