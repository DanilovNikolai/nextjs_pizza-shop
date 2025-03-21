import { InfoBlock } from '@/shared/components';

export default function NotAuthPage() {
  return (
    <div className="flex flex-col items-center justify-center mt-40 mmd:mt-5">
      <InfoBlock
        title="Доступ запрещён"
        text="Данную страницу могут просматривать только авторизованные пользователи"
        imageUrl="/assets/images/lock.png"
      />
    </div>
  );
}
