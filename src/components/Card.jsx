import { useState } from 'react'
import { motion } from 'framer-motion'
import { useLocalState } from '../hooks/useLocalState'

/**
 * Card — individual gallery card
 * Props:
 *   item      — gallery data item
 *   onClick   — () => void (opens modal)
 *   index     — number (for stagger)
 */
export default function Card({ item, onClick, index }) {
  const storageKey = `revealed_${item.id}`
  const [revealed, setRevealed] = useLocalState(storageKey, false)
  const [imgLoaded, setImgLoaded] = useState(false)
  const [imgError, setImgError] = useState(false)

  const handleClick = () => {
    if (!revealed) {
      setRevealed(true)
      return
    }
    onClick(item)
  }

  const handleDoubleClick = () => {
    // Reset reveal
    setRevealed(false)
  }

  return (
    <motion.div
      className={`gallery-card ${revealed ? 'revealed' : ''}`}
      style={{ width: item._w, height: item._h, minWidth: item._w }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.04, duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
      onClick={handleClick}
      onDoubleClick={handleDoubleClick}
      title={revealed ? 'Click to expand' : 'Tap to reveal'}
    >
      {/* Placeholder when image hasn't loaded or errored */}
      {(!imgLoaded || imgError) && !imgError && (
        <div
          className="absolute inset-0 flex items-center justify-center"
          style={{ background: '#1a1814' }}
        >
          <div className="w-6 h-6 border-2 border-muted border-t-amber rounded-full animate-spin" />
        </div>
      )}

      {imgError && (
        <div
          className="absolute inset-0 flex items-center justify-center"
          style={{ background: '#1a1814' }}
        >
          <span className="text-cream-dim text-xs font-hand opacity-40">no photo yet</span>
        </div>
      )}

      {/* The photo */}
      {!imgError && (
        <img
          src={item.src}
          alt={item.caption || `memory ${item.id}`}
          loading="lazy"
          onLoad={() => setImgLoaded(true)}
          onError={() => setImgError(true)}
          style={{ opacity: imgLoaded ? 1 : 0, transition: 'opacity 0.4s ease' }}
        />
      )}

      {/* Blur overlay — shown until revealed */}
      {!revealed && !imgError && (
        <div className="reveal-overlay">
          <div className="text-center select-none">
            <div
              className="w-10 h-10 rounded-full flex items-center justify-center mx-auto mb-2"
              style={{ background: 'rgba(201,136,79,0.15)', border: '1px solid rgba(201,136,79,0.3)' }}
            >
              <span className="text-amber text-lg">✦</span>
            </div>
            <span className="text-cream-dim text-xs font-hand">tap to see</span>
          </div>
        </div>
      )}

      {/* Caption */}
      {item.caption && (
        <div className="card-caption">
          <p className="text-cream text-xs font-hand">{item.caption}</p>
        </div>
      )}

      {/* Recently viewed badge */}
      {revealed && (
        <div
          className="absolute top-2 right-2 w-2 h-2 rounded-full"
          style={{ background: 'rgba(201,136,79,0.6)' }}
        />
      )}
    </motion.div>
  )
}
