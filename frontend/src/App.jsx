import { BrowserRouter, Routes, Route, Link, useLocation } from 'react-router-dom'
import { AuthProvider, useAuth } from './utils/AuthContext'
import { useTranslation } from 'react-i18next'
import { lazy, Suspense } from 'react'
import { HelmetProvider } from 'react-helmet-async'
import useDarkMode from './utils/useDarkMode'

const Home = lazy(() => import('./pages/Home'))
const Scan = lazy(() => import('./pages/Scan'))
const History = lazy(() => import('./pages/History'))
const About = lazy(() => import('./pages/About'))
const Contact = lazy(() => import('./pages/Contact'))
const Recipes = lazy(() => import('./pages/Recipes'))
const Nutrition = lazy(() => import('./pages/Nutrition'))
const ShoppingList = lazy(() => import('./pages/ShoppingList'))
const CookingMode = lazy(() => import('./pages/CookingMode'))
const MealPlanner = lazy(() => import('./pages/MealPlanner'))
const Login = lazy(() => import('./pages/Login'))
const Signup = lazy(() => import('./pages/Signup'))
const Profile = lazy(() => import('./pages/Profile'))
import OnboardingTour from './components/OnboardingTour'
import { ToastProvider } from './utils/ToastContext'
import SiteLockGate from './components/SiteLockGate'

function Nav() {
  const { pathname } = useLocation()
  const { t } = useTranslation()
  const links = [
    { to: '/', label: t('nav.home'), icon: '🏠' },
    { to: '/scan', label: t('nav.scan'), icon: '📷' },
    { to: '/recipes', label: t('nav.recipes'), icon: '🍳' },
    { to: '/nutrition', label: t('nav.nutrition'), icon: '🥗' },
    { to: '/shopping-list', label: t('nav.shoppingList'), icon: '🛒' },
    { to: '/meal-planner', label: t('nav.mealPlanner'), icon: '📅' },
    { to: '/history', label: t('nav.history'), icon: '📜' },
    { to: '/about', label: t('nav.about'), icon: 'ℹ️' },
  ]
  return (
    <div className="flex gap-0.5 items-center overflow-x-auto scrollbar-none">
      {links.map(l => (
        <Link key={l.to} to={l.to} aria-current={pathname === l.to ? 'page' : undefined} className={`px-2 py-1.5 text-xs sm:text-sm font-medium rounded-lg transition-all duration-200 whitespace-nowrap flex items-center gap-1 ${pathname === l.to ? 'bg-red-50 dark:bg-red-900/40 text-red-700 dark:text-red-300 ring-1 ring-red-200 dark:ring-red-700/50' : 'text-stone-600 dark:text-stone-300 hover:text-red-600 dark:hover:text-red-400 hover:bg-red-50/80 dark:hover:bg-red-900/30 hover:scale-[1.02]'}`}>
          <span className="text-xs sm:text-[15px]">{l.icon}</span>
          <span className="hidden sm:inline">{l.label}</span>
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
    <div className="min-h-screen bg-gradient-to-br from-stone-50 via-red-50/20 to-white dark:from-stone-900 dark:via-stone-800 dark:to-stone-900 flex flex-col transition-colors duration-300">
      <nav className="sticky top-0 z-50 glass-nav shadow-sm">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between gap-2">
          <Link to="/" className="flex items-center gap-2 group shrink-0">
            <div className="w-9 h-9 bg-gradient-to-br from-red-500 to-rose-600 rounded-xl flex items-center justify-center shadow-md group-hover:shadow-lg group-hover:scale-105 group-hover:shadow-red-500/20 transition-all duration-300">
              <span className="text-lg">🥗</span>
            </div>
            <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-rose-700 dark:from-red-400 dark:to-rose-400 text-sm md:text-base hidden md:inline">
              RecipeX AI
            </span>
          </Link>
          <Nav />
          <div className="flex gap-1.5 shrink-0 items-center">
            {loading ? null : user ? (
              <Link to="/profile" className="px-3 py-1.5 text-sm font-medium text-red-600 dark:text-red-400 hover:bg-red-50/80 dark:hover:bg-red-900/30 rounded-lg transition-all flex items-center gap-1.5">
                <span>👤</span> <span className="hidden sm:inline">{user.username}</span>
              </Link>
            ) : (
              <>
                <Link to="/login" className="px-3 py-1.5 text-sm font-medium text-stone-600 dark:text-stone-300 hover:text-red-600 dark:hover:text-red-400 rounded-lg hover:bg-red-50/80 dark:hover:bg-red-900/30 transition-all">{t('nav.signIn')}</Link>
                <Link to="/signup" className="px-4 py-1.5 text-sm btn-glass btn-glass-red rounded-lg">{t('nav.signUp')}</Link>
              </>
            )}
            <Link to="/contact" className="px-3 py-1.5 text-sm font-medium text-stone-600 dark:text-stone-300 hover:text-red-600 dark:hover:text-red-400 rounded-lg hover:bg-red-50/80 dark:hover:bg-red-900/30 hidden sm:inline transition-all">{t('nav.contact')}</Link>
            <select
              value={currentLang}
              onChange={(e) => changeLanguage(e.target.value)}
              className="text-xs bg-white/50 dark:bg-stone-800/50 border border-red-200/30 dark:border-red-700/30 rounded-lg px-2.5 py-1.5 text-stone-600 dark:text-stone-300 focus:outline-none focus:ring-2 focus:ring-red-400/50 cursor-pointer backdrop-blur-sm transition-all"
            >
              <option value="en">EN</option>
              <option value="hi">हि</option>
              <option value="te">తె</option>
              <option value="ta">த</option>
              <option value="kn">ಕ</option>
              <option value="ml">മ</option>
              <option value="bn">বা</option>
              <option value="mr">मरा</option>
            </select>
            <button onClick={toggleDark} className="w-8 h-8 rounded-xl flex items-center justify-center text-base bg-white/50 dark:bg-stone-800/50 border border-red-200/30 dark:border-red-700/30 hover:bg-red-50 dark:hover:bg-red-900/30 transition-all backdrop-blur-sm" title={dark ? 'Light mode' : 'Dark mode'}>
              {dark ? '☀️' : '🌙'}
            </button>
          </div>
        </div>
      </nav>
      <main className="flex-1">
        <OnboardingTour />
        <Suspense fallback={
          <div className="flex items-center justify-center min-h-[60vh]">
            <div className="flex flex-col items-center gap-3">
              <div className="w-10 h-10 border-4 border-red-200 border-t-red-600 rounded-full animate-spin" />
              <p className="text-sm text-stone-400">Loading...</p>
            </div>
          </div>
        }>
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
        </Suspense>
      </main>
      <footer className="mt-auto">
        <div className="relative">
          <div className="h-px bg-gradient-to-r from-transparent via-red-300/50 dark:via-red-600/30 to-transparent" />
          <div className="max-w-6xl mx-auto px-4 py-10 glass-card mt-4 rounded-2xl">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-gradient-to-br from-red-500 to-rose-600 rounded-xl flex items-center justify-center shadow-md">
                  <span className="text-sm">🥗</span>
                </div>
                <div>
                  <span className="text-sm font-bold text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-rose-700 dark:from-red-400 dark:to-rose-400">RecipeX AI</span>
                  <p className="text-xs text-stone-400 dark:text-stone-500 mt-0.5">{t('footer.tagline')}</p>
                </div>
              </div>
              <div className="flex items-center gap-4 text-sm text-stone-400 dark:text-stone-500">
                <Link to="/about" className="hover:text-red-600 dark:hover:text-red-400 transition-colors">{t('nav.about')}</Link>
                <Link to="/contact" className="hover:text-red-600 dark:hover:text-red-400 transition-colors">{t('nav.contact')}</Link>
              </div>
            </div>
            <div className="mt-8 text-center text-xs text-stone-400 dark:text-stone-600">
              &copy; {new Date().getFullYear()} RecipeX AI. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default function App() {
  return (
    <HelmetProvider>
      <BrowserRouter>
        <AuthProvider>
          <ToastProvider>
            <SiteLockGate>
              <AppContent />
            </SiteLockGate>
          </ToastProvider>
        </AuthProvider>
      </BrowserRouter>
    </HelmetProvider>
  )
}
