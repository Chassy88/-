import { useEffect, useRef, useState } from 'react'
import './DatePicker.css'

type DatePickerProps = {
  id?: string
  label: string
  value: string
  onChange: (value: string) => void
}

const WEEKDAYS = ['日', '月', '火', '水', '木', '金', '土']

function pad(n: number) {
  return String(n).padStart(2, '0')
}

function toIso(year: number, month: number, day: number) {
  return `${year}-${pad(month)}-${pad(day)}`
}

function parseIso(value: string) {
  const [y, m, d] = value.split('-').map(Number)
  return { year: y, month: m, day: d }
}

function formatDisplay(value: string) {
  if (!value) return '日付を選択'
  const { year, month, day } = parseIso(value)
  return `${year}年${month}月${day}日`
}

function getDaysInMonth(year: number, month: number) {
  return new Date(year, month, 0).getDate()
}

function getFirstWeekday(year: number, month: number) {
  return new Date(year, month - 1, 1).getDay()
}

export default function DatePicker({ id, label, value, onChange }: DatePickerProps) {
  const rootRef = useRef<HTMLDivElement>(null)
  const today = new Date()
  const initial = value ? parseIso(value) : { year: today.getFullYear(), month: today.getMonth() + 1, day: today.getDate() }

  const [open, setOpen] = useState(false)
  const [viewYear, setViewYear] = useState(initial.year)
  const [viewMonth, setViewMonth] = useState(initial.month)

  useEffect(() => {
    if (!value) return
    const parsed = parseIso(value)
    setViewYear(parsed.year)
    setViewMonth(parsed.month)
  }, [value])

  useEffect(() => {
    if (!open) return

    const handleClickOutside = (event: MouseEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) {
        setOpen(false)
      }
    }

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false)
    }

    document.addEventListener('mousedown', handleClickOutside)
    document.addEventListener('keydown', handleEscape)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      document.removeEventListener('keydown', handleEscape)
    }
  }, [open])

  const daysInMonth = getDaysInMonth(viewYear, viewMonth)
  const firstWeekday = getFirstWeekday(viewYear, viewMonth)
  const blanks = Array.from({ length: firstWeekday }, (_, i) => i)
  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1)

  const goPrevMonth = () => {
    if (viewMonth === 1) {
      setViewYear((y) => y - 1)
      setViewMonth(12)
    } else {
      setViewMonth((m) => m - 1)
    }
  }

  const goNextMonth = () => {
    if (viewMonth === 12) {
      setViewYear((y) => y + 1)
      setViewMonth(1)
    } else {
      setViewMonth((m) => m + 1)
    }
  }

  const selectDay = (day: number) => {
    onChange(toIso(viewYear, viewMonth, day))
    setOpen(false)
  }

  const todayIso = toIso(today.getFullYear(), today.getMonth() + 1, today.getDate())

  return (
    <div className="date-picker" ref={rootRef}>
      <label className="date-picker__label" htmlFor={id}>
        {label}
      </label>
      <button
        id={id}
        type="button"
        className={`date-picker__trigger ${value ? 'date-picker__trigger--active' : ''}`}
        onClick={() => setOpen((prev) => !prev)}
        aria-expanded={open}
        aria-haspopup="dialog"
      >
        <span className="date-picker__icon" aria-hidden="true">
          📅
        </span>
        <span className="date-picker__text">{formatDisplay(value)}</span>
        <span className="date-picker__caret" aria-hidden="true">
          ▼
        </span>
      </button>

      {open && (
        <div
          className="date-picker__popover"
          role="dialog"
          aria-label="日付カレンダー"
        >
          <div className="date-picker__nav">
            <button type="button" className="date-picker__nav-btn" onClick={goPrevMonth} aria-label="前の月">
              ‹
            </button>
            <p className="date-picker__month">
              {viewYear}年 {viewMonth}月
            </p>
            <button type="button" className="date-picker__nav-btn" onClick={goNextMonth} aria-label="次の月">
              ›
            </button>
          </div>

          <div className="date-picker__weekdays">
            {WEEKDAYS.map((day) => (
              <span key={day} className="date-picker__weekday">
                {day}
              </span>
            ))}
          </div>

          <div className="date-picker__grid">
            {blanks.map((key) => (
              <span key={`blank-${key}`} className="date-picker__day date-picker__day--blank" />
            ))}
            {days.map((day) => {
              const iso = toIso(viewYear, viewMonth, day)
              const isSelected = value === iso
              const isToday = todayIso === iso
              return (
                <button
                  key={day}
                  type="button"
                  className={[
                    'date-picker__day',
                    isSelected ? 'date-picker__day--selected' : '',
                    isToday ? 'date-picker__day--today' : '',
                  ]
                    .filter(Boolean)
                    .join(' ')}
                  onClick={() => selectDay(day)}
                >
                  {day}
                </button>
              )
            })}
          </div>

          <div className="date-picker__footer">
            <button
              type="button"
              className="date-picker__footer-btn"
              onClick={() => {
                onChange(todayIso)
                setOpen(false)
              }}
            >
              今日
            </button>
            {value && (
              <button
                type="button"
                className="date-picker__footer-btn date-picker__footer-btn--muted"
                onClick={() => {
                  onChange('')
                  setOpen(false)
                }}
              >
                クリア
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
