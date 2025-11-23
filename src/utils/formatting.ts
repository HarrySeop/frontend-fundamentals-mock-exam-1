/**
 * 숫자를 천단위 콤마가 포함된 문자열로 포맷팅
 *
 * @param amount 포맷팅할 숫자
 * @returns 천단위 콤마가 포함된 문자열 (예: "1,000,000")
 */
export function formatAmount(amount: number): string {
  return amount.toLocaleString('ko-KR');
}

/**
 * 연이자율을 퍼센트 표시로 포맷팅
 *
 * @param rate 연이자율 숫자 (예: 3.2)
 * @returns 퍼센트 문자열 (예: "3.2%")
 */
export function formatAnnualRate(rate: number): string {
  return `${rate}%`;
}

/**
 * 최소/최대 월납입액을 범위 문자열로 포맷팅
 *
 * @param minAmount 최소 월납입액
 * @param maxAmount 최대 월납입액
 * @returns 범위 문자열 (예: "10,000원 ~ 500,000원")
 */
export function formatMonthlyAmountRange(minAmount: number, maxAmount: number): string {
  return `${formatAmount(minAmount)}원 ~ ${formatAmount(maxAmount)}원`;
}
