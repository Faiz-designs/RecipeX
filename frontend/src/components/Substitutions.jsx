export default function Substitutions({ substitutions }) {
  if (!substitutions || substitutions.length === 0) return null

  const matchStyles = {
    High: 'bg-emerald-100 text-emerald-700 border-emerald-200',
    Moderate: 'bg-amber-100 text-amber-700 border-amber-200',
    Low: 'bg-red-100 text-red-700 border-red-200'
  }

  return (
    <div className="mb-8">
      <div className="flex items-center gap-2 mb-4">
        <div className="w-8 h-8 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-lg flex items-center justify-center text-sm shadow-sm">🔄</div>
        <h2 className="text-xl font-bold text-slate-800">Smart Substitutions</h2>
      </div>
      <div className="space-y-4">
        {substitutions.map((s, i) => (
          <div key={i} className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden hover:shadow-md hover:-translate-y-0.5 transition-all duration-300">
            <div className="p-5">
              <div className="flex flex-col sm:flex-row items-start justify-between gap-3 mb-3">
                <div className="flex items-center flex-wrap gap-x-3 gap-y-1">
                  <span className="text-lg font-bold text-slate-800">{s.original_vegetable_name}</span>
                  <span className="text-2xl text-emerald-500">→</span>
                  <span className="text-lg font-bold text-emerald-600">{s.substitute_vegetable}</span>
                </div>
                <span className={`text-xs font-bold px-3 py-1 rounded-full border self-start whitespace-nowrap ${matchStyles[s.nutritional_equivalence] || 'bg-slate-100 text-slate-600'}`}>
                  {s.nutritional_equivalence} match
                </span>
              </div>
              <div className="grid sm:grid-cols-2 gap-3">
                <div className="bg-red-50/50 border border-red-100 rounded-xl p-3">
                  <p className="text-xs font-semibold text-red-600 uppercase tracking-wide mb-1">Risk</p>
                  <p className="text-sm text-slate-600">{s.risk_reason}</p>
                </div>
                <div className="bg-emerald-50/50 border border-emerald-100 rounded-xl p-3">
                  <p className="text-xs font-semibold text-emerald-600 uppercase tracking-wide mb-1">Why Safer</p>
                  <p className="text-sm text-slate-600">{s.why_safer}</p>
                </div>
              </div>
              {s.recipe_update && (
                <p className="text-xs text-slate-500 mt-3 pt-3 border-t border-slate-100 italic">
                  📝 {s.recipe_update.updated_ingredient_line}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
