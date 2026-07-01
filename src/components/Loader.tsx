export function Loader() {
  return (
    <div aria-label="Loading tax harvesting data" className="space-y-6" role="status">
      <div className="h-24 animate-pulse rounded-lg bg-blue-100 dark:bg-blue-950/40" />
      <div className="grid gap-4 lg:grid-cols-2">
        <div className="h-64 animate-pulse rounded-lg bg-slate-200 dark:bg-slate-800" />
        <div className="h-64 animate-pulse rounded-lg bg-blue-200 dark:bg-blue-900/60" />
      </div>
      <div className="rounded-lg border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-cardDark">
        <div className="mb-4 h-6 w-36 animate-pulse rounded bg-slate-200 dark:bg-slate-800" />
        <div className="space-y-3">
          {Array.from({ length: 6 }, (_, index) => (
            <div
              className="h-12 animate-pulse rounded bg-slate-100 dark:bg-slate-800/80"
              key={index}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
