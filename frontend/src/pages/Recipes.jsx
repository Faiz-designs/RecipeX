import { useState, useEffect } from 'react'

const difficultyConfig = {
  easy: { label: 'Easy', badge: 'bg-emerald-100 dark:bg-emerald-900/60 text-emerald-700 dark:text-emerald-300', header: 'from-emerald-500 to-emerald-600' },
  intermediate: { label: 'Intermediate', badge: 'bg-amber-100 dark:bg-amber-900/60 text-amber-700 dark:text-amber-300', header: 'from-amber-500 to-amber-600' },
  advanced: { label: 'Advanced', badge: 'bg-red-100 dark:bg-red-900/60 text-red-700 dark:text-red-300', header: 'from-red-500 to-red-600' },
}

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

export default function Recipes() {
  const [recipes, setRecipes] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [filter, setFilter] = useState('All')
  const [search, setSearch] = useState('')
  const [expanded, setExpanded] = useState(null)
  const [favorites, setFavorites] = useState(getFavorites)

  useEffect(() => {
    fetch('https://FaizBasha05.pythonanywhere.com/scan/demo')
      .then(res => {
        if (!res.ok) throw new Error(`Failed to fetch (${res.status})`)
        return res.json()
      })
      .then(data => { setRecipes(flattenRecipes(data)); setLoading(false) })
      .catch(err => { setError(err.message); setLoading(false) })
  }, [])

  const filtered = recipes.filter(r => {
    if (filter !== 'All' && r.difficulty !== filter.toLowerCase()) return false
    if (search) {
      const q = search.toLowerCase()
      const nameMatch = r.name.toLowerCase().includes(q)
      const ingMatch = r.additional_ingredients_required?.some(i => i.toLowerCase().includes(q))
      if (!nameMatch && !ingMatch) return false
    }
    return true
  })
  const levels = ['All', 'Easy', 'Intermediate', 'Advanced']

  const handleSave = (name) => {
    const updated = toggleFavorite(name)
    setFavorites([...updated])
  }

  if (loading) {
    return (
      <div className="max-w-5xl mx-auto px-4 py-8">
        <div className="animate-gradient bg-gradient-to-br from-emerald-600 via-emerald-500 to-teal-600 rounded-2xl h-48 mb-8 flex items-center justify-center">
          <div className="flex items-center gap-3 text-white">
            <div className="w-8 h-8 border-4 border-white/30 border-t-white rounded-full animate-spin" />
            <span className="text-lg font-semibold">Loading recipes...</span>
          </div>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[1, 2, 3].map(i => (
            <div key={i} className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700 overflow-hidden">
              <div className="h-20 bg-slate-200 dark:bg-slate-700 animate-shimmer" />
              <div className="p-5 space-y-3">
                <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded animate-shimmer w-3/4" />
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
        <div className="bg-gradient-to-br from-emerald-600 via-emerald-500 to-teal-600 rounded-2xl h-48 mb-8 flex items-center justify-center">
          <h1 className="text-4xl font-extrabold text-white">Explore Recipes</h1>
        </div>
        <div className="bg-red-50 dark:bg-red-900/40 border border-red-200 dark:border-red-800 rounded-2xl p-6 text-center">
          <div className="text-4xl mb-3">⚠️</div>
          <p className="text-red-700 dark:text-red-300 font-semibold text-lg mb-1">Failed to load recipes</p>
          <p className="text-red-500 dark:text-red-400 text-sm mb-4">{error}</p>
          <button onClick={() => window.location.reload()} className="px-6 py-2.5 bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-xl font-semibold hover:from-emerald-600 hover:to-teal-700 transition shadow-md">Try Again</button>
        </div>
      </div>
    )
  }

  return (
    <div className="animate-fadeIn">
      <div className="relative overflow-hidden bg-gradient-to-br from-emerald-600 via-emerald-500 to-teal-600 animate-gradient py-20 md:py-28">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 text-6xl animate-float">🍳</div>
          <div className="absolute top-20 right-20 text-5xl animate-float stagger-2">🥘</div>
          <div className="absolute bottom-16 left-1/4 text-4xl animate-float stagger-3">🥗</div>
          <div className="absolute top-1/3 right-1/4 text-5xl animate-float stagger-4">🍝</div>
        </div>
        <div className="relative max-w-3xl mx-auto text-center px-4">
          <h1 className="text-5xl md:text-6xl font-extrabold text-white mb-5 leading-tight">Explore Recipes</h1>
          <p className="text-lg text-emerald-100/90 leading-relaxed max-w-xl mx-auto">
            Discover delicious recipes generated from scanned vegetables.
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
          <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">
            <span className="font-bold text-slate-700 dark:text-slate-200">{recipes.length}</span> recipe{recipes.length !== 1 ? 's' : ''} available
          </p>
          <div className="flex flex-wrap gap-2">
            {levels.map(level => (
              <button key={level} onClick={() => setFilter(level)} className={`px-4 py-1.5 rounded-xl text-sm font-semibold border transition-all duration-200 ${filter === level ? 'bg-emerald-500 text-white border-emerald-500 shadow-md' : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:border-emerald-300 dark:hover:border-emerald-600 hover:text-emerald-600 dark:hover:text-emerald-400'}`}>
                {level}
              </button>
            ))}
          </div>
        </div>

        {filtered.length === 0 ? (
          <div className="text-center py-16">
            <div className="text-5xl mb-4">🍳</div>
            <p className="text-slate-500 dark:text-slate-400 text-lg">No recipes found for this difficulty.</p>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filtered.map((r, i) => {
              const config = difficultyConfig[r.difficulty] || difficultyConfig.easy
              const isExpanded = expanded === i
              const isFav = favorites.includes(r.name)
              const displayed = isExpanded ? r.steps : r.steps?.slice(0, 3)

              return (
                <div key={i} className="group bg-white dark:bg-slate-800 rounded-2xl shadow-sm dark:shadow-slate-900/30 border border-slate-100 dark:border-slate-700 overflow-hidden hover:shadow-xl transition-all duration-300">
                  <div className={`bg-gradient-to-r ${config.header} px-5 py-3 relative`}>
                    <div className="flex items-center justify-between">
                      <span className={`text-xs font-bold uppercase tracking-wider text-white/90`}>{config.label}</span>
                      <span className="text-white/80 text-xs">{r.total_time_minutes} min</span>
                    </div>
                    <h3 className="text-lg font-bold text-white mt-1 pr-8">{r.name}</h3>
                    <button onClick={() => handleSave(r.name)} className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center hover:bg-white/40 transition-all" title={isFav ? 'Remove from favorites' : 'Save to favorites'}>
                      <span className={`text-sm ${isFav ? 'text-red-400' : 'text-white/80'}`}>{isFav ? '❤️' : '🤍'}</span>
                    </button>
                  </div>
                  <div className="p-5">
                    {r.servings && <p className="text-xs text-slate-400 dark:text-slate-500 mb-2">🍽 {r.servings} servings</p>}

                    {r.additional_ingredients_required?.length > 0 && (
                      <div className="mb-3">
                        <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wide mb-1.5">Ingredients</p>
                        <div className="flex flex-wrap gap-1.5">
                          {r.additional_ingredients_required.map((ing, j) => (
                            <span key={j} className="text-xs bg-amber-50 dark:bg-amber-900/40 text-amber-700 dark:text-amber-300 border border-amber-200 dark:border-amber-700 px-2.5 py-0.5 rounded-full font-medium">{ing}</span>
                          ))}
                        </div>
                      </div>
                    )}

                    <ol className="text-sm text-slate-600 dark:text-slate-300 space-y-2">
                      {displayed?.map((step, j) => (
                        <li key={j} className="flex gap-2">
                          <span className={`shrink-0 w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold mt-0.5 bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300`}>{j + 1}</span>
                          <span>{step}</span>
                        </li>
                      ))}
                    </ol>

                    {r.steps?.length > 3 && (
                      <button onClick={() => setExpanded(isExpanded ? null : i)} className="text-sm font-medium text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 dark:hover:text-emerald-300 mt-3 transition-colors">
                        {isExpanded ? 'Show less ↑' : `+${r.steps.length - 3} more steps ↓`}
                      </button>
                    )}

                    {r.plating_suggestion && (
                      <p className="text-xs text-slate-400 dark:text-slate-500 italic mt-3 pt-3 border-t border-slate-100 dark:border-slate-700">💡 {r.plating_suggestion}</p>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}
