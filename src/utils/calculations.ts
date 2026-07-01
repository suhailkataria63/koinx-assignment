import type { CapitalGains, GainBucket, Holding } from "../types";

export function calculateNetGain(bucket: GainBucket): number {
  return bucket.profits - bucket.losses;
}

export function calculateRealisedCapitalGains(
  capitalGains: CapitalGains,
): number {
  return (
    calculateNetGain(capitalGains.stcg) + calculateNetGain(capitalGains.ltcg)
  );
}

export function applySelectedHoldings(
  baseCapitalGains: CapitalGains,
  selectedHoldings: Holding[],
): CapitalGains {
  const updatedCapitalGains: CapitalGains = {
    stcg: { ...baseCapitalGains.stcg },
    ltcg: { ...baseCapitalGains.ltcg },
  };

  selectedHoldings.forEach((holding) => {
    if (holding.stcg.gain > 0) {
      updatedCapitalGains.stcg.profits += holding.stcg.gain;
    }

    if (holding.stcg.gain < 0) {
      updatedCapitalGains.stcg.losses += Math.abs(holding.stcg.gain);
    }

    if (holding.ltcg.gain > 0) {
      updatedCapitalGains.ltcg.profits += holding.ltcg.gain;
    }

    if (holding.ltcg.gain < 0) {
      updatedCapitalGains.ltcg.losses += Math.abs(holding.ltcg.gain);
    }
  });

  return updatedCapitalGains;
}

export function calculateSavings(pre: CapitalGains, post: CapitalGains): number {
  const savings =
    calculateRealisedCapitalGains(pre) - calculateRealisedCapitalGains(post);

  return savings > 0 ? savings : 0;
}
