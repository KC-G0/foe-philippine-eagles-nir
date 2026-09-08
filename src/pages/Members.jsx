// src/pages/Members.jsx
import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { motion } from 'framer-motion'

export default function Members() {
  const { user, loading } = useAuth()
  const navigate = useNavigate()
  const [members, setMembers] = useState([])
  const [filter, setFilter] = useState('')
  const [roleFilter, setRoleFilter] = useState('')

  useEffect(() => {
    if (!loading && !user) {
      navigate('/login-page', { state: { from: '/members-page' } })
      return
    }
    fetch(`${import.meta.env.VITE_API_URL || ''}/api/members`, { credentials: 'include' })
      .then(r => r.json())
      .then(d => setMembers(d.members))
      .catch(console.error)
  }, [user, loading, navigate])

  if (loading) return <div className="py-20 text-center text-white/60">Loading...</div>
  if (!user) {
    navigate('/login-page', { state: { from: '/members-page' } })
    return null
  }

  const filtered = members.filter(m => {
    const search = filter.toLowerCase()
    const fullName = `${m.first_name || ''} ${m.last_name || ''}`.toLowerCase()
    const nameMatch = fullName.includes(search)
    const roleMatch = !roleFilter || m.location === roleFilter
    return nameMatch && roleMatch
  })

  const roles = [...new Set(members.map(m => m.location).filter(Boolean))]

  return (
    <div className="py-16 px-4 relative">
      {/* Background accent */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div className="absolute top-1/3 left-1/4 w-80 h-80 rounded-full bg-gold-500 blur-3xl" />
        <div className="absolute bottom-1/3 right-1/4 w-64 h-64 rounded-full bg-gold-500 blur-3xl" />
      </div>

      <div className="relative max-w-6xl mx-auto">
        <motion.h1 
          className="text-4xl font-bold text-gold-500 mb-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          Member Directory
        </motion.h1>
        <motion.p 
          className="text-white/70 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          Browse the roster of Eagle-members extracted from the constitution.
        </motion.p>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <input
            type="text"
            placeholder="Search by name..."
            value={filter}
            onChange={e => setFilter(e.target.value)}
            className="flex-1 input-field"
          />
          <select
            value={roleFilter}
            onChange={e => setRoleFilter(e.target.value)}
            className="input-field sm:w-48"
          >
            <option value="">All Roles</option>
            {roles.map(r => <option key={r} value={r}>{r}</option>)}
          </select>
        </div>

        {/* Members Table */}
        <div className="glass-panel overflow-hidden border border-gold-500/20">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-white/5">
                <tr>
                  <th className="px-6 py-4 text-left text-gold-500 font-semibold">Name</th>
                  <th className="px-6 py-4 text-left text-gold-500 font-semibold">Location</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((member, idx) => (
                  <motion.tr 
                    key={member.id}
                    className="border-t border-white/10 hover:bg-white/5 transition-colors"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.02 }}
                  >
                    <td className="px-6 py-4 text-white font-medium">{member.first_name} {member.last_name}</td>
                    <td className="px-6 py-4 text-white/70">{member.location || 'Not specified'}</td>
                  </motion.tr>
                ))}
                {filtered.length === 0 && (
                  <tr>
                    <td colSpan={3} className="px-6 py-8 text-center text-white/50">
                      No members found matching your criteria.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        <p className="mt-4 text-white/40 text-sm">
          Showing {filtered.length} of {members.length} members
        </p>
      </div>
    </div>
  )
}
