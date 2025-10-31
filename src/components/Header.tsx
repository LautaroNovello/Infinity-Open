import { LogOut, User, Moon, Sun } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useState, useEffect, useRef } from 'react'
import { useTheme } from '../hooks/useTheme'

export default function Header() {
  const navigate = useNavigate()
  const [showMenu, setShowMenu] = useState(false)
  const userEmail = localStorage.getItem('userEmail') || 'Usuario'
  const { theme, toggleTheme } = useTheme()
  const menuRef = useRef<HTMLDivElement>(null)

  // Cerrar el menú al hacer clic fuera de él
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setShowMenu(false)
      }
    }

    if (showMenu) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [showMenu])

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated')
    localStorage.removeItem('userEmail')
    navigate('/login')
  }

  return (
    <header className="flex items-center p-4 pb-2 justify-between sticky top-0 bg-gray-100 dark:bg-[#111122] z-10">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 flex-shrink-0">
          <img src="/logo1.png" alt="Infinity Open Logo" className="w-full h-full object-contain" />
        </div>
        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 dark:text-white">
          Infinity Open
        </h1>
      </div>
      <div className="flex-1"></div>
      <div className="flex items-center gap-2">
        <button
          onClick={toggleTheme}
          className="p-2 rounded-lg bg-gray-200 dark:bg-gray-800 text-gray-800 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-700 transition-colors"
          aria-label={theme === 'light' ? 'Cambiar a modo oscuro' : 'Cambiar a modo claro'}
        >
          {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
        </button>
        <div className="relative" ref={menuRef}>
          <button
            onClick={() => setShowMenu(!showMenu)}
            className="flex items-center gap-2 px-3 py-2 rounded-lg bg-blue-600 dark:bg-primary text-white hover:bg-blue-700 dark:hover:bg-primary/90 transition-colors"
          >
            <User size={18} />
            <span className="text-sm font-medium max-w-[100px] truncate hidden sm:inline">
              {userEmail.split('@')[0]}
            </span>
          </button>
          
          {showMenu && (
          <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden animate-slide-up">
            <div className="p-3 border-b border-gray-200 dark:border-gray-700">
              <p className="text-sm text-gray-500 dark:text-gray-400">Sesión iniciada como:</p>
              <p className="text-sm font-semibold text-gray-900 dark:text-white truncate">{userEmail}</p>
            </div>
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-2 px-4 py-3 text-left text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
            >
              <LogOut size={18} />
              <span className="text-sm font-medium">Cerrar Sesión</span>
            </button>
          </div>
        )}
        </div>
      </div>
    </header>
  )
}
