import type { CapitalGains } from '../types'
import { calculateNetGain, calculateRealisedCapitalGains } from '../utils/calculations'
import { formatCurrency } from '../utils/formatters'

type CapitalGainsCardProps = {
  capitalGains: CapitalGains
  label: string
  savings?: number
  title: string
  variant: 'default' | 'blue'
}

function formatSignedCurrency(value: number): string {
  return value < 0 ? `-${formatCurrency(Math.abs(value))}` : formatCurrency(value)
}

export function CapitalGainsCard({
  capitalGains,
  label,
  savings = 0,
  title,
  variant,
}: CapitalGainsCardProps) {
  const isBlue = variant === 'blue'
  const shortTermNet = calculateNetGain(capitalGains.stcg)
  const longTermNet = calculateNetGain(capitalGains.ltcg)
  const realisedCapitalGains = calculateRealisedCapitalGains(capitalGains)
  const cardClassName = isBlue
    ? 'rounded-lg bg-gradient-to-br from-[#0052fe] to-[#2f80ff] p-5 text-white shadow-lg shadow-blue-900/20'
    : 'rounded-lg border border-slate-200 bg-white p-5 text-slate-950 shadow-sm dark:border-slate-800 dark:bg-cardDark dark:text-white'
  const mutedTextClassName = isBlue
    ? 'text-blue-100'
    : 'text-slate-500 dark:text-slate-400'
  const dividerClassName = isBlue
    ? 'border-blue-300/30'
    : 'border-slate-200 dark:border-slate-800'

  return (
    <article className={cardClassName}>
      <h2 className="text-lg font-semibold">{title}</h2>
      <div className="mt-5 space-y-3 text-sm">
        <div className={`grid grid-cols-3 border-b pb-2 ${dividerClassName}`}>
          <span />
          <span className={`text-right font-medium ${mutedTextClassName}`}>
            Short-term
          </span>
          <span className={`text-right font-medium ${mutedTextClassName}`}>
            Long-term
          </span>
        </div>
        <div className="grid grid-cols-3 items-center gap-2">
          <span className={mutedTextClassName}>Profits</span>
          <span className="text-right font-medium">
            {formatCurrency(capitalGains.stcg.profits)}
          </span>
          <span className="text-right font-medium">
            {formatCurrency(capitalGains.ltcg.profits)}
          </span>
        </div>
        <div className="grid grid-cols-3 items-center gap-2">
          <span className={mutedTextClassName}>Losses</span>
          <span className="text-right font-medium">
            {formatCurrency(capitalGains.stcg.losses)}
          </span>
          <span className="text-right font-medium">
            {formatCurrency(capitalGains.ltcg.losses)}
          </span>
        </div>
        <div className={`grid grid-cols-3 items-center gap-2 border-t pt-3 ${dividerClassName}`}>
          <span className="font-semibold">Net Capital Gains</span>
          <span className="text-right font-semibold">
            {formatSignedCurrency(shortTermNet)}
          </span>
          <span className="text-right font-semibold">
            {formatSignedCurrency(longTermNet)}
          </span>
        </div>
      </div>
      <div className={`mt-5 border-t pt-4 ${dividerClassName}`}>
        <div className="flex items-end justify-between gap-3">
          <span className={`text-sm font-medium ${mutedTextClassName}`}>
            {label}
          </span>
          <strong className="text-xl font-semibold">
            {formatSignedCurrency(realisedCapitalGains)}
          </strong>
        </div>
        {isBlue && savings > 0 ? (
          <p className="mt-3 text-sm font-medium text-white">
            🎉 Your taxable capital gains are reduced by: {formatCurrency(savings)}
          </p>
        ) : null}
      </div>
    </article>
  )
}
