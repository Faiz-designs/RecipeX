import { useTranslation } from 'react-i18next'
import { useAuth } from '../utils/AuthContext'
import { Link, useNavigate } from 'react-router-dom'
import SEO from '../components/SEO'

export default function Profile() {
  const { t } = useTranslation()
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  if (!user) return null

  const handleLogout = () => { logout(); navigate('/') }

  return (
    <>
      <SEO title="Profile" description="Your RecipeX AI account profile." />
      <div className="max-w-3xl mx-auto px-4 py-8">
      <div className="bg-gradient-to-br from-emerald-600 via-emerald-500 to-teal-600 rounded-2xl p-6 md:p-8 mb-8 text-white shadow-xl shadow-emerald-500/10">
        <div className="flex items-center gap-4">
          <div className="relative">
            <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center text-4xl shadow-inner border border-white/20">👤</div>
            <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-emerald-400 rounded-full border-2 border-emerald-600 flex items-center justify-center shadow-sm">
              <span className="text-white text-xs">✓</span>
            </div>
          </div>
          <div>
            <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight">{user.full_name || user.username}</h1>
            <p className="text-emerald-100/80 text-sm flex items-center gap-1.5">@{user.username}</p>
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-slate-800/90 rounded-2xl shadow-sm border border-slate-200/80 dark:border-slate-700/60 overflow-hidden hover:shadow-md transition-shadow">
        <div className="px-6 py-4 border-b border-slate-200/60 dark:border-slate-700/40 flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-emerald-400" />
          <h2 className="font-bold text-slate-800 dark:text-slate-100">{t('auth.accountDetails')}</h2>
        </div>
        <div className="p-6">
          <div className="grid sm:grid-cols-2 gap-5">
            <div className="bg-slate-50/50 dark:bg-slate-700/20 rounded-xl p-4 border border-slate-100/80 dark:border-slate-700/40">
              <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wide mb-1">{t('auth.email')}</p>
              <p className="text-sm font-medium text-slate-700 dark:text-slate-200">{user.email}</p>
            </div>
            <div className="bg-slate-50/50 dark:bg-slate-700/20 rounded-xl p-4 border border-slate-100/80 dark:border-slate-700/40">
              <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wide mb-1">{t('auth.age')}</p>
              <p className="text-sm font-medium text-slate-700 dark:text-slate-200">{user.age || t('auth.notSet')}</p>
            </div>
            <div className="bg-slate-50/50 dark:bg-slate-700/20 rounded-xl p-4 border border-slate-100/80 dark:border-slate-700/40">
              <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wide mb-1">{t('auth.allergies')}</p>
              <p className="text-sm font-medium text-slate-700 dark:text-slate-200">{user.allergies || t('auth.noneListed')}</p>
            </div>
            <div className="bg-slate-50/50 dark:bg-slate-700/20 rounded-xl p-4 border border-slate-100/80 dark:border-slate-700/40">
              <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wide mb-1">{t('auth.dietaryPreferences')}</p>
              <p className="text-sm font-medium text-slate-700 dark:text-slate-200">{user.dietary_preferences || t('auth.noneListed')}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex gap-3 mt-6">
        <button onClick={handleLogout} className="px-6 py-2.5 btn-glass btn-glass-red rounded-xl active:scale-[0.98] flex items-center gap-2">
          {t('nav.signOut')}
        </button>
        <Link to="/scan" className="px-6 py-2.5 btn-glass btn-glass-emerald rounded-xl active:scale-[0.98] flex items-center gap-2">
          {t('nav.scan')}
        </Link>
      </div>
    </div>
    </>
  )
}
