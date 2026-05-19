import { Route, Routes } from 'react-router-dom'
import AppLayout from './components/AppLayout'
import LibraryPage from './pages/LibraryPage'
import TeamPage from './pages/TeamPage'
import VideoDetailPage from './pages/VideoDetailPage'

// ★新しく追加するページの部品（仮の画面）
const VideoComparisonPage = () => (
  <div className="py-12 text-center text-slate-500 font-bold">
    ⚖️ 動画比較機能（スロー・同時再生）の画面を準備中...
  </div>
)

const HealthPage = () => (
  <div className="py-12 text-center text-slate-500 font-bold">
    📉 体重管理・ポジション別グラフの画面を準備中...
  </div>
)

export default function App() {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route path="/" element={<LibraryPage />} />
        <Route path="/comparison" element={<VideoComparisonPage />} />
        <Route path="/health" element={<HealthPage />} />
        <Route path="/team" element={<TeamPage />} />
      </Route>
      <Route path="/video/:id" element={<VideoDetailPage />} />
    </Routes>
  )
}
