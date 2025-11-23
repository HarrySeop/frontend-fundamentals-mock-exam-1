import { http, isHttpError } from 'tosslib';

// 적금 상품 타입 정의 (API 응답 구조에 맞춤)
export interface SavingsProduct {
  id: string; // 상품 고유 ID
  name: string; // 상품명
  annualRate: number; // 연이자율 (숫자, 예: 3.2 = 3.2%)
  minMonthlyAmount: number; // 최소 월납입액 (원)
  maxMonthlyAmount: number; // 최대 월납입액 (원)
  availableTerms: number; // 저축기간 (개월)
}

// API 엔드포인트
const API_ENDPOINTS = {
  SAVINGS_PRODUCTS: '/api/savings-products',
} as const;

// 적금 상품 목록 조회 API
export async function fetchSavingsProducts(): Promise<SavingsProduct[]> {
  try {
    const response = await http.get<SavingsProduct[]>(API_ENDPOINTS.SAVINGS_PRODUCTS);
    return response;
  } catch (error) {
    if (isHttpError(error)) {
      throw new Error(`적금 상품을 불러올 수 없습니다: ${error.message}`);
    }
    throw new Error('알 수 없는 오류가 발생했습니다.');
  }
}
