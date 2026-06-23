import { useState, useEffect, useCallback } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

export default function CookingMode() {
  const { t, i18n } = useTranslation()
  const location = useLocation()
  const navigate = useNavigate()
  const recipe = location.state?.recipe

  const [currentStep, setCurrentStep] = useState(0)
  const [wakeLock, setWakeLock] = useState(null)
  const [checked, setChecked] = useState([])
  const [timer, setTimer] = useState(null)
  const [timerSeconds, setTimerSeconds] = useState(0)
  const [speaking, setSpeaking] = useState(false)
  const [voiceInput, setVoiceInput] = useState('')
  const [listening, setListening] = useState(false)

  const speak = useCallback((text) => {
    if (!('speechSynthesis' in window)) return
    window.speechSynthesis.cancel()
    const utterance = new SpeechSynthesisUtterance(text)
    utterance.lang = i18n.language === 'hi' ? 'hi-IN' : i18n.language === 'te' ? 'te-IN' : 'en-US'
    utterance.rate = 0.9
    utterance.onend = () => setSpeaking(false)
    window.speechSynthesis.speak(utterance)
    setSpeaking(true)
  }, [i18n.language])

  const stopSpeaking = useCallback(() => {
    if ('speechSynthesis' in window) window.speechSynthesis.cancel()
    setSpeaking(false)
  }, [])

  useEffect(() => {
    if (speaking && steps[currentStep]) {
      speak(steps[currentStep])
    }
  }, [currentStep, speaking])

  useEffect(() => {
    if ('wakeLock' in navigator) {
      navigator.wakeLock.request('screen').then(l => setWakeLock(l)).catch(() => {})
    }
    return () => { if (wakeLock) wakeLock.release() }
  }, [])

  useEffect(() => {
    if (listening) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
      if (!SpeechRecognition) { setListening(false); return }
      const recognition = new SpeechRecognition()
      recognition.lang = i18n.language === 'hi' ? 'hi-IN' : i18n.language === 'te' ? 'te-IN' : 'en-US'
      recognition.continuous = false
      recognition.interimResults = true

      let silenceTimer
      const resetSilenceTimer = () => {
        clearTimeout(silenceTimer)
        silenceTimer = setTimeout(() => { recognition.stop(); setListening(false) }, 5000)
      }

      recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript.toLowerCase()
        setVoiceInput(transcript)
        resetSilenceTimer()
        if (transcript.includes('next')) setCurrentStep(s => Math.min(steps.length - 1, s + 1))
        if (transcript.includes('back') || transcript.includes('previous')) setCurrentStep(s => Math.max(0, s - 1))
        if (transcript.includes('stop') || transcript.includes('pause')) stopSpeaking()
        if (transcript.includes('start') || transcript.includes('resume')) setSpeaking(true)
      }

      recognition.onend = () => { setListening(false); clearTimeout(silenceTimer) }
      recognition.start()
      resetSilenceTimer()

      return () => { clearTimeout(silenceTimer); recognition.abort() }
    }
  }, [listening])

  if (!recipe) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
        <div className="bg-slate-800/80 backdrop-blur-sm rounded-2xl border border-slate-700/60 p-8 shadow-xl text-center">
          <p className="text-white/80 text-xl font-medium">No recipe selected</p>
        </div>
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
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white flex flex-col">
      <header className="bg-slate-800/80 backdrop-blur-sm border-b border-slate-700/60 px-6 py-4 flex items-center justify-between sticky top-0 z-30">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 bg-gradient-to-br from-emerald-400 to-emerald-500 rounded-xl flex items-center justify-center text-sm shadow-lg shadow-emerald-500/20">👨‍🍳</div>
          <h1 className="text-xl md:text-2xl font-bold truncate">{recipe.name}</h1>
        </div>
        <button onClick={() => navigate(-1)} className="px-4 py-2 bg-white/10 backdrop-blur-sm rounded-xl text-sm font-semibold hover:bg-white/20 transition-all border border-white/10">
          {t('cookingMode.exit')}
        </button>
      </header>

      <div className="flex-1 flex flex-col lg:flex-row">
        <aside className="lg:w-80 bg-slate-800/60 backdrop-blur-sm p-6 border-b lg:border-b-0 lg:border-r border-slate-700/60">
          <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
            <span className="w-1.5 h-5 bg-emerald-400 rounded-full inline-block" />
            {t('recipeCard.ingredients')}
          </h2>
          <div className="space-y-2.5">
            {ingredients.map((ing, i) => (
              <button key={i} onClick={() => toggleIngredient(i)} className={`w-full text-left px-4 py-3 rounded-xl text-base flex items-center gap-3 transition-all ${checked.includes(i) ? 'bg-slate-700/50 text-slate-400 line-through' : 'bg-slate-700/30 hover:bg-slate-700/60 border border-slate-700/40 hover:border-slate-600/60'}`}>
                <span className={`w-5 h-5 rounded-md border-2 flex items-center justify-center shrink-0 transition-all ${checked.includes(i) ? 'bg-emerald-500 border-emerald-500 shadow-sm' : 'border-slate-500'}`} role="checkbox" aria-checked={checked.includes(i)}>
                  {checked.includes(i) ? '✓' : ''}
                </span>
                {ing}
              </button>
            ))}
          </div>
          <div className="mt-8 pt-6 border-t border-slate-700/60">
            <h3 className="text-base font-semibold mb-3 flex items-center gap-2">⏱ Timer</h3>
            <div className="flex gap-2 flex-wrap">
              {[1, 2, 3, 5, 10, 15].map(m => (
                <button key={m} onClick={() => startTimer(m)} className="px-3 py-2 bg-slate-700/50 rounded-xl text-sm hover:bg-slate-600/60 transition-all border border-slate-600/40 hover:border-emerald-500/40 hover:shadow-lg hover:shadow-emerald-500/10 active:scale-95">
                  {m} min
                </button>
              ))}
            </div>
            {timerSeconds > 0 && (
              <div className="mt-5 text-center bg-slate-700/30 rounded-xl p-4 border border-slate-600/40">
                <p className="text-4xl font-mono font-bold text-emerald-400">{Math.floor(timerSeconds / 60)}:{(timerSeconds % 60).toString().padStart(2, '0')}</p>
                <button onClick={() => { clearInterval(timer); setTimerSeconds(0) }} className="text-sm text-red-400 hover:text-red-300 mt-2.5 transition-colors px-3 py-1 rounded-lg hover:bg-red-900/30">{t('cookingMode.cancel')}</button>
              </div>
            )}
          </div>
        </aside>

        <main className="flex-1 flex flex-col items-center justify-center p-6 md:p-10">
          <div className="max-w-2xl w-full">
            <div className="text-center mb-8">
              <div className="flex items-center justify-center gap-2 mb-3">
                <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">{t('cookingMode.step')}</span>
                <span className="text-sm font-bold text-emerald-400">{currentStep + 1}</span>
                <span className="text-xs text-slate-500">/</span>
                <span className="text-sm text-slate-400">{steps.length}</span>
              </div>
              <div className="w-full bg-slate-700/60 rounded-full h-2 overflow-hidden shadow-inner" role="progressbar" aria-valuenow={currentStep + 1} aria-valuemin={1} aria-valuemax={steps.length} aria-label={`Step ${currentStep + 1} of ${steps.length}`}>
                <div className="bg-gradient-to-r from-emerald-500 to-emerald-400 h-2 rounded-full transition-all duration-500 ease-out shadow-sm" style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }} />
              </div>
            </div>

            <div className="bg-slate-800/80 backdrop-blur-sm rounded-2xl p-8 md:p-10 mb-8 min-h-[220px] flex items-center justify-center border border-slate-700/60 shadow-xl shadow-slate-900/30 relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <p className="text-2xl md:text-3xl leading-relaxed text-center font-medium text-slate-100 relative z-10">
                {steps[currentStep]}
              </p>
            </div>

            <div className="flex justify-between gap-4">
              <button
                onClick={() => setCurrentStep(s => Math.max(0, s - 1))}
                disabled={currentStep === 0}
                className="flex-1 px-6 py-4 bg-slate-700/60 backdrop-blur-sm rounded-xl text-lg font-semibold disabled:opacity-30 hover:bg-slate-600/60 transition-all border border-slate-600/40 hover:border-slate-500/40 active:scale-[0.98]"
                aria-label={t('cookingMode.prev')}
              >
                ← {t('cookingMode.prev')}
              </button>
              {currentStep === steps.length - 1 ? (
                <button onClick={() => navigate(-1)} className="flex-1 px-6 py-4 bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-xl text-lg font-semibold hover:from-emerald-600 hover:to-emerald-700 transition-all shadow-lg shadow-emerald-500/20 hover:shadow-xl hover:shadow-emerald-500/30 active:scale-[0.98]">
                  {t('cookingMode.done')} ✓
                </button>
              ) : (
                <button
                  onClick={() => setCurrentStep(s => Math.min(steps.length - 1, s + 1))}
                  className="flex-1 px-6 py-4 bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-xl text-lg font-semibold hover:from-emerald-600 hover:to-emerald-700 transition-all shadow-lg shadow-emerald-500/20 hover:shadow-xl hover:shadow-emerald-500/30 active:scale-[0.98]"
                  aria-label={t('cookingMode.next')}
                >
                  {t('cookingMode.next')} →
                </button>
              )}
            </div>

            <div className="mt-6 bg-slate-800/60 backdrop-blur-sm rounded-2xl p-5 border border-slate-700/60 shadow-lg">
              <div className="flex items-center justify-between gap-4 flex-wrap">
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => speaking ? stopSpeaking() : speak(steps[currentStep])}
                    className={`px-4 py-2.5 rounded-xl text-sm font-semibold transition-all flex items-center gap-2 border ${speaking ? 'bg-emerald-600/80 border-emerald-500/50 hover:bg-emerald-500/80 shadow-lg shadow-emerald-500/20' : 'bg-slate-700/50 border-slate-600/40 hover:bg-slate-600/50'}`}
                  >
                    {speaking ? '🔊' : '🔇'} {speaking ? t('voiceAssistant.stopReading') : t('voiceAssistant.readAloud')}
                  </button>
                  <button
                    onClick={() => setListening(l => !l)}
                    className={`px-4 py-2.5 rounded-xl text-sm font-semibold transition-all flex items-center gap-2 border ${listening ? 'bg-red-600/80 border-red-500/50 hover:bg-red-500/80 shadow-lg shadow-red-500/20 animate-pulse' : 'bg-slate-700/50 border-slate-600/40 hover:bg-slate-600/50'}`}
                  >
                    🎤 {t('voiceAssistant.voiceCommands')}
                  </button>
                </div>
                {listening && <span className="text-xs text-emerald-400 animate-pulse font-medium">{t('voiceAssistant.listening')}</span>}
              </div>
              {voiceInput && (
                <div className="mt-3 text-sm text-slate-300 bg-slate-700/40 backdrop-blur-sm rounded-xl px-4 py-2.5 border border-slate-600/40">
                  🗣 "{voiceInput}"
                </div>
              )}
              <p className="text-xs text-slate-500 mt-3">{t('voiceAssistant.sayNext')}</p>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
