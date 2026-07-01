export type GainBucket = {
  profits: number
  losses: number
}

export type CapitalGains = {
  stcg: GainBucket
  ltcg: GainBucket
}

export type CapitalGainsResponse = {
  capitalGains: CapitalGains
}

export type HoldingGain = {
  balance: number
  gain: number
}

export type Holding = {
  coin: string
  coinName: string
  logo: string
  currentPrice: number
  totalHolding: number
  averageBuyPrice: number
  stcg: HoldingGain
  ltcg: HoldingGain
}

export type HoldingWithId = Holding & {
  id: string
}
