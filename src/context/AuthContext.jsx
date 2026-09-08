// src/context/AuthContext.jsx
import { createContext, useContext, useState, useEffect, useCallback } from 'react'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [initialized, setInitialized] = useState(false)

  const API_URL = import.meta.env.VITE_API_URL || 'https://foe-philippine-eagles-nir-backend.onrender.com'

  // Restore auth from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem('foe_user')
      if (saved) {
        setUser(JSON.parse(saved))
      }
    } catch {
      localStorage.removeItem('foe_user')
    }
    setInitialized(true)
    setLoading(false)
  }, [])

  const login = async (firstName, lastName, password) => {
    const res = await fetch(`${API_URL}/api/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({ first_name: firstName, last_name: lastName, password })
    })
    const data = await res.json()
    if (!res.ok || !data.success) throw new Error(data.message || 'Login failed')
    setUser(data.member)
    localStorage.setItem('foe_user', JSON.stringify(data.member))
    return data.member
  }

  const logout = async () => {
    await fetch(`${API_URL}/api/auth/logout`, { method: 'POST', credentials: 'include' })
    setUser(null)
    localStorage.removeItem('foe_user')
  }

  const fetchMe = useCallback(async () => {
    try {
      const res = await fetch(`${API_URL}/api/auth/me`, { credentials: 'include' })
      if (!res.ok) throw new Error('Not authenticated')
      const data = await res.json()
      setUser(data.member)
      localStorage.setItem('foe_user', JSON.stringify(data.member))
      return data.member
    } catch {
      setUser(null)
      localStorage.removeItem('foe_user')
      return null
    }
  }, [])

  return (
    <AuthContext.Provider value={{ user, loading, login, logout, fetchMe }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
