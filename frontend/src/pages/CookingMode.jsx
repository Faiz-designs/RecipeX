import { useState, useEffect, useCallback } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

export default function CookingMode() {
  const { t } = useTranslation()
  const location = useLocation()
  const navigate = useNavigate()
  const recipe = location.state?.recipe
  
  const [currentStep, setCurrentStep] = useState(0)
  const [wakeLock, setWakeLock] = useState(null)
  const [checked, setChecked] = useState([])
  const [timer, setTimer] = useState(null)
  const [timerSeconds, setTimerSeconds] = useState(0)
  
  useEffect(() => {
    if ('wakeLock' in navigator) {
      navigator.wakeLock.request('screen').then(l => setWakeLock(l)).catch(() => {})
    }
    return () => { if (wakeLock) wakeLock.release() }
  }, [])
  
  if (!recipe) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-900">
        <p className="text-white text-xl">No recipe selected</p>
      </div>
    )
  }
  
  const steps = recipe.steps || []
  const ingredients = recipe.additional_ingredients_required || []
  
  const toggleIngredient = (i) => {
    setChecked(prev => prev.includes(i) ? prev.filter(x => x !== i) : [...prev, i])
  }
  
  const startTimer = (minutes) => {
    setTimerSeconds(minutes * 60)
    setTimer(setInterval(() => {
      setTimerSeconds(s => { if (s <= 1) { clearInterval(timer); return 0 }; return s - 1 })
    }, 1000))
  }
  
  return (
    <div className="min-h-screen bg-slate-900 text-white flex flex-col">
      <div className="bg-emerald-700 px-6 py-4 flex items-center justify-between">
        <h1 className="text-2xl font-bold">{recipe.name}</h1>
        <button onClick={() => navigate(-1)} className="px-4 py-2 bg-white/20 rounded-xl text-sm font-semibold hover:bg-white/30 transition">
          {t('cookingMode.exit')}
        </button>
      </div>
      
      <div className="flex-1 flex flex-col lg:flex-row">
        <div className="lg:w-80 bg-slate-800 p-6 border-b lg:border-b-0 lg:border-r border-slate-700">
          <h2 className="text-xl font-bold mb-4">{t('recipeCard.ingredients')}</h2>
          <div className="space-y-3">
            {ingredients.map((ing, i) => (
              <button key={i} onClick={() => toggleIngredient(i)} className={`w-full text-left px-4 py-3 rounded-xl text-lg flex items-center gap-3 transition-all ${checked.includes(i) ? 'bg-slate-700 text-slate-400 line-through' : 'bg-slate-700/50 hover:bg-slate-700'}`}>
                <span className={`w-6 h-6 rounded-md border-2 flex items-center justify-center shrink-0 ${checked.includes(i) ? 'bg-emerald-500 border-emerald-500' : 'border-slate-400'}`} role="checkbox" aria-checked={checked.includes(i)}>
                  {checked.includes(i) ? '✓' : ''}
                </span>
                {ing}
              </button>
            ))}
          </div>
          <div className="mt-8">
            <h3 className="text-lg font-semibold mb-3">⏱ Timer</h3>
            <div className="flex gap-2 flex-wrap">
              {[1, 2, 3, 5, 10, 15].map(m => (
                <button key={m} onClick={() => startTimer(m)} className="px-3 py-2 bg-slate-700 rounded-xl text-sm hover:bg-slate-600 transition">
                  {m} min
                </button>
              ))}
            </div>
            {timerSeconds > 0 && (
              <div className="mt-4 text-center">
                <p className="text-4xl font-mono font-bold">{Math.floor(timerSeconds / 60)}:{(timerSeconds % 60).toString().padStart(2, '0')}</p>
                <button onClick={() => { clearInterval(timer); setTimerSeconds(0) }} className="text-sm text-red-400 mt-2">Cancel</button>
              </div>
            )}
          </div>
        </div>
        
        <div className="flex-1 flex flex-col items-center justify-center p-8">
          <div className="max-w-2xl w-full">
            <div className="text-center mb-8">
              <span className="text-sm text-slate-400">{t('cookingMode.step')} {currentStep + 1} {t('cookingMode.of')} {steps.length}</span>
              <div className="w-full bg-slate-700 rounded-full h-2 mt-2" role="progressbar" aria-valuenow={currentStep + 1} aria-valuemin={1} aria-valuemax={steps.length} aria-label={`Step ${currentStep + 1} of ${steps.length}`}>
                <div className="bg-emerald-500 h-2 rounded-full transition-all" style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }} />
              </div>
            </div>
            
            <div className="bg-slate-800 rounded-2xl p-8 mb-8 min-h-[200px] flex items-center justify-center">
              <p className="text-3xl md:text-4xl leading-relaxed text-center font-medium">
                {steps[currentStep]}
              </p>
            </div>
            
            <div className="flex justify-between gap-4">
              <button 
                onClick={() => setCurrentStep(s => Math.max(0, s - 1))}
                disabled={currentStep === 0}
                className="flex-1 px-6 py-4 bg-slate-700 rounded-xl text-xl font-semibold disabled:opacity-30 hover:bg-slate-600 transition"
                aria-label={t('cookingMode.prev')}
              >
                ← {t('cookingMode.prev')}
              </button>
              {currentStep === steps.length - 1 ? (
                <button onClick={() => navigate(-1)} className="flex-1 px-6 py-4 bg-emerald-600 rounded-xl text-xl font-semibold hover:bg-emerald-500 transition">
                  {t('cookingMode.done')} ✓
                </button>
              ) : (
                <button 
                  onClick={() => setCurrentStep(s => Math.min(steps.length - 1, s + 1))}
                  className="flex-1 px-6 py-4 bg-emerald-600 rounded-xl text-xl font-semibold hover:bg-emerald-500 transition"
                  aria-label={t('cookingMode.next')}
                >
                  {t('cookingMode.next')} →
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
