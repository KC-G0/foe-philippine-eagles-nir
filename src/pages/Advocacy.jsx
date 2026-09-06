// src/pages/Advocacy.jsx
import { motion } from 'framer-motion'
import Icon from '../components/Icons'

const PILLARS = [
  {
    name: 'Brotherhood',
    description: 'Animated primarily by a strong bond of brotherhood and fraternal ties. The fraternal "ism" in the Philippine Eagles has sprung from its declaration of policies and objectives seeking to form a strong, first Philippine born fraternal socio-civic organization.',
    icon: 'Brotherhood'
  },
  {
    name: 'Service',
    description: 'Emblazed with intense mission of Service to God, country, its people, above all. The Philippine Eagles shall evolve, establish and implement in the Philippines a new approach and vision in the quality and scope of humanitarian service.',
    icon: 'Service'
  },
  {
    name: 'Unity',
    description: 'United by a unique bond of communal fraternal organization. The Philippine Eagles shall encourage the formation and organization of Eagles clubs and regions in the Philippines and other countries.',
    icon: 'Unity'
  },
  {
    name: 'Divine Power',
    description: 'God-loving, non-sectarian, non-political. Based on Deo et Patria — For God and Country. We serve a Supreme Being and care for humanity at all times.',
    icon: 'DivinePower'
  }
]

const SERVICE_AREAS = [
  {
    title: 'Humanitarian Service',
    description: 'Personal service for the betterment of Eagle-Members, regions, clubs, and the less privileged and marginalized sectors.',
    icon: 'Humanitarian'
  },
  {
    title: 'Community Outreach',
    description: 'Provide means for community outreach and venue for healthy fellowship through various programs and humanitarian services.',
    icon: 'Community'
  },
  {
    title: 'Health Research',
    description: 'Promote health research, scientific inquiries, educational and social legislation.',
    icon: 'Health'
  },
  {
    title: 'Educational Legislation',
    description: 'Provide forum for open discussions on educational and social legislation.',
    icon: 'Legislation'
  },
  {
    title: 'Alalayang Agila',
    description: 'Shared each other\'s problems or moments of importance and expanded and enhanced their sense and spirit of brotherhood.',
    icon: 'AlalayangAgila'
  },
  {
    title: 'Nation Building',
    description: 'Partner of the Government in nation building based on the concept and principle of Alalayang Agila.',
    icon: 'NationBuilding'
  }
]

export default function Advocacy() {
  return (
    <div className="py-16 px-4 relative">
      {/* Background accent */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div className="absolute top-1/2 left-1/3 w-96 h-96 rounded-full bg-gold-500 blur-3xl" />
      </div>

      <div className="relative max-w-6xl mx-auto">
        <motion.h1 
          className="text-4xl font-bold text-gold-500 mb-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          Advocacy
        </motion.h1>
        <motion.p 
          className="text-white/70 mb-12 max-w-3xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          The Four Pillars of Eagleism guide our advocacy and service to humanity.
        </motion.p>

        {/* Four Pillars */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-gold-500 mb-8">The Four Pillars of Eagleism</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {PILLARS.map((pillar, idx) => (
              <motion.div
                key={pillar.name}
                className="glass-card p-8 group"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
              >
                <div className="mb-4 transform group-hover:scale-110 transition-transform duration-300 flex">
                  <Icon name={pillar.icon} size={48} />
                </div>
                <h3 className="text-2xl font-bold text-gold-500 mb-3">{pillar.name}</h3>
                <p className="text-white/80 leading-relaxed">{pillar.description}</p>
                <div className="w-0 group-hover:w-full h-0.5 bg-gradient-to-r from-gold-500 to-transparent mt-6 transition-all duration-500" />
              </motion.div>
            ))}
          </div>
        </div>

        {/* Service Areas */}
        <div>
          <h2 className="text-2xl font-bold text-gold-500 mb-8">Service Areas</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {SERVICE_AREAS.map((area, idx) => (
              <motion.div
                key={area.title}
                className="glass-card p-6 group"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.05 }}
              >
                <div className="mb-3 transform group-hover:scale-110 transition-transform duration-300 flex">
                  <Icon name={area.icon} size={36} />
                </div>
                <h3 className="text-lg font-bold text-gold-500 mb-2">{area.title}</h3>
                <p className="text-white/70 text-sm">{area.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
