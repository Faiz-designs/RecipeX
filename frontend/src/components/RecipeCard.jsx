import { useState } from 'react'

export default function RecipeCard({ recipes }) {
  if (!recipes) return null
  const levels = ['easy', 'intermediate', 'advanced']
  const levelConfig = {
    easy: { color: 'from-emerald-500 to-emerald-600', bg: 'bg-emerald-50', text: 'text-emerald-700', border: 'border-emerald-200' },
    intermediate: { color: 'from-amber-500 to-amber-600', bg: 'bg-amber-50', text: 'text-amber-700', border: 'border-amber-200' },
    advanced: { color: 'from-red-500 to-red-600', bg: 'bg-red-50', text: 'text-red-700', border: 'border-red-200' }
  }

  return (
    <div className="mb-8">
      <div className="flex items-center gap-2 mb-4">
        <div className="w-8 h-8 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-lg flex items-center justify-center text-sm shadow-sm">🍳</div>
        <h2 className="text-xl font-bold text-slate-800">Recipes</h2>
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {levels.map(level => {
          const r = recipes[level]
          if (!r) return null
          return <RecipeCardItem key={level} level={level} r={r} config={levelConfig[level]} />
        })}
      </div>
    </div>
  )
}

function RecipeCardItem({ level, r, config }) {
  const [showAll, setShowAll] = useState(false)
  const displayed = showAll ? r.steps : r.steps?.slice(0, 3)

  return (
    <div className="group bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300">
      <div className={`bg-gradient-to-r ${config.color} px-5 py-3`}>
        <div className="flex items-center justify-between">
          <span className={`text-xs font-bold uppercase tracking-wider ${level === 'easy' ? 'text-emerald-100' : level === 'intermediate' ? 'text-amber-100' : 'text-red-100'}`}>{level}</span>
          <span className="text-white/80 text-xs">{r.total_time_minutes} min</span>
        </div>
        <h3 className="text-lg font-bold text-white mt-1">{r.name}</h3>
      </div>
      <div className="p-5">
        {r.additional_ingredients_required?.length > 0 && (
          <div className="mb-3">
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1.5">You'll need</p>
            <div className="flex flex-wrap gap-1.5">
              {r.additional_ingredients_required.map((ing, i) => (
                <span key={i} className="text-xs bg-amber-50 text-amber-700 border border-amber-200 px-2.5 py-0.5 rounded-full font-medium">{ing}</span>
              ))}
            </div>
          </div>
        )}
        <ol className="text-sm text-slate-600 space-y-2">
          {displayed?.map((step, i) => (
            <li key={i} className="flex gap-2">
              <span className={`shrink-0 w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold mt-0.5 ${
                level === 'easy' ? 'bg-emerald-100 text-emerald-700' :
                level === 'intermediate' ? 'bg-amber-100 text-amber-700' :
                'bg-red-100 text-red-700'
              }`}>{i + 1}</span>
              <span>{step}</span>
            </li>
          ))}
        </ol>
        {r.steps?.length > 3 && (
          <button
            onClick={() => setShowAll(!showAll)}
            className="text-sm font-medium text-emerald-600 hover:text-emerald-700 mt-3 transition-colors"
          >
            {showAll ? 'Show less ↑' : `+${r.steps.length - 3} more steps ↓`}
          </button>
        )}
        {r.plating_suggestion && (
          <p className="text-xs text-slate-400 italic mt-3 pt-3 border-t border-slate-100">💡 {r.plating_suggestion}</p>
        )}
        {r.servings && (
          <p className="text-xs text-slate-400 mt-2">🍽 {r.servings} servings</p>
        )}
      </div>
    </div>
  )
}
