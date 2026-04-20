import { useState, useEffect } from 'react'

/**
 * useLocalState — like useState but persisted to localStorage
 * @param {string} key   - storage key
 * @param {*}      init  - initial / default value
 */
export function useLocalState(key, init) {
  const [value, setValue] = useState(() => {
    try {
      const stored = localStorage.getItem(key)
      return stored !== null ? JSON.parse(stored) : init
    } catch {
      return init
    }
  })

  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(value))
    } catch {
      // quota exceeded or private browsing — fail silently
    }
  }, [key, value])

  return [value, setValue]
}

export default useLocalState
