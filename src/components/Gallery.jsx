import { useState, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { galleryData, sizeMap } from '../data/galleryData'
import { useLocalState } from '../hooks/useLocalState'
import Card from './Card'
import Modal from './Modal'

// Enrich items with pixel dimensions
const enriched = galleryData.map((item) => ({
  ...item,
  _w: sizeMap[item.size]?.w ?? 220,
  _h: sizeMap[item.size]?.h ?? 260,
}))

const rowItems = (rowNum) => enriched.filter((i) => i.row === rowNum)

function GalleryRow({ items, label, reversed = false, onCardClick }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '0px 0px -80px 0px' })

  return (
    <motion.div
      ref={ref}
      className="mb-6"
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      {label && (
        <p className="font-hand text-cream-dim text-sm mb-3 px-1" style={{ color: 'rgba(201,136,79,0.5)' }}>
          {label}
        </p>
      )}
      <div
        className="scroll-row flex gap-4 pb-3"
        style={{ flexDirection: reversed ? 'row-reverse' : 'row' }}
      >
        {items.map((item, idx) => (
          <Card
            key={item.id}
            item={item}
            index={idx}
            onClick={onCardClick}
          />
        ))}
      </div>
    </motion.div>
  )
}

export default function Gallery() {
  const [modalItem, setModalItem] = useState(null)
  const [revealedIds] = useLocalState('revealed_ids', [])
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '0px 0px -60px 0px' })

  const recentlyViewed = enriched.filter((i) => {
    try {
      return JSON.parse(localStorage.getItem(`revealed_${i.id}`)) === true
    } catch { return false }
  }).slice(0, 8)

  return (
    <section id="gallery" className="py-20 px-4 md:px-8 overflow-hidden">
      {/* Section header */}
      <motion.div
        ref={ref}
        className="mb-12"
        initial={{ opacity: 0, y: 24 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8 }}
      >
        <p className="font-hand text-amber text-sm tracking-widest mb-2" style={{ letterSpacing: '0.2em' }}>
          — moments
        </p>
        <h2 className="font-serif text-cream text-4xl md:text-5xl font-light" style={{ fontStyle: 'italic' }}>
          a little collection
        </h2>
        <p className="font-sans text-cream-dim text-sm mt-2 max-w-xs leading-relaxed">
          tap each one to reveal. tap again to open.
        </p>
      </motion.div>

      {/* Row 1 */}
      <GalleryRow
        items={rowItems(1)}
        label="✦ some of them"
        onCardClick={setModalItem}
      />

      {/* Row 2 — reversed for visual rhythm */}
      <GalleryRow
        items={rowItems(2)}
        reversed
        onCardClick={setModalItem}
      />

      {/* Row 3 */}
      <GalleryRow
        items={rowItems(3)}
        label="✦ and more"
        onCardClick={setModalItem}
      />

      {/* "Recently viewed" strip — only shows if user has revealed some */}
      {recentlyViewed.length > 0 && (
        <motion.div
          className="mt-10 pt-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          style={{ borderTop: '1px solid rgba(201,136,79,0.1)' }}
        >
          <p className="font-hand text-sm mb-4" style={{ color: 'rgba(201,136,79,0.45)' }}>
            you've seen these
          </p>
          <div className="scroll-row flex gap-3">
            {recentlyViewed.map((item, idx) => (
              <motion.div
                key={item.id}
                className="flex-shrink-0 rounded-xl overflow-hidden cursor-pointer"
                style={{ width: 80, height: 80, border: '1px solid rgba(201,136,79,0.15)' }}
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: idx * 0.05 }}
                onClick={() => setModalItem(item)}
              >
                <img
                  src={item.src}
                  alt=""
                  className="w-full h-full object-cover"
                  style={{ filter: 'brightness(0.8) saturate(0.7)' }}
                  onError={(e) => { e.target.style.display = 'none' }}
                />
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Modal */}
      <Modal item={modalItem} onClose={() => setModalItem(null)} />
    </section>
  )
}
