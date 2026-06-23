export default function CookingTips({ cooking_tips }) {
  if (!cooking_tips || cooking_tips.length === 0) return null
  return (
    <div className="mb-8">
      <div className="flex items-center gap-2 mb-4">
        <div className="w-8 h-8 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-lg flex items-center justify-center text-sm shadow-sm">👨‍🍳</div>
        <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100">Cooking Tips</h2>
      </div>
      <div className="grid sm:grid-cols-2 gap-4">
        {cooking_tips.map((veg) => (
          <div key={veg.vegetable_id} className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700 overflow-hidden hover:shadow-md hover:-translate-y-0.5 transition-all duration-300">
            <div className="bg-gradient-to-r from-orange-50 to-amber-50 dark:from-orange-900/30 dark:to-amber-900/30 px-5 py-3 border-b border-slate-100 dark:border-slate-700">
              <h3 className="font-bold text-slate-800 dark:text-slate-100 text-lg">{veg.vegetable_name}</h3>
            </div>
            <div className="p-4 space-y-3.5">
              <div>
                <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wide">Preparation</p>
                <p className="text-sm text-slate-600 dark:text-slate-300 mt-0.5">{veg.preparation}</p>
              </div>
              <div>
                <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wide mb-1.5">Best Cooking Methods</p>
                <div className="flex flex-wrap gap-1.5">
                  {veg.best_cooking_methods?.map((m, i) => (
                    <span key={i} className="text-xs bg-orange-50 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300 border border-orange-200 dark:border-orange-700/50 px-2.5 py-0.5 rounded-full font-medium">{m}</span>
                  ))}
                </div>
              </div>
              <div>
                <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wide mb-1.5">Flavor Pairings</p>
                <div className="flex flex-wrap gap-1.5">
                  {veg.flavor_pairings?.map((p, i) => (
                    <span key={i} className="text-xs bg-emerald-50 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-700/50 px-2.5 py-0.5 rounded-full font-medium">{p}</span>
                  ))}
                </div>
              </div>
              <div className="bg-emerald-50/50 dark:bg-emerald-900/15 border border-emerald-100 dark:border-emerald-800/40 rounded-xl p-3">
                <p className="text-xs font-bold text-emerald-700 dark:text-emerald-300 uppercase tracking-wide mb-0.5">🥦 Nutrition Tip</p>
                <p className="text-xs text-slate-500 dark:text-slate-400">{veg.nutrition_preservation}</p>
              </div>
              <div className="bg-red-50/50 dark:bg-red-900/15 border border-red-100 dark:border-red-800/40 rounded-xl p-3">
                <p className="text-xs font-bold text-red-600 dark:text-red-400 uppercase tracking-wide mb-0.5">⚠ Common Mistakes</p>
                <ul className="text-xs text-slate-500 dark:text-slate-400 list-disc list-inside mt-0.5">
                  {veg.common_mistakes?.map((m, i) => <li key={i}>{m}</li>)}
                </ul>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
