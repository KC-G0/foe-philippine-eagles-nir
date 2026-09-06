// src/pages/Home.jsx
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import Chatbot from '../components/Chatbot'
import Icon from '../components/Icons'

const PILLARS = [
  {
    title: 'Brotherhood',
    description: 'A unique bond of communal fraternal organization anchored on shared values and mutual support.',
    icon: 'Brotherhood'
  },
  {
    title: 'Service',
    description: 'Humanitarian service to God, country, and community — above all else.',
    icon: 'Service'
  },
  {
    title: 'Unity',
    description: 'Forming a strong, first Philippine-born fraternal socio-civic organization.',
    icon: 'Unity'
  },
  {
    title: 'Divine Power',
    description: 'God-loving, non-sectarian, non-political — guided by faith in the Supreme Being.',
    icon: 'DivinePower'
  }
]

const STATS = [
  { value: '1979', label: 'Founded' },
  { value: '45+', label: 'Years of Service' },
  { value: '300+', label: 'Members Nationwide' },
  { value: '17', label: 'Regions' },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 }
  }
}

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
}

export default function Home() {
  return (
    <div className="overflow-hidden">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
        {/* Background layers */}
        <div className="absolute inset-0 bg-gradient-to-br from-navy-500 via-navy-600 to-navy-800" />
        
        {/* Animated background orbs */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-gold-500/10 blur-3xl animate-float" />
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full bg-gold-500/10 blur-3xl animate-float" style={{ animationDelay: '1s' }} />
          <div className="absolute top-1/2 right-1/3 w-64 h-64 rounded-full bg-gold-500/5 blur-3xl animate-float" style={{ animationDelay: '2s' }} />
        </div>

        {/* Grid pattern overlay */}
        <div className="absolute inset-0 opacity-5" style={{
          backgroundImage: `linear-gradient(rgba(201, 162, 39, 0.3) 1px, transparent 1px),
                           linear-gradient(90deg, rgba(201, 162, 39, 0.3) 1px, transparent 1px)`,
          backgroundSize: '50px 50px'
        }} />

        {/* Content */}
        <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            {/* Logo */}
            <motion.div 
              className="w-28 h-28 mx-auto mb-8 rounded-full overflow-hidden ring-4 ring-gold-500/50 shadow-glow-lg"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <img src="/logo.png" alt="FOE Philippine Eagles" className="w-full h-full object-cover" />
            </motion.div>

            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-4 text-shadow-lg">
              The Fraternal Order of Eagles
            </h1>
            <p className="text-2xl md:text-4xl text-gold-500 font-display mb-6">
              Philippine Eagles
            </p>
            <p className="text-lg md:text-xl text-white/70 mb-10 max-w-2xl mx-auto leading-relaxed">
              United by a unique bond of communal fraternal organization and anchored on 
              <span className="text-gold-500 font-semibold"> Four Pillars of Eagleism</span> — 
              Brotherhood, Service, Unity, and Divine Power.
            </p>
            
            <div className="flex flex-wrap gap-4 justify-center">
              <Link to="/about-page" className="btn-gold text-lg px-8 py-4">
                Discover More
              </Link>
              <Link to="/login-page" className="btn-outline text-lg px-8 py-4">
                Member Login
              </Link>
            </div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div 
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div className="w-6 h-10 rounded-full border-2 border-gold-500/50 flex justify-center pt-2">
            <div className="w-1.5 h-3 rounded-full bg-gold-500" />
          </div>
        </motion.div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-4 bg-navy-600/50">
        <div className="max-w-6xl mx-auto">
          <motion.div 
            className="grid grid-cols-2 md:grid-cols-4 gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            {STATS.map((stat) => (
              <motion.div key={stat.label} variants={itemVariants} className="text-center">
                <div className="text-4xl md:text-5xl font-bold text-gold-500 mb-2">{stat.value}</div>
                <div className="text-white/60 text-sm md:text-base">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Four Pillars Section */}
      <section className="py-24 px-4 relative">
        {/* Background accent */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-gold-500 blur-3xl" />
        </div>

        <div className="relative max-w-6xl mx-auto">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
              Our Four Pillars of <span className="text-gradient">Eagleism</span>
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-gold-500 to-gold-400 mx-auto rounded-full" />
          </motion.div>
          
          <motion.div 
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
          >
            {PILLARS.map((pillar) => (
              <motion.div
                key={pillar.title}
                variants={itemVariants}
                className="glass-card p-8 text-center group"
              >
                <div className="mb-6 transform group-hover:scale-110 transition-transform duration-300 flex justify-center">
                  <Icon name={pillar.icon} size={48} />
                </div>
                <h3 className="text-xl font-bold text-gold-500 mb-3">{pillar.title}</h3>
                <p className="text-white/70 text-sm leading-relaxed">{pillar.description}</p>
                
                {/* Bottom accent */}
                <div className="w-0 group-hover:w-full h-0.5 bg-gradient-to-r from-gold-500 to-transparent mt-6 mx-auto transition-all duration-500" />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Quote Section */}
      <section className="py-20 px-4 bg-navy-600/30 relative overflow-hidden">
        {/* Background glow */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-gold-500/10 blur-3xl" />
        
        <div className="relative max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-6xl font-bold text-white mb-4 font-display">
              Deo et Patria
            </h2>
            <p className="text-gold-500 text-2xl italic mb-8">"For God and Country"</p>
            <div className="glass-panel p-8 md:p-12 inline-block">
              <p className="text-white/80 text-lg leading-relaxed max-w-2xl">
                The Philippine Eagles shall evolve, establish and implement in the Philippines 
                affiliated regions, Eagles clubs and in other countries a new approach and 
                vision in the quality and scope of humanitarian service.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-4 relative">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Join the <span className="text-gradient">Brotherhood</span>
            </h2>
            <p className="text-white/70 text-lg mb-10 max-w-2xl mx-auto">
              Become part of the first Philippine-born fraternal socio-civic organization. 
              Together, we serve through strong brotherhood.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link to="/about-page" className="btn-gold text-lg px-8 py-4">
                Learn More
              </Link>
              <Link to="/contact-page" className="btn-outline text-lg px-8 py-4">
                Contact Us
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Chatbot */}
      <Chatbot />
    </div>
  )
}
