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

  return (
    <div className="min-h-screen bg-[#f5f7fa] text-slate-950 transition-colors dark:bg-[#070914] dark:text-white">
      <Header theme={theme} toggleTheme={toggleTheme} />
      <main className="mx-auto flex w-full max-w-[1180px] flex-col gap-6 px-4 py-6 sm:px-6 lg:py-8">
        <div className="flex flex-wrap items-center gap-3">
          <h1 className="text-2xl font-semibold tracking-normal text-slate-950 dark:text-white sm:text-3xl">
            Tax Harvesting
          </h1>
          <div className="group relative inline-flex">
            <a
              aria-describedby="how-it-works-tooltip"
              className="text-sm font-semibold text-koinxBlue underline-offset-4 hover:underline focus:outline-none focus:ring-2 focus:ring-koinxBlue/30 dark:text-koinxBlueLight"
              href="#how-it-works"
            >
              How it works?
            </a>
            <div
              className="pointer-events-none absolute left-1/2 top-7 z-30 w-[min(20rem,calc(100vw-2rem))] -translate-x-1/2 rounded-lg border border-slate-200 bg-white p-4 text-sm leading-6 text-slate-700 opacity-0 shadow-xl transition group-hover:opacity-100 group-focus-within:opacity-100 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200"
              id="how-it-works-tooltip"
              role="tooltip"
            >
              <p>See your capital gains in the left card.</p>
              <p>Check boxes for assets you plan on selling to reduce tax liability.</p>
              <p>Instantly see your updated tax liability in the right card.</p>
              <p>Pro tip: Experiment with different combinations of holdings to optimize your tax liability.</p>
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
