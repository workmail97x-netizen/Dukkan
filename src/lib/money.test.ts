import { describe, expect, it } from 'vitest'
import { formatMoney, parseMoney } from './money'

describe('IQD money utilities', () => {
  it('stores decimal dinars as integer minor units', () => {
    expect(parseMoney('12.500')).toBe(12500)
    expect(parseMoney('5,250')).toBe(5250000)
    expect(parseMoney('١٢٫٥٠٠')).toBe(12500)
  })

  it('formats as whole Iraqi dinars', () => {
    expect(formatMoney(12500)).toContain('13')
    expect(formatMoney(12500)).toContain('د.ع')
  })

  it('rejects invalid amounts', () => {
    expect(() => parseMoney('not a number')).toThrow('InvalidAmount')
    expect(() => parseMoney(-1)).toThrow()
    expect(() => parseMoney(Infinity)).toThrow()
    expect(() => parseMoney(NaN)).toThrow()
    expect(() => parseMoney('1.0001')).toThrow()
  })
})
