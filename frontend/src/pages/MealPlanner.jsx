import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import SEO from '../components/SEO'
import { getScanHistory } from '../utils/scanHistory'

const STORAGE_KEY = 'nutrivision_meal_plan'

function getPlan() {
  try { return JSON.parse(localStorage.getItem(STORAGE_KEY)) || {} } catch { return {} }
}

function savePlan(plan) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(plan))
}

export default function MealPlanner() {
  const { t } = useTranslation()
  const [plan, setPlan] = useState(getPlan)
  const [history, setHistory] = useState([])
  const [selecting, setSelecting] = useState(null)

  const DAYS = [
    t('mealPlanner.monday'),
    t('mealPlanner.tuesday'),
    t('mealPlanner.wednesday'),
    t('mealPlanner.thursday'),
    t('mealPlanner.friday'),
    t('mealPlanner.saturday'),
    t('mealPlanner.sunday'),
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

  const getDayRecipes = (day) => {
    return DAYS.filter(d => d === day).flatMap(d =>
      MEALS.filter(m => plan[`${d}-${m}`]).map(m => ({ meal: m, recipe: plan[`${d}-${m}`] }))
    )
  }

  const savedRecipes = history.flatMap(h => {
    const r = h.result?.recipes
    if (!r) return []
    return Object.entries(r).filter(([, v]) => v?.name).map(([level, v]) => ({ level, name: v.name }))
  })

  const allRecipes = [...new Map(savedRecipes.map(r => [r.name, r])).values()]

  return (
    <>
      <SEO title="Meal Planner" description="Plan your weekly meals with AI-generated recipes from scanned vegetables." />
      <div className="max-w-5xl mx-auto px-4 py-8">
      <div className="bg-gradient-to-br from-emerald-600 via-emerald-500 to-teal-600 rounded-2xl p-6 md:p-8 mb-8 text-white shadow-xl shadow-emerald-500/10">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center text-2xl shadow-inner">📅</div>
          <div>
            <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight">{t('mealPlanner.title')}</h1>
            <p className="text-emerald-100/80 text-sm">{t('mealPlanner.subtitle')}</p>
          </div>
        </div>
      </div>

      {allRecipes.length === 0 && (
        <div className="text-center py-16 bg-white/50 dark:bg-slate-800/50 rounded-2xl border border-slate-200/60 dark:border-slate-700/40 mb-8">
          <div className="text-5xl mb-4">📅</div>
          <p className="text-lg font-medium text-slate-500 dark:text-slate-400 mb-2">{t('mealPlanner.noRecipes')}</p>
          <p className="text-sm text-slate-400 dark:text-slate-500 mb-6">{t('mealPlanner.noRecipesDesc')}</p>
        </div>
      )}

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
                          <button onClick={() => setMeal(day, meal, recipe)} className="text-xs text-red-400 hover:text-red-500 mt-1.5 opacity-0 group-hover:opacity-100 transition-opacity">✕ {t('mealPlanner.remove')}</button>
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
    </div>
    </>
  )
}
