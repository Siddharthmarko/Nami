import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

export default function Ending() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '0px 0px -40px 0px' })

  return (
    <section id="ending" className="py-32 px-4 md:px-8 relative overflow-hidden" ref={ref}>

      {/* Background ambient glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `
            radial-gradient(ellipse 60% 50% at 50% 100%, rgba(201,136,79,0.05) 0%, transparent 70%),
            radial-gradient(ellipse 40% 30% at 50% 80%, rgba(122,140,126,0.04) 0%, transparent 70%)
          `,
        }}
      />

      <div className="max-w-xl mx-auto text-center relative z-10">

        {/* Top ornament */}
        <motion.div
          className="flex items-center justify-center gap-4 mb-12"
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9 }}
        >
          <div className="h-px flex-1" style={{ background: 'linear-gradient(to right, transparent, rgba(201,136,79,0.3))' }} />
          <span className="text-amber text-lg">✦</span>
          <div className="h-px flex-1" style={{ background: 'linear-gradient(to left, transparent, rgba(201,136,79,0.3))' }} />
        </motion.div>

        {/* Main message */}
        <motion.h2
          className="font-serif text-cream text-5xl md:text-6xl font-light leading-tight mb-6"
          style={{ fontStyle: 'italic' }}
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, delay: 0.1 }}
        >
          that's all<br/>for now.
        </motion.h2>

        <motion.p
          className="font-sans text-cream-dim text-sm leading-relaxed mb-4 max-w-xs mx-auto"
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, delay: 0.25 }}
        >
          hope it felt like something. even just a little.
        </motion.p>

        <motion.p
          className="font-hand text-amber text-2xl"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 1.2, delay: 0.45 }}
        >
          — made for you ✦
        </motion.p>

        {/* Scroll back to top */}
        <motion.div
          className="mt-16"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.8 }}
        >
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="font-hand text-sm text-cream-dim hover:text-amber transition-colors"
          >
            back to the top ↑
          </button>
        </motion.div>

        {/* Tiny hidden note at very bottom */}
        <motion.p
          className="mt-8 font-hand text-xs"
          style={{ color: 'rgba(201,136,79,0.18)' }}
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 1.2 }}
        >
          (you read all the way to the end. that's cute.)
        </motion.p>
      </div>
    </section>
  )
}
