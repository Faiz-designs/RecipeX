import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useAuth } from '../utils/AuthContext'

export default function Login() {
  const { t } = useTranslation()
  const { login } = useAuth()
  const navigate = useNavigate()
  const [form, setForm] = useState({ username: '', password: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true); setError('')
    try {
      await login(form.username, form.password)
      navigate('/scan')
    } catch (err) {
      setError(err.response?.data?.detail || t('auth.loginFailed'))
    } finally { setLoading(false) }
  }

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        <div className="relative bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-2xl shadow-xl border border-slate-200/80 dark:border-slate-700/60 p-8">
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-emerald-500/5 to-transparent pointer-events-none" />
          <div className="relative">
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-gradient-to-br from-emerald-400 to-emerald-500 rounded-2xl flex items-center justify-center mx-auto mb-5 shadow-lg shadow-emerald-500/20 text-2xl">🔐</div>
              <h1 className="text-2xl font-extrabold text-slate-800 dark:text-slate-100">{t('auth.welcomeBack')}</h1>
              <p className="text-sm text-slate-400 dark:text-slate-500 mt-1.5">{t('auth.signInDesc')}</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">{t('auth.username')}</label>
                <input value={form.username} onChange={e => setForm({...form, username: e.target.value})} required className="w-full px-4 py-3 bg-white dark:bg-slate-700/80 border border-slate-200/80 dark:border-slate-600/60 rounded-xl text-sm text-slate-700 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-400/60 focus:border-emerald-400 transition-all shadow-sm placeholder-slate-400 dark:placeholder-slate-500" placeholder={t('auth.username')} />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">{t('auth.password')}</label>
                <input type="password" value={form.password} onChange={e => setForm({...form, password: e.target.value})} required className="w-full px-4 py-3 bg-white dark:bg-slate-700/80 border border-slate-200/80 dark:border-slate-600/60 rounded-xl text-sm text-slate-700 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-400/60 focus:border-emerald-400 transition-all shadow-sm placeholder-slate-400 dark:placeholder-slate-500" placeholder={t('auth.password')} />
              </div>

              {error && (
                <div className="p-3.5 bg-red-50/80 dark:bg-red-900/30 backdrop-blur-sm border border-red-200/60 dark:border-red-800/60 rounded-xl text-sm text-red-600 dark:text-red-400 flex items-center gap-2.5">
                  <span className="w-6 h-6 rounded-full bg-red-100 dark:bg-red-900/50 flex items-center justify-center shrink-0 text-xs">⚠</span>
                  {error}
                </div>
              )}

              <button type="submit" disabled={loading} className="w-full py-3 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white rounded-xl font-bold hover:from-emerald-600 hover:to-emerald-700 disabled:from-slate-300 disabled:to-slate-300 dark:disabled:from-slate-600 dark:disabled:to-slate-600 disabled:cursor-not-allowed transition-all shadow-md hover:shadow-lg hover:shadow-emerald-500/20 active:scale-[0.98] flex items-center justify-center gap-2.5">
                {loading ? <><span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> {t('auth.signingIn')}</> : t('auth.signIn')}
              </button>
            </form>

            <p className="text-center text-sm text-slate-500 dark:text-slate-400 mt-7 pt-5 border-t border-slate-200/60 dark:border-slate-700/40">
              {t('auth.noAccount')} <Link to="/signup" className="text-emerald-600 dark:text-emerald-400 font-semibold hover:text-emerald-700 dark:hover:text-emerald-300 transition-colors">{t('auth.createOne')}</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
