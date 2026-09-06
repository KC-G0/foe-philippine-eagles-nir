// src/pages/Education.jsx
import { motion } from 'framer-motion'
import Icon from '../components/Icons'

const PROGRAMS = [
  {
    title: 'Leadership Seminar',
    description: 'A comprehensive leadership development program designed to cultivate the next generation of Eagles leaders.',
    icon: 'Leadership'
  },
  {
    title: 'Orientation Seminar',
    description: 'Introduction to the Philippine Eagles, its history, constitution, principles, and the Four Pillars of Eagleism.',
    icon: 'Orientation'
  },
  {
    title: 'Community Outreach Training',
    description: 'Hands-on training for humanitarian service, community organizing, and social responsibility programs.',
    icon: 'Outreach'
  },
  {
    title: 'PEIL Certification',
    description: 'Philippine Eagles Institute of Leadership certification for qualified directors and seminar discussants.',
    icon: 'Certification'
  }
]

export default function Education() {
  return (
    <div className="py-16 px-4 relative">
      {/* Background accent */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div className="absolute top-1/3 right-1/4 w-96 h-96 rounded-full bg-gold-500 blur-3xl" />
      </div>

      <div className="relative max-w-6xl mx-auto">
        <motion.h1 
          className="text-4xl font-bold text-gold-500 mb-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          Education Programs
        </motion.h1>
        <motion.p 
          className="text-white/70 mb-12 max-w-3xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          The Philippine Eagles Institute of Leadership (PEIL) provides comprehensive educational 
          programs to develop Eagle-members into effective leaders and humanitarian servants.
        </motion.p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {PROGRAMS.map((program, idx) => (
            <motion.div
              key={program.title}
              className="glass-card p-8 group"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
            >
              <div className="mb-4 transform group-hover:scale-110 transition-transform duration-300 flex">
                <Icon name={program.icon} size={40} />
              </div>
              <h3 className="text-xl font-bold text-gold-500 mb-3">{program.title}</h3>
              <p className="text-white/70">{program.description}</p>
            </motion.div>
          ))}
        </div>

        <motion.div 
          id="peil"
          className="mt-16 glass-panel p-8 border border-gold-500/20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-2xl font-bold text-gold-500 mb-4">Philippine Eagles Institute of Leadership (PEIL)</h2>
          <p className="text-white/80 leading-relaxed mb-4">
            The Philippine Eagles Institute of Leadership (PEIL) was created on May 27, 1989 at UP AIT, Diliman, 
            Quezon City under the Philippine Eagles Institute of Leadership Act of 1989. Said Act was amended in 2008 
            and further amended by the 2024 Rules.
          </p>
          <p className="text-white/80 leading-relaxed">
            PEIL is a collegial body composed of PEIL Directors appointed by the National President. The Institute 
            prepares and conducts leadership seminars, orientation programs, and training for Eagle-members across 
            all regions and clubs.
          </p>
        </motion.div>
      </div>
    </div>
  )
}
