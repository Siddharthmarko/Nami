import { useState, useEffect } from 'react'
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

  useEffect(() => {
    console.log("Protection active")

    // 🚫 Disable right click
    const disableRightClick = (e) => {
      e.preventDefault()
    }

    // 🚫 Disable devtools shortcuts
    const disableKeys = (e) => {
      if (
        e.key === 'F12' ||
        (e.ctrlKey && e.shiftKey && ['I', 'J', 'C'].includes(e.key)) ||
        (e.ctrlKey && e.key === 'U')
      ) {
        e.preventDefault()
      }
    }

    document.addEventListener('contextmenu', disableRightClick)
    window.addEventListener('keydown', disableKeys)

    // 🚫 DevTools detection (better version)
    const detectDevTools = () => {
      const widthDiff = window.outerWidth - window.innerWidth
      const heightDiff = window.outerHeight - window.innerHeight

      if (widthDiff > 160 || heightDiff > 160) {
        document.body.innerHTML = `
          <div style="
            color:white;
            background:#0c0b0a;
            height:100vh;
            display:flex;
            align-items:center;
            justify-content:center;
            font-family:sans-serif;
            font-size:24px;
          ">
            Access Restricted ✦
          </div>
        `
      }
    }

    const interval = setInterval(detectDevTools, 1000)

    return () => {
      document.removeEventListener('contextmenu', disableRightClick)
      window.removeEventListener('keydown', disableKeys)
      clearInterval(interval)
    }
  }, [])

  return (
    <div
      className="relative min-h-screen select-none"
      style={{ background: '#0c0b0a' }}
    >

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

            <main>

              {/* Gallery */}
              <Gallery />

              <div className="section-divider mx-4 md:mx-8" />

              {/* Music */}
              <Music />

              <div className="section-divider mx-4 md:mx-8" />

              {/* Messages */}
              <Messages />

              {/* Easter Egg */}
              <EasterEgg />

              {/* Videos */}
              <VideoSection />

              <div className="section-divider mx-4 md:mx-8" />

              {/* Interactive */}
              <Interactive />

              {/* Ending */}
              <Ending />

            </main>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}