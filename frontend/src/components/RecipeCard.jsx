import { useState } from 'react'
import { addRecipeIngredientsToList } from '../utils/shoppingList'
import { toggleFavorite, isFavorite } from '../utils/favorites'
import { useTranslation } from 'react-i18next'

export default function RecipeCard({ recipes, showActions }) {
  const { t } = useTranslation()
  if (!recipes) return null
  const levels = ['easy', 'intermediate', 'advanced']
  const levelConfig = {
    easy: { color: 'from-emerald-500 to-emerald-600', badge: 'bg-emerald-100 dark:bg-emerald-900/60 text-emerald-700 dark:text-emerald-300', step: 'bg-emerald-100 dark:bg-emerald-900/60 text-emerald-700 dark:text-emerald-300' },
    intermediate: { color: 'from-amber-500 to-amber-600', badge: 'bg-amber-100 dark:bg-amber-900/60 text-amber-700 dark:text-amber-300', step: 'bg-amber-100 dark:bg-amber-900/60 text-amber-700 dark:text-amber-300' },
    advanced: { color: 'from-red-500 to-red-600', badge: 'bg-red-100 dark:bg-red-900/60 text-red-700 dark:text-red-300', step: 'bg-red-100 dark:bg-red-900/60 text-red-700 dark:text-red-300' }
  }

  return (
    <div className="mb-8">
      <div className="flex items-center gap-2 mb-4">
        <div className="w-8 h-8 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-lg flex items-center justify-center text-sm shadow-sm">🍳</div>
        <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100">{t('scan.sections.recipes')}</h2>
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {levels.map(level => { const r = recipes[level]; if (!r) return null; return <RecipeCardItem key={level} level={level} r={r} config={levelConfig[level]} showActions={showActions} /> })}
      </div>
    </div>
  )
}

function RecipeCardItem({ level, r, config, showActions }) {
  const { t } = useTranslation()
  const [showAll, setShowAll] = useState(false)
  const [fav, setFav] = useState(isFavorite(r.name))
  const [addedMsg, setAddedMsg] = useState('')
  const displayed = showAll ? r.steps : r.steps?.slice(0, 3)

  const handleToggleFav = () => { const now = toggleFavorite(r.name); setFav(now) }
  const handleAddToList = () => {
    if (r.additional_ingredients_required && r.additional_ingredients_required.length) {
      addRecipeIngredientsToList(r.additional_ingredients_required)
      setAddedMsg(t('recipes.addedToList'))
      setTimeout(() => setAddedMsg(''), 2000)
    }
  }

  return (
    <div className="group bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700 overflow-hidden hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300">
      <div className={`bg-gradient-to-r ${config.color} px-5 py-3`}>
        <div className="flex items-center justify-between">
          <span className={`text-xs font-bold uppercase tracking-wider ${level === 'easy' ? 'text-emerald-100' : level === 'intermediate' ? 'text-amber-100' : 'text-red-100'}`}>{level}</span>
          <span className="text-white/80 text-xs">{r.total_time_minutes} min</span>
        </div>
        <h3 className="text-lg font-bold text-white mt-1">{r.name}</h3>
      </div>
      <div className="p-5">
        {r.additional_ingredients_required?.length > 0 && (
          <div className="mb-3">
            <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wide mb-1.5">{t('recipes.youWillNeed')}</p>
            <div className="flex flex-wrap gap-1.5">
              {r.additional_ingredients_required.map((ing, i) => (
                <span key={i} className="text-xs bg-amber-50 dark:bg-amber-900/40 text-amber-700 dark:text-amber-300 border border-amber-200 dark:border-amber-700 px-2.5 py-0.5 rounded-full font-medium">{ing}</span>
              ))}
            </div>
          </div>
        )}
        <ol className="text-sm text-slate-600 dark:text-slate-300 space-y-2">
          {displayed?.map((step, i) => (
            <li key={i} className="flex gap-2">
              <span className={`shrink-0 w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold mt-0.5 ${config.step}`}>{i + 1}</span>
              <span>{step}</span>
            </li>
          ))}
        </ol>
        {r.steps?.length > 3 && (
          <button onClick={() => setShowAll(!showAll)} className="text-sm font-medium text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 dark:hover:text-emerald-300 mt-3 transition-colors">
            {showAll ? `${t('recipes.showLess')} ↑` : `+${r.steps.length - 3} ${t('recipes.moreSteps')} ↓`}
          </button>
        )}
        {r.plating_suggestion && <p className="text-xs text-slate-400 dark:text-slate-500 italic mt-3 pt-3 border-t border-slate-100 dark:border-slate-700">💡 {r.plating_suggestion}</p>}
        <div className="flex items-center gap-3 mt-2">
          {r.servings && <span className="text-xs text-slate-400 dark:text-slate-500">🍽 {r.servings} {t('recipes.servings')}</span>}
          {r.estimated_cost && <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400">💰 ~{r.estimated_cost}</span>}
          {r.budget_friendly && <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-900/50 text-emerald-700 dark:text-emerald-300">{t('recipes.budget')} 👍</span>}
        </div>
        {showActions && (
          <div className="flex gap-2 mt-3 pt-3 border-t border-slate-100 dark:border-slate-700">
            <button onClick={handleAddToList} className="flex-1 text-xs font-medium bg-amber-50 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300 border border-amber-200 dark:border-amber-700/50 rounded-lg px-3 py-2 hover:bg-amber-100 dark:hover:bg-amber-900/50 transition-colors">
              {addedMsg || `🛒 ${t('recipes.addToList')}`}
            </button>
            <button onClick={handleToggleFav} className={`px-3 py-2 rounded-lg text-xs font-medium border transition-colors ${fav ? 'bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-400 border-red-200 dark:border-red-700/50' : 'bg-slate-50 dark:bg-slate-700/50 text-slate-500 dark:text-slate-400 border-slate-200 dark:border-slate-600 hover:border-red-200 dark:hover:border-red-700/50'}`}>
              {fav ? `❤️ ${t('recipes.saved')}` : `🤍 ${t('recipes.save')}`}
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
