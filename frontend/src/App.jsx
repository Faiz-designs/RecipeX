import { BrowserRouter, Routes, Route, Link, useLocation } from 'react-router-dom'
import { AuthProvider, useAuth } from './utils/AuthContext'
import { useTranslation } from 'react-i18next'
import { lazy, Suspense, useState, useEffect, useRef } from 'react'
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
        <Link key={l.to} to={l.to} aria-current={pathname === l.to ? 'page' : undefined} className={`px-2 py-1.5 text-xs sm:text-sm font-medium rounded-lg transition-all duration-200 whitespace-nowrap flex items-center gap-1 ${pathname === l.to ? 'glass text-lime-700 dark:text-lime-300 ring-1 ring-lime-300/50 dark:ring-lime-500/30' : 'text-stone-600 dark:text-stone-300 hover:text-lime-600 dark:hover:text-lime-400 hover:glass hover:scale-[1.02]'}`}>
          <span className="text-xs sm:text-[15px]">{l.icon}</span>
          <span className="hidden sm:inline">{l.label}</span>
        </Link>
      ))}
    </div>
  )
}

function ScrollProgress() {
  useEffect(() => {
    const bar = document.getElementById('scroll-progress')
    if (!bar) return
    const update = () => {
      const h = document.documentElement.scrollHeight - window.innerHeight
      bar.style.width = h > 0 ? `${(window.scrollY / h) * 100}%` : '0%'
    }
    window.addEventListener('scroll', update, { passive: true })
    return () => window.removeEventListener('scroll', update)
  }, [])
  return <div id="scroll-progress" />
}

function RippleButton({ children, className, ...props }) {
  const btnRef = useRef(null)
  const handleClick = (e) => {
    const btn = btnRef.current
    if (!btn) return
    const rect = btn.getBoundingClientRect()
    const ripple = document.createElement('span')
    const size = Math.max(rect.width, rect.height)
    ripple.style.width = ripple.style.height = `${size}px`
    ripple.style.left = `${e.clientX - rect.left - size / 2}px`
    ripple.style.top = `${e.clientY - rect.top - size / 2}px`
    ripple.className = 'btn-ripple'
    btn.appendChild(ripple)
    ripple.addEventListener('animationend', () => ripple.remove())
    props.onClick?.(e)
  }
  return <button ref={btnRef} className={className} {...props} onClick={handleClick}>{children}</button>
}

function AppContent() {
  const { user, loading } = useAuth()
  const [dark, toggleDark] = useDarkMode()
  const { t, i18n } = useTranslation()
  const changeLanguage = (lng) => { i18n.changeLanguage(lng); localStorage.setItem('nutrivision_lang', lng) }
  const currentLang = i18n.language || 'en'

  return (
    <div className="min-h-screen bg-gradient-to-br from-stone-50 via-lime-50/20 to-white dark:from-stone-900 dark:via-stone-800 dark:to-stone-900 flex flex-col transition-colors duration-300">
      <ScrollProgress />
      <nav className="sticky top-0 z-50 glass-nav shadow-sm">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between gap-2">
          <Link to="/" className="flex items-center gap-2 group shrink-0">
            <div className="w-9 h-9 bg-gradient-to-br from-lime-500 to-lime-600 rounded-xl flex items-center justify-center shadow-md group-hover:shadow-lg group-hover:scale-105 group-hover:shadow-lime-400/20 transition-all duration-300">
              <span className="text-lg">🥗</span>
            </div>
            <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-lime-600 to-lime-600 dark:from-lime-400 dark:to-lime-400 text-sm md:text-base hidden md:inline">
              RecipeX AI
            </span>
          </Link>
          <Nav />
          <div className="flex gap-1.5 shrink-0 items-center">
            {loading ? null : user ? (
              <Link to="/profile" className="px-3 py-1.5 text-sm font-medium text-lime-600 dark:text-lime-400 hover:glass rounded-lg transition-all flex items-center gap-1.5">
                <span>👤</span> <span className="hidden sm:inline">{user.username}</span>
              </Link>
            ) : (
              <>
                <Link to="/login" className="px-3 py-1.5 text-sm font-medium text-stone-600 dark:text-stone-300 hover:text-lime-600 dark:hover:text-lime-400 rounded-lg hover:glass transition-all">{t('nav.signIn')}</Link>
                <Link to="/signup" className="px-4 py-1.5 text-sm btn-glass btn-glass-lime rounded-lg">{t('nav.signUp')}</Link>
              </>
            )}
            <Link to="/contact" className="px-3 py-1.5 text-sm font-medium text-stone-600 dark:text-stone-300 hover:text-lime-600 dark:hover:text-lime-400 rounded-lg hover:glass hidden sm:inline transition-all">{t('nav.contact')}</Link>
            <select
              value={currentLang}
              onChange={(e) => changeLanguage(e.target.value)}
              className="text-xs bg-white/50 dark:bg-stone-800/50 border border-lime-200/30 dark:border-lime-700/30 rounded-lg px-2.5 py-1.5 text-stone-600 dark:text-stone-300 focus:outline-none focus:ring-2 focus:ring-lime-400/50 cursor-pointer backdrop-blur-sm transition-all glass"
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
            <button onClick={toggleDark} className="w-8 h-8 rounded-xl flex items-center justify-center text-base glass hover:bg-lime-100/30 dark:hover:bg-lime-900/30 transition-all" title={dark ? 'Light mode' : 'Dark mode'}>
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
              <div className="w-10 h-10 border-4 border-lime-300/50 border-t-lime-500 rounded-full animate-spin shadow-lg shadow-lime-500/10" />
              <p className="text-sm text-stone-400">Loading...</p>
            </div>
          </div>
        }>
          <Routes>
            <Route path="/" element={<div className="animate-pageEnter"><Home /></div>} />
            <Route path="/scan" element={<div className="animate-pageEnter"><Scan /></div>} />
            <Route path="/recipes" element={<div className="animate-pageEnter"><Recipes /></div>} />
            <Route path="/nutrition" element={<div className="animate-pageEnter"><Nutrition /></div>} />
            <Route path="/shopping-list" element={<div className="animate-pageEnter"><ShoppingList /></div>} />
            <Route path="/cooking-mode" element={<div className="animate-pageEnter"><CookingMode /></div>} />
            <Route path="/meal-planner" element={<div className="animate-pageEnter"><MealPlanner /></div>} />
            <Route path="/history" element={<div className="animate-pageEnter"><History /></div>} />
            <Route path="/about" element={<div className="animate-pageEnter"><About /></div>} />
            <Route path="/contact" element={<div className="animate-pageEnter"><Contact /></div>} />
            <Route path="/login" element={<div className="animate-pageEnter"><Login /></div>} />
            <Route path="/signup" element={<div className="animate-pageEnter"><Signup /></div>} />
            <Route path="/profile" element={<div className="animate-pageEnter">{user ? <Profile /> : <Login />}</div>} />
          </Routes>
        </Suspense>
      </main>
      <footer className="mt-auto">
        <div className="max-w-6xl mx-auto px-4 pb-6 mb-4">
          <div className="glass-footer rounded-2xl p-6">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-gradient-to-br from-lime-500 to-lime-600 rounded-xl flex items-center justify-center shadow-md">
                  <span className="text-sm">🥗</span>
                </div>
                <div>
                  <span className="text-sm font-bold text-transparent bg-clip-text bg-gradient-to-r from-lime-600 to-lime-600 dark:from-lime-400 dark:to-lime-400">RecipeX AI</span>
                  <p className="text-xs text-stone-400 dark:text-stone-500 mt-0.5">{t('footer.tagline')}</p>
                </div>
              </div>
              <div className="flex items-center gap-4 text-sm text-stone-400 dark:text-stone-500">
                <Link to="/about" className="hover:text-lime-600 dark:hover:text-lime-400 transition-colors">{t('nav.about')}</Link>
                <Link to="/contact" className="hover:text-lime-600 dark:hover:text-lime-400 transition-colors">{t('nav.contact')}</Link>
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
