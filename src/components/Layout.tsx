import { Outlet } from 'react-router-dom'
import Navigation from './Navigation'
import Header from './Header'

export default function Layout() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-100 dark:bg-[#111122]">
      <Header />
      <main className="flex-1 overflow-y-auto">
        <Outlet />
      </main>
      <Navigation />
    </div>
  )
}
