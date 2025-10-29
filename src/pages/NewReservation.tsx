import { Check, Calendar, Clock, Ticket } from 'lucide-react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function NewReservation() {
  const navigate = useNavigate()
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

  const handleSubmit = () => {
    if (!selectedAttraction || !selectedDate || !selectedTime) {
      alert('Por favor completa todos los campos')
      return
    }
    
    const attraction = attractions.find(a => a.id === selectedAttraction)
    alert(`Reserva creada exitosamente para ${attraction?.name} el ${selectedDate} a las ${selectedTime}`)
    navigate('/my-reservations')
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-background-dark dark:to-gray-900 pb-20">
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
  )
}
