import { TEAM_OPTIONS } from '../data/mockVideos'
import { useLocalStorage } from '../hooks/useLocalStorage'
import { STORAGE_KEYS } from '../utils/storageKeys'
import PhotoUpload from './PhotoUpload'
import './TeamProfilePanel.css'

export default function TeamProfilePanel() {
  const [teamName, setTeamName] = useLocalStorage(STORAGE_KEYS.teamName)

  return (
    <section className="team-profile" aria-label="チーム情報">
      <div className="team-profile__header">
        <h2 className="team-profile__title">チーム設定</h2>
        <p className="team-profile__desc">
          アカウントはチーム単位で管理する予定です。所属チーム名とチーム写真を登録できます。
        </p>
      </div>

      <div className="team-profile__grid">
        <div className="team-profile__name-block">
          <label className="team-profile__label" htmlFor="my-team-name">
            所属チーム名
          </label>
          <input
            id="my-team-name"
            className="team-profile__input"
            type="text"
            list="team-name-suggestions"
            placeholder="例：Aチーム、○○チアリーダーズ"
            value={teamName}
            onChange={(e) => setTeamName(e.target.value)}
          />
          <datalist id="team-name-suggestions">
            {TEAM_OPTIONS.map((team) => (
              <option key={team} value={team} />
            ))}
          </datalist>
          {teamName && (
            <p className="team-profile__current">
              現在のチーム：<strong>{teamName}</strong>
            </p>
          )}
        </div>

        <div className="team-profile__photo-block">
          <PhotoUpload
            storageKey={STORAGE_KEYS.listBannerPhoto}
            label="チーム写真（動画一覧用）"
            hint="タップしてチームの写真を入れる"
            alt="チームの写真"
            shape="banner"
          />
        </div>
      </div>
    </section>
  )
}
