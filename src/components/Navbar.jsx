// src/components/Navbar.jsx
import { useState, useRef, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { motion, AnimatePresence } from 'framer-motion'

const NAV_ITEMS = [
  { label: 'Home', path: '/' },
  {
    label: 'About',
    children: [
      { label: 'About the Fraternity', path: '/about-page' },
      { label: 'History', path: '/history-page' },
      { label: 'Members', path: '/members-page' },
    ]
  },
  {
    label: 'Education',
    children: [
      { label: 'Education Programs', path: '/education-page' },
      { label: 'PEIL', path: '/education-page?section=peil' },
    ]
  },
  {
    label: 'Events & News',
    children: [
      { label: 'Events', path: '/events-page?section=events' },
      { label: 'Announcements', path: '/events-page?section=announcements' },
    ]
  },
  { label: 'Advocacy', path: '/advocacy-page' },
  { label: 'RFID Kiosk', path: '/rfid-page' },
  { label: 'Contact', path: '/contact-page' },
]

export default function Navbar() {
  const { user, logout } = useAuth()
  const location = useLocation()
  const [mobileOpen, setMobileOpen] = useState(false)
  const [openDropdown, setOpenDropdown] = useState(null)
  const navRef = useRef(null)

  useEffect(() => {
    const handler = (e) => {
      if (navRef.current && !navRef.current.contains(e.target)) {
        setOpenDropdown(null)
      }
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  useEffect(() => {
    setOpenDropdown(null)
    setMobileOpen(false)
  }, [location.pathname])

  const handleKeyDown = (e, index) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      setOpenDropdown(openDropdown === index ? null : index)
    } else if (e.key === 'Escape') {
      setOpenDropdown(null)
    } else if (e.key === 'ArrowDown' && openDropdown === index) {
      e.preventDefault()
      const items = navRef.current?.querySelectorAll(`[data-nav-dropdown="${index}"] a`)
      items?.[0]?.focus()
    }
  }

  return (
    <nav ref={navRef} className="sticky top-0 z-50 glass-panel-dark border-b border-gold-500/20" role="navigation" aria-label="Main navigation">
      {/* Subtle gold line at top */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold-500 to-transparent" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group" aria-label="FOE Philippine Eagles Home">
            <div className="w-10 h-10 rounded-full overflow-hidden ring-2 ring-gold-500/50 group-hover:ring-gold-500 transition-all duration-300 shadow-glow">
              <img src="/logo.png" alt="FOE Philippine Eagles" className="w-full h-full object-cover" />
            </div>
            <span className="font-display text-xl font-bold text-gold-500 hidden sm:block group-hover:text-gold-400 transition-colors">
              FOE Philippine Eagles
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-1">
            {NAV_ITEMS.map((item, idx) => (
              <div key={item.label} className="relative">
                {item.children ? (
                  <>
                    <button
                      className="nav-link flex items-center gap-1"
                      aria-expanded={openDropdown === idx}
                      aria-haspopup="true"
                      onClick={() => setOpenDropdown(openDropdown === idx ? null : idx)}
                      onKeyDown={(e) => handleKeyDown(e, idx)}
                    >
                      {item.label}
                      <svg className={`w-4 h-4 transition-transform duration-200 ${openDropdown === idx ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                    <AnimatePresence>
                      {openDropdown === idx && (
                        <motion.div
                          initial={{ opacity: 0, y: -10, scale: 0.95 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: -10, scale: 0.95 }}
                          transition={{ duration: 0.2 }}
                          data-nav-dropdown={idx}
                          className="absolute top-full left-0 mt-2 w-60 glass-panel-dark py-2 shadow-xl border border-gold-500/20"
                        >
                          {item.children.map((child) => (
                            <Link
                              key={child.path}
                              to={child.path}
                              className="block px-4 py-2.5 text-white/80 hover:text-gold-500 hover:bg-gold-500/10 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-gold-500 focus:ring-inset"
                            >
                              {child.label}
                            </Link>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </>
                ) : (
                  <Link
                    to={item.path}
                    className={`nav-link ${location.pathname === item.path ? 'text-gold-500 after:scale-x-100' : ''}`}
                  >
                    {item.label}
                  </Link>
                )}
              </div>
            ))}
          </div>

          {/* Auth buttons */}
          <div className="hidden lg:flex items-center gap-3">
            {user ? (
              <>
                <span className="text-white/60 text-sm">
                  Hi, {user.name.split(' ')[0]}
                </span>
                <button onClick={logout} className="btn-outline text-sm py-2 px-4">
                  Logout
                </button>
              </>
            ) : (
              <Link to="/login-page" className="btn-gold text-sm py-2 px-4">
                Member Login
              </Link>
            )}
          </div>

          {/* Mobile menu button */}
          <button
            className="lg:hidden p-2 text-white hover:text-gold-500 transition-colors"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-expanded={mobileOpen}
            aria-label="Toggle navigation menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {mobileOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden overflow-hidden glass-panel-dark border-t border-gold-500/20"
          >
            <div className="px-4 py-4 space-y-1">
              {NAV_ITEMS.map((item) => (
                <div key={item.label}>
                  {item.children ? (
                    <div className="py-2">
                      <p className="text-gold-500 font-semibold mb-2">{item.label}</p>
                      <div className="pl-4 space-y-1">
                        {item.children.map((child) => (
                          <Link
                            key={child.path}
                            to={child.path}
                            className="block py-2 text-white/70 hover:text-gold-500 transition-colors"
                          >
                            {child.label}
                          </Link>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <Link
                      to={item.path}
                      className={`block py-2 ${location.pathname === item.path ? 'text-gold-500' : 'text-white/80'} hover:text-gold-500 transition-colors`}
                    >
                      {item.label}
                    </Link>
                  )}
                </div>
              ))}
              <div className="pt-4 mt-4 border-t border-white/10">
                {user ? (
                  <button onClick={logout} className="btn-outline w-full text-sm">Logout</button>
                ) : (
                  <Link to="/login-page" className="btn-gold block text-center text-sm">Member Login</Link>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}
