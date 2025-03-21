import { ReactNode } from 'react';
// cn
import { cn } from '../lib/utils';

interface Props {
  title?: ReactNode;
  value?: ReactNode;
  className?: string;
}

export const CheckoutItemDetails: React.FC<Props> = ({ title, value, className }) => {
  return (
    <div className={cn('flex my-4', className)}>
      <div className="flex flex-1 text-lg text-neutral-500">
        {title}
        <div className="flex-1 border-b border-dashed border-b-neutral-200 relative -top-1 mx-2"></div>
      </div>

      <span className="font-bold text-lg">{value}</span>
    </div>
  );
};
