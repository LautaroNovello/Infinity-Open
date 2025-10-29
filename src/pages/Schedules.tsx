import { Search, Calendar, ChevronLeft } from 'lucide-react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function Schedules() {
  const navigate = useNavigate()
  const [activeFilter, setActiveFilter] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')

  const allAttractions = [
    {
      id: 1,
      name: 'Montaña Rusa del Dragón',
      category: 'thrill',
      schedule: 'Abierta: 10:00 AM - 9:00 PM',
      status: 'open',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAowht6DooEv_l4AbPxdpW66uLHXGTRFXw1fuPZ-bkcXGPmeMbsVBJ57UiRXp5QgM4fmFEnhCCGpaAoH_qAE325fk_aS9NQOwN2DQTqW4KxjQeSmpSscLcMVCyzooUqnG3lqyJ3MbGdtAc_YoNkIEo1e38wkdJ8P99pEMn9HbZxgv9h9kQy2ZaAtyxvjvv9Gdj96taBhpRcEMIiA5Gz7jKPGtUkH926IzwwSnPguJpAhs-zQsCpoCEpJfG1IUoDL5A_JhuTkiTomjk',
    },
    {
      id: 2,
      name: 'Carrusel Encantado',
      category: 'family',
      schedule: 'Abierta: 9:00 AM - 10:00 PM',
      status: 'open',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBkSpt10DFsryk6MFwQtUcmNl-WuNjj-CJWfNozLUxHaD6OEE5Er0i3HDrWe7OVZfYZgdkgWxvx7h9lTkCro3ZcqqLsx_SAmcI1Gi0oBeYGTjT4XFyCOqvfmeZHmolgVF03ATX7hUzAYRAQWIOr0_-vMr8Y1uSFOn8YG212RVx7TcSpH7QToG1koppZWJZ63btB9pBAyti2I-EM8Z71dNyArWzXbW1yQTBopoH_ih0GgmkKO2835MMFUpJzNZVe23LCQKWY2BzL54I',
    },
    {
      id: 3,
      name: 'Río de Rapids',
      category: 'water',
      schedule: 'Abierta: 11:00 AM - 8:00 PM',
      status: 'open',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD1z5bFeB2JnC63g9ULMISyICtlvYLgurq12nG5DI7quPJ25U4_nzsl08RJlx_C9IytdbLZzrBgplBz5hHYs0qWhxxedWxu21AY8mbVx5DS1Z_LPWqUhIcZj1X7A782dAefx4CLVfA9q1OREQdVobzjsilFuPhHNg5APrOf5M51JX5OeXvBohnXwtjRFIlxbbu5_eaP4ftdGq_m_uMv8faAk0d_VEPhHADwggv-HEbXmLkLqX5PkTkgF7az8M25Rmfieb5q7gBWQkQ',
    },
    {
      id: 4,
      name: 'Casa Embrujada',
      category: 'thrill',
      schedule: 'Cerrada temporalmente',
      status: 'closed',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCwhA23zdPRLbV22q0W-nrSFCYb3SBubErJoq4PtUf3SS9nqbffwuCke4F19YBRwFQJfRDSemRtFAd4f4bwDeqplQa4NEJSHACm6BtE2sWau96xJZBMPsPSIHq9pd5A44rPRmZOyupCkV4ZA0I_lkQ7x4wvKdZ3m8qX3zYkJyvscn4SBmPc5BxYRX0tIr6-VTAvqWEReU3XDG7BhI8wR63jLx7W0SevO8kKX4Y-9twj11BnsguHWAV_S9Kmk9tkmF8OjG_bfb-a7oE',
    },
    {
      id: 5,
      name: 'Toboganes Acuáticos',
      category: 'water',
      schedule: 'Abierta: 10:00 AM - 7:00 PM',
      status: 'open',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuApnHWu-M87w_1Lu0iKAe_6SPM4QgWNWxyGsvXlGyBxQhswS9tlgND8Ji-lmxZEBGVRH76T2pTot0FZRlL2OpZXo3umhyoxiJApMdY9MsDQ1tPjhvi35RUKSEeZJBZa8XEIJYwtHLjiNyGDb2STWKU_ICflJx5xErFX_QAGkrwlgcYnJYJrkbM4hi3xDhvF3ZflDsPIdvdOPmmfWj-ZvmeTFPWalArJI6soc_yzDsJ1GwZmO-v6XCsDKCQrIXs5YprorigMIVmqpH8',
    },
    {
      id: 6,
      name: 'Zona de Juegos Infantil',
      category: 'family',
      schedule: 'Abierta: 9:00 AM - 9:00 PM',
      status: 'open',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBkSpt10DFsryk6MFwQtUcmNl-WuNjj-CJWfNozLUxHaD6OEE5Er0i3HDrWe7OVZfYZgdkgWxvx7h9lTkCro3ZcqqLsx_SAmcI1Gi0oBeYGTjT4XFyCOqvfmeZHmolgVF03ATX7hUzAYRAQWIOr0_-vMr8Y1uSFOn8YG212RVx7TcSpH7QToG1koppZWJZ63btB9pBAyti2I-EM8Z71dNyArWzXbW1yQTBopoH_ih0GgmkKO2835MMFUpJzNZVe23LCQKWY2BzL54I',
    },
    {
      id: 7,
      name: 'Espectáculo de Delfines',
      category: 'shows',
      schedule: 'Abierta: 11:00 AM - 6:00 PM',
      status: 'open',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuApnHWu-M87w_1Lu0iKAe_6SPM4QgWNWxyGsvXlGyBxQhswS9tlgND8Ji-lmxZEBGVRH76T2pTot0FZRlL2OpZXo3umhyoxiJApMdY9MsDQ1tPjhvi35RUKSEeZJBZa8XEIJYwtHLjiNyGDb2STWKU_ICflJx5xErFX_QAGkrwlgcYnJYJrkbM4hi3xDhvF3ZflDsPIdvdOPmmfWj-ZvmeTFPWalArJI6soc_yzDsJ1GwZmO-v6XCsDKCQrIXs5YprorigMIVmqpH8',
    },
  ]

  const filters = [
    { id: 'all', label: 'Todo' },
    { id: 'thrill', label: 'Emoción' },
    { id: 'family', label: 'Familiar' },
    { id: 'shows', label: 'Espectáculos' },
    { id: 'water', label: 'Acuáticas' },
  ]

  const filteredAttractions = allAttractions
    .filter(attr => activeFilter === 'all' || attr.category === activeFilter)
    .filter(attr => attr.name.toLowerCase().includes(searchQuery.toLowerCase()))

  return (
    <div className="animate-fade-in min-h-screen bg-gray-100 dark:bg-[#111122]">
      {/* Back Button */}
      <div className="px-4 py-4 bg-gray-100 dark:bg-[#111122]">
        <button
          onClick={() => navigate('/more')}
          className="flex items-center gap-2 text-gray-700 dark:text-white hover:opacity-80 transition-opacity"
        >
          <ChevronLeft size={24} />
          <span className="text-lg font-semibold">Horarios de Atracciones</span>
        </button>
      </div>
      
      {/* Search Bar */}
      <div className="px-4 py-3 bg-gray-100 dark:bg-[#111122]">
        <label className="flex flex-col min-w-40 h-12 w-full">
          <div className="flex w-full flex-1 items-stretch rounded-lg h-full">
            <div className="text-gray-500 dark:text-[#9292c9] flex border-none bg-gray-200 dark:bg-[#232348] items-center justify-center pl-4 rounded-l-lg">
              <Search size={20} />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-r-lg text-gray-900 dark:text-white focus:outline-0 focus:ring-0 border-none bg-gray-200 dark:bg-[#232348] h-full placeholder:text-gray-500 dark:placeholder:text-[#9292c9] px-4 text-base font-normal leading-normal"
              placeholder="Buscar una atracción..."
            />
          </div>
        </label>
      </div>

      {/* Filter Pills */}
      <div className="flex gap-3 p-3 overflow-x-auto whitespace-nowrap">
        {filters.map((filter) => (
          <button
            key={filter.id}
            onClick={() => setActiveFilter(filter.id)}
            className={`flex h-8 shrink-0 items-center justify-center gap-x-2 rounded-full px-4 transition-colors ${
              activeFilter === filter.id
                ? 'bg-blue-600 dark:bg-primary text-white'
                : 'bg-gray-200 dark:bg-[#232348] text-gray-900 dark:text-white'
            }`}
          >
            <p className="text-sm font-medium leading-normal">{filter.label}</p>
          </button>
        ))}
      </div>

      {/* Attractions List */}
      <div className="flex flex-col gap-2 p-4 pb-24">
        {filteredAttractions.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-gray-500 dark:text-[#9292c9]">
              No se encontraron resultados
            </p>
          </div>
        ) : (
          filteredAttractions.map((attraction, index) => (
            <div
              key={attraction.id}
              className="flex items-center gap-4 bg-white dark:bg-gray-900/30 min-h-[72px] py-2 justify-between rounded-lg px-3 hover:shadow-md transition-shadow animate-slide-up border border-transparent dark:border-gray-800"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <div className="flex items-center gap-4">
                <div
                  className="bg-center bg-no-repeat aspect-square bg-cover rounded-lg w-16 h-16"
                  style={{ backgroundImage: `url("${attraction.image}")` }}
                />
                <div className="flex flex-col justify-center">
                  <p className="text-gray-900 dark:text-white text-base font-medium leading-normal line-clamp-1">
                    {attraction.name}
                  </p>
                  <div className="flex items-center gap-1.5">
                    <span
                      className={`w-2 h-2 rounded-full ${
                        attraction.status === 'open' ? 'bg-green-500' : 'bg-red-500'
                      }`}
                    />
                    <p className="text-gray-600 dark:text-[#9292c9] text-sm font-normal leading-normal line-clamp-2">
                      {attraction.schedule}
                    </p>
                  </div>
                </div>
              </div>
              <button className="text-gray-400 dark:text-gray-600 hover:text-blue-600 dark:hover:text-primary transition-colors">
                <Calendar size={20} />
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  )
}
