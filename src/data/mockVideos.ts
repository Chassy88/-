export type TeamName = 'Aチーム' | 'Bチーム' | 'Cチーム'

export type VideoItem = {
  id: string
  title: string
  date: string
  team: TeamName
  competition: string
  event: string
  music: string
  thumbnail: string
  duration: string
  memo: string
}

export const TEAM_OPTIONS: TeamName[] = ['Aチーム', 'Bチーム', 'Cチーム']

export const COMPETITION_OPTIONS = [
  'JAPAN CUP',
  'WINTER CUP',
  'SUMMER OPEN',
  'REGIONAL FINAL',
]

export const mockVideos: VideoItem[] = [
  {
    id: 'v001',
    title: 'JAPAN CUP 2025 オープニング',
    date: '2025-11-23',
    team: 'Aチーム',
    competition: 'JAPAN CUP',
    event: 'オープニング',
    music: 'Power Anthem',
    thumbnail: 'https://picsum.photos/seed/cheer1/640/360',
    duration: '3:42',
    memo: '入場シーンのタイミング確認用。',
  },
  {
    id: 'v002',
    title: 'Aチーム ルーティン本番',
    date: '2025-11-23',
    team: 'Aチーム',
    competition: 'JAPAN CUP',
    event: 'ルーティン',
    music: 'Golden Pulse',
    thumbnail: 'https://picsum.photos/seed/cheer2/640/360',
    duration: '2:18',
    memo: 'ピラミッド前後の音ハメをチェック。',
  },
  {
    id: 'v003',
    title: 'Bチーム ルーティン本番',
    date: '2025-11-23',
    team: 'Bチーム',
    competition: 'JAPAN CUP',
    event: 'ルーティン',
    music: 'Neon Drive',
    thumbnail: 'https://picsum.photos/seed/cheer3/640/360',
    duration: '2:25',
    memo: 'トス着地の角度比較用。',
  },
  {
    id: 'v004',
    title: 'WINTER CUP エンディング',
    date: '2026-01-18',
    team: 'Bチーム',
    competition: 'WINTER CUP',
    event: 'エンディング',
    music: 'Snow Sparkle',
    thumbnail: 'https://picsum.photos/seed/cheer4/640/360',
    duration: '1:55',
    memo: 'フォーメーション変化の練習メモあり。',
  },
  {
    id: 'v005',
    title: 'Cチーム デモンストレーション',
    date: '2026-02-08',
    team: 'Cチーム',
    competition: 'SUMMER OPEN',
    event: 'デモ',
    music: 'Rise Together',
    thumbnail: 'https://picsum.photos/seed/cheer5/640/360',
    duration: '2:05',
    memo: '新曲初披露。振付変更前の版。',
  },
  {
    id: 'v006',
    title: 'REGIONAL FINAL ハーフタイム',
    date: '2026-03-02',
    team: 'Aチーム',
    competition: 'REGIONAL FINAL',
    event: 'ハーフタイム',
    music: 'Stadium Beat',
    thumbnail: 'https://picsum.photos/seed/cheer6/640/360',
    duration: '4:10',
    memo: '観客席方向のカメラアングル。',
  },
]
