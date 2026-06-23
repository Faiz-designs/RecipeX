import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import SEO from '../components/SEO'
import { getScanHistory } from '../utils/scanHistory'
import { useAuth } from '../utils/AuthContext'

const STORAGE_KEY = 'nutrivision_meal_plan'
const AI_PLAN_KEY = 'nutrivision_ai_meal_plan'

function getPlan() {
  try { return JSON.parse(localStorage.getItem(STORAGE_KEY)) || {} } catch { return {} }
}
function savePlan(plan) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(plan))
}
function getAiPlan() {
  try { return JSON.parse(localStorage.getItem(AI_PLAN_KEY)) } catch { return null }
}
function saveAiPlan(plan) {
  localStorage.setItem(AI_PLAN_KEY, JSON.stringify(plan))
}

export default function MealPlanner() {
  const { t } = useTranslation()
  const { user, token } = useAuth()
  const [plan, setPlan] = useState(getPlan)
  const [aiPlan, setAiPlan] = useState(getAiPlan)
  const [history, setHistory] = useState([])
  const [selecting, setSelecting] = useState(null)
  const [generating, setGenerating] = useState(false)
  const [aiError, setAiError] = useState('')
  const [showAiPlan, setShowAiPlan] = useState(false)

  const DAYS = [
    t('mealPlanner.monday'), t('mealPlanner.tuesday'), t('mealPlanner.wednesday'),
    t('mealPlanner.thursday'), t('mealPlanner.friday'), t('mealPlanner.saturday'), t('mealPlanner.sunday'),
  ]
  const MEALS = [t('mealPlanner.breakfast'), t('mealPlanner.lunch'), t('mealPlanner.dinner')]

  useEffect(() => { setHistory(getScanHistory()) }, [])

  const setMeal = (day, meal, recipe) => {
    const key = `${day}-${meal}`
    const updated = { ...plan, [key]: recipe === plan[key] ? null : recipe }
    setPlan(updated)
    savePlan(updated)
    setSelecting(null)
  }

  const savedRecipes = history.flatMap(h => {
    const r = h.result?.recipes
    if (!r) return []
    return Object.entries(r).filter(([, v]) => v?.name).map(([level, v]) => ({ level, name: v.name }))
  })
  const allRecipes = [...new Map(savedRecipes.map(r => [r.name, r])).values()]

  const generateAiPlan = async () => {
    if (!user || !token) {
      setAiError(t('mealPlanner.signInRequired'))
      return
    }
    setGenerating(true)
    setAiError('')
    try {
      const pantry = JSON.parse(localStorage.getItem('nutrivision_pantry_items') || '[]')
      const res = await fetch('https://FaizBasha05.pythonanywhere.com/meal-planner/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify({ available_ingredients: pantry.map(i => i.name || i) }),
      })
      if (!res.ok) throw new Error(await res.text())
      const data = await res.json()
      saveAiPlan(data)
      setAiPlan(data)
      setShowAiPlan(true)
    } catch (err) {
      setAiError(t('mealPlanner.aiError'))
    }
    setGenerating(false)
  }

  const dayOrder = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
  const mealKeys = ['breakfast', 'lunch', 'dinner']

  return (
    <>
      <SEO title="Meal Planner" description="Plan your weekly meals with AI-generated recipes from scanned vegetables." />
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="bg-gradient-to-br from-emerald-600 via-emerald-500 to-teal-600 rounded-2xl p-6 md:p-8 mb-8 text-white shadow-xl shadow-emerald-500/10">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center text-2xl shadow-inner">📅</div>
              <div>
                <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight">{t('mealPlanner.title')}</h1>
                <p className="text-emerald-100/80 text-sm">{t('mealPlanner.subtitle')}</p>
              </div>
            </div>
            <button
              onClick={generateAiPlan}
              disabled={generating}
              className="flex items-center gap-2 px-5 py-2.5 bg-white/20 backdrop-blur-sm border border-white/20 rounded-xl text-sm font-bold hover:bg-white/30 transition-all disabled:opacity-50"
            >
              {generating ? (
                <><span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> {t('mealPlanner.aiGenerating')}</>
              ) : (
                <>🤖 {t('mealPlanner.aiGenerate')}</>
              )}
            </button>
          </div>
          {aiError && <p className="mt-3 text-sm text-red-200 bg-red-500/20 rounded-lg px-3 py-2">{aiError}</p>}
        </div>

        {aiPlan && !showAiPlan && !generating && (
          <div className="mb-8">
            <button onClick={() => setShowAiPlan(true)} className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-2xl p-6 text-left hover:from-purple-600 hover:to-pink-600 transition-all shadow-lg">
              <div className="flex items-center gap-3">
                <span className="text-3xl">🤖</span>
                <div>
                  <p className="text-lg font-bold">{t('mealPlanner.aiPlanTitle')}</p>
                  <p className="text-sm text-white/80">{t('mealPlanner.nutritionSummary')}: {aiPlan.nutrition_summary?.avg_daily_calories?.toFixed(0)} cal avg</p>
                </div>
              </div>
            </button>
          </div>
        )}

        {showAiPlan && aiPlan && (
          <div className="mb-8 space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100">🤖 {t('mealPlanner.aiPlanTitle')}</h2>
              <button onClick={() => setShowAiPlan(false)} className="text-sm text-slate-400 hover:text-slate-600 dark:hover:text-slate-300">{t('common.close')}</button>
            </div>

            <div className="grid gap-4">
              {dayOrder.map((dayEn, di) => {
                const dayData = aiPlan[dayEn.toLowerCase()]
                if (!dayData) return null
                return (
                  <div key={dayEn} className="bg-white dark:bg-slate-800/90 rounded-2xl border border-slate-200/80 dark:border-slate-700/60 overflow-hidden shadow-sm">
                    <div className="bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-emerald-900/30 dark:to-teal-900/30 px-5 py-3 border-b border-slate-200/60 dark:border-slate-700/50 flex items-center justify-between">
                      <span className="font-bold text-slate-800 dark:text-slate-100">{t(`mealPlanner.${dayEn.toLowerCase()}`)}</span>
                      <span className="text-xs text-slate-500 dark:text-slate-400">{dayData.total_daily_calories?.toFixed(0)} {t('mealPlanner.calories')} · {dayData.total_daily_protein_g?.toFixed(0)}g {t('mealPlanner.protein')}</span>
                    </div>
                    <div className="p-4 grid sm:grid-cols-3 gap-3">
                      {mealKeys.map(mk => {
                        const meal = dayData[mk]
                        if (!meal) return null
                        return (
                          <div key={mk} className="bg-slate-50 dark:bg-slate-700/40 rounded-xl p-3 border border-slate-100 dark:border-slate-700/30">
                            <div className="flex items-center justify-between mb-1.5">
                              <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wide">{t(`mealPlanner.${mk}`)}</span>
                              <span className="text-xs text-slate-400 dark:text-slate-500">{meal.prep_time_minutes} {t('mealPlanner.prepTime')}</span>
                            </div>
                            <p className="font-bold text-sm text-slate-800 dark:text-slate-100">{meal.name}</p>
                            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 line-clamp-2">{meal.description}</p>
                            <div className="flex gap-2 mt-2 text-xs text-slate-400 dark:text-slate-500">
                              <span>{meal.calories?.toFixed(0)} {t('mealPlanner.calories')}</span>
                              <span>{meal.protein_g?.toFixed(0)}g {t('mealPlanner.protein')}</span>
                            </div>
                          </div>
                        )
                      })}
                    </div>
                    {dayData.snacks?.length > 0 && (
                      <div className="px-4 pb-4">
                        <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1.5">{t('mealPlanner.snacks')}</p>
                        <div className="flex flex-wrap gap-1.5">
                          {dayData.snacks.map((s, i) => (
                            <span key={i} className="text-xs bg-amber-50 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300 px-2 py-1 rounded-full border border-amber-200/50 dark:border-amber-700/30">{s.name || s}</span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )
              })}
            </div>

            {aiPlan.nutrition_summary && (
              <div className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/30 dark:to-pink-900/30 rounded-2xl p-5 border border-purple-200/60 dark:border-purple-700/30">
                <h3 className="font-bold text-slate-800 dark:text-slate-100 mb-3">📊 {t('mealPlanner.nutritionSummary')}</h3>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-3">
                  {[{ label: t('mealPlanner.avgDaily') + ' ' + t('mealPlanner.calories'), value: `${aiPlan.nutrition_summary.avg_daily_calories?.toFixed(0)}` },
                   { label: t('mealPlanner.avgDaily') + ' Protein', value: `${aiPlan.nutrition_summary.avg_daily_protein_g?.toFixed(0)}g` },
                   { label: t('mealPlanner.avgDaily') + ' Carbs', value: `${aiPlan.nutrition_summary.avg_daily_carbs_g?.toFixed(0)}g` },
                   { label: t('mealPlanner.avgDaily') + ' Fat', value: `${aiPlan.nutrition_summary.avg_daily_fat_g?.toFixed(0)}g` },
                  ].map((item, i) => (
                    <div key={i} className="bg-white/60 dark:bg-slate-800/60 rounded-xl p-3 text-center border border-purple-200/40 dark:border-purple-700/30">
                      <div className="text-xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600 dark:from-purple-400 dark:to-pink-400">{item.value}</div>
                      <div className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{item.label}</div>
                    </div>
                  ))}
                </div>
                {aiPlan.nutrition_summary.dietary_notes && (
                  <p className="text-xs text-slate-600 dark:text-slate-300 italic">{aiPlan.nutrition_summary.dietary_notes}</p>
                )}
              </div>
            )}

            {aiPlan.weekly_grocery_list?.length > 0 && (
              <div className="bg-white dark:bg-slate-800/90 rounded-2xl border border-slate-200/80 dark:border-slate-700/60 p-5">
                <h3 className="font-bold text-slate-800 dark:text-slate-100 mb-3">🛒 {t('mealPlanner.groceryList')}</h3>
                <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-3">
                  {aiPlan.weekly_grocery_list.map((cat, i) => (
                    <div key={i} className="bg-slate-50 dark:bg-slate-700/40 rounded-xl p-3 border border-slate-100 dark:border-slate-700/30">
                      <p className="text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase mb-1.5">{cat.category}</p>
                      <div className="flex flex-wrap gap-1">
                        {(cat.items || []).map((item, j) => (
                          <span key={j} className="text-xs bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 px-2 py-0.5 rounded-full border border-slate-200 dark:border-slate-600">{item}</span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {allRecipes.length === 0 && !aiPlan && (
          <div className="text-center py-20 bg-white/50 dark:bg-slate-800/50 rounded-2xl border border-slate-200/60 dark:border-slate-700/40 shadow-sm mb-8">
            <div className="w-20 h-20 mx-auto mb-5 rounded-full bg-gradient-to-br from-emerald-100 to-teal-100 dark:from-emerald-900/50 dark:to-teal-900/50 border-2 border-emerald-200 dark:border-emerald-700/50 flex items-center justify-center text-4xl shadow-lg">📅</div>
            <p className="text-xl font-bold text-slate-700 dark:text-slate-200 mb-2">{t('mealPlanner.noRecipes')}</p>
            <p className="text-sm text-slate-500 dark:text-slate-400 mb-8 max-w-sm mx-auto leading-relaxed">{t('mealPlanner.noRecipesDesc')}</p>
            <Link to="/scan" className="inline-flex items-center gap-2 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white px-7 py-3.5 rounded-xl font-bold shadow-lg hover:shadow-xl hover:from-emerald-600 hover:to-emerald-700 transition-all active:scale-[0.98] text-sm">
              📸 Scan Vegetables →
            </Link>
          </div>
        )}

        {allRecipes.length > 0 && (
          <>
            <div className="overflow-x-auto rounded-2xl shadow-sm border border-slate-200/80 dark:border-slate-700/60">
              <table className="w-full bg-white dark:bg-slate-800/90">
                <thead>
                  <tr className="bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-emerald-900/30 dark:to-teal-900/30">
                    <th className="p-3 text-left text-sm font-bold text-slate-700 dark:text-slate-200 border-b border-slate-200/60 dark:border-slate-700/50 w-24"></th>
                    {DAYS.map(d => <th key={d} className="p-3 text-center text-sm font-bold text-slate-700 dark:text-slate-200 border-b border-slate-200/60 dark:border-slate-700/50 min-w-[130px]">{d}</th>)}
                  </tr>
                </thead>
                <tbody>
                  {MEALS.map(meal => (
                    <tr key={meal} className="border-t border-slate-200/40 dark:border-slate-700/40">
                      <td className="p-3 text-sm font-bold text-slate-600 dark:text-slate-300 border-r border-slate-200/40 dark:border-slate-700/40 bg-slate-50/50 dark:bg-slate-700/20">{meal}</td>
                      {DAYS.map(day => {
                        const key = `${day}-${meal}`
                        const recipe = plan[key]
                        const isSelecting = selecting === key
                        return (
                          <td key={day} className="p-2 text-center border-r border-slate-200/40 dark:border-slate-700/40 last:border-r-0 relative hover:bg-slate-50/50 dark:hover:bg-slate-700/20 transition-colors">
                            {recipe ? (
                              <div className="bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-900/40 dark:to-teal-900/40 border border-emerald-200/60 dark:border-emerald-700/40 rounded-xl p-2.5 group hover:shadow-sm transition-shadow">
                                <p className="text-xs font-semibold text-slate-700 dark:text-slate-200 truncate">{recipe}</p>
                                <button onClick={() => setMeal(day, meal, recipe)} className="text-xs text-red-400 hover:text-red-500 mt-1.5 opacity-0 group-hover:opacity-100 transition-opacity">✕ {t('mealPlanner.removeDay')}</button>
                              </div>
                            ) : (
                              <button onClick={() => setSelecting(key)} className="w-full text-xs text-slate-400 dark:text-slate-500 hover:text-emerald-600 dark:hover:text-emerald-400 border border-dashed border-slate-300 dark:border-slate-600 rounded-xl py-2.5 hover:border-emerald-400 dark:hover:border-emerald-500 transition-all hover:bg-emerald-50/50 dark:hover:bg-emerald-900/20">
                                + {t('mealPlanner.add')}
                              </button>
                            )}
                            {isSelecting && allRecipes.length > 0 && (
                              <div className="absolute z-20 top-full left-1/2 -translate-x-1/2 mt-1.5 bg-white dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700/60 rounded-xl shadow-xl shadow-slate-900/20 p-2 min-w-[200px] max-h-56 overflow-y-auto">
                                <div className="text-xs font-semibold text-slate-400 dark:text-slate-500 px-2 py-1.5 border-b border-slate-100 dark:border-slate-700 mb-1">{t('mealPlanner.availableRecipes')}</div>
                                {allRecipes.map((r, i) => (
                                  <button key={i} onClick={() => setMeal(day, meal, r.name)} className="block w-full text-left text-xs p-2.5 rounded-lg hover:bg-emerald-50 dark:hover:bg-emerald-900/30 text-slate-600 dark:text-slate-300 transition-colors font-medium">
                                    {r.name}
                                  </button>
                                ))}
                              </div>
                            )}
                          </td>
                        )
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="mt-8 bg-white dark:bg-slate-800/90 rounded-2xl shadow-sm border border-slate-200/80 dark:border-slate-700/60 p-6 hover:shadow-md transition-shadow">
              <div className="flex items-center gap-2.5 mb-4">
                <div className="w-8 h-8 bg-gradient-to-br from-emerald-400 to-emerald-500 rounded-lg flex items-center justify-center text-sm shadow-sm">🍽️</div>
                <h2 className="font-bold text-slate-800 dark:text-slate-100">{t('mealPlanner.availableRecipes')}</h2>
                <span className="text-xs text-slate-400 dark:text-slate-500 font-medium bg-slate-100 dark:bg-slate-700/80 px-2 py-0.5 rounded-full ml-auto">{allRecipes.length}</span>
              </div>
              {allRecipes.length === 0 ? (
                <p className="text-sm text-slate-400 dark:text-slate-500">{t('mealPlanner.noRecipesDesc')}</p>
              ) : (
                <div className="flex flex-wrap gap-2">
                  {allRecipes.map((r, i) => (
                    <span key={i} className="text-xs bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-emerald-900/30 dark:to-teal-900/30 text-emerald-700 dark:text-emerald-300 border border-emerald-200/60 dark:border-emerald-700/50 px-3 py-1.5 rounded-full font-medium shadow-sm">{r.name}</span>
                  ))}
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </>
  )
}
