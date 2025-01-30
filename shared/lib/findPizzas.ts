import { prisma } from '@/prisma/prisma-client';

export interface GetSearchParams {
  query?: string;
  sortBy?: 'name' | 'price';
  orderBy?: 'asc' | 'desc';
  pizzaSizes?: string;
  pizzaTypes?: string;
  ingredients?: string;
  priceFrom?: string;
  priceTo?: string;
}

const DEFAULT_MIN_PRICE = 0;
const DEFAULT_MAX_PRICE = 1000;

export const findPizzas = async (params: GetSearchParams) => {
  const pizzaSizesArray = params.pizzaSizes?.split(',').map(Number);
  const pizzaTypesArray = params.pizzaTypes?.split(',').map(Number);
  const ingredientsArray = params.ingredients?.split(',').map(Number);

  const minPrice = Number(params.priceFrom) || DEFAULT_MIN_PRICE;
  const maxPrice = Number(params.priceTo) || DEFAULT_MAX_PRICE;

  // Определяем порядок сортировки
  const sortBy = params.sortBy || 'name';
  const orderBy = params.orderBy || 'asc';

  // Получаем данные без сортировки по цене (это будет сделано позже)
  const filteredProducts = await prisma.category.findMany({
    include: {
      products: {
        where: {
          ingredients: ingredientsArray?.length
            ? {
                some: {
                  id: {
                    in: ingredientsArray,
                  },
                },
              }
            : undefined,
          variants: {
            some: {
              pizzaSize: pizzaSizesArray?.length ? { in: pizzaSizesArray } : undefined,
              pizzaType: pizzaTypesArray?.length ? { in: pizzaTypesArray } : undefined,
              price: {
                gte: minPrice,
                lte: maxPrice,
              },
            },
          },
        },
        include: {
          ingredients: true,
          variants: {
            where: {
              price: {
                gte: minPrice,
                lte: maxPrice,
              },
            },
          },
        },
        orderBy: sortBy === 'name' ? { name: orderBy } : undefined,
      },
    },
  });

  // Если сортировка по цене, выполняем сортировку вручную
  if (sortBy === 'price') {
    filteredProducts.forEach((category) => {
      category.products.sort((a, b) => {
        const minPriceA = Math.min(...a.variants.map((v) => v.price));
        const minPriceB = Math.min(...b.variants.map((v) => v.price));

        return orderBy === 'asc' ? minPriceA - minPriceB : minPriceB - minPriceA;
      });
    });
  }

  return filteredProducts;
};
