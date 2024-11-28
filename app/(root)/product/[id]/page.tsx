// prisma
import { prisma } from '@/prisma/prisma-client';
// container
import { Container, ProductImage, Title, ItemVariantsSelector } from '@/components/shared';
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
      <div className="flex flex-1">
        <ProductImage imageUrl={product.imageUrl} size={30} />

        <div className="w-[490-px] bg-[#f9f9f9] p-7">
          <Title text={product.name} size="md" className="font-extrabold mb-1" />

          <p className="text-gray-400">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Error, porro?
          </p>
          <ItemVariantsSelector
            selectedValue="2"
            items={[
              {
                name: 'Маленькая',
                value: '1',
              },
              {
                name: 'Средняя',
                value: '2',
              },
              {
                name: 'Большая',
                value: '3',
                disabled: true,
              },
            ]}
          />
          <ItemVariantsSelector
            items={[
              {
                name: 'Традиционное тесто',
                value: '1',
              },
              {
                name: 'Тонкое тесто',
                value: '2',
              },
            ]}
          />
        </div>
      </div>
    </Container>
  );
}
