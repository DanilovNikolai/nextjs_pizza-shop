'use client';

import { useEffect } from 'react';
// react-intersection-observer
import { useInView } from 'react-intersection-observer';
// cn
import { cn } from '@/shared/lib/utils';
// components
import { ProductCard, Title } from '.';
// zustand store
import { useCategoryStore } from '@/shared/store/category';
// prisma
import { ProductWithRelations } from '@/@types/prisma';
// custom hooks
import { useIsSmallLaptopScreen } from '../hooks';

interface Props {
  items: ProductWithRelations[];
  title: string;
  categoryId: number;
  listClassName?: string;
  className?: string;
}

export const ProductsGroupList: React.FC<Props> = ({
  className,
  items,
  title,
  categoryId,
  listClassName,
}) => {
  const { setActiveId } = useCategoryStore();
  const isSmallLaptopScreen = useIsSmallLaptopScreen();

  const { ref, inView } = useInView({
    rootMargin: '-120px 0px 0px 0px',
  });

  useEffect(() => {
    if (inView) {
      setActiveId(categoryId);
    }
  }, [inView, categoryId]);

  return (
    <div className={cn('scroll-offset', className)} id={title} ref={ref}>
      <Title text={title} size="lg" className="font-extrabold mb-5 mmd:mb-2" />

      <div
        className={cn(
          'grid grid-cols-3 gap-[40px] mmd:grid-cols-1 mmd:gap-4 items-stretch',
          { 'grid-cols-2': isSmallLaptopScreen },
          listClassName
        )}
      >
        {items.map((product) => (
          <ProductCard
            key={product.id}
            id={product.id}
            name={product.name}
            imageUrl={product.imageUrl}
            description={product.description}
            price={product.variants[0].price}
            ingredients={product.ingredients}
          />
        ))}
      </div>
    </div>
  );
};
