// next navigation
import { redirect } from 'next/navigation';
// prisma
import { prisma } from '@/prisma/prisma-client';
// components
import { Orders } from '@/shared/components';
// lib
import { getUserSession } from '@/shared/lib/getUserSession';

export default async function OrdersPage() {
  const userSession = await getUserSession(); // Возвращает сессию пользователя, если он авторизован

  // Если пользователь не авторизован, то перенаправляем на страницу /not-auth
  if (!userSession) {
    return redirect('/not-auth');
  }

  const user = await prisma.user.findFirst({
    where: {
      id: Number(userSession?.id),
    },
  });

  if (!user) {
    return redirect('/not-auth');
  }

  return <Orders data={user} className="mmd:w-full my-5" />;
}
