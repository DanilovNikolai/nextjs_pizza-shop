// cn
import { cn } from '@/shared/lib/utils';

interface Props {
  name: string;
  details: string;
  className?: string;
}

export const CartItemInfo: React.FC<Props> = ({ name, details, className }) => {
  return (
    <div>
      <div className={cn('flex items-center justify-between', className)}>
        <h2 className="text-lg font-bold flex-1 leading-6 mmd:text-[1rem]">{name}</h2>
      </div>
      {details && <p className="text-xs text-gray-400 pr-6 mmd:pr-3">{details}</p>}
    </div>
  );
};
