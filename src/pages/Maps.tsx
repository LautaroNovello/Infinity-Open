import { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { Navigation, Plus, Minus, Users, Clock } from 'lucide-react'

export default function Maps() {
  const location = useLocation()
  const [zoom, setZoom] = useState(1)
  const [selectedLocation, setSelectedLocation] = useState<number | null>(null)
  const [hoveredLocation, setHoveredLocation] = useState<number | null>(null)

  // Recibir la atracción seleccionada desde Home
  useEffect(() => {
    if (location.state?.attractionId) {
      setSelectedLocation(location.state.attractionId)
      // Scroll suave al detalle
      setTimeout(() => {
        const element = document.getElementById('location-detail')
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' })
        }
      }, 300)
    }
  }, [location.state])

  const locations = [
    {
      id: 1,
      name: 'Pileta de Olas',
      icon: '🌊',
      capacity: 85,
      color: 'bg-red-500',
      hoverColor: 'hover:bg-red-600',
      top: '30%',
      left: '25%',
      description: 'Disfruta de olas artificiales en una pileta gigante',
      waitTime: '15 min',
      image: 'https://images.unsplash.com/photo-1561214115-f2f134cc4912?w=800&auto=format&fit=crop&q=80',
    },
    {
      id: 2,
      name: 'Toboganes',
      icon: '🎢',
      capacity: 65,
      color: 'bg-yellow-400',
      hoverColor: 'hover:bg-yellow-500',
      top: '15%',
      left: '70%',
      description: 'Toboganes de alta velocidad y giros emocionantes',
      waitTime: '20 min',
      image: 'https://images.unsplash.com/photo-1609137144813-7d9921338f24?w=800&auto=format&fit=crop&q=80',
    },
    {
      id: 3,
      name: 'Río Lento',
      icon: '🏞️',
      capacity: 72,
      color: 'bg-yellow-400',
      hoverColor: 'hover:bg-yellow-500',
      top: '65%',
      left: '15%',
      description: 'Relájate flotando en el río con corriente suave',
      waitTime: '5 min',
      image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&auto=format&fit=crop&q=80',
    },
    {
      id: 4,
      name: 'Piletas para Niños',
      icon: '👶',
      capacity: 45,
      color: 'bg-green-500',
      hoverColor: 'hover:bg-green-600',
      top: '68%',
      left: '55%',
      description: 'Área segura con poca profundidad para los más pequeños',
      waitTime: '0 min',
      image: 'https://images.unsplash.com/photo-1519046904884-53103b34b206?w=800&auto=format&fit=crop&q=80',
    },
    {
      id: 5,
      name: 'Jacuzzis',
      icon: '♨️',
      capacity: 90,
      color: 'bg-red-500',
      hoverColor: 'hover:bg-red-600',
      top: '55%',
      left: '75%',
      description: 'Múltiples jacuzzis con agua caliente',
      waitTime: '25 min',
      image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=800&auto=format&fit=crop&q=80',
    },
    {
      id: 6,
      name: 'Piscinas de Hidromasajes',
      icon: '💆',
      capacity: 58,
      color: 'bg-yellow-400',
      hoverColor: 'hover:bg-yellow-500',
      top: '42%',
      left: '55%',
      description: 'Piscinas terapéuticas con chorros de agua',
      waitTime: '10 min',
      image: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=800&auto=format&fit=crop&q=80',
    },
  ]

  const getCapacityColor = (capacity: number) => {
    if (capacity >= 70) return 'bg-red-500 hover:bg-red-600'
    if (capacity >= 40) return 'bg-yellow-400 hover:bg-yellow-500'
    return 'bg-green-500 hover:bg-green-600'
  }

  // Define paths between locations (as connections) - Recorrido lógico del parque
  const paths = [
    // Entrada por Pileta de Olas (1) -> Centro de hidromasajes (6)
    { from: 1, to: 6, color: 'stroke-blue-400' },
    // Centro hidromasajes (6) -> Toboganes (2)
    { from: 6, to: 2, color: 'stroke-blue-400' },
    // Toboganes (2) -> Jacuzzis (5)
    { from: 2, to: 5, color: 'stroke-blue-400' },
    // Jacuzzis (5) -> Piletas Niños (4)
    { from: 5, to: 4, color: 'stroke-blue-400' },
    // Piletas Niños (4) -> Río Lento (3)
    { from: 4, to: 3, color: 'stroke-blue-400' },
    // Río Lento (3) -> Pileta de Olas (1) - Completa el circuito
    { from: 3, to: 1, color: 'stroke-blue-400' },
    // Conexión directa Centro: Hidromasajes (6) -> Piletas Niños (4)
    { from: 6, to: 4, color: 'stroke-blue-400' },
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
    <div className="relative flex h-screen w-full flex-col bg-gradient-to-br from-gray-50 to-gray-200 dark:from-gray-900 dark:to-background-dark overflow-hidden pb-20">
      {/* CSS Animations */}
      <style>{`
        @keyframes dash {
          to {
            stroke-dashoffset: -100;
          }
        }
        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-10px);
          }
        }
        @keyframes pulse-ring {
          0% {
            transform: scale(0.9);
            opacity: 1;
          }
          100% {
            transform: scale(1.5);
            opacity: 0;
          }
        }
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(-10px) translateX(-50%);
          }
          to {
            opacity: 1;
            transform: translateY(0) translateX(-50%);
          }
        }
        @keyframes shimmer {
          0% {
            background-position: -1000px 0;
          }
          100% {
            background-position: 1000px 0;
          }
        }
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
        .animate-pulse-ring {
          animation: pulse-ring 2s cubic-bezier(0, 0, 0.2, 1) infinite;
        }
        .animate-shimmer {
          animation: shimmer 2s linear infinite;
          background: linear-gradient(
            to right,
            transparent 0%,
            rgba(255, 255, 255, 0.3) 50%,
            transparent 100%
          );
          background-size: 1000px 100%;
        }
        .location-card {
          transform-style: preserve-3d;
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .location-card:hover {
          transform: translateY(-4px);
        }
        .location-image {
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .location-card:hover .location-image {
          transform: scale(1.1);
        }
      `}</style>

      <main className="relative flex-1">
        {/* Modern Theme Park Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#0EA5E9] via-[#22C55E] to-[#84CC16]" />
        
        {/* Overlay pattern for depth */}
        <div className="absolute inset-0 opacity-20">
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="theme-pattern" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
                <circle cx="25" cy="25" r="20" fill="rgba(255,255,255,0.1)" />
                <circle cx="75" cy="75" r="15" fill="rgba(255,255,255,0.08)" />
                <path d="M 0 50 Q 25 25, 50 50 T 100 50" stroke="rgba(255,255,255,0.15)" strokeWidth="2" fill="none" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#theme-pattern)" />
          </svg>
        </div>

        {/* Park zones with organic shapes */}
        <div className="absolute inset-0 overflow-hidden">
          {/* Main park area - Green zone */}
          <div className="absolute top-[10%] left-[15%] w-[70%] h-[75%] bg-gradient-to-br from-green-400/30 to-emerald-500/20 rounded-[50%] blur-3xl" />
          
          {/* Water park area - Blue zone */}
          <div className="absolute top-[50%] left-[65%] w-[40%] h-[45%] bg-gradient-to-br from-cyan-400/30 to-blue-500/20 rounded-[50%] blur-3xl" />
          
          {/* Entertainment area - Yellow zone */}
          <div className="absolute top-[20%] left-[20%] w-[35%] h-[35%] bg-gradient-to-br from-yellow-400/20 to-orange-400/15 rounded-[50%] blur-2xl" />
          
          {/* Food court area - Orange zone */}
          <div className="absolute top-[60%] left-[10%] w-[30%] h-[30%] bg-gradient-to-br from-amber-400/25 to-orange-500/15 rounded-[50%] blur-2xl" />
        </div>

        {/* Decorative paths with gradients */}
        <svg className="absolute inset-0 w-full h-full opacity-15" style={{ zIndex: 0 }}>
          <defs>
            <linearGradient id="path-gradient-1" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="white" stopOpacity="0.3" />
              <stop offset="50%" stopColor="white" stopOpacity="0.5" />
              <stop offset="100%" stopColor="white" stopOpacity="0.3" />
            </linearGradient>
            <linearGradient id="path-gradient-2" x1="0%" y1="100%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="white" stopOpacity="0.2" />
              <stop offset="50%" stopColor="white" stopOpacity="0.4" />
              <stop offset="100%" stopColor="white" stopOpacity="0.2" />
            </linearGradient>
          </defs>
          
          {/* Curved decorative paths */}
          <path d="M 0,200 Q 300,100 600,200 T 1200,200" 
                stroke="url(#path-gradient-1)" strokeWidth="30" fill="none" strokeLinecap="round" />
          <path d="M 200,0 Q 300,400 400,800 T 500,1200" 
                stroke="url(#path-gradient-2)" strokeWidth="25" fill="none" strokeLinecap="round" />
          <path d="M 0,600 Q 400,500 800,600 T 1600,600" 
                stroke="url(#path-gradient-1)" strokeWidth="20" fill="none" strokeLinecap="round" />
        </svg>

        {/* Floating decorative elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(12)].map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full bg-white/10 animate-float"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                width: `${20 + Math.random() * 60}px`,
                height: `${20 + Math.random() * 60}px`,
                animationDelay: `${i * 0.8}s`,
                animationDuration: `${4 + Math.random() * 3}s`,
              }}
            />
          ))}
        </div>

        {/* Map Content - Scrollable */}
        <div className="absolute inset-0 overflow-auto">
          <div
            className="relative w-[150vw] h-[150vh] transform-gpu transition-transform duration-500 ease-out"
            style={{ transform: `scale(${zoom})` }}
            onClick={() => setSelectedLocation(null)}
          >
            {/* SVG for Paths - Google Maps style paths */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 100 100" preserveAspectRatio="none" style={{ zIndex: 1 }}>
              <defs>
                <filter id="path-glow">
                  <feGaussianBlur stdDeviation="0.5" result="coloredBlur"/>
                  <feMerge>
                    <feMergeNode in="coloredBlur"/>
                    <feMergeNode in="SourceGraphic"/>
                  </feMerge>
                </filter>
                <linearGradient id="pathGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" style={{ stopColor: '#4285F4', stopOpacity: 0.9 }} />
                  <stop offset="50%" style={{ stopColor: '#5A9FFF', stopOpacity: 1 }} />
                  <stop offset="100%" style={{ stopColor: '#4285F4', stopOpacity: 0.9 }} />
                </linearGradient>
                <linearGradient id="pathGradientActive" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" style={{ stopColor: '#10B981', stopOpacity: 1 }} />
                  <stop offset="50%" style={{ stopColor: '#34D399', stopOpacity: 1 }} />
                  <stop offset="100%" style={{ stopColor: '#10B981', stopOpacity: 1 }} />
                </linearGradient>
              </defs>
              {paths.map((path, index) => {
                const from = getLocationCoords(path.from)
                const to = getLocationCoords(path.to)
                const isActive = selectedLocation === path.from || selectedLocation === path.to
                
                // Calcular punto de control para curva suave
                const controlX = (from.x + to.x) / 2 + ((to.y - from.y) * 0.2)
                const controlY = (from.y + to.y) / 2 - ((to.x - from.x) * 0.15)
                
                const pathD = `M ${from.x},${from.y} Q ${controlX},${controlY} ${to.x},${to.y}`
                
                return (
                  <g key={index}>
                    {/* Sombra exterior - efecto de profundidad */}
                    <path
                      d={pathD}
                      stroke="#000000"
                      strokeWidth={isActive ? "1.4" : "1.2"}
                      strokeLinecap="round"
                      fill="none"
                      strokeOpacity="0.1"
                      transform="translate(0, 0.2)"
                    />
                    {/* Borde exterior azul oscuro */}
                    <path
                      d={pathD}
                      stroke="#1967D2"
                      strokeWidth={isActive ? "1.2" : "1"}
                      strokeLinecap="round"
                      fill="none"
                      strokeOpacity="0.5"
                    />
                    {/* Línea principal con gradiente */}
                    <path
                      d={pathD}
                      stroke={isActive ? "url(#pathGradientActive)" : "url(#pathGradient)"}
                      strokeWidth={isActive ? "0.8" : "0.6"}
                      strokeLinecap="round"
                      fill="none"
                      style={{
                        filter: 'url(#path-glow)',
                        transition: 'all 0.3s ease',
                      }}
                    />
                    {/* Línea interna blanca para dar efecto 3D */}
                    <path
                      d={pathD}
                      stroke="rgba(255, 255, 255, 0.4)"
                      strokeWidth={isActive ? "0.3" : "0.2"}
                      strokeLinecap="round"
                      fill="none"
                      style={{
                        transition: 'all 0.3s ease',
                      }}
                    />
                    {/* Puntos decorativos a lo largo del camino */}
                    {!isActive && (
                      <>
                        <circle
                          cx={from.x + (to.x - from.x) * 0.25}
                          cy={from.y + (to.y - from.y) * 0.25}
                          r="0.3"
                          fill="white"
                          opacity="0.6"
                        />
                        <circle
                          cx={from.x + (to.x - from.x) * 0.75}
                          cy={from.y + (to.y - from.y) * 0.75}
                          r="0.3"
                          fill="white"
                          opacity="0.6"
                        />
                      </>
                    )}
                    {/* Punto animado cuando está activo */}
                    {isActive && (
                      <>
                        <circle
                          r="0.6"
                          fill="#FFFFFF"
                          stroke="#10B981"
                          strokeWidth="0.3"
                        >
                          <animateMotion
                            dur="3s"
                            repeatCount="indefinite"
                            path={pathD}
                          />
                        </circle>
                        {/* Segundo punto animado desfasado */}
                        <circle
                          r="0.5"
                          fill="#10B981"
                          opacity="0.8"
                        >
                          <animateMotion
                            dur="3s"
                            begin="1.5s"
                            repeatCount="indefinite"
                            path={pathD}
                          />
                        </circle>
                      </>
                    )}
                  </g>
                )
              })}
            </svg>

            {/* Current Location - Google Maps style blue dot */}
            <div
              className="absolute"
              style={{ top: '50%', left: '50%', transform: 'translate(-50%, -50%)', zIndex: 10 }}
            >
              <div className="relative flex items-center justify-center">
                {/* Accuracy circle - like Google Maps */}
                <div className="absolute w-32 h-32 rounded-full bg-blue-400/20 animate-pulse" />
                <div 
                  className="absolute w-24 h-24 rounded-full bg-blue-400/30 animate-pulse" 
                  style={{ animationDelay: '0.5s', animationDuration: '2s' }}
                />
                
                {/* Blue dot with white border - Google Maps style */}
                <div className="relative flex h-10 w-10 items-center justify-center">
                  <div className="absolute inset-0 rounded-full bg-white shadow-lg" />
                  <div className="absolute inset-1 rounded-full bg-[#4285F4] shadow-inner" />
                  <div className="absolute inset-2 rounded-full bg-[#5A9FFF]" />
                  
                  {/* Direction indicator */}
                  <div className="absolute -top-1 w-3 h-3 bg-white rotate-45 shadow-md" 
                       style={{ clipPath: 'polygon(0 0, 100% 0, 50% 50%)' }} />
                </div>
              </div>
            </div>

            {/* Location Markers - Google Maps style pins */}
            {locations.map((location, index) => {
              const isSelected = selectedLocation === location.id
              const isHovered = hoveredLocation === location.id
              
              return (
                <div
                  key={location.id}
                  className="absolute"
                  style={{
                    top: location.top,
                    left: location.left,
                    animationDelay: `${index * 100}ms`,
                    zIndex: isSelected ? 30 : isHovered ? 25 : 10,
                    transition: 'z-index 0.3s',
                  }}
                >
                  <div className="flex flex-col items-center gap-2">
                    {/* Google Maps style marker pin */}
                    <div
                      className="location-card relative group cursor-pointer"
                      onClick={(e) => {
                        e.stopPropagation()
                        setSelectedLocation(isSelected ? null : location.id)
                      }}
                      onMouseEnter={() => setHoveredLocation(location.id)}
                      onMouseLeave={() => setHoveredLocation(null)}
                    >
                      {/* Expanded Card */}
                      {(isSelected || isHovered) && (
                        <div className="absolute bottom-full mb-3 left-1/2 -translate-x-1/2 w-72 animate-[fadeIn_0.3s_ease-out]">
                          <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-2xl overflow-hidden border border-gray-200 dark:border-gray-700">
                            {/* Image */}
                            <div className="relative h-40 overflow-hidden bg-gray-100 dark:bg-gray-900">
                              <img
                                src={location.image}
                                alt={location.name}
                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                style={{ imageRendering: 'crisp-edges' }}
                              />
                              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                              
                              {/* Capacity badge on image */}
                              <div className="absolute top-3 right-3">
                                <div className={`px-3 py-1.5 rounded-full text-xs font-bold text-white backdrop-blur-md shadow-lg ${getCapacityColor(location.capacity)}`}>
                                  {location.capacity}%
                                </div>
                              </div>

                              {/* Icon badge */}
                              <div className="absolute bottom-3 left-3 w-12 h-12 bg-white/95 backdrop-blur-sm rounded-xl flex items-center justify-center shadow-xl border-2 border-white/50">
                                <span className="text-2xl">{location.icon}</span>
                              </div>
                            </div>

                            {/* Info */}
                            <div className="p-4">
                              <h3 className="font-bold text-base text-gray-900 dark:text-white mb-1.5">
                                {location.name}
                              </h3>
                              <p className="text-xs text-gray-600 dark:text-gray-400 mb-3">
                                {location.description}
                              </p>
                              
                              <div className="flex items-center justify-between pt-3 border-t border-gray-100 dark:border-gray-700">
                                <div className="flex items-center gap-1.5 text-gray-700 dark:text-gray-300">
                                  <Clock size={14} className="text-blue-500" />
                                  <span className="text-xs font-medium">{location.waitTime}</span>
                                </div>
                                <div className="flex items-center gap-1.5 text-gray-700 dark:text-gray-300">
                                  <Users size={14} className="text-blue-500" />
                                  <span className="text-xs font-medium">{location.capacity}% ocupado</span>
                                </div>
                              </div>
                            </div>
                          </div>
                          {/* Arrow pointing down */}
                          <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-white dark:bg-slate-800 rotate-45 border-r border-b border-gray-200 dark:border-gray-700" />
                        </div>
                      )}

                      {/* Custom unique pin marker for each location */}
                      <div className={`relative transition-all duration-300 ${
                        isSelected || isHovered ? 'scale-125' : 'scale-100 hover:scale-110'
                      }`}>
                        {/* Pin shadow */}
                        <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-10 h-3 bg-black/40 rounded-full blur-md" />
                        
                        {/* Pin body - Different styles per location */}
                        <div className="relative">
                          {/* Pileta de Olas - Wave teardrop pin */}
                          {location.id === 1 && (
                            <svg width="56" height="68" viewBox="0 0 56 68" fill="none" className="drop-shadow-2xl">
                              <defs>
                                <linearGradient id="wave-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                                  <stop offset="0%" stopColor="#06B6D4" />
                                  <stop offset="100%" stopColor="#0891B2" />
                                </linearGradient>
                              </defs>
                              <path
                                d="M28 2C15.8 2 6 11.8 6 24C6 39 28 62 28 62C28 62 50 39 50 24C50 11.8 40.2 2 28 2Z"
                                fill="url(#wave-gradient)"
                              />
                              <circle cx="28" cy="24" r="13" fill="white" />
                              <circle cx="28" cy="24" r="11" fill="#0891B2" />
                              {/* Wave pattern */}
                              <path d="M20 24 Q22 21, 24 24 T28 24 T32 24 T36 24" stroke="white" strokeWidth="2" fill="none" />
                              <text x="28" y="30" fontSize="18" textAnchor="middle" fill="white">🌊</text>
                            </svg>
                          )}
                          
                          {/* Toboganes - Slide shape */}
                          {location.id === 2 && (
                            <svg width="56" height="68" viewBox="0 0 56 68" fill="none" className="drop-shadow-2xl">
                              <defs>
                                <linearGradient id="slide-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                                  <stop offset="0%" stopColor="#F59E0B" />
                                  <stop offset="100%" stopColor="#D97706" />
                                </linearGradient>
                              </defs>
                              <path
                                d="M28 2C15.8 2 6 11.8 6 24C6 39 28 62 28 62C28 62 50 39 50 24C50 11.8 40.2 2 28 2Z"
                                fill="url(#slide-gradient)"
                              />
                              <circle cx="28" cy="24" r="13" fill="white" />
                              <circle cx="28" cy="24" r="11" fill="#F59E0B" />
                              {/* Slide lines */}
                              <path d="M22 20 Q24 26, 26 20" stroke="white" strokeWidth="1.5" fill="none" />
                              <path d="M28 20 Q30 26, 32 20" stroke="white" strokeWidth="1.5" fill="none" />
                              <text x="28" y="31" fontSize="18" textAnchor="middle" fill="white">🎢</text>
                            </svg>
                          )}
                          
                          {/* Río Lento - River flow shape */}
                          {location.id === 3 && (
                            <svg width="56" height="68" viewBox="0 0 56 68" fill="none" className="drop-shadow-2xl">
                              <defs>
                                <linearGradient id="river-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                                  <stop offset="0%" stopColor="#10B981" />
                                  <stop offset="100%" stopColor="#059669" />
                                </linearGradient>
                              </defs>
                              <path
                                d="M28 2C15.8 2 6 11.8 6 24C6 39 28 62 28 62C28 62 50 39 50 24C50 11.8 40.2 2 28 2Z"
                                fill="url(#river-gradient)"
                              />
                              <circle cx="28" cy="24" r="13" fill="white" />
                              <circle cx="28" cy="24" r="11" fill="#10B981" />
                              {/* River flow lines */}
                              <path d="M20 22 Q24 20, 28 22 T36 22" stroke="white" strokeWidth="1.5" fill="none" opacity="0.7" />
                              <path d="M20 26 Q24 28, 28 26 T36 26" stroke="white" strokeWidth="1.5" fill="none" opacity="0.7" />
                              <text x="28" y="31" fontSize="18" textAnchor="middle" fill="white">🏞️</text>
                            </svg>
                          )}
                          
                          {/* Piletas Niños - Cute rounded shape */}
                          {location.id === 4 && (
                            <svg width="56" height="68" viewBox="0 0 56 68" fill="none" className="drop-shadow-2xl">
                              <defs>
                                <linearGradient id="kids-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                                  <stop offset="0%" stopColor="#F472B6" />
                                  <stop offset="100%" stopColor="#EC4899" />
                                </linearGradient>
                              </defs>
                              <path
                                d="M28 2C15.8 2 6 11.8 6 24C6 39 28 62 28 62C28 62 50 39 50 24C50 11.8 40.2 2 28 2Z"
                                fill="url(#kids-gradient)"
                              />
                              <circle cx="28" cy="24" r="13" fill="white" />
                              <circle cx="28" cy="24" r="11" fill="#EC4899" />
                              {/* Cute circles pattern */}
                              <circle cx="23" cy="20" r="2" fill="white" opacity="0.8" />
                              <circle cx="33" cy="20" r="2" fill="white" opacity="0.8" />
                              <circle cx="28" cy="27" r="1.5" fill="white" opacity="0.8" />
                              <text x="28" y="31" fontSize="18" textAnchor="middle" fill="white">👶</text>
                            </svg>
                          )}
                          
                          {/* Jacuzzis - Hot water bubbles */}
                          {location.id === 5 && (
                            <svg width="56" height="68" viewBox="0 0 56 68" fill="none" className="drop-shadow-2xl">
                              <defs>
                                <linearGradient id="jacuzzi-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                                  <stop offset="0%" stopColor="#EF4444" />
                                  <stop offset="100%" stopColor="#DC2626" />
                                </linearGradient>
                              </defs>
                              <path
                                d="M28 2C15.8 2 6 11.8 6 24C6 39 28 62 28 62C28 62 50 39 50 24C50 11.8 40.2 2 28 2Z"
                                fill="url(#jacuzzi-gradient)"
                              />
                              <circle cx="28" cy="24" r="13" fill="white" />
                              <circle cx="28" cy="24" r="11" fill="#DC2626" />
                              {/* Steam waves */}
                              <path d="M23 18 Q23 15, 23 13" stroke="white" strokeWidth="1.5" strokeLinecap="round" fill="none" opacity="0.8" />
                              <path d="M28 16 Q28 13, 28 11" stroke="white" strokeWidth="1.5" strokeLinecap="round" fill="none" opacity="0.8" />
                              <path d="M33 18 Q33 15, 33 13" stroke="white" strokeWidth="1.5" strokeLinecap="round" fill="none" opacity="0.8" />
                              <text x="28" y="32" fontSize="18" textAnchor="middle" fill="white">♨️</text>
                            </svg>
                          )}
                          
                          {/* Hidromasajes - Spa luxury */}
                          {location.id === 6 && (
                            <svg width="56" height="68" viewBox="0 0 56 68" fill="none" className="drop-shadow-2xl">
                              <defs>
                                <linearGradient id="hydro-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                                  <stop offset="0%" stopColor="#8B5CF6" />
                                  <stop offset="100%" stopColor="#7C3AED" />
                                </linearGradient>
                              </defs>
                              <path
                                d="M28 2C15.8 2 6 11.8 6 24C6 39 28 62 28 62C28 62 50 39 50 24C50 11.8 40.2 2 28 2Z"
                                fill="url(#hydro-gradient)"
                              />
                              <circle cx="28" cy="24" r="13" fill="white" />
                              <circle cx="28" cy="24" r="11" fill="#8B5CF6" />
                              {/* Massage jets */}
                              <circle cx="22" cy="21" r="1.5" fill="white" opacity="0.8" />
                              <circle cx="28" cy="19" r="1.5" fill="white" opacity="0.8" />
                              <circle cx="34" cy="21" r="1.5" fill="white" opacity="0.8" />
                              <circle cx="24" cy="26" r="1.5" fill="white" opacity="0.8" />
                              <circle cx="32" cy="26" r="1.5" fill="white" opacity="0.8" />
                              <text x="28" y="32" fontSize="18" textAnchor="middle" fill="white">💆</text>
                            </svg>
                          )}

                          {/* Pulse effect when selected */}
                          {isSelected && (
                            <>
                              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-16 h-16 rounded-full border-4 border-blue-400 animate-ping opacity-50" />
                              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-20 h-20 rounded-full border-4 border-green-400 animate-ping opacity-30" 
                                   style={{ animationDelay: '0.5s' }} />
                            </>
                          )}
                          
                          {/* Hover glow */}
                          {isHovered && !isSelected && (
                            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-16 h-16 rounded-full bg-white/30 animate-pulse" />
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Map Controls - Enhanced design */}
        <div className="absolute bottom-24 right-4 flex flex-col gap-3 z-30">
          <button
            onClick={handleZoomIn}
            className="w-12 h-12 bg-white/95 dark:bg-slate-800/95 backdrop-blur-md rounded-xl shadow-2xl flex items-center justify-center hover:scale-110 transition-all hover:shadow-blue-500/20 hover:shadow-2xl active:scale-95 border border-gray-200 dark:border-gray-700"
          >
            <Plus size={22} className="text-gray-700 dark:text-gray-300" />
          </button>
          <button
            onClick={handleZoomOut}
            className="w-12 h-12 bg-white/95 dark:bg-slate-800/95 backdrop-blur-md rounded-xl shadow-2xl flex items-center justify-center hover:scale-110 transition-all hover:shadow-blue-500/20 hover:shadow-2xl active:scale-95 border border-gray-200 dark:border-gray-700"
          >
            <Minus size={22} className="text-gray-700 dark:text-gray-300" />
          </button>
          <button className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 backdrop-blur-md rounded-xl shadow-2xl flex items-center justify-center hover:scale-110 transition-all hover:shadow-blue-500/40 hover:shadow-2xl active:scale-95">
            <Navigation size={22} className="text-white" />
          </button>
        </div>
      </main>
    </div>
  )
}
