import { useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const messagesEndRef = useRef(null)
  const navigate = useNavigate()

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const sendMessage = async (e) => {
    e.preventDefault()
    if (!input.trim() || loading) return

    const userMsg = { role: 'user', content: input }
    setMessages(prev => [...prev, userMsg])
    setInput('')
    setLoading(true)

    try {
      const res = await fetch('https://foe-philippine-eagles-nir-backend.onrender.com/api/chatbot', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question: input })
      })
      const data = await res.json()
      setMessages(prev => [...prev, { role: 'assistant', content: data.answer, citations: data.citations }])
    } catch {
      setMessages(prev => [...prev, { role: 'assistant', content: 'Sorry, something went wrong. Please try again.' }])
    } finally {
      setLoading(false)
    }
  }

  // Handle clicking on a source citation
  const handleCitationClick = (pageNum) => {
    navigate(`/history-page?page=${pageNum}`)
    setIsOpen(false)
  }

  // Render message with clickable citations
  const renderMessage = (msg) => {
    if (msg.role === 'user') {
      return <p>{msg.content}</p>
    }

    // For assistant messages, make citations clickable
    const { content, citations } = msg
    
    // Extract source page number from content if present
    const sourceMatch = content.match(/Source:\s*p\.\s*([\d,\s]+)$/i)
    
    if (sourceMatch && citations && citations.length > 0) {
      const pageNum = citations[0]
      const answerText = content.replace(/Source:\s*p\.\s*[\d,\s]+$/i, '').trim()
      
      return (
        <div>
          <p>{answerText}</p>
          <p className="text-xs mt-2">
            <button
              onClick={() => handleCitationClick(pageNum)}
              className="text-gold-500 hover:text-gold-400 underline font-medium cursor-pointer"
            >
              Source: p. {pageNum}
            </button>
          </p>
        </div>
      )
    }

    // For concept answers with multiple citations
    if (citations && citations.length > 0) {
      // Split content into paragraphs for better readability
      const paragraphs = content.split('\n\n').filter(p => p.trim())
      
      return (
        <div>
          {paragraphs.map((para, idx) => (
            <p key={idx} className={idx > 0 ? 'mt-2' : ''}>{para}</p>
          ))}
          <p className="text-xs mt-3">
            <span className="opacity-60">Sources: </span>
            {citations.map((pageNum, idx) => (
              <span key={pageNum}>
                {idx > 0 && ', '}
                <button
                  onClick={() => handleCitationClick(pageNum)}
                  className="text-gold-500 hover:text-gold-400 underline font-medium cursor-pointer"
                >
                  p. {pageNum}
                </button>
              </span>
            ))}
          </p>
        </div>
      )
    }

    // Fallback for messages without citations
    return <p>{content}</p>
  }

  return (
    <>
      {/* Chat toggle button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 w-14 h-14 rounded-full bg-gold-500 text-navy-500 shadow-lg hover:bg-gold-400 transition-colors z-50 flex items-center justify-center"
        aria-label={isOpen ? 'Close chat' : 'Open chat assistant'}
      >
        {isOpen ? (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
          </svg>
        )}
      </button>

      {/* Chat panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-24 right-6 w-96 max-w-[calc(100vw-3rem)] h-[500px] glass-panel-dark flex flex-col z-50 shadow-2xl"
          >
            {/* Header */}
            <div className="p-4 border-b border-white/10">
              <h3 className="text-gold-500 font-bold">Eagles Constitution Assistant</h3>
              <p className="text-white/50 text-xs">Ask questions about the constitution</p>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.length === 0 && (
                <p className="text-white/40 text-sm text-center py-8">
                  Ask me anything about the Philippine Eagles Constitution!
                </p>
              )}
              {messages.map((msg, idx) => (
                <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[80%] px-4 py-2 rounded-lg text-sm ${
                    msg.role === 'user' 
                      ? 'bg-gold-500 text-navy-500' 
                      : 'bg-white/10 text-white/90'
                  }`}>
                    {renderMessage(msg)}
                  </div>
                </div>
              ))}
              {loading && (
                <div className="flex justify-start">
                  <div className="bg-white/10 px-4 py-2 rounded-lg">
                    <span className="text-white/50 text-sm">Searching constitution...</span>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <form onSubmit={sendMessage} className="p-4 border-t border-white/10">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={input}
                  onChange={e => setInput(e.target.value)}
                  placeholder="Ask about the constitution..."
                  className="flex-1 px-3 py-2 rounded-lg bg-white/10 border border-white/20 text-white text-sm placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-gold-500"
                />
                <button
                  type="submit"
                  disabled={loading || !input.trim()}
                  className="px-4 py-2 rounded-lg bg-gold-500 text-navy-500 text-sm font-semibold disabled:opacity-50 hover:bg-gold-400 transition-colors"
                >
                  Send
                </button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
