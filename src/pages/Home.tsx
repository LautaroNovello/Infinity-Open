import { Users } from 'lucide-react'

export default function Home() {
  const attractions = [
    {
      id: 1,
      name: 'Pileta de Olas',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuApnHWu-M87w_1Lu0iKAe_6SPM4QgWNWxyGsvXlGyBxQhswS9tlgND8Ji-lmxZEBGVRH76T2pTot0FZRlL2OpZXo3umhyoxiJApMdY9MsDQ1tPjhvi35RUKSEeZJBZa8XEIJYwtHLjiNyGDb2STWKU_ICflJx5xErFX_QAGkrwlgcYnJYJrkbM4hi3xDhvF3ZflDsPIdvdOPmmfWj-ZvmeTFPWalArJI6soc_yzDsJ1GwZmO-v6XCsDKCQrIXs5YprorigMIVmqpH8',
      capacity: 85,
      description: 'Disfruta de olas artificiales en una pileta gigante. Perfecto para toda la familia.',
    },
    {
      id: 2,
      name: 'Toboganes',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCwhA23zdPRLbV22q0W-nrSFCYb3SBubErJoq4PtUf3SS9nqbffwuCke4F19YBRwFQJfRDSemRtFAd4f4bwDeqplQa4NEJSHACm6BtE2sWau96xJZBMPsPSIHq9pd5A44rPRmZOyupCkV4ZA0I_lkQ7x4wvKdZ3m8qX3zYkJyvscn4SBmPc5BxYRX0tIr6-VTAvqWEReU3XDG7BhI8wR63jLx7W0SevO8kKX4Y-9twj11BnsguHWAV_S9Kmk9tkmF8OjG_bfb-a7oE',
      capacity: 65,
      description: 'Toboganes de alta velocidad y giros emocionantes. Adrenalina pura.',
    },
    {
      id: 3,
      name: 'Río Lento',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD1z5bFeB2JnC63g9ULMISyICtlvYLgurq12nG5DI7quPJ25U4_nzsl08RJlx_C9IytdbLZzrBgplBz5hHYs0qWhxxedWxu21AY8mbVx5DS1Z_LPWqUhIcZj1X7A782dAefx4CLVfA9q1OREQdVobzjsilFuPhHNg5APrOf5M51JX5OeXvBohnXwtjRFIlxbbu5_eaP4ftdGq_m_uMv8faAk0d_VEPhHADwggv-HEbXmLkLqX5PkTkgF7az8M25Rmfieb5q7gBWQkQ',
      capacity: 72,
      description: 'Relájate flotando en el río con corriente suave que rodea el parque.',
    },
    {
      id: 4,
      name: 'Piletas para Niños',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBkSpt10DFsryk6MFwQtUcmNl-WuNjj-CJWfNozLUxHaD6OEE5Er0i3HDrWe7OVZfYZgdkgWxvx7h9lTkCro3ZcqqLsx_SAmcI1Gi0oBeYGTjT4XFyCOqvfmeZHmolgVF03ATX7hUzAYRAQWIOr0_-vMr8Y1uSFOn8YG212RVx7TcSpH7QToG1koppZWJZ63btB9pBAyti2I-EM8Z71dNyArWzXbW1yQTBopoH_ih0GgmkKO2835MMFUpJzNZVe23LCQKWY2BzL54I',
      capacity: 45,
      description: 'Área segura con poca profundidad y juegos acuáticos para los más pequeños.',
    },
    {
      id: 5,
      name: 'Jacuzzis',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCaTNnw6qeKbc_3n-xT9tXacXFnoiEmu0kYUsrmd0nElCZ9zB5r51Pny6p2Te1iq_jeVy0EuVsJjB6JV1PUOF-jJqSGQezwJ3Z36Fkd21Q-3Td9jmr8sQ2BO_hKSWeI86mN9lB5zP7ZM9ORWylDXSq-_ZMXTU5Nn4IPPb4L3To81kgKhlK5a-7JN8KgLiHkixsi5g9X-td3f4c_PgNyTG8sb-ObxjJOy8e1BDy6RhkIYimjUcjgqi9eRErRQtYQeednU_vk2aX0sRY',
      capacity: 90,
      description: 'Múltiples jacuzzis con agua caliente para relajar tus músculos.',
    },
    {
      id: 6,
      name: 'Piscinas de Hidromasajes',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC_7sF4ZQ7k_JLAkrrIUJUDo2Xi6ihrLcnHsooKxmF76erOhXZnpyspJzsJfF2W2ZH80QCeEbJNRiWIX-WQTMXJ6azhwmo7qofB8VyKC-8z-SP_XDrm1HHsYyfJi37lTaawJKCADE-ZQ_1Iwn4gDtekhqp2uzBrSw7voeA6AhZIdIeGDXFW6DycgxADnhL7cWBovM7AnRBm5Hho_25FPXkk6ysc1Ea_N6HuL_bmlfDHsXH3WUWSaREYi2bhgVxJM90oaHxqe0wUYbw',
      capacity: 58,
      description: 'Piscinas terapéuticas con chorros de agua para masajes.',
    },
  ]

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

  return (
    <div className="animate-fade-in pb-2">
      {/* Hero Image with gradient overlay */}
      <div className="relative w-full h-64">
        <img
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuACl2ra9Y_aSbsnNQ8LoF9dVNk_Dgk4Il4KY4guJnNkmGelIGuTazxj0K-waVYwFPT7aYD6VpfRlAcMwunIeaDfqBvPaENlp5J3zdeK3GrrwZ0qrljLiXiIoXweUr9aYCP_ur6b4P02DAIUQQG44k5zhz0qNlBYGsl1JGcuAfIQBhsIPJS0qDHnaDtQjIJTePBqNgggh92NZ9D8TRF1DdmZoIgtDhgEb4xFixasP9xRkb6Y9LGf4xFjFQ3U0JyS8LPU3WOLzZS2Db0"
          alt="Río Lento en el parque acuático"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-100 dark:from-[#111122] to-transparent" />
      </div>

      {/* Content */}
      <div className="px-4 -mt-8 relative z-10">
        <h2 className="text-gray-900 dark:text-white text-2xl font-bold leading-tight tracking-tight mb-6">
          Atracciones del Parque
        </h2>
      </div>

      {/* Attractions Grid - Single column for detailed cards */}
      <div className="p-4 space-y-4">
        {attractions.map((attraction, index) => (
          <div
            key={attraction.id}
            className="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-lg cursor-pointer animate-slide-up hover:shadow-2xl transition-all duration-300 hover:scale-[1.02]"
            style={{ animationDelay: `${index * 50}ms` }}
          >
            {/* Image */}
            <div className="relative h-48 overflow-hidden">
              <img
                src={attraction.image}
                alt={attraction.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <h3 className="absolute bottom-3 left-4 text-white text-xl font-bold">
                {attraction.name}
              </h3>
            </div>

            {/* Content */}
            <div className="p-4 space-y-3">
              {/* Capacity Badge */}
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2 flex-1">
                  <Users size={18} className={getCapacityColor(attraction.capacity).split(' ')[0]} />
                  <span className={`text-sm font-semibold ${getCapacityColor(attraction.capacity).split(' ')[0]}`}>
                    {attraction.capacity}%
                  </span>
                  <div className="flex-1 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full transition-all duration-500 ${
                        attraction.capacity >= 70
                          ? 'bg-red-500'
                          : attraction.capacity >= 40
                          ? 'bg-yellow-500'
                          : 'bg-green-500'
                      }`}
                      style={{ width: `${attraction.capacity}%` }}
                    />
                  </div>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-bold ${getCapacityColor(attraction.capacity)}`}>
                  Aforo {getCapacityLabel(attraction.capacity)}
                </span>
              </div>

              {/* Description */}
              <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
                {attraction.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

