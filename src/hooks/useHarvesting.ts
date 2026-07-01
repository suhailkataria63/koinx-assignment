import { useCallback, useEffect, useMemo, useState } from 'react'
import { getCapitalGains, getHoldings } from '../api/mockApi'
import type { CapitalGains, Holding, HoldingWithId } from '../types'
import {
  applySelectedHoldings,
  calculateSavings,
} from '../utils/calculations'

const VISIBLE_HOLDINGS_LIMIT = 4

function getHoldingId(holding: Holding, index: number): string {
  return `${holding.coin}-${holding.coinName}-${index}`
}

function getTotalGain(holding: HoldingWithId): number {
  return holding.stcg.gain + holding.ltcg.gain
}

export function useHarvesting() {
  const [holdings, setHoldings] = useState<HoldingWithId[]>([])
  const [capitalGains, setCapitalGains] = useState<CapitalGains | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [selectedHoldingIds, setSelectedHoldingIds] = useState<Set<string>>(
    () => new Set(),
  )
  const [showAll, setShowAll] = useState(false)

  useEffect(() => {
    let isMounted = true

    async function fetchHarvestingData() {
      try {
        setLoading(true)
        setError(null)

        const [holdingsResponse, capitalGainsResponse] = await Promise.all([
          getHoldings(),
          getCapitalGains(),
        ])

        if (!isMounted) {
          return
        }

        const holdingsWithIds = holdingsResponse
          .map((holding, index) => ({
            ...holding,
            id: getHoldingId(holding, index),
          }))
          .sort(
            (currentHolding, nextHolding) =>
              Math.abs(getTotalGain(nextHolding)) -
              Math.abs(getTotalGain(currentHolding)),
          )

        setHoldings(holdingsWithIds)
        setCapitalGains(capitalGainsResponse.capitalGains)
      } catch (caughtError) {
        if (!isMounted) {
          return
        }

        setError(
          caughtError instanceof Error
            ? caughtError.message
            : 'Unable to load tax harvesting data.',
        )
      } finally {
        if (isMounted) {
          setLoading(false)
        }
      }
    }

    void fetchHarvestingData()

    return () => {
      isMounted = false
    }
  }, [])

  const selectedHoldings = useMemo(
    () => holdings.filter((holding) => selectedHoldingIds.has(holding.id)),
    [holdings, selectedHoldingIds],
  )

  const visibleHoldings = useMemo(
    () =>
      showAll ? holdings : holdings.slice(0, VISIBLE_HOLDINGS_LIMIT),
    [holdings, showAll],
  )

  const postHarvestingCapitalGains = useMemo(
    () =>
      capitalGains
        ? applySelectedHoldings(capitalGains, selectedHoldings)
        : null,
    [capitalGains, selectedHoldings],
  )

  const savings = useMemo(
    () =>
      capitalGains && postHarvestingCapitalGains
        ? calculateSavings(capitalGains, postHarvestingCapitalGains)
        : 0,
    [capitalGains, postHarvestingCapitalGains],
  )

  const isAllSelected =
    holdings.length > 0 && selectedHoldingIds.size === holdings.length
  const isIndeterminate = selectedHoldingIds.size > 0 && !isAllSelected

  const toggleHolding = useCallback((id: string) => {
    setSelectedHoldingIds((currentSelectedIds) => {
      const nextSelectedIds = new Set(currentSelectedIds)

      if (nextSelectedIds.has(id)) {
        nextSelectedIds.delete(id)
      } else {
        nextSelectedIds.add(id)
      }

      return nextSelectedIds
    })
  }, [])

  const toggleSelectAll = useCallback(() => {
    setSelectedHoldingIds((currentSelectedIds) => {
      if (holdings.length > 0 && currentSelectedIds.size === holdings.length) {
        return new Set()
      }

      return new Set(holdings.map((holding) => holding.id))
    })
  }, [holdings])

  const toggleShowAll = useCallback(() => {
    setShowAll((currentShowAll) => !currentShowAll)
  }, [])

  return {
    holdings,
    visibleHoldings,
    capitalGains,
    postHarvestingCapitalGains,
    selectedHoldingIds,
    loading,
    error,
    savings,
    showAll,
    isAllSelected,
    isIndeterminate,
    toggleHolding,
    toggleSelectAll,
    toggleShowAll,
  }
}
