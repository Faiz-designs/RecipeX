import { useState } from 'react'
import { useLocation } from 'react-router-dom'
import useVoiceAssistant from '../hooks/useVoiceAssistant'
import { useTranslation } from 'react-i18next'

export default function VoiceAssistant() {
  const location = useLocation()
  const { t } = useTranslation()
  const { isListening, transcript, isSupported, toggleListening } = useVoiceAssistant()
  const [showHint, setShowHint] = useState(false)

  if (location.pathname === '/cooking-mode') return null

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
      {!isSupported && (
        <div className="glass-card rounded-2xl px-4 py-2.5 shadow-xl border border-amber-500/30 bg-stone-900/90 backdrop-blur-xl">
          <p className="text-xs text-amber-400 whitespace-nowrap">Voice not supported in this browser</p>
        </div>
      )}
      {isListening && (
        <div className="glass-card rounded-2xl px-5 py-4 shadow-xl border border-lime-500/30 bg-stone-900/90 backdrop-blur-xl min-w-[240px] max-w-[320px]">
          <div className="flex items-center gap-3">
            <span className="w-3 h-3 bg-red-500 rounded-full animate-pulse shadow-lg shadow-red-500/50" />
            <span className="text-sm text-stone-200 font-medium">{t('voiceAssistant.listening')}</span>
          </div>
          {transcript && (
            <p className="text-xs text-stone-400 mt-2 italic leading-relaxed">&ldquo;{transcript}&rdquo;</p>
          )}
          <p className="text-[10px] text-stone-500 mt-2 leading-relaxed">
            Say &ldquo;prepare [recipe]&rdquo; or &ldquo;go to scan&rdquo;
          </p>
        </div>
      )}
      <div className="relative">
        {showHint && !isListening && (
          <div className="absolute bottom-16 right-0 glass-card rounded-2xl px-4 py-3 shadow-xl border border-lime-500/20 bg-stone-900/90 backdrop-blur-xl min-w-[200px] mb-1">
            <p className="text-xs text-stone-300 leading-relaxed">
              Try: &ldquo;prepare tomato salad&rdquo;, &ldquo;go to scan&rdquo;, &ldquo;show recipes&rdquo;
            </p>
          </div>
        )}
        <button
          onClick={() => { if (!isListening) setShowHint(false); toggleListening() }}
          onMouseEnter={() => setShowHint(true)}
          onMouseLeave={() => setShowHint(false)}
          className={`w-14 h-14 rounded-full flex items-center justify-center text-2xl shadow-xl transition-all duration-300 active:scale-90 ${
            isListening
              ? 'bg-red-500 shadow-red-500/50 animate-pulse ring-2 ring-red-400/50 scale-110'
              : 'bg-gradient-to-br from-lime-400 to-lime-600 shadow-lime-500/30 hover:shadow-lime-500/50 hover:scale-105'
          }`}
          aria-label="Voice Assistant"
          title={t('voiceAssistant.voiceCommands')}
        >
          🎤
        </button>
      </div>
    </div>
  )
}
