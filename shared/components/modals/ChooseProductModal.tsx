'use client';

// next
import { useRouter } from 'next/navigation';
// shadcn ui
import { Dialog, DialogContent, DialogTitle } from '@/shared/components/ui';
// components
import { ProductForm } from '..';
// cn
import { cn } from '@/shared/lib/utils';
// types
import { ProductWithRelations } from '@/@types/prisma';

interface Props {
  product: ProductWithRelations;
  className?: string;
}

export const ChooseProductModal: React.FC<Props> = ({ product, className }) => {
  const router = useRouter();

  return (
    <Dialog open={Boolean(product)} onOpenChange={() => router.back()}>
      <DialogContent
        aria-describedby={undefined}
        className={cn(
          'p-0 w-[1060px] max-w-[1060px] min-h-[550px] bg-white overflow-hidden',
          className
        )}
      >
        <DialogTitle className="hidden" />
        <ProductForm product={product} onSubmit={() => router.back()} />
      </DialogContent>
    </Dialog>
  );
};
