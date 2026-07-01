import { Moon, Sun } from 'lucide-react'

type HeaderProps = {
  theme: 'light' | 'dark'
  toggleTheme: () => void
}

export function Header({ theme, toggleTheme }: HeaderProps) {
  const isDark = theme === 'dark'

  return (
    <header className="sticky top-0 z-20 border-b border-slate-200 bg-white/95 backdrop-blur dark:border-slate-800 dark:bg-[#0b1020]/95">
      <div className="mx-auto flex h-16 w-full max-w-[1180px] items-center justify-between px-4 sm:px-6">
        <a
          aria-label="KoinX home"
          className="text-2xl font-bold tracking-normal"
          href="/"
        >
          <span className="text-koinxBlue dark:text-koinxBlueLight">
            Koin
          </span>
          <span className="text-amber-500">X</span>
        </a>
        <button
          aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
          className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-slate-50 text-slate-700 transition hover:border-koinxBlue hover:text-koinxBlue focus:outline-none focus:ring-2 focus:ring-koinxBlue/30 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:border-koinxBlueLight dark:hover:text-koinxBlueLight"
          onClick={toggleTheme}
          type="button"
        >
          {isDark ? <Sun size={18} /> : <Moon size={18} />}
        </button>
      </div>
    </header>
  )
}
