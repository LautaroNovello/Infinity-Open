import { Link } from 'react-router-dom'
import { 
  Users, Bell, Clock, ChevronRight, MapPin, 
  MessageCircle, LogOut, Phone, Instagram
} from 'lucide-react'

interface MenuItem {
  id: number
  title: string
  description?: string
  icon: any
  path?: string
  action?: () => void
  color: string
  bgColor: string
  badge?: string
  isNew?: boolean
}

export default function More() {
  const handleLogout = () => {
    // Limpiar datos de sesión
    localStorage.removeItem('userToken')
    localStorage.removeItem('userData')
    // Redirigir a login
    window.location.href = '/login'
  }

  const primaryOptions: MenuItem[] = [
    {
      id: 1,
      title: 'Aforo en Tiempo Real',
      description: 'Consulta la ocupación actual',
      icon: Users,
      path: '/capacity',
      color: 'text-blue-600 dark:text-blue-400',
      bgColor: 'bg-gradient-to-br from-blue-500 to-blue-600',
      badge: 'Live',
    },
    {
      id: 2,
      title: 'Horarios y Shows',
      description: 'Atracciones y espectáculos',
      icon: Clock,
      path: '/schedules',
      color: 'text-purple-600 dark:text-purple-400',
      bgColor: 'bg-gradient-to-br from-purple-500 to-purple-600',
    },
    {
      id: 3,
      title: 'Alertas y Notificaciones',
      description: 'Mantente informado',
      icon: Bell,
      path: '/alerts',
      color: 'text-red-600 dark:text-red-400',
      bgColor: 'bg-gradient-to-br from-red-500 to-red-600',
      badge: '3',
    },
  ]

  const supportOptions: MenuItem[] = [
    {
      id: 8,
      title: 'Contactar Soporte',
      description: '3534 27-5749',
      icon: MessageCircle,
      path: 'tel:+543534275749',
      color: 'text-teal-600 dark:text-teal-400',
      bgColor: 'bg-gradient-to-br from-teal-500 to-teal-600',
    },
  ]

  const renderMenuItem = (item: MenuItem, index: number) => {
    const content = (
      <div 
        className="group relative bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 p-4 rounded-2xl shadow-lg hover:shadow-2xl border border-gray-200 dark:border-gray-700 transform hover:scale-[1.02] transition-all duration-300 overflow-hidden"
        style={{ 
          animationDelay: `${index * 50}ms`,
          animation: 'slideInUp 0.5s ease-out forwards'
        }}
      >
        {/* Efecto de brillo */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
        
        <div className="relative flex items-center gap-4">
          {/* Icono con gradiente */}
          <div className={`flex items-center justify-center rounded-2xl shrink-0 w-14 h-14 shadow-lg transform group-hover:rotate-12 transition-transform duration-300 ${item.bgColor}`}>
            <item.icon className="text-white" size={28} />
          </div>
          
          {/* Contenido */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <h3 className="text-base font-bold text-gray-900 dark:text-white truncate">
                {item.title}
              </h3>
              {item.isNew && (
                <span className="px-2 py-0.5 text-xs font-bold bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-full">
                  NUEVO
                </span>
              )}
              {item.badge && !item.isNew && (
                <span className="px-2 py-0.5 text-xs font-bold bg-gradient-to-r from-red-500 to-rose-500 text-white rounded-full">
                  {item.badge}
                </span>
              )}
            </div>
            {item.description && (
              <p className="text-sm text-gray-600 dark:text-gray-400 truncate">
                {item.description}
              </p>
            )}
          </div>
          
          {/* Flecha */}
          <ChevronRight 
            className="text-gray-400 dark:text-gray-500 group-hover:translate-x-1 transition-transform duration-300" 
            size={20} 
          />
        </div>
      </div>
    )

    if (item.path) {
      return (
        <Link key={item.id} to={item.path}>
          {content}
        </Link>
      )
    }

    return (
      <button 
        key={item.id} 
        onClick={item.action}
        className="w-full text-left"
      >
        {content}
      </button>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-900 pb-20 transition-all duration-500">
      <main className="flex-1 overflow-y-auto px-4 pt-6 pb-24">
        {/* Header */}
        <div className="mb-8 animate-fade-in">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
            Más Opciones
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Explora todas las funcionalidades disponibles
          </p>
        </div>

        {/* Opciones Principales */}
        <div className="mb-8">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
            <MapPin className="text-blue-500" size={24} />
            Información del Parque
          </h2>
          <div className="space-y-3">
            {primaryOptions.map((item, index) => renderMenuItem(item, index))}
          </div>
        </div>

        {/* Soporte */}
        <div className="mb-8">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
            <Phone className="text-teal-500" size={24} />
            Contacto
          </h2>
          <div className="space-y-3">
            {supportOptions.map((item, index) => renderMenuItem(item, index))}
          </div>
        </div>

        {/* Footer Info */}
        <div className="mt-12 p-6 bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-lg">
          <div className="text-center mb-4">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
              Parque de Diversiones
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
              Tu diversión es nuestra prioridad
            </p>
          </div>
          
          <div className="flex items-center justify-center gap-4 mb-4">
            <a href="tel:+543534275749" className="p-3 rounded-full bg-green-100 dark:bg-green-900/30 hover:bg-green-200 dark:hover:bg-green-900/50 transition-colors">
              <Phone className="text-green-600 dark:text-green-400" size={22} />
            </a>
            <a href="https://www.instagram.com/lautaronovello/" target="_blank" rel="noopener noreferrer" className="p-3 rounded-full bg-pink-100 dark:bg-pink-900/30 hover:bg-pink-200 dark:hover:bg-pink-900/50 transition-colors">
              <Instagram className="text-pink-600 dark:text-pink-400" size={22} />
            </a>
          </div>

          <div className="text-center text-xs text-gray-500 dark:text-gray-400">
            <p>Versión 2.0.0</p>
            <p className="mt-1">© 2025 Parque de Diversiones. Todos los derechos reservados.</p>
          </div>
        </div>

        {/* Botón de Cerrar Sesión */}
        <button 
          onClick={handleLogout}
          className="w-full mt-6 flex items-center justify-center gap-3 py-4 px-6 rounded-2xl bg-gradient-to-r from-red-600 to-rose-600 text-white font-bold hover:shadow-2xl hover:shadow-red-500/50 transform hover:scale-105 transition-all duration-300"
        >
          <LogOut size={22} />
          Cerrar Sesión
        </button>
      </main>
    </div>
  )
}
