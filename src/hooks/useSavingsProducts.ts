import { useSuspenseQuery } from '@tanstack/react-query';

import { fetchSavingsProducts } from 'api/savingsApi';
import type { SavingsProduct } from 'api/savingsApi';

// 쿼리 키 상수 정의
const QUERY_KEYS = {
  SAVINGS_PRODUCTS: ['savingsProducts'] as const,
} as const;

/**
 * 적금 상품 목록을 조회하는 커스텀 훅
 *
 * @tanstack/react-query의 useSuspenseQuery를 사용하여
 * 로딩/에러 상태를 전역 Suspense/ErrorBoundary에서 처리
 *
 * @returns SavingsProduct[] - 적금 상품 배열 (항상 정의됨)
 */
export function useSavingsProducts(): SavingsProduct[] {
  const { data } = useSuspenseQuery({
    queryKey: QUERY_KEYS.SAVINGS_PRODUCTS,
    queryFn: fetchSavingsProducts,
  });

  return data;
}

// 쿼리 키 export
export { QUERY_KEYS };
