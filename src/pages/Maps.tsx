import { useState } from 'react'
import { MapPin, Navigation, Plus, Minus } from 'lucide-react'

export default function Maps() {
  const [zoom, setZoom] = useState(1)
  const [selectedLocation, setSelectedLocation] = useState<number | null>(null)

  const locations = [
    {
      id: 1,
      name: 'Montaña Rusa',
      icon: '🎢',
      capacity: 85,
      color: 'bg-red-500',
      hoverColor: 'hover:bg-red-600',
      top: '35%',
      left: '30%',
    },
    {
      id: 2,
      name: 'Restaurante',
      icon: '🍽️',
      capacity: 55,
      color: 'bg-yellow-400',
      hoverColor: 'hover:bg-yellow-500',
      top: '65%',
      left: '20%',
    },
    {
      id: 3,
      name: 'Castillo',
      icon: '🏰',
      capacity: 25,
      color: 'bg-green-500',
      hoverColor: 'hover:bg-green-600',
      top: '25%',
      left: '68%',
    },
    {
      id: 4,
      name: 'Área Acuática',
      icon: '🌊',
      capacity: 90,
      color: 'bg-red-500',
      hoverColor: 'hover:bg-red-600',
      top: '60%',
      left: '75%',
    },
    {
      id: 5,
      name: 'Cafetería',
      icon: '☕',
      capacity: 40,
      color: 'bg-yellow-400',
      hoverColor: 'hover:bg-yellow-500',
      top: '45%',
      left: '55%',
    },
    {
      id: 6,
      name: 'Área Infantil',
      icon: '🎪',
      capacity: 15,
      color: 'bg-green-500',
      hoverColor: 'hover:bg-green-600',
      top: '70%',
      left: '50%',
    },
  ]

  const getCapacityColor = (capacity: number) => {
    if (capacity >= 70) return 'bg-red-500 hover:bg-red-600'
    if (capacity >= 40) return 'bg-yellow-400 hover:bg-yellow-500'
    return 'bg-green-500 hover:bg-green-600'
  }

  // Define paths between locations (as connections)
  const paths = [
    { from: 1, to: 5, color: 'stroke-blue-400' }, // Montaña Rusa to Cafetería
    { from: 5, to: 3, color: 'stroke-blue-400' }, // Cafetería to Castillo
    { from: 5, to: 6, color: 'stroke-blue-400' }, // Cafetería to Área Infantil
    { from: 2, to: 6, color: 'stroke-blue-400' }, // Restaurante to Área Infantil
    { from: 6, to: 4, color: 'stroke-blue-400' }, // Área Infantil to Área Acuática
    { from: 3, to: 4, color: 'stroke-blue-400' }, // Castillo to Área Acuática
  ]

  const getLocationCoords = (id: number) => {
    const location = locations.find(loc => loc.id === id)
    if (!location) return { x: 0, y: 0 }
    return {
      x: parseFloat(location.left),
      y: parseFloat(location.top)
    }
  }

  const handleZoomIn = () => setZoom(Math.min(zoom + 0.2, 2))
  const handleZoomOut = () => setZoom(Math.max(zoom - 0.2, 0.6))

  return (
    <div className="relative flex h-screen w-full flex-col bg-gradient-to-br from-gray-50 to-gray-200 dark:from-gray-900 dark:to-background-dark overflow-hidden">
      <main className="relative flex-1">
        {/* Map Background with gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#2d7a6d] via-[#387C6D] to-[#439c8a]" />
        
        {/* Animated Grid Pattern */}
        <div className="absolute inset-0 overflow-hidden opacity-20">
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="1" />
              </pattern>
              <linearGradient id="fade" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" style={{ stopColor: 'white', stopOpacity: 0.1 }} />
                <stop offset="100%" style={{ stopColor: 'white', stopOpacity: 0 }} />
              </linearGradient>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
            <rect width="100%" height="100%" fill="url(#fade)" />
          </svg>
        </div>

        {/* Map Content - Scrollable */}
        <div className="absolute inset-0 overflow-auto">
          <div
            className="relative w-[150vw] h-[150vh] transform-gpu transition-transform duration-300"
            style={{ transform: `scale(${zoom})` }}
          >
            {/* SVG for Paths */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 1 }}>
              <defs>
                <filter id="glow">
                  <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                  <feMerge>
                    <feMergeNode in="coloredBlur"/>
                    <feMergeNode in="SourceGraphic"/>
                  </feMerge>
                </filter>
              </defs>
              {paths.map((path, index) => {
                const from = getLocationCoords(path.from)
                const to = getLocationCoords(path.to)
                return (
                  <g key={index}>
                    {/* Background glow */}
                    <line
                      x1={`${from.x}%`}
                      y1={`${from.y}%`}
                      x2={`${to.x}%`}
                      y2={`${to.y}%`}
                      className="stroke-white/20"
                      strokeWidth="8"
                      strokeLinecap="round"
                    />
                    {/* Animated dashed line */}
                    <line
                      x1={`${from.x}%`}
                      y1={`${from.y}%`}
                      x2={`${to.x}%`}
                      y2={`${to.y}%`}
                      className={path.color}
                      strokeWidth="3"
                      strokeDasharray="10,10"
                      strokeLinecap="round"
                      style={{
                        animation: 'dash 30s linear infinite',
                        filter: 'url(#glow)'
                      }}
                    />
                  </g>
                )
              })}
            </svg>

            {/* Current Location - Center */}
            <div
              className="absolute"
              style={{ top: '50%', left: '50%', transform: 'translate(-50%, -50%)', zIndex: 10 }}
            >
              <div className="relative flex items-center justify-center">
                <span className="absolute inline-flex h-20 w-20 animate-ping rounded-full bg-blue-400 opacity-75" />
                <span className="absolute inline-flex h-16 w-16 animate-ping rounded-full bg-blue-500 opacity-50" style={{ animationDelay: '0.5s' }} />
                <div className="relative flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-blue-400 to-blue-600 ring-4 ring-white dark:ring-slate-800 shadow-lg">
                  <MapPin size={18} className="text-white" />
                </div>
              </div>
            </div>

            {/* Location Markers */}
            {locations.map((location, index) => (
              <div
                key={location.id}
                className="absolute animate-fade-in"
                style={{
                  top: location.top,
                  left: location.left,
                  animationDelay: `${index * 100}ms`,
                  zIndex: selectedLocation === location.id ? 20 : 10,
                }}
              >
                <div className="flex flex-col items-center gap-1">
                  <button
                    onClick={() => setSelectedLocation(selectedLocation === location.id ? null : location.id)}
                    className={`flex w-12 h-12 items-center justify-center rounded-full ${getCapacityColor(location.capacity)} text-white shadow-lg backdrop-blur-md transition-all ${
                      selectedLocation === location.id ? 'scale-125 ring-4 ring-white' : 'hover:scale-110'
                    }`}
                  >
                    <span className="text-2xl">{location.icon}</span>
                  </button>
                  <div className={`text-xs font-semibold text-white bg-black/60 backdrop-blur-md rounded-lg px-3 py-1 whitespace-nowrap shadow-md transition-all ${
                    selectedLocation === location.id ? 'scale-110' : ''
                  }`}>
                    {location.name}
                    <span className="ml-1 opacity-75">({location.capacity}%)</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Map Controls */}
        <div className="absolute top-4 right-4 flex flex-col gap-2 z-30">
          <button
            onClick={handleZoomIn}
            className="w-12 h-12 bg-white/95 dark:bg-slate-800/95 backdrop-blur-md rounded-xl shadow-xl flex items-center justify-center hover:scale-110 transition-all hover:shadow-2xl"
          >
            <Plus size={24} className="text-gray-700 dark:text-gray-300" />
          </button>
          <button
            onClick={handleZoomOut}
            className="w-12 h-12 bg-white/95 dark:bg-slate-800/95 backdrop-blur-md rounded-xl shadow-xl flex items-center justify-center hover:scale-110 transition-all hover:shadow-2xl"
          >
            <Minus size={24} className="text-gray-700 dark:text-gray-300" />
          </button>
          <button className="w-12 h-12 bg-white/95 dark:bg-slate-800/95 backdrop-blur-md rounded-xl shadow-xl flex items-center justify-center hover:scale-110 transition-all hover:shadow-2xl">
            <Navigation size={24} className="text-blue-600 dark:text-primary" />
          </button>
        </div>

        {/* Legend with enhanced styling */}
        <div className="absolute bottom-20 left-4 right-4 bg-white/95 dark:bg-slate-800/95 backdrop-blur-md rounded-2xl shadow-2xl p-5 max-w-sm border border-gray-200 dark:border-gray-700">
          <h3 className="text-sm font-bold text-gray-900 dark:text-white mb-2">Leyenda</h3>
          <div className="grid grid-cols-2 gap-2 text-xs">
            {locations.map((location) => (
              <div key={location.id} className="flex items-center gap-2">
                <span className={`w-3 h-3 rounded-full ${location.color}`} />
                <span className="text-gray-700 dark:text-gray-300">{location.name}</span>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}
