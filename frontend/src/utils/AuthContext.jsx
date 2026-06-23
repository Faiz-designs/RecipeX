import { createContext, useContext, useState, useEffect, useCallback } from 'react'
import axios from 'axios'

const API = 'https://FaizBasha05.pythonanywhere.com'
const TOKEN_KEY = 'nutrivision_token'
const USER_KEY = 'nutrivision_user'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  const fetchProfile = useCallback(async (token) => {
    try {
      const res = await axios.get(`${API}/auth/me`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      setUser(res.data)
      localStorage.setItem(USER_KEY, JSON.stringify(res.data))
    } catch {
      localStorage.removeItem(TOKEN_KEY)
      localStorage.removeItem(USER_KEY)
      setUser(null)
    }
  }, [])

  useEffect(() => {
    const token = localStorage.getItem(TOKEN_KEY)
    const saved = localStorage.getItem(USER_KEY)
    if (token && saved) {
      setUser(JSON.parse(saved))
      fetchProfile(token).finally(() => setLoading(false))
    } else {
      setLoading(false)
    }
  }, [fetchProfile])

  const login = async (username, password) => {
    const res = await axios.post(`${API}/auth/login`, { username, password })
    const { access_token, user_id } = res.data
    localStorage.setItem(TOKEN_KEY, access_token)
    await fetchProfile(access_token)
    return res.data
  }

  const register = async (data) => {
    const res = await axios.post(`${API}/auth/register`, data)
    return res.data
  }

  const logout = () => {
    localStorage.removeItem(TOKEN_KEY)
    localStorage.removeItem(USER_KEY)
    setUser(null)
  }

  const getToken = () => localStorage.getItem(TOKEN_KEY)

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout, getToken }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
