// components
import {
  Container,
  Title,
  TopBar,
  Filters,
  ProductCard,
} from '@/components/shared';

export default function Home() {
  return (
    <>
      <Container className="mt-10">
        <Title text="Все пиццы" size="lg" className="font-extrabold" />
      </Container>

      <TopBar />

      <Container className="mt-10 pb-14">
        <div className="flex gap-[60px]">
          {/* Фильтрация */}
          <div className="w-[250px]">
            <Filters />
          </div>

          {/* Список товаров */}
          <div className="flex-1">
            <div className="flex flex-col gap-16">
              <ProductCard
                id={0}
                name={'Цыпленок барбекю'}
                price={500}
                imageUrl={
                  'https://media.dodostatic.net/image/r:292x292/11EE7D6110059795842D40396BCF1E73.avif'
                }
              />
              <ProductCard
                id={1}
                name={'Цыпленок барбекю'}
                price={500}
                imageUrl={
                  'https://media.dodostatic.net/image/r:292x292/11EE7D6110059795842D40396BCF1E73.avif'
                }
              />
              <ProductCard
                id={2}
                name={'Цыпленок барбекю'}
                price={500}
                imageUrl={
                  'https://media.dodostatic.net/image/r:292x292/11EE7D6110059795842D40396BCF1E73.avif'
                }
              />
            </div>
          </div>
        </div>
      </Container>
    </>
  );
}
