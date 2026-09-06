// src/pages/Login.jsx
import { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { motion } from 'framer-motion'

export default function Login() {
  const { login } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const from = location.state?.from || '/members-page'

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      await login(firstName, lastName, password)
      navigate(from, { replace: true })
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12">
      {/* Background glow */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-gold-500/10 blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full bg-gold-500/10 blur-3xl" />
      </div>

      <motion.div 
        className="glass-panel p-8 w-full max-w-md relative z-10 border border-gold-500/20"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Header */}
        <div className="text-center mb-8">
          <motion.div 
            className="w-20 h-20 mx-auto mb-4 rounded-full overflow-hidden ring-4 ring-gold-500/50 shadow-glow"
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <img src="/logo.png" alt="FOE Philippine Eagles" className="w-full h-full object-cover" />
          </motion.div>
          <h1 className="text-2xl font-bold text-gold-500">Member Login</h1>
          <p className="text-white/60 text-sm mt-2">Access your Philippine Eagles account</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label htmlFor="firstName" className="block text-white/70 text-sm mb-2">First Name</label>
            <input
              type="text"
              id="firstName"
              value={firstName}
              onChange={e => setFirstName(e.target.value)}
              className="input-field w-full"
              placeholder="Enter your first name"
              required
            />
          </div>
          <div>
            <label htmlFor="lastName" className="block text-white/70 text-sm mb-2">Last Name</label>
            <input
              type="text"
              id="lastName"
              value={lastName}
              onChange={e => setLastName(e.target.value)}
              className="input-field w-full"
              placeholder="Enter your last name"
              required
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-white/70 text-sm mb-2">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              className="input-field w-full"
              placeholder="••••••••"
              required
            />
          </div>

          {error && (
            <motion.div 
              className="bg-red-500/20 border border-red-500/50 text-red-300 px-4 py-3 rounded-lg text-sm"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
            >
              {error}
            </motion.div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="btn-gold w-full text-center disabled:opacity-50"
          >
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>

        <p className="mt-6 text-center text-white/40 text-xs">
          Demo login: use your full name from the constitution
        </p>
      </motion.div>
    </div>
  )
}
