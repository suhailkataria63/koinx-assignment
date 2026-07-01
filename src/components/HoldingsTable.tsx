export function HoldingsTable() {
  return (
    <section className="overflow-x-auto rounded-lg border border-slate-200 bg-white dark:border-slate-800 dark:bg-cardDark">
      <table className="w-full min-w-[720px] text-left text-sm">
        <thead className="border-b border-slate-200 text-slate-600 dark:border-slate-800 dark:text-slate-300">
          <tr>
            <th className="px-4 py-3 font-semibold">Asset</th>
            <th className="px-4 py-3 font-semibold">Holdings</th>
            <th className="px-4 py-3 font-semibold">Total Current Value</th>
          </tr>
        </thead>
        <tbody />
      </table>
    </section>
  )
}
