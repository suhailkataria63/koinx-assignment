import { useEffect, useRef } from 'react'
import type { HoldingWithId } from '../types'
import {
  formatCurrency,
  formatNumber,
} from '../utils/formatters'

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

  useEffect(() => {
    if (selectAllCheckboxRef.current) {
      selectAllCheckboxRef.current.indeterminate = isIndeterminate
    }
  }, [isIndeterminate])

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
                    Short-Term
                  </th>
                  <th className="px-4 py-3 text-right font-semibold">
                    Long-Term
                  </th>
                  <th className="px-4 py-3 text-right font-semibold">
                    Amount to Sell
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {holdings.map((holding) => {
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
                        {formatCurrency(holding.currentPrice)}
                      </td>
                      <td className="px-4 py-4 text-right">
                        <div className={`font-semibold ${getGainClassName(holding.stcg.gain)}`}>
                          {formatCurrency(holding.stcg.gain)}
                        </div>
                        <div className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                          {formatNumber(holding.stcg.balance)} {holding.coin}
                        </div>
                      </td>
                      <td className="px-4 py-4 text-right">
                        <div className={`font-semibold ${getGainClassName(holding.ltcg.gain)}`}>
                          {formatCurrency(holding.ltcg.gain)}
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
          {totalCount > 8 ? (
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
