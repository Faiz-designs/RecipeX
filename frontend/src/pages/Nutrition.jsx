import { useState, useEffect } from 'react'

const nutrientRows = [
  { key: 'calories_kcal', label: 'Calories (kcal)', max: 100, color: 'bg-gradient-to-r from-orange-400 to-orange-500' },
  { key: 'carbohydrates_g', label: 'Carbs (g)', max: 30, color: 'bg-gradient-to-r from-yellow-400 to-amber-500' },
  { key: 'dietary_fibre_g', label: 'Fibre (g)', max: 10, color: 'bg-gradient-to-r from-emerald-400 to-emerald-500' },
  { key: 'protein_g', label: 'Protein (g)', max: 10, color: 'bg-gradient-to-r from-blue-400 to-blue-500' },
  { key: 'fat_g', label: 'Fat (g)', max: 10, color: 'bg-gradient-to-r from-red-400 to-red-500' },
  { key: 'vitamin_c_mg', label: 'Vitamin C (mg)', max: 100, color: 'bg-gradient-to-r from-amber-400 to-orange-400' },
  { key: 'iron_mg', label: 'Iron (mg)', max: 10, color: 'bg-gradient-to-r from-purple-400 to-purple-500' },
  { key: 'potassium_mg', label: 'Potassium (mg)', max: 600, color: 'bg-gradient-to-r from-indigo-400 to-indigo-500' },
  { key: 'calcium_mg', label: 'Calcium (mg)', max: 200, color: 'bg-gradient-to-r from-pink-400 to-pink-500' },
]

const dailyTargets = {
  calories_kcal: { label: 'Calories', target: 2000, unit: 'kcal' },
  protein_g: { label: 'Protein', target: 50, unit: 'g' },
  dietary_fibre_g: { label: 'Fibre', target: 25, unit: 'g' },
  carbohydrates_g: { label: 'Carbs', target: 300, unit: 'g' },
  fat_g: { label: 'Fat', target: 65, unit: 'g' },
}

const vitaminHighlights = [
  { key: 'vitamin_c_mg', name: 'Vitamin C', unit: 'mg', color: 'from-amber-400 to-orange-400' },
  { key: 'iron_mg', name: 'Iron', unit: 'mg', color: 'from-purple-400 to-purple-500' },
  { key: 'potassium_mg', name: 'Potassium', unit: 'mg', color: 'from-indigo-400 to-indigo-500' },
  { key: 'calcium_mg', name: 'Calcium', unit: 'mg', color: 'from-pink-400 to-pink-500' },
]

function Bar({ value, max, color }) {
  const pct = Math.min((value / max) * 100, 100)
  return (
    <div className="w-full bg-slate-100 dark:bg-slate-700 rounded-full h-2 mt-1.5 overflow-hidden">
      <div className={`h-2 rounded-full transition-all duration-700 ${color}`} style={{ width: `${pct}%` }} />
    </div>
  )
}

export default function Nutrition() {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetch('https://FaizBasha05.pythonanywhere.com/scan/demo')
      .then(res => {
        if (!res.ok) throw new Error(`Failed to fetch (${res.status})`)
        return res.json()
      })
      .then(res => { setData(res); setLoading(false) })
      .catch(err => { setError(err.message); setLoading(false) })
  }, [])

  if (loading) {
    return (
      <div className="max-w-5xl mx-auto px-4 py-8">
        <div className="animate-gradient bg-gradient-to-br from-emerald-600 via-emerald-500 to-teal-600 rounded-2xl h-48 mb-8 flex items-center justify-center">
          <div className="flex items-center gap-3 text-white">
            <div className="w-8 h-8 border-4 border-white/30 border-t-white rounded-full animate-spin" />
            <span className="text-lg font-semibold">Loading nutrition data...</span>
          </div>
        </div>
        <div className="space-y-4">
          {[1, 2, 3, 4, 5].map(i => (
            <div key={i} className="h-16 bg-white dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700 animate-shimmer" />
          ))}
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="max-w-5xl mx-auto px-4 py-8">
        <div className="bg-gradient-to-br from-emerald-600 via-emerald-500 to-teal-600 rounded-2xl h-48 mb-8 flex items-center justify-center">
          <h1 className="text-4xl font-extrabold text-white">Nutrition Tracker</h1>
        </div>
        <div className="bg-red-50 dark:bg-red-900/40 border border-red-200 dark:border-red-800 rounded-2xl p-6 text-center">
          <div className="text-4xl mb-3">⚠️</div>
          <p className="text-red-700 dark:text-red-300 font-semibold text-lg mb-1">Failed to load nutrition data</p>
          <p className="text-red-500 dark:text-red-400 text-sm mb-4">{error}</p>
          <button onClick={() => window.location.reload()} className="px-6 py-2.5 bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-xl font-semibold hover:from-emerald-600 hover:to-teal-700 transition shadow-md">Try Again</button>
        </div>
      </div>
    )
  }

  const nutrition = data?.result?.nutrition || []
  const vegetables = data?.result?.scan_summary?.items || []

  if (nutrition.length === 0 && vegetables.length === 0) {
    return (
      <div className="max-w-5xl mx-auto px-4 py-8">
        <div className="bg-gradient-to-br from-emerald-600 via-emerald-500 to-teal-600 rounded-2xl h-48 mb-8 flex items-center justify-center">
          <h1 className="text-4xl font-extrabold text-white">Nutrition Tracker</h1>
        </div>
        <div className="text-center py-16">
          <div className="text-5xl mb-4">🥦</div>
          <p className="text-slate-500 dark:text-slate-400 text-lg">No nutrition data available. Scan some vegetables first!</p>
        </div>
      </div>
    )
  }

  const totals = {}
  nutrientRows.forEach(({ key }) => {
    totals[key] = nutrition.reduce((sum, n) => sum + (n.per_100g?.[key] || 0), 0)
  })

  const topSources = vitaminHighlights.map(v => {
    const sorted = [...nutrition].sort((a, b) => (b.per_100g?.[v.key] || 0) - (a.per_100g?.[v.key] || 0)).slice(0, 3)
    return { ...v, sources: sorted }
  })

  return (
    <div className="animate-fadeIn">
      <div className="relative overflow-hidden bg-gradient-to-br from-emerald-600 via-emerald-500 to-teal-600 animate-gradient py-20 md:py-28">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 text-6xl animate-float">🥦</div>
          <div className="absolute top-20 right-20 text-5xl animate-float stagger-2">📊</div>
          <div className="absolute bottom-16 left-1/4 text-4xl animate-float stagger-3">🥬</div>
          <div className="absolute top-1/3 right-1/4 text-5xl animate-float stagger-4">🥕</div>
        </div>
        <div className="relative max-w-3xl mx-auto text-center px-4">
          <h1 className="text-5xl md:text-6xl font-extrabold text-white mb-5 leading-tight">Nutrition Tracker</h1>
          <p className="text-lg text-emerald-100/90 leading-relaxed max-w-xl mx-auto">
            Track nutrients across all scanned vegetables and monitor your daily progress.
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-8">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 mb-10">
          <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm dark:shadow-slate-900/30 border border-slate-100 dark:border-slate-700 p-4 text-center">
            <div className="text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-orange-500">{totals.calories_kcal?.toFixed(0) || 0}</div>
            <div className="text-xs text-slate-500 dark:text-slate-400 font-medium mt-1">Total Calories</div>
          </div>
          <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm dark:shadow-slate-900/30 border border-slate-100 dark:border-slate-700 p-4 text-center">
            <div className="text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-500">{totals.protein_g?.toFixed(1) || 0}g</div>
            <div className="text-xs text-slate-500 dark:text-slate-400 font-medium mt-1">Total Protein</div>
          </div>
          <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm dark:shadow-slate-900/30 border border-slate-100 dark:border-slate-700 p-4 text-center">
            <div className="text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-amber-500">{totals.carbohydrates_g?.toFixed(1) || 0}g</div>
            <div className="text-xs text-slate-500 dark:text-slate-400 font-medium mt-1">Total Carbs</div>
          </div>
          <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm dark:shadow-slate-900/30 border border-slate-100 dark:border-slate-700 p-4 text-center">
            <div className="text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-red-500">{totals.fat_g?.toFixed(1) || 0}g</div>
            <div className="text-xs text-slate-500 dark:text-slate-400 font-medium mt-1">Total Fat</div>
          </div>
          <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm dark:shadow-slate-900/30 border border-slate-100 dark:border-slate-700 p-4 text-center">
            <div className="text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-emerald-500">{totals.dietary_fibre_g?.toFixed(1) || 0}g</div>
            <div className="text-xs text-slate-500 dark:text-slate-400 font-medium mt-1">Total Fibre</div>
          </div>
        </div>

        {nutrition.length > 0 && (
          <div className="mb-10">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-lg flex items-center justify-center text-sm shadow-sm">🥦</div>
              <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100">Per-Vegetable Nutrition</h2>
            </div>
            <div className="overflow-x-auto rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700">
              <table className="w-full bg-white dark:bg-slate-800">
                <thead>
                  <tr className="bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-emerald-900/40 dark:to-teal-900/40">
                    <th className="p-3 text-left text-sm font-bold text-slate-700 dark:text-slate-200 border-b border-slate-100 dark:border-slate-700 whitespace-nowrap">Nutrient (per 100g)</th>
                    {nutrition.map(n => <th key={n.vegetable_id} className="p-3 text-left text-sm font-bold text-slate-700 dark:text-slate-200 border-b border-slate-100 dark:border-slate-700 whitespace-nowrap">{n.vegetable_name}</th>)}
                  </tr>
                </thead>
                <tbody>
                  {nutrientRows.map(({ key, label, max, color }) => (
                    <tr key={key} className="hover:bg-emerald-50/30 dark:hover:bg-emerald-900/20 transition-colors">
                      <td className="p-3 text-sm text-slate-600 dark:text-slate-300 border-b border-slate-50 dark:border-slate-700/50 font-medium whitespace-nowrap">{label}</td>
                      {nutrition.map(n => {
                        const val = n.per_100g?.[key]
                        return (
                          <td key={n.vegetable_id} className="p-3 text-sm text-slate-700 dark:text-slate-200 border-b border-slate-50 dark:border-slate-700/50 min-w-[120px]">
                            <span className="font-bold text-slate-800 dark:text-slate-100">{val ?? '-'}</span>
                            {val != null && <Bar value={val} max={max} color={color} />}
                          </td>
                        )
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {nutrition.length > 0 && (
          <div className="mb-10">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-lg flex items-center justify-center text-sm shadow-sm">💚</div>
              <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100">Health Scores</h2>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {nutrition.map(n => {
                const score = n.health_score_out_of_10 || 0
                const pct = (score / 10) * 100
                const barColor = score >= 8 ? 'from-emerald-400 to-emerald-500' : score >= 5 ? 'from-amber-400 to-amber-500' : 'from-red-400 to-red-500'
                return (
                  <div key={n.vegetable_id} className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm dark:shadow-slate-900/30 border border-slate-100 dark:border-slate-700 p-5">
                    <div className="flex items-center justify-between mb-3">
                      <span className="font-bold text-slate-800 dark:text-slate-100">{n.vegetable_name}</span>
                      <span className={`text-lg font-extrabold ${score >= 8 ? 'text-emerald-600 dark:text-emerald-400' : score >= 5 ? 'text-amber-600 dark:text-amber-400' : 'text-red-600 dark:text-red-400'}`}>{score}/10</span>
                    </div>
                    <div className="w-full bg-slate-100 dark:bg-slate-700 rounded-full h-3 overflow-hidden">
                      <div className={`h-3 rounded-full bg-gradient-to-r ${barColor} transition-all duration-700`} style={{ width: `${pct}%` }} />
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        )}

        {nutrition.length > 0 && (
          <div className="mb-10">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-lg flex items-center justify-center text-sm shadow-sm">🌟</div>
              <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100">Key Vitamin Sources</h2>
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              {topSources.map(v => (
                <div key={v.key} className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm dark:shadow-slate-900/30 border border-slate-100 dark:border-slate-700 p-5">
                  <div className="flex items-center gap-2 mb-3">
                    <div className={`w-3 h-3 rounded-full bg-gradient-to-r ${v.color}`} />
                    <h3 className="font-bold text-slate-800 dark:text-slate-100">{v.name}</h3>
                  </div>
                  <div className="space-y-2">
                    {v.sources.map((n, i) => (
                      <div key={i} className="flex items-center justify-between">
                        <span className="text-sm text-slate-600 dark:text-slate-300">{n.vegetable_name}</span>
                        <span className="text-sm font-bold text-slate-700 dark:text-slate-200">{n.per_100g?.[v.key]?.toFixed(1) || 0} {v.unit}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="mb-10">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-8 h-8 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-lg flex items-center justify-center text-sm shadow-sm">📈</div>
            <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100">Daily Progress</h2>
          </div>
          <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm dark:shadow-slate-900/30 border border-slate-100 dark:border-slate-700 p-6">
            <p className="text-sm text-slate-500 dark:text-slate-400 mb-5">What these vegetables cover toward your daily needs:</p>
            <div className="space-y-4">
              {Object.entries(dailyTargets).map(([key, t]) => {
                const value = totals[key] || 0
                const pct = Math.min((value / t.target) * 100, 100)
                const barColor = pct >= 80 ? 'from-emerald-400 to-emerald-500' : pct >= 40 ? 'from-amber-400 to-amber-500' : 'from-blue-400 to-blue-500'
                return (
                  <div key={key}>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-medium text-slate-700 dark:text-slate-300">{t.label}</span>
                      <span className="text-sm text-slate-500 dark:text-slate-400">{value.toFixed(1)}{t.unit} / {t.target}{t.unit}</span>
                    </div>
                    <div className="w-full bg-slate-100 dark:bg-slate-700 rounded-full h-3 overflow-hidden">
                      <div className={`h-3 rounded-full bg-gradient-to-r ${barColor} transition-all duration-700`} style={{ width: `${pct}%` }} />
                    </div>
                    <span className="text-xs text-slate-400 dark:text-slate-500">{pct.toFixed(0)}% of daily target</span>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
