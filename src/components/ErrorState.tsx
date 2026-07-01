type ErrorStateProps = {
  message: string
}

export function ErrorState({ message }: ErrorStateProps) {
  return (
    <div
      className="mx-auto max-w-xl rounded-lg border border-red-200 bg-red-50 p-6 text-center text-red-700 shadow-sm dark:border-red-900/70 dark:bg-red-950/30 dark:text-red-200"
      role="alert"
    >
      <h2 className="text-lg font-semibold">Unable to load data</h2>
      <p className="mt-2 text-sm">{message}</p>
    </div>
  )
}
