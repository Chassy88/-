import { useEffect, useState } from 'react'

export function useLocalStorage(key: string, initialValue = '') {
  const [value, setValue] = useState(initialValue)

  useEffect(() => {
    const saved = localStorage.getItem(key)
    if (saved !== null) setValue(saved)
  }, [key])

  const save = (next: string) => {
    setValue(next)
    if (next) {
      localStorage.setItem(key, next)
    } else {
      localStorage.removeItem(key)
    }
  }

  return [value, save] as const
}
