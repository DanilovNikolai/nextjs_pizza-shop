import { useEffect, useRef } from 'react';
// qs lib
import qs from 'qs';
// types
import { Filters } from './useFilters';
// next
import { useRouter, useSearchParams } from 'next/navigation';

export const useFilterQueryParams = (filters: Filters): void => {
  const isMounted = useRef(false);
  const searchParams = useSearchParams();
  const router = useRouter();

  // Генерирует query string в url на основе выбранных фильтров
  useEffect(() => {
    // При первом рендере пропускаем это действие, т.к. isMounted.current = false
    // При втором и последующих рендерах действие выполняется
    const currentParams = qs.parse(searchParams.toString());

    if (isMounted.current) {
      const queryParams = {
        ...filters.prices,
        pizzaTypes: Array.from(filters.pizzaTypes),
        pizzaSizes: Array.from(filters.pizzaSizes),
        ingredients: Array.from(filters.selectedIngredients),
      };

      const queryString = qs.stringify(
        { ...currentParams, ...queryParams },
        {
          arrayFormat: 'comma',
        }
      );

      router.push(`?${queryString}`, {
        scroll: false,
      });
    }

    isMounted.current = true;
  }, [filters, router]);
};
