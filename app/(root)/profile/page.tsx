import { getUserSession } from '@/shared/lib/getUserSession';
import { redirect } from 'next/navigation';

export default async function ProfilePage() {
  const userSession = await getUserSession();

  if (!userSession) {
    return redirect('/not-auth');
  }

  return <div>ЭТО ТВОЙ ПРОФИЛЬ</div>;
}
