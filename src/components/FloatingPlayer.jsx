import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

/**
 * FloatingPlayer — sticky mini music indicator (decorative)
 * Clicking it smooth-scrolls to the music section.
 */
export default function FloatingPlayer() {
  const [visible, setVisible] = useState(true)

  const scrollToMusic = () => {
    document.getElementById('music')?.scrollIntoView({ behavior: 'smooth' })
  }

  if (!visible) return null

  return (
    <AnimatePresence>
      <motion.div
        className="fixed bottom-6 right-4 z-40 flex items-center gap-3 glass rounded-full px-4 py-2.5 cursor-pointer"
        style={{ border: '1px solid rgba(201,136,79,0.2)' }}
        initial={{ opacity: 0, y: 20, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 20 }}
        transition={{ delay: 2.5, type: 'spring', stiffness: 200, damping: 24 }}
        onClick={scrollToMusic}
        whileHover={{ scale: 1.04, boxShadow: '0 0 30px rgba(201,136,79,0.12)' }}
        whileTap={{ scale: 0.96 }}
      >
        {/* Animated bars */}
        <div className="flex items-end gap-[2px] h-3">
          {[1, 1.5, 0.7, 1.2, 0.9].map((h, i) => (
            <motion.div
              key={i}
              className="w-[2px] rounded-full"
              style={{ background: 'rgba(29,185,84,0.8)', height: `${h * 10}px` }}
              animate={{ scaleY: [1, h + 0.6, 1] }}
              transition={{ duration: 0.8 + i * 0.15, repeat: Infinity, delay: i * 0.1 }}
            />
          ))}
        </div>

        <span className="font-hand text-cream-dim text-xs">playlist ↑</span>

        {/* Close */}
        <button
          className="ml-1 text-cream-dim hover:text-cream text-xs leading-none"
          onClick={(e) => { e.stopPropagation(); setVisible(false) }}
        >
          ✕
        </button>
      </motion.div>
    </AnimatePresence>
  )
}
