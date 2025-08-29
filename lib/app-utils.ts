export function formatCurrency(
  amount: number,
  locale: string = 'en-us'
): string {
  return new Intl.NumberFormat(locale, {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(amount);
}
