// src/components/Footer.jsx
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

const QUICK_LINKS = [
  { label: 'About Us', path: '/about-page' },
  { label: 'History', path: '/history-page' },
  { label: 'Advocacy', path: '/advocacy-page' },
  { label: 'Events', path: '/events-page' },
]

const MEMBER_LINKS = [
  { label: 'Member Directory', path: '/members-page' },
  { label: 'Member Login', path: '/login-page' },
  { label: 'Education', path: '/education-page' },
]

export default function Footer() {
  return (
    <footer className="relative bg-navy-600 border-t border-gold-500/20">
      {/* Top gradient line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold-500 to-transparent" />
      
      {/* Subtle background glow */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute bottom-0 left-1/4 w-64 h-64 rounded-full bg-gold-500 blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-48 h-48 rounded-full bg-gold-500 blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full overflow-hidden ring-2 ring-gold-500/50 shadow-glow">
                <img src="/logo.png" alt="FOE Philippine Eagles" className="w-full h-full object-cover" />
              </div>
              <span className="font-display text-lg font-bold text-gold-500">
                FOE Philippine Eagles
              </span>
            </div>
            <p className="text-white/60 text-sm mb-3">
              The Fraternal Order of Eagles - Philippine Eagles, Inc. (TFOE-PE, Inc.)
            </p>
            <p className="text-gold-500 text-sm italic">"Service Through Strong Brotherhood"</p>
            
            {/* Decorative divider */}
            <div className="w-16 h-0.5 bg-gradient-to-r from-gold-500 to-transparent mt-4" />
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-gold-500 font-semibold mb-4 relative inline-block">
              Quick Links
              <span className="absolute bottom-0 left-0 w-full h-px bg-gold-500/50" />
            </h4>
            <ul className="space-y-2">
              {QUICK_LINKS.map((link) => (
                <li key={link.path}>
                  <Link 
                    to={link.path} 
                    className="text-white/60 hover:text-gold-500 text-sm transition-colors duration-200 flex items-center gap-2 group"
                  >
                    <span className="w-1 h-1 rounded-full bg-gold-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Members */}
          <div>
            <h4 className="text-gold-500 font-semibold mb-4 relative inline-block">
              Members
              <span className="absolute bottom-0 left-0 w-full h-px bg-gold-500/50" />
            </h4>
            <ul className="space-y-2">
              {MEMBER_LINKS.map((link) => (
                <li key={link.path}>
                  <Link 
                    to={link.path} 
                    className="text-white/60 hover:text-gold-500 text-sm transition-colors duration-200 flex items-center gap-2 group"
                  >
                    <span className="w-1 h-1 rounded-full bg-gold-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-gold-500 font-semibold mb-4 relative inline-block">
              Contact
              <span className="absolute bottom-0 left-0 w-full h-px bg-gold-500/50" />
            </h4>
            <ul className="space-y-2 text-white/60 text-sm">
              <li>Philippine Eagles National Headquarters</li>
              <li>Quezon City, Metro Manila, Philippines</li>
            </ul>
            
            {/* Social Links */}
            <div className="flex gap-3 mt-6">
              <motion.a 
                href="https://www.facebook.com/profile.php?id=61582301951851" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="w-10 h-10 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-white/60 hover:bg-gold-500 hover:text-navy-500 hover:border-gold-500 transition-all duration-300"
                aria-label="Facebook"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </motion.a>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="section-divider my-8" />

        {/* Copyright */}
        <div className="text-center text-white/40 text-sm">
          <p>© 2024 The Fraternal Order of Eagles - Philippine Eagles, Inc. (TFOE-PE, Inc.)</p>
          <p className="mt-1">SEC Registration No. CN 2017-21277</p>
        </div>
      </div>
    </footer>
  )
}
