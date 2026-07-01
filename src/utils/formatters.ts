const currencyFormatter = new Intl.NumberFormat("en-IN", {
  currency: "INR",
  maximumFractionDigits: 2,
  style: "currency",
});

const compactCurrencyFormatter = new Intl.NumberFormat("en-IN", {
  compactDisplay: "short",
  currency: "INR",
  maximumFractionDigits: 2,
  notation: "compact",
  style: "currency",
});

const standardNumberFormatter = new Intl.NumberFormat("en-IN", {
  maximumFractionDigits: 6,
});

const tinyNumberFormatter = new Intl.NumberFormat("en-IN", {
  maximumFractionDigits: 8,
});

export function formatCurrency(value: number): string {
  return currencyFormatter.format(value);
}

export function formatCompactCurrency(value: number): string {
  return compactCurrencyFormatter.format(value);
}

export function formatNumber(value: number): string {
  const absoluteValue = Math.abs(value);
  const isTiny = absoluteValue > 0 && absoluteValue < 0.000001;

  return isTiny
    ? tinyNumberFormatter.format(value)
    : standardNumberFormatter.format(value);
}

export function formatGain(value: number): string {
  if (value > 0) {
    return `+${formatCurrency(value)}`;
  }

  return formatCurrency(value);
}
