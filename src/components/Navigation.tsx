import { NavLink } from 'react-router-dom'
import { Home, Ticket, MoreHorizontal, Map } from 'lucide-react'

export default function Navigation() {
  const navItems = [
    { to: '/', icon: Home, label: 'Inicio' },
    { to: '/maps', icon: Map, label: 'Mapas' },
    { to: '/tickets', icon: Ticket, label: 'Entradas' },
    { to: '/more', icon: MoreHorizontal, label: 'Más' },
  ]

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white dark:bg-[#111122] border-t border-gray-200 dark:border-gray-800 z-20">
      <div className="flex justify-around items-center h-16">
        {navItems.map(({ to, icon: Icon, label }) => (
          <NavLink
            key={to}
            to={to}
            className="flex flex-col items-center justify-center w-1/4"
          >
            {({ isActive }) => (
              <>
                <Icon
                  size={24}
                  className={`${
                    isActive ? 'text-blue-600 dark:text-primary' : 'text-gray-500 dark:text-gray-400'
                  }`}
                  strokeWidth={isActive ? 2.5 : 2}
                />
                <span
                  className={`text-xs mt-1 ${
                    isActive
                      ? 'font-bold text-blue-600 dark:text-primary'
                      : 'font-medium text-gray-500 dark:text-gray-400'
                  }`}
                >
                  {label}
                </span>
              </>
            )}
          </NavLink>
        ))}
      </div>
    </nav>
  )
}
