// src/context/AuthContext.jsx
import { createContext, useContext, useState, useEffect, useCallback } from 'react'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  const fetchMe = useCallback(async () => {
    try {
      const res = await fetch('/api/auth/me', { credentials: 'include' })
      if (!res.ok) throw new Error()
      const data = await res.json()
      setUser(data.member)
    } catch {
      setUser(null)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => { fetchMe() }, [fetchMe])

  const login = async (firstName, lastName, password) => {
    const res = await fetch('/api/login', {
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
    await fetch('/api/auth/logout', { method: 'POST', credentials: 'include' })
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, loading, login, logout, fetchMe }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
