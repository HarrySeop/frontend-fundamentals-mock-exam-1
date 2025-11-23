import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { SavingsProduct } from 'api/savingsApi';

// 계산기 스토어 상태 타입 정의
interface CalculatorState {
  targetAmount: number;
  monthlyAmount: number;
  savingPeriod: number;
  selectedProduct: SavingsProduct | null;
}

// 계산기 스토어 액션 타입 정의
interface CalculatorActions {
  setTargetAmount: (amount: number) => void;
  setMonthlyAmount: (amount: number) => void;
  setSavingPeriod: (period: number) => void;
  setSelectedProduct: (product: SavingsProduct | null) => void;
  resetForm: () => void;
}

// 전체 스토어 타입
type CalculatorStore = CalculatorState & CalculatorActions;

const initialState: CalculatorState = {
  targetAmount: 0,
  monthlyAmount: 0,
  savingPeriod: 12,
  selectedProduct: null,
};

export const useCalculatorStore = create<CalculatorStore>()(
  persist(
    set => ({
      ...initialState,

      setTargetAmount: (amount: number) => set({ targetAmount: amount }),

      setMonthlyAmount: (amount: number) => set({ monthlyAmount: amount }),

      setSavingPeriod: (period: number) => set({ savingPeriod: period }),

      setSelectedProduct: (product: SavingsProduct | null) => set({ selectedProduct: product }),

      resetForm: () =>
        set({
          targetAmount: 0,
          monthlyAmount: 0,
          savingPeriod: 12,
          selectedProduct: null,
        }),
    }),
    {
      name: 'calculator-storage',
      partialize: state => ({
        targetAmount: state.targetAmount,
        monthlyAmount: state.monthlyAmount,
        savingPeriod: state.savingPeriod,
      }),
    }
  )
);
