// src/pages/Contact.jsx
import { motion } from 'framer-motion'

export default function Contact() {
  return (
    <div className="py-16 px-4 relative">
      {/* Background accent */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div className="absolute top-1/4 right-1/4 w-96 h-96 rounded-full bg-gold-500 blur-3xl" />
      </div>

      <div className="relative max-w-4xl mx-auto">
        <motion.h1 
          className="text-4xl font-bold text-gold-500 mb-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          Contact Us
        </motion.h1>
        <motion.p 
          className="text-white/70 mb-12 max-w-2xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          Reach out to the Philippine Eagles for inquiries, partnerships, or membership information.
        </motion.p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <motion.div 
            className="glass-panel p-8 border border-gold-500/20"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-xl font-bold text-gold-500 mb-6">Contact Information</h2>
            <div className="space-y-4">
              <div>
                <p className="text-white/50 text-sm uppercase tracking-wide mb-1">Address</p>
                <p className="text-white/80">National Headquarters</p>
                <p className="text-white/80">Quezon City, Metro Manila</p>
                <p className="text-white/80">Philippines</p>
              </div>
              <div>
                <p className="text-white/50 text-sm uppercase tracking-wide mb-1">SEC Registration</p>
                <p className="text-white/80">No. CN 2017-21277</p>
              </div>
            </div>
          </motion.div>

          <motion.div 
            className="glass-panel p-8 border border-gold-500/20"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-xl font-bold text-gold-500 mb-6">Send a Message</h2>
            <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); alert('Message form is a demo — backend not wired.') }}>
              <div>
                <label htmlFor="name" className="block text-white/70 text-sm mb-1">Name</label>
                <input
                  type="text"
                  id="name"
                  className="input-field w-full"
                  placeholder="Your name"
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-white/70 text-sm mb-1">Message</label>
                <textarea
                  id="message"
                  rows="4"
                  className="input-field w-full resize-none"
                  placeholder="Your message..."
                />
              </div>
              <button type="submit" className="btn-gold w-full">
                Send Message
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
