import { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

/**
 * Modal — full-screen image viewer
 * Props: item (galleryData item | null), onClose () => void
 */
export default function Modal({ item, onClose }) {
  // Close on Escape key
  useEffect(() => {
    if (!item) return
    const handler = (e) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [item, onClose])

  // Lock scroll when open
  useEffect(() => {
    if (item) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [item])

  return (
    <AnimatePresence>
      {item && (
        <motion.div
          key="modal-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ background: 'rgba(8, 7, 6, 0.92)', backdropFilter: 'blur(20px)' }}
          onClick={onClose}
        >
          {/* Image container */}
          <motion.div
            key="modal-content"
            initial={{ opacity: 0, scale: 0.88, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 20 }}
            transition={{ type: 'spring', stiffness: 300, damping: 28 }}
            className="relative max-w-2xl w-full max-h-[90vh] flex flex-col items-center"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute -top-12 right-0 text-cream-dim hover:text-cream transition-colors text-sm flex items-center gap-2 z-10"
            >
              <span className="font-hand text-lg">close</span>
              <span className="text-lg">✕</span>
            </button>

            {/* Image */}
            <div className="relative rounded-2xl overflow-hidden w-full" style={{ border: '1px solid rgba(201,136,79,0.2)' }}>
              <img
                src={item.src}
                alt={item.caption || 'memory'}
                className="w-full max-h-[75vh] object-contain"
                style={{ background: '#0c0b0a' }}
                onError={(e) => {
                  e.target.style.display = 'none'
                  e.target.parentNode.style.background = '#1a1814'
                  e.target.parentNode.style.minHeight = '300px'
                }}
              />
              {/* Subtle inner border glow */}
              <div
                className="absolute inset-0 rounded-2xl pointer-events-none"
                style={{ boxShadow: 'inset 0 0 60px rgba(0,0,0,0.3)' }}
              />
            </div>

            {/* Caption */}
            {item.caption && (
              <motion.p
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="mt-4 text-center font-hand text-amber-light text-xl"
              >
                {item.caption}
              </motion.p>
            )}

            {/* Ambient glow under image */}
            <div
              className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-3/4 h-16 pointer-events-none"
              style={{ background: 'radial-gradient(ellipse, rgba(201,136,79,0.12) 0%, transparent 70%)' }}
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
