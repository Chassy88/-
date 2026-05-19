import { Route, Routes } from 'react-router-dom'
import AppLayout from './components/AppLayout'
import LibraryPage from './pages/LibraryPage'
import TeamPage from './pages/TeamPage'
import VideoDetailPage from './pages/VideoDetailPage'

export default function App() {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route path="/" element={<LibraryPage />} />
        <Route path="/team" element={<TeamPage />} />
      </Route>
      <Route path="/video/:id" element={<VideoDetailPage />} />
    </Routes>
  )
}
