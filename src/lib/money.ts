export const CURRENCY = 'د.ع'
export const MINOR_UNITS = 1000

export function parseMoney(value: string | number): number {
  if (typeof value === 'number') {
    if (!Number.isFinite(value) || !Number.isInteger(value) || value < 0 || !Number.isSafeInteger(Math.round(value * MINOR_UNITS))) throw new Error('أدخل مبلغاً صحيحاً بالدينار العراقي دون كسور')
    return Math.round(value * MINOR_UNITS)
  }
  const normalized = value
    .replace(/[٬,\s]/g, '')
    .replace(/[٠-٩]/g, (d) => String('٠١٢٣٤٥٦٧٨٩'.indexOf(d)))
    .replace('٫', '.')
  const amount = Number(normalized)
  if (!normalized || !/^\d+$/.test(normalized) || !Number.isFinite(amount) || amount < 0 || !Number.isSafeInteger(Math.round(amount * MINOR_UNITS))) throw new Error('أدخل مبلغاً صحيحاً بالدينار العراقي دون كسور')
  return Math.round(amount * MINOR_UNITS)
}

export function formatMoney(minor: number, compact = false): string {
  return new Intl.NumberFormat('ar-IQ', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
    notation: compact ? 'compact' : 'standard'
  }).format(Math.round(minor / MINOR_UNITS)) + ' ' + CURRENCY
}

export function formatNumber(value: number): string {
  return new Intl.NumberFormat('ar-IQ').format(value)
}
