import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Hero from './components/Hero'
import Nav from './components/Nav'
import Gallery from './components/Gallery'
import Music from './components/Music'
import Messages from './components/Messages'
import VideoSection from './components/VideoSection'
import Interactive from './components/Interactive'
import EasterEgg from './components/EasterEgg'
import Ending from './components/Ending'
import FloatingPlayer from './components/FloatingPlayer'

export default function App() {
  const [entered, setEntered] = useState(false)

  return (
    <div className="relative min-h-screen" style={{ background: '#0c0b0a' }}>

      {/* ── Hero gate ── */}
      <AnimatePresence>
        {!entered && (
          <div className="fixed inset-0 z-50">
            <Hero onEnter={() => setEntered(true)} />
          </div>
        )}
      </AnimatePresence>

      {/* ── Main site ── */}
      <AnimatePresence>
        {entered && (
          <motion.div
            key="main"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            <Nav />
            <FloatingPlayer />

            <main className="pt-0">

              {/* ── Gallery ── */}
              <Gallery />

              {/* Section divider */}
              <div className="section-divider mx-4 md:mx-8" />

              {/* ── Music ── */}
              <Music />

              {/* Section divider */}
              <div className="section-divider mx-4 md:mx-8" />

              {/* ── Notes / Google Docs ── */}
              <Messages />

              {/* Easter egg hidden in divider */}
              <EasterEgg />

              {/* ── YouTube Playlist ── */}
              <VideoSection />

              {/* Section divider */}
              <div className="section-divider mx-4 md:mx-8" />

              {/* ── Interactive ── */}
              <Interactive />

              {/* ── Ending ── */}
              <Ending />
            </main>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
