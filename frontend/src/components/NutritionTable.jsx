function Bar({ value, max, color }) {
  const pct = Math.min((value / max) * 100, 100)
  return (
    <div className="w-full bg-gray-100 rounded-full h-1.5 mt-1">
      <div className={`h-1.5 rounded-full ${color}`} style={{ width: `${pct}%` }} />
    </div>
  )
}

const rows = [
  { key: 'calories_kcal', label: 'Calories (kcal)', max: 100, color: 'bg-orange-400' },
  { key: 'carbohydrates_g', label: 'Carbs (g)', max: 30, color: 'bg-yellow-400' },
  { key: 'dietary_fibre_g', label: 'Fibre (g)', max: 10, color: 'bg-green-500' },
  { key: 'protein_g', label: 'Protein (g)', max: 10, color: 'bg-blue-500' },
  { key: 'fat_g', label: 'Fat (g)', max: 10, color: 'bg-red-400' },
  { key: 'vitamin_c_mg', label: 'Vitamin C (mg)', max: 100, color: 'bg-amber-400' },
  { key: 'iron_mg', label: 'Iron (mg)', max: 10, color: 'bg-purple-500' },
  { key: 'potassium_mg', label: 'Potassium (mg)', max: 600, color: 'bg-indigo-400' },
]

export default function NutritionTable({ nutrition }) {
  if (!nutrition || nutrition.length === 0) return null
  return (
    <div className="mb-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Nutritional Breakdown</h2>
      <div className="overflow-x-auto rounded-xl shadow-sm border border-gray-100">
        <table className="w-full bg-white">
          <thead>
            <tr className="bg-green-50">
              <th className="p-3 text-left text-sm font-semibold text-gray-700 border-b whitespace-nowrap">Nutrient (per 100g)</th>
              {nutrition.map(n => (
                <th key={n.vegetable_id} className="p-3 text-left text-sm font-semibold text-gray-700 border-b whitespace-nowrap">
                  {n.vegetable_name}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map(({ key, label, max, color }) => (
              <tr key={key} className="hover:bg-gray-50">
                <td className="p-3 text-sm text-gray-600 border-b font-medium whitespace-nowrap">{label}</td>
                {nutrition.map(n => {
                  const val = n.per_100g?.[key]
                  return (
                    <td key={n.vegetable_id} className="p-3 text-sm text-gray-700 border-b min-w-[100px]">
                      <span className="font-medium">{val ?? '-'}</span>
                      {val != null && <Bar value={val} max={max} color={color} />}
                    </td>
                  )
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="mt-3 flex flex-wrap gap-3">
        {nutrition.map(n => (
          <div key={n.vegetable_id} className="text-sm text-gray-500 bg-gray-50 px-3 py-1.5 rounded-lg border border-gray-100">
            <strong className="text-gray-700">{n.vegetable_name}</strong>: GI {n.glycemic_index ?? 'N/A'} &middot; Score {n.health_score_out_of_10}/10
          </div>
        ))}
      </div>
      {nutrition.some(n => n.data_confidence === 'Estimated') && (
        <p className="text-xs text-amber-600 mt-2">⚠ Some values are estimated. Verify with a certified nutritionist.</p>
      )}
    </div>
  )
}
