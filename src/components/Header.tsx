import { useLocalStorage } from '../hooks/useLocalStorage'
import { STORAGE_KEYS } from '../utils/storageKeys'
import PhotoUpload from './PhotoUpload'
import './Header.css'

export default function Header() {
  const [teamName] = useLocalStorage(STORAGE_KEYS.teamName)

  return (
    <header className="app-header">
      <div className="app-header__inner">
        <div className="app-header__brand">
          <div className="app-header__logo-wrap">
            <img
              className="app-header__logo"
              src="/cheer-lab-logo.png"
              alt="CHEER LAB"
            />
          </div>
          <div className="app-header__titles">
            <h1 className="app-header__title">CHEER LAB</h1>
            {teamName ? (
              <p className="app-header__team">{teamName}</p>
            ) : (
              <p className="app-header__subtitle">チア版フィルムライブラリ</p>
            )}
          </div>
        </div>

        <PhotoUpload
          storageKey={STORAGE_KEYS.userPhoto}
          label="マイ写真"
          shape="circle"
        />
      </div>
    </header>
  )
}
