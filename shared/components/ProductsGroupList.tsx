'use client';

import { useEffect, useRef } from 'react';
// react-use
import { useIntersection } from 'react-use';
// cn
import { cn } from '@/shared/lib/utils';
// components
import { ProductCard, Title } from '.';
// zustand store
import { useCategoryStore } from '@/shared/store/category';
// prisma types
import { ProductWithRelations } from '@/@types/prisma';

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
  const setActiveCategoryId = useCategoryStore((state) => state.setActiveId);
  const intersectionRef = useRef(null);
  const intersection = useIntersection(intersectionRef, {
    threshold: 0.4,
  });

  useEffect(() => {
    if (intersection?.isIntersecting) {
      setActiveCategoryId(categoryId);
    }
  }, [categoryId, intersection?.isIntersecting]);

  return (
    <div className={className} id={title} ref={intersectionRef}>
      <Title text={title} size="lg" className="font-extrabold mb-5" />

      <div className={cn('grid grid-cols-3 gap-[40px] mmd:grid-cols-2 mmd:gap-[20px]', listClassName)}>
        {items.map((product, index) => (
          <ProductCard
            key={product.id}
            id={product.id}
            name={product.name}
            imageUrl={product.imageUrl}
            price={product.variants[0].price}
            ingredients={product.ingredients}
          />
        ))}
      </div>
    </div>
  );
};
