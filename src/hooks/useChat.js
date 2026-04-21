import { useState, useEffect, useCallback, useRef } from 'react'

/**
 * ─────────────────────────────────────────────────────────────
 *  ⚠️  REPLACE THIS with your actual Apps Script web-app URL
 *      (Deploy → New deployment → Web app → Anyone can access)
 * ─────────────────────────────────────────────────────────────
 */
const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbyhK3NAZ1TtU1QN38zyepWsCYpnjHpSoc1cXj2lZ3ogunumyEZonpo3-y-bPM7f3VeT/exec'

/**
 * parseMessages — convert raw Google Doc text into message objects
 *
 * Format in the doc:
 *   name|HH:MM AM|message text
 *   (one per line, blank lines ignored)
 */
export function parseMessages(raw = '') {
  return raw
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line, idx) => {
      const parts = line.split('|')
      if (parts.length < 3) return null
      const [name, time, ...rest] = parts
      return {
        id: idx,
        name: name.trim().toLowerCase(),
        time: time.trim(),
        text: rest.join('|').trim(),   // re-join in case message had a pipe
      }
    })
    .filter(Boolean)
}

/**
 * getCurrentTime — returns "HH:MM AM/PM" in 12-hr format
 */
export function getCurrentTime() {
  const d = new Date()
  const h = d.getHours()
  const m = d.getMinutes().toString().padStart(2, '0')
  const ampm = h >= 12 ? 'PM' : 'AM'
  const h12 = (h % 12) || 12
  return `${h12}:${m} ${ampm}`
}

/**
 * useChat — manages messages, polling, sending
 */
export function useChat() {
  const [messages, setMessages]   = useState([])
  const [loading, setLoading]     = useState(true)
  const [error, setError]         = useState(null)
  const [sending, setSending]     = useState(false)
  const pollRef                   = useRef(null)
  const cbRef                     = useRef(0)       // JSONP callback counter

  // ── Fetch via JSONP ─────────────────────────────────────────
  const fetchMessages = useCallback(() => {
    if (!SCRIPT_URL || SCRIPT_URL.startsWith('YOUR_')) {
      // Dev mode — return demo data so UI is visible
      setMessages(parseMessages(
        'goutam|10:00 PM|hey, made this for you\nher|10:01 PM|wait… you made this??\ngoutam|10:02 PM|yeah :)\nher|10:03 PM|this is actually really nice\ngoutam|10:04 PM|glad you think so ✦'
      ))
      setLoading(false)
      return
    }

    const cbName = `_chatCb_${Date.now()}_${cbRef.current++}`
    const script = document.createElement('script')
    script.src = `${SCRIPT_URL}?callback=${cbName}`

    // Success
    window[cbName] = (data) => {
      try {
        const text = typeof data === 'string' ? data : data?.content ?? ''
        setMessages(parseMessages(text))
        setError(null)
      } catch (e) {
        console.error('Chat parse error:', e)
      } finally {
        setLoading(false)
        cleanup()
      }
    }

    // Timeout / error fallback
    const timeout = setTimeout(() => {
      setError('could not load messages')
      setLoading(false)
      cleanup()
    }, 8000)

    function cleanup() {
      clearTimeout(timeout)
      delete window[cbName]
      script.remove()
    }

    script.onerror = () => {
      setError('connection error')
      setLoading(false)
      cleanup()
    }

    document.head.appendChild(script)
  }, [])

  // ── Send message via no-cors POST ──────────────────────────
  const sendMessage = useCallback(async (name, text) => {
    if (!text.trim() || !name.trim()) return false

    const time = getCurrentTime()
    const line = `${name}|${time}|${text}`

    // Optimistic update
    setMessages((prev) => [
      ...prev,
      { id: Date.now(), name: name.toLowerCase(), time, text },
    ])

    if (!SCRIPT_URL || SCRIPT_URL.startsWith('YOUR_')) {
      return true  // dev mode — just show optimistic
    }

    setSending(true)
    try {
      await fetch(SCRIPT_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({ message: line }).toString(),
      })
      // no-cors means we can't read the response — assume success
      return true
    } catch (e) {
      console.error('Send error:', e)
      return false
    } finally {
      setSending(false)
    }
  }, [])

  // ── Polling — every 2.5 s ───────────────────────────────────
  useEffect(() => {
    fetchMessages()
    pollRef.current = setInterval(fetchMessages, 2500)
    return () => clearInterval(pollRef.current)
  }, [fetchMessages])

  return { messages, loading, error, sending, sendMessage, refetch: fetchMessages }
}
