import { useState, useEffect } from 'react'
import Scanner from '../components/Scanner'
import RecipeCard from '../components/RecipeCard'
import NutritionTable from '../components/NutritionTable'
import AllergyReport from '../components/AllergyReport'
import Substitutions from '../components/Substitutions'
import Improvements from '../components/Improvements'
import { addScanToHistory } from '../utils/scanHistory'

const sections = [
  { label: 'Vegetables', id: 'section-veg', emoji: '🥬' },
  { label: 'Recipes', id: 'section-recipes', emoji: '🍳' },
  { label: 'Nutrition', id: 'section-nutrition', emoji: '🥦' },
  { label: 'Allergies', id: 'section-allergy', emoji: '🩺' },
  { label: 'Substitutions', id: 'section-subs', emoji: '🔄' },
  { label: 'Improvements', id: 'section-improve', emoji: '📊' },
]

export default function Scan() {
  const [result, setResult] = useState(null)
  const [showReport, setShowReport] = useState(false)
  const [showTop, setShowTop] = useState(false)
  const [activeSection, setActiveSection] = useState('')

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
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id)
        }
      })
    }, { rootMargin: '-100px 0px -60% 0px' })
    sections.forEach(s => {
      const el = document.getElementById(s.id)
      if (el) observer.observe(el)
    })
    return () => observer.disconnect()
  }, [showReport])

  const handleReset = () => {
    setResult(null)
    setShowReport(false)
  }

  const r = result?.result

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      {!showReport && (
        <div className="animate-fadeIn">
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-extrabold text-slate-800 mb-2">Smart Vegetable Scanner</h1>
            <p className="text-slate-500">Upload a photo, use your camera, or try the demo</p>
          </div>
          <Scanner onScanComplete={handleScanComplete} />
        </div>
      )}

      {showReport && r && (
        <div className="animate-fadeIn">
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-slate-100 p-4 md:p-6 mb-8">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-2xl flex items-center justify-center shadow-md">
                  <span className="text-xl">📊</span>
                </div>
                <div>
                  <h1 className="text-2xl md:text-3xl font-extrabold text-slate-800">Scan Results</h1>
                  <p className="text-slate-400 text-sm">
                    {r.scan_summary?.total_vegetables_detected} {r.scan_summary?.total_vegetables_detected === 1 ? 'vegetable' : 'vegetables'} detected
                  </p>
                </div>
              </div>
              <button
                onClick={handleReset}
                className="px-5 py-2.5 bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-xl font-semibold hover:from-emerald-600 hover:to-teal-700 transition-all shadow-md hover:shadow-lg active:scale-[0.98] whitespace-nowrap"
              >New Scan</button>
            </div>
          </div>

          {r.improvements?.overall_verdict && (
            <div className="bg-gradient-to-br from-emerald-50 to-teal-50 border border-emerald-200/60 rounded-2xl p-5 md:p-6 mb-8 shadow-sm">
              <div className="flex items-start gap-4 flex-col sm:flex-row">
                <div className="flex items-center gap-3 shrink-0">
                  <div className="relative w-16 h-16">
                    <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                      <circle cx="18" cy="18" r="15.5" fill="none" stroke="#e2e8f0" strokeWidth="3" />
                      <circle
                        cx="18" cy="18" r="15.5" fill="none"
                        stroke={r.improvements.meal_balance_score_out_of_10 >= 8 ? '#10b981' : r.improvements.meal_balance_score_out_of_10 >= 5 ? '#f59e0b' : '#ef4444'}
                        strokeWidth="3"
                        strokeDasharray={`${r.improvements.meal_balance_score_out_of_10 / 10 * 100} 100`}
                        strokeLinecap="round"
                      />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-lg font-extrabold text-slate-700">{r.improvements.meal_balance_score_out_of_10}</span>
                    </div>
                  </div>
                  <div>
                    <span className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Score</span>
                    <p className="text-lg font-bold text-slate-800">Meal Balance</p>
                  </div>
                </div>
                <p className="text-sm text-slate-600 leading-relaxed">{r.improvements.overall_verdict}</p>
              </div>
            </div>
          )}

          <div className="flex flex-wrap gap-2 mb-8 overflow-x-auto pb-1">
            {sections.map(s => (
              <button
                key={s.id}
                onClick={() => document.getElementById(s.id)?.scrollIntoView({ behavior: 'smooth' })}
                className={`text-sm px-4 py-2 rounded-xl border transition-all duration-200 whitespace-nowrap font-medium ${
                  activeSection === s.id
                    ? 'bg-emerald-500 text-white border-emerald-500 shadow-md'
                    : 'bg-white text-slate-600 border-slate-200 hover:border-emerald-300 hover:text-emerald-600 shadow-sm'
                }`}
              >
                {s.emoji} {s.label}
              </button>
            ))}
          </div>

          {r.scan_summary?.items && (
            <div id="section-veg" className="mb-8 scroll-mt-20">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-lg flex items-center justify-center text-sm shadow-sm">🥬</div>
                <h2 className="text-xl font-bold text-slate-800">Detected Vegetables</h2>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                {r.scan_summary.items.map((item) => (
                  <div key={item.id} className="group bg-white rounded-2xl shadow-sm border border-slate-100 p-4 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300">
                    <div className="flex items-center justify-between mb-2">
                      <p className="font-bold text-slate-800 text-sm sm:text-base">{item.common_name}</p>
                      <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
                        item.freshness_status === 'Fresh' ? 'bg-emerald-100 text-emerald-700' :
                        item.freshness_status === 'Slightly Aged' ? 'bg-amber-100 text-amber-700' :
                        'bg-red-100 text-red-700'
                      }`}>{item.freshness_status}</span>
                    </div>
                    <p className="text-xs text-slate-400">{item.estimated_quantity} ~ {item.estimated_weight_grams}g</p>
                    {item.confidence_percentage && (
                      <div className="mt-2 w-full bg-slate-100 rounded-full h-1">
                        <div className="bg-emerald-400 h-1 rounded-full" style={{ width: `${item.confidence_percentage}%` }} />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          <div id="section-recipes" className="scroll-mt-20"><RecipeCard recipes={r.recipes} /></div>
          <div id="section-nutrition" className="scroll-mt-20"><NutritionTable nutrition={r.nutrition} /></div>
          <div id="section-allergy" className="scroll-mt-20"><AllergyReport allergy_report={r.allergy_report} /></div>
          <div id="section-subs" className="scroll-mt-20"><Substitutions substitutions={r.substitutions} /></div>
          <div id="section-improve" className="scroll-mt-20"><Improvements improvements={r.improvements} /></div>
        </div>
      )}

      {showTop && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="fixed bottom-6 right-6 w-12 h-12 bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-2xl shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all flex items-center justify-center text-xl z-50"
          title="Back to top"
        >↑</button>
      )}
    </div>
  )
}
