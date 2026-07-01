import { ArrowDown, ArrowUp } from 'lucide-react'
import { useEffect, useMemo, useRef, useState } from 'react'
import type { HoldingWithId } from '../types'
import {
  formatCompactCurrency,
  formatCurrency,
  formatNumber,
} from '../utils/formatters'

type SortDirection = 'asc' | 'desc'

type SortKey = 'stcg' | 'ltcg' | null

type HoldingsTableProps = {
  holdings: HoldingWithId[]
  isAllSelected: boolean
  isIndeterminate: boolean
  selectedHoldingIds: Set<string>
  showAll: boolean
  toggleHolding: (id: string) => void
  toggleSelectAll: () => void
  toggleShowAll: () => void
  totalCount: number
}

function getGainClassName(value: number): string {
  if (value > 0) {
    return 'text-emerald-600 dark:text-emerald-400'
  }

  if (value < 0) {
    return 'text-red-600 dark:text-red-400'
  }

  return 'text-slate-700 dark:text-slate-300'
}

function MoneyTooltip({ value }: { value: number }) {
  return (
    <span className="group relative inline-flex justify-end">
      <span>{formatCompactCurrency(value)}</span>
      <span className="pointer-events-none absolute bottom-full right-0 z-20 mb-2 whitespace-nowrap rounded-md border border-slate-200 bg-white px-2.5 py-1.5 text-xs font-semibold text-slate-800 opacity-0 shadow-lg transition group-hover:opacity-100 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100">
        {formatCurrency(value)}
      </span>
    </span>
  )
}

export function HoldingsTable({
  holdings,
  isAllSelected,
  isIndeterminate,
  selectedHoldingIds,
  showAll,
  toggleHolding,
  toggleSelectAll,
  toggleShowAll,
  totalCount,
}: HoldingsTableProps) {
  const selectAllCheckboxRef = useRef<HTMLInputElement>(null)
  const [sortKey, setSortKey] = useState<SortKey>(null)
  const [sortDirection, setSortDirection] = useState<SortDirection>('desc')

  useEffect(() => {
    if (selectAllCheckboxRef.current) {
      selectAllCheckboxRef.current.indeterminate = isIndeterminate
    }
  }, [isIndeterminate])

  const sortedHoldings = useMemo(() => {
    if (!sortKey) {
      return holdings
    }

    return [...holdings].sort((currentHolding, nextHolding) => {
      const currentGain = currentHolding[sortKey].gain
      const nextGain = nextHolding[sortKey].gain

      return sortDirection === 'asc'
        ? currentGain - nextGain
        : nextGain - currentGain
    })
  }, [holdings, sortDirection, sortKey])

  const handleSort = (nextSortKey: Exclude<SortKey, null>) => {
    if (sortKey === nextSortKey) {
      setSortDirection((currentDirection) =>
        currentDirection === 'asc' ? 'desc' : 'asc',
      )
      return
    }

    setSortKey(nextSortKey)
    setSortDirection('desc')
  }

  const renderSortIcon = (columnSortKey: Exclude<SortKey, null>) => {
    if (sortKey !== columnSortKey) {
      return null
    }

    return sortDirection === 'asc' ? (
      <ArrowUp aria-hidden="true" size={13} />
    ) : (
      <ArrowDown aria-hidden="true" size={13} />
    )
  }

  return (
    <section className="rounded-lg border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-cardDark">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 px-4 py-4 dark:border-slate-800">
        <div>
          <h2 className="text-lg font-semibold text-slate-950 dark:text-white">
            Holdings
          </h2>
        </div>
        <span className="text-sm font-medium text-slate-500 dark:text-slate-400">
          {totalCount} assets
        </span>
      </div>

      {holdings.length === 0 ? (
        <div className="px-4 py-12 text-center text-sm text-slate-500 dark:text-slate-400">
          No holdings available.
        </div>
      ) : (
        <>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[1080px] text-left text-sm">
              <thead className="bg-slate-50 text-xs uppercase tracking-normal text-slate-500 dark:bg-slate-900/60 dark:text-slate-400">
                <tr>
                  <th className="w-[300px] px-4 py-3 font-semibold">
                    <div className="flex items-center gap-3">
                      <input
                        aria-label="Select all holdings"
                        checked={isAllSelected}
                        className="h-4 w-4 rounded border-slate-300 text-koinxBlue focus:ring-koinxBlue dark:border-slate-600 dark:bg-slate-900"
                        onChange={toggleSelectAll}
                        ref={selectAllCheckboxRef}
                        type="checkbox"
                      />
                      <span>Asset</span>
                    </div>
                  </th>
                  <th className="px-4 py-3 font-semibold">Holdings</th>
                  <th className="px-4 py-3 text-right font-semibold">
                    Current Price
                  </th>
                  <th className="px-4 py-3 text-right font-semibold">
                    <button
                      className="ml-auto inline-flex items-center gap-1 rounded text-xs font-semibold uppercase tracking-normal hover:text-koinxBlue focus:outline-none focus:ring-2 focus:ring-koinxBlue/30 dark:hover:text-koinxBlueLight"
                      onClick={() => handleSort('stcg')}
                      type="button"
                    >
                      Short-Term
                      {renderSortIcon('stcg')}
                    </button>
                  </th>
                  <th className="px-4 py-3 text-right font-semibold">
                    <button
                      className="ml-auto inline-flex items-center gap-1 rounded text-xs font-semibold uppercase tracking-normal hover:text-koinxBlue focus:outline-none focus:ring-2 focus:ring-koinxBlue/30 dark:hover:text-koinxBlueLight"
                      onClick={() => handleSort('ltcg')}
                      type="button"
                    >
                      Long-Term
                      {renderSortIcon('ltcg')}
                    </button>
                  </th>
                  <th className="px-4 py-3 text-right font-semibold">
                    Amount to Sell
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {sortedHoldings.map((holding) => {
                  const isSelected = selectedHoldingIds.has(holding.id)

                  return (
                    <tr
                      className={
                        isSelected
                          ? 'bg-blue-50/80 dark:bg-blue-950/30'
                          : 'bg-white dark:bg-cardDark'
                      }
                      key={holding.id}
                    >
                      <td className="px-4 py-4">
                        <div className="flex items-center gap-3">
                          <input
                            aria-label={`Select ${holding.coinName}`}
                            checked={isSelected}
                            className="h-4 w-4 rounded border-slate-300 text-koinxBlue focus:ring-koinxBlue dark:border-slate-600 dark:bg-slate-900"
                            onChange={() => toggleHolding(holding.id)}
                            type="checkbox"
                          />
                          <img
                            alt=""
                            className="h-9 w-9 rounded-full bg-slate-100 object-cover dark:bg-slate-800"
                            src={holding.logo}
                          />
                          <div className="min-w-0">
                            <div className="font-semibold text-slate-950 dark:text-white">
                              {holding.coin}
                            </div>
                            <div className="max-w-[210px] truncate text-xs text-slate-500 dark:text-slate-400">
                              {holding.coinName}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-4">
                        <div className="font-medium text-slate-900 dark:text-slate-100">
                          {formatNumber(holding.totalHolding)} {holding.coin}
                        </div>
                        <div className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                          Avg. buy {formatCurrency(holding.averageBuyPrice)}
                        </div>
                      </td>
                      <td className="px-4 py-4 text-right font-medium text-slate-900 dark:text-slate-100">
                        <MoneyTooltip value={holding.currentPrice} />
                      </td>
                      <td className="px-4 py-4 text-right">
                        <div className={`font-semibold ${getGainClassName(holding.stcg.gain)}`}>
                          <MoneyTooltip value={holding.stcg.gain} />
                        </div>
                        <div className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                          {formatNumber(holding.stcg.balance)} {holding.coin}
                        </div>
                      </td>
                      <td className="px-4 py-4 text-right">
                        <div className={`font-semibold ${getGainClassName(holding.ltcg.gain)}`}>
                          <MoneyTooltip value={holding.ltcg.gain} />
                        </div>
                        <div className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                          {formatNumber(holding.ltcg.balance)} {holding.coin}
                        </div>
                      </td>
                      <td className="px-4 py-4 text-right font-medium text-slate-900 dark:text-slate-100">
                        {isSelected
                          ? `${formatNumber(holding.totalHolding)} ${holding.coin}`
                          : '-'}
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
          {totalCount > 4 ? (
            <div className="border-t border-slate-200 px-4 py-3 text-center dark:border-slate-800">
              <button
                className="text-sm font-semibold text-koinxBlue underline-offset-4 hover:underline dark:text-koinxBlueLight"
                onClick={toggleShowAll}
                type="button"
              >
                {showAll ? 'Show less' : 'View all'}
              </button>
            </div>
          ) : null}
        </>
      )}
    </section>
  )
}
