import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import RecipeCard from '../components/RecipeCard'
import NutritionTable from '../components/NutritionTable'
import AllergyReport from '../components/AllergyReport'
import Substitutions from '../components/Substitutions'
import Improvements from '../components/Improvements'
import { getScanHistory, clearScanHistory, getScanPreview } from '../utils/scanHistory'

export default function History() {
  const [history, setHistory] = useState([])
  const [selected, setSelected] = useState(null)

  useEffect(() => { setHistory(getScanHistory()) }, [])

  const handleClear = () => {
    clearScanHistory()
    setHistory([])
    setSelected(null)
  }

  const r = selected?.result

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-xl flex items-center justify-center shadow-md text-lg">📋</div>
          <div>
            <h1 className="text-2xl font-extrabold text-slate-800">Scan History</h1>
            <p className="text-sm text-slate-400">{history.length} scan{history.length !== 1 ? 's' : ''} saved</p>
          </div>
        </div>
        {history.length > 0 && (
          <button onClick={handleClear} className="px-4 py-2 bg-red-50 text-red-600 border border-red-200 rounded-xl text-sm font-medium hover:bg-red-100 transition">Clear All</button>
        )}
      </div>

      {history.length === 0 && !selected && (
        <div className="text-center py-20">
          <div className="text-5xl mb-4">📋</div>
          <p className="text-slate-500 text-lg mb-2">No scans yet</p>
          <p className="text-slate-400 text-sm mb-6">Scan a vegetable to see it here</p>
          <Link to="/scan" className="inline-flex items-center gap-2 bg-gradient-to-r from-emerald-500 to-teal-600 text-white px-6 py-3 rounded-xl font-bold shadow-md hover:shadow-lg transition">Scan Now →</Link>
        </div>
      )}

      {selected && r ? (
        <div>
          <button onClick={() => setSelected(null)} className="flex items-center gap-1.5 text-sm text-emerald-600 font-medium mb-4 hover:text-emerald-700 transition">
            ← Back to History
          </button>
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-slate-100 p-4 md:p-6 mb-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-xl flex items-center justify-center shadow-md text-lg">📊</div>
              <div>
                <h2 className="text-xl font-extrabold text-slate-800">Scan Results</h2>
                <p className="text-sm text-slate-400">{new Date(selected.timestamp).toLocaleString()}</p>
              </div>
            </div>
          </div>
          {r.improvements?.overall_verdict && (
            <div className="bg-gradient-to-br from-emerald-50 to-teal-50 border border-emerald-200/60 rounded-2xl p-5 mb-6 shadow-sm">
              <div className="flex items-start gap-4 flex-col sm:flex-row">
                <div className="flex items-center gap-3 shrink-0">
                  <div className="relative w-16 h-16">
                    <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                      <circle cx="18" cy="18" r="15.5" fill="none" stroke="#e2e8f0" strokeWidth="3" />
                      <circle cx="18" cy="18" r="15.5" fill="none" stroke={r.improvements.meal_balance_score_out_of_10 >= 8 ? '#10b981' : r.improvements.meal_balance_score_out_of_10 >= 5 ? '#f59e0b' : '#ef4444'} strokeWidth="3" strokeDasharray={`${r.improvements.meal_balance_score_out_of_10 / 10 * 100} 100`} strokeLinecap="round" />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center"><span className="text-lg font-extrabold text-slate-700">{r.improvements.meal_balance_score_out_of_10}</span></div>
                  </div>
                  <div><span className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Score</span><p className="text-lg font-bold text-slate-800">Meal Balance</p></div>
                </div>
                <p className="text-sm text-slate-600 leading-relaxed">{r.improvements.overall_verdict}</p>
              </div>
            </div>
          )}
          {r.scan_summary?.items && (
            <div className="mb-6">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-7 h-7 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-lg flex items-center justify-center text-xs shadow-sm">🥬</div>
                <h2 className="text-lg font-bold text-slate-800">Detected Vegetables</h2>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
                {r.scan_summary.items.map(item => (
                  <div key={item.id} className="bg-white rounded-xl shadow-sm border border-slate-100 p-3">
                    <p className="font-bold text-slate-800 text-sm">{item.common_name}</p>
                    <span className={`text-xs font-semibold px-2 py-0.5 rounded-full inline-block mt-1 ${item.freshness_status === 'Fresh' ? 'bg-emerald-100 text-emerald-700' : item.freshness_status === 'Slightly Aged' ? 'bg-amber-100 text-amber-700' : 'bg-red-100 text-red-700'}`}>{item.freshness_status}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
          <div id="section-recipes"><RecipeCard recipes={r.recipes} /></div>
          <div id="section-nutrition"><NutritionTable nutrition={r.nutrition} /></div>
          <div id="section-allergy"><AllergyReport allergy_report={r.allergy_report} /></div>
          <div id="section-subs"><Substitutions substitutions={r.substitutions} /></div>
          <div id="section-improve"><Improvements improvements={r.improvements} /></div>
        </div>
      ) : (
        <div className="space-y-3">
          {history.map((entry) => {
            const preview = getScanPreview(entry.result)
            return (
              <button
                key={entry.id}
                onClick={() => setSelected(entry)}
                className="w-full text-left bg-white rounded-2xl shadow-sm border border-slate-100 p-4 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 group"
              >
                <div className="flex items-center justify-between gap-4">
                  <div className="min-w-0">
                    <p className="font-bold text-slate-800 truncate">{preview.veggies}</p>
                    <p className="text-xs text-slate-400 mt-0.5">{preview.count} vegetable{preview.count !== 1 ? 's' : ''} · {new Date(entry.timestamp).toLocaleString()}</p>
                  </div>
                  {preview.score != null && (
                    <div className="shrink-0 w-10 h-10 rounded-xl flex items-center justify-center font-bold text-sm shadow-sm" style={{ backgroundColor: preview.score >= 8 ? '#d1fae5' : preview.score >= 5 ? '#fef3c7' : '#fee2e2', color: preview.score >= 8 ? '#059669' : preview.score >= 5 ? '#d97706' : '#dc2626' }}>
                      {preview.score}
                    </div>
                  )}
                </div>
              </button>
            )
          })}
        </div>
      )}
    </div>
  )
}
