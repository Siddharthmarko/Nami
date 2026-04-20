import { useState, useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const GDOC_URL =
  'https://docs.google.com/document/d/e/2PACX-1vTazPxWDqr_3-jnXcmsckkA76wF3JlxNQFCejzLDHh9fPpwo_KaN9Jpc0RJcdE3CwkstHR6T6u6WA24/pub?embedded=true'

export default function Messages() {
  const [loaded, setLoaded] = useState(false)
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '0px 0px -80px 0px' })

  return (
    <section id="notes" className="py-20 px-4 md:px-8" ref={ref}>
      <div className="max-w-2xl mx-auto">

        {/* Header */}
        <motion.div
          className="mb-10"
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <p className="font-hand text-amber text-sm tracking-widest mb-2" style={{ letterSpacing: '0.2em' }}>
            — notes
          </p>
          <h2 className="font-serif text-cream text-4xl md:text-5xl font-light" style={{ fontStyle: 'italic' }}>
            thoughts &amp; things
          </h2>
          <p className="font-sans text-cream-dim text-sm mt-2 leading-relaxed max-w-xs">
            a shared space. write things here if you want to.
          </p>
        </motion.div>

        {/* Paper card */}
        <motion.div
          className="relative"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, delay: 0.15 }}
        >
          {/* Ruled lines decoration */}
          <div
            className="absolute top-0 left-0 right-0 bottom-0 rounded-2xl pointer-events-none overflow-hidden"
            style={{ zIndex: 0 }}
          >
            {Array.from({ length: 12 }, (_, i) => (
              <div
                key={i}
                className="absolute left-12 right-6"
                style={{
                  top: `${60 + i * 28}px`,
                  height: '1px',
                  background: 'rgba(232,221,208,0.04)',
                }}
              />
            ))}
            {/* Margin line */}
            <div
              className="absolute top-0 bottom-0 w-px"
              style={{ left: '44px', background: 'rgba(201,136,79,0.08)' }}
            />
          </div>

          {/* Card */}
          <div
            className="paper-card relative z-10 overflow-hidden"
            style={{ minHeight: 480 }}
          >
            {/* Top bar */}
            <div
              className="flex items-center gap-3 px-5 py-3"
              style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}
            >
              <div className="flex gap-2">
                {['rgba(201,136,79,0.5)', 'rgba(122,140,126,0.5)', 'rgba(232,221,208,0.2)'].map((c, i) => (
                  <div key={i} className="w-2.5 h-2.5 rounded-full" style={{ background: c }} />
                ))}
              </div>
              <span className="font-hand text-cream-dim text-xs ml-2">notes.doc</span>
            </div>

            {/* Loading state */}
            {!loaded && (
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
                <div className="w-6 h-6 border-2 border-muted border-t-amber rounded-full animate-spin" />
                <span className="font-hand text-cream-dim text-sm">opening notes...</span>
              </div>
            )}

            {/* Google Docs iframe */}
            <iframe
              src={GDOC_URL}
              width="100%"
              height="480"
              frameBorder="0"
              scrolling="yes"
              onLoad={() => setLoaded(true)}
              style={{
                opacity: loaded ? 1 : 0,
                transition: 'opacity 0.5s ease',
                display: 'block',
                background: 'transparent',
              }}
              title="notes"
            />
          </div>

          {/* Decorative corner fold */}
          <div
            className="absolute top-0 right-0 w-8 h-8 pointer-events-none"
            style={{
              background: 'linear-gradient(225deg, rgba(201,136,79,0.12) 50%, transparent 50%)',
              borderRadius: '0 16px 0 0',
              zIndex: 20,
            }}
          />
        </motion.div>

        <motion.p
          className="font-hand text-center mt-5 text-sm"
          style={{ color: 'rgba(201,136,79,0.35)' }}
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.6 }}
        >
          only you can see this ✦
        </motion.p>
      </div>
    </section>
  )
}
