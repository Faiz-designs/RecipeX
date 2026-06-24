import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useAuth } from '../utils/AuthContext'
import SEO from '../components/SEO'
import Scanner from '../components/Scanner'
import RecipeCard from '../components/RecipeCard'
import NutritionTable from '../components/NutritionTable'
import AllergyReport from '../components/AllergyReport'
import Substitutions from '../components/Substitutions'
import Improvements from '../components/Improvements'
import SchemaMarkup from '../components/SchemaMarkup'
import ShareButton from '../components/ShareButton'
import HealthBenefits from '../components/HealthBenefits'
import StorageTips from '../components/StorageTips'
import CookingTips from '../components/CookingTips'
import CostEstimation from '../components/CostEstimation'
import SustainabilityScore from '../components/SustainabilityScore'
import ExpiryTracker from '../components/ExpiryTracker'
import { addScanToHistory } from '../utils/scanHistory'
import { addRecipeIngredientsToList } from '../utils/shoppingList'
import { toggleFavorite, isFavorite } from '../utils/favorites'
import VideoSection from '../components/VideoSection'

export default function Scan() {
  const { t } = useTranslation()
  const { user } = useAuth()
  const [result, setResult] = useState(null)
  const [showReport, setShowReport] = useState(false)
  const [showTop, setShowTop] = useState(false)
  const [activeSection, setActiveSection] = useState('')

  const sections = [
    { label: t('scan.sections.vegetables'), id: 'section-veg', emoji: '🥬' },
    { label: t('scan.sections.recipes'), id: 'section-recipes', emoji: '🍳' },
    { label: t('scan.sections.healthBenefits'), id: 'section-health', emoji: '💚' },
    { label: t('scan.sections.nutrition'), id: 'section-nutrition', emoji: '🥦' },
    { label: t('scan.sections.storage'), id: 'section-storage', emoji: '❄️' },
    { label: t('scan.sections.cookingTips'), id: 'section-cooking', emoji: '👨‍🍳' },
    { label: t('scan.sections.allergies'), id: 'section-allergy', emoji: '🩺' },
    { label: t('scan.sections.substitutions'), id: 'section-subs', emoji: '🔄' },
    { label: t('scan.sections.cost'), id: 'section-cost', emoji: '💰' },
    { label: t('scan.sections.improvements'), id: 'section-improve', emoji: '📊' },
  ]

  const handleScanComplete = (data) => {
    setResult(data)
    setShowReport(true)
    addScanToHistory(data.result)
  }

  useEffect(() => {
    if (showReport) window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [showReport])

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 600)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) setActiveSection(entry.target.id)
      })
    }, { rootMargin: '-100px 0px -60% 0px' })
    sections.forEach(s => { const el = document.getElementById(s.id); if (el) observer.observe(el) })
    return () => observer.disconnect()
  }, [showReport])

  const handleReset = () => { setResult(null); setShowReport(false) }
  const r = result?.result

  return (
    <>
      <SEO title="Scan Vegetables" description="Upload a photo or use your camera to identify vegetables and get instant AI analysis." />
      <div className="max-w-5xl mx-auto px-4 py-8">
      {!showReport && (
        <div className="animate-fadeIn">
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-extrabold text-stone-800 dark:text-stone-100 mb-2">{t('scan.title')}</h1>
            <p className="text-stone-500 dark:text-stone-400">{t('scan.subtitle')}</p>
          </div>
          {user ? (
            <Scanner onScanComplete={handleScanComplete} />
          ) : (
            <div className="text-center py-16 glass-card rounded-2xl shadow-sm">
              <div className="w-20 h-20 mx-auto mb-5 rounded-full bg-gradient-to-br from-red-50 to-rose-50 dark:from-red-900/50 dark:to-rose-900/50 border-2 border-red-200 dark:border-red-700/50 flex items-center justify-center text-4xl shadow-lg">🔒</div>
              <p className="text-xl font-bold text-stone-700 dark:text-stone-200 mb-2">{t('auth.signInRequired')}</p>
              <p className="text-sm text-stone-500 dark:text-stone-400 mb-8 max-w-sm mx-auto leading-relaxed">{t('auth.signInDesc')}</p>
              <div className="flex gap-3 justify-center">
                <Link to="/login" className="px-6 py-3 btn-glass btn-glass-red rounded-xl text-sm">
                  {t('nav.signIn')}
                </Link>
                <Link to="/signup" className="px-6 py-3 btn-glass btn-glass-red rounded-xl text-sm">
                  {t('nav.signUp')}
                </Link>
              </div>
            </div>
          )}
        </div>
      )}

      {showReport && r && (
        <div className="animate-fadeIn">
          <div className="glass-card rounded-2xl shadow-sm p-5 md:p-7 mb-8 hover:shadow-lg transition-all duration-300">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-red-700 rounded-2xl flex items-center justify-center shadow-md ring-1 ring-red-600/20"><span className="text-xl">📊</span></div>
                <div>
                  <h1 className="text-2xl md:text-3xl font-extrabold text-stone-800 dark:text-stone-100">{t('scan.results')}</h1>
                  <p className="text-stone-400 dark:text-stone-500 text-sm">{t('scan.vegetablesDetected', { count: r.scan_summary?.total_vegetables_detected })}</p>
                </div>
              </div>
              <div className="flex gap-2">
                <ShareButton title="RecipeX Scan Results" text={`Check out this vegetable scan on RecipeX AI!`} />
                <button onClick={handleReset} className="px-5 py-2.5 btn-glass btn-glass-red rounded-xl active:scale-[0.98] whitespace-nowrap">{t('scan.newScan')}</button>
              </div>
            </div>
          </div>

          <SchemaMarkup recipes={r?.recipes} />

          {r.improvements?.overall_verdict && (
            <div className="glass-card rounded-2xl p-6 md:p-7 mb-8 shadow-sm hover:shadow-lg transition-all duration-300">
              <div className="flex items-start gap-5 flex-col sm:flex-row">
                <div className="flex items-center gap-4 shrink-0">
                  <div className="relative w-20 h-20">
                    <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                      <defs>
                        <linearGradient id="scoreGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                          <stop offset="0%" stopColor="#10b981" />
                          <stop offset="100%" stopColor="#059669" />
                        </linearGradient>
                      </defs>
                      <circle cx="18" cy="18" r="15.5" fill="none" className="stroke-stone-200 dark:stroke-stone-600" strokeWidth="2.5" />
                      <circle cx="18" cy="18" r="15.5" fill="none" stroke={r.improvements.meal_balance_score_out_of_10 >= 8 ? 'url(#scoreGradient)' : r.improvements.meal_balance_score_out_of_10 >= 5 ? '#f59e0b' : '#ef4444'} strokeWidth="2.5" strokeDasharray={`${r.improvements.meal_balance_score_out_of_10 / 10 * 100} 100`} strokeLinecap="round" className="drop-shadow-sm" />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-2xl font-extrabold tracking-tight" style={{ color: r.improvements.meal_balance_score_out_of_10 >= 8 ? '#059669' : r.improvements.meal_balance_score_out_of_10 >= 5 ? '#d97706' : '#dc2626' }}>{r.improvements.meal_balance_score_out_of_10}</span>
                    </div>
                  </div>
                  <div><span className="text-xs font-semibold text-stone-500 dark:text-stone-400 uppercase tracking-wide">{t('scan.score')}</span><p className="text-lg font-bold text-stone-800 dark:text-stone-100">{t('scan.mealBalance')}</p></div>
                </div>
                <p className="text-sm text-stone-600 dark:text-stone-300 leading-relaxed flex-1">{r.improvements.overall_verdict}</p>
              </div>
            </div>
          )}

          <div className="flex flex-wrap gap-2 mb-8 overflow-x-auto pb-1 scrollbar-hide">
            {sections.map(s => (
              <button key={s.id} onClick={() => document.getElementById(s.id)?.scrollIntoView({ behavior: 'smooth' })} className={`text-sm px-4 py-2 rounded-xl border transition-all duration-300 whitespace-nowrap font-bold active:scale-[0.97] ${activeSection === s.id ? 'bg-gradient-to-r from-red-600 to-red-700 text-white border-red-600 shadow-md ring-1 ring-red-600/20' : 'bg-white/80 dark:bg-stone-800/70 backdrop-blur-sm text-stone-600 dark:text-stone-300 border-stone-200/80 dark:border-stone-700/60 hover:border-red-300 dark:hover:border-red-600 hover:text-red-600 dark:hover:text-red-400 shadow-sm hover:shadow-md'}`}>
                <span className="mr-1.5">{s.emoji}</span> {s.label}
              </button>
            ))}
          </div>

          <div className="space-y-8">
            {r.scan_summary?.items && (
              <div id="section-veg" className="scroll-mt-20 glass-card rounded-2xl shadow-sm p-5 md:p-6 hover:shadow-lg transition-all duration-300">
                <div className="flex items-center gap-2.5 mb-5">
                  <div className="w-9 h-9 bg-gradient-to-br from-red-500 to-red-700 rounded-xl flex items-center justify-center text-sm shadow-md ring-1 ring-red-600/20">🥬</div>
                  <h2 className="text-xl font-bold text-stone-800 dark:text-stone-100">{t('scan.sections.vegetables')}</h2>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                  {r.scan_summary.items.map((item) => (
                    <div key={item.id} className="glass-card rounded-2xl p-4 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300">
                      <div className="flex items-center justify-between mb-2">
                        <p className="font-bold text-stone-800 dark:text-stone-100 text-sm sm:text-base">{item.common_name}</p>
                        <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${item.freshness_status === 'Fresh' ? 'bg-red-50 dark:bg-red-900/60 text-red-700 dark:text-red-300' : item.freshness_status === 'Slightly Aged' ? 'bg-amber-100 dark:bg-amber-900/60 text-amber-700 dark:text-amber-300' : 'bg-red-100 dark:bg-red-900/60 text-red-700 dark:text-red-300'}`}>{item.freshness_status}</span>
                      </div>
                      <p className="text-xs text-stone-400 dark:text-stone-500">{item.estimated_quantity} ~ {item.estimated_weight_grams}g</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div id="section-recipes" className="scroll-mt-20 glass-card rounded-2xl shadow-sm p-5 md:p-6 hover:shadow-lg transition-all duration-300">
              <RecipeCard recipes={r.recipes} />
              {r.recipes?.easy?.name && <VideoSection recipeName={r.recipes.easy.name} difficulty="easy" />}
              {r.recipes?.intermediate?.name && <VideoSection recipeName={r.recipes.intermediate.name} difficulty="intermediate" />}
              {r.recipes?.advanced?.name && <VideoSection recipeName={r.recipes.advanced.name} difficulty="advanced" />}
            </div>
            <div id="section-health" className="scroll-mt-20 glass-card rounded-2xl shadow-sm p-5 md:p-6 hover:shadow-lg transition-all duration-300"><HealthBenefits health_benefits={r.health_benefits} /></div>
            <div id="section-nutrition" className="scroll-mt-20 glass-card rounded-2xl shadow-sm p-5 md:p-6 hover:shadow-lg transition-all duration-300"><NutritionTable nutrition={r.nutrition} /></div>
            <div id="section-storage" className="scroll-mt-20 glass-card rounded-2xl shadow-sm p-5 md:p-6 hover:shadow-lg transition-all duration-300"><StorageTips storage_tips={r.storage_tips} /></div>
            <div id="section-cooking" className="scroll-mt-20 glass-card rounded-2xl shadow-sm p-5 md:p-6 hover:shadow-lg transition-all duration-300"><CookingTips cooking_tips={r.cooking_tips} /></div>
            <div id="section-allergy" className="scroll-mt-20 glass-card rounded-2xl shadow-sm p-5 md:p-6 hover:shadow-lg transition-all duration-300"><AllergyReport allergy_report={r.allergy_report} /></div>
            <div id="section-subs" className="scroll-mt-20 glass-card rounded-2xl shadow-sm p-5 md:p-6 hover:shadow-lg transition-all duration-300"><Substitutions substitutions={r.substitutions} /></div>
            <div id="section-cost" className="scroll-mt-20 glass-card rounded-2xl shadow-sm p-5 md:p-6 hover:shadow-lg transition-all duration-300"><CostEstimation cost_estimation={r.cost_estimation} improvements={r.improvements} /></div>
            <div id="section-improve" className="scroll-mt-20 glass-card rounded-2xl shadow-sm p-5 md:p-6 hover:shadow-lg transition-all duration-300"><Improvements improvements={r.improvements} /></div>
          </div>

          <SustainabilityScore vegetables={r.scan_summary?.items?.map(i => i.common_name)} freshnessStatuses={r.scan_summary?.items?.map(i => i.freshness_status)} />
          <ExpiryTracker scanResult={r} />
        </div>
      )}

      {showTop && (
        <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="fixed bottom-6 right-6 w-12 h-12 btn-glass btn-glass-red rounded-2xl flex items-center justify-center text-xl z-50 active:scale-95" title={t('scan.backToTop')}>
          <span className="drop-shadow-sm">↑</span>
        </button>
      )}
    </div>
    </>
  )
}
