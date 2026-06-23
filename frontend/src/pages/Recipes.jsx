import { useState, useEffect, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import SEO from '../components/SEO'
import { getPantry, addToPantry, removeFromPantry, clearPantry } from '../utils/pantry'
import { addRecipeIngredientsToList } from '../utils/shoppingList'

function getFavorites() {
  try { return JSON.parse(localStorage.getItem('nutrivision_favorites') || '[]') } catch { return [] }
}

function toggleFavorite(name) {
  const favs = getFavorites()
  const idx = favs.indexOf(name)
  if (idx === -1) { favs.push(name) } else { favs.splice(idx, 1) }
  localStorage.setItem('nutrivision_favorites', JSON.stringify(favs))
  return favs
}

function flattenRecipes(data) {
  const items = []
  if (data?.result?.recipes) {
    const r = data.result.recipes
    if (r.easy) items.push({ ...r.easy, difficulty: 'easy' })
    if (r.intermediate) items.push({ ...r.intermediate, difficulty: 'intermediate' })
    if (r.advanced) items.push({ ...r.advanced, difficulty: 'advanced' })
  }
  return items
}

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

function RecipeCardInline({ r, config, isExpanded, onToggleExpand, isFav, onSave, pantry }) {
  const { t } = useTranslation()
  const [servings, setServings] = useState(r.servings || 2)
  const [unitSystem, setUnitSystem] = useState('metric')
  const [checkedIngredients, setCheckedIngredients] = useState(new Set())
  const [addedMsg, setAddedMsg] = useState('')

  const originalServings = r.servings || 2
  const scaleFactor = servings / originalServings

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

  const handleAddToList = () => {
    if (r.additional_ingredients_required && r.additional_ingredients_required.length) {
      addRecipeIngredientsToList(r.additional_ingredients_required)
      setAddedMsg(t('recipes.addedToList'))
      setTimeout(() => setAddedMsg(''), 2000)
    }
  }

  const groups = stepGroups(r.steps)
  const displayedGroups = isExpanded ? groups : groups.slice(0, 1)

  return (
    <div className="group bg-white dark:bg-slate-800/90 border border-slate-200/80 dark:border-slate-700/60 rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden">
      <div className={`bg-gradient-to-r ${config.header} px-5 py-4 relative overflow-hidden`}>
        <div className="absolute inset-0 bg-white/5" />
        <div className="relative flex items-center justify-between">
          <span className="text-xs font-bold uppercase tracking-wider text-white/90">{config.label}</span>
          <div className="flex items-center gap-2">
            {r.matchScore > 0 && (
              <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${r.matchScore >= 50 ? 'bg-white/30 text-white' : 'bg-white/20 text-white/90'}`}>
                {r.matchScore}% match
              </span>
            )}
            <span className="text-white/80 text-xs">{r.total_time_minutes} min</span>
          </div>
        </div>
        <h3 className="text-xl font-extrabold text-white mt-1.5 pr-8 relative">{r.name}</h3>
        <button onClick={() => onSave(r.name)} className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center hover:bg-white/40 transition-all hover:scale-110 active:scale-95" title={isFav ? t('recipes.saved') : t('recipes.save')}>
          <span className={`text-sm ${isFav ? 'text-red-400' : 'text-white/80'}`}>{isFav ? '❤️' : '🤍'}</span>
        </button>
      </div>
      <div className="p-5">
        <div className="flex items-center gap-2 mb-4">
          <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wide">{t('recipeCard.scale')}:</span>
          <div className="flex items-center gap-1.5 bg-slate-100 dark:bg-slate-700/50 rounded-lg p-0.5">
            <button onClick={() => setServings(Math.max(1, servings - 1))} className="w-7 h-7 rounded-md bg-white dark:bg-slate-600 text-slate-600 dark:text-slate-300 flex items-center justify-center text-base font-bold hover:bg-emerald-50 dark:hover:bg-slate-500 hover:text-emerald-600 dark:hover:text-emerald-400 transition-all shadow-sm">−</button>
            <span className="text-sm font-bold text-slate-700 dark:text-slate-200 min-w-[2.5rem] text-center">{servings}</span>
            <button onClick={() => setServings(Math.min(20, servings + 1))} className="w-7 h-7 rounded-md bg-white dark:bg-slate-600 text-slate-600 dark:text-slate-300 flex items-center justify-center text-base font-bold hover:bg-emerald-50 dark:hover:bg-slate-500 hover:text-emerald-600 dark:hover:text-emerald-400 transition-all shadow-sm">+</button>
          </div>
          <span className="text-xs text-slate-400 dark:text-slate-500">{t('recipeCard.servings')}</span>
          <button onClick={() => setUnitSystem(unitSystem === 'metric' ? 'imperial' : 'metric')} className={`ml-auto text-xs font-bold px-3 py-1.5 rounded-xl border transition-all duration-200 ${unitSystem === 'metric' ? 'bg-emerald-50 dark:bg-emerald-900/40 text-emerald-600 dark:text-emerald-400 border-emerald-200 dark:border-emerald-700 shadow-sm' : 'bg-white dark:bg-slate-700 text-slate-500 dark:text-slate-400 border-slate-200 dark:border-slate-600 hover:border-emerald-300 dark:hover:border-emerald-600'}`}>
            {unitSystem === 'metric' ? t('recipeCard.metric') : t('recipeCard.imperial')}
          </button>
        </div>

        {r.additional_ingredients_required?.length > 0 && (
          <div className="mb-4">
            <div className="flex items-center justify-between mb-2">
              <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wide">{t('recipes.youWillNeed')}</p>
              <button onClick={gatherAll} className="text-xs text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 dark:hover:text-emerald-300 font-semibold transition-colors">
                {checkedIngredients.size === r.additional_ingredients_required.length && checkedIngredients.size > 0 ? t('recipeCard.checked') : t('recipeCard.gatherAll')}
              </button>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {r.additional_ingredients_required.map((ing, j) => {
                const scaled = scaleFactor !== 1 ? scaleIngredient(ing, scaleFactor) : ing
                const converted = convertUnit(scaled)
                const checked = checkedIngredients.has(j)
                const inPantry = pantry.some(p => ing.toLowerCase().includes(p.toLowerCase()) || p.toLowerCase().includes(ing.toLowerCase()))
                return (
                  <label key={j} className={`cursor-pointer text-xs px-3 py-1 rounded-full font-semibold border transition-all duration-200 ${checked ? 'bg-slate-100 dark:bg-slate-700 text-slate-400 dark:text-slate-500 border-slate-200 dark:border-slate-600 line-through shadow-sm' : inPantry ? 'bg-emerald-50 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-300 border-emerald-200/80 dark:border-emerald-700/60 hover:bg-emerald-100 dark:hover:bg-emerald-900/60 hover:shadow-sm active:scale-95' : 'bg-amber-50 dark:bg-amber-900/40 text-amber-700 dark:text-amber-300 border-amber-200/80 dark:border-amber-700/60 hover:bg-amber-100 dark:hover:bg-amber-900/60 hover:shadow-sm active:scale-95'}`}>
                    <input type="checkbox" checked={checked} onChange={() => toggleChecked(j)} className="sr-only" />
                    <span className={`inline-block w-3.5 h-3.5 rounded border-2 mr-1.5 align-middle transition-all duration-200 ${checked ? 'bg-emerald-500 border-emerald-500' : 'bg-white dark:bg-slate-800 border-slate-300 dark:border-slate-500'}`}>
                      {checked && <svg className="w-full h-full text-white" viewBox="0 0 12 12" fill="none"><path d="M2.5 6L5 8.5L9.5 3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>}
                    </span>
                    {converted || ing} {inPantry && !checked ? '✓' : ''}
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
                <div key={gi} className="mb-5">
                  <div className="flex items-center gap-2 mb-3">
                    <div className={`w-1.5 h-1.5 rounded-full ${config.badge}`} />
                    <span className="text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wide">
                      {t('recipeCard.stepGroup', { start, end })}
                    </span>
                  </div>
                  <div className="relative pl-6 border-l-2 border-slate-200 dark:border-slate-600 space-y-4">
                    {group.map((step, si) => {
                      const globalIdx = gi * 3 + si
                      return (
                        <div key={si} className="relative group/step">
                          <div className={`absolute -left-[1.85rem] top-1 w-3 h-3 rounded-full bg-white dark:bg-slate-800 border-2 ${config.badge} shadow-sm transition-transform duration-200 group-hover/step:scale-125`} />
                          <div className="text-sm text-slate-600 dark:text-slate-300 ml-1 leading-relaxed">{globalIdx + 1}. {step}</div>
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
          <button onClick={onToggleExpand} className="text-sm font-bold text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 dark:hover:text-emerald-300 mt-2 mb-1 transition-all duration-200 inline-flex items-center gap-1">
            {isExpanded ? <>{t('recipes.showLess')} ↑</> : <>+{r.steps.length - 3} {t('recipes.moreSteps')} ↓</>}
          </button>
        )}

        {r.plating_suggestion && (
          <div className="mt-4 pt-4 border-t border-dashed border-slate-100 dark:border-slate-700">
            <p className="text-xs text-slate-500 dark:text-slate-400 italic leading-relaxed flex items-start gap-2">
              <span className="w-5 h-5 rounded-full bg-emerald-100 dark:bg-emerald-900/40 flex items-center justify-center text-xs shrink-0 mt-0.5">💡</span>
              <span>{r.plating_suggestion}</span>
            </p>
          </div>
        )}

        <div className="flex items-center gap-3 mt-3">
          {r.servings && <span className="text-xs text-slate-400 dark:text-slate-500">🍽 {servings} {t('recipes.servings')}</span>}
          {r.estimated_cost && <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400">💰 ~{r.estimated_cost}</span>}
          {r.budget_friendly && <span className="text-xs px-2.5 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-900/50 text-emerald-700 dark:text-emerald-300 font-semibold">{t('recipes.budget')} 👍</span>}
        </div>

        <div className="grid grid-cols-3 gap-2 mt-4 pt-4 border-t border-slate-100 dark:border-slate-700">
          <button onClick={handleAddToList} aria-label={t('recipes.addToList')} className="flex items-center justify-center gap-1.5 text-xs font-semibold bg-amber-50 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300 border border-amber-200/80 dark:border-amber-700/50 rounded-xl px-2 py-2.5 hover:bg-amber-100 dark:hover:bg-amber-900/50 transition-all duration-200 hover:shadow-sm active:scale-[0.97]">
            <span className="text-base">🛒</span>
            <span>{addedMsg || t('recipes.addToList')}</span>
          </button>
          <button onClick={() => onSave(r.name)} aria-label={isFav ? t('recipes.saved') : t('recipes.save')} className={`flex items-center justify-center gap-1.5 text-xs font-semibold rounded-xl px-2 py-2.5 border transition-all duration-200 active:scale-[0.97] ${isFav ? 'bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-400 border-red-200/80 dark:border-red-700/50 shadow-sm' : 'bg-slate-50 dark:bg-slate-700/50 text-slate-500 dark:text-slate-400 border-slate-200 dark:border-slate-600 hover:border-red-200 dark:hover:border-red-700/50 hover:shadow-sm'}`}>
            <span className="text-base">{isFav ? '❤️' : '🤍'}</span>
            <span>{isFav ? t('recipes.saved') : t('recipes.save')}</span>
          </button>
          <Link to="/cooking-mode" state={{ recipe: r }} className="flex items-center justify-center gap-1.5 text-xs font-semibold bg-emerald-50 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300 border border-emerald-200/80 dark:border-emerald-700/50 rounded-xl px-2 py-2.5 hover:bg-emerald-100 dark:hover:bg-emerald-900/50 transition-all duration-200 hover:shadow-sm active:scale-[0.97] text-center">
            <span className="text-base">👨‍🍳</span>
            <span>{t('cookingMode.start')}</span>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default function Recipes() {
  const { t } = useTranslation()
  const [recipes, setRecipes] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [filter, setFilter] = useState('All')
  const [search, setSearch] = useState('')
  const [expanded, setExpanded] = useState(null)
  const [favorites, setFavorites] = useState(getFavorites)
  const [pantry, setPantry] = useState(getPantry)
  const [showPantry, setShowPantry] = useState(false)
  const [pantryFilter, setPantryFilter] = useState('All')
  const [pantryInput, setPantryInput] = useState('')
  const [prepTime, setPrepTime] = useState('any')
  const [diet, setDiet] = useState('all')
  const [season, setSeason] = useState('all')

  const dietKeywords = {
    vegetarian: ['chicken', 'fish', 'pork', 'beef', 'mutton', 'lamb', 'egg'],
    vegan: ['chicken', 'fish', 'pork', 'beef', 'mutton', 'lamb', 'egg', 'milk', 'cheese', 'butter', 'cream', 'yogurt', 'honey'],
    glutenFree: ['wheat', 'flour', 'bread', 'pasta', 'noodles', 'soy sauce', 'couscous', 'barley'],
    lowCarb: ['rice', 'pasta', 'noodles', 'bread', 'flour', 'sugar', 'potato', 'sweet potato'],
  }

  const seasonIngredients = {
    spring: ['asparagus', 'artichoke', 'peas', 'radish', 'spinach', 'strawberry', 'lettuce'],
    summer: ['tomato', 'cucumber', 'bell pepper', 'corn', 'eggplant', 'zucchini', 'basil', 'watermelon', 'berries'],
    fall: ['pumpkin', 'squash', 'apple', 'pear', 'mushroom', 'sweet potato', 'broccoli', 'cauliflower'],
    winter: ['kale', 'cabbage', 'carrot', 'potato', 'onion', 'garlic', 'ginger', 'citrus', 'beet'],
  }

  function getRecipeText(r) {
    return [r.name || '', ...(r.additional_ingredients_required || []), ...(r.steps || [])].join(' ').toLowerCase()
  }

  function matchesDiet(recipeText, dietType) {
    const keywords = dietKeywords[dietType]
    if (!keywords) return true
    return !keywords.some(kw => recipeText.includes(kw))
  }

  function matchesSeason(recipeText, seasonType) {
    const keywords = seasonIngredients[seasonType]
    if (!keywords) return true
    return keywords.some(kw => recipeText.includes(kw))
  }

  const difficultyConfig = {
    easy: { label: t('recipes.easy'), badge: 'bg-emerald-100 dark:bg-emerald-900/60 text-emerald-700 dark:text-emerald-300', header: 'from-emerald-500 to-emerald-600' },
    intermediate: { label: t('recipes.intermediate'), badge: 'bg-amber-100 dark:bg-amber-900/60 text-amber-700 dark:text-amber-300', header: 'from-amber-500 to-amber-600' },
    advanced: { label: t('recipes.advanced'), badge: 'bg-red-100 dark:bg-red-900/60 text-red-700 dark:text-red-300', header: 'from-red-500 to-red-600' },
  }

  useEffect(() => {
    fetch('https://FaizBasha05.pythonanywhere.com/scan/demo')
      .then(res => {
        if (!res.ok) throw new Error(`Failed to fetch (${res.status})`)
        return res.json()
      })
      .then(data => { setRecipes(flattenRecipes(data)); setLoading(false) })
      .catch(err => { setError(err.message); setLoading(false) })
  }, [])

  const recipeMatchScores = useMemo(() => {
    if (pantry.length === 0) return recipes.map(r => ({ ...r, matchScore: 0 }))
    return recipes.map(r => {
      const ingredients = r.additional_ingredients_required || []
      if (ingredients.length === 0) return { ...r, matchScore: 0 }
      const matched = ingredients.filter(ing =>
        pantry.some(p => ing.toLowerCase().includes(p.toLowerCase()) || p.toLowerCase().includes(ing.toLowerCase()))
      ).length
      return { ...r, matchScore: Math.round((matched / ingredients.length) * 100) }
    })
  }, [recipes, pantry])

  const filtered = recipeMatchScores.filter(r => {
    if (filter !== 'All' && r.difficulty !== filter.toLowerCase()) return false
    if (pantryFilter === 'Pantry Match (High)' && r.matchScore < 50) return false
    if (pantryFilter === 'Pantry Match (Low)' && (r.matchScore < 1 || r.matchScore >= 50)) return false
    if (search) {
      const q = search.toLowerCase()
      const nameMatch = r.name.toLowerCase().includes(q)
      const ingMatch = r.additional_ingredients_required?.some(i => i.toLowerCase().includes(q))
      if (!nameMatch && !ingMatch) return false
    }
    if (prepTime !== 'any') {
      const t = r.total_time_minutes
      if (prepTime === 'under15' && (t >= 15 || t == null)) return false
      if (prepTime === 'under30' && (t >= 30 || t == null)) return false
      if (prepTime === 'over30' && (t < 30 || t == null)) return false
    }
    if (diet !== 'all') {
      const text = getRecipeText(r)
      if (!matchesDiet(text, diet)) return false
    }
    if (season !== 'all') {
      const text = getRecipeText(r)
      if (!matchesSeason(text, season)) return false
    }
    return true
  })

  const levels = [
    { key: 'All', label: t('recipes.all') },
    { key: 'Easy', label: t('recipes.easy') },
    { key: 'Intermediate', label: t('recipes.intermediate') },
    { key: 'Advanced', label: t('recipes.advanced') },
  ]

  const pantryMatchOptions = ['All', 'Pantry Match (High)', 'Pantry Match (Low)']

  const handleSave = (name) => {
    const updated = toggleFavorite(name)
    setFavorites([...updated])
  }

  const handleAddPantry = () => {
    if (!pantryInput.trim()) return
    const updated = addToPantry(pantryInput.trim())
    setPantry([...updated])
    setPantryInput('')
  }

  const handleRemovePantry = (item) => {
    const updated = removeFromPantry(item)
    setPantry([...updated])
  }

  const handleClearPantry = () => {
    clearPantry()
    setPantry([])
  }

  if (loading) {
    return (
      <div className="max-w-5xl mx-auto px-4 py-8">
        <div className="relative overflow-hidden bg-gradient-to-br from-emerald-600 via-emerald-500 to-emerald-400 rounded-2xl mb-8">
          <div className="absolute inset-0 bg-white/5" />
          <div className="relative h-48 flex items-center justify-center">
            <div className="flex items-center gap-3 text-white">
              <div className="relative w-10 h-10">
                <div className="absolute inset-0 rounded-full bg-white/20 animate-ping opacity-30" />
                <div className="absolute inset-0 border-[3px] border-white/30 border-t-white rounded-full animate-spin" />
              </div>
              <span className="text-lg font-bold">{t('recipes.loading')}</span>
            </div>
          </div>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {[1, 2, 3].map(i => (
            <div key={i} className="bg-white dark:bg-slate-800/90 border border-slate-200/80 dark:border-slate-700/60 rounded-2xl overflow-hidden shadow-sm">
              <div className="h-20 bg-gradient-to-r from-slate-200 via-slate-300 to-slate-200 dark:from-slate-700 dark:via-slate-600 dark:to-slate-700 animate-shimmer" />
              <div className="p-5 space-y-3">
                <div className="h-5 bg-slate-200 dark:bg-slate-700 rounded-lg animate-shimmer w-3/4" />
                <div className="h-3 bg-slate-200 dark:bg-slate-700 rounded animate-shimmer w-1/2" />
                <div className="h-3 bg-slate-200 dark:bg-slate-700 rounded animate-shimmer w-full" />
                <div className="h-3 bg-slate-200 dark:bg-slate-700 rounded animate-shimmer w-5/6" />
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="max-w-5xl mx-auto px-4 py-8">
        <div className="relative overflow-hidden bg-gradient-to-br from-emerald-600 via-emerald-500 to-emerald-400 rounded-2xl mb-8">
          <div className="absolute inset-0 bg-white/5" />
          <div className="relative h-48 flex items-center justify-center">
            <h1 className="text-4xl font-extrabold text-white">{t('recipes.title')}</h1>
          </div>
        </div>
        <div className="bg-red-50/90 dark:bg-red-900/25 backdrop-blur-sm border border-red-200/60 dark:border-red-800/50 rounded-2xl p-8 text-center shadow-sm">
          <div className="text-5xl mb-4">⚠️</div>
          <p className="text-red-700 dark:text-red-300 font-bold text-lg mb-1">{t('recipes.failedToLoad')}</p>
          <p className="text-red-500 dark:text-red-400 text-sm mb-5">{error}</p>
          <button onClick={() => window.location.reload()} className="px-6 py-2.5 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white rounded-xl font-bold hover:from-emerald-600 hover:to-emerald-700 transition-all duration-300 shadow-md hover:shadow-lg hover:shadow-emerald-500/20 active:scale-[0.98] ring-1 ring-emerald-500/20">{t('recipes.tryAgain')}</button>
        </div>
      </div>
    )
  }

  return (
    <>
      <SEO title="Explore Recipes" description="Browse AI-generated recipes from scanned vegetables. Filter by difficulty, diet, prep time, and season." />
      <div className="animate-fadeIn">
      <div className="relative overflow-hidden bg-gradient-to-br from-emerald-600 via-emerald-500 to-emerald-400 animate-gradient py-20 md:py-28">
        <div className="absolute inset-0 bg-white/5" />
        <div className="absolute inset-0 opacity-15">
          <div className="absolute top-10 left-10 text-6xl animate-float">🍳</div>
          <div className="absolute top-20 right-20 text-5xl animate-float stagger-2">🥘</div>
          <div className="absolute bottom-16 left-1/4 text-4xl animate-float stagger-3">🥗</div>
          <div className="absolute top-1/3 right-1/4 text-5xl animate-float stagger-4">🍝</div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent" />
        <div className="relative max-w-3xl mx-auto text-center px-4">
          <h1 className="text-5xl md:text-6xl font-extrabold text-white mb-5 leading-tight drop-shadow-sm">{t('recipes.title')}</h1>
          <p className="text-lg text-emerald-100/90 leading-relaxed max-w-xl mx-auto font-medium">
            {t('recipes.subtitle')}
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-8">
        <div className="flex gap-2 mb-4">
          <div className="relative flex-1">
            <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500 text-sm">🔍</span>
            <input
              type="search"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder={`${t('recipes.searchHint')} — add pantry items to see matches`}
              className="w-full pl-9 pr-4 py-2.5 bg-white dark:bg-slate-800/90 border border-slate-200/80 dark:border-slate-700/60 rounded-xl text-sm text-slate-700 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-400/50 focus:border-emerald-400 transition-all duration-200 shadow-sm placeholder:text-slate-400 dark:placeholder:text-slate-500"
            />
          </div>
          <button
            onClick={() => setShowPantry(!showPantry)}
            className={`px-4 py-2.5 rounded-xl text-sm font-bold border transition-all duration-300 active:scale-[0.98] ${showPantry ? 'bg-emerald-500 text-white border-emerald-500 shadow-md shadow-emerald-500/20 ring-1 ring-emerald-500/20' : 'bg-white dark:bg-slate-800/90 text-slate-600 dark:text-slate-300 border-slate-200/80 dark:border-slate-700/60 hover:border-emerald-300 dark:hover:border-emerald-600 hover:shadow-sm'}`}
          >
            🧺 {t('recipes.myPantry')}
          </button>
        </div>

        {showPantry && (
          <div className="bg-white/80 dark:bg-slate-800/70 backdrop-blur-sm border border-slate-200/80 dark:border-slate-700/60 rounded-2xl p-5 mb-6 shadow-sm hover:shadow-lg transition-all duration-300">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-bold text-slate-700 dark:text-slate-200">🧺 {t('recipes.myPantry')}</h3>
              {pantry.length > 0 && (
                <button onClick={handleClearPantry} className="text-xs text-red-500 dark:text-red-400 hover:text-red-600 dark:hover:text-red-300 font-semibold transition-colors">{t('shoppingList.clearAll')}</button>
              )}
            </div>

            {pantry.length === 0 ? (
              <p className="text-sm text-slate-400 dark:text-slate-500 mb-4">{t('recipes.pantryEmpty')}</p>
            ) : (
              <div className="flex flex-wrap gap-2 mb-4">
                {pantry.map((item, i) => (
                  <span key={i} className="inline-flex items-center gap-1.5 text-xs bg-emerald-50 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-300 border border-emerald-200/80 dark:border-emerald-700/60 px-3 py-1.5 rounded-full font-semibold shadow-sm">
                    {item}
                    <button onClick={() => handleRemovePantry(item)} className="hover:text-red-500 dark:hover:text-red-400 transition-colors leading-none text-base">×</button>
                  </span>
                ))}
              </div>
            )}

            <div className="flex gap-2 mb-4">
              <input
                value={pantryInput}
                onChange={e => setPantryInput(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && handleAddPantry()}
                placeholder={t('recipes.addPantryHint')}
                className="flex-1 px-3 py-2 bg-slate-50 dark:bg-slate-700/50 border border-slate-200/80 dark:border-slate-600/60 rounded-lg text-sm text-slate-700 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-400/50 focus:border-emerald-400 transition-all duration-200"
              />
              <button onClick={handleAddPantry} className="px-4 py-2 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white rounded-lg text-sm font-bold hover:from-emerald-600 hover:to-emerald-700 transition-all duration-300 shadow-sm hover:shadow-md active:scale-[0.98] ring-1 ring-emerald-500/20">{t('shoppingList.addItem')}</button>
            </div>

            {pantry.length > 0 && (
              <div>
                <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wide mb-2">{t('recipes.pantryMatch')}</p>
                <div className="flex flex-wrap gap-2">
                  {pantryMatchOptions.map(option => (
                    <button
                      key={option}
                      onClick={() => setPantryFilter(option)}
                      className={`px-3 py-1 rounded-lg text-xs font-bold border transition-all duration-200 ${pantryFilter === option ? 'bg-emerald-500 text-white border-emerald-500 shadow-sm ring-1 ring-emerald-500/20' : 'bg-white dark:bg-slate-700 text-slate-500 dark:text-slate-400 border-slate-200 dark:border-slate-600 hover:border-emerald-300 dark:hover:border-emerald-600 hover:shadow-sm'}`}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-3">
          <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">
            <span className="font-bold text-slate-700 dark:text-slate-200">{filtered.length}</span> {t('recipes.recipeAvailable', { count: filtered.length })}
          </p>
          <div className="flex flex-wrap gap-2">
            {levels.map(level => (
              <button key={level.key} onClick={() => setFilter(level.key)} className={`px-4 py-1.5 rounded-xl text-sm font-bold border transition-all duration-200 active:scale-[0.97] ${filter === level.key ? 'bg-gradient-to-r from-emerald-500 to-emerald-600 text-white border-emerald-500 shadow-md ring-1 ring-emerald-500/20' : 'bg-white dark:bg-slate-800/90 text-slate-600 dark:text-slate-300 border-slate-200/80 dark:border-slate-700/60 hover:border-emerald-300 dark:hover:border-emerald-600 hover:text-emerald-600 dark:hover:text-emerald-400 hover:shadow-sm'}`}>
                {level.label}
              </button>
            ))}
          </div>
        </div>

        <div className="flex flex-wrap gap-3 mb-6 p-3 bg-slate-50/50 dark:bg-slate-800/30 rounded-2xl border border-slate-100 dark:border-slate-700/50">
          <div className="flex flex-wrap items-center gap-1.5">
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wide mr-1">{t('filters.prepTime')}:</span>
            {[{ key: 'any', label: t('filters.anyTime') }, { key: 'under15', label: t('filters.under15') }, { key: 'under30', label: t('filters.under30') }, { key: 'over30', label: t('filters.over30') }].map(opt => (
              <button key={opt.key} onClick={() => setPrepTime(opt.key)} className={`px-3 py-1 rounded-lg text-xs font-bold border transition-all duration-200 active:scale-[0.97] ${prepTime === opt.key ? 'bg-emerald-500 text-white border-emerald-500 shadow-sm ring-1 ring-emerald-500/20' : 'bg-white dark:bg-slate-700 text-slate-500 dark:text-slate-400 border-slate-200 dark:border-slate-600 hover:border-emerald-300 dark:hover:border-emerald-600 hover:shadow-sm'}`}>
                {opt.label}
              </button>
            ))}
          </div>
          <div className="flex flex-wrap items-center gap-1.5">
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wide mr-1">{t('filters.diet')}:</span>
            {[{ key: 'all', label: 'All' }, { key: 'vegetarian', label: t('filters.vegetarian') }, { key: 'vegan', label: t('filters.vegan') }, { key: 'glutenFree', label: t('filters.glutenFree') }, { key: 'lowCarb', label: t('filters.lowCarb') }].map(opt => (
              <button key={opt.key} onClick={() => setDiet(opt.key)} className={`px-3 py-1 rounded-lg text-xs font-bold border transition-all duration-200 active:scale-[0.97] ${diet === opt.key ? 'bg-emerald-500 text-white border-emerald-500 shadow-sm ring-1 ring-emerald-500/20' : 'bg-white dark:bg-slate-700 text-slate-500 dark:text-slate-400 border-slate-200 dark:border-slate-600 hover:border-emerald-300 dark:hover:border-emerald-600 hover:shadow-sm'}`}>
                {opt.label}
              </button>
            ))}
          </div>
          <div className="flex flex-wrap items-center gap-1.5">
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wide mr-1">{t('filters.season')}:</span>
            {[{ key: 'all', label: t('filters.allSeasons') }, { key: 'spring', label: t('filters.spring') }, { key: 'summer', label: t('filters.summer') }, { key: 'fall', label: t('filters.fall') }, { key: 'winter', label: t('filters.winter') }].map(opt => (
              <button key={opt.key} onClick={() => setSeason(opt.key)} className={`px-3 py-1 rounded-lg text-xs font-bold border transition-all duration-200 active:scale-[0.97] ${season === opt.key ? 'bg-emerald-500 text-white border-emerald-500 shadow-sm ring-1 ring-emerald-500/20' : 'bg-white dark:bg-slate-700 text-slate-500 dark:text-slate-400 border-slate-200 dark:border-slate-600 hover:border-emerald-300 dark:hover:border-emerald-600 hover:shadow-sm'}`}>
                {opt.label}
              </button>
            ))}
          </div>
        </div>

        {filtered.length === 0 ? (
          <div className="text-center py-16 bg-white/80 dark:bg-slate-800/70 backdrop-blur-sm rounded-2xl border border-slate-200/80 dark:border-slate-700/60 shadow-sm">
            <div className="text-6xl mb-4 opacity-50">🍳</div>
            <p className="text-slate-500 dark:text-slate-400 text-lg font-medium">{t('recipes.noRecipes')}</p>
            <p className="text-slate-400 dark:text-slate-500 text-sm mt-1">{t('recipes.tryDifferentFilters')}</p>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {filtered.map((r, i) => {
              const config = difficultyConfig[r.difficulty] || difficultyConfig.easy
              const isExpanded = expanded === i
              const isFav = favorites.includes(r.name)
              return (
                <RecipeCardInline
                  key={i}
                  r={r}
                  config={config}
                  isExpanded={isExpanded}
                  onToggleExpand={() => setExpanded(isExpanded ? null : i)}
                  isFav={isFav}
                  onSave={handleSave}
                  pantry={pantry}
                />
              )
            })}
          </div>
        )}
      </div>
    </div>
    </>
  )
}
