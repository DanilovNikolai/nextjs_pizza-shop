import { prisma } from '@/prisma/prisma-client';

export interface GetSearchParams {
  query?: string;
  sortBy?: string;
  pizzaSizes?: string;
  pizzaTypes?: string;
  ingredients?: string;
  priceFrom?: string;
  priceTo?: string;
}

// export interface GetSearchParams {
//   [key: string]: string | undefined;
// }

const DEFAULT_MIN_PRICE = 0;
const DEFAULT_MAX_PRICE = 1000;

export const findPizzas = async (params: GetSearchParams) => {
  const pizzaSizesArray = params.pizzaSizes?.split(',').map(Number);
  const pizzaTypesArray = params.pizzaTypes?.split(',').map(Number);
  const ingredientsArray = params.ingredients?.split(',').map(Number);

  const minPrice = Number(params.priceFrom) || DEFAULT_MIN_PRICE;
  const maxPrice = Number(params.priceTo) || DEFAULT_MAX_PRICE;

  const categories = await prisma.category.findMany({
    include: {
      products: {
        orderBy: {
          id: 'desc',
        },
        where: {
          ingredients: ingredientsArray
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
              pizzaSize: {
                in: pizzaSizesArray,
              },
              pizzaType: {
                in: pizzaTypesArray,
              },
            },
          },
        },
        include: {
          ingredients: true,
          variants: true,
        },
      },
    },
  });

  return categories;
};
