import { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { Navigation, Plus, Minus, Users, Clock, Info } from 'lucide-react'

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
      icon: '�',
      capacity: 85,
      color: 'bg-red-500',
      hoverColor: 'hover:bg-red-600',
      top: '35%',
      left: '30%',
      description: 'Disfruta de olas artificiales en una pileta gigante',
      waitTime: '15 min',
      image: 'https://images.unsplash.com/photo-1561214115-f2f134cc4912?w=800&auto=format&fit=crop&q=80',
    },
    {
      id: 2,
      name: 'Toboganes',
      icon: '�',
      capacity: 65,
      color: 'bg-yellow-400',
      hoverColor: 'hover:bg-yellow-500',
      top: '25%',
      left: '68%',
      description: 'Toboganes de alta velocidad y giros emocionantes',
      waitTime: '20 min',
      image: 'https://images.unsplash.com/photo-1587502537147-2ba64a117f59?w=800&auto=format&fit=crop&q=80',
    },
    {
      id: 3,
      name: 'Río Lento',
      icon: '�️',
      capacity: 72,
      color: 'bg-yellow-400',
      hoverColor: 'hover:bg-yellow-500',
      top: '65%',
      left: '20%',
      description: 'Relájate flotando en el río con corriente suave',
      waitTime: '5 min',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD1z5bFeB2JnC63g9ULMISyICtlvYLgurq12nG5DI7quPJ25U4_nzsl08RJlx_C9IytdbLZzrBgplBz5hHYs0qWhxxedWxu21AY8mbVx5DS1Z_LPWqUhIcZj1X7A782dAefx4CLVfA9q1OREQdVobzjsilFuPhHNg5APrOf5M51JX5OeXvBohnXwtjRFIlxbbu5_eaP4ftdGq_m_uMv8faAk0d_VEPhHADwggv-HEbXmLkLqX5PkTkgF7az8M25Rmfieb5q7gBWQkQ',
    },
    {
      id: 4,
      name: 'Piletas para Niños',
      icon: '👶',
      capacity: 45,
      color: 'bg-green-500',
      hoverColor: 'hover:bg-green-600',
      top: '70%',
      left: '50%',
      description: 'Área segura con poca profundidad para los más pequeños',
      waitTime: '0 min',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBkSpt10DFsryk6MFwQtUcmNl-WuNjj-CJWfNozLUxHaD6OEE5Er0i3HDrWe7OVZfYZgdkgWxvx7h9lTkCro3ZcqqLsx_SAmcI1Gi0oBeYGTjT4XFyCOqvfmeZHmolgVF03ATX7hUzAYRAQWIOr0_-vMr8Y1uSFOn8YG212RVx7TcSpH7QToG1koppZWJZ63btB9pBAyti2I-EM8Z71dNyArWzXbW1yQTBopoH_ih0GgmkKO2835MMFUpJzNZVe23LCQKWY2BzL54I',
    },
    {
      id: 5,
      name: 'Jacuzzis',
      icon: '♨️',
      capacity: 90,
      color: 'bg-red-500',
      hoverColor: 'hover:bg-red-600',
      top: '60%',
      left: '75%',
      description: 'Múltiples jacuzzis con agua caliente',
      waitTime: '25 min',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCaTNnw6qeKbc_3n-xT9tXacXFnoiEmu0kYUsrmd0nElCZ9zB5r51Pny6p2Te1iq_jeVy0EuVsJjB6JV1PUOF-jJqSGQezwJ3Z36Fkd21Q-3Td9jmr8sQ2BO_hKSWeI86mN9lB5zP7ZM9ORWylDXSq-_ZMXTU5Nn4IPPb4L3To81kgKhlK5a-7JN8KgLiHkixsi5g9X-td3f4c_PgNyTG8sb-ObxjJOy8e1BDy6RhkIYimjUcjgqi9eRErRQtYQeednU_vk2aX0sRY',
    },
    {
      id: 6,
      name: 'Piscinas de Hidromasajes',
      icon: '💆',
      capacity: 58,
      color: 'bg-yellow-400',
      hoverColor: 'hover:bg-yellow-500',
      top: '45%',
      left: '55%',
      description: 'Piscinas terapéuticas con chorros de agua',
      waitTime: '10 min',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC_7sF4ZQ7k_JLAkrrIUJUDo2Xi6ihrLcnHsooKxmF76erOhXZnpyspJzsJfF2W2ZH80QCeEbJNRiWIX-WQTMXJ6azhwmo7qofB8VyKC-8z-SP_XDrm1HHsYyfJi37lTaawJKCADE-ZQ_1Iwn4gDtekhqp2uzBrSw7voeA6AhZIdIeGDXFW6DycgxADnhL7cWBovM7AnRBm5Hho_25FPXkk6ysc1Ea_N6HuL_bmlfDHsXH3WUWSaREYi2bhgVxJM90oaHxqe0wUYbw',
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
          >
            {/* SVG for Paths - Google Maps style paths */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 1 }}>
              <defs>
                <filter id="path-glow">
                  <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
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
              </defs>
              {paths.map((path, index) => {
                const from = getLocationCoords(path.from)
                const to = getLocationCoords(path.to)
                const isActive = selectedLocation === path.from || selectedLocation === path.to
                return (
                  <g key={index}>
                    {/* Outer border - like Google Maps routes */}
                    <line
                      x1={`${from.x}%`}
                      y1={`${from.y}%`}
                      x2={`${to.x}%`}
                      y2={`${to.y}%`}
                      stroke="#1967D2"
                      strokeWidth={isActive ? "10" : "8"}
                      strokeLinecap="round"
                      strokeOpacity="0.4"
                    />
                    {/* Main path */}
                    <line
                      x1={`${from.x}%`}
                      y1={`${from.y}%`}
                      x2={`${to.x}%`}
                      y2={`${to.y}%`}
                      stroke="url(#pathGradient)"
                      strokeWidth={isActive ? "6" : "5"}
                      strokeLinecap="round"
                      style={{
                        filter: 'url(#path-glow)',
                        transition: 'all 0.3s ease',
                      }}
                    />
                    {/* Animated walking dot */}
                    {isActive && (
                      <circle
                        r="5"
                        fill="#FFFFFF"
                        stroke="#4285F4"
                        strokeWidth="2"
                      >
                        <animateMotion
                          dur="4s"
                          repeatCount="indefinite"
                          path={`M ${from.x} ${from.y} L ${to.x} ${to.y}`}
                        />
                      </circle>
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
                      onClick={() => setSelectedLocation(isSelected ? null : location.id)}
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
                        <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-8 h-2 bg-black/30 rounded-full blur-sm" />
                        
                        {/* Pin body - Different styles per location */}
                        <div className="relative">
                          {/* Montaña Rusa - Classic teardrop pin */}
                          {location.id === 1 && (
                            <svg width="48" height="60" viewBox="0 0 48 60" fill="none" className="drop-shadow-lg">
                              <path
                                d="M24 0C13.5 0 5 8.5 5 19C5 32 24 55 24 55C24 55 43 32 43 19C43 8.5 34.5 0 24 0Z"
                                fill="#EF4444"
                              />
                              <circle cx="24" cy="19" r="10" fill="white" />
                              <circle cx="24" cy="19" r="8" fill="#DC2626" />
                              <text x="24" y="25" fontSize="16" textAnchor="middle" fill="white">🎢</text>
                            </svg>
                          )}
                          
                          {/* Restaurante - Square with rounded corners */}
                          {location.id === 2 && (
                            <svg width="48" height="56" viewBox="0 0 48 56" fill="none" className="drop-shadow-lg">
                              <rect x="6" y="4" width="36" height="36" rx="8" fill="#FBBF24" />
                              <rect x="10" y="8" width="28" height="28" rx="6" fill="white" />
                              <rect x="12" y="10" width="24" height="24" rx="5" fill="#F59E0B" />
                              <path d="M24 40 L24 52" stroke="#F59E0B" strokeWidth="4" strokeLinecap="round" />
                              <circle cx="24" cy="52" r="2" fill="#F59E0B" />
                              <text x="24" y="28" fontSize="16" textAnchor="middle" fill="white">🍽️</text>
                            </svg>
                          )}
                          
                          {/* Castillo - Shield/badge shape */}
                          {location.id === 3 && (
                            <svg width="48" height="58" viewBox="0 0 48 58" fill="none" className="drop-shadow-lg">
                              <path
                                d="M24 4 L8 10 L8 25 C8 37 24 52 24 52 C24 52 40 37 40 25 L40 10 Z"
                                fill="#10B981"
                              />
                              <path
                                d="M24 8 L12 12 L12 24 C12 33 24 46 24 46 C24 46 36 33 36 24 L36 12 Z"
                                fill="white"
                              />
                              <path
                                d="M24 10 L14 13 L14 23 C14 30 24 42 24 42 C24 42 34 30 34 23 L34 13 Z"
                                fill="#059669"
                              />
                              <text x="24" y="27" fontSize="14" textAnchor="middle" fill="white">🏰</text>
                            </svg>
                          )}
                          
                          {/* Área Acuática - Water drop shape */}
                          {location.id === 4 && (
                            <svg width="48" height="62" viewBox="0 0 48 62" fill="none" className="drop-shadow-lg">
                              <path
                                d="M24 2 C24 2 8 20 8 32 C8 42 15 50 24 50 C33 50 40 42 40 32 C40 20 24 2 24 2 Z"
                                fill="#EF4444"
                              />
                              <path
                                d="M24 8 C24 8 12 22 12 31 C12 38 17 44 24 44 C31 44 36 38 36 31 C36 22 24 8 24 8 Z"
                                fill="white"
                              />
                              <path
                                d="M24 12 C24 12 15 24 15 30 C15 35 19 39 24 39 C29 39 33 35 33 30 C33 24 24 12 24 12 Z"
                                fill="#DC2626"
                              />
                              <path d="M24 50 L24 58" stroke="#DC2626" strokeWidth="3" strokeLinecap="round" />
                              <text x="24" y="32" fontSize="14" textAnchor="middle" fill="white">🌊</text>
                            </svg>
                          )}
                          
                          {/* Cafetería - Coffee cup shape */}
                          {location.id === 5 && (
                            <svg width="48" height="58" viewBox="0 0 48 58" fill="none" className="drop-shadow-lg">
                              <rect x="8" y="12" width="28" height="28" rx="4" fill="#D97706" />
                              <rect x="11" y="15" width="22" height="22" rx="3" fill="white" />
                              <rect x="13" y="17" width="18" height="18" rx="2" fill="#B45309" />
                              <path d="M36 20 L40 20 C42 20 43 22 43 24 C43 26 42 28 40 28 L36 28" stroke="#D97706" strokeWidth="3" />
                              <path d="M12 40 L32 40 L30 52 L14 52 Z" fill="#D97706" />
                              <path d="M10 52 L34 52" stroke="#D97706" strokeWidth="3" strokeLinecap="round" />
                              <text x="22" y="32" fontSize="13" textAnchor="middle" fill="white">☕</text>
                            </svg>
                          )}
                          
                          {/* Área Infantil - Star/fun shape */}
                          {location.id === 6 && (
                            <svg width="50" height="60" viewBox="0 0 50 60" fill="none" className="drop-shadow-lg">
                              <path
                                d="M25 2 L29 18 L45 18 L32 28 L37 44 L25 34 L13 44 L18 28 L5 18 L21 18 Z"
                                fill="#A855F7"
                              />
                              <path
                                d="M25 6 L28 18 L40 18 L30 25 L34 37 L25 30 L16 37 L20 25 L10 18 L22 18 Z"
                                fill="white"
                              />
                              <path
                                d="M25 9 L27 17 L35 17 L28 22 L31 30 L25 25 L19 30 L22 22 L15 17 L23 17 Z"
                                fill="#9333EA"
                              />
                              <path d="M25 44 L25 56" stroke="#9333EA" strokeWidth="4" strokeLinecap="round" />
                              <circle cx="25" cy="56" r="2" fill="#9333EA" />
                              <text x="25" y="27" fontSize="12" textAnchor="middle" fill="white">🎪</text>
                            </svg>
                          )}

                          {/* Pulse effect when selected */}
                          {isSelected && (
                            <div className="absolute top-4 left-1/2 -translate-x-1/2 w-12 h-12 rounded-full border-4 border-blue-500 animate-ping opacity-50" />
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
        <div className="absolute top-4 right-4 flex flex-col gap-3 z-30">
          <button
            onClick={handleZoomIn}
            className="w-14 h-14 bg-white/95 dark:bg-slate-800/95 backdrop-blur-md rounded-2xl shadow-2xl flex items-center justify-center hover:scale-110 transition-all hover:shadow-blue-500/20 hover:shadow-2xl active:scale-95 border border-gray-200 dark:border-gray-700"
          >
            <Plus size={26} className="text-gray-700 dark:text-gray-300" />
          </button>
          <button
            onClick={handleZoomOut}
            className="w-14 h-14 bg-white/95 dark:bg-slate-800/95 backdrop-blur-md rounded-2xl shadow-2xl flex items-center justify-center hover:scale-110 transition-all hover:shadow-blue-500/20 hover:shadow-2xl active:scale-95 border border-gray-200 dark:border-gray-700"
          >
            <Minus size={26} className="text-gray-700 dark:text-gray-300" />
          </button>
          <button className="w-14 h-14 bg-gradient-to-br from-blue-500 to-blue-600 backdrop-blur-md rounded-2xl shadow-2xl flex items-center justify-center hover:scale-110 transition-all hover:shadow-blue-500/40 hover:shadow-2xl active:scale-95">
            <Navigation size={26} className="text-white" />
          </button>
        </div>

        {/* Info Button */}
        <div className="absolute top-4 left-4 z-30">
          <button className="w-14 h-14 bg-white/95 dark:bg-slate-800/95 backdrop-blur-md rounded-2xl shadow-2xl flex items-center justify-center hover:scale-110 transition-all hover:shadow-blue-500/20 hover:shadow-2xl active:scale-95 border border-gray-200 dark:border-gray-700">
            <Info size={26} className="text-gray-700 dark:text-gray-300" />
          </button>
        </div>

        {/* Enhanced Attractions Panel - Collapsible & Modern */}
        <div className="absolute bottom-4 left-4 z-30 max-w-xs">
          <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-2xl overflow-hidden border border-gray-200 dark:border-gray-700">
            {/* Header */}
            <div className="bg-gradient-to-r from-blue-500 to-blue-600 px-4 py-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                  <h3 className="text-sm font-bold text-white">Estado en Vivo</h3>
                </div>
                <div className="text-xs text-blue-100 font-medium">
                  {locations.filter(l => l.capacity < 40).length} disponibles
                </div>
              </div>
            </div>

            {/* Attractions List - Compact */}
            <div className="p-3 max-h-64 overflow-y-auto">
              <div className="space-y-2">
                {locations.map((location) => (
                  <button
                    key={location.id}
                    onClick={() => setSelectedLocation(selectedLocation === location.id ? null : location.id)}
                    className={`w-full flex items-center gap-3 p-2.5 rounded-xl transition-all duration-300 ${
                      selectedLocation === location.id 
                        ? 'bg-blue-50 dark:bg-blue-900/30 ring-2 ring-blue-500 scale-[1.02]' 
                        : 'hover:bg-gray-50 dark:hover:bg-slate-700/50'
                    }`}
                  >
                    {/* Icon */}
                    <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-white to-gray-50 dark:from-slate-700 dark:to-slate-600 rounded-xl flex items-center justify-center shadow-sm">
                      <span className="text-xl">{location.icon}</span>
                    </div>

                    {/* Info */}
                    <div className="flex-1 min-w-0 text-left">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs font-semibold text-gray-900 dark:text-white truncate">
                          {location.name}
                        </span>
                        <span className="text-[10px] text-gray-500 dark:text-gray-400 ml-1 flex-shrink-0">
                          {location.waitTime}
                        </span>
                      </div>
                      
                      {/* Capacity Bar */}
                      <div className="flex items-center gap-2">
                        <div className="flex-1 h-1.5 bg-gray-200 dark:bg-slate-700 rounded-full overflow-hidden">
                          <div 
                            className={`h-full transition-all duration-500 ${
                              location.capacity >= 70 ? 'bg-red-500' :
                              location.capacity >= 40 ? 'bg-yellow-400' :
                              'bg-green-500'
                            }`}
                            style={{ width: `${location.capacity}%` }}
                          />
                        </div>
                        <span className={`text-[10px] font-bold flex-shrink-0 ${
                          location.capacity >= 70 ? 'text-red-600 dark:text-red-400' :
                          location.capacity >= 40 ? 'text-yellow-600 dark:text-yellow-400' :
                          'text-green-600 dark:text-green-400'
                        }`}>
                          {location.capacity}%
                        </span>
                      </div>
                    </div>

                    {/* Status indicator */}
                    <div className="flex-shrink-0">
                      <div className={`w-2 h-2 rounded-full ${
                        location.capacity >= 70 ? 'bg-red-500' :
                        location.capacity >= 40 ? 'bg-yellow-400' :
                        'bg-green-500'
                      }`} />
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Legend Footer */}
            <div className="px-4 py-2.5 bg-gray-50 dark:bg-slate-900/50 border-t border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between text-[10px]">
                <div className="flex items-center gap-1.5">
                  <div className="w-2 h-2 rounded-full bg-green-500" />
                  <span className="text-gray-600 dark:text-gray-400">Baja</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="w-2 h-2 rounded-full bg-yellow-400" />
                  <span className="text-gray-600 dark:text-gray-400">Media</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="w-2 h-2 rounded-full bg-red-500" />
                  <span className="text-gray-600 dark:text-gray-400">Alta</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
