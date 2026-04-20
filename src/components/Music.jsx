import { useState, useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const SPOTIFY_URL =
  'https://open.spotify.com/embed/playlist/1nAFuLv3VOaQ85D7BlVJj5?utm_source=generator&theme=0'

export default function Music() {
  const [loaded, setLoaded] = useState(false)
  const [expanded, setExpanded] = useState(false)
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '0px 0px -80px 0px' })

  return (
    <section id="music" className="py-20 px-4 md:px-8" ref={ref}>
      <div className="max-w-2xl mx-auto">

        {/* Header */}
        <motion.div
          className="mb-10"
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <p className="font-hand text-amber text-sm tracking-widest mb-2" style={{ letterSpacing: '0.2em' }}>
            — listening
          </p>
          <h2 className="font-serif text-cream text-4xl md:text-5xl font-light" style={{ fontStyle: 'italic' }}>
            a playlist
          </h2>
          <p className="font-sans text-cream-dim text-sm mt-2 leading-relaxed max-w-xs">
            something to keep in the background while you explore.
          </p>
        </motion.div>

        {/* Player card */}
        <motion.div
          className="relative rounded-2xl overflow-hidden glass"
          style={{ border: '1px solid rgba(201,136,79,0.15)' }}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, delay: 0.15 }}
        >
          {/* Decorative amber strip */}
          <div
            className="absolute top-0 left-0 right-0 h-px pointer-events-none"
            style={{ background: 'linear-gradient(to right, transparent, rgba(201,136,79,0.5), transparent)' }}
          />

          {/* Top bar — mini player header */}
          <div
            className="flex items-center justify-between px-5 py-4"
            style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}
          >
            <div className="flex items-center gap-3">
              {/* Animated bars */}
              <div className="flex items-end gap-[3px] h-4">
                {[1, 1.5, 0.8, 1.3, 0.6].map((h, i) => (
                  <motion.div
                    key={i}
                    className="w-[3px] rounded-full"
                    style={{ background: '#1db954', height: `${h * 12}px` }}
                    animate={{ scaleY: [1, h + 0.5, 1] }}
                    transition={{ duration: 0.9 + i * 0.2, repeat: Infinity, delay: i * 0.15 }}
                  />
                ))}
              </div>
              <span className="font-hand text-cream-dim text-sm">now playing</span>
            </div>
            <button
              className="font-hand text-xs text-cream-dim hover:text-amber transition-colors"
              onClick={() => setExpanded((e) => !e)}
            >
              {expanded ? 'collapse ↑' : 'expand ↓'}
            </button>
          </div>

          {/* Spotify iframe */}
          <motion.div
            animate={{ height: expanded ? 380 : 152 }}
            transition={{ type: 'spring', stiffness: 200, damping: 28 }}
            style={{ overflow: 'hidden' }}
          >
            {!loaded && (
              <div className="flex items-center justify-center h-full py-8">
                <div className="w-6 h-6 border-2 border-muted border-t-amber rounded-full animate-spin" />
              </div>
            )}
            <iframe
              src={SPOTIFY_URL}
              width="100%"
              height={expanded ? 380 : 152}
              frameBorder="0"
              allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
              loading="lazy"
              onLoad={() => setLoaded(true)}
              style={{
                opacity: loaded ? 1 : 0,
                transition: 'opacity 0.4s ease',
                display: 'block',
              }}
            />
          </motion.div>

          {/* Bottom ambient glow */}
          <div
            className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-1/2 h-12 pointer-events-none"
            style={{ background: 'radial-gradient(ellipse, rgba(29,185,84,0.06) 0%, transparent 70%)' }}
          />
        </motion.div>

        {/* Small note */}
        <motion.p
          className="font-hand text-center mt-5 text-sm"
          style={{ color: 'rgba(201,136,79,0.35)' }}
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.6 }}
        >
          needs Spotify to play — or just vibe to the name of the song ✦
        </motion.p>
      </div>
    </section>
  )
}
