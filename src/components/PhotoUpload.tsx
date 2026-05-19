import { useEffect, useRef, useState } from 'react'
import './PhotoUpload.css'

type PhotoUploadProps = {
  storageKey: string
  label: string
  hint?: string
  alt?: string
  shape?: 'circle' | 'banner' | 'card'
  showRemove?: boolean
}

export default function PhotoUpload({
  storageKey,
  label,
  hint = 'タップして写真を入れる',
  alt = '選択した写真',
  shape = 'circle',
  showRemove = true,
}: PhotoUploadProps) {
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [photo, setPhoto] = useState<string | null>(null)

  useEffect(() => {
    const saved = localStorage.getItem(storageKey)
    if (saved) setPhoto(saved)
  }, [storageKey])

  const handlePhotoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
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
      setPhoto(result)
      localStorage.setItem(storageKey, result)
    }
    reader.readAsDataURL(file)
    event.target.value = ''
  }

  const handleRemovePhoto = () => {
    setPhoto(null)
    localStorage.removeItem(storageKey)
  }

  return (
    <div className={`photo-upload photo-upload--${shape}`}>
      <p className="photo-upload__label">{label}</p>
      <button
        type="button"
        className="photo-upload__btn"
        onClick={() => fileInputRef.current?.click()}
        aria-label={`${label}を選ぶ`}
      >
        {photo ? (
          <img className="photo-upload__img" src={photo} alt={alt} />
        ) : (
          <span className="photo-upload__placeholder">
            <span className="photo-upload__icon">＋</span>
            <span className="photo-upload__hint">{hint}</span>
          </span>
        )}
      </button>

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        className="photo-upload__file-input"
        onChange={handlePhotoChange}
      />

      {showRemove && photo && (
        <button type="button" className="photo-upload__remove" onClick={handleRemovePhoto}>
          写真を削除
        </button>
      )}
    </div>
  )
}

export function useStoredPhoto(storageKey: string) {
  const [photo, setPhoto] = useState<string | null>(null)

  useEffect(() => {
    const saved = localStorage.getItem(storageKey)
    if (saved) setPhoto(saved)
  }, [storageKey])

  return photo
}
