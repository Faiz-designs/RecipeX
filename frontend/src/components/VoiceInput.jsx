import { useState, useRef, useCallback, useEffect } from 'react'

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition

export default function VoiceInput({ onResult, placeholder = 'Search by voice...', className = '' }) {
  const [listening, setListening] = useState(false)
  const [transcript, setTranscript] = useState('')
  const [supported] = useState(!!SpeechRecognition)
  const recognitionRef = useRef(null)

  const stopListening = useCallback(() => {
    if (recognitionRef.current) {
      recognitionRef.current.stop()
      recognitionRef.current = null
    }
    setListening(false)
  }, [])

  const startListening = useCallback(() => {
    if (!SpeechRecognition) return
    stopListening()
    const recognition = new SpeechRecognition()
    recognition.continuous = false
    recognition.interimResults = true
    recognition.lang = 'en-US'

    recognition.onresult = (e) => {
      const text = Array.from(e.results)
        .map(r => r[0].transcript)
        .join(' ')
      setTranscript(text)
    }

    recognition.onend = () => {
      setListening(false)
      if (transcript && onResult) onResult(transcript)
    }

    recognition.onerror = () => {
      setListening(false)
    }

    recognitionRef.current = recognition
    recognition.start()
    setListening(true)
    setTranscript('')
  }, [stopListening, onResult, transcript])

  useEffect(() => {
    return () => { if (recognitionRef.current) recognitionRef.current.abort() }
  }, [])

  if (!supported) return null

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <button
        onClick={listening ? stopListening : startListening}
        className={`w-10 h-10 rounded-xl flex items-center justify-center text-lg transition-all shrink-0 ${
          listening
            ? 'bg-red-500 text-white shadow-lg shadow-red-500/30 animate-pulse'
            : 'bg-slate-100 dark:bg-slate-700 text-slate-500 dark:text-slate-300 hover:bg-emerald-100 dark:hover:bg-emerald-900/50 hover:text-emerald-600 dark:hover:text-emerald-400'
        }`}
        title={listening ? 'Stop listening' : 'Voice input'}
      >
        {listening ? '🔴' : '🎤'}
      </button>
      {transcript && (
        <span className="text-sm text-slate-500 dark:text-slate-400 italic animate-fadeIn">
          "{transcript}"
        </span>
      )}
    </div>
  )
}
