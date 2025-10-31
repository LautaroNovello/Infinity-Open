import { Zap, Wrench, PartyPopper, Users, ChevronLeft, Droplets, Gift, Utensils, Star, Clock, MapPin, AlertTriangle, Heart, Sparkles } from 'lucide-react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function Alerts() {
  const navigate = useNavigate()
  const [activeFilter, setActiveFilter] = useState('all')

  const allAlerts = [
    {
      id: 1,
      title: 'Advertencia de Tormenta',
      message: 'Busque refugio en interiores hasta nuevo aviso.',
      time: 'Ahora',
      icon: Zap,
      color: 'text-red-500',
      bgColor: 'bg-red-500/20',
      indicatorColor: 'bg-red-500',
      active: true,
      category: 'weather',
    },
    {
      id: 2,
      title: "La Montaña Rusa 'El Dragón' está temporalmente cerrada",
      message: 'Esperamos reabrir a las 3:00 PM.',
      time: 'hace 10 min',
      icon: Wrench,
      color: 'text-yellow-500',
      bgColor: 'bg-yellow-500/20',
      indicatorColor: 'bg-yellow-500',
      active: true,
      category: 'attractions',
    },
    {
      id: 3,
      title: '¡No te pierdas el desfile de luces!',
      message: 'Esta noche a las 9:00 PM en la calle principal.',
      time: 'hace 1 hora',
      icon: PartyPopper,
      color: 'text-green-500',
      bgColor: 'bg-green-500/20',
      indicatorColor: 'bg-green-500',
      active: false,
      category: 'events',
    },
    {
      id: 4,
      title: "El área de 'Fantasyland' ha alcanzado su capacidad máxima",
      message: 'Por favor, visite otras áreas del parque.',
      time: 'hace 2 horas',
      icon: Users,
      color: 'text-orange-500',
      bgColor: 'bg-orange-500/20',
      indicatorColor: 'bg-orange-500',
      active: false,
      category: 'capacity',
    },
    {
      id: 5,
      title: 'Alerta de Lluvia Ligera',
      message: 'Se esperan lluvias leves durante la próxima hora. Los paraguas están disponibles en las tiendas.',
      time: 'hace 15 min',
      icon: Droplets,
      color: 'text-blue-500',
      bgColor: 'bg-blue-500/20',
      indicatorColor: 'bg-blue-500',
      active: true,
      category: 'weather',
    },
    {
      id: 6,
      title: '¡Promoción Especial en Merchandise!',
      message: '30% de descuento en todos los productos de la tienda principal hasta las 6:00 PM.',
      time: 'hace 30 min',
      icon: Gift,
      color: 'text-purple-500',
      bgColor: 'bg-purple-500/20',
      indicatorColor: 'bg-purple-500',
      active: true,
      category: 'promos',
    },
    {
      id: 7,
      title: 'Nueva Atracción Disponible',
      message: "La nueva montaña rusa 'Vortex Espacial' ya está abierta. ¡Ven a disfrutarla!",
      time: 'hace 45 min',
      icon: Star,
      color: 'text-pink-500',
      bgColor: 'bg-pink-500/20',
      indicatorColor: 'bg-pink-500',
      active: true,
      category: 'attractions',
    },
    {
      id: 8,
      title: 'Tiempo de Espera Reducido',
      message: "La atracción 'Carrusel Mágico' tiene solo 5 minutos de espera ahora.",
      time: 'hace 20 min',
      icon: Clock,
      color: 'text-teal-500',
      bgColor: 'bg-teal-500/20',
      indicatorColor: 'bg-teal-500',
      active: true,
      category: 'attractions',
    },
    {
      id: 9,
      title: 'Restaurante con Descuento',
      message: "El restaurante 'La Fuente Dorada' ofrece 2x1 en combos hasta las 4:00 PM.",
      time: 'hace 1 hora',
      icon: Utensils,
      color: 'text-amber-500',
      bgColor: 'bg-amber-500/20',
      indicatorColor: 'bg-amber-500',
      active: false,
      category: 'food',
    },
    {
      id: 10,
      title: 'Show de Fuegos Artificiales',
      message: 'Espectacular show pirotécnico a las 10:00 PM. Vista desde la Plaza Central.',
      time: 'hace 2 horas',
      icon: Sparkles,
      color: 'text-indigo-500',
      bgColor: 'bg-indigo-500/20',
      indicatorColor: 'bg-indigo-500',
      active: false,
      category: 'events',
    },
    {
      id: 11,
      title: 'Zona de Juegos Acuáticos Cerrada',
      message: 'Mantenimiento programado. Reapertura estimada: 5:00 PM.',
      time: 'hace 3 horas',
      icon: AlertTriangle,
      color: 'text-red-600',
      bgColor: 'bg-red-600/20',
      indicatorColor: 'bg-red-600',
      active: false,
      category: 'attractions',
    },
    {
      id: 12,
      title: 'Encuentra el Personaje Especial',
      message: "¡El Capitán Adventure está en la zona de 'Aventura Land' para fotos hasta las 3:30 PM!",
      time: 'hace 40 min',
      icon: MapPin,
      color: 'text-green-600',
      bgColor: 'bg-green-600/20',
      indicatorColor: 'bg-green-600',
      active: true,
      category: 'events',
    },
    {
      id: 13,
      title: 'Día de Cumpleaños Gratis',
      message: '¡Feliz cumpleaños! Muestra tu DNI en cualquier atracción para un pase express gratuito.',
      time: 'hace 5 horas',
      icon: Heart,
      color: 'text-rose-500',
      bgColor: 'bg-rose-500/20',
      indicatorColor: 'bg-rose-500',
      active: false,
      category: 'promos',
    },
  ]

  const filters = [
    { id: 'all', label: 'Todos' },
    { id: 'weather', label: 'Clima' },
    { id: 'attractions', label: 'Atracciones' },
    { id: 'events', label: 'Eventos' },
    { id: 'promos', label: 'Promociones' },
    { id: 'food', label: 'Comida' },
    { id: 'capacity', label: 'Aforo' },
  ]

  const filteredAlerts = allAlerts.filter(
    alert => activeFilter === 'all' || alert.category === activeFilter
  )

  return (
    <div className="animate-fade-in min-h-screen bg-gray-100 dark:bg-[#111122] pb-20">
      {/* Back Button */}
      <div className="px-4 py-4 bg-gray-100 dark:bg-[#111122]">
        <button
          onClick={() => navigate('/more')}
          className="flex items-center gap-2 text-gray-700 dark:text-white hover:opacity-80 transition-opacity"
        >
          <ChevronLeft size={24} />
          <span className="text-lg font-semibold">Alertas y Notificaciones</span>
        </button>
      </div>
      
      {/* Filter Tabs */}
      <div className="flex gap-3 p-4 overflow-x-auto bg-gray-100 dark:bg-[#111122]">
        {filters.map((filter) => (
          <button
            key={filter.id}
            onClick={() => setActiveFilter(filter.id)}
            className={`flex h-8 shrink-0 items-center justify-center gap-x-2 rounded-lg px-4 transition-colors ${
              activeFilter === filter.id
                ? 'bg-blue-600/20 dark:bg-primary/30 text-blue-600 dark:text-white'
                : 'bg-gray-200 dark:bg-gray-800 text-gray-900 dark:text-white'
            }`}
          >
            <p className="text-sm font-medium leading-normal">{filter.label}</p>
          </button>
        ))}
      </div>

      {/* Alerts List */}
      <div className="flex flex-col bg-gray-100 dark:bg-[#111122]">
        {filteredAlerts.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-gray-500 dark:text-gray-400">
              No hay alertas en esta categoría
            </p>
          </div>
        ) : (
          filteredAlerts.map((alert, index) => (
            <div
              key={alert.id}
              className="flex gap-4 bg-white dark:bg-gray-900/30 px-4 py-3 justify-between border-b border-gray-200 dark:border-gray-800 animate-slide-up hover:bg-gray-50 dark:hover:bg-gray-900/40 transition-colors"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <div className="flex items-start gap-4">
                <div className={`${alert.color} flex items-center justify-center rounded-lg ${alert.bgColor} shrink-0 w-12 h-12`}>
                  <alert.icon size={24} />
                </div>
                <div className="flex flex-1 flex-col justify-center">
                  <p className="text-gray-900 dark:text-white text-base font-medium leading-normal">
                    {alert.title}
                  </p>
                  <p className="text-gray-500 dark:text-gray-400 text-sm font-normal leading-normal">
                    {alert.message}
                  </p>
                </div>
              </div>
              <div className="shrink-0 flex flex-col items-end gap-1">
                <p className="text-gray-500 dark:text-gray-400 text-sm font-normal leading-normal">
                  {alert.time}
                </p>
                {alert.active && (
                  <div className={`w-2 h-2 rounded-full ${alert.indicatorColor}`} />
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}
