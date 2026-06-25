import { useState } from 'react'
import { useLocation } from 'react-router-dom'
import useVoiceAssistant from '../hooks/useVoiceAssistant'
import { useTranslation } from 'react-i18next'

export default function VoiceAssistant() {
  const location = useLocation()
  const { t } = useTranslation()
  const { isListening, transcript, isSupported, status, toggleListening, submitText } = useVoiceAssistant()
  const [showHint, setShowHint] = useState(false)
  const [textMode, setTextMode] = useState(false)
  const [textInput, setTextInput] = useState('')

  if (location.pathname === '/cooking-mode') return null

  const handleTextSubmit = (e) => {
    e.preventDefault()
    if (textInput.trim()) { submitText(textInput.trim()); setTextInput(''); setTextMode(false) }
  }

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
      {!isSupported && (
        <div className="glass-card rounded-2xl px-4 py-3 shadow-xl border border-amber-500/30 bg-stone-900/90 backdrop-blur-xl">
          <p className="text-xs text-amber-400">Voice not supported. Type below.</p>
        </div>
      )}
      {isListening && (
        <div className="glass-card rounded-2xl px-5 py-4 shadow-xl border border-lime-500/30 bg-stone-900/90 backdrop-blur-xl min-w-[240px] max-w-[300px]">
          <div className="flex items-center gap-3">
            <span className="w-3 h-3 bg-red-500 rounded-full animate-pulse shadow-lg shadow-red-500/50" />
            <span className="text-sm text-stone-200 font-medium">{t('voiceAssistant.listening')}</span>
          </div>
          {transcript && <p className="text-xs text-stone-400 mt-2 italic leading-relaxed">&ldquo;{transcript}&rdquo;</p>}
        </div>
      )}
      {status && !isListening && (
        <div className="glass-card rounded-2xl px-4 py-2.5 shadow-xl border border-lime-500/20 bg-stone-900/90 backdrop-blur-xl max-w-[260px]">
          <p className="text-xs text-stone-300">{status}</p>
        </div>
      )}
      <div className="relative flex flex-col items-end gap-2">
        {showHint && !isListening && !textMode && (
          <div className="absolute bottom-16 right-0 glass-card rounded-2xl px-4 py-3 shadow-xl border border-lime-500/20 bg-stone-900/90 backdrop-blur-xl min-w-[220px] mb-1">
            <p className="text-xs text-stone-300 leading-relaxed">
              Say: &ldquo;prepare chicken curry&rdquo;<br />
              or &ldquo;go to scan&rdquo;<br />
              ✏️ to type instead
            </p>
          </div>
        )}
        <div className="flex gap-2 items-end">
          {textMode && (
            <form onSubmit={handleTextSubmit} className="glass-card rounded-2xl p-2 shadow-xl border border-lime-500/20 bg-stone-900/95 backdrop-blur-xl">
              <div className="flex gap-2">
                <input type="text" value={textInput} onChange={e => setTextInput(e.target.value)} placeholder="Type a command..." className="px-3 py-2 bg-stone-800 border border-stone-700 rounded-xl text-sm text-stone-200 placeholder-stone-500 focus:outline-none focus:border-lime-500/50 w-44" autoFocus />
                <button type="submit" className="px-3 py-2 bg-lime-600 rounded-xl text-sm font-semibold text-white hover:bg-lime-500 transition-all">Go</button>
              </div>
            </form>
          )}
          <div className="flex gap-2">
            {isSupported && (
              <button onClick={() => { setShowHint(false); setTextMode(false); toggleListening() }}
                onMouseEnter={() => setShowHint(true)}
                onMouseLeave={() => setShowHint(false)}
                className={`w-12 h-12 rounded-full flex items-center justify-center text-xl shadow-xl transition-all duration-300 active:scale-90 ${
                  isListening
                    ? 'bg-red-500 shadow-red-500/50 animate-pulse ring-2 ring-red-400/50 scale-110'
                    : 'bg-gradient-to-br from-lime-400 to-lime-600 shadow-lime-500/30 hover:shadow-lime-500/50 hover:scale-105'
                }`}
                aria-label="Voice Assistant" title={t('voiceAssistant.voiceCommands')}
              >🎤</button>
            )}
            <button onClick={() => { setTextMode(t => !t); setShowHint(false) }}
              className="w-10 h-10 rounded-full flex items-center justify-center text-base bg-stone-700/80 hover:bg-stone-600/80 transition-all shadow-lg active:scale-90"
              aria-label="Type command" title="Type a command"
            >✏️</button>
          </div>
        </div>
      </div>
    </div>
  )
}
