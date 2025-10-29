import { Calendar, Clock, MapPin, X } from 'lucide-react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function MyReservations() {
  const navigate = useNavigate()
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

  const handleCancel = (id: number) => {
    if (confirm('¿Estás seguro de que deseas cancelar esta reserva?')) {
      setReservations(reservations.filter(r => r.id !== id))
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
    <div className="min-h-screen bg-gray-100 dark:bg-background-dark pb-20 pt-6">
      {/* Content */}
      <div className="p-4 space-y-4">
        {reservations.length === 0 ? (
          <div className="text-center py-12">
            <MapPin size={48} className="text-gray-400 dark:text-gray-600 mx-auto mb-4" />
            <p className="text-gray-500 dark:text-gray-400 text-lg">
              No tienes reservas activas
            </p>
            <button
              onClick={() => navigate('/new-reservation')}
              className="mt-4 px-6 py-2 bg-blue-600 dark:bg-primary text-white rounded-lg hover:bg-blue-700 dark:hover:bg-primary/90 transition-colors"
            >
              Crear Nueva Reserva
            </button>
          </div>
        ) : (
          reservations.map((reservation, index) => (
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
    </div>
  )
}
