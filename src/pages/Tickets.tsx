import { Ticket, X, User, Baby, Users as Elderly, Sparkles, QrCode, Calendar, CreditCard, ShieldCheck, Download, Search, Filter, Trash2 } from 'lucide-react'
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
  const [showPaymentSuccess, setShowPaymentSuccess] = useState(false)
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)
  const [ticketToDelete, setTicketToDelete] = useState<string | null>(null)
  const [paymentDetails, setPaymentDetails] = useState({ total: 0, tickets: '', count: 0 })
  const [selectedTicket, setSelectedTicket] = useState<any>(null)
  const [myTickets, setMyTickets] = useState<StoredTicket[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [filterType, setFilterType] = useState<'all' | 'general' | 'child' | 'senior'>('all')
  
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
    general: 0,
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
    
    // Mostrar modal de éxito en lugar de alert
    setPaymentDetails({
      total: subtotal,
      tickets: ticketsSummary.join(', '),
      count: newTicketsList.length
    })
    setShowPaymentSuccess(true)
    setNewTickets({ general: 1, child: 0, senior: 0 })
  }

  const handleClosePaymentSuccess = () => {
    setShowPaymentSuccess(false)
    setActiveTab('my-tickets')
  }

  const handleShowQR = (ticket: any) => {
    setSelectedTicket(ticket)
    setShowQR(true)
  }

  const handleDeleteTicket = (ticketId: string) => {
    setTicketToDelete(ticketId)
    setShowDeleteConfirm(true)
  }

  const confirmDelete = () => {
    if (ticketToDelete) {
      const updatedTickets = myTickets.filter(ticket => ticket.id !== ticketToDelete)
      setMyTickets(updatedTickets)
      localStorage.setItem('myTickets', JSON.stringify(updatedTickets))
      setShowDeleteConfirm(false)
      setTicketToDelete(null)
    }
  }

  const cancelDelete = () => {
    setShowDeleteConfirm(false)
    setTicketToDelete(null)
  }

  // Filtrar entradas
  const filteredTickets = myTickets.filter(ticket => {
    const matchesSearch = ticket.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         ticket.type.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesFilter = filterType === 'all' || ticket.type === filterType
    return matchesSearch && matchesFilter
  })

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
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-900 pb-20 transition-all duration-500">
      {/* Modal de Pago Exitoso */}
      {showPaymentSuccess && (
        <div className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in">
          <div className="bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 rounded-3xl p-8 w-full max-w-md shadow-2xl transform animate-scale-in border border-gray-200 dark:border-gray-700">
            {/* Icono de éxito animado */}
            <div className="flex justify-center mb-6">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full blur-xl opacity-50 animate-pulse"></div>
                <div className="relative w-20 h-20 rounded-full bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center shadow-lg">
                  <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path>
                  </svg>
                </div>
              </div>
            </div>

            {/* Título */}
            <h2 className="text-2xl font-bold text-center mb-2 bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
              ¡Pago Exitoso!
            </h2>
            <p className="text-center text-gray-600 dark:text-gray-400 mb-6">
              Tu compra se ha procesado correctamente
            </p>

            {/* Detalles del pago */}
            <div className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-2xl p-5 mb-6 space-y-3">
              <div className="flex items-center justify-between pb-3 border-b border-green-200 dark:border-green-800">
                <span className="text-gray-700 dark:text-gray-300 font-medium">Total Pagado</span>
                <span className="text-2xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                  ${paymentDetails.total.toLocaleString()}
                </span>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-start justify-between">
                  <span className="text-gray-600 dark:text-gray-400 text-sm">Entradas</span>
                  <span className="text-gray-900 dark:text-white text-sm font-semibold text-right">
                    {paymentDetails.tickets}
                  </span>
                </div>
                
                <div className="flex items-center justify-between pt-2 border-t border-green-200 dark:border-green-800">
                  <span className="text-gray-700 dark:text-gray-300 font-medium flex items-center gap-2">
                    <Ticket size={16} />
                    Total de entradas
                  </span>
                  <span className="text-lg font-bold text-gray-900 dark:text-white">
                    {paymentDetails.count}
                  </span>
                </div>
              </div>
            </div>

            {/* Mensaje informativo */}
            <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-4 mb-6 flex items-start gap-3">
              <Sparkles className="text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" size={20} />
              <p className="text-sm text-gray-700 dark:text-gray-300">
                Se generaron <span className="font-bold text-blue-600 dark:text-blue-400">{paymentDetails.count} entradas individuales</span> con código QR único. Encuéntralas en la sección "Mis Entradas".
              </p>
            </div>

            {/* Botón de aceptar */}
            <button
              onClick={handleClosePaymentSuccess}
              className="w-full py-3 px-6 rounded-xl bg-gradient-to-r from-green-600 to-emerald-600 text-white font-bold text-lg hover:shadow-xl hover:shadow-green-500/50 transform hover:scale-105 active:scale-95 transition-all duration-300"
            >
              Aceptar
            </button>
          </div>
        </div>
      )}

      {/* QR Modal mejorado */}
      {showQR && (
        <div className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in">
          <div className="bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 rounded-2xl p-5 w-full max-w-sm shadow-2xl transform animate-scale-in border border-gray-200 dark:border-gray-700">
            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                  <QrCode className="text-white" size={16} />
                </div>
                <h2 className="text-lg font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Tu Entrada
                </h2>
              </div>
              <button
                onClick={() => setShowQR(false)}
                className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 hover:rotate-90 transition-all duration-300 p-1.5 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full"
              >
                <X size={20} />
              </button>
            </div>
            
            {/* Código QR con animación */}
            <div className="relative mb-4 group">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl blur-lg opacity-20 group-hover:opacity-30 transition-opacity duration-300"></div>
              <div className="relative bg-white p-4 rounded-xl shadow-lg">
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
            </div>
            
            {/* Info del ticket */}
            <div className="space-y-2 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-gray-700 dark:to-gray-800 p-3 rounded-xl mb-4">
              <div className="flex items-center justify-between">
                <span className="text-gray-600 dark:text-gray-400 text-xs font-medium">Tipo</span>
                <span className="text-gray-900 dark:text-white text-sm font-bold capitalize">
                  {selectedTicket?.type === 'general' ? 'General' : selectedTicket?.type === 'child' ? 'Niño' : 'Senior'}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600 dark:text-gray-400 text-xs font-medium flex items-center gap-1">
                  <Calendar size={12} />
                  Fecha
                </span>
                <span className="text-gray-900 dark:text-white text-sm font-bold">
                  {selectedTicket?.date}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600 dark:text-gray-400 text-xs font-medium">Precio</span>
                <span className="text-lg font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  ${selectedTicket?.total.toLocaleString()}
                </span>
              </div>
            </div>

            {/* Botón de descarga */}
            <button className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white text-sm font-semibold hover:shadow-lg hover:shadow-blue-500/50 transform hover:scale-105 transition-all duration-300">
              <Download size={16} />
              Descargar Entrada
            </button>
            
            <p className="text-gray-500 dark:text-gray-400 text-[10px] text-center mt-3 font-mono">
              {selectedTicket?.id}
            </p>
          </div>
        </div>
      )}

      {/* Modal de confirmación de eliminación */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in">
          <div className="bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 rounded-2xl p-6 w-full max-w-sm shadow-2xl transform animate-scale-in border border-gray-200 dark:border-gray-700">
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-red-500 to-rose-600 flex items-center justify-center">
                <Trash2 className="text-white" size={28} />
              </div>
            </div>
            
            <h2 className="text-xl font-bold text-center mb-2 text-gray-900 dark:text-white">
              ¿Eliminar entrada?
            </h2>
            <p className="text-center text-gray-600 dark:text-gray-400 mb-6">
              Esta acción no se puede deshacer. La entrada será eliminada permanentemente.
            </p>

            <div className="flex gap-3">
              <button
                onClick={cancelDelete}
                className="flex-1 py-2.5 px-4 rounded-xl bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 font-semibold hover:bg-gray-300 dark:hover:bg-gray-600 transition-all duration-300"
              >
                Cancelar
              </button>
              <button
                onClick={confirmDelete}
                className="flex-1 py-2.5 px-4 rounded-xl bg-gradient-to-r from-red-600 to-rose-600 text-white font-semibold hover:shadow-lg hover:shadow-red-500/50 transform hover:scale-105 transition-all duration-300"
              >
                Eliminar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Tabs con mejor diseño */}
      <div className="sticky top-0 z-10 bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg shadow-md">
        <div className="flex border-b border-gray-200 dark:border-gray-700 mx-4">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => handleTabClick(tab.id)}
              className={`relative flex-1 py-4 text-center text-sm font-semibold transition-all duration-300 ${
                activeTab === tab.id
                  ? 'text-blue-600 dark:text-purple-400'
                  : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
              }`}
            >
              {tab.label}
              {activeTab === tab.id && (
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-t-full animate-slide-in"></div>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Content based on active tab */}
      {activeTab === 'my-tickets' && (
        <main className="flex-1 px-4 py-6">
          <div className="max-w-2xl mx-auto">
            {/* Header de sección */}
            <div className="mb-6 animate-fade-in">
              <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
                Mis Entradas
              </h1>
              <p className="text-gray-600 dark:text-gray-400">
                Gestiona y visualiza tus entradas compradas
              </p>
            </div>

            {/* Buscador y Filtros */}
            {myTickets.length > 0 && (
              <div className="mb-6 space-y-4 animate-fade-in">
                {/* Buscador */}
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                  <input
                    type="text"
                    placeholder="Buscar por ID o tipo de entrada..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-12 pr-4 py-3 rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-purple-500 transition-all"
                  />
                </div>

                {/* Filtros por tipo */}
                <div className="flex gap-2 overflow-x-auto pb-2">
                  <button
                    onClick={() => setFilterType('all')}
                    className={`flex items-center gap-2 px-4 py-2 rounded-xl font-semibold text-sm whitespace-nowrap transition-all duration-300 ${
                      filterType === 'all'
                        ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'
                        : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
                    }`}
                  >
                    <Filter size={16} />
                    Todas ({myTickets.length})
                  </button>
                  <button
                    onClick={() => setFilterType('general')}
                    className={`flex items-center gap-2 px-4 py-2 rounded-xl font-semibold text-sm whitespace-nowrap transition-all duration-300 ${
                      filterType === 'general'
                        ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg'
                        : 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 hover:bg-blue-200 dark:hover:bg-blue-900/50'
                    }`}
                  >
                    <User size={16} />
                    General ({myTickets.filter(t => t.type === 'general').length})
                  </button>
                  <button
                    onClick={() => setFilterType('child')}
                    className={`flex items-center gap-2 px-4 py-2 rounded-xl font-semibold text-sm whitespace-nowrap transition-all duration-300 ${
                      filterType === 'child'
                        ? 'bg-gradient-to-r from-green-500 to-green-600 text-white shadow-lg'
                        : 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 hover:bg-green-200 dark:hover:bg-green-900/50'
                    }`}
                  >
                    <Baby size={16} />
                    Niño ({myTickets.filter(t => t.type === 'child').length})
                  </button>
                  <button
                    onClick={() => setFilterType('senior')}
                    className={`flex items-center gap-2 px-4 py-2 rounded-xl font-semibold text-sm whitespace-nowrap transition-all duration-300 ${
                      filterType === 'senior'
                        ? 'bg-gradient-to-r from-purple-500 to-purple-600 text-white shadow-lg'
                        : 'bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 hover:bg-purple-200 dark:hover:bg-purple-900/50'
                    }`}
                  >
                    <Elderly size={16} />
                    Senior ({myTickets.filter(t => t.type === 'senior').length})
                  </button>
                </div>

                {/* Contador de resultados */}
                {searchTerm && (
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Se encontraron <span className="font-bold text-blue-600 dark:text-purple-400">{filteredTickets.length}</span> resultado(s)
                  </p>
                )}
              </div>
            )}

            <div className="flex flex-col gap-4">
              {myTickets.length === 0 ? (
                <div className="text-center py-16 animate-fade-in">
                  <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 flex items-center justify-center">
                    <Ticket className="text-blue-600 dark:text-purple-400" size={48} />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                    No hay entradas aún
                  </h3>
                  <p className="text-gray-500 dark:text-gray-400 mb-6">
                    Compra tu primera entrada para comenzar
                  </p>
                  <button 
                    onClick={() => setActiveTab('new-ticket')}
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold hover:shadow-lg hover:shadow-blue-500/50 transform hover:scale-105 transition-all duration-300"
                  >
                    <Sparkles size={20} />
                    Comprar Entrada
                  </button>
                </div>
              ) : filteredTickets.length === 0 ? (
                <div className="text-center py-16 animate-fade-in">
                  <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-700 flex items-center justify-center">
                    <Search className="text-gray-400" size={48} />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                    No se encontraron resultados
                  </h3>
                  <p className="text-gray-500 dark:text-gray-400 mb-6">
                    Intenta con otros términos de búsqueda o filtros
                  </p>
                  <button 
                    onClick={() => { setSearchTerm(''); setFilterType('all'); }}
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 font-semibold hover:bg-gray-300 dark:hover:bg-gray-600 transition-all duration-300"
                  >
                    Limpiar filtros
                  </button>
                </div>
              ) : (
                filteredTickets.map((ticket, index) => (
                  <div
                    key={ticket.id}
                    className="group relative bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 p-6 rounded-2xl shadow-lg hover:shadow-2xl border border-gray-200 dark:border-gray-700 transform hover:scale-[1.02] transition-all duration-300 overflow-hidden"
                    style={{ 
                      animationDelay: `${index * 100}ms`,
                      animation: 'slideInUp 0.5s ease-out forwards'
                    }}
                  >
                    {/* Efecto de brillo animado */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out"></div>
                    
                    {/* Badge de tipo de entrada */}
                    <div className="absolute top-4 right-4 flex items-center gap-2">
                      <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                        ticket.type === 'general' 
                          ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/50 dark:text-blue-300'
                          : ticket.type === 'child'
                          ? 'bg-green-100 text-green-700 dark:bg-green-900/50 dark:text-green-300'
                          : 'bg-purple-100 text-purple-700 dark:bg-purple-900/50 dark:text-purple-300'
                      }`}>
                        {ticket.type === 'general' ? 'GENERAL' : ticket.type === 'child' ? 'NIÑO' : 'SENIOR'}
                      </span>
                    </div>

                    <div className="flex items-start gap-4 mb-4">
                      <div className={`flex items-center justify-center rounded-2xl shrink-0 w-16 h-16 shadow-lg transform group-hover:rotate-12 transition-transform duration-300 ${
                        ticket.type === 'general'
                          ? 'bg-gradient-to-br from-blue-500 to-blue-600'
                          : ticket.type === 'child'
                          ? 'bg-gradient-to-br from-green-500 to-green-600'
                          : 'bg-gradient-to-br from-purple-500 to-purple-600'
                      }`}>
                        <Ticket className="text-white" size={32} />
                      </div>
                      <div className="flex flex-col justify-center flex-1">
                        <h3 className="text-gray-900 dark:text-white text-xl font-bold leading-normal mb-1">
                          Entrada {ticket.type === 'general' ? 'General' : ticket.type === 'child' ? 'Niño' : 'Senior'}
                        </h3>
                        <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400 text-sm">
                          <Calendar size={16} />
                          <span>{ticket.date}</span>
                        </div>
                        <div className="flex items-center gap-2 text-gray-500 dark:text-gray-500 text-xs mt-2">
                          <span className="px-2 py-1 bg-gray-200 dark:bg-gray-700 rounded-md font-medium">
                            #{ticket.ticketNumber} de {ticket.totalTickets}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Precio destacado */}
                    <div className="flex items-center justify-between mb-4 p-3 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-xl">
                      <span className="text-gray-700 dark:text-gray-300 font-medium">Precio pagado</span>
                      <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                        ${ticket.total.toLocaleString()}
                      </span>
                    </div>

                    {/* ID del ticket */}
                    <div className="mb-4 p-2 bg-gray-100 dark:bg-gray-800 rounded-lg">
                      <p className="text-gray-400 dark:text-gray-500 text-xs font-mono text-center">
                        {ticket.id}
                      </p>
                    </div>

                    {/* Botones de acción */}
                    <div className="grid grid-cols-2 gap-2 mb-4">
                      <button
                        onClick={() => handleShowQR(ticket)}
                        className="flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold hover:shadow-lg hover:shadow-blue-500/50 transform hover:scale-105 transition-all duration-300"
                      >
                        <QrCode size={18} />
                        <span className="text-sm">Ver QR</span>
                      </button>
                      <button
                        onClick={() => handleDeleteTicket(ticket.id)}
                        className="flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl bg-gradient-to-r from-red-600 to-rose-600 text-white font-semibold hover:shadow-lg hover:shadow-red-500/50 transform hover:scale-105 transition-all duration-300"
                      >
                        <Trash2 size={18} />
                        <span className="text-sm">Borrar</span>
                      </button>
                    </div>
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
          <div className="max-w-2xl mx-auto">
            {/* Header de sección */}
            <div className="mb-6 animate-fade-in">
              <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
                Comprar Entradas
              </h1>
              <p className="text-gray-600 dark:text-gray-400">
                Selecciona la cantidad y tipo de entradas que deseas
              </p>
            </div>

            {/* Ticket Selection */}
            <div className="flex flex-col gap-4 mb-6">
              {/* General */}
              <div className="group relative bg-gradient-to-br from-white to-blue-50 dark:from-gray-800 dark:to-blue-900/20 p-6 rounded-2xl shadow-lg hover:shadow-2xl border border-gray-200 dark:border-gray-700 transform hover:scale-[1.02] transition-all duration-300 overflow-hidden">
                {/* Efecto de brillo */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-100/50 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                
                <div className="relative flex items-center gap-4 mb-4">
                  <div className="flex items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 to-blue-600 w-16 h-16 shadow-lg transform group-hover:rotate-12 transition-transform duration-300">
                    <User className="text-white" size={28} />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-gray-900 dark:text-white text-xl font-bold mb-1">Entrada General</h3>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">Adultos (12-64 años)</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => handleDecrement('general')}
                      className="w-10 h-10 rounded-xl bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 flex items-center justify-center text-xl font-bold hover:bg-gray-300 dark:hover:bg-gray-600 transform hover:scale-110 active:scale-95 transition-all duration-200 shadow-md"
                    >
                      -
                    </button>
                    <span className="text-gray-900 dark:text-white text-2xl font-bold w-12 text-center">
                      {newTickets.general}
                    </span>
                    <button
                      onClick={() => handleIncrement('general')}
                      className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-blue-700 text-white flex items-center justify-center text-xl font-bold hover:shadow-lg hover:shadow-blue-500/50 transform hover:scale-110 active:scale-95 transition-all duration-200"
                    >
                      +
                    </button>
                  </div>
                </div>
                <div className="relative pt-4 border-t border-gray-200 dark:border-gray-700">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600 dark:text-gray-400 font-medium">Subtotal</span>
                    <p className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-blue-700 bg-clip-text text-transparent">
                      ${(prices.general * newTickets.general).toLocaleString()}
                    </p>
                  </div>
                </div>
              </div>

              {/* Child */}
              <div className="group relative bg-gradient-to-br from-white to-green-50 dark:from-gray-800 dark:to-green-900/20 p-6 rounded-2xl shadow-lg hover:shadow-2xl border border-gray-200 dark:border-gray-700 transform hover:scale-[1.02] transition-all duration-300 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-green-100/50 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                
                <div className="relative flex items-center gap-4 mb-4">
                  <div className="flex items-center justify-center rounded-2xl bg-gradient-to-br from-green-500 to-green-600 w-16 h-16 shadow-lg transform group-hover:rotate-12 transition-transform duration-300">
                    <Baby className="text-white" size={28} />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-gray-900 dark:text-white text-xl font-bold mb-1">Entrada Niño</h3>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">Menores de 12 años</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => handleDecrement('child')}
                      className="w-10 h-10 rounded-xl bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 flex items-center justify-center text-xl font-bold hover:bg-gray-300 dark:hover:bg-gray-600 transform hover:scale-110 active:scale-95 transition-all duration-200 shadow-md"
                    >
                      -
                    </button>
                    <span className="text-gray-900 dark:text-white text-2xl font-bold w-12 text-center">
                      {newTickets.child}
                    </span>
                    <button
                      onClick={() => handleIncrement('child')}
                      className="w-10 h-10 rounded-xl bg-gradient-to-br from-green-600 to-green-700 text-white flex items-center justify-center text-xl font-bold hover:shadow-lg hover:shadow-green-500/50 transform hover:scale-110 active:scale-95 transition-all duration-200"
                    >
                      +
                    </button>
                  </div>
                </div>
                <div className="relative pt-4 border-t border-gray-200 dark:border-gray-700">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600 dark:text-gray-400 font-medium">Subtotal</span>
                    <p className="text-2xl font-bold bg-gradient-to-r from-green-600 to-green-700 bg-clip-text text-transparent">
                      ${(prices.child * newTickets.child).toLocaleString()}
                    </p>
                  </div>
                </div>
              </div>

              {/* Senior */}
              <div className="group relative bg-gradient-to-br from-white to-purple-50 dark:from-gray-800 dark:to-purple-900/20 p-6 rounded-2xl shadow-lg hover:shadow-2xl border border-gray-200 dark:border-gray-700 transform hover:scale-[1.02] transition-all duration-300 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-purple-100/50 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                
                <div className="relative flex items-center gap-4 mb-4">
                  <div className="flex items-center justify-center rounded-2xl bg-gradient-to-br from-purple-500 to-purple-600 w-16 h-16 shadow-lg transform group-hover:rotate-12 transition-transform duration-300">
                    <Elderly className="text-white" size={28} />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-gray-900 dark:text-white text-xl font-bold mb-1">Entrada Senior</h3>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">Mayores de 65 años</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => handleDecrement('senior')}
                      className="w-10 h-10 rounded-xl bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 flex items-center justify-center text-xl font-bold hover:bg-gray-300 dark:hover:bg-gray-600 transform hover:scale-110 active:scale-95 transition-all duration-200 shadow-md"
                    >
                      -
                    </button>
                    <span className="text-gray-900 dark:text-white text-2xl font-bold w-12 text-center">
                      {newTickets.senior}
                    </span>
                    <button
                      onClick={() => handleIncrement('senior')}
                      className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-600 to-purple-700 text-white flex items-center justify-center text-xl font-bold hover:shadow-lg hover:shadow-purple-500/50 transform hover:scale-110 active:scale-95 transition-all duration-200"
                    >
                      +
                    </button>
                  </div>
                </div>
                <div className="relative pt-4 border-t border-gray-200 dark:border-gray-700">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600 dark:text-gray-400 font-medium">Subtotal</span>
                    <p className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-purple-700 bg-clip-text text-transparent">
                      ${(prices.senior * newTickets.senior).toLocaleString()}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Payment Footer mejorado */}
            <div className="sticky bottom-20 bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 p-6 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 backdrop-blur-lg">
              {/* Resumen de compra */}
              <div className="mb-4 space-y-2">
                <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400">
                  <span>Total de entradas</span>
                  <span className="font-semibold">{newTickets.general + newTickets.child + newTickets.senior}</span>
                </div>
                {newTickets.general > 0 && (
                  <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400">
                    <span>{newTickets.general}x General</span>
                    <span>${(prices.general * newTickets.general).toLocaleString()}</span>
                  </div>
                )}
                {newTickets.child > 0 && (
                  <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400">
                    <span>{newTickets.child}x Niño</span>
                    <span>${(prices.child * newTickets.child).toLocaleString()}</span>
                  </div>
                )}
                {newTickets.senior > 0 && (
                  <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400">
                    <span>{newTickets.senior}x Senior</span>
                    <span>${(prices.senior * newTickets.senior).toLocaleString()}</span>
                  </div>
                )}
              </div>

              <div className="flex items-center justify-between mb-6 pt-4 border-t-2 border-gray-200 dark:border-gray-700">
                <p className="text-gray-900 dark:text-white text-xl font-bold">Total a Pagar</p>
                <p className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  ${subtotal.toLocaleString()}
                </p>
              </div>
              
              <button 
                onClick={handlePayment}
                className="group/pay w-full flex items-center justify-center rounded-xl h-14 bg-gradient-to-r from-blue-600 to-purple-600 text-white gap-3 text-lg font-bold tracking-wide hover:shadow-2xl hover:shadow-blue-500/50 transform hover:scale-105 active:scale-95 transition-all duration-300 disabled:from-gray-400 disabled:to-gray-500 disabled:cursor-not-allowed disabled:hover:scale-100 disabled:shadow-none relative overflow-hidden"
                disabled={newTickets.general + newTickets.child + newTickets.senior === 0}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-400 opacity-0 group-hover/pay:opacity-100 transition-opacity duration-300"></div>
                <CreditCard className="relative group-hover/pay:scale-110 transition-transform duration-300" size={22} />
                <span className="relative">Pagar ahora</span>
              </button>
              
              <div className="flex items-center justify-center gap-2 text-gray-500 dark:text-gray-400 text-xs mt-4">
                <ShieldCheck size={16} className="text-green-600 dark:text-green-400" />
                <span>Pago 100% seguro con encriptación SSL</span>
              </div>
            </div>
          </div>
        </main>
      )}
    </div>
  )
}
