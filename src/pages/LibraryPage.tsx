import { useMemo, useState } from 'react'
import FilterBar, { emptyFilters, matchesFilters, type VideoFilters } from '../components/FilterBar'
import VideoList from '../components/VideoList'
import { mockVideos } from '../data/mockVideos'

export default function LibraryPage() {
  const [filters, setFilters] = useState<VideoFilters>(emptyFilters)

  const filteredVideos = useMemo(
    () => mockVideos.filter((video) => matchesFilters(video, filters)),
    [filters],
  )

  const handleChange = (key: keyof VideoFilters, value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value }))
  }

  return (
    <main className="main-content">
      <header className="page-header">
        <h2 className="page-header__title">フィルムライブラリ</h2>
        <p className="page-header__desc">
          Hudlのように、クリップをすばやく探して分析できます（チア版）
        </p>
      </header>

      <FilterBar
        filters={filters}
        resultCount={filteredVideos.length}
        onChange={handleChange}
        onReset={() => setFilters(emptyFilters)}
      />

      {filteredVideos.length > 0 ? (
        <VideoList videos={filteredVideos} />
      ) : (
        <p className="empty-state">
          条件に合うクリップが見つかりませんでした。フィルターを変えてお試しください。
        </p>
      )}
    </main>
  )
}
