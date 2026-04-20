import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const NAV_LINKS = [
  { label: 'moments',  href: '#gallery'     },
  { label: 'music',    href: '#music'       },
  { label: 'notes',    href: '#notes'       },
  { label: 'videos',   href: '#videos'      },
  { label: 'play',     href: '#interactive' },
]

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])

  const handleLink = (href) => {
    setOpen(false)
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <>
      <motion.header
        className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-5 md:px-8 py-4"
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.7 }}
        style={{
          background: scrolled ? 'rgba(12,11,10,0.85)' : 'transparent',
          backdropFilter: scrolled ? 'blur(16px)' : 'none',
          borderBottom: scrolled ? '1px solid rgba(201,136,79,0.08)' : 'none',
          transition: 'background 0.4s ease, backdrop-filter 0.4s ease, border-color 0.4s ease',
        }}
      >
        {/* Logo / wordmark */}
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="font-hand text-amber text-xl tracking-wide"
        >
          ✦ for you
        </button>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-6">
          {NAV_LINKS.map((l) => (
            <button
              key={l.href}
              onClick={() => handleLink(l.href)}
              className="font-sans text-cream-dim hover:text-cream text-xs tracking-wider uppercase transition-colors"
              style={{ letterSpacing: '0.12em' }}
            >
              {l.label}
            </button>
          ))}
        </nav>

        {/* Mobile hamburger */}
        <button
          className="md:hidden flex flex-col gap-1.5 p-1"
          onClick={() => setOpen((o) => !o)}
          aria-label="menu"
        >
          {[0, 1, 2].map((i) => (
            <motion.span
              key={i}
              className="block h-px w-5"
              style={{ background: 'rgba(232,221,208,0.6)' }}
              animate={
                open
                  ? i === 0 ? { rotate: 45, y: 8 }
                  : i === 1 ? { opacity: 0 }
                  : { rotate: -45, y: -8 }
                  : { rotate: 0, y: 0, opacity: 1 }
              }
              transition={{ duration: 0.22 }}
            />
          ))}
        </button>
      </motion.header>

      {/* Mobile menu overlay */}
      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-40 flex flex-col items-center justify-center gap-8"
            style={{ background: 'rgba(12,11,10,0.96)', backdropFilter: 'blur(20px)' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            {NAV_LINKS.map((l, i) => (
              <motion.button
                key={l.href}
                className="font-serif text-cream text-3xl font-light"
                style={{ fontStyle: 'italic' }}
                onClick={() => handleLink(l.href)}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.07 }}
                whileHover={{ color: '#e0a870' }}
              >
                {l.label}
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
