// src/pages/Events.jsx
import { motion } from 'framer-motion'

const EVENTS = [
  {
    title: 'National Congress',
    date: '3rd Saturday & Sunday of November (Annual)',
    description: 'The yearly gathering of all Regions, Eagles Clubs, Eagle-members and official guests for fellowship and National Assembly sessions.',
    type: 'National'
  },
  {
    title: 'National Leadership Seminar',
    date: 'As scheduled by PEIL',
    description: 'A national leadership seminar participated in by qualified Eagles from all Eagles Regions and Clubs.',
    type: 'Education'
  },
  {
    title: 'Founding Anniversary',
    date: 'June 22 (Annual)',
    description: 'Celebration of the founding of the Philippine Eagles, first observed on June 22, 1979 at UP Asian Institute of Tourism.',
    type: 'National'
  },
  {
    title: 'Community Outreach Programs',
    date: 'Year-round',
    description: 'Joint community outreach and humanitarian service among Regional governors to pool resources and provide wider help.',
    type: 'Service'
  }
]

const ANNOUNCEMENTS = [
  {
    date: 'June 22, 2024',
    text: '45th Founding Anniversary of the Philippine Eagles celebrated at UP Asian Institute of Tourism, Quezon City.'
  },
  {
    date: 'November 2024',
    text: 'National Congress and National Assembly session — 3rd Saturday and Sunday of November.'
  },
  {
    date: '2024',
    text: 'Launch of the Philippine Eagles Constitution of 2024, published and edited by the Philippine Eagles Constitutional Commission.'
  }
]

export default function Events() {
  return (
    <div className="py-16 px-4 relative">
      {/* Background accent */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div className="absolute bottom-1/4 left-1/4 w-96 h-96 rounded-full bg-gold-500 blur-3xl" />
      </div>

      <div className="relative max-w-6xl mx-auto">
        <motion.h1 
          className="text-4xl font-bold text-gold-500 mb-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          Events & News
        </motion.h1>
        <motion.p 
          className="text-white/70 mb-12 max-w-3xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          Stay updated with the latest events, activities, and announcements from the Philippine Eagles.
        </motion.p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Events */}
          <div id="events">
            <h2 className="text-2xl font-bold text-gold-500 mb-6">Upcoming Events</h2>
            <div className="space-y-4">
              {EVENTS.map((event, idx) => (
                <motion.div
                  key={event.title}
                  className="glass-card p-6"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                >
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="text-lg font-bold text-white">{event.title}</h3>
                    <span className="text-xs px-2 py-1 rounded bg-gold-500/20 text-gold-500 whitespace-nowrap">
                      {event.type}
                    </span>
                  </div>
                  <p className="text-gold-500 text-sm mb-2">{event.date}</p>
                  <p className="text-white/70 text-sm">{event.description}</p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Announcements */}
          <div id="announcements">
            <h2 className="text-2xl font-bold text-gold-500 mb-6">Announcements</h2>
            <div className="space-y-4">
              {ANNOUNCEMENTS.map((ann, idx) => (
                <motion.div
                  key={idx}
                  className="glass-card p-6"
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                >
                  <p className="text-gold-500 text-sm mb-2">{ann.date}</p>
                  <p className="text-white/80">{ann.text}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
