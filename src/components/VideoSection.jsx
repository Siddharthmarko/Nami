import { useState, useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const YT_URL =
  'https://www.youtube.com/embed/videoseries?list=PL0aKtym7j4-Skvd2ioNOPq2LCNHlBhbDk&rel=0&modestbranding=1&color=white'

export default function VideoSection() {
  const [loaded, setLoaded] = useState(false)
  const [active, setActive] = useState(false)
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '0px 0px -80px 0px' })

  return (
    <section id="videos" className="py-20 px-4 md:px-8" ref={ref}>
      <div className="max-w-2xl mx-auto">

        {/* Header */}
        <motion.div
          className="mb-10"
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <p className="font-hand text-amber text-sm tracking-widest mb-2" style={{ letterSpacing: '0.2em' }}>
            — watching
          </p>
          <h2 className="font-serif text-cream text-4xl md:text-5xl font-light" style={{ fontStyle: 'italic' }}>
            things you might like
          </h2>
          <p className="font-sans text-cream-dim text-sm mt-2 leading-relaxed max-w-xs">
            a little playlist. no pressure to watch all of it.
          </p>
        </motion.div>

        {/* Video card */}
        <motion.div
          className="relative rounded-2xl overflow-hidden"
          style={{ border: '1px solid rgba(201,136,79,0.12)', background: '#0c0b0a' }}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, delay: 0.15 }}
        >
          {/* Top strip */}
          <div
            className="absolute top-0 left-0 right-0 h-px pointer-events-none z-10"
            style={{ background: 'linear-gradient(to right, transparent, rgba(201,136,79,0.4), transparent)' }}
          />

          {/* Aspect ratio box — 16:9 */}
          <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
            {!active && (
              <motion.button
                className="absolute inset-0 flex flex-col items-center justify-center gap-4 z-10"
                style={{ background: 'rgba(12,11,10,0.7)', backdropFilter: 'blur(8px)' }}
                whileHover={{ background: 'rgba(12,11,10,0.5)' }}
                onClick={() => setActive(true)}
              >
                {/* Play button */}
                <motion.div
                  className="w-16 h-16 rounded-full flex items-center justify-center"
                  style={{
                    background: 'rgba(201,136,79,0.12)',
                    border: '1.5px solid rgba(201,136,79,0.35)',
                  }}
                  whileHover={{ scale: 1.1, background: 'rgba(201,136,79,0.2)' }}
                  whileTap={{ scale: 0.94 }}
                >
                  <div
                    className="ml-1"
                    style={{
                      width: 0,
                      height: 0,
                      borderTop: '10px solid transparent',
                      borderBottom: '10px solid transparent',
                      borderLeft: '18px solid rgba(201,136,79,0.8)',
                    }}
                  />
                </motion.div>
                <p className="font-hand text-cream-dim text-sm">click to load playlist</p>
              </motion.button>
            )}

            {active && (
              <>
                {!loaded && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black z-10">
                    <div className="w-6 h-6 border-2 border-muted border-t-amber rounded-full animate-spin" />
                  </div>
                )}
                <iframe
                  src={YT_URL}
                  className="absolute inset-0 w-full h-full"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  onLoad={() => setLoaded(true)}
                  style={{ opacity: loaded ? 1 : 0, transition: 'opacity 0.4s ease' }}
                  title="playlist"
                />
              </>
            )}
          </div>
        </motion.div>

        <motion.p
          className="font-hand text-center mt-5 text-sm"
          style={{ color: 'rgba(201,136,79,0.35)' }}
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.6 }}
        >
          picked with intention ✦
        </motion.p>
      </div>
    </section>
  )
}
