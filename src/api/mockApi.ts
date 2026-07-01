import { holdings } from '../data/holdings'
import type { CapitalGainsResponse, Holding } from '../types'

const delay = (duration: number): Promise<void> =>
  new Promise((resolve) => {
    window.setTimeout(resolve, duration)
  })

export async function getHoldings(): Promise<Holding[]> {
  await delay(600)

  return holdings
}

export async function getCapitalGains(): Promise<CapitalGainsResponse> {
  await delay(500)

  return {
    capitalGains: {
      stcg: {
        profits: 70200.88,
        losses: 1548.53,
      },
      ltcg: {
        profits: 5020,
        losses: 3050,
      },
    },
  }
}
