import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Eye, EyeOff, Lock } from 'lucide-react'

export default function Login() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Aceptar cualquier usuario/contraseña
    if (email && password) {
      // Guardar sesión (simulado)
      localStorage.setItem('isAuthenticated', 'true')
      localStorage.setItem('userEmail', email)
      navigate('/')
    }
  }

  return (
    <div className="relative flex h-full min-h-screen w-full flex-col bg-gray-100 dark:bg-background-dark">
      <div className="flex flex-1 flex-col items-center justify-center p-6 sm:p-8">
        <div className="w-full max-w-sm animate-fade-in">
          {/* Logo y Título */}
          <div className="mb-8 text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-gray-900 to-gray-500 text-white mb-4 animate-scale-in">
                <img src="/logo1.png" alt="Infinity Open Logo" className="w-full h-full object-contain" />
              {/*<Waves size={40} /> */}
            </div>
            <h1 className="mt-4 text-3xl font-bold tracking-tighter text-gray-900 dark:text-white">
              Infinito Open
            </h1>
            <p className="text-gray-500 dark:text-gray-400 mt-2">Parque Acuático</p>
            <p className="text-gray-600 dark:text-gray-300 mt-4 text-lg font-medium">
              Bienvenido de nuevo
            </p>
          </div>

          {/* Formulario */}
          <form onSubmit={handleSubmit} className="flex flex-col gap-4 animate-slide-up">
            {/* Email */}
            <div className="flex flex-col">
              <label
                className="text-sm font-medium mb-1.5 text-gray-700 dark:text-gray-300"
                htmlFor="email"
              >
                Email o nombre de usuario
              </label>
              <input
                className="w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-background-dark px-4 py-3 text-base text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:border-blue-600 dark:focus:border-primary focus:outline-none focus:ring-2 focus:ring-blue-600/20 dark:focus:ring-primary/20 transition-all"
                id="email"
                placeholder="tu@email.com"
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            {/* Password */}
            <div className="flex flex-col">
              <label
                className="text-sm font-medium mb-1.5 text-gray-700 dark:text-gray-300"
                htmlFor="password"
              >
                Contraseña
              </label>
              <div className="relative">
                <input
                  className="w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-background-dark px-4 py-3 pr-10 text-base text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:border-blue-600 dark:focus:border-primary focus:outline-none focus:ring-2 focus:ring-blue-600/20 dark:focus:ring-primary/20 transition-all"
                  id="password"
                  placeholder="••••••••"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <button
                  className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 transition-colors"
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            {/* Forgot Password */}
            <div className="text-right">
              <button
                type="button"
                className="text-sm font-medium text-blue-600 dark:text-primary hover:underline"
                onClick={() => alert('Funcionalidad próximamente')}
              >
                ¿Olvidaste tu contraseña?
              </button>
            </div>

            {/* Submit Button */}
            <button
              className="w-full flex items-center justify-center rounded-xl h-12 bg-blue-600 dark:bg-primary text-white gap-2 text-base font-bold leading-normal tracking-[0.015em] mt-4 hover:bg-blue-700 dark:hover:bg-primary/90 transition-colors shadow-lg hover:shadow-xl"
              type="submit"
            >
              <Lock size={20} />
              Iniciar sesión
            </button>
          </form>

          {/* Register Link */}
          <div className="mt-6 text-center text-sm text-gray-500 dark:text-gray-400">
            <span>¿No tienes una cuenta?</span>
            <button
              onClick={() => alert('Funcionalidad de registro próximamente')}
              className="font-medium text-blue-600 dark:text-primary hover:underline ml-1"
            >
              Regístrate
            </button>
          </div>

          {/* Info */}
          <div className="mt-8 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
            <p className="text-xs text-center text-gray-600 dark:text-gray-400">
              💡 <strong>Demo:</strong> Ingresa cualquier email y contraseña para acceder
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
