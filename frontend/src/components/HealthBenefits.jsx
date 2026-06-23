import { useTranslation } from 'react-i18next'

export default function HealthBenefits({ health_benefits }) {
  const { t } = useTranslation()
  if (!health_benefits || health_benefits.length === 0) return null
  return (
    <div className="mb-8">
      <div className="flex items-center gap-2 mb-4">
        <div className="w-8 h-8 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-lg flex items-center justify-center text-sm shadow-sm">💚</div>
        <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100">{t('scan.sections.healthBenefits')}</h2>
      </div>
      <div className="space-y-4">
        {health_benefits.map((veg) => (
          <div key={veg.vegetable_id} className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700 overflow-hidden hover:shadow-md transition-shadow">
            <div className="bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-emerald-900/30 dark:to-teal-900/30 px-5 py-3 border-b border-slate-100 dark:border-slate-700">
              <h3 className="font-bold text-slate-800 dark:text-slate-100 text-lg">{veg.vegetable_name}</h3>
            </div>
            <div className="p-4 grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {veg.benefits?.map((b, i) => (
                <div key={i} className="bg-emerald-50/50 dark:bg-emerald-900/15 border border-emerald-100 dark:border-emerald-800/40 rounded-xl p-3.5 hover:shadow-sm transition-shadow">
                  <div className="flex items-center gap-1.5 mb-1">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 shrink-0" />
                    <h4 className="font-bold text-emerald-700 dark:text-emerald-300 text-sm">{b.benefit}</h4>
                  </div>
                  <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">{b.detail}</p>
                  {b.science && <p className="text-xs text-slate-400 dark:text-slate-500 mt-1 italic">📚 {b.science}</p>}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
