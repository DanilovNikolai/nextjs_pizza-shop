'use client';

// shadcn ui
import { Dialog, DialogContent, DialogTitle } from '@/components/ui';
// components
import { ChooseProductForm } from '../';
// types
import { Product } from '@prisma/client';
// cn
import { cn } from '@/lib/utils';
// next
import { useRouter } from 'next/navigation';

interface Props {
  product: Product;
  className?: string;
}

export const ChooseProductModal: React.FC<Props> = ({ product, className }) => {
  const router = useRouter();

  return (
    <Dialog open={Boolean(product)} onOpenChange={() => router.back()}>
      <DialogContent
        aria-describedby={undefined}
        className={cn(
          'p-0 w-[1060px] max-w-[1060px] min-h-[500px] bg-white overflow-hidden',
          className
        )}
      >
        <DialogTitle className="hidden" />
        <ChooseProductForm imageUrl={product.imageUrl} name={product.name} ingredients={[]} />
      </DialogContent>
    </Dialog>
  );
};
