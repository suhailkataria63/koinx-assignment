import { useCallback, useEffect, useState } from 'react'

const THEME_STORAGE_KEY = 'koinx-theme'

type ThemeMode = 'light' | 'dark'

function getInitialTheme(): ThemeMode {
  const savedTheme = window.localStorage.getItem(THEME_STORAGE_KEY)

  return savedTheme === 'dark' || savedTheme === 'light' ? savedTheme : 'light'
}

export function useTheme() {
  const [theme, setTheme] = useState<ThemeMode>(getInitialTheme)

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark')
    window.localStorage.setItem(THEME_STORAGE_KEY, theme)
  }, [theme])

  const toggleTheme = useCallback(() => {
    setTheme((currentTheme) => (currentTheme === 'dark' ? 'light' : 'dark'))
  }, [])

  return {
    theme,
    toggleTheme,
  }
}
