// next
import { NextResponse } from 'next/server';
// lib
import { getUserSession } from '@/shared/lib/getUserSession';
// prisma
import { prisma } from '@/prisma/prisma-client';

export async function GET() {
  try {
    const user = await getUserSession();

    if (!user) {
      return NextResponse.json({ message: '[USER_GET] Вы не авторизованы' }, { status: 401 });
    }

    const foundUser = await prisma.user.findUnique({
      where: {
        id: Number(user.id),
      },
      select: {
        fullName: true,
        email: true,
        password: false,
      },
    });

    return NextResponse.json(foundUser);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: '[USER_GET] Server error' }, { status: 500 });
  }
}
