import { Link, useParams } from 'react-router-dom'
import Header from '../components/Header'
import { useStoredPhoto } from '../components/PhotoUpload'
import BottomNav from '../components/BottomNav'
import { mockVideos } from '../data/mockVideos'
import { STORAGE_KEYS } from '../utils/storageKeys'
import './VideoDetailPage.css'

function formatDate(date: string) {
  const [y, m, d] = date.split('-')
  return `${y}年${Number(m)}月${Number(d)}日`
}

export default function VideoDetailPage() {
  const { id } = useParams<{ id: string }>()
  const video = mockVideos.find((item) => item.id === id)
  const customPhoto = useStoredPhoto(id ? STORAGE_KEYS.videoPhoto(id) : '')
  const thumbnail = customPhoto ?? video?.thumbnail

  return (
    <div className="app-shell app-shell--detail">
      <Header />

      <main className="main-content main-content--detail">
        <Link to="/" className="detail-back">
          ← ライブラリに戻る
        </Link>

        {!video ? (
          <p className="empty-state">このクリップは見つかりませんでした。</p>
        ) : (
          <article className="detail-card">
            <div className="detail-card__player">
              <img src={thumbnail} alt={`${video.title} のサムネイル`} />
              <div className="detail-card__player-overlay">
                <span className="detail-card__play-btn" aria-hidden="true">
                  ▶
                </span>
                <span className="detail-card__duration">{video.duration}</span>
              </div>
            </div>

            <div className="detail-card__body">
              <h2 className="detail-card__title">{video.title}</h2>

              <dl className="detail-meta">
                <div className="detail-meta__row">
                  <dt>日付</dt>
                  <dd>{formatDate(video.date)}</dd>
                </div>
                <div className="detail-meta__row">
                  <dt>チーム</dt>
                  <dd>{video.team}</dd>
                </div>
                <div className="detail-meta__row">
                  <dt>大会</dt>
                  <dd>{video.competition}</dd>
                </div>
                <div className="detail-meta__row">
                  <dt>イベント</dt>
                  <dd>{video.event}</dd>
                </div>
                <div className="detail-meta__row">
                  <dt>楽曲</dt>
                  <dd>{video.music}</dd>
                </div>
              </dl>

              <section className="detail-notes">
                <h3 className="detail-notes__title">メモ</h3>
                <p className="detail-memo">{video.memo}</p>
              </section>

              <p className="detail-placeholder">
                ※ 今後、Hudlのように再生バー・描画・タグ分析を追加予定です。
              </p>
            </div>
          </article>
        )}
      </main>

      <BottomNav />
    </div>
  )
}
