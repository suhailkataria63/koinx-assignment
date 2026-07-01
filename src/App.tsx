import { CapitalGainsCard } from './components/CapitalGainsCard'
import { DisclaimerAccordion } from './components/DisclaimerAccordion'
import { Header } from './components/Header'
import { HoldingsTable } from './components/HoldingsTable'

function App() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-950 transition-colors dark:bg-appDark dark:text-white">
      <Header />
      <main className="mx-auto flex w-full max-w-7xl flex-col gap-6 px-4 py-6 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-center gap-3">
          <h1 className="text-2xl font-semibold tracking-normal text-slate-950 dark:text-white">
            Tax Harvesting
          </h1>
          <a
            className="text-sm font-medium text-koinxBlue underline-offset-4 hover:underline dark:text-koinxBlueLight"
            href="#how-it-works"
          >
            How it works?
          </a>
        </div>
        <DisclaimerAccordion />
        <section className="grid gap-4 lg:grid-cols-2">
          <CapitalGainsCard title="Pre Harvesting" />
          <CapitalGainsCard isHighlighted title="After Harvesting" />
        </section>
        <HoldingsTable />
      </main>
    </div>
  )
}

export default App
