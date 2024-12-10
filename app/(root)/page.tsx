import { Suspense } from 'react';
// components
import { Container, Title, TopBar, Filters, ProductsGroupList } from '@/shared/components';
// lib
import { findPizzas, GetSearchParams } from '@/shared/lib/findPizzas';

interface HomeProps {
  searchParams: GetSearchParams;
}

export default async function Home({ searchParams }: HomeProps) {
  // Фильтрация продуктов
  const filterResult = await findPizzas(searchParams);

  return (
    <>
      <Container className="mt-10">
        <Title text="Все пиццы" size="lg" className="font-extrabold" />
      </Container>

      <TopBar categories={filterResult.filter((result) => result.products.length > 0)} />

      <Container className="mt-10 pb-14">
        <div className="flex gap-[80px]">
          {/* Фильтрация */}
          <div className="w-[250px]">
            <Suspense>
              <Filters />
            </Suspense>
          </div>

          {/* Список товаров */}
          <div className="flex-1">
            <div className="flex flex-col gap-16">
              {filterResult.map(
                (result) =>
                  result.products.length > 0 && (
                    <ProductsGroupList
                      key={result.id}
                      categoryId={result.id}
                      title={result.name}
                      items={result.products}
                    />
                  )
              )}
            </div>
          </div>
        </div>
      </Container>
    </>
  );
}
