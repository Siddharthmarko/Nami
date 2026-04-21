import { motion } from 'framer-motion'

/**
 * ChatBubble — renders a single chat message
 *
 * Props:
 *   name      string  — sender name
 *   time      string  — timestamp string
 *   text      string  — message body
 *   isOwn     boolean — true = right (green), false = left (grey)
 *   showName  boolean — show sender label above bubble
 *   index     number  — for stagger delay
 */
export default function ChatBubble({ name, time, text, isOwn, showName, index = 0 }) {
  return (
    <motion.div
      className={`flex w-full mb-1 px-2 ${isOwn ? 'justify-end' : 'justify-start'}`}
      initial={{ opacity: 0, y: 10, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{
        duration: 0.28,
        delay: index < 12 ? index * 0.035 : 0,   // stagger only first batch
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
    >
      <div
        className="max-w-[72%] flex flex-col"
        style={{ alignItems: isOwn ? 'flex-end' : 'flex-start' }}
      >
        {/* Sender name — only shown when switching speaker */}
        {showName && !isOwn && (
          <span
            className="font-hand text-xs mb-0.5 px-1"
            style={{ color: '#7aa3b0', fontSize: '0.7rem' }}
          >
            {name}
          </span>
        )}

        {/* Bubble */}
        <div
          className="relative px-3 py-2 rounded-2xl"
          style={{
            background: isOwn ? '#005c4b' : '#202c33',
            borderRadius: isOwn
              ? '18px 18px 4px 18px'
              : '18px 18px 18px 4px',
            boxShadow: '0 1px 2px rgba(0,0,0,0.35)',
            wordBreak: 'break-word',
          }}
        >
          {/* Tail */}
          <div
            style={{
              position: 'absolute',
              bottom: 0,
              [isOwn ? 'right' : 'left']: -6,
              width: 0,
              height: 0,
              borderStyle: 'solid',
              borderWidth: isOwn ? '0 0 8px 8px' : '0 8px 8px 0',
              borderColor: isOwn
                ? `transparent transparent transparent #005c4b`
                : `transparent #202c33 transparent transparent`,
            }}
          />

          <p
            className="font-sans leading-snug"
            style={{ color: '#e9edef', fontSize: '0.875rem' }}
          >
            {text}
          </p>

          {/* Timestamp */}
          <span
            className="block text-right mt-0.5"
            style={{ color: 'rgba(233,237,239,0.45)', fontSize: '0.65rem', fontFamily: 'DM Sans, sans-serif' }}
          >
            {time}
          </span>
        </div>
      </div>
    </motion.div>
  )
}
