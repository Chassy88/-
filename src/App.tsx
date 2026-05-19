import { Route, Routes } from 'react-router-dom'
import React, { useState } from 'react'
import AppLayout from './components/AppLayout'
import LibraryPage from './pages/LibraryPage'
import TeamPage from './pages/TeamPage'
import VideoDetailPage from './pages/VideoDetailPage'

// 型の定義（TypeScriptエラーを防ぐための魔法の呪文）
interface WeightLog {
  date: string;
  value: number;
}

interface Member {
  id: string;
  name: string;
  position: 'top' | 'middle' | 'base' | 'spot';
  weights: WeightLog[];
}

// ==========================================
// ★体重管理ページ（HealthPage）の中身をここに合体！
// ==========================================
const INITIAL_MEMBERS: Member[] = [
  { id: '1', name: 'ハナ', position: 'top', weights: [{ date: '05/10', value: 45 }, { date: '05/15', value: 44.8 }, { date: '05/20', value: 44.5 }] },
  { id: '2', name: 'サクラ', position: 'top', weights: [{ date: '05/10', value: 46 }, { date: '05/15', value: 46.2 }, { date: '05/20', value: 45.9 }] },
  { id: '3', name: 'ココロ', position: 'middle', weights: [{ date: '05/10', value: 48 }, { date: '05/15', value: 47.8 }, { date: '05/20', value: 47.5 }] },
  { id: '4', name: 'アオイ', position: 'base', weights: [{ date: '05/10', value: 52 }, { date: '05/15', value: 52.5 }, { date: '05/20', value: 52.1 }] },
  { id: '5', name: 'リン', position: 'spot', weights: [{ date: '05/10', value: 50 }, { date: '05/15', value: 50.3 }, { date: '05/20', value: 49.8 }] },
]

function HealthPage() {
  const [members, setMembers] = useState<Member[]>(INITIAL_MEMBERS)
  const [selectedPosition, setSelectedPosition] = useState<string>('all')
  const [selectedMemberId, setSelectedMemberId] = useState<string>('1')
  const [inputWeight, setInputWeight] = useState<string>('')
  const [inputDate, setInputDate] = useState<string>(new Date().toISOString().split('T')[0])

  const filteredMembers = selectedPosition === 'all' ? members : members.filter(m => m.position === selectedPosition)
  const currentMember = members.find(m => m.id === selectedMemberId) || members[0]

  const handleAddWeight = (e: React.FormEvent) => {
    e.preventDefault()
    if (!inputWeight) return
    const [_, month, day] = inputDate.split('-')
    const formattedDate = `${month}/${day}`
    setMembers(prev => prev.map(member => {
      if (member.id === selectedMemberId) {
        return { ...member, weights: [...member.weights, { date: formattedDate, value: parseFloat(inputWeight) }] }
      }
      return member
    }))
    setInputWeight('')
  }

  const getPosName = (pos: string) => {
    if (pos === 'top') return 'トップ'
    if (pos === 'middle') return 'ミドル'
    if (pos === 'base') return 'ベース'
    return 'スポット'
  }

  return (
    <div className="space-y-8">
      <div className="border-b border-slate-100 pb-4">
        <h2 className="text-2xl font-black text-[#1e3a8a] flex items-center space-x-2">
          <span>⚖️</span> <span>HEALTH MANAGEMENT TRACKER</span>
        </h2>
        <p className="text-xs text-slate-500 mt-1">チアで最も重要な体重管理を個人・ポジション別にグラフ化</p>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="space-y-6 bg-slate-50 p-5 rounded-2xl border border-slate-200/60">
          <div>
            <label className="block text-xs font-bold text-[#1e3a8a] tracking-wider mb-2">① 記録する部員を選択</label>
            <select value={selectedMemberId} onChange={(e) => setSelectedMemberId(e.target.value)} className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-sm font-medium focus:outline-none">
              {members.map(m => (<option key={m.id} value={m.id}>{m.name} ({getPosName(m.position)})</option>))}
            </select>
          </div>
          <form onSubmit={handleAddWeight} className="space-y-4">
            <label className="block text-xs font-bold text-[#1e3a8a] tracking-wider -mb-2">② 体重をデータ入力</label>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <span className="text-[10px] font-bold text-slate-400 block mb-1">日付</span>
                <input type="date" value={inputDate} onChange={(e) => setInputDate(e.target.value)} className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-xs font-medium focus:outline-none" />
              </div>
              <div>
                <span className="text-[10px] font-bold text-slate-400 block mb-1">体重 (kg)</span>
                <input type="number" step="0.1" placeholder="45.0" value={inputWeight} onChange={(e) => setInputWeight(e.target.value)} className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-sm font-bold text-center text-[#1e3a8a] focus:outline-none" />
              </div>
            </div>
            <button type="submit" className="w-full bg-gradient-to-r from-cyan-500 to-sky-500 text-white font-black py-2.5 rounded-xl text-sm shadow-md">体重をログに記録する 🚀</button>
          </form>
        </div>
        <div className="lg:col-span-2 space-y-6">
          <div className="flex bg-slate-100 p-1 rounded-xl space-x-1">
            {['all', 'top', 'middle', 'base', 'spot'].map((pos) => (
              <button key={pos} onClick={() => setSelectedPosition(pos)} className={`flex-1 text-center py-2 text-xs font-black rounded-lg transition-all ${selectedPosition === pos ? 'bg-[#1e3a8a] text-white shadow-sm' : 'text-slate-600 hover:bg-slate-200'}`}>{pos === 'all' ? '全員表示' : getPosName(pos)}</button>
            ))}
          </div>
          <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm space-y-4">
            <h3 className="text-sm font-black text-[#1e3a8a]">📈 WEIGHT TREND: {currentMember.name} 選手の推移</h3>
            <div className="h-44 flex items-end justify-between px-4 pt-6 pb-2 border-b border-l border-slate-200 relative bg-slate-50/50 rounded-xl">
              {currentMember.weights.map((w, index) => {
                const min = 40; const max = 55;
                const heightPercent = Math.min(Math.max(((w.value - min) / (max - min)) * 100, 10), 90);
                return (
                  <div key={index} className="flex flex-col items-center flex-1 relative" style={{ height: '100%' }}>
                    <div className="absolute bottom-0 flex flex-col items-center" style={{ bottom: `${heightPercent}%` }}>
                      <span className="text-[10px] font-black text-cyan-600 bg-white border border-cyan-200 px-1.5 py-0.5 rounded shadow-sm mb-1">{w.value}kg</span>
                      <div className="w-3 h-3 bg-gradient-to-tr from-[#1e3a8a] to-cyan-400 rounded-full border-2 border-white shadow"></div>
                    </div>
                    <span className="absolute -bottom-6 text-[10px] font-bold text-slate-400">{w.date}</span>
                  </div>
                );
              })}
            </div>
            <div className="pt-6">
              <h4 className="text-xs font-bold text-slate-400 mb-3">{selectedPosition === 'all' ? 'チーム全員' : getPosName(selectedPosition)}の最新ログ</h4>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {filteredMembers.map(m => {
                  const lastLog = m.weights[m.weights.length - 1];
                  return (
                    <div key={m.id} onClick={() => setSelectedMemberId(m.id)} className={`p-3 rounded-xl border text-left cursor-pointer ${selectedMemberId === m.id ? 'border-cyan-400 bg-cyan-50/40' : 'border-slate-100'}`}>
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-black text-slate-800">{m.name}</span>
                        <span className="text-[9px] px-1.5 py-0.5 rounded-full font-bold text-white bg-cyan-500">{getPosName(m.position)[0]}</span>
                      </div>
                      <div className="mt-1.5 flex items-baseline space-x-1">
                        <span className="text-base font-black text-[#1e3a8a]">{lastLog.value}</span>
                        <span className="text-[10px] text-slate-400">kg</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// ★動画比較はまだ仮の画面のままにしておきます
const VideoComparisonPage = () => (
  <div className="py-12 text-center text-slate-500 font-bold">
    ⚖️ 動画比較機能（スロー・同時再生）の画面を準備中...
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
