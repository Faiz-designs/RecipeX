export default function Substitutions({ substitutions }) {
  if (!substitutions || substitutions.length === 0) return null

  return (
    <div className="mb-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Smart Substitutions</h2>
      {substitutions.map((s, i) => (
        <div key={i} className="bg-amber-50 border border-amber-200 rounded-xl p-5 mb-4">
          <div className="flex flex-col sm:flex-row items-start justify-between gap-3 mb-3">
            <div className="flex items-center flex-wrap gap-x-2 gap-y-1">
              <span className="line-through text-red-500 font-semibold text-lg">{s.original_vegetable_name}</span>
              <span className="text-2xl text-green-600">→</span>
              <span className="text-green-600 font-bold text-lg">{s.substitute_vegetable}</span>
            </div>
            <span className={`text-xs font-semibold px-2 py-1 rounded self-start ${
              s.nutritional_equivalence === 'High' ? 'bg-green-100 text-green-700' :
              s.nutritional_equivalence === 'Moderate' ? 'bg-yellow-100 text-yellow-700' :
              'bg-red-100 text-red-700'
            }`}>{s.nutritional_equivalence} match</span>
          </div>
          <div className="space-y-1">
            <p className="text-sm text-gray-600"><strong className="text-red-600">Risk:</strong> {s.risk_reason}</p>
            <p className="text-sm text-gray-600"><strong className="text-green-600">Fix:</strong> {s.why_safer}</p>
          </div>
          {s.recipe_update && (
            <p className="text-xs text-gray-500 mt-3 italic border-t border-amber-200 pt-2">
              📝 {s.recipe_update.updated_ingredient_line}
            </p>
          )}
        </div>
      ))}
    </div>
  )
}
