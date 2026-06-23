export default function Improvements({ improvements }) {
  if (!improvements) return null

  const score = improvements.meal_balance_score_out_of_10
  const scoreColor = score >= 8 ? 'from-emerald-500 to-emerald-600' : score >= 5 ? 'from-amber-500 to-amber-600' : 'from-red-500 to-red-600'

  return (
    <div className="mb-8">
      <div className="flex items-center gap-2 mb-4">
        <div className="w-8 h-8 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-lg flex items-center justify-center text-sm shadow-sm">📊</div>
        <h2 className="text-xl font-bold text-slate-800">AI Improvement Suggestions</h2>
      </div>
      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
        <div className={`bg-gradient-to-r ${scoreColor} px-6 py-5`}>
          <div className="flex items-center gap-4">
            <div className="relative w-16 h-16">
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                <circle cx="18" cy="18" r="15.5" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="3" />
                <circle cx="18" cy="18" r="15.5" fill="none" stroke="rgba(255,255,255,0.8)" strokeWidth="3" strokeDasharray={`${score / 10 * 100} 100`} strokeLinecap="round" />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-xl font-extrabold text-white">{score}</span>
              </div>
            </div>
            <div className="text-white">
              <p className="text-sm font-semibold uppercase tracking-wide opacity-80">Meal Balance</p>
              <p className="text-white/90 text-sm mt-1">{improvements.meal_balance_justification}</p>
            </div>
          </div>
        </div>

        <div className="p-5 space-y-5">
          {improvements.nutritional_gaps?.length > 0 && (
            <div>
              <p className="text-sm font-bold text-slate-700 mb-2 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-red-400" /> Nutritional Gaps
              </p>
              <div className="flex flex-wrap gap-2">
                {improvements.nutritional_gaps.map((gap, i) => (
                  <span key={i} className="text-xs font-medium bg-red-50 text-red-600 border border-red-200 px-2.5 py-1 rounded-lg">{gap}</span>
                ))}
              </div>
            </div>
          )}

          {improvements.suggested_add_ons?.length > 0 && (
            <div>
              <p className="text-sm font-bold text-slate-700 mb-2 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-blue-400" /> Suggested Add-ons
              </p>
              <div className="space-y-2.5">
                {improvements.suggested_add_ons.map((item, i) => (
                  <div key={i} className="bg-blue-50/50 border border-blue-100 rounded-xl p-3.5">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="w-2 h-2 rounded-full bg-blue-400" />
                      <strong className="text-blue-700 text-sm font-bold">{item.ingredient}</strong>
                    </div>
                    <p className="text-slate-500 text-xs">{item.reason}</p>
                    <p className="text-slate-400 text-xs mt-1">Adds: {item.nutrient_it_adds}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {improvements.cooking_technique_upgrades && (
            <div>
              <p className="text-sm font-bold text-slate-700 mb-2 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-purple-400" /> Cooking Upgrades
              </p>
              <div className="grid gap-2">
                {Object.entries(improvements.cooking_technique_upgrades).map(([level, tip]) => (
                  tip && (
                    <div key={level} className="bg-purple-50/50 border border-purple-100 rounded-xl p-3">
                      <span className="text-xs font-bold text-purple-700 uppercase tracking-wide capitalize">{level}</span>
                      <p className="text-sm text-slate-600 mt-0.5">{tip}</p>
                    </div>
                  )
                ))}
              </div>
            </div>
          )}

          {improvements.next_scan_suggestion && (
            <div className="bg-emerald-50/50 border border-emerald-100 rounded-xl p-3.5">
              <p className="text-xs font-bold text-emerald-700 uppercase tracking-wide mb-1">Next Scan Suggestion</p>
              <p className="text-sm text-slate-600 italic">{improvements.next_scan_suggestion}</p>
            </div>
          )}

          {improvements.overall_verdict && (
            <div className="bg-slate-50 border border-slate-100 rounded-xl p-3.5">
              <p className="text-xs font-bold text-slate-600 uppercase tracking-wide mb-1">Verdict</p>
              <p className="text-sm text-slate-700">{improvements.overall_verdict}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
