import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import type { VideoItem } from '../data/mockVideos'
import { STORAGE_KEYS } from '../utils/storageKeys'
import './VideoCard.css'

type VideoCardProps = {
  video: VideoItem
}

function formatDate(date: string) {
  const [y, m, d] = date.split('-')
  return `${y}/${m}/${d}`
}

export default function VideoCard({ video }: VideoCardProps) {
  const fileInputRef = useRef<HTMLInputElement>(null)
  const storageKey = STORAGE_KEYS.videoPhoto(video.id)
  const [customPhoto, setCustomPhoto] = useState<string | null>(null)

  useEffect(() => {
    const saved = localStorage.getItem(storageKey)
    if (saved) setCustomPhoto(saved)
  }, [storageKey])

  const thumbnail = customPhoto ?? video.thumbnail

  const handlePhotoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.stopPropagation()
    const file = event.target.files?.[0]
    if (!file) return

    if (!file.type.startsWith('image/')) {
      alert('画像ファイル（JPG・PNG など）を選んでください。')
      return
    }

    const reader = new FileReader()
    reader.onload = () => {
      const result = reader.result
      if (typeof result !== 'string') return
      setCustomPhoto(result)
      localStorage.setItem(storageKey, result)
    }
    reader.readAsDataURL(file)
    event.target.value = ''
  }

  const handleRemovePhoto = (event: React.MouseEvent) => {
    event.preventDefault()
    event.stopPropagation()
    setCustomPhoto(null)
    localStorage.removeItem(storageKey)
  }

  const openFilePicker = (event: React.MouseEvent) => {
    event.preventDefault()
    event.stopPropagation()
    fileInputRef.current?.click()
  }

  return (
    <article className="video-card">
      <Link to={`/video/${video.id}`} className="video-card__link">
        <div className="video-card__thumb-wrap">
          <img
            className="video-card__thumb"
            src={thumbnail}
            alt={`${video.title} のサムネイル`}
            loading="lazy"
          />
          <span className="video-card__play" aria-hidden="true">
            ▶
          </span>
          <span className="video-card__duration">{video.duration}</span>
        </div>

        <div className="video-card__body">
          <h3 className="video-card__title">{video.title}</h3>
          <p className="video-card__meta">
            {formatDate(video.date)} · {video.team} · {video.competition}
          </p>
          <div className="video-card__tags">
            <span className="video-card__tag">{video.event}</span>
            <span className="video-card__tag video-card__tag--music">♪ {video.music}</span>
          </div>
        </div>
      </Link>

      <button
        type="button"
        className="video-card__photo-btn"
        onClick={openFilePicker}
        aria-label={`${video.title}の写真を変更`}
      >
        写真
      </button>

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        className="video-card__file-input"
        onChange={handlePhotoChange}
      />

      {customPhoto && (
        <button type="button" className="video-card__photo-reset" onClick={handleRemovePhoto}>
          元に戻す
        </button>
      )}
    </article>
  )
}
