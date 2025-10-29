import { Link } from 'react-router-dom'
import { Users, Bell, Clock, ChevronRight } from 'lucide-react'

export default function More() {
  const menuItems = [
    {
      id: 1,
      title: 'Aforo Actual del Parque',
      icon: Users,
      path: '/capacity',
      color: 'text-blue-600 dark:text-primary',
      bgColor: 'bg-blue-600/20 dark:bg-primary/20',
    },
    {
      id: 2,
      title: 'Horarios de Atracciones y Shows',
      icon: Clock,
      path: '/schedules',
      color: 'text-blue-600 dark:text-primary',
      bgColor: 'bg-blue-600/20 dark:bg-primary/20',
    },
    {
      id: 3,
      title: 'Alertas y Notificaciones',
      icon: Bell,
      path: '/alerts',
      color: 'text-blue-600 dark:text-primary',
      bgColor: 'bg-blue-600/20 dark:bg-primary/20',
    },
  ]

  return (
    <div className="animate-fade-in min-h-screen bg-gray-100 dark:bg-background-dark">
      <main className="flex-1 overflow-y-auto px-4 pt-4 pb-24">
        <div className="space-y-2">
          {menuItems.map((item, index) => (
            <Link
              key={item.id}
              to={item.path}
              className="flex cursor-pointer items-center gap-4 rounded-xl bg-white p-4 transition-colors duration-200 hover:bg-gray-50 active:bg-gray-100 dark:bg-gray-800/50 dark:hover:bg-gray-800 dark:active:bg-gray-700/80 animate-slide-up"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <div className="flex items-center gap-4 flex-1">
                <div className={`flex w-12 h-12 shrink-0 items-center justify-center rounded-full ${item.bgColor} ${item.color}`}>
                  <item.icon size={28} />
                </div>
                <p className="text-base font-medium text-gray-800 dark:text-gray-100">
                  {item.title}
                </p>
              </div>
              <div className="shrink-0">
                <div className="flex w-7 h-7 items-center justify-center text-gray-400 dark:text-gray-500">
                  <ChevronRight size={20} />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </main>
    </div>
  )
}
