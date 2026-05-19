import { Outlet } from 'react-router-dom'
import BottomNav from './BottomNav'
import Header from './Header'

export default function AppLayout() {
  return (
    <div className="app-shell">
      <Header />
      <Outlet />
      <BottomNav />
    </div>
  )
}
