import { useState } from 'react'
import { User, Baby, Users as Elderly, Lock, ChevronLeft } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

export default function NewTicket() {
  const navigate = useNavigate()
  const [tickets, setTickets] = useState({
    general: 1,
    child: 0,
    senior: 0,
  })

  const prices = {
    general: 10000,
    child: 4900,
    senior: 6900,
  }

  const handleIncrement = (type: 'general' | 'child' | 'senior') => {
    setTickets((prev) => ({ ...prev, [type]: prev[type] + 1 }))
  }

  const handleDecrement = (type: 'general' | 'child' | 'senior') => {
    setTickets((prev) => ({ ...prev, [type]: Math.max(0, prev[type] - 1) }))
  }

  const subtotal = Object.entries(tickets).reduce(
    (sum, [type, count]) => sum + count * prices[type as keyof typeof prices],
    0
  )

  const handlePayment = () => {
    const totalTickets = tickets.general + tickets.child + tickets.senior
    if (totalTickets === 0) {
      alert('Por favor selecciona al menos una entrada')
      return
    }
    
    const ticketsSummary = []
    if (tickets.general > 0) ticketsSummary.push(`${tickets.general} General`)
    if (tickets.child > 0) ticketsSummary.push(`${tickets.child} Niño`)
    if (tickets.senior > 0) ticketsSummary.push(`${tickets.senior} Senior`)
    
    alert(`Procesando pago de $${subtotal.toFixed(2)}\n\nEntradas: ${ticketsSummary.join(', ')}\n\n¡Pago exitoso! Tus entradas estarán disponibles en "Mis Entradas"`)
    navigate('/tickets')
  }

  return (
    <div className="relative flex h-auto min-h-screen w-full flex-col bg-gray-100 dark:bg-background-dark overflow-x-hidden pb-20">
      {/* Header */}
      <div className="flex items-center bg-gray-100 dark:bg-background-dark p-4 pb-2 justify-between sticky top-0 z-10">
        <button onClick={() => navigate('/tickets')} className="text-gray-800 dark:text-white flex w-12 h-12 shrink-0 items-center">
          <ChevronLeft size={24} />
        </button>
        <h1 className="text-gray-900 dark:text-white text-lg font-bold leading-tight tracking-tight flex-1 text-center">
          Nueva Entrada
        </h1>
        <div className="flex w-12 items-center justify-end" />
      </div>

      {/* Tabs - Hidden on this page */}
      <div className="flex flex-col" style={{ display: 'none' }}>
        <div className="flex border-b border-gray-200 dark:border-gray-700 mx-4">
          <button className="flex-1 py-3 text-center text-sm font-medium border-b-2 border-blue-600 dark:border-primary text-blue-600 dark:text-primary">
            Nueva Entrada
          </button>
          <button
            onClick={() => navigate('/tickets')}
            className="flex-1 py-3 text-center text-sm font-medium text-gray-500 dark:text-gray-400"
          >
            Mis Entradas
          </button>
          <button
            onClick={() => navigate('/reservations')}
            className="flex-1 py-3 text-center text-sm font-medium text-gray-500 dark:text-gray-400"
          >
            Reservas
          </button>
        </div>
      </div>

      {/* Main Content */}
      <main className="flex-1 px-4 py-6">
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-4">
            {/* Entrada General */}
            <div className="flex items-center gap-4 bg-white dark:bg-background-dark/50 p-4 rounded-xl border border-gray-200 dark:border-gray-800 animate-slide-up">
              <div className="text-blue-600 dark:text-primary flex items-center justify-center rounded-lg bg-blue-600/20 dark:bg-primary/20 shrink-0 w-12 h-12">
                <User size={24} />
              </div>
              <div className="flex flex-col justify-center flex-1">
                <p className="text-gray-900 dark:text-white text-base font-medium leading-normal">
                  Entrada General
                </p>
                <p className="text-gray-500 dark:text-gray-400 text-sm font-normal leading-normal">
                  ${prices.general}
                </p>
              </div>
              <div className="shrink-0">
                <div className="flex items-center gap-3 text-gray-900 dark:text-white">
                  <button
                    onClick={() => handleDecrement('general')}
                    className="text-lg font-medium leading-normal flex h-8 w-8 items-center justify-center rounded-full bg-gray-200 dark:bg-gray-700 cursor-pointer hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
                  >
                    −
                  </button>
                  <span className="text-base font-medium leading-normal w-4 text-center">
                    {tickets.general}
                  </span>
                  <button
                    onClick={() => handleIncrement('general')}
                    className="text-lg font-medium leading-normal flex h-8 w-8 items-center justify-center rounded-full bg-gray-200 dark:bg-gray-700 cursor-pointer hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>

            {/* Entrada Niño */}
            <div className="flex items-center gap-4 bg-white dark:bg-background-dark/50 p-4 rounded-xl border border-gray-200 dark:border-gray-800 animate-slide-up" style={{ animationDelay: '50ms' }}>
              <div className="text-blue-600 dark:text-primary flex items-center justify-center rounded-lg bg-blue-600/20 dark:bg-primary/20 shrink-0 w-12 h-12">
                <Baby size={24} />
              </div>
              <div className="flex flex-col justify-center flex-1">
                <p className="text-gray-900 dark:text-white text-base font-medium leading-normal">
                  Entrada Niño (3-12 años)
                </p>
                <p className="text-gray-500 dark:text-gray-400 text-sm font-normal leading-normal">
                  ${prices.child}
                </p>
              </div>
              <div className="shrink-0">
                <div className="flex items-center gap-3 text-gray-900 dark:text-white">
                  <button
                    onClick={() => handleDecrement('child')}
                    className="text-lg font-medium leading-normal flex h-8 w-8 items-center justify-center rounded-full bg-gray-200 dark:bg-gray-700 cursor-pointer hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
                  >
                    −
                  </button>
                  <span className="text-base font-medium leading-normal w-4 text-center">
                    {tickets.child}
                  </span>
                  <button
                    onClick={() => handleIncrement('child')}
                    className="text-lg font-medium leading-normal flex h-8 w-8 items-center justify-center rounded-full bg-gray-200 dark:bg-gray-700 cursor-pointer hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>

            {/* Entrada Senior */}
            <div className="flex items-center gap-4 bg-white dark:bg-background-dark/50 p-4 rounded-xl border border-gray-200 dark:border-gray-800 animate-slide-up" style={{ animationDelay: '100ms' }}>
              <div className="text-blue-600 dark:text-primary flex items-center justify-center rounded-lg bg-blue-600/20 dark:bg-primary/20 shrink-0 w-12 h-12">
                <Elderly size={24} />
              </div>
              <div className="flex flex-col justify-center flex-1">
                <p className="text-gray-900 dark:text-white text-base font-medium leading-normal">
                  Entrada Senior (+65)
                </p>
                <p className="text-gray-500 dark:text-gray-400 text-sm font-normal leading-normal">
                  ${prices.senior}
                </p>
              </div>
              <div className="shrink-0">
                <div className="flex items-center gap-3 text-gray-900 dark:text-white">
                  <button
                    onClick={() => handleDecrement('senior')}
                    className="text-lg font-medium leading-normal flex h-8 w-8 items-center justify-center rounded-full bg-gray-200 dark:bg-gray-700 cursor-pointer hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
                  >
                    −
                  </button>
                  <span className="text-base font-medium leading-normal w-4 text-center">
                    {tickets.senior}
                  </span>
                  <button
                    onClick={() => handleIncrement('senior')}
                    className="text-lg font-medium leading-normal flex h-8 w-8 items-center justify-center rounded-full bg-gray-200 dark:bg-gray-700 cursor-pointer hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer - Summary */}
      <footer className="fixed bottom-0 left-0 right-0 bg-white dark:bg-background-dark p-4 border-t border-gray-200 dark:border-gray-800 z-20">
        <div className="flex flex-col gap-4">
          <h3 className="text-gray-900 dark:text-white text-lg font-bold leading-tight tracking-tight">
            Resumen de tu compra
          </h3>
          <div className="flex justify-between items-center text-gray-700 dark:text-gray-300">
            <span>Subtotal</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between items-center text-gray-900 dark:text-white font-bold text-xl">
            <span>Total</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>
          <button 
            onClick={handlePayment}
            className="w-full flex items-center justify-center rounded-xl h-12 bg-blue-600 dark:bg-primary text-white gap-2 text-base font-bold leading-normal tracking-[0.015em] hover:bg-blue-700 dark:hover:bg-primary/90 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
            disabled={tickets.general + tickets.child + tickets.senior === 0}
          >
            <Lock size={18} />
            Pagar ahora
          </button>
          <div className="flex items-center justify-center gap-2 text-sm text-gray-500 dark:text-gray-400">
            <Lock size={16} />
            <span>Pago seguro. Tu pago está protegido.</span>
          </div>
          <a className="text-center text-xs text-gray-500 dark:text-gray-400 underline" href="#">
            Términos y condiciones
          </a>
        </div>
      </footer>
    </div>
  )
}
