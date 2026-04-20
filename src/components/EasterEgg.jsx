import { useState, useRef } from 'react'
import { motion, AnimatePresence, useInView } from 'framer-motion'
import { useLocalState } from '../hooks/useLocalState'

// Put your fun GIF in public/gifs/surprise.gif
const SURPRISE_MESSAGES = [
  "you actually found it 👀",
  "ok now you're just exploring everything",
  "i didn't think you'd click this many times",
  "dedicated explorer energy ✦",
  "hi. yes. this is the secret.",
]

export default function EasterEgg() {
  const [clickCount, setClickCount] = useLocalState('egg_clicks', 0)
  const [eggFound, setEggFound] = useLocalState('egg_found', false)
  const [showEgg, setShowEgg] = useState(false)
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '0px 0px -60px 0px' })

  const handleHiddenClick = () => {
    const next = clickCount + 1
    setClickCount(next)
    if (next >= 5) {
      setEggFound(true)
      setShowEgg(true)
    }
  }

  return (
    <section className="py-12 px-4 md:px-8 relative" ref={ref}>
      <div className="max-w-2xl mx-auto">

        {/* The section divider — clicking it enough times triggers the egg */}
        <div className="relative">
          <div className="section-divider" />

          {/* Invisible clickable zone centered on the divider */}
          <motion.button
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-8 rounded-full"
            style={{ background: 'transparent' }}
            onClick={handleHiddenClick}
            title=""
          >
            {/* Hint dot — only shows faintly after 2 clicks */}
            {clickCount >= 2 && clickCount < 5 && (
              <motion.div
                className="w-1.5 h-1.5 rounded-full mx-auto"
                style={{ background: 'rgba(201,136,79,0.3)' }}
                animate={{ opacity: [0.3, 0.8, 0.3] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              />
            )}
          </motion.button>
        </div>

        {/* Easter egg reveal */}
        <AnimatePresence>
          {showEgg && (
            <motion.div
              className="mt-10 rounded-2xl overflow-hidden text-center p-8 egg-reveal"
              style={{
                background: 'rgba(26,24,20,0.8)',
                border: '1px solid rgba(201,136,79,0.25)',
                backdropFilter: 'blur(16px)',
              }}
              initial={{ opacity: 0, scale: 0.7, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ type: 'spring', stiffness: 280, damping: 24 }}
            >
              {/* Surprise GIF */}
              <div className="mb-5">
                <img
                  src="/gifs/surprise.gif"
                  alt="surprise!"
                  className="max-h-48 mx-auto rounded-xl"
                  onError={(e) => {
                    e.target.style.display = 'none'
                    // Show fallback text
                    const fb = document.createElement('p')
                    fb.textContent = '🎉'
                    fb.style.fontSize = '4rem'
                    e.target.parentNode.appendChild(fb)
                  }}
                />
              </div>

              {/* Random message */}
              <p className="font-hand text-amber-light text-2xl mb-2">
                {SURPRISE_MESSAGES[Math.floor(Math.random() * SURPRISE_MESSAGES.length)]}
              </p>
              <p className="font-sans text-cream-dim text-sm mt-2">
                you clicked the divider {clickCount} times. respect.
              </p>

              <motion.button
                className="mt-6 font-hand text-sm text-cream-dim hover:text-amber transition-colors"
                onClick={() => setShowEgg(false)}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
              >
                ok ✕
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* If already found, show tiny indicator */}
        {eggFound && !showEgg && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center mt-6"
          >
            <button
              className="font-hand text-xs"
              style={{ color: 'rgba(201,136,79,0.25)' }}
              onClick={() => setShowEgg(true)}
            >
              ✦ (you found the secret)
            </button>
          </motion.div>
        )}
      </div>
    </section>
  )
}
