export default function RecipeCard({ recipes }) {
  if (!recipes) return null
  const levels = ['easy', 'intermediate', 'advanced']
  const levelColors = {
    easy: 'border-l-green-500',
    intermediate: 'border-l-yellow-500',
    advanced: 'border-l-red-500'
  }

  return (
    <div className="mb-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Recipes</h2>
      <div className="grid md:grid-cols-3 gap-4">
        {levels.map(level => {
          const r = recipes[level]
          if (!r) return null
          return (
            <div key={level} className={`bg-white rounded-lg shadow-md p-5 border-l-4 ${levelColors[level]}`}>
              <span className={`text-xs font-semibold uppercase px-2 py-1 rounded ${
                level === 'easy' ? 'bg-green-100 text-green-700' :
                level === 'intermediate' ? 'bg-yellow-100 text-yellow-700' :
                'bg-red-100 text-red-700'
              }`}>{level}</span>
              <h3 className="text-lg font-bold text-gray-800 mt-2 mb-1">{r.name}</h3>
              <p className="text-sm text-gray-500 mb-2">{r.total_time_minutes} min | {r.servings} servings</p>
              {r.additional_ingredients_required?.length > 0 && (
                <div className="mb-3">
                  <p className="text-xs font-semibold text-gray-600 uppercase">You'll need:</p>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {r.additional_ingredients_required.map((ing, i) => (
                      <span key={i} className="text-xs bg-orange-100 text-orange-700 px-2 py-0.5 rounded">{ing}</span>
                    ))}
                  </div>
                </div>
              )}
              <ol className="text-sm text-gray-700 space-y-1 list-decimal list-inside">
                {r.steps?.slice(0, 3).map((step, i) => (
                  <li key={i}>{step}</li>
                ))}
                {r.steps?.length > 3 && <li className="text-gray-400 text-xs">+{r.steps.length - 3} more steps</li>}
              </ol>
              {r.plating_suggestion && (
                <p className="text-xs text-gray-400 italic mt-2">💡 {r.plating_suggestion}</p>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
