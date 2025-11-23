/**
 * 문자열에서 숫자만 추출하여 안전한 숫자로 변환
 *
 * @param value 숫자가 포함된 문자열 (예: "1,000,000", "123abc", "")
 * @returns 추출된 숫자 (예: 1000000, 123, 0)
 */
export function extractNumber(value: string): number {
  const numbers = value.replace(/[^\d]/g, ''); // 숫자만 추출
  return Number(numbers) || 0;
}

/**
 * 숫자를 천단위 콤마가 포함된 문자열로 포맷팅
 *
 * @param number 포맷팅할 숫자
 * @returns 천단위 콤마가 포함된 문자열 (예: "1,000,000")
 */
export function formatNumber(number: number): string {
  return number.toLocaleString('ko-KR');
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
  return `${formatNumber(minAmount)}원 ~ ${formatNumber(maxAmount)}원`;
}
