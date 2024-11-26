import { useEffect } from "react";
// qs lib
import qs from "qs";
// types
import { Filters } from "./useFilters";
// next
import { useRouter } from 'next/navigation';

export const useFilterQueryParams = (filters: Filters): void => {
  const router = useRouter();

    // Генерирует query string в url на основе выбранных фильтров
    useEffect(() => {
      const queryParams = {
        ...filters.prices,
        pizzaTypes: Array.from(filters.pizzaTypes),
        pizzaSizes: Array.from(filters.pizzaSizes),
        ingredients: Array.from(filters.selectedIngredients),
      };
  
      const queryString = qs.stringify(queryParams, {
        arrayFormat: 'comma',
      });
  
      router.push(`?${queryString}`, {
        scroll: false,
      });
    }, [filters, router]);
};
