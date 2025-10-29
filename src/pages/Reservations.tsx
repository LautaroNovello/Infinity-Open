import { Check, Calendar, Clock, Ticket, MapPin, X } from 'lucide-react'
import { useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

interface StoredReservation {
  id: string
  attraction: string
  date: string
  time: string
  status: 'confirmed'
}

export default function Reservations() {
  const location = useLocation()
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState('new-reservation')
  const [myReservations, setMyReservations] = useState<StoredReservation[]>([])
  
  // Cargar reservas guardadas
  useEffect(() => {
    const savedReservations = localStorage.getItem('myReservations')
    if (savedReservations) {
      setMyReservations(JSON.parse(savedReservations))
    }
  }, [])
  
  // Detectar si viene de /new-reservation o /my-reservations
  useEffect(() => {
    if (location.state?.tab === 'new-reservation') {
      setActiveTab('new-reservation')
    } else if (location.state?.tab === 'my-reservations') {
      setActiveTab('my-reservations')
    }
  }, [location])
  
  // Estado para Nueva Reserva
  const [selectedAttraction, setSelectedAttraction] = useState<number | null>(null)
  const [selectedDate, setSelectedDate] = useState('')
  const [selectedTime, setSelectedTime] = useState('')

  const attractions = [
    { id: 1, name: 'Montaña Rusa del Dragón', available: true, icon: '🎢', waitTime: '45 min' },
    { id: 2, name: 'Toboganes Acuáticos', available: true, icon: '🌊', waitTime: '30 min' },
    { id: 3, name: 'Carrusel Encantado', available: true, icon: '🎠', waitTime: '15 min' },
    { id: 4, name: 'Río de Rapids', available: true, icon: '🚣', waitTime: '25 min' },
    { id: 5, name: 'Casa Embrujada', available: false, icon: '👻', waitTime: '--' },
    { id: 6, name: 'Espectáculo de Delfines', available: true, icon: '🐬', waitTime: '20 min' },
  ]

  const timeSlots = [
    '10:00 AM', '11:00 AM', '12:00 PM', '1:00 PM',
    '2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM'
  ]

  // Estado para Mis Reservas
  const [reservations, setReservations] = useState([
    {
      id: 1,
      attraction: 'Montaña Rusa del Dragón',
      date: '2024-11-15',
      time: '2:00 PM',
      status: 'confirmed',
    },
    {
      id: 2,
      attraction: 'Espectáculo de Delfines',
      date: '2024-11-15',
      time: '4:00 PM',
      status: 'confirmed',
    },
    {
      id: 3,
      attraction: 'Toboganes Acuáticos',
      date: '2024-11-20',
      time: '11:00 AM',
      status: 'confirmed',
    },
  ])

  const tabs = [
    { id: 'new-ticket', label: 'Nueva Entrada' },
    { id: 'my-tickets', label: 'Mis Entradas' },
    { id: 'reservations', label: 'Reservas' },
  ]

  const handleTabClick = (tabId: string) => {
    if (tabId === 'new-ticket' || tabId === 'my-tickets') {
      navigate('/tickets', { state: { tab: tabId } })
    } else {
      setActiveTab('new-reservation') // Cuando estamos en reservations, mostrar nueva reserva por defecto
    }
  }

  const handleSubmit = () => {
    if (!selectedAttraction || !selectedDate || !selectedTime) {
      alert('Por favor completa todos los campos')
      return
    }
    
    const attraction = attractions.find(a => a.id === selectedAttraction)
    
    // Crear nueva reserva
    const newReservation: StoredReservation = {
      id: `RSV-${Date.now()}`,
      attraction: attraction?.name || '',
      date: selectedDate,
      time: selectedTime,
      status: 'confirmed'
    }
    
    // Guardar en localStorage
    const updatedReservations = [...myReservations, newReservation]
    setMyReservations(updatedReservations)
    localStorage.setItem('myReservations', JSON.stringify(updatedReservations))
    
    alert(`Reserva creada exitosamente para ${attraction?.name} el ${selectedDate} a las ${selectedTime}`)
    setActiveTab('my-reservations')
    setSelectedAttraction(null)
    setSelectedDate('')
    setSelectedTime('')
  }

  const handleCancel = (id: string) => {
    if (confirm('¿Estás seguro de que deseas cancelar esta reserva?')) {
      const updatedReservations = myReservations.filter(r => r.id !== id)
      setMyReservations(updatedReservations)
      localStorage.setItem('myReservations', JSON.stringify(updatedReservations))
    }
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('es-ES', { 
      day: 'numeric', 
      month: 'long', 
      year: 'numeric' 
    })
  }

  return (
    <div className="animate-fade-in min-h-screen bg-gray-100 dark:bg-background-dark pb-20">
      {/* Tabs */}
      <div className="flex flex-col">
        <div className="flex border-b border-gray-200 dark:border-gray-700 mx-4">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => handleTabClick(tab.id)}
              className={`flex-1 py-3 text-center text-sm font-medium transition-colors ${
                tab.id === 'reservations'
                  ? 'border-b-2 border-blue-600 dark:border-primary text-blue-600 dark:text-primary'
                  : 'text-gray-500 dark:text-gray-400'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Sub-tabs for Reservations */}
      <div className="flex border-b border-gray-200 dark:border-gray-700 mx-4 mt-2">
        <button
          onClick={() => setActiveTab('new-reservation')}
          className={`flex-1 py-2 text-center text-xs font-medium transition-colors ${
            activeTab === 'new-reservation'
              ? 'border-b-2 border-blue-600 dark:border-primary text-blue-600 dark:text-primary'
              : 'text-gray-500 dark:text-gray-400'
          }`}
        >
          Nueva Reserva
        </button>
        <button
          onClick={() => setActiveTab('my-reservations')}
          className={`flex-1 py-2 text-center text-xs font-medium transition-colors ${
            activeTab === 'my-reservations'
              ? 'border-b-2 border-blue-600 dark:border-primary text-blue-600 dark:text-primary'
              : 'text-gray-500 dark:text-gray-400'
          }`}
        >
          Mis Reservas
        </button>
      </div>

      {/* Nueva Reserva Tab */}
      {activeTab === 'new-reservation' && (
        <div className="bg-gradient-to-b from-gray-50 to-gray-100 dark:from-background-dark dark:to-gray-900">
          {/* Progress Indicator */}
          <div className="px-6 py-6">
            <div className="flex items-center justify-between">
              <div className={`flex items-center gap-2 ${selectedAttraction ? 'text-blue-600 dark:text-primary' : 'text-gray-400'}`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${selectedAttraction ? 'bg-blue-600 dark:bg-primary text-white' : 'bg-gray-200 dark:bg-gray-700'}`}>
                  {selectedAttraction ? <Check size={16} /> : <Ticket size={16} />}
                </div>
                <span className="text-sm font-medium">Atracción</span>
              </div>
              <div className={`flex-1 h-1 mx-2 ${selectedDate ? 'bg-blue-600 dark:bg-primary' : 'bg-gray-200 dark:bg-gray-700'}`} />
              <div className={`flex items-center gap-2 ${selectedDate ? 'text-blue-600 dark:text-primary' : 'text-gray-400'}`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${selectedDate ? 'bg-blue-600 dark:bg-primary text-white' : 'bg-gray-200 dark:bg-gray-700'}`}>
                  {selectedDate ? <Check size={16} /> : <Calendar size={16} />}
                </div>
                <span className="text-sm font-medium">Fecha</span>
              </div>
              <div className={`flex-1 h-1 mx-2 ${selectedTime ? 'bg-blue-600 dark:bg-primary' : 'bg-gray-200 dark:bg-gray-700'}`} />
              <div className={`flex items-center gap-2 ${selectedTime ? 'text-blue-600 dark:text-primary' : 'text-gray-400'}`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${selectedTime ? 'bg-blue-600 dark:bg-primary text-white' : 'bg-gray-200 dark:bg-gray-700'}`}>
                  {selectedTime ? <Check size={16} /> : <Clock size={16} />}
                </div>
                <span className="text-sm font-medium">Hora</span>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="px-6 pb-4 space-y-6">
            {/* Select Attraction */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-5 shadow-md">
              <h2 className="text-gray-900 dark:text-white text-lg font-bold mb-4 flex items-center gap-2">
                <Ticket className="text-blue-600 dark:text-primary" size={22} />
                Selecciona tu atracción
              </h2>
              <div className="grid grid-cols-1 gap-3">
                {attractions.map((attraction) => (
                  <button
                    key={attraction.id}
                    disabled={!attraction.available}
                    onClick={() => setSelectedAttraction(attraction.id)}
                    className={`flex items-center gap-4 p-4 rounded-xl border-2 transition-all ${
                      !attraction.available
                        ? 'bg-gray-50 dark:bg-gray-900 border-gray-200 dark:border-gray-700 opacity-50 cursor-not-allowed'
                        : selectedAttraction === attraction.id
                        ? 'bg-blue-50 dark:bg-primary/20 border-blue-600 dark:border-primary shadow-lg scale-[1.02]'
                        : 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 hover:border-blue-400 dark:hover:border-primary/50 hover:shadow-md'
                    }`}
                  >
                    <div className="text-4xl">{attraction.icon}</div>
                    <div className="flex-1 text-left">
                      <p className={`text-base font-semibold ${
                        !attraction.available
                          ? 'text-gray-400 dark:text-gray-600'
                          : selectedAttraction === attraction.id
                          ? 'text-blue-600 dark:text-primary'
                          : 'text-gray-900 dark:text-white'
                      }`}>
                        {attraction.name}
                      </p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {attraction.available ? `Espera: ${attraction.waitTime}` : 'No disponible'}
                      </p>
                    </div>
                    {selectedAttraction === attraction.id && (
                      <Check size={24} className="text-blue-600 dark:text-primary" />
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Select Date */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-5 shadow-md">
              <h2 className="text-gray-900 dark:text-white text-lg font-bold mb-4 flex items-center gap-2">
                <Calendar className="text-blue-600 dark:text-primary" size={22} />
                Elige la fecha
              </h2>
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                min={new Date().toISOString().split('T')[0]}
                className="w-full p-4 rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white text-lg font-medium focus:outline-none focus:border-blue-600 dark:focus:border-primary focus:ring-4 focus:ring-blue-100 dark:focus:ring-primary/20 transition-all"
              />
            </div>

            {/* Select Time */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-5 shadow-md">
              <h2 className="text-gray-900 dark:text-white text-lg font-bold mb-4 flex items-center gap-2">
                <Clock className="text-blue-600 dark:text-primary" size={22} />
                Selecciona la hora
              </h2>
              <div className="grid grid-cols-4 gap-3">
                {timeSlots.map((time) => (
                  <button
                    key={time}
                    onClick={() => setSelectedTime(time)}
                    className={`p-3 rounded-xl border-2 text-sm font-bold transition-all ${
                      selectedTime === time
                        ? 'bg-blue-600 dark:bg-primary border-blue-600 dark:border-primary text-white shadow-lg scale-105'
                        : 'bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white hover:border-blue-400 dark:hover:border-primary/50 hover:shadow-md'
                    }`}
                  >
                    {time}
                  </button>
                ))}
              </div>
            </div>

            {/* Submit Button */}
            <button
              onClick={handleSubmit}
              disabled={!selectedAttraction || !selectedDate || !selectedTime}
              className={`w-full flex items-center justify-center rounded-xl h-14 text-lg font-bold transition-all shadow-lg ${
                selectedAttraction && selectedDate && selectedTime
                  ? 'bg-gradient-to-r from-blue-600 to-blue-700 dark:from-primary dark:to-primary/80 text-white hover:shadow-xl hover:scale-[1.02]'
                  : 'bg-gray-300 dark:bg-gray-700 text-gray-500 dark:text-gray-500 cursor-not-allowed'
              }`}
            >
              <Check size={20} className="mr-2" />
              Confirmar Reserva
            </button>
          </div>
        </div>
      )}

      {/* Mis Reservas Tab */}
      {activeTab === 'my-reservations' && (
        <main className="flex-1 px-4 py-6">
          <div className="space-y-4">
            {myReservations.length === 0 ? (
              <div className="text-center py-12">
                <MapPin size={48} className="text-gray-400 dark:text-gray-600 mx-auto mb-4" />
                <p className="text-gray-500 dark:text-gray-400 text-lg">
                  No tienes reservas activas
                </p>
                <button
                  onClick={() => setActiveTab('new-reservation')}
                  className="mt-4 px-6 py-2 bg-blue-600 dark:bg-primary text-white rounded-lg hover:bg-blue-700 dark:hover:bg-primary/90 transition-colors"
                >
                  Crear Nueva Reserva
                </button>
              </div>
            ) : (
              myReservations.map((reservation, index) => (
                <div
                  key={reservation.id}
                  className="bg-white dark:bg-background-dark/50 p-4 rounded-xl border border-gray-200 dark:border-gray-800 animate-slide-up"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h3 className="text-gray-900 dark:text-white text-lg font-semibold mb-2">
                        {reservation.attraction}
                      </h3>
                      <div className="space-y-1">
                        <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                          <Calendar size={16} />
                          <span className="text-sm">{formatDate(reservation.date)}</span>
                        </div>
                        <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                          <Clock size={16} />
                          <span className="text-sm">{reservation.time}</span>
                        </div>
                        <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                          <Ticket size={16} />
                          <span className="text-xs font-mono">{reservation.id}</span>
                        </div>
                      </div>
                    </div>
                    <span className="px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 text-xs font-semibold rounded-full">
                      Confirmada
                    </span>
                  </div>
                  
                  <button
                    onClick={() => handleCancel(reservation.id)}
                    className="w-full flex items-center justify-center gap-2 rounded-lg h-10 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 text-sm font-bold hover:bg-red-100 dark:hover:bg-red-900/30 transition-colors"
                  >
                    <X size={16} />
                    Cancelar Reserva
                  </button>
                </div>
              ))
            )}
          </div>
        </main>
      )}
    </div>
  )
}
