import type { SavingsProduct } from 'api/savingsApi';

/**
 * 추천 상품을 필터링하고 정렬하는 함수
 *
 * @param products 전체 적금 상품 목록
 * @param targetAmount 목표 금액
 * @param monthlyAmount 월 납입액
 * @param savingPeriod 저축 기간
 * @returns 조건에 맞는 상품 중 연이자율 상위 2개 상품
 */
export function getRecommendedProducts(
  products: SavingsProduct[],
  targetAmount: number,
  monthlyAmount: number,
  savingPeriod: number
): SavingsProduct[] {
  // 입력 조건에 맞는 상품 필터링
  const validProducts = products.filter(product => {
    const isValidMonthlyAmount =
      monthlyAmount === 0 || (product.minMonthlyAmount <= monthlyAmount && monthlyAmount <= product.maxMonthlyAmount);

    const isValidTerm = savingPeriod === 0 || product.availableTerms === savingPeriod;

    return isValidMonthlyAmount && isValidTerm;
  });

  // 연이자율 내림차순으로 정렬하고 상위 2개 반환
  return validProducts.sort((a, b) => b.annualRate - a.annualRate).slice(0, 2);
}

/**
 * 추천 상품을 표시할 수 있는지 확인하는 함수
 *
 * @param targetAmount 목표 금액
 * @param monthlyAmount 월 납입액
 * @param savingPeriod 저축 기간
 * @returns 추천 상품 표시 가능 여부
 */
export function canShowRecommendedProducts(targetAmount: number, monthlyAmount: number, savingPeriod: number): boolean {
  return targetAmount > 0 && monthlyAmount > 0 && savingPeriod > 0;
}
