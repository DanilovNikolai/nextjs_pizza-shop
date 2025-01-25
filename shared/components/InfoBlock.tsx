// cn
import { cn } from '@/shared/lib/utils';
// next
import Link from 'next/link';
// shadcn ui
import { Button } from './ui';
// lucide
import { ArrowLeft } from 'lucide-react';
// components
import { Title } from './';

interface Props {
  title: string;
  text: string;
  className?: string;
  imageUrl?: string;
}

export const InfoBlock: React.FC<Props> = ({ className, title, text, imageUrl }) => {
  return (
    <div
      className={cn(
        className,
        'flex items-center justify-between w-max-[840px] px-10 gap-12 mmd:flex-col-reverse mmd:px-7 mmd:gap-10'
      )}
    >
      <div className="flex flex-col">
        <div className="w-[445px] mmd:w-[90%]">
          <Title size="lg" text={title} className="font-extrabold" />
          <p className="text-gray-400 text-lg">{text}</p>
        </div>

        <div className="flex gap-5 mt-11">
          <Link href="/">
            <Button variant="outline" className="gap-2">
              <ArrowLeft />
              На главную
            </Button>
          </Link>
          <a href="">
            <Button variant="outline" className="text-gray-500 border-gray-400 hover:bg-gray-50">
              Обновить
            </Button>
          </a>
        </div>
      </div>

      <img src={imageUrl} alt={title} width={300} className="mmd:w-[50%]" />
    </div>
  );
};
