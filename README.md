# 🌊 Infinity Open - Experiencia Digital para Parques Acuáticos

> **Proyecto Académico | Reingeniería de Procesos de Negocio**  
> Este desarrollo es el resultado de un trabajo grupal enfocado en la optimización del *Customer Journey* en centros de ocio. Se presenta como una **acción de mejora estratégica** para el parque acuático **Infinity Open** (Córdoba, Argentina), modernizando la interacción entre el parque y sus visitantes a través de una interfaz digital intuitiva y centrada en el usuario.

## 🎯 El Problema y la Solución
Como parte de la materia, identificamos cuellos de botella en la gestión de flujos de personas y el acceso a la información crítica en tiempo real. Esta aplicación actúa como el punto de contacto clave para resolver:
*   **Reducción de fricción**: Sustitución de horarios y guías estáticas por mapas e información dinámica.
*   **Gestión de expectativas**: Visualización de aforo y tiempos de espera en tiempo real para optimizar el recorrido del visitante.
*   **Digitalización de procesos**: Entradas con validación QR y sistema de alertas preventivas.

## ✨ Características Principales
*   **🏠 Dashboard de Inicio**: Resumen visual de condiciones climáticas, estado de apertura y accesos rápidos.
*   **👥 Monitoreo de Aforo**: Gráficos dinámicos que muestran el nivel de ocupación de cada atracción (Alta/Media/Baja).
*   **🗺️ Navegación Geográfica**: Mapa interactivo para facilitar el desplazamiento dentro del predio.
*   **🎫 Gestión de Tickets**: Visualización centralizada de entradas adquiridas con códigos QR.
*   **🌗 Interfaz Adaptativa**: Soporte nativo para Modo Claro y Oscuro con persistencia de preferencias.
*   **📱 Mobile First**: Diseño optimizado para navegadores móviles, garantizando usabilidad en movimiento.

## 🛠️ Stack Tecnológico
*   **React 19**: Biblioteca UI de vanguardia para una gestión de estado eficiente.
*   **TypeScript**: Tipado estático para asegurar la robustez y mantenibilidad del código.
*   **Vite**: Build tool de última generación para una experiencia de desarrollo ultrarrápida.
*   **Tailwind CSS**: Framework de estilos centrado en utilidades para una UI moderna y responsiva.
*   **React Router**: Gestión de navegación ágil para una experiencia Single Page Application (SPA).
*   **Lucide React**: Set de iconografía consistente y escalable.

## 📦 Instalación y Uso

1. **Clonar el repositorio:**
   ```bash
   git clone https://github.com/tu-usuario/infinity-open.git
   cd infinity-open
   ```

2. **Instalar dependencias:**
   ```bash
   npm install
   ```

3. **Iniciar servidor de desarrollo:**
   ```bash
   npm run dev
   ```

4. **Compilar para producción:**
   ```bash
   npm run build
   ```

## 📱 Estructura del Proyecto
La arquitectura del front-end sigue un patrón modular y escalable:
```text
src/
├── components/      # Componentes UI reutilizables (Header, Nav, Layout)
├── pages/          # Vistas principales de negocio (Home, Maps, Capacity, etc.)
├── hooks/           # Lógica extraída y hooks personalizados (useTheme)
├── App.tsx         # Orquestador de rutas y configuración global
└── index.css       # Definiciones de base y tokens de diseño
```

---

**Desarrollado con ❤️ para la materia de Reingeniería de Procesos de Negocio**
