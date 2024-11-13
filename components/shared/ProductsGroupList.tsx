'use client';

import React, { useEffect, useRef } from 'react';
import { useIntersection } from 'react-use';
import { cn } from '@/lib/utils';
import { ProductCard } from './ProductCard';
import { Title } from './Title';

interface Props {
  className?: string;
  items: any[];
  title: string;
  categoryId: number;
  listClassName?: string;
}

export const ProductsGroupList: React.FC<Props> = ({
  className,
  items,
  title,
  categoryId,
  listClassName,
}) => {
  const intersectionRef = useRef(null);
  const intersection = useIntersection(intersectionRef, {
    threshold: 0.4,
  });

  useEffect(() => {
    if (intersection?.isIntersecting) {
      console.log(title, categoryId);
    }
  }, [categoryId, title, intersection?.isIntersecting]);

  return (
    <div className={className} id={title} ref={intersectionRef}>
      <Title text={title} size="lg" className="font-extrabold mb-5" />

      <div className={cn('grid grid-cols-3 gap-[50px]', listClassName)}>
        {items.map((product, index) => (
          <ProductCard
            key={product.id}
            id={product.id}
            name={product.name}
            imageUrl={product.imageUrl}
            price={product.items[0].price}
          />
        ))}
      </div>
    </div>
  );
};
