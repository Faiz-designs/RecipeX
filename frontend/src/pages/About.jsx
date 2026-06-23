import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

const techStack = [
  { name: 'React', color: 'text-sky-600 dark:text-sky-400' },
  { name: 'Vite', color: 'text-purple-600 dark:text-purple-400' },
  { name: 'Tailwind', color: 'text-cyan-600 dark:text-cyan-400' },
  { name: 'FastAPI', color: 'text-emerald-600 dark:text-emerald-400' },
  { name: 'Groq AI', color: 'text-orange-600 dark:text-orange-400' },
  { name: 'SQLite', color: 'text-blue-600 dark:text-blue-400' },
  { name: 'PythonAnywhere', color: 'text-teal-600 dark:text-teal-400' },
  { name: 'Vercel', color: 'text-slate-600 dark:text-slate-400' },
]

export default function About() {
  const { t } = useTranslation()

  const features = [
    { emoji: '📸', title: t('about.features.aiScanner'), desc: t('about.features.aiScannerDesc') },
    { emoji: '🍳', title: t('about.features.smartRecipes'), desc: t('about.features.smartRecipesDesc') },
    { emoji: '🥦', title: t('about.features.nutritionData'), desc: t('about.features.nutritionDataDesc') },
    { emoji: '🩺', title: t('about.features.allergyReports'), desc: t('about.features.allergyReportsDesc') },
    { emoji: '📊', title: t('about.features.mealPlanning'), desc: t('about.features.mealPlanningDesc') },
    { emoji: '💰', title: t('about.features.budgetCooking'), desc: t('about.features.budgetCookingDesc') },
  ]

  return (
    <div className="animate-fadeIn">
      <div className="relative overflow-hidden bg-gradient-to-br from-emerald-600 via-emerald-500 to-teal-600 py-20 md:py-28">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 text-6xl animate-float">🥗</div>
          <div className="absolute top-20 right-20 text-5xl animate-float stagger-2">🤖</div>
          <div className="absolute bottom-16 left-1/4 text-4xl animate-float stagger-3">🥕</div>
          <div className="absolute top-1/3 right-1/4 text-5xl animate-float stagger-4">🍅</div>
          <div className="absolute bottom-20 right-10 text-4xl animate-float stagger-5">🥦</div>
        </div>
        <div className="relative max-w-3xl mx-auto text-center px-4">
          <div className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-sm rounded-full px-5 py-1.5 mb-6 border border-white/20">
            <span className="w-2 h-2 rounded-full bg-emerald-300 animate-pulse" />
            <span className="text-sm font-medium text-white/90">{t('about.tagline')}</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-extrabold text-white mb-5 leading-tight drop-shadow-md">
            {t('about.title')}
          </h1>
          <p className="text-lg text-emerald-100/90 mb-6 leading-relaxed max-w-xl mx-auto">
            {t('about.tagline')} — {t('about.missionDesc')}
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-16">
        <div className="bg-white dark:bg-slate-800/90 rounded-2xl shadow-lg border border-slate-200/80 dark:border-slate-700/60 p-8 md:p-10 mb-16 hover:shadow-xl transition-shadow">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-11 h-11 bg-gradient-to-br from-emerald-400 to-emerald-500 rounded-xl flex items-center justify-center text-lg shadow-md">🎯</div>
            <h2 className="text-2xl font-extrabold text-slate-800 dark:text-slate-100">{t('about.mission')}</h2>
          </div>
          <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-lg">
            {t('about.missionDesc')}
          </p>
        </div>

        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-extrabold text-slate-800 dark:text-slate-100 mb-3">{t('home.featuresTitle')}</h2>
          <p className="text-slate-500 dark:text-slate-400 max-w-lg mx-auto">{t('home.featuresDesc')}</p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-16">
          {features.map((item, i) => (
            <div key={i} className="group bg-white dark:bg-slate-800/90 rounded-2xl shadow-sm border border-slate-200/80 dark:border-slate-700/60 p-6 hover:shadow-xl hover:border-emerald-300 dark:hover:border-emerald-600 hover:-translate-y-1 transition-all duration-300">
              <div className="w-12 h-12 bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-900/50 dark:to-teal-900/50 rounded-xl flex items-center justify-center text-2xl mb-4 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-sm">
                {item.emoji}
              </div>
              <h3 className="font-bold text-slate-800 dark:text-slate-100 mb-1.5 text-lg">{item.title}</h3>
              <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>

        <div className="bg-white dark:bg-slate-800/90 rounded-2xl shadow-lg border border-slate-200/80 dark:border-slate-700/60 p-8 md:p-10 text-center mb-16 hover:shadow-xl transition-shadow">
          <div className="text-5xl mb-4">❤️</div>
          <h3 className="text-2xl font-extrabold text-slate-800 dark:text-slate-100 mb-2">{t('about.team')}</h3>
          <p className="text-slate-500 dark:text-slate-400 max-w-md mx-auto">
            {t('about.tagline')}
          </p>
        </div>

        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-extrabold text-slate-800 dark:text-slate-100 mb-3">{t('about.techStack')}</h2>
          <p className="text-slate-500 dark:text-slate-400 max-w-lg mx-auto">{t('about.techStack')}</p>
        </div>
        <div className="flex flex-wrap justify-center gap-3">
          {techStack.map((tech, i) => (
            <span key={i} className={`px-4 py-2 bg-white dark:bg-slate-800/90 border border-slate-200/80 dark:border-slate-700/60 rounded-xl text-sm font-semibold shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all ${tech.color}`}>
              {tech.name}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}
