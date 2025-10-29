import { Routes, Route, Navigate } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import Tickets from './pages/Tickets'
import Maps from './pages/Maps'
import Capacity from './pages/Capacity'
import Alerts from './pages/Alerts'
import More from './pages/More'
import Schedules from './pages/Schedules'
import Reservations from './pages/Reservations'
import Login from './pages/Login'

// Componente para redirigir /new-ticket a /tickets con estado
function NewTicketRedirect() {
  return <Navigate to="/tickets" state={{ tab: 'new-ticket' }} replace />
}

// Componente para redirigir /new-reservation a /reservations con estado
function NewReservationRedirect() {
  return <Navigate to="/reservations" state={{ tab: 'new-reservation' }} replace />
}

// Componente para redirigir /my-reservations a /reservations con estado
function MyReservationsRedirect() {
  return <Navigate to="/reservations" state={{ tab: 'my-reservations' }} replace />
}

// Componente para proteger rutas
function PrivateRoute({ children }: { children: React.ReactNode }) {
  const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true'
  return isAuthenticated ? <>{children}</> : <Navigate to="/login" replace />
}

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route
        path="/"
        element={
          <PrivateRoute>
            <Layout />
          </PrivateRoute>
        }
      >
        <Route index element={<Home />} />
        <Route path="tickets" element={<Tickets />} />
        <Route path="new-ticket" element={<NewTicketRedirect />} />
        <Route path="reservations" element={<Reservations />} />
        <Route path="new-reservation" element={<NewReservationRedirect />} />
        <Route path="my-reservations" element={<MyReservationsRedirect />} />
        <Route path="maps" element={<Maps />} />
        <Route path="capacity" element={<Capacity />} />
        <Route path="alerts" element={<Alerts />} />
        <Route path="schedules" element={<Schedules />} />
        <Route path="more" element={<More />} />
      </Route>
    </Routes>
  )
}

export default App

