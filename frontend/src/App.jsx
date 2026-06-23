import { BrowserRouter, Routes, Route, Link, useLocation } from 'react-router-dom'
import { AuthProvider, useAuth } from './utils/AuthContext'
import { useTranslation } from 'react-i18next'
import Home from './pages/Home'
import Scan from './pages/Scan'
import History from './pages/History'
import About from './pages/About'
import Contact from './pages/Contact'
import Recipes from './pages/Recipes'
import Nutrition from './pages/Nutrition'
import ShoppingList from './pages/ShoppingList'
import CookingMode from './pages/CookingMode'
import MealPlanner from './pages/MealPlanner'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Profile from './pages/Profile'
import useDarkMode from './utils/useDarkMode'

function Nav() {
  const { pathname } = useLocation()
  const { t } = useTranslation()
  const links = [
    { to: '/', label: t('nav.home') },
    { to: '/scan', label: t('nav.scan') },
    { to: '/recipes', label: t('nav.recipes') },
    { to: '/nutrition', label: t('nav.nutrition') },
    { to: '/shopping-list', label: t('nav.shoppingList') },
    { to: '/meal-planner', label: t('nav.mealPlanner') },
    { to: '/history', label: t('nav.history') },
    { to: '/about', label: t('nav.about') },
  ]
  return (
    <div className="flex gap-0.5 items-center flex-wrap">
      {links.map(l => (
        <Link key={l.to} to={l.to} aria-current={pathname === l.to ? 'page' : undefined} className={`px-3 py-1.5 text-sm font-medium rounded-lg transition-all whitespace-nowrap ${pathname === l.to ? 'bg-emerald-100 dark:bg-emerald-900/50 text-emerald-700 dark:text-emerald-300' : 'text-slate-600 dark:text-slate-300 hover:text-emerald-600 dark:hover:text-emerald-400 hover:bg-emerald-50/80 dark:hover:bg-emerald-900/30'}`}>
          {l.label}
        </Link>
      ))}
    </div>
  )
}

function AppContent() {
  const { user, loading } = useAuth()
  const [dark, toggleDark] = useDarkMode()
  const { t, i18n } = useTranslation()
  const changeLanguage = (lng) => { i18n.changeLanguage(lng); localStorage.setItem('nutrivision_lang', lng) }
  const currentLang = i18n.language || 'en'

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-emerald-50/30 to-teal-50/30 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 flex flex-col transition-colors duration-300">
      <nav className="sticky top-0 z-50 backdrop-blur-xl bg-white/70 dark:bg-slate-900/70 border-b border-white/20 dark:border-slate-700/30 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 py-2.5 flex items-center justify-between gap-2">
          <Link to="/" className="flex items-center gap-2 group shrink-0">
            <div className="w-8 h-8 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-xl flex items-center justify-center shadow-md group-hover:shadow-lg group-hover:scale-105 transition-all duration-300">
              <span className="text-base">🥗</span>
            </div>
            <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-600 dark:from-emerald-400 dark:to-teal-400 text-base hidden sm:inline">
              NutriVision AI
            </span>
          </Link>
          <Nav />
          <div className="flex gap-1 shrink-0 items-center">
            {loading ? null : user ? (
              <Link to="/profile" className="px-3 py-1.5 text-sm font-medium text-emerald-600 dark:text-emerald-400 hover:bg-emerald-50/80 dark:hover:bg-emerald-900/30 rounded-lg transition-all flex items-center gap-1.5">
                <span>👤</span> <span className="hidden sm:inline">{user.username}</span>
              </Link>
            ) : (
              <>
                <Link to="/login" className="px-3 py-1.5 text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-emerald-600 dark:hover:text-emerald-400 rounded-lg hover:bg-emerald-50/80 dark:hover:bg-emerald-900/30">{t('nav.signIn')}</Link>
                <Link to="/signup" className="px-4 py-1.5 text-sm font-bold bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-lg hover:from-emerald-600 hover:to-teal-700 shadow-sm transition-all">{t('nav.signUp')}</Link>
              </>
            )}
            <Link to="/contact" className="px-3 py-1.5 text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-emerald-600 dark:hover:text-emerald-400 rounded-lg hover:bg-emerald-50/80 dark:hover:bg-emerald-900/30 hidden sm:inline">{t('nav.contact')}</Link>
            <select
              value={currentLang}
              onChange={(e) => changeLanguage(e.target.value)}
              className="text-xs bg-slate-100 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-lg px-2 py-1.5 text-slate-600 dark:text-slate-300 focus:outline-none cursor-pointer"
            >
              <option value="en">EN</option>
              <option value="hi">हि</option>
              <option value="te">తె</option>
            </select>
            <button onClick={toggleDark} className="w-8 h-8 rounded-xl flex items-center justify-center text-base bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 transition-all" title={dark ? 'Light mode' : 'Dark mode'}>
              {dark ? '☀️' : '🌙'}
            </button>
          </div>
        </div>
      </nav>
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/scan" element={<Scan />} />
          <Route path="/recipes" element={<Recipes />} />
          <Route path="/nutrition" element={<Nutrition />} />
          <Route path="/shopping-list" element={<ShoppingList />} />
          <Route path="/cooking-mode" element={<CookingMode />} />
          <Route path="/meal-planner" element={<MealPlanner />} />
          <Route path="/history" element={<History />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/profile" element={user ? <Profile /> : <Login />} />
        </Routes>
      </main>
      <footer className="border-t border-white/20 dark:border-slate-700/30 mt-12">
        <div className="max-w-5xl mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-lg flex items-center justify-center">
                <span className="text-xs">🥗</span>
              </div>
              <span className="text-sm font-semibold text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-600 dark:from-emerald-400 dark:to-teal-400">NutriVision AI</span>
            </div>
            <p className="text-sm text-slate-400 dark:text-slate-500">{t('footer.tagline')}</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </BrowserRouter>
  )
}
