import { prisma } from '@/prisma/prisma-client';
import { authOptions } from '@/shared/constants/auth-options';
import { getServerSession } from 'next-auth/next';
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET(req: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json({ message: 'Вы не авторизованы' }, { status: 401 });
    }

    // Получаем заказы пользователя
    const orders = await prisma.order.findMany({
      where: { userId: Number(session.user.id) },
    });

    if (!orders.length) {
      return NextResponse.json({ message: 'Заказы не найдены' }, { status: 404 });
    }

    return NextResponse.json(orders);
  } catch (error) {
    console.error('[ORDERS_GET] Server error:', error);
    return NextResponse.json({ message: '[ORDERS_GET] Server error' }, { status: 500 });
  }
}
