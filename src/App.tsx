import { useEffect, useRef, useState } from 'react'
import { CapitalGainsCard } from './components/CapitalGainsCard'
import { DisclaimerAccordion } from './components/DisclaimerAccordion'
import { ErrorState } from './components/ErrorState'
import { Header } from './components/Header'
import { HoldingsTable } from './components/HoldingsTable'
import { Loader } from './components/Loader'
import { useHarvesting } from './hooks/useHarvesting'
import { useTheme } from './hooks/useTheme'

function App() {
  const { theme, toggleTheme } = useTheme()
  const [isHowItWorksOpen, setIsHowItWorksOpen] = useState(false)
  const closeTimerRef = useRef<number | null>(null)
  const {
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
  } = useHarvesting()

  const cancelCloseTooltip = () => {
    if (closeTimerRef.current !== null) {
      window.clearTimeout(closeTimerRef.current)
      closeTimerRef.current = null
    }
  }

  const openTooltip = () => {
    cancelCloseTooltip()
    setIsHowItWorksOpen(true)
  }

  const scheduleCloseTooltip = () => {
    cancelCloseTooltip()
    closeTimerRef.current = window.setTimeout(() => {
      setIsHowItWorksOpen(false)
      closeTimerRef.current = null
    }, 125)
  }

  useEffect(() => {
    return () => {
      cancelCloseTooltip()
    }
  }, [])

  return (
    <div className="min-h-screen bg-[#f5f7fa] text-slate-950 transition-colors dark:bg-[#070914] dark:text-white">
      <Header theme={theme} toggleTheme={toggleTheme} />
      <main className="mx-auto flex w-full max-w-[1180px] flex-col gap-6 px-4 py-6 sm:px-6 lg:py-8">
        <div className="flex flex-wrap items-center gap-3">
          <h1 className="text-2xl font-semibold tracking-normal text-slate-950 dark:text-white sm:text-3xl">
            Tax Harvesting
          </h1>
          <div className="relative inline-flex">
            <a
              aria-describedby="how-it-works-tooltip"
              aria-expanded={isHowItWorksOpen}
              className="text-sm font-semibold text-koinxBlue underline-offset-4 hover:underline focus:outline-none focus:ring-2 focus:ring-koinxBlue/30 dark:text-koinxBlueLight"
              href="#how-it-works"
              onBlur={scheduleCloseTooltip}
              onFocus={openTooltip}
              onMouseEnter={openTooltip}
              onMouseLeave={scheduleCloseTooltip}
            >
              How it works?
            </a>
            <div
              className={`absolute left-1/2 top-7 z-30 w-[min(21rem,calc(100vw-2rem))] -translate-x-1/2 rounded-lg border border-slate-200 bg-white p-4 text-sm leading-5 text-slate-700 shadow-xl transition dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 ${
                isHowItWorksOpen
                  ? 'pointer-events-auto opacity-100'
                  : 'pointer-events-none opacity-0'
              }`}
              id="how-it-works-tooltip"
              onMouseEnter={openTooltip}
              onMouseLeave={scheduleCloseTooltip}
              role="tooltip"
            >
              <div className="space-y-3">
                <p>See your capital gains in the left card.</p>
                <p>Select the assets you plan to sell.</p>
                <p>
                  The right card updates instantly with your revised tax
                  position.
                </p>
                <p>
                  Pro tip: Try different asset combinations to see how
                  harvesting affects your capital gains.
                </p>
              </div>
            </div>
          </div>
        </div>

        {loading ? (
          <Loader />
        ) : error ? (
          <ErrorState message={error} />
        ) : capitalGains && postHarvestingCapitalGains ? (
          <>
            <DisclaimerAccordion />
            <section className="grid gap-4 lg:grid-cols-2">
              <CapitalGainsCard
                capitalGains={capitalGains}
                label="Realised Capital Gains:"
                title="Pre Harvesting"
                variant="default"
              />
              <CapitalGainsCard
                capitalGains={postHarvestingCapitalGains}
                label="Effective Capital Gains:"
                savings={savings}
                title="After Harvesting"
                variant="blue"
              />
            </section>
            <HoldingsTable
              holdings={visibleHoldings}
              isAllSelected={isAllSelected}
              isIndeterminate={isIndeterminate}
              selectedHoldingIds={selectedHoldingIds}
              showAll={showAll}
              toggleHolding={toggleHolding}
              toggleSelectAll={toggleSelectAll}
              toggleShowAll={toggleShowAll}
              totalCount={holdings.length}
            />
          </>
        ) : (
          <ErrorState message="Capital gains data is unavailable." />
        )}
      </main>
    </div>
  )
}

export default App
