import { COMPETITION_OPTIONS, TEAM_OPTIONS, type TeamName } from '../data/mockVideos'
import DatePicker from './DatePicker'
import './FilterBar.css'

export type VideoFilters = {
  query: string
  date: string
  team: string
  competition: string
  event: string
  music: string
}

type FilterBarProps = {
  filters: VideoFilters
  resultCount: number
  onChange: (key: keyof VideoFilters, value: string) => void
  onReset: () => void
}

export const emptyFilters: VideoFilters = {
  query: '',
  date: '',
  team: '',
  competition: '',
  event: '',
  music: '',
}

export default function FilterBar({
  filters,
  resultCount,
  onChange,
  onReset,
}: FilterBarProps) {
  const activeCount = Object.values(filters).filter(Boolean).length

  const toggleChip = (key: 'team' | 'competition', value: string) => {
    onChange(key, filters[key] === value ? '' : value)
  }

  return (
    <section className="filter-bar" aria-label="動画の絞り込み">
      <div className="filter-bar__top">
        <div>
          <h2 className="filter-bar__title">フィルター</h2>
          <p className="filter-bar__meta">
            {resultCount} 件のクリップ
            {activeCount > 0 && ` · ${activeCount} 件の条件`}
          </p>
        </div>
        {activeCount > 0 && (
          <button type="button" className="filter-bar__reset" onClick={onReset}>
            すべてクリア
          </button>
        )}
      </div>

      <div className="filter-bar__search">
        <span className="filter-bar__search-icon" aria-hidden="true">
          🔍
        </span>
        <input
          type="search"
          className="filter-bar__search-input"
          placeholder="キーワードで検索（イベント・楽曲・タイトル）"
          value={filters.query}
          onChange={(e) => onChange('query', e.target.value)}
        />
      </div>

      <div className="filter-bar__chips">
        <span className="filter-bar__chips-label">チーム</span>
        <div className="filter-bar__chips-row">
          {TEAM_OPTIONS.map((team) => (
            <button
              key={team}
              type="button"
              className={`filter-chip ${filters.team === team ? 'filter-chip--active' : ''}`}
              onClick={() => toggleChip('team', team)}
            >
              {team}
            </button>
          ))}
        </div>
      </div>

      <div className="filter-bar__chips">
        <span className="filter-bar__chips-label">大会</span>
        <div className="filter-bar__chips-row">
          {COMPETITION_OPTIONS.map((name) => (
            <button
              key={name}
              type="button"
              className={`filter-chip ${filters.competition === name ? 'filter-chip--active' : ''}`}
              onClick={() => toggleChip('competition', name)}
            >
              {name}
            </button>
          ))}
        </div>
      </div>

      <div className="filter-bar__grid">
        <DatePicker
          id="filter-date"
          label="日付"
          value={filters.date}
          onChange={(value) => onChange('date', value)}
        />

        <div className="filter-field">
          <label htmlFor="filter-event">イベント名</label>
          <input
            id="filter-event"
            type="text"
            placeholder="例：ルーティン"
            value={filters.event}
            onChange={(e) => onChange('event', e.target.value)}
          />
        </div>

        <div className="filter-field">
          <label htmlFor="filter-music">使用楽曲名</label>
          <input
            id="filter-music"
            type="text"
            placeholder="例：Golden Pulse"
            value={filters.music}
            onChange={(e) => onChange('music', e.target.value)}
          />
        </div>
      </div>
    </section>
  )
}

export function matchesFilters(
  video: {
    title: string
    date: string
    team: TeamName
    competition: string
    event: string
    music: string
  },
  filters: VideoFilters,
) {
  if (filters.date && video.date !== filters.date) return false
  if (filters.team && video.team !== filters.team) return false
  if (filters.competition && video.competition !== filters.competition) return false

  if (filters.query) {
    const q = filters.query.toLowerCase()
    const haystack = `${video.title} ${video.event} ${video.music} ${video.competition} ${video.team}`.toLowerCase()
    if (!haystack.includes(q)) return false
  }

  if (filters.event && !video.event.toLowerCase().includes(filters.event.toLowerCase())) {
    return false
  }
  if (filters.music && !video.music.toLowerCase().includes(filters.music.toLowerCase())) {
    return false
  }
  return true
}
