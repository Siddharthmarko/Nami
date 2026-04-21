import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

/**
 * NameModal — shown once to ask the user for their name.
 * Saves to localStorage so it only appears once.
 *
 * Props:
 *   onConfirm (name: string) => void
 */
export default function NameModal({ onConfirm }) {
  const [value, setValue] = useState('')
  const [shake, setShake]  = useState(false)
  const inputRef           = useRef(null)

  useEffect(() => {
    // auto-focus after mount animation
    const t = setTimeout(() => inputRef.current?.focus(), 350)
    return () => clearTimeout(t)
  }, [])

  const handleSubmit = () => {
    const trimmed = value.trim()
    if (!trimmed) {
      setShake(true)
      setTimeout(() => setShake(false), 500)
      return
    }
    onConfirm(trimmed)
  }

  return (
    <motion.div
      className="absolute inset-0 z-30 flex items-center justify-center"
      style={{ background: 'rgba(11,20,26,0.92)', backdropFilter: 'blur(12px)' }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <motion.div
        className="w-full max-w-xs mx-4 rounded-3xl p-7 flex flex-col gap-5"
        style={{ background: '#1a2530', border: '1px solid rgba(255,255,255,0.07)' }}
        initial={{ scale: 0.88, y: 24 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.92, opacity: 0 }}
        transition={{ type: 'spring', stiffness: 260, damping: 24 }}
      >
        {/* Icon */}
        <div className="flex justify-center">
          <div
            className="w-14 h-14 rounded-full flex items-center justify-center text-2xl"
            style={{ background: 'rgba(201,136,79,0.12)', border: '1px solid rgba(201,136,79,0.25)' }}
          >
            ✦
          </div>
        </div>

        {/* Copy */}
        <div className="text-center">
          <h3
            className="font-serif text-2xl font-light mb-1"
            style={{ color: '#e9edef', fontStyle: 'italic' }}
          >
            who's here?
          </h3>
          <p className="font-hand text-sm" style={{ color: 'rgba(233,237,239,0.45)' }}>
            just so I know it's you
          </p>
        </div>

        {/* Input */}
        <motion.input
          ref={inputRef}
          type="text"
          placeholder="your name…"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
          maxLength={30}
          animate={shake ? { x: [-6, 6, -4, 4, 0] } : {}}
          transition={{ duration: 0.4 }}
          className="w-full rounded-2xl px-4 py-3 outline-none font-sans text-sm"
          style={{
            background: '#0d1f2b',
            border: '1px solid rgba(255,255,255,0.09)',
            color: '#e9edef',
            caretColor: '#c9884f',
          }}
        />

        {/* Button */}
        <motion.button
          onClick={handleSubmit}
          className="w-full rounded-2xl py-3 font-hand text-lg"
          style={{
            background: value.trim() ? '#005c4b' : 'rgba(255,255,255,0.05)',
            color: value.trim() ? '#e9edef' : 'rgba(233,237,239,0.3)',
            border: 'none',
            cursor: value.trim() ? 'pointer' : 'default',
            transition: 'background 0.25s ease, color 0.25s ease',
          }}
          whileTap={value.trim() ? { scale: 0.96 } : {}}
        >
          enter ✦
        </motion.button>
      </motion.div>
    </motion.div>
  )
}
