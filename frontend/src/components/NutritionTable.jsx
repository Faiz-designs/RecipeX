function Bar({ value, max, color }) {
  const pct = Math.min((value / max) * 100, 100)
  return (
    <div className="w-full bg-slate-100 dark:bg-slate-700 rounded-full h-2 mt-1.5 overflow-hidden">
      <div className={`h-2 rounded-full transition-all duration-700 ${color}`} style={{ width: `${pct}%` }} />
    </div>
  )
}

const rows = [
  { key: 'calories_kcal', label: 'Calories (kcal)', max: 100, color: 'bg-gradient-to-r from-orange-400 to-orange-500' },
  { key: 'carbohydrates_g', label: 'Carbs (g)', max: 30, color: 'bg-gradient-to-r from-yellow-400 to-amber-500' },
  { key: 'dietary_fibre_g', label: 'Fibre (g)', max: 10, color: 'bg-gradient-to-r from-emerald-400 to-emerald-500' },
  { key: 'protein_g', label: 'Protein (g)', max: 10, color: 'bg-gradient-to-r from-blue-400 to-blue-500' },
  { key: 'fat_g', label: 'Fat (g)', max: 10, color: 'bg-gradient-to-r from-red-400 to-red-500' },
  { key: 'vitamin_c_mg', label: 'Vitamin C (mg)', max: 100, color: 'bg-gradient-to-r from-amber-400 to-orange-400' },
  { key: 'iron_mg', label: 'Iron (mg)', max: 10, color: 'bg-gradient-to-r from-purple-400 to-purple-500' },
  { key: 'potassium_mg', label: 'Potassium (mg)', max: 600, color: 'bg-gradient-to-r from-indigo-400 to-indigo-500' },
]

export default function NutritionTable({ nutrition }) {
  if (!nutrition || nutrition.length === 0) return null
  return (
    <div className="mb-8">
      <div className="flex items-center gap-2 mb-4">
        <div className="w-8 h-8 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-lg flex items-center justify-center text-sm shadow-sm">🥦</div>
        <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100">Nutritional Breakdown</h2>
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
            {rows.map(({ key, label, max, color }) => (
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
      <div className="mt-4 flex flex-wrap gap-2">
        {nutrition.map(n => (
          <div key={n.vegetable_id} className="text-sm bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-xl px-4 py-2 shadow-sm">
            <span className="font-bold text-slate-700 dark:text-slate-200">{n.vegetable_name}</span>
            <span className="text-slate-400 dark:text-slate-500 mx-1.5">·</span>
            <span className="text-slate-500 dark:text-slate-400">GI {n.glycemic_index ?? 'N/A'}</span>
            <span className="text-slate-400 dark:text-slate-500 mx-1.5">·</span>
            <span className="text-emerald-600 dark:text-emerald-400 font-semibold">{n.health_score_out_of_10}/10</span>
          </div>
        ))}
      </div>
      {nutrition.some(n => n.data_confidence === 'Estimated') && <p className="text-xs text-amber-600 dark:text-amber-400 mt-3 flex items-center gap-1">⚠ Some values are estimated.</p>}
    </div>
  )
}
