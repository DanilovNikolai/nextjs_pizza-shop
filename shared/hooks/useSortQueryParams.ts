'use client';

// next
import { useSearchParams, useRouter } from 'next/navigation';
// qs
import qs from 'qs';
// types
import { SortOption } from '../components/SortPopup';

export const useSortQueryParams = () => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const updateSortParams = ({ sortBy, orderBy }: SortOption) => {
    const currentParams = qs.parse(searchParams.toString());

    const newParams = qs.stringify({
      ...currentParams,
      sortBy,
      orderBy,
    });

    router.push(`?${newParams}`, { scroll: false }); // Обновляем URL без перезагрузки
  };

  return { searchParams, updateSortParams };
};
