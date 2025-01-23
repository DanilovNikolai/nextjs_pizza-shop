// prisma
import { prisma } from '@/prisma/prisma-client';
// container
import { Container, ProductForm } from '@/shared/components';
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
    include: {
      ingredients: true,
      category: {
        include: {
          products: {
            include: {
              variants: true,
            },
          },
        },
      },
      variants: {
        orderBy: {
          createdAt: 'desc',
        },
      },
    },
  });

  if (!product) {
    return notFound();
  }

  return (
    <Container className="flex flex-col my-10 mmd:my-0 mmd:px-0">
      <ProductForm product={product} />
    </Container>
  );
}
