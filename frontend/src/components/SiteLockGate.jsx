import { useState, useEffect } from 'react'

const API = 'https://FaizBasha05.pythonanywhere.com'
const VERIFIED_KEY = 'recipex_site_unlocked'

export default function SiteLockGate({ children }) {
  const [state, setState] = useState('loading')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    if (sessionStorage.getItem(VERIFIED_KEY)) {
      setState('unlocked')
      return
    }
    fetch(`${API}/site-lock/`)
      .then(r => r.json())
      .then(data => {
        if (data.locked) setState('locked')
        else { sessionStorage.setItem(VERIFIED_KEY, '1'); setState('unlocked') }
      })
      .catch(() => setState('unlocked'))
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!password.trim()) return
    setSubmitting(true)
    setError('')
    try {
      const res = await fetch(`${API}/site-lock/verify`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password: password.trim() }),
      })
      const data = await res.json()
      if (data.valid) {
        sessionStorage.setItem(VERIFIED_KEY, '1')
        setState('unlocked')
      } else {
        setError('Incorrect password')
      }
    } catch {
      setError('Failed to verify. Try again.')
    }
    setSubmitting(false)
  }

  if (state === 'loading') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-emerald-50/20 to-white dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-emerald-200 border-t-emerald-500 rounded-full animate-spin" />
      </div>
    )
  }

  if (state === 'unlocked') return children

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-emerald-50/20 to-white dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white dark:bg-slate-800/90 rounded-3xl shadow-2xl border border-slate-200/80 dark:border-slate-700/60 p-8 text-center">
        <div className="w-20 h-20 mx-auto mb-5 rounded-full bg-gradient-to-br from-emerald-100 to-teal-100 dark:from-emerald-900/50 dark:to-teal-900/50 border-2 border-emerald-200 dark:border-emerald-700/50 flex items-center justify-center text-4xl shadow-lg">
          🔒
        </div>
        <h1 className="text-2xl font-extrabold text-slate-800 dark:text-slate-100 mb-2">RecipeX AI</h1>
        <p className="text-sm text-slate-500 dark:text-slate-400 mb-6">This site is temporarily locked. Enter the password to continue.</p>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="password"
            value={password}
            onChange={e => { setPassword(e.target.value); setError('') }}
            placeholder="Enter site password"
            autoFocus
            className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-700/60 border border-slate-200 dark:border-slate-600 rounded-xl text-sm text-center text-slate-800 dark:text-slate-200 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-400/50 transition-all"
          />
          {error && (
            <p className="text-sm text-red-500 dark:text-red-400 bg-red-50 dark:bg-red-900/20 rounded-lg px-3 py-2">{error}</p>
          )}
          <button
            type="submit"
            disabled={submitting || !password.trim()}
            className="w-full py-3 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white rounded-xl font-bold text-base hover:from-emerald-600 hover:to-emerald-700 disabled:from-slate-300 disabled:to-slate-300 dark:disabled:from-slate-600 dark:disabled:to-slate-600 disabled:cursor-not-allowed transition-all shadow-lg shadow-emerald-500/20"
          >
            {submitting ? 'Verifying...' : 'Unlock'}
          </button>
        </form>
      </div>
    </div>
  )
}
