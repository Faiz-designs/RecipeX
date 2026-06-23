import { useState } from 'react'
import { Link } from 'react-router-dom'
import { addRecipeIngredientsToList } from '../utils/shoppingList'
import { toggleFavorite, isFavorite } from '../utils/favorites'
import { useTranslation } from 'react-i18next'
import VideoSection from './VideoSection'
import PersonalizationBar, { getAgeGroup } from './PersonalizationBar'

function scaleIngredient(text, factor) {
  if (factor === 1) return text
  const match = text.match(/^(\d+)(?:\s*\/\s*(\d+))?(\.\d+)?\s*(.*)$/)
  if (!match) return text
  let num, rest
  if (match[2]) {
    num = parseInt(match[1], 10) / parseInt(match[2], 10)
    rest = match[4]
  } else if (match[3]) {
    num = parseFloat(match[1] + match[3])
    rest = match[4]
  } else if (match[1]) {
    num = parseInt(match[1], 10)
    rest = match[4]
  } else {
    return text
  }
  const scaled = num * factor
  const formatted = Number.isInteger(scaled) ? String(Math.round(scaled)) : scaled.toFixed(1).replace(/\.0$/, '')
  return `${formatted} ${rest}`.trim()
}

function stepGroups(steps) {
  if (!steps) return []
  const groups = []
  for (let i = 0; i < steps.length; i += 3) {
    groups.push(steps.slice(i, i + 3))
  }
  return groups
}

export default function RecipeCard({ recipes, showActions }) {
  const { t } = useTranslation()
  const [ageGroup, setAgeGroupState] = useState(getAgeGroup)
  if (!recipes) return null
  const levels = ['easy', 'intermediate', 'advanced']
  const levelConfig = {
    easy: { color: 'from-emerald-500 to-emerald-600', badge: 'bg-emerald-100 dark:bg-emerald-900/60 text-emerald-700 dark:text-emerald-300', step: 'bg-emerald-100 dark:bg-emerald-900/60 text-emerald-700 dark:text-emerald-300' },
    intermediate: { color: 'from-amber-500 to-amber-600', badge: 'bg-amber-100 dark:bg-amber-900/60 text-amber-700 dark:text-amber-300', step: 'bg-amber-100 dark:bg-amber-900/60 text-amber-700 dark:text-amber-300' },
    advanced: { color: 'from-red-500 to-red-600', badge: 'bg-red-100 dark:bg-red-900/60 text-red-700 dark:text-red-300', step: 'bg-red-100 dark:bg-red-900/60 text-red-700 dark:text-red-300' }
  }

  const filteredLevels = levels.filter(level => {
    if (ageGroup === 'child') return level === 'easy'
    if (ageGroup === 'elderly') return level === 'easy' || level === 'intermediate'
    return true
  })

  const handleAgeGroupChange = (group) => {
    setAgeGroupState(group)
  }

  return (
    <div className="mb-8">
      <div className="flex items-center justify-between gap-4 mb-4">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-lg flex items-center justify-center text-sm shadow-sm">🍳</div>
          <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100">{t('scan.sections.recipes')}</h2>
        </div>
        <PersonalizationBar onAgeGroupChange={handleAgeGroupChange} />
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredLevels.map(level => { const r = recipes[level]; if (!r) return null; return <RecipeCardItem key={level} level={level} r={r} config={levelConfig[level]} showActions={showActions} /> })}
      </div>
    </div>
  )
}

function RecipeCardItem({ level, r, config, showActions }) {
  const { t } = useTranslation()
  const [showAll, setShowAll] = useState(false)
  const [fav, setFav] = useState(isFavorite(r.name))
  const [addedMsg, setAddedMsg] = useState('')
  const [servings, setServings] = useState(r.servings || 2)
  const [unitSystem, setUnitSystem] = useState('metric')
  const [checkedIngredients, setCheckedIngredients] = useState(new Set())

  const originalServings = r.servings || 2
  const scaleFactor = servings / originalServings

  const handleToggleFav = () => { const now = toggleFavorite(r.name); setFav(now) }
  const handleAddToList = () => {
    if (r.additional_ingredients_required && r.additional_ingredients_required.length) {
      addRecipeIngredientsToList(r.additional_ingredients_required)
      setAddedMsg(t('recipes.addedToList'))
      setTimeout(() => setAddedMsg(''), 2000)
    }
  }

  const toggleChecked = (idx) => {
    setCheckedIngredients(prev => {
      const next = new Set(prev)
      if (next.has(idx)) next.delete(idx)
      else next.add(idx)
      return next
    })
  }

  const gatherAll = () => {
    const len = r.additional_ingredients_required?.length || 0
    if (!len) return
    if (checkedIngredients.size === len) {
      setCheckedIngredients(new Set())
    } else {
      setCheckedIngredients(new Set(Array.from({ length: len }, (_, i) => i)))
    }
  }

  const convertUnit = (text) => {
    if (unitSystem === 'metric') return text
    return text
      .replace(/(\d+(?:\.\d+)?)\s*g\b/g, (_, n) => `${(parseFloat(n) / 28.35).toFixed(1)} oz`)
      .replace(/(\d+(?:\.\d+)?)\s*ml\b/g, (_, n) => `${(parseFloat(n) / 29.57).toFixed(1)} fl oz`)
      .replace(/(\d+(?:\.\d+)?)\s*kg\b/g, (_, n) => `${(parseFloat(n) * 2.205).toFixed(1)} lb`)
  }

  const groups = stepGroups(r.steps)
  const displayedGroups = showAll ? groups : groups.slice(0, 1)

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
        <div className="flex items-center gap-2 mb-3">
          <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">{t('recipeCard.scale')}:</span>
          <button onClick={() => setServings(Math.max(1, servings - 1))} className="w-6 h-6 rounded-full bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 flex items-center justify-center text-sm font-bold hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors">−</button>
          <span className="text-sm font-bold text-slate-700 dark:text-slate-200 min-w-[2rem] text-center">{servings}</span>
          <button onClick={() => setServings(Math.min(20, servings + 1))} className="w-6 h-6 rounded-full bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 flex items-center justify-center text-sm font-bold hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors">+</button>
          <span className="text-xs text-slate-400 dark:text-slate-500">{t('recipeCard.servings')}</span>
          <button onClick={() => setUnitSystem(unitSystem === 'metric' ? 'imperial' : 'metric')} className="ml-auto text-xs font-medium px-2 py-1 rounded-lg border border-slate-200 dark:border-slate-600 text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors">
            {unitSystem === 'metric' ? t('recipeCard.metric') : t('recipeCard.imperial')}
          </button>
        </div>

        {r.additional_ingredients_required?.length > 0 && (
          <div className="mb-3">
            <div className="flex items-center justify-between mb-1.5">
              <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wide">{t('recipes.youWillNeed')}</p>
              <button onClick={gatherAll} className="text-xs text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 dark:hover:text-emerald-300 font-medium transition-colors">
                {checkedIngredients.size === r.additional_ingredients_required.length && checkedIngredients.size > 0 ? t('recipeCard.checked') : t('recipeCard.gatherAll')}
              </button>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {r.additional_ingredients_required.map((ing, i) => {
                const scaled = scaleFactor !== 1 ? scaleIngredient(ing, scaleFactor) : ing
                const converted = convertUnit(scaled)
                const checked = checkedIngredients.has(i)
                return (
                  <label key={i} className={`cursor-pointer text-xs px-2.5 py-0.5 rounded-full font-medium border transition-colors ${checked ? 'bg-slate-100 dark:bg-slate-700 text-slate-400 dark:text-slate-500 border-slate-200 dark:border-slate-600 line-through' : 'bg-amber-50 dark:bg-amber-900/40 text-amber-700 dark:text-amber-300 border-amber-200 dark:border-amber-700'}`}>
                    <input type="checkbox" checked={checked} onChange={() => toggleChecked(i)} className="sr-only" />
                    {converted || ing}
                  </label>
                )
              })}
            </div>
          </div>
        )}

        {groups.length > 0 && (
          <div className="relative">
            {displayedGroups.map((group, gi) => {
              const start = gi * 3 + 1
              const end = gi * 3 + group.length
              return (
                <div key={gi} className="mb-4">
                  <div className="text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wide mb-2">
                    {t('recipeCard.stepGroup', { start, end })}
                  </div>
                  <div className="relative pl-4 border-l-2 border-slate-200 dark:border-slate-600 space-y-3">
                    {group.map((step, si) => {
                      const globalIdx = gi * 3 + si
                      return (
                        <div key={si} className="relative">
                          <div className="absolute -left-[1.35rem] top-1 w-2.5 h-2.5 rounded-full bg-white dark:bg-slate-800 border-2 border-slate-300 dark:border-slate-500" />
                          <div className="text-sm text-slate-600 dark:text-slate-300 ml-2">{globalIdx + 1}. {step}</div>
                        </div>
                      )
                    })}
                  </div>
                </div>
              )
            })}
          </div>
        )}

        {r.steps?.length > 3 && (
          <button onClick={() => setShowAll(!showAll)} className="text-sm font-medium text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 dark:hover:text-emerald-300 mt-3 transition-colors">
            {showAll ? `${t('recipes.showLess')} ↑` : `+${r.steps.length - 3} ${t('recipes.moreSteps')} ↓`}
          </button>
        )}

        {r.plating_suggestion && <p className="text-xs text-slate-400 dark:text-slate-500 italic mt-3 pt-3 border-t border-slate-100 dark:border-slate-700">💡 {r.plating_suggestion}</p>}

        {r.name && <VideoSection recipeName={r.name} difficulty={level} />}

        <div className="flex items-center gap-3 mt-2">
          {r.servings && <span className="text-xs text-slate-400 dark:text-slate-500">🍽 {servings} {t('recipes.servings')}</span>}
          {r.estimated_cost && <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400">💰 ~{r.estimated_cost}</span>}
          {r.budget_friendly && <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-900/50 text-emerald-700 dark:text-emerald-300">{t('recipes.budget')} 👍</span>}
        </div>

        {showActions && (
          <div className="flex gap-2 mt-3 pt-3 border-t border-slate-100 dark:border-slate-700">
            <button onClick={handleAddToList} aria-label={t('recipes.addToList')} className="flex-1 text-xs font-medium bg-amber-50 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300 border border-amber-200 dark:border-amber-700/50 rounded-lg px-3 py-2 hover:bg-amber-100 dark:hover:bg-amber-900/50 transition-colors">
              {addedMsg || `🛒 ${t('recipes.addToList')}`}
            </button>
            <button onClick={handleToggleFav} aria-label={fav ? t('recipes.saved') : t('recipes.save')} className={`px-3 py-2 rounded-lg text-xs font-medium border transition-colors ${fav ? 'bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-400 border-red-200 dark:border-red-700/50' : 'bg-slate-50 dark:bg-slate-700/50 text-slate-500 dark:text-slate-400 border-slate-200 dark:border-slate-600 hover:border-red-200 dark:hover:border-red-700/50'}`}>
              {fav ? `❤️ ${t('recipes.saved')}` : `🤍 ${t('recipes.save')}`}
            </button>
            <Link to="/cooking-mode" state={{ recipe: r }} className="flex-1 text-xs font-medium bg-emerald-50 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-700/50 rounded-lg px-3 py-2 hover:bg-emerald-100 dark:hover:bg-emerald-900/50 transition-colors text-center">
              👨‍🍳 {t('cookingMode.start')}
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}
