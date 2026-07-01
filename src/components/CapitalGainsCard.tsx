type CapitalGainsCardProps = {
  isHighlighted?: boolean
  title: string
}

export function CapitalGainsCard({
  isHighlighted = false,
  title,
}: CapitalGainsCardProps) {
  const cardClassName = isHighlighted
    ? 'rounded-lg bg-gradient-to-br from-koinxBlue to-koinxBlueLight p-5 text-white'
    : 'rounded-lg border border-slate-200 bg-white p-5 text-slate-950 dark:border-slate-800 dark:bg-cardDark dark:text-white'

  return (
    <article className={cardClassName}>
      <h2 className="text-lg font-semibold">{title}</h2>
    </article>
  )
}
