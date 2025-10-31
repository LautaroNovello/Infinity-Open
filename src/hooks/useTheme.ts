import { useEffect, useState } from 'react'

export type Theme = 'light' | 'dark'

export function useTheme() {
  // Inicializar el tema desde localStorage o usar el tema del sistema
  const [theme, setTheme] = useState<Theme>(() => {
    const savedTheme = localStorage.getItem('theme') as Theme | null
    if (savedTheme) {
      return savedTheme
    }
    // Detectar preferencia del sistema
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return 'dark'
    }
    return 'light'
  })

  useEffect(() => {
    const root = window.document.documentElement
    
    // Remover ambas clases
    root.classList.remove('light', 'dark')
    
    // Añadir la clase correspondiente
    root.classList.add(theme)
    
    // Guardar en localStorage
    localStorage.setItem('theme', theme)
  }, [theme])

  const toggleTheme = () => {
    setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light')
  }

  return { theme, toggleTheme }
}
