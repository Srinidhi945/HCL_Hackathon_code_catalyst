import React, { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { apiFetch } from '../api.js'

const AuthContext = createContext(null)
const STORAGE_KEY = 'retail_auth'

const normalizeAuth = (data) => {
  if (!data) return null
  return {
    token: data.token,
    userId: data.userId,
    name: data.name,
    role: data.role ? data.role.toUpperCase() : data.role
  }
}

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(() => {
    const stored = localStorage.getItem(STORAGE_KEY)
    return stored ? JSON.parse(stored) : null
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    if (auth) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(auth))
    } else {
      localStorage.removeItem(STORAGE_KEY)
    }
  }, [auth])

  const login = async (email, password) => {
    setLoading(true)
    setError('')
    try {
      const data = await apiFetch('/auth/login', {
        method: 'POST',
        body: JSON.stringify({ email, password })
      })
      setAuth(normalizeAuth(data))
      return data
    } catch (err) {
      setError(err.message)
      throw err
    } finally {
      setLoading(false)
    }
  }

  const register = async ({ name, email, address, role, password }) => {
    setLoading(true)
    setError('')
    try {
      const data = await apiFetch('/auth/register', {
        method: 'POST',
        body: JSON.stringify({ name, email, address, role, password })
      })
      setAuth(normalizeAuth(data))
      return data
    } catch (err) {
      setError(err.message)
      throw err
    } finally {
      setLoading(false)
    }
  }

  const logout = () => {
    setAuth(null)
  }

  const value = useMemo(
    () => ({
      auth,
      loading,
      error,
      login,
      register,
      logout,
      isAuthed: Boolean(auth?.token)
    }),
    [auth, error, loading]
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
