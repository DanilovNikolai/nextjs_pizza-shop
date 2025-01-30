import { Suspense } from 'react';
// components
import { Container, TopBar, Filters, ProductsGroupList, Stories } from '@/shared/components';
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
      <TopBar categories={filterResult.filter((result) => result.products.length > 0)} />

      <Stories />

      <Container className="mt-10 pb-14">
        <div className="flex gap-[80px] mmd:flex-col mmd:gap-0 mmd:w-full">
          {/* Фильтрация */}
          <div className="w-[250px]">
            <Suspense>
              <Filters />
            </Suspense>
          </div>

          {/* Список товаров */}
          <div className="flex-1">
            <div className="flex flex-col gap-16 mmd:gap-5">
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
