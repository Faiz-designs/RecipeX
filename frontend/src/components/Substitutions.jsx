export default function Substitutions({ substitutions }) {
  if (!substitutions || substitutions.length === 0) return null

  return (
    <div className="mb-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Smart Substitutions</h2>
      {substitutions.map((s, i) => (
        <div key={i} className="bg-amber-50 border border-amber-200 rounded-lg p-5 mb-4">
          <div className="flex items-start justify-between mb-3">
            <div>
              <span className="line-through text-red-500 font-semibold text-lg">{s.original_vegetable_name}</span>
              <span className="mx-3 text-2xl text-green-600">→</span>
              <span className="text-green-600 font-bold text-lg">{s.substitute_vegetable}</span>
            </div>
            <span className={`text-xs font-semibold px-2 py-1 rounded ${
              s.nutritional_equivalence === 'High' ? 'bg-green-100 text-green-700' :
              s.nutritional_equivalence === 'Moderate' ? 'bg-yellow-100 text-yellow-700' :
              'bg-red-100 text-red-700'
            }`}>{s.nutritional_equivalence} match</span>
          </div>
          <p className="text-sm text-gray-600 mb-2"><strong>Risk:</strong> {s.risk_reason}</p>
          <p className="text-sm text-gray-600"><strong>Why safer:</strong> {s.why_safer}</p>
          {s.recipe_update && (
            <p className="text-xs text-gray-500 mt-2 italic">
              Updates recipe: {s.recipe_update.updated_ingredient_line}
            </p>
          )}
        </div>
      ))}
    </div>
  )
}
