import { useState, useEffect } from 'react'
import Scanner from '../components/Scanner'
import RecipeCard from '../components/RecipeCard'
import NutritionTable from '../components/NutritionTable'
import AllergyReport from '../components/AllergyReport'
import Substitutions from '../components/Substitutions'
import Improvements from '../components/Improvements'

export default function Scan() {
  const [result, setResult] = useState(null)
  const [showReport, setShowReport] = useState(false)
  const [showTop, setShowTop] = useState(false)

  const handleScanComplete = (data) => {
    setResult(data)
    setShowReport(true)
  }

  useEffect(() => {
    if (showReport) window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [showReport])

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 600)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const handleReset = () => {
    setResult(null)
    setShowReport(false)
  }

  const r = result?.result

  return (
    <div className="max-w-5xl mx-auto px-4 py-6">
      {!showReport && (
        <Scanner onScanComplete={handleScanComplete} />
      )}

      {showReport && r && (
        <div className="animate-[fadeIn_0.4s_ease-out]">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-800">Scan Results</h1>
              <p className="text-gray-500">
                {r.scan_summary?.total_vegetables_detected} vegetables detected
              </p>
            </div>
            <button
              onClick={handleReset}
              className="bg-gray-200 text-gray-700 px-4 py-2 rounded hover:bg-gray-300 self-stretch sm:self-auto"
            >New Scan</button>
          </div>

          {r.improvements?.overall_verdict && (
            <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-xl p-4 mb-6">
              <div className="flex items-start gap-4 flex-col sm:flex-row">
                <div className="flex items-center gap-2 shrink-0">
                  <span className="text-3xl">{r.improvements.meal_balance_score_out_of_10 >= 8 ? '🌟' : r.improvements.meal_balance_score_out_of_10 >= 5 ? '👍' : '💪'}</span>
                  <span className="text-2xl font-bold text-gray-800">{r.improvements.meal_balance_score_out_of_10}/10</span>
                </div>
                <p className="text-sm text-gray-600 leading-relaxed">{r.improvements.overall_verdict}</p>
              </div>
            </div>
          )}

          <div className="flex flex-wrap gap-2 mb-6 overflow-x-auto pb-1">
            {[
              { label: 'Vegetables', id: 'section-veg' },
              { label: 'Recipes', id: 'section-recipes' },
              { label: 'Nutrition', id: 'section-nutrition' },
              { label: 'Allergies', id: 'section-allergy' },
              { label: 'Substitutions', id: 'section-subs' },
              { label: 'Improvements', id: 'section-improve' },
            ].map(s => (
              <button
                key={s.id}
                onClick={() => document.getElementById(s.id)?.scrollIntoView({ behavior: 'smooth' })}
                className="text-xs bg-white border border-gray-200 text-gray-600 px-3 py-1.5 rounded-full hover:bg-green-50 hover:border-green-300 hover:text-green-700 transition whitespace-nowrap"
              >{s.label}</button>
            ))}
          </div>

          {r.scan_summary?.items && (
            <div id="section-veg" className="mb-6 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
              {r.scan_summary.items.map((item) => (
                <div key={item.id} className="bg-white shadow-sm rounded-xl px-4 py-3 border-l-4 border-green-400 hover:shadow-md transition">
                  <p className="font-semibold text-gray-800 text-sm sm:text-base">{item.common_name}</p>
                  <p className="text-xs text-gray-500">{item.estimated_quantity} ~ {item.estimated_weight_grams}g</p>
                  <span className={`text-xs px-2 py-0.5 rounded inline-block mt-1 ${
                    item.freshness_status === 'Fresh' ? 'bg-green-100 text-green-600' :
                    item.freshness_status === 'Slightly Aged' ? 'bg-yellow-100 text-yellow-600' :
                    'bg-red-100 text-red-600'
                  }`}>{item.freshness_status}</span>
                </div>
              ))}
            </div>
          )}

          <div id="section-recipes"><RecipeCard recipes={r.recipes} /></div>
          <div id="section-nutrition"><NutritionTable nutrition={r.nutrition} /></div>
          <div id="section-allergy"><AllergyReport allergy_report={r.allergy_report} /></div>
          <div id="section-subs"><Substitutions substitutions={r.substitutions} /></div>
          <div id="section-improve"><Improvements improvements={r.improvements} /></div>
        </div>
      )}

      {showTop && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="fixed bottom-6 right-6 bg-green-600 text-white w-12 h-12 rounded-full shadow-lg hover:bg-green-700 transition flex items-center justify-center text-xl z-50"
          title="Back to top"
        >↑</button>
      )}
    </div>
  )
}
