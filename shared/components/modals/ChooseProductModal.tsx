'use client';

// next
import { useRouter } from 'next/navigation';
// shadcn ui
import {
  Dialog,
  DialogContent,
  DialogTitle,
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTitle,
} from '@/shared/components/ui';
// components
import { ProductForm } from '..';
// hooks
import { useIsMobile } from '@/shared/hooks';
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
  const isMobile = useIsMobile(); // Определяем мобильный режим

  if (!product) return null;

  // Если мобильный экран — рендерим Drawer
  if (isMobile) {
    return (
      <Sheet open={Boolean(product)} onOpenChange={() => router.back()}>
        <SheetDescription className="hidden" />
        <SheetContent
          side="top"
          className={cn('w-full h-full bg-white overflow-y-auto', className)}
        >
          <SheetTitle className="hidden" />
          <ProductForm product={product} onSubmit={() => router.back()} />
        </SheetContent>
      </Sheet>
    );
  }

  // Для десктопов — используем модальное окно
  return (
    <Dialog open={Boolean(product)} onOpenChange={() => router.back()}>
      <DialogContent
        aria-describedby={undefined}
        className={cn(
          'p-0 w-[90%] max-w-[1060px] max-h-[80%] bg-white overflow-hidden',
          className
        )}
      >
        <DialogTitle className="hidden" />
        <ProductForm product={product} onSubmit={() => router.back()} />
      </DialogContent>
    </Dialog>
  );
};
