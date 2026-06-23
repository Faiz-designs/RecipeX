import { useTranslation } from 'react-i18next'

export default function AllergyReport({ allergy_report }) {
  const { t } = useTranslation()
  if (!allergy_report || allergy_report.length === 0) return null

  const severityConfig = {
    SAFE: { badge: 'bg-emerald-100 dark:bg-emerald-900/60 text-emerald-700 dark:text-emerald-300 border-emerald-200 dark:border-emerald-700', icon: '✓' },
    CAUTION: { badge: 'bg-amber-100 dark:bg-amber-900/60 text-amber-700 dark:text-amber-300 border-amber-200 dark:border-amber-700', icon: '⚠' },
    AVOID: { badge: 'bg-red-100 dark:bg-red-900/60 text-red-700 dark:text-red-300 border-red-200 dark:border-red-700', icon: '✕' }
  }

  return (
    <div className="mb-8">
      <div className="flex items-center gap-2 mb-4">
        <div className="w-8 h-8 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-lg flex items-center justify-center text-sm shadow-sm">🩺</div>
        <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100">{t('allergy.title')}</h2>
      </div>
      <div className="space-y-4">
        {allergy_report.map(veg => (
          <div key={veg.vegetable_id} className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700 overflow-hidden hover:shadow-md transition-shadow">
            <div className="bg-gradient-to-r from-slate-50 to-slate-100/50 dark:from-slate-700/50 dark:to-slate-700/30 px-5 py-3 border-b border-slate-100 dark:border-slate-700">
              <h3 className="font-bold text-slate-800 dark:text-slate-100 text-lg">{veg.vegetable_name}</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-slate-50/50 dark:bg-slate-700/30">
                    <th className="p-3 text-left font-semibold text-slate-600 dark:text-slate-300">{t('allergy.group')}</th>
                    <th className="p-3 text-left font-semibold text-slate-600 dark:text-slate-300">{t('allergy.status')}</th>
                    <th className="p-3 text-left font-semibold text-slate-600 dark:text-slate-300">{t('allergy.recommendation')}</th>
                  </tr>
                </thead>
                <tbody>
                  {veg.risk_groups?.map((g, i) => {
                    const cfg = severityConfig[g.severity] || { badge: 'bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300', icon: '?' }
                    return (
                      <tr key={i} className="border-t border-slate-50 dark:border-slate-700/50 hover:bg-slate-50/50 dark:hover:bg-slate-700/30 transition-colors">
                        <td className="p-3 text-slate-700 dark:text-slate-200 font-medium">{g.group}</td>
                        <td className="p-3"><span className={`inline-flex items-center gap-1 text-xs font-bold px-2.5 py-1 rounded-full border ${cfg.badge}`}>{cfg.icon} {g.severity}</span></td>
                        <td className="p-3 text-slate-500 dark:text-slate-400 text-xs">{g.recommendation || g.reason}</td>
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
