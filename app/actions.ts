'use server';

// psrima
import { prisma } from '@/prisma/prisma-client';
// type
import { CheckoutFormType } from '@/shared/components/checkout/checkoutFormSchema';
import { OrderStatus } from '@prisma/client';

export const createOrder = async (data: CheckoutFormType) => {
  console.log(data);

  const token = '123';

  await prisma.order.create({
    data: {
      token,
      totalAmount: 1500,
      status: OrderStatus.PENDING,
      items: [],
      fullName: data.firstName + ' ' + data.lastName,
      email: data.email,
      phone: data.phone,
      address: data.address,
      comment: data.comment,
    },
  });
};
