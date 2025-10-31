import { Users, Clock, Thermometer, Droplets, TrendingUp, Star, MapPin, Zap } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

export default function Home() {
  const navigate = useNavigate()
  const attractions = [
    {
      id: 1,
      name: 'Pileta de Olas',
      image: 'https://images.unsplash.com/photo-1561214115-f2f134cc4912?w=800&auto=format&fit=crop&q=80',
      capacity: 85,
      description: 'Disfruta de olas artificiales en una pileta gigante. Perfecto para toda la familia.',
      rating: 4.8,
      waitTime: '15 min',
      intensity: 'Media',
    },
    {
      id: 2,
      name: 'Toboganes',
      image: 'https://images.unsplash.com/photo-1587502537147-2ba64a117f59?w=800&auto=format&fit=crop&q=80',
      capacity: 65,
      description: 'Toboganes de alta velocidad y giros emocionantes. Adrenalina pura.',
      rating: 4.9,
      waitTime: '20 min',
      intensity: 'Alta',
    },
    {
      id: 3,
      name: 'Río Lento',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD1z5bFeB2JnC63g9ULMISyICtlvYLgurq12nG5DI7quPJ25U4_nzsl08RJlx_C9IytdbLZzrBgplBz5hHYs0qWhxxedWxu21AY8mbVx5DS1Z_LPWqUhIcZj1X7A782dAefx4CLVfA9q1OREQdVobzjsilFuPhHNg5APrOf5M51JX5OeXvBohnXwtjRFIlxbbu5_eaP4ftdGq_m_uMv8faAk0d_VEPhHADwggv-HEbXmLkLqX5PkTkgF7az8M25Rmfieb5q7gBWQkQ',
      capacity: 72,
      description: 'Relájate flotando en el río con corriente suave que rodea el parque.',
      rating: 4.6,
      waitTime: '5 min',
      intensity: 'Baja',
    },
    {
      id: 4,
      name: 'Piletas para Niños',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBkSpt10DFsryk6MFwQtUcmNl-WuNjj-CJWfNozLUxHaD6OEE5Er0i3HDrWe7OVZfYZgdkgWxvx7h9lTkCro3ZcqqLsx_SAmcI1Gi0oBeYGTjT4XFyCOqvfmeZHmolgVF03ATX7hUzAYRAQWIOr0_-vMr8Y1uSFOn8YG212RVx7TcSpH7QToG1koppZWJZ63btB9pBAyti2I-EM8Z71dNyArWzXbW1yQTBopoH_ih0GgmkKO2835MMFUpJzNZVe23LCQKWY2BzL54I',
      capacity: 45,
      description: 'Área segura con poca profundidad y juegos acuáticos para los más pequeños.',
      rating: 4.7,
      waitTime: '0 min',
      intensity: 'Baja',
    },
    {
      id: 5,
      name: 'Jacuzzis',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCaTNnw6qeKbc_3n-xT9tXacXFnoiEmu0kYUsrmd0nElCZ9zB5r51Pny6p2Te1iq_jeVy0EuVsJjB6JV1PUOF-jJqSGQezwJ3Z36Fkd21Q-3Td9jmr8sQ2BO_hKSWeI86mN9lB5zP7ZM9ORWylDXSq-_ZMXTU5Nn4IPPb4L3To81kgKhlK5a-7JN8KgLiHkixsi5g9X-td3f4c_PgNyTG8sb-ObxjJOy8e1BDy6RhkIYimjUcjgqi9eRErRQtYQeednU_vk2aX0sRY',
      capacity: 90,
      description: 'Múltiples jacuzzis con agua caliente para relajar tus músculos.',
      rating: 4.9,
      waitTime: '25 min',
      intensity: 'Baja',
    },
    {
      id: 6,
      name: 'Piscinas de Hidromasajes',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC_7sF4ZQ7k_JLAkrrIUJUDo2Xi6ihrLcnHsooKxmF76erOhXZnpyspJzsJfF2W2ZH80QCeEbJNRiWIX-WQTMXJ6azhwmo7qofB8VyKC-8z-SP_XDrm1HHsYyfJi37lTaawJKCADE-ZQ_1Iwn4gDtekhqp2uzBrSw7voeA6AhZIdIeGDXFW6DycgxADnhL7cWBovM7AnRBm5Hho_25FPXkk6ysc1Ea_N6HuL_bmlfDHsXH3WUWSaREYi2bhgVxJM90oaHxqe0wUYbw',
      capacity: 58,
      description: 'Piscinas terapéuticas con chorros de agua para masajes.',
      rating: 4.5,
      waitTime: '10 min',
      intensity: 'Baja',
    },
  ]

  // Calcular estadísticas del parque
  const parkStats = {
    avgCapacity: Math.round(attractions.reduce((acc, a) => acc + a.capacity, 0) / attractions.length),
    totalAttractions: attractions.length,
    temperature: 28,
    weather: 'Soleado',
  }

  const getCapacityColor = (capacity: number) => {
    if (capacity >= 70) return 'text-red-600 dark:text-red-400 bg-red-100 dark:bg-red-900/30'
    if (capacity >= 40) return 'text-yellow-600 dark:text-yellow-400 bg-yellow-100 dark:bg-yellow-900/30'
    return 'text-green-600 dark:text-green-400 bg-green-100 dark:bg-green-900/30'
  }

  const getCapacityLabel = (capacity: number) => {
    if (capacity >= 70) return 'Alto'
    if (capacity >= 40) return 'Medio'
    return 'Bajo'
  }

  const getIntensityIcon = (intensity: string) => {
    if (intensity === 'Alta') return <Zap size={10} className="text-orange-500" />
    if (intensity === 'Media') return <TrendingUp size={10} className="text-blue-500" />
    return <Droplets size={10} className="text-cyan-500" />
  }

  const handleAttractionClick = (attractionId: number, attractionName: string) => {
    // Navegar a la página de mapas con el ID de la atracción
    navigate('/maps', { state: { attractionId, attractionName } })
  }

  return (
    <div className="animate-fade-in pb-20 bg-gray-50 dark:bg-[#0a0a1a]">
      {/* Hero Section - Más compacto */}
      <div className="relative w-full h-56 overflow-hidden bg-gray-200 dark:bg-gray-800">
        <img
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuACl2ra9Y_aSbsnNQ8LoF9dVNk_Dgk4Il4KY4guJnNkmGelIGuTazxj0K-waVYwFPT7aYD6VpfRlAcMwunIeaDfqBvPaENlp5J3zdeK3GrrwZ0qrljLiXiIoXweUr9aYCP_ur6b4P02DAIUQQG44k5zhz0qNlBYGsl1JGcuAfIQBhsIPJS0qDHnaDtQjIJTePBqNgggh92NZ9D8TRF1DdmZoIgtDhgEb4xFixasP9xRkb6Y9LGf4xFjFQ3U0JyS8LPU3WOLzZS2Db0"
          alt="Infinity Open Parque Acuático"
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-gray-50 dark:to-[#0a0a1a]" />
        
        {/* Hero Content - Más compacto */}
        <div className="absolute inset-0 flex flex-col justify-end p-4 pb-6">
          <h1 className="text-white text-2xl font-bold leading-tight tracking-tight mb-1 drop-shadow-lg">
            ¡Bienvenido a Infinity Open!
          </h1>
          <p className="text-white/90 text-sm font-medium drop-shadow-md">
            Disfruta del mejor parque acuático
          </p>
        </div>
      </div>

      {/* Stats Cards - Más compactas */}
      <div className="px-4 -mt-10 relative z-10 mb-5">
        <div className="grid grid-cols-2 gap-2.5">
          <div className="bg-gradient-to-br from-orange-500 to-red-500 dark:from-orange-600 dark:to-red-600 rounded-xl p-3 shadow-xl animate-slide-up backdrop-blur-sm">
            <div className="flex items-center gap-1.5 mb-0.5">
              <Thermometer size={16} className="text-white" />
              <span className="text-white/90 text-[10px] font-medium">Temperatura</span>
            </div>
            <p className="text-white text-xl font-bold">{parkStats.temperature}°C</p>
            <p className="text-white/80 text-[10px] mt-0.5">{parkStats.weather}</p>
          </div>

          <div className="bg-gradient-to-br from-blue-500 to-cyan-500 dark:from-blue-600 dark:to-cyan-600 rounded-xl p-3 shadow-xl animate-slide-up backdrop-blur-sm" style={{ animationDelay: '50ms' }}>
            <div className="flex items-center gap-1.5 mb-0.5">
              <Users size={16} className="text-white" />
              <span className="text-white/90 text-[10px] font-medium">Aforo Promedio</span>
            </div>
            <p className="text-white text-xl font-bold">{parkStats.avgCapacity}%</p>
            <p className="text-white/80 text-[10px] mt-0.5">{parkStats.totalAttractions} atracciones</p>
          </div>
        </div>
      </div>

      {/* Section Header */}
      <div className="px-4 mb-3">
        <h2 className="text-gray-900 dark:text-white text-xl font-bold leading-tight tracking-tight mb-0.5">
          Atracciones Populares
        </h2>
        <p className="text-gray-600 dark:text-gray-400 text-xs">
          Toca para ver en el mapa
        </p>
      </div>

      {/* Attractions Grid - DISEÑO MEJORADO Y COMPACTO */}
      <div className="px-4 grid grid-cols-2 gap-3">
        {attractions.map((attraction, index) => (
          <div
            key={attraction.id}
            onClick={() => handleAttractionClick(attraction.id, attraction.name)}
            className="group bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer animate-slide-up border border-gray-200 dark:border-gray-700"
            style={{ animationDelay: `${index * 40}ms` }}
          >
            {/* Image compacta con overlay */}
            <div className="relative h-32 overflow-hidden bg-gray-200 dark:bg-gray-700">
              <img
                src={attraction.image}
                alt={attraction.name}
                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
              
              {/* Rating badge */}
              <div className="absolute top-2 right-2 flex items-center gap-0.5 bg-yellow-500/95 backdrop-blur-sm px-1.5 py-0.5 rounded-md shadow-lg">
                <Star size={10} className="text-white fill-white" />
                <span className="text-white text-[10px] font-bold">{attraction.rating}</span>
              </div>

              {/* Capacity badge */}
              <div className={`absolute top-2 left-2 px-1.5 py-0.5 rounded-md text-[9px] font-bold backdrop-blur-sm shadow-lg ${
                attraction.capacity >= 70
                  ? 'bg-red-500/95 text-white'
                  : attraction.capacity >= 40
                  ? 'bg-yellow-500/95 text-white'
                  : 'bg-green-500/95 text-white'
              }`}>
                {attraction.capacity}%
              </div>
              
              {/* Title */}
              <div className="absolute bottom-2 left-2 right-2">
                <h3 className="text-white text-sm font-bold leading-tight drop-shadow-lg line-clamp-2">
                  {attraction.name}
                </h3>
              </div>
            </div>

            {/* Content compacto */}
            <div className="p-2.5 space-y-2">
              {/* Quick Info Badges - más compactos */}
              <div className="flex items-center gap-1.5 flex-wrap">
                <div className="flex items-center gap-1 bg-gray-100 dark:bg-gray-700 px-1.5 py-0.5 rounded-md">
                  <Clock size={10} className="text-gray-600 dark:text-gray-300" />
                  <span className="text-gray-700 dark:text-gray-300 text-[9px] font-medium">{attraction.waitTime}</span>
                </div>
                <div className="flex items-center gap-1 bg-gray-100 dark:bg-gray-700 px-1.5 py-0.5 rounded-md">
                  {getIntensityIcon(attraction.intensity)}
                  <span className="text-gray-700 dark:text-gray-300 text-[9px] font-medium">{attraction.intensity}</span>
                </div>
              </div>

              {/* Progress Bar compacto */}
              <div className="relative w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1.5 overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all duration-700 ${
                    attraction.capacity >= 70
                      ? 'bg-gradient-to-r from-red-500 to-red-600'
                      : attraction.capacity >= 40
                      ? 'bg-gradient-to-r from-yellow-500 to-yellow-600'
                      : 'bg-gradient-to-r from-green-500 to-green-600'
                  }`}
                  style={{ width: `${attraction.capacity}%` }}
                >
                  <div className="w-full h-full bg-white/30 animate-pulse-slow"></div>
                </div>
              </div>

              {/* Action Button compacto */}
              <div className="w-full bg-blue-600 dark:bg-primary text-white font-semibold py-1.5 px-3 rounded-lg transition-all duration-200 flex items-center justify-center gap-1.5 text-xs group-hover:bg-blue-700 dark:group-hover:bg-primary/90 group-hover:shadow-md">
                <MapPin size={12} />
                Ver Mapa
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Bottom spacing */}
      <div className="h-2"></div>
    </div>
  )
}

