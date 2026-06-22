export default function NutritionTable({ nutrition }) {
  if (!nutrition || nutrition.length === 0) return null
  return (
    <div className="mb-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Nutritional Breakdown</h2>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse bg-white rounded-lg shadow-md">
          <thead>
            <tr className="bg-green-50">
              <th className="p-3 text-left text-sm font-semibold text-gray-700 border-b">Nutrient (per 100g)</th>
              {nutrition.map(n => (
                <th key={n.vegetable_id} className="p-3 text-left text-sm font-semibold text-gray-700 border-b">
                  {n.vegetable_name}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {[
              { key: 'calories_kcal', label: 'Calories (kcal)' },
              { key: 'carbohydrates_g', label: 'Carbs (g)' },
              { key: 'dietary_fibre_g', label: 'Fibre (g)' },
              { key: 'protein_g', label: 'Protein (g)' },
              { key: 'fat_g', label: 'Fat (g)' },
              { key: 'vitamin_c_mg', label: 'Vitamin C (mg)' },
              { key: 'iron_mg', label: 'Iron (mg)' },
              { key: 'potassium_mg', label: 'Potassium (mg)' },
            ].map(({ key, label }) => (
              <tr key={key} className="hover:bg-gray-50">
                <td className="p-3 text-sm text-gray-600 border-b font-medium">{label}</td>
                {nutrition.map(n => (
                  <td key={n.vegetable_id} className="p-3 text-sm text-gray-700 border-b">
                    {n.per_100g?.[key] ?? '-'}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="mt-3 flex flex-wrap gap-4">
        {nutrition.map(n => (
          <div key={n.vegetable_id} className="text-sm text-gray-500 bg-gray-50 px-3 py-1 rounded">
            {n.vegetable_name}: GI {n.glycemic_index ?? 'N/A'} | Health Score {n.health_score_out_of_10}/10
          </div>
        ))}
      </div>
      {nutrition.some(n => n.data_confidence === 'Estimated') && (
        <p className="text-xs text-amber-600 mt-2">⚠ Some values are estimated. Verify with a certified nutritionist.</p>
      )}
    </div>
  )
}
