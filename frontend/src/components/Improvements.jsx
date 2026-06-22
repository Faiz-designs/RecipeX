export default function Improvements({ improvements }) {
  if (!improvements) return null

  return (
    <div className="mb-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">AI Improvement Suggestions</h2>
      <div className="bg-white rounded-lg shadow-md p-5">
        <div className="flex items-center gap-3 mb-4">
          <div className="text-3xl font-bold text-gray-800">{improvements.meal_balance_score_out_of_10}/10</div>
          <div>
            <p className="text-xs font-semibold text-gray-500 uppercase">Meal Balance Score</p>
            <p className="text-sm text-gray-600">{improvements.meal_balance_justification}</p>
          </div>
        </div>

        {improvements.nutritional_gaps?.length > 0 && (
          <div className="mb-4">
            <p className="text-sm font-semibold text-gray-700 mb-2">Nutritional Gaps</p>
            <div className="flex flex-wrap gap-2">
              {improvements.nutritional_gaps.map((gap, i) => (
                <span key={i} className="text-xs bg-red-50 text-red-600 px-2 py-1 rounded">{gap}</span>
              ))}
            </div>
          </div>
        )}

        {improvements.suggested_add_ons?.length > 0 && (
          <div className="mb-4">
            <p className="text-sm font-semibold text-gray-700 mb-2">Suggested Add-ons</p>
            <div className="space-y-2">
              {improvements.suggested_add_ons.map((item, i) => (
                <div key={i} className="text-sm bg-blue-50 rounded p-3">
                  <strong className="text-blue-700">{item.ingredient}</strong>
                  <p className="text-gray-600 text-xs mt-1">{item.reason} <span className="text-gray-400">| Adds: {item.nutrient_it_adds}</span></p>
                </div>
              ))}
            </div>
          </div>
        )}

        {improvements.cooking_technique_upgrades && (
          <div className="mb-4">
            <p className="text-sm font-semibold text-gray-700 mb-2">Cooking Upgrades</p>
            {Object.entries(improvements.cooking_technique_upgrades).map(([level, tip]) => (
              tip && <p key={level} className="text-xs text-gray-600 mb-1"><strong className="capitalize">{level}:</strong> {tip}</p>
            ))}
          </div>
        )}

        {improvements.next_scan_suggestion && (
          <p className="text-sm text-gray-500 italic">Next time: {improvements.next_scan_suggestion}</p>
        )}

        {improvements.overall_verdict && (
          <div className="mt-4 p-3 bg-gray-50 rounded">
            <p className="text-sm font-semibold text-gray-700">Verdict</p>
            <p className="text-sm text-gray-600">{improvements.overall_verdict}</p>
          </div>
        )}
      </div>
    </div>
  )
}
