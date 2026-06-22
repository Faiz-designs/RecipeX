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

  const handleScanComplete = (data) => {
    setResult(data)
    setShowReport(true)
  }

  useEffect(() => {
    if (showReport) window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [showReport])

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

          {r.scan_summary?.items && (
            <div className="mb-6 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
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

          <RecipeCard recipes={r.recipes} />
          <NutritionTable nutrition={r.nutrition} />
          <AllergyReport allergy_report={r.allergy_report} />
          <Substitutions substitutions={r.substitutions} />
          <Improvements improvements={r.improvements} />
        </div>
      )}
    </div>
  )
}
