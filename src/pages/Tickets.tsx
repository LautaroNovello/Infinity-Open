import { Ticket, X, User, Baby, Users as Elderly, Lock } from 'lucide-react'
import { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'

interface StoredTicket {
  id: string
  date: string
  type: 'general' | 'child' | 'senior'
  total: number
  ticketNumber: number
  totalTickets: number
}

export default function Tickets() {
  const navigate = useNavigate()
  const location = useLocation()
  const [activeTab, setActiveTab] = useState('my-tickets')
  const [showQR, setShowQR] = useState(false)
  const [selectedTicket, setSelectedTicket] = useState<any>(null)
  const [myTickets, setMyTickets] = useState<StoredTicket[]>([])
  
  // Cargar entradas guardadas
  useEffect(() => {
    const savedTickets = localStorage.getItem('myTickets')
    if (savedTickets) {
      setMyTickets(JSON.parse(savedTickets))
    }
  }, [])
  
  // Detectar si viene de /new-ticket
  useEffect(() => {
    if (location.state?.tab === 'new-ticket') {
      setActiveTab('new-ticket')
    }
  }, [location])
  
  // Estado para Nueva Entrada
  const [newTickets, setNewTickets] = useState({
    general: 1,
    child: 0,
    senior: 0,
  })

  const prices = {
    general: 10000,
    child: 4900,
    senior: 6900,
  }

  const tabs = [
    { id: 'new-ticket', label: 'Nueva Entrada' },
    { id: 'my-tickets', label: 'Mis Entradas' },
    { id: 'reservations', label: 'Reservas' },
  ]

  const handleTabClick = (tabId: string) => {
    if (tabId === 'reservations') {
      navigate('/reservations')
    } else {
      setActiveTab(tabId)
    }
  }

  const handleIncrement = (type: 'general' | 'child' | 'senior') => {
    setNewTickets((prev) => ({ ...prev, [type]: prev[type] + 1 }))
  }

  const handleDecrement = (type: 'general' | 'child' | 'senior') => {
    setNewTickets((prev) => ({ ...prev, [type]: Math.max(0, prev[type] - 1) }))
  }

  const subtotal = Object.entries(newTickets).reduce(
    (sum, [type, count]) => sum + count * prices[type as keyof typeof prices],
    0
  )

  const handlePayment = () => {
    const totalTickets = newTickets.general + newTickets.child + newTickets.senior
    if (totalTickets === 0) {
      alert('Por favor selecciona al menos una entrada')
      return
    }
    
    const ticketsSummary = []
    if (newTickets.general > 0) ticketsSummary.push(`${newTickets.general} General`)
    if (newTickets.child > 0) ticketsSummary.push(`${newTickets.child} Niño`)
    if (newTickets.senior > 0) ticketsSummary.push(`${newTickets.senior} Senior`)
    
    // Crear entradas individuales - una por cada ticket
    const newTicketsList: StoredTicket[] = []
    const timestamp = Date.now()
    let ticketCounter = 0
    
    // Entradas generales
    for (let i = 0; i < newTickets.general; i++) {
      newTicketsList.push({
        id: `TKT-${timestamp}-${ticketCounter++}`,
        date: new Date().toLocaleDateString('es-ES'),
        type: 'general',
        total: prices.general,
        ticketNumber: i + 1,
        totalTickets: newTickets.general
      })
    }
    
    // Entradas niños
    for (let i = 0; i < newTickets.child; i++) {
      newTicketsList.push({
        id: `TKT-${timestamp}-${ticketCounter++}`,
        date: new Date().toLocaleDateString('es-ES'),
        type: 'child',
        total: prices.child,
        ticketNumber: i + 1,
        totalTickets: newTickets.child
      })
    }
    
    // Entradas senior
    for (let i = 0; i < newTickets.senior; i++) {
      newTicketsList.push({
        id: `TKT-${timestamp}-${ticketCounter++}`,
        date: new Date().toLocaleDateString('es-ES'),
        type: 'senior',
        total: prices.senior,
        ticketNumber: i + 1,
        totalTickets: newTickets.senior
      })
    }
    
    // Guardar en localStorage
    const updatedTickets = [...myTickets, ...newTicketsList]
    setMyTickets(updatedTickets)
    localStorage.setItem('myTickets', JSON.stringify(updatedTickets))
    
    alert(`Procesando pago de $${subtotal.toFixed(2)}\n\nEntradas: ${ticketsSummary.join(', ')}\n\n¡Pago exitoso! Se generaron ${newTicketsList.length} entradas individuales con QR único`)
    setActiveTab('my-tickets')
    setNewTickets({ general: 1, child: 0, senior: 0 })
  }

  const handleShowQR = (ticket: any) => {
    setSelectedTicket(ticket)
    setShowQR(true)
  }

  const generateRandomQR = () => {
    const size = 200
    const cellSize = 10
    const cells = size / cellSize
    const qr = []
    
    for (let i = 0; i < cells; i++) {
      const row = []
      for (let j = 0; j < cells; j++) {
        row.push(Math.random() > 0.5)
      }
      qr.push(row)
    }
    
    return qr
  }

  const qrPattern = generateRandomQR()

  return (
    <div className="animate-fade-in min-h-screen bg-gray-100 dark:bg-background-dark pb-20">
      {/* QR Modal */}
      {showQR && (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4 animate-fade-in">
          <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 w-full max-w-sm animate-slide-up">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                Código QR
              </h2>
              <button
                onClick={() => setShowQR(false)}
                className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
              >
                <X size={24} />
              </button>
            </div>
            
            <div className="bg-white p-4 rounded-xl mb-4">
              <svg viewBox="0 0 200 200" className="w-full h-auto">
                {qrPattern.map((row, i) => (
                  row.map((cell, j) => (
                    cell && (
                      <rect
                        key={`${i}-${j}`}
                        x={j * 10}
                        y={i * 10}
                        width="10"
                        height="10"
                        fill="black"
                      />
                    )
                  ))
                ))}
              </svg>
            </div>
            
            <div className="text-center">
              <p className="text-gray-900 dark:text-white font-semibold mb-1">
                {selectedTicket?.type}
              </p>
              <p className="text-gray-500 dark:text-gray-400 text-sm">
                Válido para: {selectedTicket?.date}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Tabs */}
      <div className="flex flex-col">
        <div className="flex border-b border-gray-200 dark:border-gray-700 mx-4">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => handleTabClick(tab.id)}
              className={`flex-1 py-3 text-center text-sm font-medium transition-colors ${
                activeTab === tab.id
                  ? 'border-b-2 border-blue-600 dark:border-primary text-blue-600 dark:text-primary'
                  : 'text-gray-500 dark:text-gray-400'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Content based on active tab */}
      {activeTab === 'my-tickets' && (
        <main className="flex-1 px-4 py-6">
          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-4">
            {myTickets.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-500 dark:text-gray-400">No tienes entradas registradas</p>
              </div>
            ) : (
              myTickets.map((ticket, index) => (
                <div
                  key={ticket.id}
                  className="bg-white dark:bg-background-dark/50 p-4 rounded-xl border border-gray-200 dark:border-gray-800 animate-slide-up"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <div className="flex items-center gap-4">
                    <div className="text-blue-600 dark:text-primary flex items-center justify-center rounded-lg bg-blue-600/20 dark:bg-primary/20 shrink-0 w-12 h-12">
                      <Ticket size={24} />
                    </div>
                    <div className="flex flex-col justify-center flex-1">
                      <p className="text-gray-900 dark:text-white text-base font-medium leading-normal">
                        Entrada {ticket.type === 'general' ? 'General' : ticket.type === 'child' ? 'Niño' : 'Senior'}
                      </p>
                      <p className="text-gray-500 dark:text-gray-400 text-sm font-normal leading-normal">
                        Fecha: {ticket.date}
                      </p>
                      <p className="text-gray-500 dark:text-gray-400 text-xs font-normal leading-normal mt-1">
                        Ticket #{ticket.ticketNumber} de {ticket.totalTickets}
                      </p>
                      <p className="text-gray-900 dark:text-white text-sm font-semibold leading-normal mt-1">
                        ${ticket.total.toFixed(2)}
                      </p>
                      <p className="text-gray-400 dark:text-gray-500 text-xs font-mono leading-normal mt-1">
                        {ticket.id}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => handleShowQR(ticket)}
                    className="w-full flex items-center justify-center rounded-lg h-10 bg-blue-600 dark:bg-primary text-white gap-2 text-sm font-bold leading-normal tracking-[0.015em] mt-4 hover:bg-blue-700 dark:hover:bg-primary/90 transition-colors"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <rect x="3" y="3" width="18" height="18" rx="2" />
                      <path d="M7 7h.01" />
                      <path d="M17 7h.01" />
                      <path d="M7 17h.01" />
                      <path d="M17 17h.01" />
                    </svg>
                    Visualizar QR
                  </button>
                </div>
              ))
            )}
          </div>
        </div>
      </main>
      )}

      {/* Nueva Entrada Tab */}
      {activeTab === 'new-ticket' && (
        <main className="flex-1 px-4 py-6">
          {/* Ticket Selection */}
          <div className="flex flex-col gap-4">
            {/* General */}
            <div className="bg-white dark:bg-background-dark/50 p-4 rounded-xl border border-gray-200 dark:border-gray-800">
              <div className="flex items-center gap-4">
                <div className="text-blue-600 dark:text-primary flex items-center justify-center rounded-lg bg-blue-600/20 dark:bg-primary/20 w-12 h-12">
                  <User size={24} />
                </div>
                <div className="flex-1">
                  <p className="text-gray-900 dark:text-white text-base font-semibold">Entrada General</p>
                  <p className="text-gray-500 dark:text-gray-400 text-sm">Adultos (12-64 años)</p>
                </div>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => handleDecrement('general')}
                    className="w-8 h-8 rounded-lg bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 flex items-center justify-center text-xl font-bold hover:bg-gray-300 dark:hover:bg-gray-600"
                  >
                    -
                  </button>
                  <span className="text-gray-900 dark:text-white text-lg font-bold w-8 text-center">
                    {newTickets.general}
                  </span>
                  <button
                    onClick={() => handleIncrement('general')}
                    className="w-8 h-8 rounded-lg bg-blue-600 dark:bg-primary text-white flex items-center justify-center text-xl font-bold hover:bg-blue-700 dark:hover:bg-primary/90"
                  >
                    +
                  </button>
                </div>
              </div>
              <div className="mt-3 pt-3 border-t border-gray-200 dark:border-gray-700">
                <p className="text-gray-900 dark:text-white text-lg font-bold text-right">
                  ${(prices.general * newTickets.general).toLocaleString()}
                </p>
              </div>
            </div>

            {/* Child */}
            <div className="bg-white dark:bg-background-dark/50 p-4 rounded-xl border border-gray-200 dark:border-gray-800">
              <div className="flex items-center gap-4">
                <div className="text-green-600 dark:text-green-400 flex items-center justify-center rounded-lg bg-green-600/20 dark:bg-green-400/20 w-12 h-12">
                  <Baby size={24} />
                </div>
                <div className="flex-1">
                  <p className="text-gray-900 dark:text-white text-base font-semibold">Entrada Niño</p>
                  <p className="text-gray-500 dark:text-gray-400 text-sm">Menores de 12 años</p>
                </div>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => handleDecrement('child')}
                    className="w-8 h-8 rounded-lg bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 flex items-center justify-center text-xl font-bold hover:bg-gray-300 dark:hover:bg-gray-600"
                  >
                    -
                  </button>
                  <span className="text-gray-900 dark:text-white text-lg font-bold w-8 text-center">
                    {newTickets.child}
                  </span>
                  <button
                    onClick={() => handleIncrement('child')}
                    className="w-8 h-8 rounded-lg bg-green-600 dark:bg-green-400 text-white flex items-center justify-center text-xl font-bold hover:bg-green-700 dark:hover:bg-green-500"
                  >
                    +
                  </button>
                </div>
              </div>
              <div className="mt-3 pt-3 border-t border-gray-200 dark:border-gray-700">
                <p className="text-gray-900 dark:text-white text-lg font-bold text-right">
                  ${(prices.child * newTickets.child).toLocaleString()}
                </p>
              </div>
            </div>

            {/* Senior */}
            <div className="bg-white dark:bg-background-dark/50 p-4 rounded-xl border border-gray-200 dark:border-gray-800">
              <div className="flex items-center gap-4">
                <div className="text-purple-600 dark:text-purple-400 flex items-center justify-center rounded-lg bg-purple-600/20 dark:bg-purple-400/20 w-12 h-12">
                  <Elderly size={24} />
                </div>
                <div className="flex-1">
                  <p className="text-gray-900 dark:text-white text-base font-semibold">Entrada Senior</p>
                  <p className="text-gray-500 dark:text-gray-400 text-sm">Mayores de 65 años</p>
                </div>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => handleDecrement('senior')}
                    className="w-8 h-8 rounded-lg bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 flex items-center justify-center text-xl font-bold hover:bg-gray-300 dark:hover:bg-gray-600"
                  >
                    -
                  </button>
                  <span className="text-gray-900 dark:text-white text-lg font-bold w-8 text-center">
                    {newTickets.senior}
                  </span>
                  <button
                    onClick={() => handleIncrement('senior')}
                    className="w-8 h-8 rounded-lg bg-purple-600 dark:bg-purple-400 text-white flex items-center justify-center text-xl font-bold hover:bg-purple-700 dark:hover:bg-purple-500"
                  >
                    +
                  </button>
                </div>
              </div>
              <div className="mt-3 pt-3 border-t border-gray-200 dark:border-gray-700">
                <p className="text-gray-900 dark:text-white text-lg font-bold text-right">
                  ${(prices.senior * newTickets.senior).toLocaleString()}
                </p>
              </div>
            </div>
          </div>

          {/* Payment Footer */}
          <div className="mt-6 bg-white dark:bg-background-dark/50 p-6 rounded-xl border border-gray-200 dark:border-gray-800">
            <div className="flex items-center justify-between mb-4">
              <p className="text-gray-900 dark:text-white text-xl font-bold">Total</p>
              <p className="text-gray-900 dark:text-white text-2xl font-bold">
                ${subtotal.toLocaleString()}
              </p>
            </div>
            <button 
              onClick={handlePayment}
              className="w-full flex items-center justify-center rounded-xl h-12 bg-blue-600 dark:bg-primary text-white gap-2 text-base font-bold leading-normal tracking-[0.015em] hover:bg-blue-700 dark:hover:bg-primary/90 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
              disabled={newTickets.general + newTickets.child + newTickets.senior === 0}
            >
              <Lock size={18} />
              Pagar ahora
            </button>
            <p className="text-gray-500 dark:text-gray-400 text-xs text-center mt-3 flex items-center justify-center gap-1">
              <Lock size={12} />
              Pago seguro con encriptación SSL
            </p>
          </div>
        </main>
      )}
    </div>
  )
}
