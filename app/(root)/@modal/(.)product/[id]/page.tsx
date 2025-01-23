// components
import { ChooseProductModal } from '@/shared/components';
// prisma
import { prisma } from '@/prisma/prisma-client';
// next
import { notFound } from 'next/navigation';

interface ProductPageProps {
  params: {
    id: string;
  };
}

export default async function ProductModalPage({ params: { id } }: ProductPageProps) {
  const product = await prisma.product.findFirst({
    where: {
      id: Number(id),
    },
    include: {
      ingredients: true,
      variants: true,
    },
  });

  if (!product) {
    return notFound();
  }

  return <ChooseProductModal product={product} className='mmd:p-0'/>;
}
