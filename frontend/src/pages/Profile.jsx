import { useAuth } from '../utils/AuthContext'
import { Link, useNavigate } from 'react-router-dom'

export default function Profile() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  if (!user) return null

  const handleLogout = () => { logout(); navigate('/') }

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <div className="bg-gradient-to-br from-emerald-600 via-emerald-500 to-teal-600 rounded-2xl p-6 md:p-8 mb-8 text-white">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center text-3xl shadow-md">👤</div>
          <div>
            <h1 className="text-2xl md:text-3xl font-extrabold">{user.full_name || user.username}</h1>
            <p className="text-emerald-100/80 text-sm">@{user.username}</p>
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700 overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-100 dark:border-slate-700">
          <h2 className="font-bold text-slate-800 dark:text-slate-100">Account Details</h2>
        </div>
        <div className="p-6 space-y-4">
          <div className="grid sm:grid-cols-2 gap-4">
            <div><p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wide">Email</p><p className="text-sm text-slate-700 dark:text-slate-200 mt-0.5">{user.email}</p></div>
            <div><p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wide">Age</p><p className="text-sm text-slate-700 dark:text-slate-200 mt-0.5">{user.age || 'Not set'}</p></div>
            <div><p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wide">Allergies</p><p className="text-sm text-slate-700 dark:text-slate-200 mt-0.5">{user.allergies || 'None listed'}</p></div>
            <div><p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wide">Dietary Preferences</p><p className="text-sm text-slate-700 dark:text-slate-200 mt-0.5">{user.dietary_preferences || 'None listed'}</p></div>
          </div>
        </div>
      </div>

      <div className="flex gap-3 mt-6">
        <button onClick={handleLogout} className="px-6 py-2.5 bg-red-50 dark:bg-red-900/40 text-red-600 dark:text-red-400 border border-red-200 dark:border-red-800 rounded-xl font-medium hover:bg-red-100 dark:hover:bg-red-900/60 transition">Sign Out</button>
        <Link to="/scan" className="px-6 py-2.5 bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-xl font-bold hover:from-emerald-600 hover:to-teal-700 transition">Scan Vegetables</Link>
      </div>
    </div>
  )
}
