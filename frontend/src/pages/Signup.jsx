import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useAuth } from '../utils/AuthContext'

export default function Signup() {
  const { t } = useTranslation()
  const { register, login } = useAuth()
  const navigate = useNavigate()
  const [form, setForm] = useState({ username: '', email: '', password: '', confirm: '', full_name: '', age: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (form.password !== form.confirm) { setError(t('auth.passwordMismatch')); return }
    setLoading(true); setError('')
    try {
      await register({
        username: form.username,
        email: form.email,
        password: form.password,
        full_name: form.full_name,
        age: parseInt(form.age) || 0,
      })
      await login(form.username, form.password)
      navigate('/scan')
    } catch (err) {
      setError(err.response?.data?.detail || t('auth.registerFailed'))
    } finally { setLoading(false) }
  }

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-2xl shadow-lg border border-slate-100 dark:border-slate-700 p-8">
          <div className="text-center mb-8">
            <div className="w-14 h-14 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-md text-2xl">📝</div>
            <h1 className="text-2xl font-extrabold text-slate-800 dark:text-slate-100">{t('auth.createAccount')}</h1>
            <p className="text-sm text-slate-400 dark:text-slate-500 mt-1">{t('auth.signUpDesc')}</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-3.5">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">{t('auth.fullName')}</label>
                <input value={form.full_name} onChange={e => setForm({...form, full_name: e.target.value})} className="w-full px-3 py-2.5 bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-xl text-sm text-slate-700 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-400 transition-all" placeholder={t('auth.fullName')} />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">{t('auth.age')}</label>
                <input type="number" value={form.age} onChange={e => setForm({...form, age: e.target.value})} className="w-full px-3 py-2.5 bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-xl text-sm text-slate-700 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-400 transition-all" placeholder={t('auth.age')} />
              </div>
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">{t('auth.username')} *</label>
              <input value={form.username} onChange={e => setForm({...form, username: e.target.value})} required className="w-full px-3 py-2.5 bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-xl text-sm text-slate-700 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-400 transition-all" placeholder={t('auth.username')} />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">{t('auth.email')} *</label>
              <input type="email" value={form.email} onChange={e => setForm({...form, email: e.target.value})} required className="w-full px-3 py-2.5 bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-xl text-sm text-slate-700 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-400 transition-all" placeholder={t('auth.email')} />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">{t('auth.password')} *</label>
                <input type="password" value={form.password} onChange={e => setForm({...form, password: e.target.value})} required minLength={6} className="w-full px-3 py-2.5 bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-xl text-sm text-slate-700 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-400 transition-all" placeholder={t('auth.password')} />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">{t('auth.confirmPassword')} *</label>
                <input type="password" value={form.confirm} onChange={e => setForm({...form, confirm: e.target.value})} required className="w-full px-3 py-2.5 bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-xl text-sm text-slate-700 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-400 transition-all" placeholder={t('auth.confirmPassword')} />
              </div>
            </div>

            {error && <div className="p-3 bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800 rounded-xl text-sm text-red-600 dark:text-red-400">⚠ {error}</div>}

            <button type="submit" disabled={loading} className="w-full py-3 bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-xl font-bold hover:from-emerald-600 hover:to-teal-700 disabled:from-slate-300 disabled:to-slate-300 dark:disabled:from-slate-600 dark:disabled:to-slate-600 disabled:cursor-not-allowed transition-all shadow-md hover:shadow-lg active:scale-[0.98] flex items-center justify-center gap-2">
              {loading ? <><span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> {t('auth.creating')}</> : t('auth.createAccount_btn')}
            </button>
          </form>

          <p className="text-center text-sm text-slate-500 dark:text-slate-400 mt-6">
            {t('auth.hasAccount')} <Link to="/login" className="text-emerald-600 dark:text-emerald-400 font-semibold hover:text-emerald-700 dark:hover:text-emerald-300">{t('auth.signIn')}</Link>
          </p>
        </div>
      </div>
    </div>
  )
}
