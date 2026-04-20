import { useState, useEffect, useRef, useCallback } from 'react'
import { motion, AnimatePresence, useMotionValue, useTransform } from 'framer-motion'

// Rotating headline lines — edit these to your liking
const LINES = [
  'something small, made with care.',
  'a little space that\'s yours.',
  'wander around. take your time.',
  'there\'s more if you keep looking.',
  'made just for you. hi.',
]

// Particle config
const PARTICLES = Array.from({ length: 28 }, (_, i) => ({
  id: i,
  size: Math.random() * 3 + 1,
  left: `${Math.random() * 100}%`,
  duration: `${Math.random() * 10 + 10}s`,
  delay: `${Math.random() * 12}s`,
  opacity: Math.random() * 0.4 + 0.1,
  drift: `${(Math.random() - 0.5) * 60}px`,
}))

export default function Hero({ onEnter }) {
  const [lineIdx, setLineIdx] = useState(0)
  const [showLine, setShowLine] = useState(true)
  const [entered, setEntered] = useState(false)
  const [ripples, setRipples] = useState([])
  const [showHint, setShowHint] = useState(false)
  const [showSecret, setShowSecret] = useState(false)
  const circleRef = useRef(null)

  // Parallax on mouse move
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const bgX = useTransform(mouseX, [-window.innerWidth / 2, window.innerWidth / 2], [-12, 12])
  const bgY = useTransform(mouseY, [-window.innerHeight / 2, window.innerHeight / 2], [-8, 8])

  // Rotate headline every 3.5 s
  useEffect(() => {
    const tick = setInterval(() => {
      setShowLine(false)
      setTimeout(() => {
        setLineIdx((i) => (i + 1) % LINES.length)
        setShowLine(true)
      }, 400)
    }, 3500)
    return () => clearInterval(tick)
  }, [])

  // Delayed scroll hint
  useEffect(() => {
    const t = setTimeout(() => setShowHint(true), 5000)
    return () => clearTimeout(t)
  }, [])

  // Secret text on 5-second hover
  const hoverTimer = useRef(null)
  const startSecretHover = () => {
    hoverTimer.current = setTimeout(() => setShowSecret(true), 3000)
  }
  const cancelSecretHover = () => {
    clearTimeout(hoverTimer.current)
  }

  const handleMouseMove = useCallback((e) => {
    const cx = window.innerWidth / 2
    const cy = window.innerHeight / 2
    mouseX.set(e.clientX - cx)
    mouseY.set(e.clientY - cy)
  }, [mouseX, mouseY])

  const spawnRipple = (e) => {
    const rect = circleRef.current?.getBoundingClientRect()
    if (!rect) return
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const id = Date.now()
    setRipples((r) => [...r, { id, x, y }])
    setTimeout(() => setRipples((r) => r.filter((rp) => rp.id !== id)), 900)
  }

  const handleEnter = (e) => {
    spawnRipple(e)
    setTimeout(() => {
      setEntered(true)
      setTimeout(onEnter, 600)
    }, 250)
  }

  return (
    <motion.section
      className="relative w-full min-h-screen flex flex-col items-center justify-center overflow-hidden"
      style={{ background: '#0c0b0a' }}
      onMouseMove={handleMouseMove}
      initial={{ opacity: 1 }}
      animate={{ opacity: entered ? 0 : 1 }}
      transition={{ duration: 0.6 }}
    >
      {/* ── Background blurred image (parallax) ── */}
      <motion.div
        className="absolute inset-[-8%] pointer-events-none"
        style={{ x: bgX, y: bgY }}
      >
        {/* Gradient mesh */}
        <div
          className="absolute inset-0"
          style={{
            background: `
              radial-gradient(ellipse 70% 60% at 30% 40%, rgba(201,136,79,0.06) 0%, transparent 65%),
              radial-gradient(ellipse 50% 50% at 70% 65%, rgba(122,140,126,0.05) 0%, transparent 65%),
              radial-gradient(ellipse 80% 80% at 50% 50%, rgba(12,11,10,0.98) 0%, transparent 100%)
            `,
          }}
        />
      </motion.div>

      {/* ── Floating particles ── */}
      {PARTICLES.map((p) => (
        <div
          key={p.id}
          className="particle"
          style={{
            width: p.size,
            height: p.size,
            left: p.left,
            '--duration': p.duration,
            '--delay': p.delay,
            '--opacity': p.opacity,
            '--drift': p.drift,
          }}
        />
      ))}

      {/* ── Ambient rings ── */}
      {[280, 380, 480].map((r, i) => (
        <motion.div
          key={r}
          className="absolute rounded-full pointer-events-none"
          style={{
            width: r,
            height: r,
            border: `1px solid rgba(201,136,79,${0.06 - i * 0.015})`,
            top: '50%',
            left: '50%',
            translateX: '-50%',
            translateY: '-50%',
          }}
          animate={{ scale: [1, 1.04, 1], opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 5 + i * 2, repeat: Infinity, delay: i * 1.2 }}
        />
      ))}

      {/* ── Central interactive object ── */}
      <div className="relative z-10 flex flex-col items-center gap-8 px-6">

        {/* Small label above */}
        <motion.p
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="font-hand text-cream-dim text-base tracking-widest"
          style={{ letterSpacing: '0.25em' }}
        >
          ✦ &nbsp; for you &nbsp; ✦
        </motion.p>

        {/* Glass circle / memory box */}
        <motion.div
          ref={circleRef}
          className="ripple-container relative flex items-center justify-center cursor-pointer select-none"
          style={{
            width: 200,
            height: 200,
            borderRadius: '50%',
            background: 'rgba(255,255,255,0.03)',
            border: '1px solid rgba(201,136,79,0.25)',
            boxShadow: '0 0 60px rgba(201,136,79,0.1), inset 0 0 30px rgba(201,136,79,0.04)',
          }}
          initial={{ opacity: 0, scale: 0.7 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, type: 'spring', stiffness: 180, damping: 20 }}
          whileHover={{ scale: 1.05, boxShadow: '0 0 80px rgba(201,136,79,0.2), inset 0 0 40px rgba(201,136,79,0.07)' }}
          whileTap={{ scale: 0.96 }}
          onClick={handleEnter}
          onMouseEnter={startSecretHover}
          onMouseLeave={cancelSecretHover}
        >
          {/* Inner glow circle */}
          <motion.div
            className="absolute rounded-full"
            style={{ width: 100, height: 100, background: 'radial-gradient(circle, rgba(201,136,79,0.12) 0%, transparent 70%)' }}
            animate={{ scale: [1, 1.25, 1] }}
            transition={{ duration: 3.5, repeat: Infinity }}
          />

          {/* Center symbol */}
          <motion.div
            className="relative z-10 text-center"
            animate={{ y: [0, -6, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          >
            <div className="text-4xl mb-1" style={{ filter: 'drop-shadow(0 0 12px rgba(201,136,79,0.5))' }}>✦</div>
            <p className="font-hand text-cream-dim text-sm">enter</p>
          </motion.div>

          {/* Ripples */}
          {ripples.map((rp) => (
            <span
              key={rp.id}
              className="ripple"
              style={{ width: 200, height: 200, left: rp.x - 100, top: rp.y - 100 }}
            />
          ))}
        </motion.div>

        {/* Rotating headline */}
        <div className="h-8 flex items-center justify-center overflow-hidden">
          <AnimatePresence mode="wait">
            {showLine && (
              <motion.p
                key={lineIdx}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.38, ease: 'easeInOut' }}
                className="font-hand text-cream-dim text-center text-lg"
              >
                {LINES[lineIdx]}
              </motion.p>
            )}
          </AnimatePresence>
        </div>

        {/* Secret text — visible only after 3 s hover on circle */}
        <AnimatePresence>
          {showSecret && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-xs font-hand absolute bottom-[-2rem] text-center"
              style={{ color: 'rgba(201,136,79,0.4)' }}
            >
              you found a secret. hi :)
            </motion.p>
          )}
        </AnimatePresence>
      </div>

      {/* ── Scroll hint ── */}
      <AnimatePresence>
        {showHint && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 scroll-hint"
          >
            <span className="font-hand text-cream-dim text-xs tracking-wider">scroll ↓</span>
            <div className="w-px h-10" style={{ background: 'linear-gradient(to bottom, rgba(201,136,79,0.4), transparent)' }} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Big serif heading (top-left, decorative) ── */}
      <motion.div
        className="absolute top-8 left-6 md:left-10"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 0.15, x: 0 }}
        transition={{ delay: 1.2, duration: 1 }}
      >
        <p className="font-serif text-cream text-6xl md:text-8xl font-light leading-none select-none"
          style={{ fontStyle: 'italic' }}>
          for<br/>you
        </p>
      </motion.div>
    </motion.section>
  )
}
