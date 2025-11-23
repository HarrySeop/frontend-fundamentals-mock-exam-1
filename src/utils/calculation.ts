import type { SavingsProduct } from 'api/savingsApi';

export interface CalculationResult {
  expectedReturn: number;
  goalDifference: number;
  recommendedMonthlyAmount: number;
}

/**
 * 적금 계산 결과를 계산하는 함수
 *
 * @param targetAmount 목표 금액
 * @param monthlyAmount 월 납입액
 * @param savingPeriod 저축 기간 (개월)
 * @param product 선택된 적금 상품
 * @returns 계산 결과 (예상 수익, 목표 차이, 추천 납입액)
 */
export function calculateSavingsResult(
  targetAmount: number,
  monthlyAmount: number,
  savingPeriod: number,
  product: SavingsProduct
): CalculationResult {
  // 예상 수익 계산: 월납입액 × 저축기간 × (1 + 연이자율 × 0.5)
  const expectedReturn = monthlyAmount * savingPeriod * (1 + product.annualRate * 0.01 * 0.5);

  // 목표 금액과의 차이: 목표금액 - 예상수익
  const goalDifference = targetAmount - expectedReturn;

  // 추천 월 납입액: 목표금액 ÷ (저축기간 × (1 + 연이자율 × 0.5)) → 1,000원 단위 반올림
  const rawRecommendedAmount = targetAmount / (savingPeriod * (1 + product.annualRate * 0.01 * 0.5));
  const recommendedMonthlyAmount = Math.round(rawRecommendedAmount / 1000) * 1000;

  return {
    expectedReturn: Math.round(expectedReturn),
    goalDifference: Math.round(goalDifference),
    recommendedMonthlyAmount,
  };
}

/**
 * 입력값이 계산 가능한지 검증하는 함수
 *
 * @param targetAmount 목표 금액
 * @param monthlyAmount 월 납입액
 * @param savingPeriod 저축 기간
 * @param selectedProduct 선택된 상품
 * @returns 계산 가능 여부
 */
export function canCalculate(
  targetAmount: number,
  monthlyAmount: number,
  savingPeriod: number,
  selectedProduct: SavingsProduct | null
): boolean {
  return targetAmount > 0 && monthlyAmount > 0 && savingPeriod > 0 && selectedProduct !== null;
}
