import { useState, useRef } from 'react'
import { motion, AnimatePresence, useInView } from 'framer-motion'

const BUTTON_SEQUENCES = {
  more: [
    'should I add more here?',
    'like what though?',
    'hmm… maybe later 😄',
    'ok fine, tomorrow.',
    '…probably not.',
  ],
  vibe: [
    'check the vibe?',
    'vibe: immaculate.',
    'vibe: ✦ cozy chaos ✦',
    'vibe: suspiciously calm',
    'vibe: yeah, this.',
  ],
  surprise: [
    'something?',
    'are you sure?',
    'ok ok ok…',
    '…',
    '✦',
  ],
  thoughts: [
    'what are you thinking?',
    'something nice probably',
    '(I hope)',
    'yeah, same.',
    '🌿',
  ],
}

function InteractiveButton({ sequence, initialLabel }) {
  const [idx, setIdx] = useState(0)
  const [popping, setPopping] = useState(false)

  const labels = [initialLabel, ...sequence]

  const handleClick = () => {
    setPopping(true)
    setTimeout(() => setPopping(false), 200)
    setIdx((i) => (i + 1) % labels.length)
  }

  return (
    <motion.button
      className="interactive-btn"
      onClick={handleClick}
      whileTap={{ scale: 0.93 }}
      animate={popping ? { scale: [1, 1.08, 1] } : {}}
      transition={{ duration: 0.2 }}
    >
      <AnimatePresence mode="wait">
        <motion.span
          key={idx}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.18 }}
          className="block"
        >
          {labels[idx]}
        </motion.span>
      </AnimatePresence>
    </motion.button>
  )
}

// Draggable sticker
function Sticker({ emoji, initialPos }) {
  const [pos, setPos] = useState(initialPos)

  return (
    <motion.div
      drag
      dragMomentum={false}
      initial={pos}
      animate={pos}
      className="absolute cursor-grab active:cursor-grabbing text-3xl select-none"
      whileHover={{ scale: 1.2 }}
      whileDrag={{ scale: 1.1, zIndex: 10 }}
      onDragEnd={(_, info) => {
        setPos({ x: pos.x + info.offset.x, y: pos.y + info.offset.y })
      }}
    >
      {emoji}
    </motion.div>
  )
}

export default function Interactive() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '0px 0px -80px 0px' })
  const [glowActive, setGlowActive] = useState(false)

  return (
    <section id="interactive" className="py-20 px-4 md:px-8" ref={ref}>
      <div className="max-w-2xl mx-auto">

        {/* Header */}
        <motion.div
          className="mb-10"
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <p className="font-hand text-amber text-sm tracking-widest mb-2" style={{ letterSpacing: '0.2em' }}>
            — play
          </p>
          <h2 className="font-serif text-cream text-4xl md:text-5xl font-light" style={{ fontStyle: 'italic' }}>
            press things
          </h2>
          <p className="font-sans text-cream-dim text-sm mt-2">
            they do things.
          </p>
        </motion.div>

        {/* Buttons grid */}
        <motion.div
          className="flex flex-wrap gap-3 mb-12"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.2, duration: 0.7 }}
        >
          <InteractiveButton
            initialLabel="should I add more here?"
            sequence={BUTTON_SEQUENCES.more}
          />
          <InteractiveButton
            initialLabel="check the vibe?"
            sequence={BUTTON_SEQUENCES.vibe}
          />
          <InteractiveButton
            initialLabel="something?"
            sequence={BUTTON_SEQUENCES.surprise}
          />
          <InteractiveButton
            initialLabel="what are you thinking?"
            sequence={BUTTON_SEQUENCES.thoughts}
          />
        </motion.div>

        {/* Glow orb */}
        <motion.div
          className="relative flex flex-col items-center gap-4 py-8"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.4 }}
        >
          <p className="font-hand text-cream-dim text-sm">hold to glow</p>
          <motion.div
            className="w-20 h-20 rounded-full cursor-pointer"
            style={{
              background: 'radial-gradient(circle, rgba(201,136,79,0.15) 0%, transparent 70%)',
              border: '1px solid rgba(201,136,79,0.2)',
            }}
            animate={glowActive
              ? { scale: 1.6, boxShadow: '0 0 80px rgba(201,136,79,0.35), 0 0 160px rgba(201,136,79,0.12)' }
              : { scale: 1, boxShadow: '0 0 20px rgba(201,136,79,0.08)' }
            }
            transition={{ duration: 0.4, ease: 'easeOut' }}
            onMouseDown={() => setGlowActive(true)}
            onMouseUp={() => setGlowActive(false)}
            onTouchStart={() => setGlowActive(true)}
            onTouchEnd={() => setGlowActive(false)}
          >
            <div
              className="w-full h-full rounded-full flex items-center justify-center text-2xl"
              style={{ opacity: glowActive ? 1 : 0.5, transition: 'opacity 0.3s' }}
            >
              ✦
            </div>
          </motion.div>
        </motion.div>

        {/* Draggable stickers */}
        <motion.div
          className="relative h-32 w-full mt-4 rounded-2xl overflow-hidden"
          style={{ border: '1px dashed rgba(201,136,79,0.1)', background: 'rgba(255,255,255,0.01)' }}
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.5 }}
        >
          <p className="absolute top-3 left-0 right-0 text-center font-hand text-xs text-cream-dim opacity-50 select-none">
            drag these around
          </p>
          <Sticker emoji="🌿" initialPos={{ x: 20, y: 40 }} />
          <Sticker emoji="✦"  initialPos={{ x: 90, y: 50 }} />
          <Sticker emoji="🍵" initialPos={{ x: 160, y: 35 }} />
          <Sticker emoji="🎧" initialPos={{ x: 230, y: 55 }} />
          <Sticker emoji="🌙" initialPos={{ x: 300, y: 40 }} />
        </motion.div>
      </div>
    </section>
  )
}
