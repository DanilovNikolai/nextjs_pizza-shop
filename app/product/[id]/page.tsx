// prisma
import { prisma } from '@/prisma/prisma-client';
// container
import { Container, ProductImage } from '@/components/shared';
// next
import { notFound } from 'next/navigation';

interface ProductPageProps {
  params: {
    id: string;
  };
}

export default async function ProductPage({ params: { id } }: ProductPageProps) {
  const product = await prisma.product.findFirst({
    where: {
      id: Number(id),
    },
  });

  if (!product) {
    return notFound();
  }

  return (
    <Container className="flex flex-col my-10">
      <ProductImage imageUrl={product.imageUrl} size={20}/>
    </Container>
  );
}
