import { useState } from 'react'
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
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-800">Scan Results</h1>
              <p className="text-gray-500">
                {r.scan_summary?.total_vegetables_detected} vegetables detected
              </p>
            </div>
            <button
              onClick={handleReset}
              className="bg-gray-200 text-gray-700 px-4 py-2 rounded hover:bg-gray-300"
            >New Scan</button>
          </div>

          {r.scan_summary?.items && (
            <div className="mb-6 flex flex-wrap gap-2">
              {r.scan_summary.items.map((item) => (
                <div key={item.id} className="bg-white shadow rounded-lg px-4 py-3 border-l-4 border-green-400">
                  <p className="font-semibold text-gray-800">{item.common_name}</p>
                  <p className="text-xs text-gray-500">{item.estimated_quantity} ~ {item.estimated_weight_grams}g</p>
                  <span className={`text-xs px-2 py-0.5 rounded ${
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
