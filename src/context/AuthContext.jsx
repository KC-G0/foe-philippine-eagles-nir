// src/context/AuthContext.jsx
import { createContext, useContext, useState, useEffect, useCallback } from 'react'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    // Restore auth from localStorage on mount
    try {
      const saved = localStorage.getItem('foe_user');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });
  const [loading, setLoading] = useState(true)

  const API_URL = import.meta.env.VITE_API_URL || ''

  // Persist user to localStorage whenever it changes
  useEffect(() => {
    if (user) {
      localStorage.setItem('foe_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('foe_user');
    }
  }, [user])

  const fetchMe = useCallback(async () => {
    try {
      const res = await fetch(`${API_URL}/api/auth/me`, { credentials: 'include' })
      if (!res.ok) throw new Error()
      const data = await res.json()
      setUser(data.member)
    } catch {
      setUser(null)
    } finally {
      setLoading(false)
    }
  }, [])

  // Don't auto-fetch on mount — backend doesn't have sessions
  // User state is set during login and persists in memory
  useEffect(() => {
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
    return data.member
  }

  const logout = async () => {
    await fetch(`${API_URL}/api/auth/logout`, { method: 'POST', credentials: 'include' })
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, loading, login, logout, fetchMe }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
