import { Search, Star, ChevronLeft } from 'lucide-react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function Capacity() {
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState('attractions')
  const [searchQuery, setSearchQuery] = useState('')
  const [favorites, setFavorites] = useState<number[]>([2])

  const allAttractions = [
    {
      id: 1,
      name: 'Montaña del Dragón',
      category: 'attractions',
      capacity: 'Alto',
      waitTime: '45 min',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA7WFw3YvCqtc5WD6TDqiWPbP43xILxc1MONTB9il8QOz20twxMnKotiFYFa8FoAaWd91b3_COMrgeC3OxipIDJlefe1lK_8FGHNXA6yZzbL5NIcJ1YjOxaTfWAZTCb1v_8kMgaRElXVSIYvxStDxltFpyMw6XJwFjVzam56aonsUwTuxOE33_mNh7ZDk9MlAwNad7PS8_2zaUJFVLlNrlhY8un3aMp2QKOMGZSofGvGeXkAb2mAry2sm1HR3yHMbZU4Opj7SPkxpw',
      color: 'text-red-500',
      bgColor: 'bg-red-500',
    },
    {
      id: 2,
      name: 'Restaurante El Pirata',
      category: 'restaurants',
      capacity: 'Moderado',
      waitTime: '20 min',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC_wKjEMScwu5I8WCWN33nORAmHBnBaprmb_SuN29m2_YW78TS_1i3ohzZChE6HYeUo3AbEiGjVUB2_-K4S0UHfnjvT6GwMvcwnY4yJUZKfCAi1zqlZLgAkQb6EsBRD8j18oPWDsHl39wAZ1sAo8DfSernOmsUu05ioGhmOPXAEBO8TNzpQEXKnEvXDM1_S0_v6RRESZ14Gq6iehgnKt6t1cY10Pi4LNopA7j5tuO48PfQk5vvo7aPcGd-J3Ry_D72_fCfavKMmyn8',
      color: 'text-yellow-500',
      bgColor: 'bg-yellow-500',
    },
    {
      id: 3,
      name: 'Carrusel Mágico',
      category: 'attractions',
      capacity: 'Bajo',
      waitTime: '5 min',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBkSpt10DFsryk6MFwQtUcmNl-WuNjj-CJWfNozLUxHaD6OEE5Er0i3HDrWe7OVZfYZgdkgWxvx7h9lTkCro3ZcqqLsx_SAmcI1Gi0oBeYGTjT4XFyCOqvfmeZHmolgVF03ATX7hUzAYRAQWIOr0_-vMr8Y1uSFOn8YG212RVx7TcSpH7QToG1koppZWJZ63btB9pBAyti2I-EM8Z71dNyArWzXbW1yQTBopoH_ih0GgmkKO2835MMFUpJzNZVe23LCQKWY2BzL54I',
      color: 'text-green-500',
      bgColor: 'bg-green-500',
    },
    {
      id: 4,
      name: 'Toboganes Acuáticos',
      category: 'attractions',
      capacity: 'Alto',
      waitTime: '40 min',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCwhA23zdPRLbV22q0W-nrSFCYb3SBubErJoq4PtUf3SS9nqbffwuCke4F19YBRwFQJfRDSemRtFAd4f4bwDeqplQa4NEJSHACm6BtE2sWau96xJZBMPsPSIHq9pd5A44rPRmZOyupCkV4ZA0I_lkQ7x4wvKdZ3m8qX3zYkJyvscn4SBmPc5BxYRX0tIr6-VTAvqWEReU3XDG7BhI8wR63jLx7W0SevO8kKX4Y-9twj11BnsguHWAV_S9Kmk9tkmF8OjG_bfb-a7oE',
      color: 'text-red-500',
      bgColor: 'bg-red-500',
    },
    {
      id: 5,
      name: 'Espectáculo de Delfines',
      category: 'shows',
      capacity: 'Moderado',
      waitTime: '15 min',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuApnHWu-M87w_1Lu0iKAe_6SPM4QgWNWxyGsvXlGyBxQhswS9tlgND8Ji-lmxZEBGVRH76T2pTot0FZRlL2OpZXo3umhyoxiJApMdY9MsDQ1tPjhvi35RUKSEeZJBZa8XEIJYwtHLjiNyGDb2STWKU_ICflJx5xErFX_QAGkrwlgcYnJYJrkbM4hi3xDhvF3ZflDsPIdvdOPmmfWj-ZvmeTFPWalArJI6soc_yzDsJ1GwZmO-v6XCsDKCQrIXs5YprorigMIVmqpH8',
      color: 'text-yellow-500',
      bgColor: 'bg-yellow-500',
    },
    {
      id: 6,
      name: 'Zona Infantil',
      category: 'kids',
      capacity: 'Bajo',
      waitTime: '10 min',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBkSpt10DFsryk6MFwQtUcmNl-WuNjj-CJWfNozLUxHaD6OEE5Er0i3HDrWe7OVZfYZgdkgWxvx7h9lTkCro3ZcqqLsx_SAmcI1Gi0oBeYGTjT4XFyCOqvfmeZHmolgVF03ATX7hUzAYRAQWIOr0_-vMr8Y1uSFOn8YG212RVx7TcSpH7QToG1koppZWJZ63btB9pBAyti2I-EM8Z71dNyArWzXbW1yQTBopoH_ih0GgmkKO2835MMFUpJzNZVe23LCQKWY2BzL54I',
      color: 'text-green-500',
      bgColor: 'bg-green-500',
    },
    {
      id: 7,
      name: 'Cafetería Central',
      category: 'restaurants',
      capacity: 'Bajo',
      waitTime: '5 min',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC_wKjEMScwu5I8WCWN33nORAmHBnBaprmb_SuN29m2_YW78TS_1i3ohzZChE6HYeUo3AbEiGjVUB2_-K4S0UHfnjvT6GwMvcwnY4yJUZKfCAi1zqlZLgAkQb6EsBRD8j18oPWDsHl39wAZ1sAo8DfSernOmsUu05ioGhmOPXAEBO8TNzpQEXKnEvXDM1_S0_v6RRESZ14Gq6iehgnKt6t1cY10Pi4LNopA7j5tuO48PfQk5vvo7aPcGd-J3Ry_D72_fCfavKMmyn8',
      color: 'text-green-500',
      bgColor: 'bg-green-500',
    },
  ]

  const tabs = [
    { id: 'attractions', label: 'Atracciones' },
    { id: 'restaurants', label: 'Restaurantes' },
    { id: 'shows', label: 'Espectáculos' },
    { id: 'kids', label: 'Zonas Infantiles' },
    { id: 'favorites', label: 'Mis Favoritos' },
  ]

  const toggleFavorite = (id: number) => {
    setFavorites(prev =>
      prev.includes(id) ? prev.filter(fav => fav !== id) : [...prev, id]
    )
  }

  const filteredAttractions = allAttractions
    .filter(attr => {
      if (activeTab === 'favorites') return favorites.includes(attr.id)
      return attr.category === activeTab
    })
    .filter(attr => 
      attr.name.toLowerCase().includes(searchQuery.toLowerCase())
    )

  return (
    <div className="animate-fade-in min-h-screen bg-gray-100 dark:bg-[#111122]">
      {/* Back Button */}
      <div className="px-4 py-4 sticky top-0 bg-gray-100 dark:bg-[#111122] z-10">
        <button
          onClick={() => navigate('/more')}
          className="flex items-center gap-2 text-gray-700 dark:text-white"
        >
          <ChevronLeft size={24} />
          <span className="text-lg font-semibold">Aforo en Tiempo Real</span>
        </button>
      </div>
      
      {/* Search Bar - Sticky */}
      <div className="px-4 py-3 sticky top-0 bg-gray-100 dark:bg-[#111122] z-10">
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
              placeholder="Buscar atracción"
            />
          </div>
        </label>
      </div>

      {/* Tabs - Sticky with horizontal scroll */}
      <div className="pb-3 sticky top-[72px] bg-gray-100 dark:bg-[#111122] z-10 overflow-x-auto">
        <div className="flex border-b border-gray-300 dark:border-[#323267] px-4 gap-8">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex flex-col items-center justify-center border-b-[3px] pb-[13px] pt-4 whitespace-nowrap transition-colors ${
                activeTab === tab.id
                  ? 'border-b-blue-600 dark:border-b-primary text-blue-600 dark:text-white'
                  : 'border-b-transparent text-gray-500 dark:text-[#9292c9]'
              }`}
            >
              <p className="text-sm font-bold leading-normal tracking-[0.015em]">{tab.label}</p>
            </button>
          ))}
        </div>
      </div>

      {/* Attractions List */}
      <div className="p-4 space-y-4 pb-24">
        {filteredAttractions.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-gray-500 dark:text-[#9292c9]">
              {activeTab === 'favorites' ? 'No tienes favoritos aún' : 'No se encontraron resultados'}
            </p>
          </div>
        ) : (
          filteredAttractions.map((attraction, index) => (
            <div
              key={attraction.id}
              className="flex items-stretch justify-between gap-4 rounded-lg bg-white dark:bg-[#191933] p-4 shadow-sm hover:shadow-md transition-shadow animate-slide-up"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              {/* Image */}
              <div
                className="w-24 h-24 bg-center bg-no-repeat bg-cover rounded-lg flex-shrink-0"
                style={{ backgroundImage: `url("${attraction.image}")` }}
              />

              {/* Info */}
              <div className="flex flex-col gap-1 flex-1">
                <div className="flex justify-between items-start">
                  <p className="text-gray-900 dark:text-white text-base font-bold leading-tight">
                    {attraction.name}
                  </p>
                  <button onClick={() => toggleFavorite(attraction.id)}>
                    {favorites.includes(attraction.id) ? (
                      <Star className="text-blue-600 dark:text-primary fill-current" size={20} />
                    ) : (
                      <Star className="text-gray-400 dark:text-[#9292c9]" size={20} />
                    )}
                  </button>
                </div>
                <div className="flex items-center gap-2">
                  <div className={`w-3 h-3 rounded-full ${attraction.bgColor}`} />
                  <p className={`${attraction.color} text-sm font-normal leading-normal`}>
                    {attraction.capacity}
                  </p>
                </div>
                <p className="text-gray-900 dark:text-white text-sm font-normal leading-normal mt-auto">
                  {attraction.waitTime} de espera
                </p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}
