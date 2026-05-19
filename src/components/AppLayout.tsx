import React, { useState } from 'react'
import { Outlet, useNavigate, useLocation } from 'react-router-dom'

export default function AppLayout() {
  const navigate = useNavigate()
  const location = useLocation()

  // 4つのポジション定義
  const positions = [
    { id: 'top', name: 'トップ', color: 'bg-cyan-500' },
    { id: 'middle', name: 'ミドル', color: 'bg-sky-500' },
    { id: 'base', name: 'ベース', color: 'bg-indigo-600' },
    { id: 'spot', name: 'スポット', color: 'bg-blue-700' }
  ]

  // ナビゲーションメニューの定義
  const menuItems = [
    { path: '/', label: 'ライブラリ', icon: '📱' },
    { path: '/comparison', label: '動画比較', icon: '⚖️' },
    { path: '/health', label: '体重管理', icon: '⚖️📉' },
    { path: '/team', label: 'チーム', icon: '👥' },
  ]

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans">
      {/* ヘッダー部分（ロゴとナビゲーション） */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-20 items-center">
            
            {/* 左側：ロゴエリア（ネイビーと星のチア仕様） */}
            <div className="flex items-center space-x-3 cursor-pointer" onClick={() => navigate('/')}>
              <div className="w-12 h-12 bg-[#1e3a8a] rounded-full flex items-center justify-center text-white font-bold text-xl shadow-md border-2 border-cyan-400">
                CL
              </div>
              <div>
                <span className="text-xl font-black text-[#1e3a8a] tracking-wider block">CHEER LAB</span>
                <span className="text-xs text-cyan-500 font-bold block -mt-1">★ チアラボ ★</span>
              </div>
            </div>

            {/* 右側：爽やかなナビゲーションメニュー */}
            <nav className="flex space-x-2">
              {menuItems.map((item) => {
                const isActive = location.pathname === item.path
                return (
                  <button
                    key={item.path}
                    onClick={() => navigate(item.path)}
                    className={`flex items-center space-x-2 px-4 py-2.5 rounded-full text-sm font-bold transition-all duration-200 ${
                      isActive
                        ? 'bg-[#1e3a8a] text-white shadow-md shadow-blue-100'
                        : 'text-slate-600 hover:bg-slate-100 hover:text-[#1e3a8a]'
                    }`}
                  >
                    <span>{item.icon}</span>
                    <span>{item.label}</span>
                  </button>
                )
              })}
            </nav>

          </div>
        </div>
      </header>

      {/* サブヘッダー：ポジションクイックフィルター */}
      <div className="bg-gradient-to-r from-[#1e3a8a] to-sky-800 text-white py-2 shadow-inner">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center space-x-4 overflow-x-auto whitespace-nowrap">
          <span className="text-xs font-bold text-cyan-300 tracking-wider">POSITION VIEW:</span>
          <button className="bg-white/20 hover:bg-white/30 text-white text-xs font-bold px-3 py-1 rounded-full transition">
            全員表示
          </button>
          {positions.map((pos) => (
            <button
              key={pos.id}
              className="bg-white text-[#1e3a8a] hover:bg-cyan-100 text-xs font-black px-3 py-1 rounded-full shadow-sm transition flex items-center space-x-1"
            >
              <span className={`w-2 h-2 rounded-full ${pos.color}`}></span>
              <span>{pos.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* メインコンテンツ表示エリア */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 min-h-[60vh]">
          {/* ここに各ページのコンテンツ（LibraryPageやHealthPageなど）が自動ではめ込まれます */}
          <Outlet />
        </div>
      </main>

      {/* フッター */}
      <footer className="bg-slate-900 text-slate-400 text-center py-6 text-xs font-medium border-t border-slate-800">
        &copy; {new Date().getFullYear()} CHEER LAB. All Rights Reserved. ★ 一致団結 ★
      </footer>
    </div>
  )
}
