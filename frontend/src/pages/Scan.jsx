import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import SEO from '../components/SEO'
import Scanner from '../components/Scanner'
import RecipeCard from '../components/RecipeCard'
import NutritionTable from '../components/NutritionTable'
import AllergyReport from '../components/AllergyReport'
import Substitutions from '../components/Substitutions'
import Improvements from '../components/Improvements'
import SchemaMarkup from '../components/SchemaMarkup'
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
            <h1 className="text-3xl md:text-4xl font-extrabold text-slate-800 dark:text-slate-100 mb-2">{t('scan.title')}</h1>
            <p className="text-slate-500 dark:text-slate-400">{t('scan.subtitle')}</p>
          </div>
          <Scanner onScanComplete={handleScanComplete} />
        </div>
      )}

      {showReport && r && (
        <div className="animate-fadeIn">
          <div className="bg-white/80 dark:bg-slate-800/70 backdrop-blur-sm rounded-2xl shadow-sm border border-slate-200/80 dark:border-slate-700/60 p-5 md:p-7 mb-8 hover:shadow-lg transition-all duration-300">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-2xl flex items-center justify-center shadow-md ring-1 ring-emerald-500/20"><span className="text-xl">📊</span></div>
                <div>
                  <h1 className="text-2xl md:text-3xl font-extrabold text-slate-800 dark:text-slate-100">{t('scan.results')}</h1>
                  <p className="text-slate-400 dark:text-slate-500 text-sm">{t('scan.vegetablesDetected', { count: r.scan_summary?.total_vegetables_detected })}</p>
                </div>
              </div>
              <button onClick={handleReset} className="px-5 py-2.5 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white rounded-xl font-bold hover:from-emerald-600 hover:to-emerald-700 transition-all duration-300 shadow-md hover:shadow-lg hover:shadow-emerald-500/20 active:scale-[0.98] ring-1 ring-emerald-500/20 whitespace-nowrap">{t('scan.newScan')}</button>
            </div>
          </div>

          <SchemaMarkup recipes={r?.recipes} />

          {r.improvements?.overall_verdict && (
            <div className="bg-gradient-to-br from-emerald-50/80 to-emerald-100/50 dark:from-emerald-900/30 dark:to-emerald-800/20 border border-emerald-200/60 dark:border-emerald-700/30 rounded-2xl p-6 md:p-7 mb-8 shadow-sm hover:shadow-lg transition-all duration-300">
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
                      <circle cx="18" cy="18" r="15.5" fill="none" className="stroke-slate-200 dark:stroke-slate-600" strokeWidth="2.5" />
                      <circle cx="18" cy="18" r="15.5" fill="none" stroke={r.improvements.meal_balance_score_out_of_10 >= 8 ? 'url(#scoreGradient)' : r.improvements.meal_balance_score_out_of_10 >= 5 ? '#f59e0b' : '#ef4444'} strokeWidth="2.5" strokeDasharray={`${r.improvements.meal_balance_score_out_of_10 / 10 * 100} 100`} strokeLinecap="round" className="drop-shadow-sm" />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-2xl font-extrabold tracking-tight" style={{ color: r.improvements.meal_balance_score_out_of_10 >= 8 ? '#059669' : r.improvements.meal_balance_score_out_of_10 >= 5 ? '#d97706' : '#dc2626' }}>{r.improvements.meal_balance_score_out_of_10}</span>
                    </div>
                  </div>
                  <div><span className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wide">{t('scan.score')}</span><p className="text-lg font-bold text-slate-800 dark:text-slate-100">{t('scan.mealBalance')}</p></div>
                </div>
                <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed flex-1">{r.improvements.overall_verdict}</p>
              </div>
            </div>
          )}

          <div className="flex flex-wrap gap-2 mb-8 overflow-x-auto pb-1 scrollbar-hide">
            {sections.map(s => (
              <button key={s.id} onClick={() => document.getElementById(s.id)?.scrollIntoView({ behavior: 'smooth' })} className={`text-sm px-4 py-2 rounded-xl border transition-all duration-300 whitespace-nowrap font-bold active:scale-[0.97] ${activeSection === s.id ? 'bg-gradient-to-r from-emerald-500 to-emerald-600 text-white border-emerald-500 shadow-md ring-1 ring-emerald-500/20' : 'bg-white/80 dark:bg-slate-800/70 backdrop-blur-sm text-slate-600 dark:text-slate-300 border-slate-200/80 dark:border-slate-700/60 hover:border-emerald-300 dark:hover:border-emerald-600 hover:text-emerald-600 dark:hover:text-emerald-400 shadow-sm hover:shadow-md'}`}>
                <span className="mr-1.5">{s.emoji}</span> {s.label}
              </button>
            ))}
          </div>

          <div className="space-y-8">
            {r.scan_summary?.items && (
              <div id="section-veg" className="scroll-mt-20 bg-white/80 dark:bg-slate-800/70 backdrop-blur-sm rounded-2xl shadow-sm border border-slate-200/80 dark:border-slate-700/60 p-5 md:p-6 hover:shadow-lg transition-all duration-300">
                <div className="flex items-center gap-2.5 mb-5">
                  <div className="w-9 h-9 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-xl flex items-center justify-center text-sm shadow-md ring-1 ring-emerald-500/20">🥬</div>
                  <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100">{t('scan.sections.vegetables')}</h2>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                  {r.scan_summary.items.map((item) => (
                    <div key={item.id} className="bg-white dark:bg-slate-800/90 border border-slate-200/80 dark:border-slate-700/60 rounded-2xl p-4 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300">
                      <div className="flex items-center justify-between mb-2">
                        <p className="font-bold text-slate-800 dark:text-slate-100 text-sm sm:text-base">{item.common_name}</p>
                        <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${item.freshness_status === 'Fresh' ? 'bg-emerald-100 dark:bg-emerald-900/60 text-emerald-700 dark:text-emerald-300' : item.freshness_status === 'Slightly Aged' ? 'bg-amber-100 dark:bg-amber-900/60 text-amber-700 dark:text-amber-300' : 'bg-red-100 dark:bg-red-900/60 text-red-700 dark:text-red-300'}`}>{item.freshness_status}</span>
                      </div>
                      <p className="text-xs text-slate-400 dark:text-slate-500">{item.estimated_quantity} ~ {item.estimated_weight_grams}g</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div id="section-recipes" className="scroll-mt-20 bg-white/80 dark:bg-slate-800/70 backdrop-blur-sm rounded-2xl shadow-sm border border-slate-200/80 dark:border-slate-700/60 p-5 md:p-6 hover:shadow-lg transition-all duration-300">
              <RecipeCard recipes={r.recipes} />
              {r.recipes?.easy?.name && <VideoSection recipeName={r.recipes.easy.name} difficulty="easy" />}
              {r.recipes?.intermediate?.name && <VideoSection recipeName={r.recipes.intermediate.name} difficulty="intermediate" />}
              {r.recipes?.advanced?.name && <VideoSection recipeName={r.recipes.advanced.name} difficulty="advanced" />}
            </div>
            <div id="section-health" className="scroll-mt-20 bg-white/80 dark:bg-slate-800/70 backdrop-blur-sm rounded-2xl shadow-sm border border-slate-200/80 dark:border-slate-700/60 p-5 md:p-6 hover:shadow-lg transition-all duration-300"><HealthBenefits health_benefits={r.health_benefits} /></div>
            <div id="section-nutrition" className="scroll-mt-20 bg-white/80 dark:bg-slate-800/70 backdrop-blur-sm rounded-2xl shadow-sm border border-slate-200/80 dark:border-slate-700/60 p-5 md:p-6 hover:shadow-lg transition-all duration-300"><NutritionTable nutrition={r.nutrition} /></div>
            <div id="section-storage" className="scroll-mt-20 bg-white/80 dark:bg-slate-800/70 backdrop-blur-sm rounded-2xl shadow-sm border border-slate-200/80 dark:border-slate-700/60 p-5 md:p-6 hover:shadow-lg transition-all duration-300"><StorageTips storage_tips={r.storage_tips} /></div>
            <div id="section-cooking" className="scroll-mt-20 bg-white/80 dark:bg-slate-800/70 backdrop-blur-sm rounded-2xl shadow-sm border border-slate-200/80 dark:border-slate-700/60 p-5 md:p-6 hover:shadow-lg transition-all duration-300"><CookingTips cooking_tips={r.cooking_tips} /></div>
            <div id="section-allergy" className="scroll-mt-20 bg-white/80 dark:bg-slate-800/70 backdrop-blur-sm rounded-2xl shadow-sm border border-slate-200/80 dark:border-slate-700/60 p-5 md:p-6 hover:shadow-lg transition-all duration-300"><AllergyReport allergy_report={r.allergy_report} /></div>
            <div id="section-subs" className="scroll-mt-20 bg-white/80 dark:bg-slate-800/70 backdrop-blur-sm rounded-2xl shadow-sm border border-slate-200/80 dark:border-slate-700/60 p-5 md:p-6 hover:shadow-lg transition-all duration-300"><Substitutions substitutions={r.substitutions} /></div>
            <div id="section-cost" className="scroll-mt-20 bg-white/80 dark:bg-slate-800/70 backdrop-blur-sm rounded-2xl shadow-sm border border-slate-200/80 dark:border-slate-700/60 p-5 md:p-6 hover:shadow-lg transition-all duration-300"><CostEstimation cost_estimation={r.cost_estimation} improvements={r.improvements} /></div>
            <div id="section-improve" className="scroll-mt-20 bg-white/80 dark:bg-slate-800/70 backdrop-blur-sm rounded-2xl shadow-sm border border-slate-200/80 dark:border-slate-700/60 p-5 md:p-6 hover:shadow-lg transition-all duration-300"><Improvements improvements={r.improvements} /></div>
          </div>

          <SustainabilityScore vegetables={r.scan_summary?.items?.map(i => i.common_name)} freshnessStatuses={r.scan_summary?.items?.map(i => i.freshness_status)} />
          <ExpiryTracker scanResult={r} />
        </div>
      )}

      {showTop && (
        <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="fixed bottom-6 right-6 w-12 h-12 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white rounded-2xl shadow-lg hover:shadow-xl hover:shadow-emerald-500/20 hover:-translate-y-0.5 transition-all duration-300 flex items-center justify-center text-xl z-50 active:scale-95 ring-1 ring-emerald-500/20" title={t('scan.backToTop')}>
          <span className="drop-shadow-sm">↑</span>
        </button>
      )}
    </div>
    </>
  )
}
