import { useState, useEffect } from 'react'
import { getScanHistory } from '../utils/scanHistory'

const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
const MEALS = ['Breakfast', 'Lunch', 'Dinner']

const STORAGE_KEY = 'nutrivision_meal_plan'

function getPlan() {
  try { return JSON.parse(localStorage.getItem(STORAGE_KEY)) || {} } catch { return {} }
}

function savePlan(plan) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(plan))
}

export default function MealPlanner() {
  const [plan, setPlan] = useState(getPlan)
  const [history, setHistory] = useState([])
  const [selecting, setSelecting] = useState(null)

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
    <div className="max-w-5xl mx-auto px-4 py-8">
      <div className="bg-gradient-to-br from-emerald-600 via-emerald-500 to-teal-600 rounded-2xl p-6 md:p-8 mb-8 text-white">
        <div className="flex items-center gap-3 mb-2">
          <div className="text-3xl">📅</div>
          <div>
            <h1 className="text-2xl md:text-3xl font-extrabold">Meal Planner</h1>
            <p className="text-emerald-100/80 text-sm">Plan your week with scanned recipes</p>
          </div>
        </div>
      </div>

      {allRecipes.length === 0 && (
        <div className="text-center py-16">
          <div className="text-5xl mb-4">📅</div>
          <p className="text-lg font-medium text-slate-500 dark:text-slate-400 mb-2">No recipes yet</p>
          <p className="text-sm text-slate-400 dark:text-slate-500 mb-6">Scan vegetables to generate recipes, then plan your meals here</p>
        </div>
      )}

      <div className="overflow-x-auto">
        <table className="w-full bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700 overflow-hidden">
          <thead>
            <tr className="bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-emerald-900/30 dark:to-teal-900/30">
              <th className="p-3 text-left text-sm font-bold text-slate-700 dark:text-slate-200 border-b border-slate-100 dark:border-slate-700 w-24"></th>
              {DAYS.map(d => <th key={d} className="p-3 text-center text-sm font-bold text-slate-700 dark:text-slate-200 border-b border-slate-100 dark:border-slate-700 min-w-[130px]">{d.slice(0, 3)}</th>)}
            </tr>
          </thead>
          <tbody>
            {MEALS.map(meal => (
              <tr key={meal} className="border-t border-slate-50 dark:border-slate-700/50">
                <td className="p-3 text-sm font-bold text-slate-600 dark:text-slate-300 border-r border-slate-50 dark:border-slate-700/50">{meal}</td>
                {DAYS.map(day => {
                  const key = `${day}-${meal}`
                  const recipe = plan[key]
                  const isSelecting = selecting === key
                  return (
                    <td key={day} className="p-2 text-center border-r border-slate-50 dark:border-slate-700/50 last:border-r-0 relative">
                      {recipe ? (
                        <div className="bg-emerald-50 dark:bg-emerald-900/30 border border-emerald-200 dark:border-emerald-700/40 rounded-xl p-2">
                          <p className="text-xs font-semibold text-slate-700 dark:text-slate-200 truncate">{recipe}</p>
                          <button onClick={() => setMeal(day, meal, recipe)} className="text-xs text-red-400 hover:text-red-500 mt-1">✕</button>
                        </div>
                      ) : (
                        <button onClick={() => setSelecting(key)} className="w-full text-xs text-slate-400 dark:text-slate-500 hover:text-emerald-600 dark:hover:text-emerald-400 border border-dashed border-slate-200 dark:border-slate-600 rounded-xl py-2 hover:border-emerald-300 dark:hover:border-emerald-600 transition-all">
                          + Add
                        </button>
                      )}
                      {isSelecting && allRecipes.length > 0 && (
                        <div className="absolute z-20 top-full left-0 mt-1 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl shadow-xl p-2 min-w-[180px] max-h-48 overflow-y-auto">
                          {allRecipes.map((r, i) => (
                            <button key={i} onClick={() => setMeal(day, meal, r.name)} className="block w-full text-left text-xs p-2 rounded-lg hover:bg-emerald-50 dark:hover:bg-emerald-900/30 text-slate-600 dark:text-slate-300 transition-colors">
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

      <div className="mt-8 bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700 p-5">
        <h2 className="font-bold text-slate-800 dark:text-slate-100 mb-3">Available Recipes</h2>
        {allRecipes.length === 0 ? (
          <p className="text-sm text-slate-400 dark:text-slate-500">No scanned recipes yet. Use the scanner to generate recipes first.</p>
        ) : (
          <div className="flex flex-wrap gap-2">
            {allRecipes.map((r, i) => (
              <span key={i} className="text-xs bg-emerald-50 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-700/50 px-2.5 py-1 rounded-full">{r.name}</span>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
