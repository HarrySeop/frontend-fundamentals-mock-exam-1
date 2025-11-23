import { useMemo, useState } from 'react';
import { Assets, Border, colors, ListRow, NavigationBar, SelectBottomSheet, Spacing, Tab, TextField } from 'tosslib';

import { useSavingsProducts } from 'hooks/useSavingsProducts';
import { extractNumber, formatNumber, formatAnnualRate, formatMonthlyAmountRange } from 'utils/formatting';
import { useCalculatorStore } from 'stores';
import type { SavingsProduct } from 'api/savingsApi';

export function SavingsCalculatorPage() {
  const [activeTab, setActiveTab] = useState<'products' | 'results'>('products');
  const savingsProducts = useSavingsProducts();

  const {
    targetAmount,
    monthlyAmount,
    savingPeriod,
    selectedProduct,
    setTargetAmount,
    setMonthlyAmount,
    setSavingPeriod,
    setSelectedProduct,
  } = useCalculatorStore();

  const filteredProducts = useMemo(() => {
    return savingsProducts.filter(product => {
      const isValidMonthlyAmount =
        monthlyAmount === 0 || (product.minMonthlyAmount <= monthlyAmount && monthlyAmount <= product.maxMonthlyAmount);

      const isValidTerm = savingPeriod === 0 || product.availableTerms === savingPeriod;

      return isValidMonthlyAmount && isValidTerm;
    });
  }, [savingsProducts, monthlyAmount, savingPeriod]);

  const handleTargetAmountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const numValue = extractNumber(event.target.value);
    setTargetAmount(numValue);
  };

  const handleMonthlyAmountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const numValue = extractNumber(event.target.value);
    setMonthlyAmount(numValue);
  };

  const handleSavingPeriodChange = (period: number) => {
    setSavingPeriod(period);
  };

  const handleProductSelect = (product: SavingsProduct) => {
    if (selectedProduct?.id === product.id) {
      setSelectedProduct(null);
    } else {
      setSelectedProduct(product);
    }
  };

  const handleTabChange = (value: string) => {
    setActiveTab(value as 'products' | 'results');
  };

  return (
    <>
      <NavigationBar title="적금 계산기" />

      <Spacing size={16} />

      <TextField
        label="목표 금액"
        placeholder="목표 금액을 입력하세요"
        suffix="원"
        value={targetAmount > 0 ? formatNumber(targetAmount) : ''}
        onChange={handleTargetAmountChange}
      />
      <Spacing size={16} />
      <TextField
        label="월 납입액"
        placeholder="희망 월 납입액을 입력하세요"
        suffix="원"
        value={monthlyAmount > 0 ? formatNumber(monthlyAmount) : ''}
        onChange={handleMonthlyAmountChange}
      />
      <Spacing size={16} />
      <SelectBottomSheet
        label="저축 기간"
        title="저축 기간을 선택해주세요"
        value={savingPeriod}
        onChange={handleSavingPeriodChange}
      >
        <SelectBottomSheet.Option value={6}>6개월</SelectBottomSheet.Option>
        <SelectBottomSheet.Option value={12}>12개월</SelectBottomSheet.Option>
        <SelectBottomSheet.Option value={24}>24개월</SelectBottomSheet.Option>
      </SelectBottomSheet>

      <Spacing size={24} />
      <Border height={16} />
      <Spacing size={8} />

      <Tab onChange={handleTabChange}>
        <Tab.Item value="products" selected={activeTab === 'products'}>
          적금 상품
        </Tab.Item>
        <Tab.Item value="results" selected={activeTab === 'results'}>
          계산 결과
        </Tab.Item>
      </Tab>

      {activeTab === 'products' && (
        <>
          {filteredProducts.length > 0 ? (
            filteredProducts.map(product => {
              const isSelected = selectedProduct?.id === product.id;
              return (
                <ListRow
                  key={product.id}
                  contents={
                    <ListRow.Texts
                      type="3RowTypeA"
                      top={product.name}
                      topProps={{ fontSize: 16, fontWeight: 'bold', color: colors.grey900 }}
                      middle={`연 이자율: ${formatAnnualRate(product.annualRate)}`}
                      middleProps={{ fontSize: 14, color: colors.blue600, fontWeight: 'medium' }}
                      bottom={`${formatMonthlyAmountRange(product.minMonthlyAmount, product.maxMonthlyAmount)} | ${product.availableTerms}개월`}
                      bottomProps={{ fontSize: 13, color: colors.grey600 }}
                    />
                  }
                  right={isSelected ? <Assets.Icon name="icon-check-circle-green" /> : undefined}
                  onClick={() => handleProductSelect(product)}
                />
              );
            })
          ) : (
            <ListRow contents={<ListRow.Texts type="1RowTypeA" top="조건에 맞는 상품이 없습니다." />} />
          )}
        </>
      )}

      {activeTab === 'results' && (
        <>
          {selectedProduct ? (
            <>
              <Spacing size={8} />

              <ListRow
                contents={
                  <ListRow.Texts
                    type="2RowTypeA"
                    top="예상 수익 금액"
                    topProps={{ color: colors.grey600 }}
                    bottom={`1,000,000원`}
                    bottomProps={{ fontWeight: 'bold', color: colors.blue600 }}
                  />
                }
              />
              <ListRow
                contents={
                  <ListRow.Texts
                    type="2RowTypeA"
                    top="목표 금액과의 차이"
                    topProps={{ color: colors.grey600 }}
                    bottom={`-500,000원`}
                    bottomProps={{ fontWeight: 'bold', color: colors.blue600 }}
                  />
                }
              />
              <ListRow
                contents={
                  <ListRow.Texts
                    type="2RowTypeA"
                    top="추천 월 납입 금액"
                    topProps={{ color: colors.grey600 }}
                    bottom={`100,000원`}
                    bottomProps={{ fontWeight: 'bold', color: colors.blue600 }}
                  />
                }
              />

              <Spacing size={8} />
              <Border height={16} />
              <Spacing size={8} />

              <ListRow
                contents={
                  <ListRow.Texts
                    type="3RowTypeA"
                    top={'기본 정기적금'}
                    topProps={{ fontSize: 16, fontWeight: 'bold', color: colors.grey900 }}
                    middle={`연 이자율: 3.2%`}
                    middleProps={{ fontSize: 14, color: colors.blue600, fontWeight: 'medium' }}
                    bottom={`100,000원 ~ 500,000원 | 12개월`}
                    bottomProps={{ fontSize: 13, color: colors.grey600 }}
                  />
                }
                onClick={() => {}}
              />
              <ListRow
                contents={
                  <ListRow.Texts
                    type="3RowTypeA"
                    top={'고급 정기적금'}
                    topProps={{ fontSize: 16, fontWeight: 'bold', color: colors.grey900 }}
                    middle={`연 이자율: 2.8%`}
                    middleProps={{ fontSize: 14, color: colors.blue600, fontWeight: 'medium' }}
                    bottom={`50,000원 ~ 1,000,000원 | 24개월`}
                    bottomProps={{ fontSize: 13, color: colors.grey600 }}
                  />
                }
                onClick={() => {}}
              />

              <Spacing size={40} />
            </>
          ) : (
            <ListRow contents={<ListRow.Texts type="1RowTypeA" top="상품을 선택해주세요." />} />
          )}
        </>
      )}
    </>
  );
}
