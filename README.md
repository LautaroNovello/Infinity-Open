# 🎢 Infinito Open - Parque Temático React App

Aplicación web moderna desarrollada con React, TypeScript y Tailwind CSS para la gestión y experiencia de visitantes del parque temático "Infinito Open".

## ✨ Características

- **🏠 Página de Inicio**: Galería interactiva de atracciones del parque
- **🗺️ Mapas Interactivos**: Navegación por las diferentes zonas del parque (reemplaza Horarios)
- **🎫 Gestión de Entradas**: Visualización de entradas con códigos QR
- **👥 Aforo en Tiempo Real**: Información actualizada del estado de las atracciones
- **🔔 Alertas**: Sistema de notificaciones sobre el parque
- **⚙️ Menú Más**: Acceso a funciones adicionales

## 🛠️ Tecnologías

- **React 19** - Biblioteca UI
- **TypeScript** - Tipado estático
- **Vite** - Build tool ultrarrápido
- **Tailwind CSS** - Framework de estilos
- **React Router** - Navegación SPA
- **Lucide React** - Iconos modernos

## 📦 Instalación

### Prerequisitos

- Node.js >= 18.x
- npm o pnpm

### Pasos de Instalación

1. **Navega a la carpeta del proyecto:**

```powershell
cd "C:\Users\Usuario\Downloads\Reingeniería\TPI\parque-app"
```

2. **Instala las dependencias:**

```powershell
npm install
```

O si prefieres usar pnpm:

```powershell
pnpm install
```

3. **Inicia el servidor de desarrollo:**

```powershell
npm run dev
```

4. **Abre tu navegador en:**

```
http://localhost:3000
```

## 🚀 Comandos Disponibles

```powershell
# Iniciar servidor de desarrollo
npm run dev

# Compilar para producción
npm run build

# Preview de la versión de producción
npm run preview
```

## 📱 Estructura del Proyecto

```
parque-app/
├── public/              # Archivos estáticos
├── src/
│   ├── components/      # Componentes reutilizables
│   │   ├── Header.tsx   # Cabecera de la aplicación
│   │   ├── Navigation.tsx # Barra de navegación inferior
│   │   └── Layout.tsx   # Layout principal
│   ├── pages/          # Páginas de la aplicación
│   │   ├── Home.tsx    # Página de inicio
│   │   ├── Maps.tsx    # Mapas del parque
│   │   ├── Tickets.tsx # Gestión de entradas
│   │   ├── Capacity.tsx # Aforo en tiempo real
│   │   ├── Alerts.tsx  # Alertas y notificaciones
│   │   └── More.tsx    # Menú adicional
│   ├── App.tsx         # Componente principal
│   ├── main.tsx        # Punto de entrada
│   └── index.css       # Estilos globales
├── index.html          # HTML base
├── package.json        # Dependencias
├── tailwind.config.js  # Configuración Tailwind
├── vite.config.js      # Configuración Vite
└── tsconfig.json       # Configuración TypeScript
```

## 🎨 Características Visuales

### Mejoras Implementadas

- ✅ **Animaciones suaves** con transiciones CSS
- ✅ **Gradientes modernos** en títulos y fondos
- ✅ **Modo oscuro** completo
- ✅ **Efectos hover** interactivos
- ✅ **Cards elevadas** con sombras dinámicas
- ✅ **Iconos Lucide** modernos y escalables
- ✅ **Diseño responsive** para móviles y desktop
- ✅ **Navegación fluida** con React Router

### Paleta de Colores

- **Primary**: `#1313ec` (Azul vibrante)
- **Background Light**: `#f6f6f8`
- **Background Dark**: `#111122`

## 🧭 Navegación

La aplicación cuenta con una barra de navegación inferior con 4 secciones:

1. **🏠 Inicio** - Vista general de atracciones
2. **🗺️ Mapas** - Navegación por el parque (NUEVO)
3. **🎫 Entradas** - Tus tickets y reservas
4. **⋯ Más** - Opciones adicionales (Aforo, Alertas, Configuración)

## 🆕 Diferencias con la versión HTML

### ✅ Mejoras Principales

1. **Mapas Interactivos** en lugar de Horarios
2. **Navegación SPA** sin recargas de página
3. **Componentes reutilizables** para mejor mantenimiento
4. **TypeScript** para seguridad de tipos
5. **Animaciones más fluidas** y profesionales
6. **Mejor organización** del código
7. **Build optimizado** para producción

## 🔧 Configuración Adicional

### Personalizar Puerto

Edita `vite.config.js`:

```javascript
export default defineConfig({
  server: {
    port: 3000, // Cambia el puerto aquí
  }
})
```

### Personalizar Colores

Edita `tailwind.config.js`:

```javascript
theme: {
  extend: {
    colors: {
      primary: {
        DEFAULT: '#1313ec', // Tu color principal
      },
    },
  },
}
```

## 📝 Próximas Funcionalidades

- [ ] Integración con API backend
- [ ] Autenticación de usuarios
- [ ] Compra de entradas en línea
- [ ] Mapa interactivo real con geolocalización
- [ ] Push notifications
- [ ] PWA (Progressive Web App)
- [ ] Realidad aumentada para tours virtuales

---

**Desarrollado con ❤️ usando React + TypeScript + Tailwind CSS**

import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
