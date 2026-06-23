export default function AllergyReport({ allergy_report }) {
  if (!allergy_report || allergy_report.length === 0) return null

  const severityConfig = {
    SAFE: { bg: 'bg-emerald-50', text: 'text-emerald-700', border: 'border-emerald-200', badge: 'bg-emerald-100 text-emerald-700', icon: '✓' },
    CAUTION: { bg: 'bg-amber-50', text: 'text-amber-700', border: 'border-amber-200', badge: 'bg-amber-100 text-amber-700', icon: '⚠' },
    AVOID: { bg: 'bg-red-50', text: 'text-red-700', border: 'border-red-200', badge: 'bg-red-100 text-red-700', icon: '✕' }
  }

  return (
    <div className="mb-8">
      <div className="flex items-center gap-2 mb-4">
        <div className="w-8 h-8 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-lg flex items-center justify-center text-sm shadow-sm">🩺</div>
        <h2 className="text-xl font-bold text-slate-800">Allergy & Medical Risk Report</h2>
      </div>
      <div className="space-y-4">
        {allergy_report.map(veg => (
          <div key={veg.vegetable_id} className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden hover:shadow-md transition-shadow">
            <div className="bg-gradient-to-r from-slate-50 to-slate-100/50 px-5 py-3 border-b border-slate-100">
              <h3 className="font-bold text-slate-800 text-lg">{veg.vegetable_name}</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-slate-50/50">
                    <th className="p-3 text-left font-semibold text-slate-600">Group</th>
                    <th className="p-3 text-left font-semibold text-slate-600">Status</th>
                    <th className="p-3 text-left font-semibold text-slate-600">Recommendation</th>
                  </tr>
                </thead>
                <tbody>
                  {veg.risk_groups?.map((g, i) => {
                    const cfg = severityConfig[g.severity] || { bg: 'bg-slate-50', text: 'text-slate-700', border: 'border-slate-200', badge: 'bg-slate-100', icon: '?' }
                    return (
                      <tr key={i} className="border-t border-slate-50 hover:bg-slate-50/50 transition-colors">
                        <td className="p-3 text-slate-700 font-medium">{g.group}</td>
                        <td className="p-3">
                          <span className={`inline-flex items-center gap-1 text-xs font-bold px-2.5 py-1 rounded-full border ${cfg.badge} ${cfg.border}`}>
                            {cfg.icon} {g.severity}
                          </span>
                        </td>
                        <td className="p-3 text-slate-500 text-xs">{g.recommendation || g.reason}</td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
