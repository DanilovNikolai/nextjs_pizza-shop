import { prisma } from '@/prisma/prisma-client';
import { NextRequest, NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  try {
    // Сохраняем код при переходе по ссылке из письма - /auth/verify?code=${code}
    const code = req.nextUrl.searchParams.get('code');

    // Если кода нет, то ошибка
    if (!code) {
      return NextResponse.json({ error: 'Verification code is not valid' }, { status: 400 });
    }

    // Ищем запись с кодом в таблице БД
    const verificationCode = await prisma.verificationCode.findFirst({
      where: {
        code,
      },
    });

    // Если такой записи нет, то ошибка
    if (!verificationCode) {
      return NextResponse.json({ error: 'Verification code is not valid' }, { status: 400 });
    }

    // Иначе находим в БД пользователя с данным кодом и обновляем поле verified
    await prisma.user.update({
      where: {
        id: verificationCode.userId,
      },
      data: {
        verified: new Date(),
      },
    });

    // Далее удаляем из БД данный код
    await prisma.verificationCode.delete({
      where: {
        id: verificationCode.id,
      },
    });

    // Перенаправляем клиента на страницу /?verified
    return NextResponse.redirect(new URL('/?verified', req.url));
  } catch (error) {
    console.error(error);
    console.log('[VERIFY_GET] Server error', error);
  }
}
