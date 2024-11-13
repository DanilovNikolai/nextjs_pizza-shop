// components
import {
  Container,
  Title,
  TopBar,
  Filters,
  ProductsGroupList,
} from '@/components/shared';

import fakeItems from '../fakeItems.json';

export default function Home() {
  return (
    <>
      <Container className="mt-10">
        <Title text="Все пиццы" size="lg" className="font-extrabold" />
      </Container>

      <TopBar />

      <Container className="mt-10 pb-14">
        <div className="flex gap-[80px]">
          {/* Фильтрация */}
          <div className="w-[250px]">
            <Filters />
          </div>

          {/* Список товаров */}
          <div className="flex-1">
            <div className="flex flex-col gap-16">
              <ProductsGroupList
                items={fakeItems}
                title="Пиццы"
                categoryId={1}
              />
            </div>
          </div>
        </div>
      </Container>
    </>
  );
}
