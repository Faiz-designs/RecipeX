import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import SEO from '../components/SEO'
import RecipeCard from '../components/RecipeCard'
import NutritionTable from '../components/NutritionTable'
import AllergyReport from '../components/AllergyReport'
import Substitutions from '../components/Substitutions'
import Improvements from '../components/Improvements'
import { getScanHistory, clearScanHistory, getScanPreview } from '../utils/scanHistory'

export default function History() {
  const { t } = useTranslation()
  const [history, setHistory] = useState([])
  const [selected, setSelected] = useState(null)

  useEffect(() => { setHistory(getScanHistory()) }, [])

  const handleClear = () => { clearScanHistory(); setHistory([]); setSelected(null) }

  const r = selected?.result

  return (
    <>
      <SEO title="Scan History" description="View your past vegetable scans and recipe results." />
      <div className="max-w-5xl mx-auto px-4 py-8">
      <div className="bg-gradient-to-br from-emerald-600 via-emerald-500 to-teal-600 rounded-2xl p-6 md:p-8 mb-8 text-white shadow-xl shadow-emerald-500/10">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center text-2xl shadow-inner">📋</div>
            <div>
              <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight">{t('history.title')}</h1>
              <p className="text-emerald-100/80 text-sm">{t('history.scansSaved', { count: history.length })}</p>
            </div>
          </div>
          {history.length > 0 && (
            <button onClick={handleClear} className="px-4 py-2.5 bg-white/15 backdrop-blur-sm text-white/90 border border-white/20 rounded-xl text-sm font-medium hover:bg-white/25 transition-all hover:shadow-lg active:scale-[0.98]">
              {t('history.clearAll')}
            </button>
          )}
        </div>
      </div>

      {history.length === 0 && !selected && (
        <div className="text-center py-20 bg-white/50 dark:bg-slate-800/50 rounded-2xl border border-slate-200/60 dark:border-slate-700/40">
          <div className="text-5xl mb-4">📋</div>
          <p className="text-slate-500 dark:text-slate-400 text-lg mb-2">{t('history.noScans')}</p>
          <p className="text-slate-400 dark:text-slate-500 text-sm mb-6">{t('history.noScansDesc')}</p>
          <Link to="/scan" className="inline-flex items-center gap-2 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white px-6 py-3 rounded-xl font-bold shadow-md hover:shadow-lg hover:from-emerald-600 hover:to-emerald-700 transition-all active:scale-[0.98]">{t('history.scanNow')} →</Link>
        </div>
      )}

      {selected && r ? (
        <div>
          <button onClick={() => setSelected(null)} className="flex items-center gap-1.5 text-sm text-emerald-600 dark:text-emerald-400 font-medium mb-5 hover:text-emerald-700 dark:hover:text-emerald-300 transition-colors group">
            <span className="group-hover:-translate-x-0.5 transition-transform">←</span> {t('history.back')}
          </button>
          <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-2xl shadow-lg border border-slate-200/80 dark:border-slate-700/60 p-5 md:p-7 mb-6">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 bg-gradient-to-br from-emerald-400 to-emerald-500 rounded-xl flex items-center justify-center shadow-md text-lg">📊</div>
              <div>
                <h2 className="text-xl font-extrabold text-slate-800 dark:text-slate-100">{t('scan.results')}</h2>
                <p className="text-sm text-slate-400 dark:text-slate-500">{new Date(selected.timestamp).toLocaleString()}</p>
              </div>
            </div>
          </div>
          {r.improvements?.overall_verdict && (
            <div className="bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-900/40 dark:to-teal-900/40 border border-emerald-200/60 dark:border-emerald-700/30 rounded-2xl p-6 mb-6 shadow-sm">
              <div className="flex items-start gap-4 flex-col sm:flex-row sm:items-center">
                <div className="flex items-center gap-3 shrink-0">
                  <div className="relative w-20 h-20">
                    <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                      <circle cx="18" cy="18" r="15.5" fill="none" className="stroke-slate-200 dark:stroke-slate-600" strokeWidth="3" />
                      <circle cx="18" cy="18" r="15.5" fill="none" stroke={r.improvements.meal_balance_score_out_of_10 >= 8 ? '#10b981' : r.improvements.meal_balance_score_out_of_10 >= 5 ? '#f59e0b' : '#ef4444'} strokeWidth="3" strokeDasharray={`${r.improvements.meal_balance_score_out_of_10 / 10 * 100} 100`} strokeLinecap="round" />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center"><span className="text-xl font-extrabold text-slate-700 dark:text-slate-200">{r.improvements.meal_balance_score_out_of_10}</span></div>
                  </div>
                  <div><span className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wide">{t('scan.score')}</span><p className="text-lg font-bold text-slate-800 dark:text-slate-100">{t('scan.mealBalance')}</p></div>
                </div>
                <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">{r.improvements.overall_verdict}</p>
              </div>
            </div>
          )}
          {r.scan_summary?.items && (
            <div className="mb-6">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-8 h-8 bg-gradient-to-br from-emerald-400 to-emerald-500 rounded-lg flex items-center justify-center text-xs shadow-sm">🥬</div>
                <h2 className="text-lg font-bold text-slate-800 dark:text-slate-100">{t('scan.sections.vegetables')}</h2>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                {r.scan_summary.items.map(item => (
                  <div key={item.id} className="bg-white dark:bg-slate-800/90 rounded-xl shadow-sm border border-slate-200/80 dark:border-slate-700/60 p-3.5 hover:shadow-md transition-shadow">
                    <p className="font-bold text-slate-800 dark:text-slate-100 text-sm">{item.common_name}</p>
                    <span className={`text-xs font-semibold px-2.5 py-0.5 rounded-full inline-block mt-1.5 ${item.freshness_status === 'Fresh' ? 'bg-emerald-100 dark:bg-emerald-900/60 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-700/50' : item.freshness_status === 'Slightly Aged' ? 'bg-amber-100 dark:bg-amber-900/60 text-amber-700 dark:text-amber-300 border border-amber-200 dark:border-amber-700/50' : 'bg-red-100 dark:bg-red-900/60 text-red-700 dark:text-red-300 border border-red-200 dark:border-red-700/50'}`}>{item.freshness_status}</span>
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
              <button key={entry.id} onClick={() => setSelected(entry)} className="w-full text-left bg-white dark:bg-slate-800/90 rounded-2xl shadow-sm border border-slate-200/80 dark:border-slate-700/60 p-5 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 group">
                <div className="flex items-center justify-between gap-4">
                  <div className="min-w-0 flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-900/40 dark:to-teal-900/40 rounded-xl flex items-center justify-center text-lg shrink-0">🥗</div>
                    <div>
                      <p className="font-bold text-slate-800 dark:text-slate-100 truncate">{preview.veggies}</p>
                      <p className="text-xs text-slate-400 dark:text-slate-500 mt-0.5 flex items-center gap-1.5">
                        <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-400" />
                        {t('scan.vegetablesDetected', { count: preview.count })} · {new Date(entry.timestamp).toLocaleString()}
                      </p>
                    </div>
                  </div>
                  {preview.score != null && (
                    <div className="shrink-0 w-11 h-11 rounded-xl flex items-center justify-center font-bold text-sm shadow-sm border" style={{ backgroundColor: preview.score >= 8 ? '#d1fae5' : preview.score >= 5 ? '#fef3c7' : '#fee2e2', color: preview.score >= 8 ? '#059669' : preview.score >= 5 ? '#d97706' : '#dc2626', borderColor: preview.score >= 8 ? '#a7f3d0' : preview.score >= 5 ? '#fde68a' : '#fecaca' }}>
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
    </>
  )
}
