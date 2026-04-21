import { useState, useEffect, useRef, useCallback } from 'react'
import { motion, AnimatePresence, useInView } from 'framer-motion'
import { useLocalState } from '../hooks/useLocalState'
import { useChat } from '../hooks/useChat'
import ChatBubble from './ChatBubble'
import NameModal from './NameModal'

const OWNER_NAME = 'goutam'

export default function Messages() {
  const sectionRef = useRef(null)
  const inView = useInView(sectionRef, { once: true, margin: '0px 0px -80px 0px' })

  const [myName, setMyName] = useLocalState('chat_name', '')
  const [showModal, setShowModal] = useState(false)

  const { messages, loading, error, sending, sendMessage } = useChat()

  const [input, setInput] = useState('')
  const inputRef = useRef(null)
  const messagesRef = useRef(null)

  // Show name modal
  useEffect(() => {
    if (!myName) setShowModal(true)
  }, [myName])

  // Stable scroll (NO JUMP)
  useEffect(() => {
    const el = messagesRef.current
    if (!el) return

    const isNearBottom =
      el.scrollHeight - el.scrollTop - el.clientHeight < 120

    if (isNearBottom) {
      el.scrollTop = el.scrollHeight
    }
  }, [messages])

  // Focus input
  useEffect(() => {
    inputRef.current?.focus()
  }, [myName])

  const handleNameConfirm = (name) => {
    setMyName(name)
    setShowModal(false)
  }

  const handleSend = useCallback(async () => {
    const text = input.trim()
    if (!text || !myName || sending) return

    setInput('')

    // Optimistic feel (no wait)
    sendMessage(myName, text)
  }, [input, myName, sending, sendMessage])

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  const getBubbleSide = (msgName) => {
    const me = myName.toLowerCase()
    const sender = msgName.toLowerCase()

    if (me === OWNER_NAME) {
      return sender === OWNER_NAME ? 'left' : 'right'
    } else {
      return sender === me ? 'right' : 'left'
    }
  }

  return (
    <section id="notes" className="py-20 px-4 md:px-8" ref={sectionRef}>
      <div className="max-w-2xl mx-auto">

        {/* Header */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
        >
          <p className="text-sm tracking-widest mb-2" style={{ color: '#c9884f' }}>
            — notes
          </p>
          <h2 style={{ color: '#e8ddd0' }} className="text-4xl italic">
            thoughts & things
          </h2>
        </motion.div>

        {/* Chat Container */}
        <motion.div
          className="relative rounded-3xl overflow-hidden"
          style={{
            height: 520,
            background: '#0b141a',
            border: '1px solid rgba(255,255,255,0.06)',
          }}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
        >

          {/* Top Bar */}
          <div className="flex items-center px-4 py-3 bg-[#1f2c33]">
            <div className="flex-1">
              <p style={{ color: '#e9edef' }}>us, only</p>
              <p style={{ color: 'rgba(255,255,255,0.4)' }}>
                {loading ? 'loading…' : error ? 'connection lost' : 'online'}
              </p>
            </div>

            {myName && (
              <button onClick={() => setShowModal(true)}>
                {myName}
              </button>
            )}
          </div>

          {/* Messages */}
          <div
            ref={messagesRef}
            className="flex flex-col overflow-y-auto p-4"
            style={{ height: 'calc(100% - 110px)' }}
          >
            {loading && messages.length === 0 && (
              <p>Loading...</p>
            )}

            {error && (
              <p style={{ color: 'red' }}>{error}</p>
            )}

            {!loading && messages.length === 0 && (
              <p>No messages yet</p>
            )}

            <AnimatePresence>
              {messages.map((msg, i) => {
                const side = getBubbleSide(msg.name)
                const isOwn = side === 'right'

                return (
                  <ChatBubble
                    key={msg.id || i}
                    name={msg.name}
                    time={msg.time}
                    text={msg.text}
                    isOwn={isOwn}
                  />
                )
              })}
            </AnimatePresence>
          </div>

          {/* Input */}
          <div className="absolute bottom-0 w-full flex p-2 bg-[#1f2c33]">
            <input
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Type message..."
              className="flex-1 px-4 py-2 rounded-full bg-[#2a3942] text-white"
            />

            <button
              onClick={handleSend}
              disabled={!input.trim()}
              className="ml-2 px-4 bg-green-700 rounded-full"
            >
              Send
            </button>
          </div>

          {/* Name Modal */}
          <AnimatePresence>
            {showModal && (
              <NameModal onConfirm={handleNameConfirm} />
            )}
          </AnimatePresence>

        </motion.div>
      </div>
    </section>
  )
}