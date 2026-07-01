import { ChevronDown, ChevronUp, Info } from 'lucide-react'
import { useState } from 'react'

const disclaimerItems = [
  'Tax-loss harvesting is currently not allowed under Indian tax regulations. Please consult your tax advisor before making any decisions.',
  'Tax harvesting does not apply to derivatives or futures. These are handled separately as business income under tax rules.',
  'Price and market value data is fetched from CoinGecko, not from individual exchanges. As a result, values may slightly differ from the ones on your exchange.',
  'Some countries do not have a short-term / long-term bifurcation. For now, we are calculating everything as long-term.',
  'Only realized losses are considered for harvesting. Unrealized losses in held assets are not counted.',
]

export function DisclaimerAccordion() {
  const [isOpen, setIsOpen] = useState(true)

  return (
    <section className="rounded-lg border border-blue-200 bg-blue-50 text-slate-800 shadow-sm dark:border-blue-800/70 dark:bg-blue-950/30 dark:text-slate-200">
      <button
        aria-expanded={isOpen}
        className="flex w-full items-center gap-3 px-4 py-3 text-left"
        onClick={() => setIsOpen((currentIsOpen) => !currentIsOpen)}
        type="button"
      >
        <Info
          aria-hidden="true"
          className="shrink-0 text-koinxBlue dark:text-koinxBlueLight"
          size={18}
        />
        <span className="flex-1 text-sm font-semibold text-slate-950 dark:text-white">
          Important Notes & Disclaimers
        </span>
        {isOpen ? (
          <ChevronUp aria-hidden="true" size={18} />
        ) : (
          <ChevronDown aria-hidden="true" size={18} />
        )}
      </button>
      {isOpen ? (
        <div className="border-t border-blue-100 px-4 pb-4 pt-3 dark:border-blue-900/80">
          <ul className="list-disc space-y-2 pl-5 text-sm leading-6 text-slate-700 dark:text-slate-300">
            {disclaimerItems.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      ) : null}
    </section>
  )
}
