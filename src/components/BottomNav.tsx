import { NavLink } from 'react-router-dom'
import './BottomNav.css'

const tabs = [
  { to: '/', label: 'ライブラリ', icon: '🎬' },
  { to: '/team', label: 'チーム', icon: '👥' },
] as const

export default function BottomNav() {
  return (
    <nav className="bottom-nav" aria-label="メインメニュー">
      {tabs.map((tab) => (
        <NavLink
          key={tab.to}
          to={tab.to}
          end={tab.to === '/'}
          className={({ isActive }) =>
            `bottom-nav__item ${isActive ? 'bottom-nav__item--active' : ''}`
          }
        >
          <span className="bottom-nav__icon" aria-hidden="true">
            {tab.icon}
          </span>
          <span className="bottom-nav__label">{tab.label}</span>
        </NavLink>
      ))}
    </nav>
  )
}
